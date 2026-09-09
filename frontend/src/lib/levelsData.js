import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { getLevel } from "@/lib/levelsData";
import { ArrowRight, Volume2, CheckCircle2, Trophy, X } from "lucide-react";

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
    const passed = score / total >= 0.6; // نجاح من 60% فأكثر
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
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-bold"
      >
        <ArrowRight className="w-4 h-4" /> العودة لكل المستويات
      </button>

      <div className="card-surface p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent">
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold">{level.cefr}</span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white mt-3 mb-2">{level.title}</h1>
        <p className="text-slate-300 text-sm leading-relaxed">{level.description}</p>
      </div>

      {/* الدروس المكتوبة */}
      <div className="space-y-4">
        {level.lessons.map((lesson) => (
          <div key={lesson.id} className="card-surface p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-heading font-bold text-white">{lesson.title}</h2>
              <span className="text-xs text-slate-400 font-mono">{lesson.duration}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{lesson.explanation}</p>
            <button
              onClick={() => speak(lesson.listen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition text-sm font-bold"
            >
              <Volume2 className="w-4 h-4" /> استمع لأمثلة الدرس
            </button>
          </div>
        ))}
      </div>

      {/* الواجب */}
      <div className="card-surface p-6">
        <h3 className="font-heading font-bold text-white mb-2">✍️ الواجب</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{level.homework}</p>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={homeworkDone} onChange={(e) => setHomeworkDone(e.target.checked)}
            className="w-4 h-4 accent-emerald-500" />
          أنجزت الواجب
        </label>
      </div>

      {/* بدء التقييم النهائي */}
      {!quizOpen && (
        <button
          onClick={() => setQuizOpen(true)}
          className="w-full py-4 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all"
        >
          ابدأ تقييم نهاية المستوى
        </button>
      )}

      {quizOpen && !result && (
        <div className="card-surface p-6 space-y-6">
          <h3 className="font-heading font-bold text-white text-lg">تقييم المستوى</h3>
          {level.quiz.map((q, i) => (
            <div key={i}>
              <p className="text-white text-sm font-medium mb-2 font-en" dir="ltr">{q.q}</p>
              <div className="grid gap-2" dir="ltr">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                    className={`p-3 rounded-xl text-sm text-right border font-en transition ${
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
            className="w-full py-3.5 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all disabled:opacity-40"
          >
            {saving ? "جارٍ الحفظ..." : "إنهاء التقييم"}
          </button>
        </div>
      )}

      {result && (
        <div className="card-surface p-8 text-center space-y-4">
          {result.passed ? (
            <>
              <Trophy className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-emerald-400">أحسنت! اجتزت المستوى</h3>
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
              className="flex-1 py-3 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition"
            >
              العودة لكل المستويات
            </button>
            {!result.passed && (
              <button
                onClick={() => { setQuizOpen(true); setAnswers({}); setResult(null); }}
                className="flex-1 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
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
