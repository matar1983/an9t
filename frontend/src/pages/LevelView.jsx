import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, CheckCircle, Play, Sparkles, FileText, ArrowLeft } from "lucide-react";

const levelsData = {
  1: {
    title: "المستوى الأول (أساسيات اللغة)",
    cefr: "A1",
    description: "مخصص للمبتدئين لبناء أساس قوي في الحروف، الضمائر، وتكوين الجمل البسيطة.",
    lessons: [
      { id: 1, title: "الضمائر وأسماء الإشارة", duration: "15 دقيقة", content: "شرح تفصيلي لضمائر الفاعل (I, He, Sh, They) وكيفية استخدامها في الجمل البسيطة." },
      { id: 2, title: "فعل الكينونة (To Be)", duration: "20 دقيقة", content: "استخدام am, is, are في الجمل المثبتة، المنفية، وبناء الأسئلة." }
    ],
    homework: "حل تمارين تكوين 10 جمل بسيطة باستخدام ضمائر الفاعل وفعل الكينونة."
  },
  2: {
    title: "المستوى الثاني (القواعد اليومية)",
    cefr: "A2",
    description: "تطوير القدرة على تكوين جمل مركبة واستخدام الأزمان البسيطة والمستمرة بطلاقة.",
    lessons: [
      { id: 1, title: "المضارع البسيط والمستمر", duration: "20 دقيقة", content: "الفرق بين الأحداث المتكررة والأحداث التي تحدث الآن في لحظة الكلام." },
      { id: 2, title: "التعبير عن المستقبل", duration: "25 دقيقة", content: "استخدام will و going to بالطريقة الصحيحة للخطط المستقبلية والتنبؤات." }
    ],
    homework: "اكتب فقرة قصيرة من 5 أسطر تتحدث فيها عن روتينك اليومي باستخدام المضارع البسيط."
  },
  3: {
    title: "المستوى الثالث (القواعد المتقدمة)",
    cefr: "B1",
    description: "التعمق في الروابط، الأسماء الموصولة، والقواعد الأكثر تعقيداً للتواصل المتقدم.",
    lessons: [
      { id: 1, title: "أدوات الربط (Although, Because)", duration: "25 دقيقة", content: "كيف تربط بين الجمل بطريقة احترافية للتعبير عن السبب والتناقض." },
      { id: 2, title: "الضمائر الموصولة (Who, Which, Where)", duration: "30 دقيقة", content: "ربط الجمل ببعضها باحترافية لتكوين جمل مركبة متقدمة." }
    ],
    homework: "حل 5 تمارين ربط جمل باستخدام أدوات التناقض والسبب."
  },
  4: {
    title: "المستوى الرابع (الاحتراف والطلاقة)",
    cefr: "B2+",
    description: "إتقان القواعد المعقدة، المبني للمجهول، والجمل الشرطية المتقدمة للوصول للطلاقة التامة.",
    lessons: [
      { id: 1, title: "المبني للمجهول (Passive Voice)", duration: "30 دقيقة", content: "متى وكيف تحويل الجملة إلى صيغة المجهول في مختلف الأزمان." },
      { id: 2, title: "الحالات الشرطية المتقدمة", duration: "35 دقيقة", content: "استخدام الحالة الشرطية الثانية والثالثة بطلاقة للتعبير عن الافتراضات." }
    ],
    homework: "صيغ 3 جمل شرطية معقدة تعبر عن مواقف افتراضية في الماضي."
  }
};

export default function LevelView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const levelId = parseInt(id) || 1;
  const level = levelsData[levelId] || levelsData[1];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6" dir="rtl">
      <button 
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition mb-4 text-sm font-bold"
      >
        <ArrowRight className="w-4 h-4" /> العودة إلى لوحة التحكم
      </button>

      <div className="card-surface p-8 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono-en text-xs font-bold">
            {level.cefr}
          </span>
          <span className="text-slate-400 text-sm">المستوى {levelId} من 4</span>
        </div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-3">{level.title}</h1>
        <p className="text-slate-300 text-base leading-relaxed">{level.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" /> الشروحات والدروس المقررة
        </h2>

        <div className="grid gap-4">
          {level.lessons.map((lesson, idx) => (
            <div key={lesson.id} className="card-surface p-6 border-white/10 hover:border-emerald-500/50 transition">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-mono-en text-emerald-400 mb-1">الدرس {idx + 1} • {lesson.duration}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{lesson.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{lesson.content}</p>
                </div>
                <button 
                  onClick={() => navigate(`/session/practice?lesson=${lesson.id}&level=${levelId}`)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 font-bold text-sm transition flex items-center gap-2 shrink-0"
                >
                  <Play className="w-4 h-4 fill-current" /> ابدأ الدرس
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-surface p-6 border-indigo-500/20 bg-indigo-500/5">
        <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-indigo-400" /> الواجب والتمارين العملية للمستوى
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{level.homework}</p>
        <button 
          onClick={() => navigate("/writing")}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow"
        >
          تسليم الواجب وتصحيحه بالذكاء الاصطناعي
        </button>
      </div>
    </div>
  );
}
