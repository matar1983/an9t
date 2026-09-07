import { useEffect, useState } from "react";
import api, { apiErr } from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Library, Plus, Brain, Check, X, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BOX_COLORS = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-emerald-400", "text-cyan-400"];

export default function Vocabulary() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newWord, setNewWord] = useState("");
  const [adding, setAdding] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [user, setUser] = useState(null);

  const load = async () => {
    try {
      const [vocabRes, userRes] = await Promise.all([
        api.get("/vocabulary"),
        api.get("/auth/me").catch(() => ({ data: null }))
      ]);
      setWords(vocabRes.data);
      setUser(userRes.data);
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newWord.trim()) return;
    setAdding(true);
    try {
      await api.post("/vocabulary", { word: newWord.trim() });
      setNewWord("");
      await load();
      toast.success("أُضيفت الكلمة");
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setAdding(false);
    }
  };

  const startQuiz = async () => {
    setQuizLoading(true);
    try {
      const { data } = await api.get("/vocabulary/quiz");
      if (!data.questions?.length) {
        toast.info("لا توجد كلمات مستحقة للمراجعة الآن");
      } else {
        setQuiz({ questions: data.questions, idx: 0, answered: null });
      }
    } catch (e) {
      toast.error(apiErr(e));
    } finally {
      setQuizLoading(false);
    }
  };

  const answer = async (i) => {
    const q = quiz.questions[quiz.idx];
    const correct = i === q.answer_index;
    setQuiz((s) => ({ ...s, answered: i }));
    try {
      if (q.word_id) await api.post("/vocabulary/review", { word_id: q.word_id, correct });
    } catch {}
    setTimeout(() => {
      if (quiz.idx + 1 < quiz.questions.length) {
        setQuiz((s) => ({ ...s, idx: s.idx + 1, answered: null }));
      } else {
        setQuiz(null);
        load();
        toast.success("انتهت المراجعة! أحسنت");
      }
    }, 1100);
  };

  if (quiz) {
    const q = quiz.questions[quiz.idx];
    return (
      <div className="max-w-xl mx-auto" data-testid="vocab-quiz">
        <div className="flex justify-between text-sm text-slate-400 mb-4">
          <span>مراجعة سريعة</span>
          <span className="font-mono-en">{quiz.idx + 1} / {quiz.questions.length}</span>
        </div>
        <div className="card-surface p-8">
          <div className="text-center mb-6">
            <div className="text-3xl font-heading font-extrabold text-white font-mono-en mb-2" dir="ltr">{q.word}</div>
            <p className="text-slate-300">{q.question}</p>
          </div>
          <div className="grid gap-3">
            {q.options.map((opt, i) => {
              let cls = "bg-white/[0.03] border-white/10 hover:border-emerald-500/40";
              if (quiz.answered !== null) {
                if (i === q.answer_index) cls = "bg-emerald-500/20 border-emerald-500/50";
                else if (i === quiz.answered) cls = "bg-red-500/20 border-red-500/50";
              }
              return (
                <button key={i} disabled={quiz.answered !== null} onClick={() => answer(i)}
                  data-testid={`quiz-option-${i}`}
                  className={`px-4 py-3.5 rounded-xl border text-right transition-all flex items-center justify-between ${cls}`}>
                  <span className="text-slate-100">{opt}</span>
                  {quiz.answered !== null && i === q.answer_index && <Check className="w-4 h-4 text-emerald-400" />}
                  {quiz.answered === i && i !== q.answer_index && <X className="w-4 h-4 text-red-400" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {user && user.role === 'admin' && (
        <div className="p-3 bg-indigo-900/40 rounded-xl border border-indigo-500/30 flex items-center justify-between">
          <span className="text-indigo-200 text-sm font-medium">أنت تصفح المنصة بصلاحيات المشرف</span>
          <Link 
            to="/admin" 
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-colors shadow-lg"
          >
            <Shield className="w-4 h-4" />
            <span>العودة لوحة المدير</span>
          </Link>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-3">
            <Library className="w-7 h-7 text-emerald-400" /> بنك المفردات
          </h1>
          <p className="text-slate-400 mt-1">كلماتك الشخصية مع نظام التكرار المتباعد لتثبيتها.</p>
        </div>
        <button onClick={startQuiz} disabled={quizLoading} data-testid="start-quiz-btn"
          className="px-6 py-3 rounded-full bg-indigo-500/90 hover:bg-indigo-500 text-white font-bold flex items-center gap-2">
          {quizLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Brain className="w-5 h-5" />}
          مراجعة ذكية
        </button>
      </div>

      <div className="card-surface p-5 flex gap-3">
        <Input data-testid="vocab-add-word-input" value={newWord} onChange={(e) => setNewWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="أضف كلمة إنجليزية جديدة..." dir="ltr"
          className="bg-[#0f1420] border-white/10 text-white font-en text-left" />
        <Button onClick={add} disabled={adding} data-testid="vocab-add-btn"
          className="bg-emerald-500 hover:bg-emerald-400 text-[#04120c] font-bold">
          {adding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
        </Button>
      </div>

      {loading ? (
        <div className="grid place-items-center py-20"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>
      ) : words.length === 0 ? (
        <div className="card-surface p-12 text-center text-slate-400">
          لا توجد كلمات بعد. أكمل جلسات المحادثة أو أضف كلمات يدوياً لتبدأ.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="vocab-list">
          {words.map((w) => (
            <div key={w.id} className="card-surface p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono-en text-lg text-emerald-300" dir="ltr">{w.display_word}</span>
                <span className={`text-xs font-mono-en ${BOX_COLORS[w.box] || "text-slate-400"}`}>
                  صندوق {w.box}
                </span>
              </div>
              {w.meaning && <p className="text-slate-300 text-sm">{w.meaning}</p>}
              {w.example && <p className="text-slate-500 text-xs mt-1 font-en" dir="ltr">"{w.example}"</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
