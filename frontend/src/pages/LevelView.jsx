import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Play, BookOpen, Volume2 } from "lucide-react";

const levelsData = {
  1: {
    title: "المستوى الأول (أساسيات اللغة)",
    lessons: {
      1: { title: "الضمائر وأسماء الإشارة", duration: "15 دقيقة", description: "شرح تفصيلي لضمائر الفاعل (I, He, She, They) وكيفية استخدامها في الجمل البسيطة." },
      2: { title: "فعل الكينونة (To Be)", duration: "20 دقيقة", description: "استخدام am, is, are في الجمل المثبتة، المنفية، وبناء الأسئلة." }
    }
  },
  2: {
    title: "المستوى الثاني (القواعد اليومية)",
    lessons: {
      1: { title: "المضارع البسيط والمستمر", duration: "20 دقيقة", description: "الفرق بين الأحداث المتكررة والأحداث التي تحدث الآن في لحظة الكلام." },
      2: { title: "التعبير عن المستقبل", duration: "25 دقيقة", description: "استخدام will و going to بالطريقة الصحيحة للخطط المستقبلية والتنبؤات." }
    }
  },
  3: {
    title: "المستوى الثالث (القواعد المتقدمة)",
    lessons: {
      1: { title: "أدوات الربط (Although, Because)", duration: "25 دقيقة", description: "كيف تربط بين الجمل بطريقة احترافية للتعبير عن السبب والتناقض." },
      2: { title: "الضمائر الموصولة (Who, Which, Where)", duration: "30 دقيقة", description: "ربط الجمل ببعضها باحترافية لتكوين جمل مركبة متقدمة." }
    }
  },
  4: {
    title: "المستوى الرابع (الاحتراف والطلاقة)",
    lessons: {
      1: { title: "المبني للمجهول (Passive Voice)", duration: "30 دقيقة", description: "متى وكيف تحويل الجملة إلى صيغة المجهول في مختلف الأزمان." },
      2: { title: "الحالات الشرطية المتقدمة", duration: "35 دقيقة", description: "استخدام الحالة الشرطية الثانية والثالثة بطلاقة للتعبير عن الافتراضات." }
    }
  }
};

export default function LessonView() {
  const { levelId, lessonId } = useParams();
  const navigate = useNavigate();

  const currentLevel = levelsData[levelId] || levelsData[1];
  const currentLesson = currentLevel.lessons[lessonId] || currentLevel.lessons[1];

  // وظيفة نطق النص (Text-to-Speech) لتفعيل زر الاستماع
  const handleAudioPlay = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${currentLesson.title}. ${currentLesson.description}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US'; // يمكن تغييرها حسب لغة الدرس
      window.speechSynthesis.speak(utterance);
    } else {
      alert("متصفحك لا يدعم خاصية التحدث الصوتي.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-8 px-4" dir="rtl">
      {/* زر العودة للمستوى الصحيح */}
      <button 
        onClick={() => navigate(`/levels/${levelId}`)}
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-bold"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للمستوى</span>
      </button>

      {/* رأس الدرس */}
      <div className="card-surface p-6 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-mono font-bold">
            المستوى {levelId} • الدرس {lessonId}
          </span>
          <span className="text-slate-400 text-sm font-mono">{currentLesson.duration}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentLesson.title}</h1>
        <p className="text-slate-300 text-sm leading-relaxed">{currentLesson.description}</p>
      </div>

      {/* محتوى الشرح التفاعلي */}
      <div className="card-surface p-6 border-white/10 space-y-4 rounded-2xl bg-slate-900/50">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          محتوى الشرح التفاعلي
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm">
          {currentLesson.description} يتم التركيز هنا على التطبيق المباشر، النطق الصحيح، والأمثلة العملية لتثبيت المعلومة.
        </p>
        
        {/* زر الاستماع المفعل */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">استمع للنطق الصحيح بالصوت الحي</p>
            <p className="text-xs text-slate-400">تدرب مع مساعد الذكاء الاصطناعي</p>
          </div>
          <button 
            onClick={handleAudioPlay}
            className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition cursor-pointer"
            title="استمع للدرس"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* زر بدء المحادثة الصوتية الحية للدرس */}
      <div className="pt-2">
        <button 
          onClick={() => navigate('/live')}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 text-base cursor-pointer"
        >
          <Play className="w-5 h-5 fill-current" />
          ابدأ المحادثة الصوتية الحية لهذا الدرس
        </button>
      </div>
    </div>
  );
}
