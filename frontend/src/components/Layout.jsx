import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { X } from "lucide-react";

export default function Layout() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const newMessage = { id: Date.now(), ...formData, date: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem('admin_messages') || '[]');
    localStorage.setItem('admin_messages', JSON.stringify([newMessage, ...existing]));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#2c3e50] flex flex-col justify-between" dir="rtl">
      {/* الهيدر العلوي الموحد */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between px-6 py-6 border-b border-[#dedcd5]">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-heading font-extrabold text-xl text-[#203e56]">أُنْصِتْ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/auth"
            className="px-5 py-2.5 rounded-full bg-[#edece7] border border-[#888161]/30 text-[#203e56] text-sm font-semibold hover:bg-[#e4e2db] transition-all"
          >
            تسجيل الدخول
          </Link>
        </div>
      </header>

      {/* محتوى الصفحات الديناميكي */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* الفوتر السفلي الموحد */}
      <footer className="w-full bg-[#edece7] border-t border-[#888161]/25 py-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-[#888161]">
          <p className="font-medium">جميع الحقوق محفوظة © 2026</p>
          <div className="flex items-center gap-6 mt-3 md:mt-0 font-medium">
            <Link to="/info" className="hover:text-[#203e56] transition-colors">معلومات المنصة</Link>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-[#203e56] transition-colors cursor-pointer font-semibold">
              اتصل بنا
            </button>
          </div>
        </div>
      </footer>

      {/* نافذة الاتصال المنبثقة الموحدة */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-[#f5f5f3] border border-[#888161]/30 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl text-[#203e56]">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 left-5 text-[#888161] hover:text-[#203e56] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-[#203e56]">التواصل مع الدعم الفني</h3>
            {submitted ? (
              <div className="p-4 text-center text-[#47838d] font-bold bg-[#edece7] rounded-xl">
                تم إرسال رسالتك بنجاح، شكراً لتواصلك!
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#203e56] mb-1">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#edece7] p-3 rounded-xl border border-[#888161]/40 text-[#203e56] outline-none focus:ring-1 focus:ring-[#47838d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#203e56] mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    dir="ltr"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#edece7] p-3 rounded-xl border border-[#888161]/40 text-[#203e56] outline-none text-left focus:ring-1 focus:ring-[#47838d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#203e56] mb-1">الرسالة</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="اكتب رسالتك..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#edece7] p-3 rounded-xl border border-[#888161]/40 text-[#203e56] outline-none resize-none focus:ring-1 focus:ring-[#47838d]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#47838d] hover:bg-[#3d6f79] text-white font-bold rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  إرسال
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
