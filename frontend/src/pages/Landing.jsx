import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mic, Sparkles, Route, Award, MessageSquare, Volume2, X, Send } from "lucide-react";
import api from "../lib/api";

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

  const [siteSettings, setSiteSettings] = useState({
    seoDescription: "رحلة تعلّم متكاملة في مكان واحد.",
    footerText: "جميع الحقوق محفوظة © 2026",
    maintenanceMode: false
  });

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

  if (siteSettings.maintenanceMode) {
    return (
      <div className="min-h-screen bg-[#f5f5f3] text-[#203e56] flex items-center justify-center px-6" dir="rtl">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-[#edece7] border border-[#888161]/30 flex items-center justify-center mx-auto mb-6 overflow-hidden p-2 shadow-sm">
            <img src="https://raw.githubusercontent.com/matar1983/an9t/main/logo.png" alt="An9t Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-[#203e56] mb-3">الموقع تحت الصيانة حالياً</h1>
          <p className="text-[#67614b] leading-relaxed">
            نعمل على تحسين المنصة، سنعود قريباً بإذن الله. شكراً لصبرك.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#2c3e50]" dir="rtl">
      {/* الهيدر العلوي */}
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 border-b border-[#dedcd5]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#edece7] border border-[#47838d]/40 flex items-center justify-center overflow-hidden shadow-sm">
            <img src="https://raw.githubusercontent.com/matar1983/an9t/main/logo.png" alt="An9t Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-right">
            <span className="font-heading font-extrabold text-xl text-[#203e56] tracking-wide">أُنْصِتْ</span>
            <span className="text-[10px] text-[#47838d] tracking-wider font-en font-semibold">AI English Live</span>
          </div>
        </div>
        <Link
          to="/auth"
          data-testid="header-login-link"
          className="px-5 py-2.5 rounded-full bg-[#edece7] border border-[#888161]/30 text-[#2c3e50] text-sm hover:bg-[#e4e2db] transition-all font-semibold shadow-xs"
        >
          تسجيل الدخول
        </Link>
      </header>

      {/* القسم الرئيسي */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-right"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#edece7] border border-[#47838d]/30 text-[#47838d] text-xs font-bold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> تعلّم مجاني بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-heading font-extrabold text-[#203e56] leading-[1.2] mb-6">
            تعلّم <span className="text-[#47838d]">الإنجليزية</span> بالحديث المباشر مع الذكاء الاصطناعي
          </h1>
          <p className="text-lg text-[#67614b] leading-relaxed mb-8 max-w-xl font-medium">
            {siteSettings.seoDescription || "جلسات صوتية حيّة تقيّم مستواك، تبني لك خطة شخصية، وتدرّبك على المحادثة والاستماع والقراءة والكتابة — من الصفر حتى الاحتراف."}
          </p>
          <div className="flex flex-wrap gap-4 justify-start">
            <Link
              to="/auth"
              data-testid="hero-start-btn"
              className="px-7 py-4 rounded-full bg-[#47838d] text-white font-bold hover:bg-[#3d6f79] transition-all shadow-md flex items-center gap-2"
            >
              <Mic className="w-5 h-5" /> ابدأ رحلتك مجاناً
            </Link>
            <a
              href="#features"
              className="px-7 py-4 rounded-full bg-[#edece7] border border-[#888161]/40 text-[#2c3e50] font-bold hover:bg-[#e4e2db] transition-all shadow-xs"
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
          <div className="bg-[#edece7] p-3 rounded-3xl shadow-xl border border-[#888161]/25 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?crop=entropy&cs=srgb&fm=jpg&q=85&w=900"
              alt="student"
              className="rounded-2xl w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 right-6 bg-[#f5f5f3]/95 backdrop-blur-md border border-[#888161]/30 rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-lg">
            <div className="flex items-end gap-1 h-7">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="wave-bar bg-[#47838d]" style={{ height: "100%", animationDelay: `${i * 0.12}s` }} />
              ))}
            </div>
            <span className="text-sm text-[#203e56] font-mono-en font-bold" dir="ltr">Listening...</span>
          </div>
        </motion.div>
      </section>

      {/* قسم المزايا */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#203e56] text-center mb-12">
          رحلة تعلّم متكاملة في مكان واحد
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-right">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#edece7] p-7 rounded-2xl border border-[#888161]/25 hover:border-[#47838d] transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#47838d]/15 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#47838d]" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#203e56] mb-2">{f.title}</h3>
                  <p className="text-[#67614b] leading-relaxed text-sm font-medium">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* الفوتر السفلي المتكامل */}
      <footer className="w-full bg-[#edece7] border-t border-[#888161]/25 text-[#67614b] py-12 px-6 md:px-12 mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-right">
          <div>
            <h3 className="text-[#203e56] font-bold text-lg mb-3">أنْصِتْ – منصة تعلّم الإنجليزية بالذكاء الاصطناعي</h3>
            <p className="text-sm text-[#67614b] font-medium">رحلة تعلّم متكاملة في مكان واحد.</p>
          </div>
          <div>
            <h4 className="text-[#203e56] font-semibold mb-3">تواصل</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#47838d] transition-colors text-right cursor-pointer font-medium"
                >
                  اتصل بنا
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#203e56] font-semibold mb-3">صفحات</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><Link to="/about" className="hover:text-[#47838d] transition-colors">من نحن</Link></li>
              <li><Link to="/faq" className="hover:text-[#47838d] transition-colors">الأسئلة الشائعة</Link></li>
              <li><Link to="/privacy" className="hover:text-[#47838d] transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-[#47838d] transition-colors">شروط الاستخدام</Link></li>
              <li><Link to="/channels" className="hover:text-[#47838d] transition-colors">قنواتنا</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-[#888161]/20 flex flex-col md:flex-row items-center justify-between text-sm text-[#888161]" dir="rtl">
          <p className="font-medium">{siteSettings.footerText || "جميع الحقوق محفوظة © 2026"}</p>
          <p className="mt-2 md:mt-0 font-semibold">
            برمجة وتصميم <span className="text-[#888161]">edm2n</span>
          </p>
        </div>
      </footer>

      {/* النافذة المنبثقة (Modal) الخاصة باتصل بنا */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" dir="rtl">
          <div className="bg-[#f5f5f3] border border-[#888161]/30 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl text-[#203e56]">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 left-5 text-[#888161] hover:text-[#203e56] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 text-right">
              <h3 className="text-xl font-bold mb-1 text-[#203e56]">التواصل مع الدعم الفني</h3>
              <p className="text-xs text-[#67614b]">سترسل الرسالة إلى: <span className="text-[#888161] font-mono font-semibold">edm2n@msn.com</span></p>
            </div>

            {submitted ? (
              <div className="py-12 text-center text-[#47838d] font-bold text-base bg-[#edece7] rounded-2xl border border-[#47838d]/30 mb-4 animate-pulse">
                تم إرسال رسالتك بنجاح، شكراً لتواصلك!
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-right">
                <div>
                  <label className="block text-xs font-bold text-[#203e56] mb-1.5">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#edece7] border border-[#888161]/40 rounded-xl px-4 py-2.5 text-sm text-[#203e56] focus:outline-none focus:ring-1 focus:ring-[#47838d] placeholder:text-[#888161]/60 text-right font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#203e56] mb-1.5">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#edece7] border border-[#888161]/40 rounded-xl px-4 py-2.5 text-sm text-[#203e56] focus:outline-none focus:ring-1 focus:ring-[#47838d] placeholder:text-[#888161]/60 text-left font-medium"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#203e56] mb-1.5">الرسالة</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="اكتب رسالتك..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#edece7] border border-[#888161]/40 rounded-xl px-4 py-2.5 text-sm text-[#203e56] focus:outline-none focus:ring-1 focus:ring-[#47838d] placeholder:text-[#888161]/60 resize-none text-right font-medium"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#47838d] hover:bg-[#3d6f79] text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4" /> إرسال
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#edece7] border border-[#888161]/30 hover:bg-[#e4e2db] text-[#67614b] text-sm transition-all cursor-pointer font-semibold"
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
