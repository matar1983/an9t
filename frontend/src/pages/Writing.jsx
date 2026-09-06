import { useState } from "react";
import api, { apiErr } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, PenLine, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Writing() {
  const [prompt, setPrompt] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const loadPrompt = async () => {
    setLoading(true);
    setResult(null);
    setText("");
    try {
      const { data } = await api.get("/writing/prompt");
      setPrompt(data);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setLoading(false);
    }
  };

  const check = async () => {
    if (!text.trim()) return toast.error("اكتب إجابتك أولاً");
    setChecking(true);
    try {
      const { data } = await api.post("/writing/check", { prompt: prompt.prompt, text });
      setResult(data);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-3">
          <PenLine className="w-7 h-7 text-emerald-400" /> الكتابة والقواعد
        </h1>
        <p className="text-slate-400 mt-1">اكتب باللغة الإنجليزية، وسيحلّل الذكاء الاصطناعي قواعدك وإملاءك لحظياً.</p>
      </div>

      {!prompt ? (
        <div className="card-surface p-10 text-center">
          <button onClick={loadPrompt} disabled={loading} data-testid="load-writing-btn"
            className="px-7 py-3.5 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 mx-auto">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <PenLine className="w-5 h-5" />}
            احصل على مهمة كتابة
          </button>
        </div>
      ) : (
        <>
          <div className="card-surface p-6" data-testid="writing-prompt">
            <h3 className="font-heading font-semibold text-white mb-1">{prompt.title}</h3>
            <p className="font-en text-slate-200" dir="ltr">{prompt.prompt}</p>
            {prompt.hint && <p className="text-xs text-slate-400 mt-3">💡 {prompt.hint}</p>}
          </div>

          <Textarea
            data-testid="writing-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your answer here..."
            dir="ltr"
            className="min-h-[160px] bg-[#0f1420] border-white/10 text-white font-en text-left"
          />

          <div className="flex gap-3">
            <Button onClick={check} disabled={checking} data-testid="check-writing-btn"
              className="bg-emerald-500 hover:bg-emerald-400 text-[#04120c] font-bold flex-1 h-12">
              {checking ? <Loader2 className="w-5 h-5 animate-spin" /> : "تحقّق من كتابتي"}
            </Button>
            <Button onClick={loadPrompt} variant="outline" className="border-white/10 text-slate-300 h-12">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          {result && (
            <div className="card-surface p-6 space-y-5" data-testid="writing-result">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-heading font-extrabold text-emerald-400 font-mono-en">{result.score}%</div>
                <p className="text-slate-300 text-sm flex-1">{result.feedback}</p>
              </div>

              <div>
                <h4 className="text-emerald-400 text-sm font-semibold mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> النسخة المصحّحة
                </h4>
                <p className="font-en bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-slate-100 leading-relaxed" dir="ltr">
                  {result.corrected_text}
                </p>
              </div>

              {result.issues?.length > 0 && (
                <div>
                  <h4 className="text-amber-400 text-sm font-semibold mb-2">الملاحظات</h4>
                  <div className="space-y-2">
                    {result.issues.map((iss, i) => (
                      <div key={i} className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                        <div dir="ltr" className="text-sm">
                          <span className="line-through text-red-300 font-mono-en">{iss.original}</span>{" "}
                          <span className="text-emerald-300 font-mono-en">→ {iss.correction}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">{iss.explanation}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
