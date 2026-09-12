import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
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
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between" dir="rtl">
      {/* الهيدر العلوي الموحد */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-heading font-extrabold text-xl text-foreground">أُنْصِتْ</Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle-btn"
            aria-label="تبديل الوضع الداكن/الفاتح"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground hover:bg-muted transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link
            to="/auth"
            className="px-5 py-2.5 rounded-full bg-card border border-border text-foreground text-sm font-semibold hover:bg-muted transition-all"
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
      <footer className="w-full bg-card border-t border-border py-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p className="font-medium">جميع الحقوق محفوظة © 2026</p>
          <div className="flex items-center gap-6 mt-3 md:mt-0 font-medium">
            <Link to="/info" className="hover:text-foreground transition-colors">معلومات المنصة</Link>
            <button onClick={() => setIsContactOpen(true)} className="hover:text-foreground transition-colors cursor-pointer font-semibold">
              اتصل بنا
            </button>
          </div>
        </div>
      </footer>

      {/* نافذة الاتصال المنبثقة الموحدة */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-background border border-border w-full max-w-lg rounded-3xl p-6 relative shadow-2xl text-foreground">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-5 left-5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-4 text-foreground">التواصل مع الدعم الفني</h3>
            {submitted ? (
              <div className="p-4 text-center text-primary font-bold bg-card rounded-xl">
                تم إرسال رسالتك بنجاح، شكراً لتواصلك!
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">الاسم</label>
                  <input
                    type="text"
                    required
                    placeholder="اسمك الكريم"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-card p-3 rounded-xl border border-border text-foreground outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    dir="ltr"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-card p-3 rounded-xl border border-border text-foreground outline-none text-left focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">الرسالة</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="اكتب رسالتك..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-card p-3 rounded-xl border border-border text-foreground outline-none resize-none focus:ring-1 focus:ring-primary"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all cursor-pointer shadow-sm"
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
