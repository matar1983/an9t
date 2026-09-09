import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { Loader2, BookOpen, CheckCircle2, Lock, ArrowLeft } from "lucide-react";
import { LEVELS } from "@/lib/levelsData";

export default function Levels() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    api.get("/levels/progress")
      .then((r) => setProgress(r.data || {}))
      .catch(() => setProgress({}));
  }, []);

  if (!progress) {
    return <div className="grid place-items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6" dir="rtl">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-1">مستويات التعلّم</h1>
        <p className="text-slate-400">اختر مستوى لاستعراض دروسه المكتوبة، الاستماع للنطق، وإنهاء تقييمه.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {LEVELS.map((lvl) => {
          const p = progress[String(lvl.id)];
          const passed = p?.passed;
          // المستوى الأول متاح دائماً، وباقي المستويات تُفتح بعد اجتياز السابق
          const prevPassed = lvl.id === 1 || progress[String(lvl.id - 1)]?.passed;
          const locked = !prevPassed;

          return (
            <button
              key={lvl.id}
              disabled={locked}
              onClick={() => navigate(`/levels/${lvl.id}`)}
              data-testid={`level-card-${lvl.id}`}
              className={`text-right p-6 rounded-2xl border transition-all ${
                locked
                  ? "bg-white/[0.02] border-white/5 opacity-50 cursor-not-allowed"
                  : "card-surface hover:-translate-y-1 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono-en px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400">{lvl.cefr}</span>
                {locked ? (
                  <Lock className="w-5 h-5 text-slate-500" />
                ) : passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <BookOpen className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">{lvl.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{lvl.description}</p>
              {p && (
                <p className="text-xs text-slate-500 mb-2">آخر نتيجة تقييم: {p.score}/{p.total} {passed ? "— ناجح" : "— أعد المحاولة"}</p>
              )}
              {!locked && (
                <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-400">
                  {passed ? "مراجعة المستوى" : "ابدأ الدروس"} <ArrowLeft className="w-3.5 h-3.5" />
                </div>
              )}
              {locked && <p className="text-xs text-slate-500">أنهِ المستوى السابق أولاً لفتح هذا المستوى</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
