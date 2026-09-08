import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Sparkles, Route, Award, MessageSquare, Volume2, GraduationCap } from "lucide-react";

const features = [
  { icon: Mic, title: "بث مباشر بالصوت", desc: "تحدث مباشرة مع معلّم ذكاء اصطناعي يصحّح نطقك لحظياً بأسلوب مشجّع." },
  { icon: Sparkles, title: "تقييم تكيفي فوري", desc: "محادثة قصيرة تحدد مستواك وفق الإطار الأوروبي CEFR من A1 إلى C2." },
  { icon: Route, title: "خطة تعلّم مخصصة", desc: "خارطة طريق مبنية على نقاط قوتك وضعفك وهدفك: سفر، عمل، أو دراسة." },
  { icon: MessageSquare, title: "قراءة وكتابة تفاعلية", desc: "اقرأ بصوتك وتُظلَّل الأخطاء، واكتب فيصحّح الذكاء الاصطناعي قواعدك آنياً." },
  { icon: Volume2, title: "مراجعة ذكية متباعدة", desc: "بنك مفردات شخصي واختبارات مراجعة ممتعة لتثبيت ما تعلّمته." },
  { icon: Award, title: "شهادة إتقان", desc: "تحديات ترقية بين المستويات وشهادة إنجاز عند الوصول للطلاقة." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      {/* الهيدر العلوي */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl text-white tracking-wide">أُنْصِتْ</span>
            <span className="text-[10px] text-slate-400 tracking-wider">AI English Live</span>
          </div>
        </div>
        <Link
          to="/auth"
          data-testid="header-login-link"
          className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-white/10 transition-all"
        >
          تسجيل الدخول
        </Link>
      </header>

      {/* القسم الرئيسي */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs mb-6">
            <Sparkles className="w-3.5 h-3.5" /> تعلّم مجاني بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.15] mb-6">
            تعلّم <span className="text-emerald-400 text-glow">الإنجليزية</span> بالحديث المباشر
            مع الذكاء الاصطناعي
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl">
            جلسات صوتية حيّة تقيّم مستواك، تبني لك خطة شخصية، وتدرّبك على المحادثة
            والاستماع والقراءة والكتابة — من الصفر حتى الاحتراف.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth"
              data-testid="hero-start-btn"
              className="px-7 py-4 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all glow flex items-center gap-2"
            >
              <Mic className="w-5 h-5" /> ابدأ رحلتك مجاناً
            </Link>
            <a
              href="#features"
              className="px-7 py-4 rounded-full border border-white/15 text-white hover:bg-white/5 transition-all"
            >
              اكتشف المزايا
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="card-surface p-2 rounded-3xl glow overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?crop=entropy&cs=srgb&fm=jpg&q=85&w=900"
              alt="student"
              className="rounded-2xl w-full h-[440px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-6 glass rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="flex items-end gap-1 h-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="wave-bar" style={{ height: "100%", animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
            <span className="text-sm text-white font-mono-en">Listening...</span>
          </div>
        </motion.div>
      </section>

      {/* قسم المزايا */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white text-center mb-14">
          رحلة تعلّم متكاملة في مكان واحد
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="card-surface p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 grid place-items-center mb-5">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* الفوتر السفلي المتكامل */}
      <footer className="w-full bg-[#0b0f19] border-t border-slate-800 text-slate-400 py-12 px-6 md:px-12 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-right" dir="rtl">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">أنْصِتْ – منصة تعلّم الإنجليزية بالذكاء الاصطناعي</h3>
            <p className="text-sm text-slate-400">رحلة تعلّم متكاملة في مكان واحد.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">تواصل</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">صفحات</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">من نحن</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/privacy" className="hover:text-emerald-400 transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">شروط الاستخدام</Link></li>
              <li><Link to="/channels" className="hover:text-emerald-400 transition-colors">قنواتنا</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500" dir="rtl">
          <p>أنْصِتْ – منصة تعلّم الإنجليزية بالذكاء الاصطناعي</p>
          <p className="mt-2 md:mt-0">
            برمجة وتصميم <a href="edm2n@msn.com" target="_blank" rel="noreferrer" className="text-amber-400 font-medium hover:underline">edm2n</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
