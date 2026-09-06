import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Mic, Flame, Trophy, Library, RefreshCw, Sparkles, Route, CheckCircle2,
  ArrowLeft, BookOpen, PenLine, Rocket, Loader2,
} from "lucide-react";

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/profile/stats").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  if (!stats)
    return <div className="grid place-items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const levelIdx = CEFR.indexOf(stats.cefr_level) + 1;
  const progressPct = stats.assessment_done ? (levelIdx / 6) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8" data-testid="student-dashboard">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            أهلاً {user?.name} 👋
          </h1>
          <p className="text-slate-400 mt-1">لنكمل رحلتك نحو إتقان الإنجليزية</p>
        </div>
      </div>

      {!stats.assessment_done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="card-surface p-7 border-emerald-500/30 bg-emerald-500/5 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-500 grid place-items-center glow shrink-0">
            <Sparkles className="w-7 h-7 text-[#04120c]" />
          </div>
          <div className="flex-1 text-center sm:text-right">
            <h3 className="text-xl font-heading font-bold text-white mb-1">ابدأ بجلسة تحديد المستوى</h3>
            <p className="text-slate-400 text-sm">محادثة صوتية قصيرة (5 دقائق) تحدد مستواك وتبني خطتك الشخصية.</p>
          </div>
          <button
            data-testid="start-assessment-btn"
            onClick={() => navigate("/session/assessment")}
            className="px-6 py-3.5 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shrink-0"
          >
            <Mic className="w-5 h-5" /> ابدأ التقييم
          </button>
        </motion.div>
      )}

      {/* stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Trophy} label="المستوى الحالي" value={stats.cefr_level || "—"} testid="cefr-level-badge" accent />
        <StatCard icon={Flame} label="نقاط الخبرة" value={`${stats.xp} XP`} />
        <StatCard icon={Rocket} label="جلسات مكتملة" value={stats.sessions_completed} />
        <StatCard icon={Library} label="كلمات محفوظة" value={stats.vocab_count} />
      </div>

      {/* CEFR progress */}
      {stats.assessment_done && (
        <div className="card-surface p-7">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-white text-lg">تقدّمك في الإطار الأوروبي CEFR</h3>
            <span className="text-emerald-400 font-mono-en text-sm">{stats.cefr_level}</span>
          </div>
          <div className="h-3 rounded-full bg-white/5 overflow-hidden mb-3">
            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="flex justify-between text-xs font-mono-en">
            {CEFR.map((l) => (
              <span key={l} className={CEFR.indexOf(l) < levelIdx ? "text-emerald-400" : "text-slate-600"}>{l}</span>
            ))}
          </div>
        </div>
      )}

      {/* quick actions */}
      <div>
        <h3 className="font-heading font-bold text-white text-lg mb-4">تابع التعلّم</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ActionCard icon={Mic} title="محادثة مباشرة" desc="تدرّب بالصوت" onClick={() => navigate("/session/practice")} testid="action-practice" />
          <ActionCard icon={BookOpen} title="قراءة تفاعلية" desc="اقرأ بصوتك" onClick={() => navigate("/reading")} testid="action-reading" />
          <ActionCard icon={PenLine} title="كتابة وقواعد" desc="صحّح كتابتك" onClick={() => navigate("/writing")} testid="action-writing" />
          <ActionCard icon={RefreshCw} title={`مراجعة (${stats.due_review})`} desc="تكرار متباعد" onClick={() => navigate("/vocabulary")} testid="action-review" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* roadmap */}
        <div className="card-surface p-7">
          <div className="flex items-center gap-2 mb-5">
            <Route className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-bold text-white text-lg">خطتك التعليمية</h3>
          </div>
          {stats.roadmap?.length ? (
            <ol className="space-y-4" data-testid="roadmap-list">
              {stats.roadmap.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-400 grid place-items-center text-xs font-bold shrink-0 mt-0.5 font-mono-en">
                    {step.target_level || i + 1}
                  </span>
                  <div>
                    <div className="text-white font-medium text-sm">{step.title}</div>
                    <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">{step.description}</div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-slate-500 text-sm">أكمل جلسة التقييم لبناء خطتك الشخصية.</p>
          )}
        </div>

        {/* homework */}
        <div className="card-surface p-7">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            <h3 className="font-heading font-bold text-white text-lg">واجباتك</h3>
          </div>
          {stats.homework?.length ? (
            <ul className="space-y-3" data-testid="homework-list">
              {stats.homework.map((hw, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03]">
                  <ArrowLeft className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                  <span className="text-slate-300 text-sm">{hw}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">لا توجد واجبات بعد.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent, testid }) {
  return (
    <div className={`card-surface p-5 ${accent ? "border-emerald-500/30" : ""}`} data-testid={testid}>
      <Icon className={`w-6 h-6 mb-3 ${accent ? "text-emerald-400" : "text-slate-400"}`} />
      <div className="text-2xl font-heading font-extrabold text-white font-mono-en">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, onClick, testid }) {
  return (
    <button onClick={onClick} data-testid={testid}
      className="card-surface p-6 text-right hover:-translate-y-1 group">
      <div className="w-11 h-11 rounded-xl bg-white/5 group-hover:bg-emerald-500/15 grid place-items-center mb-4 transition-all">
        <Icon className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="text-white font-heading font-semibold">{title}</div>
      <div className="text-xs text-slate-400 mt-1">{desc}</div>
    </button>
  );
}
