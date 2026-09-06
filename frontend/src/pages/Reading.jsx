import { useState } from "react";
import api, { apiErr } from "@/lib/api";
import { useRecorder } from "@/lib/recorder";
import { toast } from "sonner";
import { Loader2, Mic, Square, BookOpen, RefreshCw } from "lucide-react";

export default function Reading() {
  const { recording, start, stop } = useRecorder();
  const [passage, setPassage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const loadPassage = async () => {
    setLoading(true);
    setResult(null);
    try {
      const { data } = await api.get("/reading/passage");
      setPassage(data);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setLoading(false);
    }
  };

  const handleMic = async () => {
    if (!recording) {
      try { await start(); } catch { toast.error("يرجى السماح بالميكروفون"); }
      return;
    }
    const blob = await stop();
    if (!blob) return;
    setAnalyzing(true);
    try {
      const fd = new FormData();
      fd.append("passage", passage.passage);
      fd.append("audio", blob, "audio.webm");
      const { data } = await api.post("/reading/analyze", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setResult(data);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setAnalyzing(false);
    }
  };

  const wordMap = {};
  (result?.words || []).forEach((w) => { wordMap[(w.word || "").toLowerCase().replace(/[^a-z']/g, "")] = w.correct; });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-emerald-400" /> القراءة التفاعلية
        </h1>
        <p className="text-slate-400 mt-1">اقرأ النص بصوتك، وسنحلّل نطقك ونظلّل الكلمات التي تحتاج تكراراً.</p>
      </div>

      {!passage ? (
        <div className="card-surface p-10 text-center">
          <button onClick={loadPassage} disabled={loading} data-testid="load-passage-btn"
            className="px-7 py-3.5 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
            احصل على نص للقراءة
          </button>
        </div>
      ) : (
        <>
          <div className="card-surface p-7" data-testid="reading-passage">
            <h3 className="font-en font-semibold text-white text-lg mb-4" dir="ltr">{passage.title}</h3>
            <p className="font-en text-lg leading-loose text-slate-200" dir="ltr">
              {result
                ? passage.passage.split(/(\s+)/).map((tok, i) => {
                    const clean = tok.toLowerCase().replace(/[^a-z']/g, "");
                    if (!clean) return <span key={i}>{tok}</span>;
                    const correct = wordMap[clean];
                    return (
                      <span key={i} className={correct === false ? "bg-red-500/25 text-red-200 rounded px-0.5" : correct === true ? "text-emerald-300" : ""}>
                        {tok}
                      </span>
                    );
                  })
                : passage.passage}
            </p>
            {passage.glossary?.length > 0 && (
              <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                {passage.glossary.map((g, i) => (
                  <span key={i} className="text-xs bg-white/5 rounded-full px-3 py-1">
                    <span className="font-mono-en text-emerald-300">{g.word}</span> — {g.meaning}
                  </span>
                ))}
              </div>
            )}
          </div>

          {result && (
            <div className="card-surface p-6 flex items-center gap-6" data-testid="reading-result">
              <div className="text-center">
                <div className="text-4xl font-heading font-extrabold text-emerald-400 font-mono-en">{result.accuracy}%</div>
                <div className="text-xs text-slate-400">دقة النطق</div>
              </div>
              <p className="text-slate-300 text-sm flex-1">{result.feedback}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <button data-testid="read-mic-btn" onClick={handleMic} disabled={analyzing}
              className={`relative w-16 h-16 rounded-full grid place-items-center transition-all disabled:opacity-50 ${recording ? "bg-red-500 pulse-ring" : "bg-emerald-500 hover:bg-emerald-400 glow"}`}>
              {analyzing ? <Loader2 className="w-6 h-6 animate-spin text-[#04120c]" /> : recording ? <Square className="w-6 h-6 text-white fill-white" /> : <Mic className="w-7 h-7 text-[#04120c]" />}
            </button>
            <button onClick={loadPassage} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm">
              <RefreshCw className="w-4 h-4" /> نص جديد
            </button>
          </div>
          <p className="text-center text-sm text-slate-400">
            {recording ? "اقرأ النص ثم اضغط للإيقاف" : analyzing ? "جارٍ تحليل نطقك..." : "اضغط الميكروفون واقرأ النص بصوتك"}
          </p>
        </>
      )}
    </div>
  );
}
