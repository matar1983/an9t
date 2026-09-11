import { useState } from "react";
import { Gamepad2, Trophy, RefreshCw, CheckCircle2, XCircle, Volume2 } from "lucide-react";

const GAME_QUESTIONS = [
  {
    id: 1,
    word: "Apple",
    translation: "تفاحة",
    options: ["تفاحة", "موزة", "برتقالة", "عنب"],
    correct: 0,
  },
  {
    id: 2,
    word: "Hospital",
    translation: "مستشفى",
    options: ["مدرسة", "مستشفى", "مطعم", "مطار"],
    correct: 1,
  },
  {
    id: 3,
    word: "Welcome",
    translation: "أهلاً بك",
    options: ["وداعاً", "شكراً", "أهلاً بك", "صباح الخير"],
    correct: 2,
  },
  {
    id: 4,
    word: "Fast",
    translation: "سريع",
    options: ["بطيء", "سريع", "قصير", "طويل"],
    correct: 1,
  },
];

export default function Games() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = GAME_QUESTIONS[currentIndex];

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    window.speechSynthesis.speak(u);
  };

  const handleSelect = (index) => {
    if (selectedOption !== null) return; // منع التعديل بعد الاختيار
    setSelectedOption(index);
    if (index === currentQ.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < GAME_QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16" dir="rtl">
      {/* رأس الصفحة */}
      <div className="card-surface p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent space-y-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <Gamepad2 className="w-6 h-6" />
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-white">ألعاب وتحديات تدريبية</h1>
        <p className="text-slate-300 text-sm">اختبر حصيلتك اللغوية بطريقة ممتعة وتفاعلية بدون حد لإعادة التمارين.</p>
      </div>

      {!isFinished ? (
        <div className="card-surface p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-4">
            <span>السؤال {currentIndex + 1} من {GAME_QUESTIONS.length}</span>
            <span className="text-emerald-400 font-bold">النقاط: {score}</span>
          </div>

          <div className="text-center space-y-3 py-6">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">ما المعنى الصحيح للكلمة التالية؟</span>
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white font-en" dir="ltr">{currentQ.word}</h2>
              <button
                onClick={() => speak(currentQ.word)}
                className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-[#04120c] transition cursor-pointer"
                title="استطق الكلمة"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3" dir="ltr">
            {currentQ.options.map((option, idx) => {
              let btnStyle = "bg-white/[0.03] border-white/10 text-slate-200 hover:border-emerald-500/40";
              if (selectedOption !== null) {
                if (idx === currentQ.correct) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                } else {
                  btnStyle = "opacity-40 bg-white/[0.01] border-white/5 text-slate-500";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`p-4 rounded-xl border text-center text-base transition cursor-pointer ${btnStyle}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div className="pt-4 flex justify-end">
              <button
                onClick={nextQuestion}
                className="px-6 py-3 rounded-xl bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition cursor-pointer"
              >
                {currentIndex + 1 < GAME_QUESTIONS.length ? "السؤال التالي" : "عرض النتيجة النهائية"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card-surface p-8 text-center space-y-6 border border-emerald-500/30">
          <Trophy className="w-16 h-16 text-emerald-400 mx-auto" />
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">أحسنت! أنهيت التحدي بنجاح</h3>
            <p className="text-slate-300 text-sm">لقد حصلت على {score} من {GAME_QUESTIONS.length} إجابات صحيحة.</p>
          </div>
          <button
            onClick={restartGame}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" /> العب مرة أخرى
          </button>
        </div>
      )}
    </div>
  );
}
