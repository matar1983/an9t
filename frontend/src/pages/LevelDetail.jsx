import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { getLevel } from "@/lib/levelsData";
import { ArrowRight, Volume2, Trophy, X, Sparkles, BookOpen, Headphones, MessageSquare, CheckCircle2 } from "lucide-react";

export default function LevelDetail() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = getLevel(levelId);

  const [homeworkDone, setHomeworkDone] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [gameAnswers, setGameAnswers] = useState({}); // { gameId: { qIndex: choiceOrBool } }
  const [gameChecked, setGameChecked] = useState({}); // { gameId: true }

  const gameIcons = {
    multiple_choice: Sparkles,
    true_false: CheckCircle2,
    fill_blank: BookOpen,
    match: MessageSquare,
    order: ArrowRight,
    listen_choose: Headphones,
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("متصفحك لا يدعم خاصية النطق الصوتي.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  };

  const submitQuiz = async () => {
    let score = 0;
    level.quiz.forEach((q, i) => {
      if (answers[i] === q.correct) score++;
    });
    const total = level.quiz.length;
    const passed = score / total >= 0.6;
    setResult({ score, total, passed });

    setSaving(true);
    try {
      await api.post("/levels/progress", {
        level_id: level.id,
        score,
        total,
        passed,
        homework_done: homeworkDone,
      });
    } catch (e) {
      console.error("فشل حفظ نتيجة التقييم", e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16" dir="rtl">
      <button
        onClick={() => navigate("/levels")}
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-bold cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" /> العودة لكل المستويات
      </button>

      {/* بطاقة معلومات المستوى */}
      <div className="card-surface p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent space-y-3">
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold">{level.cefr}</span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mt-2">{level.title}</h1>
        <p className="text-slate-300 text-sm leading-relaxed">{level.description}</p>
      </div>

      {/* 1. قسم الدروس والقواعد الأساسية */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
          <BookOpen className="w-5 h-5 text-emerald-400" /> شرح القواعد الأساسية
        </h2>
        {level.lessons.map((lesson, index) => (
          <div key={lesson.id} className="card-surface p-6 space-y-4 border border-white/10 hover:border-emerald-500/30 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                  {index + 1}
                </span>
                <h3 className="text-base font-heading font-bold text-white">{lesson.title}</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg">{lesson.duration}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{lesson.explanation}</p>
            {lesson.examples && (
              <div className="bg-[#020b07] p-4 rounded-xl border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">أمثلة توضيحية:</span>
                  <button
                    onClick={() => speak(lesson.examples.map(ex => ex.en).join(". "))}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition text-xs font-bold cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> استمع للأمثلة
                  </button>
                </div>
                {lesson.examples.map((ex, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white font-en text-sm" dir="ltr">{ex.en}</span>
                    <span className="text-slate-400 text-xs">{ex.ar}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 2. أهم 500 جملة شائعة وتقنية الشادونغ */}
      {level.shadowingSentences && (
        <div className="card-surface p-6 space-y-4 border border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Headphones className="w-5 h-5 text-emerald-400" /> أهم الجمل الشائعة وتقنية الشادونغ (Shadowing)
          </h2>
          <p className="text-xs text-slate-400">استمع للجملة وكررها بصوت عالٍ لتقوية النطق والطلاقة.</p>
          <div className="space-y-2">
            {level.shadowingSentences.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div>
                  <p className="text-white font-en text-sm font-semibold" dir="ltr">{s.en}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{s.ar}</p>
                </div>
                <button
                  onClick={() => speak(s.en)}
                  className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition cursor-pointer"
                  title="استمع للنطق"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. قصص قصيرة ومبسطة */}
      {level.stories && (
        <div className="card-surface p-6 space-y-4 border border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> قصص قصيرة لتطوير القراءة والاستماع
          </h2>
          {level.stories.map((story, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-emerald-400 font-en">{story.title}</h3>
                <button
                  onClick={() => speak(story.text)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition text-xs font-bold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> استمع للقصة كاملة
                </button>
              </div>
              <p className="text-slate-200 text-sm font-en leading-relaxed" dir="ltr">{story.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* 4. محادثات ومواقف يومية */}
      {level.conversations && (
        <div className="card-surface p-6 space-y-4 border border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" /> محادثات ومواقف يومية
          </h2>
          <div className="space-y-4">
            {level.conversations.map((conv, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#020b07] border border-emerald-500/20 space-y-3">
                <h3 className="text-xs font-bold text-emerald-400">{conv.title}</h3>
                <div className="space-y-2">
                  {conv.lines.map((line, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">{line.speaker}</span>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-white font-en text-sm" dir="ltr">{line.en}</span>
                        <button onClick={() => speak(line.en)} className="text-emerald-400 hover:text-emerald-300 p-1 cursor-pointer">
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-400 text-xs">{line.ar}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. الألعاب والتمارين التفاعلية */}
      {level.games && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> ألعاب واختبارات تفاعلية (بدون حد لإعادة المحاولة)
          </h2>
          {level.games.map((game) => {
            const GameIcon = gameIcons[game.type] || Sparkles;
            return (
              <div key={game.id} className="card-surface p-6 space-y-4 border border-white/10">
                <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                  <GameIcon className="w-4 h-4 text-emerald-400" /> {game.title}
                </h3>
                <div className="space-y-4">
                  {game.questions.map((q, qi) => {
                    const selected = gameAnswers[game.id]?.[qi];
                    const setAnswer = (val) =>
                      setGameAnswers((prev) => ({ ...prev, [game.id]: { ...prev[game.id], [qi]: val } }));

                    if (game.type === "true_false") {
                      return (
                        <div key={qi} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <p className="text-white text-sm font-en mb-3" dir="ltr">{q.q}</p>
                          <div className="flex gap-3">
                            {[true, false].map((val) => (
                              <button
                                key={String(val)}
                                onClick={() => setAnswer(val)}
                                className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition cursor-pointer ${
                                  selected === val
                                    ? val === q.correct
                                      ? "bg-emerald-500 text-[#04120c] border-emerald-400"
                                      : "bg-red-500/80 text-white border-red-400"
                                    : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                                }`}
                              >
                                {val ? "صحيح" : "خطأ"}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (game.type === "listen_choose") {
                      return (
                        <div key={qi} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                          <button
                            onClick={() => speak(q.audio)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition text-xs font-bold cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> استمع للجملة
                          </button>
                          <div className="grid gap-2">
                            {q.options.map((opt, oi) => (
                              <button
                                key={oi}
                                onClick={() => setAnswer(oi)}
                                className={`p-3 rounded-xl text-sm text-right border transition cursor-pointer ${
                                  selected === oi
                                    ? oi === q.correct
                                      ? "bg-emerald-500 text-[#04120c] border-emerald-400 font-bold"
                                      : "bg-red-500/80 text-white border-red-400"
                                    : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // multiple_choice / fill_blank / match / order
                    return (
                      <div key={qi} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                        <p className="text-white text-sm font-en" dir="ltr">{q.q}</p>
                        <div className="grid gap-2" dir="ltr">
                          {q.options.map((opt, oi) => (
                            <button
                              key={oi}
                              onClick={() => setAnswer(oi)}
                              className={`p-3 rounded-xl text-sm text-right border font-en transition cursor-pointer ${
                                selected === oi
                                  ? oi === q.correct
                                    ? "bg-emerald-500 text-[#04120c] border-emerald-400 font-bold"
                                    : "bg-red-500/80 text-white border-red-400"
                                  : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* الواجب */}
      <div className="card-surface p-6 space-y-3">
        <h3 className="font-heading font-bold text-white flex items-center gap-2">
          <span>✍️</span> الواجب والتطبيق الذاتي
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">{level.homework}</p>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer pt-2">
          <input type="checkbox" checked={homeworkDone} onChange={(e) => setHomeworkDone(e.target.checked)}
            className="w-4 h-4 accent-emerald-500 rounded cursor-pointer" />
          أنجزت الواجب والتمارين التطبيقية
        </label>
      </div>

      {/* التقييم النهائي */}
      {!quizOpen && (
        <button
          onClick={() => setQuizOpen(true)}
          className="w-full py-4 rounded-xl bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          ابدأ تقييم نهاية المستوى
        </button>
      )}

      {quizOpen && !result && (
        <div className="card-surface p-6 space-y-6 border border-emerald-500/30">
          <h3 className="font-heading font-bold text-white text-lg">تقييم المستوى الذاتي</h3>
          {level.quiz.map((q, i) => (
            <div key={i} className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white text-sm font-medium font-en" dir="ltr">{i + 1}. {q.q}</p>
              <div className="grid gap-2 pt-1" dir="ltr">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={`p-3 rounded-xl text-sm text-right border font-en transition cursor-pointer ${
                      answers[i] === oi
                        ? "bg-emerald-500 text-[#04120c] border-emerald-400 font-bold"
                        : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={submitQuiz}
            disabled={Object.keys(answers).length < level.quiz.length || saving}
            className="w-full py-3.5 rounded-xl bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all disabled:opacity-40 cursor-pointer"
          >
            {saving ? "جارٍ الحفظ..." : "إنهاء التقييم"}
          </button>
        </div>
      )}

      {result && (
        <div className="card-surface p-8 text-center space-y-4 border border-emerald-500/30">
          {result.passed ? (
            <>
              <Trophy className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-400">أحسنت! اجتزت المستوى بنجاح</h3>
            </>
          ) : (
            <>
              <X className="w-14 h-14 text-amber-400 mx-auto" />
              <h3 className="text-xl font-bold text-amber-400">لم تجتز المستوى بعد</h3>
            </>
          )}
          <p className="text-slate-300">نتيجتك: {result.score} من {result.total}</p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/levels")}
              className="flex-1 py-3 rounded-xl bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition cursor-pointer"
            >
              العودة لكل المستويات
            </button>
            {!result.passed && (
              <button
                onClick={() => { setQuizOpen(true); setAnswers({}); setResult(null); }}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer"
              >
                إعادة المحاولة
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
