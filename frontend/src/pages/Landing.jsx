import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Sparkles, Route, Award, MessageSquare, Volume2, X, Send } from "lucide-react";
import api from "../lib/api"; // استيراد ملف الاتصال الموحد

const features = [
  { icon: Mic, title: "بث مباشر بالصوت", desc: "تحدث مباشرة مع معلّم ذكاء اصطناعي يصحّح نطقك لحظياً بأسلوب مشجّع." },
  { icon: Sparkles, title: "تقييم تكيفي فوري", desc: "محادثة قصيرة تحدد مستواك وفق الإطار الأوروبي CEFR من A1 إلى C2." },
  { icon: Route, title: "خطة تعلّم مخصصة", desc: "خارطة طريق مبنية على نقاط قوتك وضعفك وهدفك: سفر، عمل، أو دراسة." },
  { icon: MessageSquare, title: "قراءة وكتابة تفاعلية", desc: "اقرأ بصوتك وتُظلَّل الأخطاء، واكتب فيصحّح الذكاء الاصطناعي قواعدك آنياً." },
  { icon: Volume2, title: "مراجعة ذكية متباعدة", desc: "بنك مفردات شخصي واختبارات مراجعة ممتعة لتثبيت ما تعلّمته." },
  { icon: Award, title: "شهادة إتقان", desc: "تحديات ترقية بين المستويات وشهادة إنجاز عند الوصول للطلاقة." },
];

export default function Landing() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // حالة لتخزين إعدادات الموقع القادمة من السيرفر
  const [siteSettings, setSiteSettings] = useState({
    seoDescription: "رحلة تعلّم متكاملة في مكان واحد.",
    footerText: "جميع الحقوق محفوظة © 2026",
    maintenanceMode: false
  });

  // جلب الإعدادات عند تحميل الصفحة
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings');
        const data = response.data;
        if (data) {
          setSiteSettings({
            seoDescription: data.seo_description ?? "رحلة تعلّم متكاملة في مكان واحد.",
            footerText: data.footer_text ?? "جميع الحقوق محفوظة © 2026",
            maintenanceMode: !!data.maintenance_mode,
          });
        }
      } catch (error) {
        console.error("خطأ في جلب إعدادات الموقع:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toISOString(),
      read: false
    };

    try {
      const existingMessages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
      localStorage.setItem('admin_messages', JSON.stringify([newMessage, ...existingMessages]));

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsContactOpen(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error("خطأ في حفظ الرسالة", error);
    }
  };

  // شاشة الصيانة تظهر للزوّار العاديين فقط عند تفعيل وضع الصيانة من لوحة التحكم
  if (siteSettings.maintenanceMode) {
    return (
      <div className="min-h-screen bg-[#0b1d31] text-white flex items-center justify-center px-6" dir="rtl">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#00b4d8]/10 border border-[#00b4d8]/20 flex items-center justify-center mx-auto mb-6 overflow-hidden p-2">
            <img src="https://raw.githubusercontent.com/matar1983/an9t/main/logo.png" alt="An9t Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-3">الموقع تحت الصيانة حالياً</h1>
          <p className="text-slate-400 leading-relaxed">
            نعمل على تحسين المنصة، سنعود قريباً بإذن الله. شكراً لصبرك.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1d31] text-white">
      {/* الهيدر العلوي */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0b1d31] border border-cyan-500/30 flex items-center justify-center overflow-hidden glow">
            <img src="https://raw.githubusercontent.com/matar1983/an9t/main/logo.png" alt="An9t Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl text-white tracking-wide">أُنْصِتْ</span>
            <span className="text-[10px] text-[#00b4d8] tracking-wider font-en">AI English Live</span>
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00b4d8]/10 border border-[#00b4d8]/20 text-[#00b4d8] text-xs mb-6">
            <Sparkles className="w-3.5 h-3.5" /> تعلّم مجاني بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white leading-[1.15] mb-6">
            تعلّم <span className="text-[#00b4d8] text-glow">الإنجليزية</span> بالحديث المباشر
            مع الذكاء الاصطناعي
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
            {siteSettings.seoDescription || "جلسات صوتية حيّة تقيّم مستواك، تبني لك خطة شخصية، وتدرّبك على المحادثة والاستماع والقراءة والكتابة — من الصفر حتى الاحتراف."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/auth"
              data-testid="hero-start-btn"
              className="px-7 py-4 rounded-full bg-[#00b4d8] text-[#0b1d31] font-bold hover:bg-[#0096c7] transition-all glow flex items-center gap-2"
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
                <span key={i} className="wave-bar bg-[#00b4d8]" style={{ height: "100%", animationDelay: `${i * 0.12}s` }} />
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
                className="card-surface p-7 border border-white/10 hover:border-[#00b4d8]/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00b4d8]/15 grid place-items-center mb-5">
                  <Icon className="w-6 h-6 text-[#00b4d8]" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* الفوتر السفلي المتكامل */}
      <footer className="w-full bg-[#0b1d31] border-t border-white/10 text-slate-300 py-12 px-6 md:px-12 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-right" dir="rtl">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">أنْصِتْ – منصة تعلّم الإنجليزية بالذكاء الاصطناعي</h3>
            <p className="text-sm text-slate-300">رحلة تعلّم متكاملة في مكان واحد.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">تواصل</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#00b4d8] transition-colors text-right cursor-pointer"
                >
                  اتصل بنا
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">صفحات</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#00b4d8] transition-colors">من نحن</Link></li>
              <li><Link to="/faq" className="hover:text-[#00b4d8] transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/privacy" className="hover:text-[#00b4d8] transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-[#00b4d8] transition-colors">شروط الاستخدام</Link></li>
              <li><Link to="/channels" className="hover:text-[#00b4d8] transition-colors">قنواتنا</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400" dir="rtl">
          <p>{siteSettings.footerText || "جميع الحقوق محفوظة © 2026"}</p>
          <p className="mt-2 md:mt-0">
            برمجة وتصميم <span className="text-[#d4af37] font-medium">edm2n</span>
          </p>
        </div>
      </footer>

      {/* النافذة المنبثقة (Modal) الخاصة باتصل بنا */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" dir="rtl">
          <div className="bg-[#0b1d31] border border-white/15 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl text-white">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 left-5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 text-right">
              <h3 className="text-xl font-bold mb-1">التواصل مع الدعم الفني</h3>
              <p className="text-xs text-slate-300">سترسل الرسالة إلى: <span className="text-[#d4af37] font-mono">edm2n@msn.com</span></p>
            </div>

            {submitted ? (
              <div className="py-12 text-center text-[#00b4d8] font-bold text-base bg-[#00b4d8]/10 rounded-2xl border border-[#00b4d8]/20 mb-4 animate-pulse">
                تم إرسال رسالتك بنجاح، شكراً لتواصلك!
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/80 border border-[#d4af37]/60 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37] placeholder:text-slate-600 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00b4d8] placeholder:text-slate-600 text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">الرسالة</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="اكتب رسالتك..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00b4d8] placeholder:text-slate-600 resize-none text-right"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-[#0b1d31] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> إرسال
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
