import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { getLevel } from "@/lib/levelsData";
import { ArrowRight, Volume2, CheckCircle2, Trophy, X, Sparkles, BookOpen } from "lucide-react";

export default function LevelDetail() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const level = getLevel(levelId);

  const [homeworkDone, setHomeworkDone] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

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
    <div className="max-w-3xl mx-auto space-y-6 pb-16" dir="rtl">
      <button
        onClick={() => navigate("/levels")}
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-bold cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" /> العودة لكل المستويات
      </button>

      {/* بطاقة معلومات المستوى والخصائص الشاملة */}
      <div className="card-surface p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent space-y-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold">{level.cefr}</span>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mt-3 mb-2">{level.title}</h1>
          <p className="text-slate-300 text-sm leading-relaxed">{level.description}</p>
        </div>

        {level.features && level.features.length > 0 && (
          <div className="pt-3 border-t border-white/10 space-y-2">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> مميزات هذا المستوى:
            </p>
            <ul className="grid gap-2 text-xs text-slate-300 md:grid-cols-2">
              {level.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* الدروس المكتوبة - مصممة بوضوح لعدم تشتت الطالب */}
      <div className="space-y-6">
        {level.lessons.map((lesson, index) => (
          <div key={lesson.id} className="card-surface p-6 space-y-4 border border-white/10 hover:border-emerald-500/30 transition-all">
            {/* رأس الدرس */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs font-mono">
                  {index + 1}
                </span>
                <h2 className="text-lg font-heading font-bold text-white">{lesson.title}</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-white/5 px-2.5 py-1 rounded-lg">{lesson.duration}</span>
            </div>

            {/* الشرح المبسط (مقسم ومقروء) */}
            <div className="text-slate-300 text-sm leading-relaxed space-y-2">
              <p>{lesson.explanation}</p>
            </div>

            {/* صندوق الأمثلة المستقل والواضح */}
            {lesson.examples && lesson.examples.length > 0 && (
              <div className="bg-[#020b07] p-4 rounded-xl border border-emerald-500/20 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> أمثلة توضيحية:
                  </span>
                  <button
                    onClick={() => speak(lesson.examples.map(ex => ex.en).join(". "))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition text-xs font-bold cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> استمع لكل الأمثلة
                  </button>
                </div>
                <div className="space-y-2 pt-1">
                  {lesson.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-white/[0.02] border border-white/5">
                      <span className="text-white font-en font-medium text-sm" dir="ltr">{ex.en}</span>
                      <span className="text-slate-400 text-xs">{ex.ar}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

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

      {/* بدء التقييم النهائي */}
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
