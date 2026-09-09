import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Mic, Flame, Trophy, Library, RefreshCw, Sparkles, Route, CheckCircle2,
  ArrowLeft, BookOpen, PenLine, Rocket, Loader2, X, CheckCircle
} from "lucide-react";

const CEFR = ["A1", "A2", "B1", "B2", "C1", "C2"];

// أسئلة تحديد المستوى الـ 15
const placementQuestions = [
  { id: 1, question: "I ___ a student.", options: ["is", "am", "are", "لا أعلم"], correct: "am" },
  { id: 2, question: "He ___ to school every day.", options: ["going", "goes", "go", "لا أعلم"], correct: "goes" },
  { id: 3, question: "Sarah and I are friends. ___ study together.", options: ["He", "we", "They", "لا أعلم"], correct: "we" },
  { id: 4, question: "I have ___ apple in my bag.", options: ["the", "an", "a", "لا أعلم"], correct: "an" },
  { id: 5, question: "When I was a child, I ___ in a small village.", options: ["use to live", "was live", "used to live", "لا أعلم"], correct: "used to live" },
  { id: 6, question: "The coffee is ___ hot to drink.", options: ["enough", "so", "too", "لا أعلم"], correct: "too" },
  { id: 7, question: "We ___ visit our grandparents tomorrow.", options: ["go to", "are going to", "went to", "لا أعلم"], correct: "are going to" },
  { id: 8, question: '"___ do you live?"', options: ["Who", "what", "Where", "لا أعلم"], correct: "Where" },
  { id: 9, question: "___ it was raining, we went hiking.", options: ["Although", "Because", "Therefore", "لا أعلم"], correct: "Although" },
  { id: 10, question: "The man ___ lives next door is a teacher.", options: ["who", "which", "where", "لا أعلم"], correct: "who" },
  { id: 11, question: "If I had more time, I ___ travel the world.", options: ["will", "would", "can", "لا أعلم"], correct: "would" },
  { id: 12, question: "This book ___ by a famous author last year.", options: ["wrote", "was written", "is written", "لا أعلم"], correct: "was written" },
  { id: 13, question: "I look forward to ___ you soon.", options: ["see", "seeing", "saw", "لا أعلم"], correct: "seeing" },
  { id: 14, question: "She speaks English very ___. ", options: ["good", "fluent", "fluently", "لا أعلم"], correct: "fluently" },
  { id: 15, question: "Hardly had I arrived home ___ the phone rang.", options: ["when", "than", "then", "لا أعلم"], correct: "when" }
];

// تفاصيل المستويات الأربعة والدروس والواجبات
const levelsDetails = {
  1: {
    title: "المستوى الأول (أساسيات اللغة)",
    cefr: "A1",
    description: "مخصص للمبتدئين لبناء أساس قوي في الحروف، الضمائر، وتكوين الجمل البسيطة.",
    lessons: [
      { id: 1, title: "الضمائر وأسماء الإشارة", content: "شرح تفصيلي لضمائر الفاعل (I, He, She, They) وكيفية استخدامها." },
      { id: 2, title: "فعل الكينونة (To Be)", content: "استخدام am, is, are في الجمل المثبتة والمنفية." }
    ],
    homework: "حل تمارين تكوين 10 جمل بسيطة باستخدام ضمائر الفاعل."
  },
  2: {
    title: "المستوى الثاني (القواعد اليومية)",
    cefr: "A2",
    description: "تطوير القدرة على تكوين جمل مركبة واستخدام الأزمان البسيطة والمستمرة.",
    lessons: [
      { id: 1, title: "المضارع البسيط والمستمر", content: "الفرق بين الأحداث المتكررة والأحداث التي تحدث الآن." },
      { id: 2, title: "التعبير عن المستقبل", content: "استخدام will و going to بالطريقة الصحيحة." }
    ],
    homework: "اكتب فقرة قصيرة من 5 أسطر تتحدث فيها عن روتينك اليومي."
  },
  3: {
    title: "المستوى الثالث (القواعد المتقدمة)",
    cefr: "B1",
    description: "التعمق في الروابط، الأسماء الموصولة، والقواعد الأكثر تعقيداً.",
    lessons: [
      { id: 1, title: "أدوات الربط (Although, Because)", content: "كيف تربط بين الجمل للتعبير عن السبب والتناقض." },
      { id: 2, title: "الضمائر الموصولة (Who, Which, Where)", content: "ربط الجمل ببعضها باحترافية." }
    ],
    homework: "حل 5 تمارين ربط جمل باستخدام أدوات التناقض والسبب."
  },
  4: {
    title: "المستوى الرابع (الاحتراف والطلاقة)",
    cefr: "B2+",
    description: "إتقان القواعد المعقدة، المبني للمجهول، والجمل الشرطية المتقدمة.",
    lessons: [
      { id: 1, title: "المبني للمجهول (Passive Voice)", content: "متى وكيف تحويل الجملة إلى صيغة المجهول." },
      { id: 2, title: "الحالات الشرطية المتقدمة", content: "استخدام الحالة الشرطية الثانية والثالثة بطلاقة." }
    ],
    homework: "صيغ 3 جمل شرطية معقدة تعبر عن مواقف افتراضية في الماضي."
  }
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  // حالات اختبار تحديد المستوى التفاعلي داخل لوحة التحكم
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  // عرض تفاصيل مستوى معين (المستويات 1 إلى 4)
  const [selectedLevelView, setSelectedLevelView] = useState(null);

  useEffect(() => {
    api.get("/profile/stats").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  if (!stats)
    return <div className="grid place-items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const levelIdx = CEFR.indexOf(stats.cefr_level) + 1;
  const progressPct = stats.assessment_done ? (levelIdx / 6) * 100 : 0;

  // بدء الاختبار
  const handleStartAssessmentModal = () => {
    setCurrentQuestionIdx(0);
    setTestAnswers({});
    setTestResult(null);
    setIsTestOpen(true);
  };

  // اختيار إجابة
  const handleSelectOption = (opt) => {
    const newAnswers = { ...testAnswers, [currentQuestionIdx]: opt };
    setTestAnswers(newAnswers);

    if (currentQuestionIdx < placementQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    }
  };

  // إنهاء الاختبار وحساب المستوى
  const handleFinishAssessment = () => {
    let score = 0;
    placementQuestions.forEach((q, idx) => {
      if (testAnswers[idx] === q.correct) score++;
    });

    let assignedLvl = 1;
    if (score >= 12) assignedLvl = 4;
    else if (score >= 8) assignedLvl = 3;
    else if (score >= 4) assignedLvl = 2;
    else assignedLvl = 1;

    setTestResult(assignedLvl);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8" data-testid="student-dashboard" dir="rtl">
      
      {/* رأس الصفحة */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            أهلاً {user?.name || "مطر"} 👋
          </h1>
          <p className="text-slate-400 mt-1">لنكمل رحلتك نحو إتقان الإنجليزية</p>
        </div>
      </div>

      {/* بانر تحديد المستوى إذا لم يكتمل */}
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
            <p className="text-slate-400 text-sm">اختبار تفاعلي (15 سؤالاً) يحدد مستواك بدقة ويوجهك للدروس المناسبة.</p>
          </div>
          <button
            data-testid="start-assessment-btn"
            onClick={handleStartAssessmentModal}
            className="px-6 py-3.5 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all flex items-center gap-2 shrink-0 shadow-lg"
          >
            <Mic className="w-5 h-5" /> ابدأ التقييم
          </button>
        </motion.div>
      )}

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={Trophy} label="المستوى الحالي" value={stats.cefr_level || "—"} testid="cefr-level-badge" accent />
        <StatCard icon={Flame} label="نقاط الخبرة" value={`${stats.xp} XP`} />
        <StatCard icon={Rocket} label="جلسات مكتملة" value={stats.sessions_completed} />
        <StatCard icon={Library} label="كلمات محفوظة" value={stats.vocab_count} />
      </div>

      {/* قسم تصفح المستويات الأربعة السريعة */}
      <div className="card-surface p-6">
        <h3 className="font-heading font-bold text-white text-lg mb-4">📚 مستويات المنصة والدروس (1 إلى 4)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((lvlNum) => (
            <div
              key={lvlNum}
              onClick={() => setSelectedLevelView(levelsDetails[lvlNum])}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500 cursor-pointer transition"
            >
              <div className="text-emerald-400 font-bold mb-1">المستوى {lvlNum}</div>
              <div className="text-xs text-slate-300 line-clamp-1">{levelsDetails[lvlNum].title}</div>
              <div className="text-[10px] text-slate-500 mt-2">انقر لعرض الدروس والواجبات</div>
            </div>
          ))}
        </div>
      </div>

      {/* تقدم CEFR */}
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

      {/* إجراءات سريعة */}
      <div>
        <h3 className="font-heading font-bold text-white text-lg mb-4">تابع التعلّم</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ActionCard icon={Mic} title="محادثة مباشرة" desc="تدرّب بالصوت" onClick={() => navigate("/session/practice")} testid="action-practice" />
          <ActionCard icon={BookOpen} title="قراءة تفاعلية" desc="اقرأ بصوتك" onClick={() => navigate("/reading")} testid="action-reading" />
          <ActionCard icon={PenLine} title="كتابة وقواعد" desc="صحّح كتابتك" onClick={() => navigate("/writing")} testid="action-writing" />
          <ActionCard icon={RefreshCw} title={`مراجعة (${stats.due_review})`} desc="تكرار متباعد" onClick={() => navigate("/vocabulary")} testid="action-review" />
        </div>
      </div>

      {/* خريطة طريق والواجبات */}
      <div className="grid lg:grid-cols-2 gap-6">
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
            <p className="text-slate-500 text-sm">لا توجد واجبات بعد، ابدأ التقييم للحصول على واجبات مستواك.</p>
          )}
        </div>
      </div>

      {/* نافذة اختبار تحديد المستوى المباشر (15 سؤالاً) */}
      {isTestOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 w-full max-w-xl p-8 rounded-2xl shadow-2xl relative text-white">
            <button 
              onClick={() => setIsTestOpen(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {!testResult ? (
              <div>
                <div className="flex justify-between items-center text-xs text-slate-400 mb-6">
                  <span>اختبار تحديد المستوى</span>
                  <span className="text-emerald-400 font-bold">السؤال {currentQuestionIdx + 1} من 15</span>
                </div>

                <h3 className="text-xl font-bold mb-6 text-center">
                  {placementQuestions[currentQuestionIdx].question}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {placementQuestions[currentQuestionIdx].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-xl font-medium border text-right transition ${
                        testAnswers[currentQuestionIdx] === opt
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  {currentQuestionIdx > 0 && (
                    <button 
                      onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                      className="px-4 py-2 bg-slate-800 rounded-lg text-sm text-slate-300"
                    >
                      السابق
                    </button>
                  )}
                  {currentQuestionIdx < placementQuestions.length - 1 ? (
                    <button 
                      onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                      className="px-6 py-2 bg-emerald-600 rounded-lg text-sm font-bold mr-auto"
                    >
                      التالي
                    </button>
                  ) : (
                    <button 
                      onClick={handleFinishAssessment}
                      className="px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold mr-auto shadow"
                    >
                      إنهاء وعرض النتيجة
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6 py-4">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-emerald-400">🎉 تم تحديد مستواك بنجاح!</h3>
                <p className="text-slate-300">
                  بناءً على إجاباتك، تم توجيهك إلى: <span className="text-emerald-400 font-bold">{levelsDetails[testResult].title}</span>
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-right text-sm text-slate-300">
                  <p className="font-bold text-white mb-1">الواجب المقترح:</p>
                  <p>{levelsDetails[testResult].homework}</p>
                </div>
                <button
                  onClick={() => {
                    setIsTestOpen(false);
                    setSelectedLevelView(levelsDetails[testResult]);
                  }}
                  className="px-8 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition"
                >
                  استعراض دروس وشروحات المستوى
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة عرض تفاصيل المستوى والدروس والواجبات المختار */}
      {selectedLevelView && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 w-full max-w-2xl p-8 rounded-2xl shadow-2xl relative text-white max-h-[90vh] overflow-y-auto" dir="rtl">
            <button 
              onClick={() => setSelectedLevelView(null)}
              className="absolute top-4 left-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-emerald-400 mb-2">{selectedLevelView.title}</h2>
            <p className="text-slate-300 text-sm mb-6">{selectedLevelView.description}</p>

            <h3 className="font-bold text-white text-base mb-3">📚 الشروحات والدروس التفاعلية:</h3>
            <div className="space-y-3 mb-6">
              {selectedLevelView.lessons.map((l) => (
                <div key={l.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="font-bold text-emerald-300 mb-1">{l.title}</div>
                  <div className="text-xs text-slate-400">{l.content}</div>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-white text-base mb-3">✍️ الواجبات والتمارين:</h3>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200 text-sm mb-6">
              {selectedLevelView.homework}
            </div>

            <button
              onClick={() => setSelectedLevelView(null)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

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
