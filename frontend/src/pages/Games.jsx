import { useState } from "react";
import { Gamepad2, Volume2, Sparkles, ArrowRight, RotateCcw, Trophy, CheckCircle2 } from "lucide-react";

const GAME_CATEGORIES = [
  {
    id: "colors",
    title: "الألوان باللغة الإنجليزية",
    description: "هل يمكنك التعرف على جميع الألوان الأساسية باللغة الإنجليزية؟ هيا نكتشف! من خلال الألعاب باللغة الانجليزية، يمكنك تعلم 11 كلمة جديدة عن الألوان الأساسية.",
    bg: "from-purple-600 to-indigo-800",
    words: [
      { en: "Red", ar: "أحمر" },
      { en: "Blue", ar: "أزرق" },
      { en: "Green", ar: "أخضر" },
      { en: "Yellow", ar: "أصفر" },
      { en: "Orange", ar: "برتقالي" },
      { en: "Purple", ar: "بنفسجي" },
      { en: "Pink", ar: "وردي" },
      { en: "Black", ar: "أسود" },
      { en: "White", ar: "أبيض" },
      { en: "Brown", ar: "بني" },
      { en: "Gray", ar: "رمادي" }
    ]
  },
  {
    id: "numbers",
    title: "الأرقام من 1-20 باللغة الإنجليزية",
    description: "هيا نتعلم العد من 1 إلى 20 بالإنجليزية! ألعاب تعليم انجليزي توفر تجربة شيقة لتعلم الأرقام. تعلم 20 رقماً باللغة الإنجليزية بطريقة تفاعلية.",
    bg: "from-blue-600 to-indigo-900",
    words: Array.from({ length: 20 }, (_, i) => ({ en: String(i + 1), ar: `رقم ${i + 1}` }))
  },
  {
    id: "body",
    title: "أجزاء الجسم باللغة الإنجليزية",
    description: "استمع إلى كلمات إنجليزية وطابقها مع الصور الصحيحة! استمتع بـ العاب بالانجليزي التي تمكنك من تعلم 14 كلمة إنجليزية جديدة.",
    bg: "from-violet-600 to-purple-900",
    words: [
      { en: "Head", ar: "رأس" },
      { en: "Eye", ar: "عين" },
      { en: "Nose", ar: "أنف" },
      { en: "Mouth", ar: "فم" },
      { en: "Ear", ar: "أذن" },
      { en: "Hand", ar: "يد" },
      { en: "Finger", ar: "إصبع" },
      { en: "Arm", ar: "ذراع" },
      { en: "Leg", ar: "ساق" },
      { en: "Foot", ar: "قدم" },
      { en: "Toe", ar: "إصبع القدم" },
      { en: "Hair", ar: "شعر" },
      { en: "Tooth", ar: "سن" },
      { en: "Face", ar: "وجه" }
    ]
  },
  {
    id: "toys",
    title: "الألعاب باللغة الإنجليزية",
    description: "ماهي لعبتك المفضلة؟ الدب؟ الروبوت؟ يمكنك العثور عليها جميعًا في هذه اللعبة المجانية! الألعاب باللغة الانجليزية تساعد الأطفال على تعلم 10 كلمات جديدة بالإنجليزية.",
    bg: "from-indigo-600 to-blue-900",
    words: [
      { en: "Teddy Bear", ar: "دب محشو" },
      { en: "Robot", ar: "روبوت" },
      { en: "Car", ar: "سيارة لعبة" },
      { en: "Doll", ar: "دمية" },
      { en: "Ball", ar: "كرة" },
      { en: "Puzzle", ar: "لغز تركيب" },
      { en: "Train", ar: "قطار لعبة" },
      { en: "Blocks", ar: "مکعبات" },
      { en: "Balloon", ar: "بالون" },
      { en: "Kite", ar: "طائرة ورقية" }
    ]
  },
  {
    id: "school",
    title: "الأدوات المدرسية باللغة الإنجليزية",
    description: "نحب المدرسة! في هذه اللعبة المجانية، ستتعلم كلمات عن الأدوات المدرسية! مع العاب تعليم اللغة الانجليزية للمبتدئين، تعلم 9 كلمات جديدة بسهولة ومرح.",
    bg: "from-purple-700 to-slate-900",
    words: [
      { en: "Schoolbag", ar: "حقيبة مدرسية" },
      { en: "Notebook", ar: "دفتر" },
      { en: "Pen", ar: "قلم جاف" },
      { en: "Pencil", ar: "قلم رصاص" },
      { en: "Eraser", ar: "ممحاة" },
      { en: "Ruler", ar: "مسطرة" },
      { en: "Book", ar: "كتاب" },
      { en: "Scissors", ar: "مقص" },
      { en: "Glue", ar: "صمغ" }
    ]
  },
  {
    id: "feelings",
    title: "المشاعر باللغة الإنجليزية",
    description: "العب هذه اللعبة المجانية واستكشف المشاعر والأحاسيس المختلفة. لا تحزن، كن سعيدًا! استمتع مع العاب انجليزي في تعلم 7 كلمات إنجليزية جديدة مرتبطة بالمشاعر.",
    bg: "from-blue-700 to-indigo-950",
    words: [
      { en: "Happy", ar: "سعيد" },
      { en: "Sad", ar: "حزين" },
      { en: "Angry", ar: "غاضب" },
      { en: "Tired", ar: "متعب" },
      { en: "Excited", ar: "متحمس" },
      { en: "Scared", ar: "خائف" },
      { en: "Sleepy", ar: "نعسان" }
    ]
  },
  {
    id: "transport",
    title: "المواصلات باللغة الإنجليزية",
    description: "هل تستطيع ركوب دراجة؟ أو قيادة سيارة؟! اضغط على الصور وتعلم كلمات إنجليزية جديدة! من خلال العاب تعليم الاطفال الانجليزية، يمكنك تعلم 7 كلمات جديدة بسهولة.",
    bg: "from-indigo-800 to-purple-950",
    words: [
      { en: "Bus", ar: "حافلة" },
      { en: "Car", ar: "سيارة" },
      { en: "Airplane", ar: "طائرة" },
      { en: "Bicycle", ar: "دراجة" },
      { en: "Train", ar: "قطار" },
      { en: "Boat", ar: "قارب" },
      { en: "Helicopter", ar: "هليكوبتر" }
    ]
  },
  {
    id: "hobbies",
    title: "الهوايات باللغة الإنجليزية",
    description: "اكتشف هواية جديدة ستحبها مع هذه اللعبة اللغوية! العاب تعليم اللغة الانجليزية تقدم تجربة ممتعة لتعلم 14 كلمة جديدة عن الهوايات.",
    bg: "from-purple-800 to-blue-950",
    words: [
      { en: "Gaming", ar: "ألعاب الفيديو" },
      { en: "Reading", ar: "القراءة" },
      { en: "Drawing", ar: "الرسم" },
      { en: "Music", ar: "استماع للموسيقى" },
      { en: "Sports", ar: "الرياضة" },
      { en: "Cooking", ar: "الطبخ" },
      { en: "Photography", ar: "التصوير" },
      { en: "Gardening", ar: "البستنة" },
      { en: "Swimming", ar: "السباحة" },
      { en: "Cycling", ar: "ركوب الدراجات" },
      { en: "Dancing", ar: "الرقص" },
      { en: "Singing", ar: "الغناء" },
      { en: "Writing", ar: "الكتابة" },
      { en: "Fishing", ar: "الصيد" }
    ]
  },
  {
    id: "family",
    title: "أفراد العائلة باللغة الإنجليزية",
    description: "هل يمكنك تسمية أفراد العائلة باللغة الإنجليزية؟ هيا نحاول! تعلم أسماء العائلة عبر العاب بالانجليزي بطريقة شيقة وتفاعلية.",
    bg: "from-blue-800 to-slate-900",
    words: [
      { en: "Father", ar: "أب" },
      { en: "Mother", ar: "أم" },
      { en: "Brother", ar: "أخ" },
      { en: "Sister", ar: "أخت" },
      { en: "Grandfather", ar: "جد" },
      { en: "Grandmother", ar: "جدة" },
      { en: "Baby", ar: "رضيع" }
    ]
  },
  {
    id: "shapes",
    title: "الأشكال باللغة الإنجليزية",
    description: "اختبر معرفتك من خلال لعب هذه اللعبة المجانية! اكتشف الأشكال والصور باللغة الإنجليزية. استمتع بـ العاب انجليزي للاطفال وتعلم 3 كلمات إنجليزية جديدة.",
    bg: "from-indigo-700 to-purple-900",
    words: [
      { en: "Square", ar: "مربع" },
      { en: "Triangle", ar: "مثلث" },
      { en: "Circle", ar: "دائرة" }
    ]
  }
];

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const startGame = (game) => {
    setActiveGame(game);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleAnswer = (word) => {
    if (selectedOption !== null) return;
    setSelectedOption(word.en);
    const correct = word.en === activeGame.words[currentIndex].en;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 10);
      speak(word.en);
    }

    setTimeout(() => {
      if (currentIndex + 1 < activeGame.words.length) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  // توليد خيارات متعددة عشوائية للسؤال الحالي
  const getOptions = () => {
    if (!activeGame) return [];
    const currentWord = activeGame.words[currentIndex];
    const otherWords = activeGame.words.filter(w => w.en !== currentWord.en);
    const shuffledOthers = [...otherWords].sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffledOthers, currentWord].sort(() => Math.random() - 0.5);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 px-4" dir="rtl">
      {/* رأس الصفحة */}
      <div className="card-surface p-6 md:p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent space-y-3 text-center rounded-3xl">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <Gamepad2 className="w-7 h-7" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white">ألعاب منصة أنْصِتْ التعليمية</h1>
        <p className="text-slate-300 text-max max-w-2xl mx-auto text-sm md:text-base">
          اكتشف مجموعة ممتعة وتفاعلية من الألعاب المصممة خصيصاً لتعلم مفردات اللغة الإنجليزية بسهولة ومرح للأطفال والمبتدئين.
        </p>
      </div>

      {!activeGame ? (
        /* قائمة الألعاب (الشبكة الرئيسية) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-3xl p-6 bg-gradient-to-br ${cat.bg} border border-white/10 shadow-xl flex flex-col justify-between space-y-6 hover:scale-[1.02] transition duration-300 relative overflow-hidden group`}
            >
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition"></div>
              
              <div className="space-y-3 relative z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold inline-block">
                  {cat.words.length} كلمات تفاعلية
                </span>
                <h3 className="text-xl font-heading font-bold text-white">{cat.title}</h3>
                <p className="text-slate-200 text-xs leading-relaxed line-clamp-3">{cat.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> مجانية وممتعة
                </span>
                <button
                  onClick={() => startGame(cat)}
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold hover:bg-emerald-400 hover:text-slate-950 transition flex items-center gap-2 shadow-lg cursor-pointer text-sm"
                >
                  العب الآن <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* شاشة اللعبة النشطة التفاعلية */
        <div className="max-w-2xl mx-auto card-surface p-6 md:p-8 space-y-6 border border-white/10 rounded-3xl relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveGame(null)}
              className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" /> العودة لقائمة الألعاب
            </button>
            <span className="text-xs text-emerald-400 font-bold">
              السؤال {currentIndex + 1} من {activeGame.words.length}
            </span>
          </div>

          {!showResult ? (
            <div className="space-y-6 text-center">
              <div className="space-y-2 py-4">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">اختر المعنى الإنجليزي الصحيح لـ:</span>
                <h2 className="text-3xl font-heading font-bold text-emerald-400">{activeGame.words[currentIndex].ar}</h2>
                <button
                  onClick={() => speak(activeGame.words[currentIndex].en)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition text-xs cursor-pointer mt-2"
                >
                  <Volume2 className="w-4 h-4" /> استمع للصوت
                </button>
              </div>

              {/* الخيارات المتعددة */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getOptions().map((opt, idx) => {
                  let btnStyle = "bg-white/[0.05] border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-white";
                  if (selectedOption === opt.en) {
                    btnStyle = isCorrect
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold scale-105"
                      : "bg-rose-500 text-white border-rose-400 font-bold";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      disabled={selectedOption !== null}
                      className={`p-4 rounded-2xl border text-lg font-bold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${btnStyle}`}
                    >
                      {opt.en}
                      {selectedOption === opt.en && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-4">
                <span>النقاط الحالية: <strong className="text-emerald-400">{score}</strong></span>
              </div>
            </div>
          ) : (
            /* شاشة النهاية والنتيجة */
            <div className="text-center space-y-6 py-8">
              <Trophy className="w-20 h-20 text-emerald-400 mx-auto animate-bounce" />
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white">أحسنت يا بطل! أنهيت التحدي</h3>
                <p className="text-slate-300 text-sm">مجموع نقاطك النهائية في قسم {activeGame.title} هو: <span className="text-emerald-400 font-bold text-lg">{score}</span> نقطة.</p>
              </div>
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => startGame(activeGame)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" /> العب مرة أخرى
                </button>
                <button
                  onClick={() => setActiveGame(null)}
                  className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition cursor-pointer"
                >
                  العودة للألعاب
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
