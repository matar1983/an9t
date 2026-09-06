import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { apiErr } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRecorder, playAudioB64 } from "@/lib/recorder";
import { toast } from "sonner";
import {
  Mic, Square, Loader2, PhoneOff, Volume2, Bot, User, Sparkles, ArrowLeft, Trophy,
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";

const SCENARIOS = [
  { v: "At a restaurant", l: "في المطعم" },
  { v: "Job interview", l: "مقابلة عمل" },
  { v: "At the airport", l: "في المطار" },
  { v: "Making friends", l: "تكوين صداقات" },
  { v: "Shopping", l: "التسوق" },
  { v: "Daily small talk", l: "حديث يومي" },
];

const MODE_LABEL = {
  assessment: "جلسة تحديد المستوى",
  practice: "جلسة محادثة تفاعلية",
  challenge: "تحدي إتقان المستوى",
};

export default function LiveSession() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { recording, start, stop } = useRecorder();

  const [phase, setPhase] = useState("intro"); // intro | live | ended
  const [scenario, setScenario] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]); // {role, text, corrections}
  const [starting, setStarting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [report, setReport] = useState(null);
  const [ending, setEnding] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, processing]);

  const beginSession = async () => {
    setStarting(true);
    try {
      const { data } = await api.post("/session/start", { mode, scenario });
      setSessionId(data.session_id);
      setMessages([{ role: "assistant", text: data.reply }]);
      setPhase("live");
      playAudioB64(data.audio);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setStarting(false);
    }
  };

  const handleMic = async () => {
    if (!recording) {
      try {
        await start();
      } catch {
        toast.error("يرجى السماح بالوصول إلى الميكروفون");
      }
      return;
    }
    const blob = await stop();
    if (!blob) return;
    setProcessing(true);
    try {
      const fd = new FormData();
      fd.append("session_id", sessionId);
      fd.append("audio", blob, "audio.webm");
      const { data } = await api.post("/session/turn", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessages((m) => [
        ...m,
        { role: "user", text: data.user_text, corrections: data.corrections },
        { role: "assistant", text: data.reply },
      ]);
      playAudioB64(data.audio);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setProcessing(false);
    }
  };

  const endSession = async () => {
    setEnding(true);
    try {
      const { data } = await api.post("/session/end", { session_id: sessionId });
      setReport(data.report);
      setPhase("ended");
      await refreshUser();
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setEnding(false);
    }
  };

  // ---------- INTRO ----------
  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate("/dashboard")} className="text-slate-400 hover:text-white text-sm flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4 rotate-180" /> رجوع
        </button>
        <div className="card-surface p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 grid place-items-center glow mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-[#04120c]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-3">{MODE_LABEL[mode]}</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            {mode === "assessment"
              ? "ستجري محادثة قصيرة بالصوت مع المعلّم الذكي. تحدّث بطبيعية، ولا تقلق من الأخطاء — سنحدد مستواك بدقة."
              : mode === "challenge"
              ? "تحدٍّ شامل لإثبات إتقانك للمستوى الحالي والانتقال للأعلى. أظهر أفضل ما لديك!"
              : "اختر موضوع المحادثة ثم تحدّث بحرية. سيصحّح المعلّم نطقك وقواعدك بلطف."}
          </p>

          {mode === "practice" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {SCENARIOS.map((s) => (
                <button
                  key={s.v}
                  data-testid={`scenario-${s.v.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setScenario(s.v)}
                  className={`px-4 py-3 rounded-xl text-sm border transition-all ${
                    scenario === s.v
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20"
                  }`}
                >
                  {s.l}
                </button>
              ))}
            </div>
          )}

          <button
            data-testid="start-ai-session-btn"
            onClick={beginSession}
            disabled={starting || (mode === "practice" && !scenario)}
            className="px-8 py-4 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all glow disabled:opacity-40 flex items-center gap-2 mx-auto"
          >
            {starting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
            {starting ? "جارٍ البدء..." : "ابدأ البث المباشر"}
          </button>
          {mode === "practice" && !scenario && (
            <p className="text-xs text-slate-500 mt-3">اختر موضوعاً للبدء</p>
          )}
        </div>
      </div>
    );
  }

  // ---------- ENDED / REPORT ----------
  if (phase === "ended" && report) {
    return <SessionReport mode={mode} report={report} onDone={() => navigate("/dashboard")} />;
  }

  // ---------- LIVE ----------
  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 grid place-items-center">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="font-heading font-bold text-white">{MODE_LABEL[mode]}</div>
            <div className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> مباشر الآن
            </div>
          </div>
        </div>
        <button
          data-testid="end-session-btn"
          onClick={endSession}
          disabled={ending}
          className="px-4 py-2.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 text-sm flex items-center gap-2"
        >
          {ending ? <Loader2 className="w-4 h-4 animate-spin" /> : <PhoneOff className="w-4 h-4" />}
          إنهاء
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto card-surface p-5 space-y-5" data-testid="session-transcript">
        {messages.map((m, i) => (
          <Message key={i} m={m} />
        ))}
        {processing && (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> المعلّم يفكّر...
          </div>
        )}
      </div>

      <div className="pt-6 flex flex-col items-center gap-3">
        <button
          data-testid="mic-record-button"
          onClick={handleMic}
          disabled={processing}
          className={`relative w-20 h-20 rounded-full grid place-items-center transition-all disabled:opacity-50 ${
            recording ? "bg-red-500 pulse-ring" : "bg-emerald-500 hover:bg-emerald-400 glow"
          }`}
        >
          {recording ? <Square className="w-7 h-7 text-white fill-white" /> : <Mic className="w-8 h-8 text-[#04120c]" />}
        </button>
        <p className="text-sm text-slate-400">
          {recording ? "اضغط لإيقاف التسجيل والإرسال" : processing ? "جارٍ المعالجة..." : "اضغط للتحدّث"}
        </p>
      </div>
    </div>
  );
}

function Message({ m }) {
  const isAI = m.role === "assistant";
  return (
    <div className={`flex gap-3 float-in ${isAI ? "" : "flex-row-reverse"}`}>
      <div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 ${isAI ? "bg-emerald-500/15" : "bg-indigo-500/20"}`}>
        {isAI ? <Bot className="w-4 h-4 text-emerald-400" /> : <User className="w-4 h-4 text-indigo-300" />}
      </div>
      <div className={`max-w-[80%] ${isAI ? "" : "text-right"}`}>
        <div className={`rounded-2xl px-4 py-3 ${isAI ? "bg-white/[0.04] text-slate-100" : "bg-indigo-500/15 text-slate-100"}`}>
          <p className="font-en text-[15px] leading-relaxed" dir="ltr">{m.text}</p>
        </div>
        {isAI && (
          <button onClick={() => {}} className="hidden" />
        )}
        {m.corrections?.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {m.corrections.map((c, i) => (
              <div key={i} className="text-xs bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2" dir="ltr">
                <span className="line-through text-red-300 font-mono-en">{c.error}</span>{" "}
                <span className="text-emerald-300 font-mono-en">→ {c.correction}</span>
                {c.tip && <div className="text-amber-200/70 mt-0.5 text-right font-sans" dir="rtl">💡 {c.tip}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionReport({ mode, report, onDone }) {
  if (mode === "assessment") {
    const scores = report.scores || {};
    const data = [
      { k: "الطلاقة", v: scores.fluency || 0 },
      { k: "النطق", v: scores.pronunciation || 0 },
      { k: "المفردات", v: scores.vocabulary || 0 },
      { k: "الاستماع", v: scores.listening || 0 },
      { k: "القواعد", v: scores.grammar || 0 },
    ];
    return (
      <div className="max-w-3xl mx-auto space-y-6" data-testid="assessment-report">
        <div className="card-surface p-8 text-center">
          <p className="text-slate-400 mb-2">مستواك في الإطار الأوروبي المرجعي</p>
          <div className="text-6xl font-heading font-extrabold text-emerald-400 text-glow font-mono-en mb-4" data-testid="assessment-level">
            {report.level}
          </div>
          <p className="text-slate-300 leading-relaxed max-w-xl mx-auto">{report.summary}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-surface p-6">
            <h3 className="font-heading font-bold text-white mb-2">مهاراتك</h3>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={data}>
                <PolarGrid stroke="#2a3446" />
                <PolarAngleAxis dataKey="k" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
                <Radar dataKey="v" stroke="#10B981" fill="#10B981" fillOpacity={0.35} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card-surface p-6 space-y-4">
            <div>
              <h4 className="text-emerald-400 font-semibold text-sm mb-2">نقاط القوة</h4>
              <ul className="space-y-1">
                {(report.strengths || []).map((s, i) => <li key={i} className="text-slate-300 text-sm">✓ {s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-amber-400 font-semibold text-sm mb-2">مجالات التحسين</h4>
              <ul className="space-y-1">
                {(report.weaknesses || []).map((s, i) => <li key={i} className="text-slate-300 text-sm">• {s}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <button onClick={onDone} data-testid="report-done-btn"
          className="w-full py-4 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all">
          عرض خطتي التعليمية
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto" data-testid="session-summary">
      <div className="card-surface p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500 grid place-items-center glow mx-auto mb-6">
          <Trophy className="w-8 h-8 text-[#04120c]" />
        </div>
        <h1 className="text-2xl font-heading font-extrabold text-white mb-2">أحسنت!</h1>
        {report.passed !== undefined && (
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm mb-4 ${report.passed ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
            {report.passed ? `اجتزت التحدي! المستوى الجديد: ${report.next_level}` : "لم تجتز التحدي بعد — واصل التدريب"}
          </div>
        )}
        <p className="text-slate-300 mb-4 leading-relaxed">{report.summary}</p>
        <div className="text-emerald-400 font-mono-en text-lg mb-6">+{report.xp} XP</div>

        {report.new_words?.length > 0 && (
          <div className="text-right mb-6">
            <h4 className="text-white font-semibold text-sm mb-3">كلمات جديدة أُضيفت لبنكك</h4>
            <div className="space-y-2">
              {report.new_words.map((w, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.03] rounded-lg px-3 py-2">
                  <span className="font-mono-en text-emerald-300">{w.word}</span>
                  <span className="text-slate-400 text-sm">{w.meaning}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={onDone} data-testid="report-done-btn"
          className="w-full py-3.5 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all">
          العودة للوحة التحكم
        </button>
      </div>
    </div>
  );
}
