import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

const pagesContent = {
  "/about": { title: "من نحن", desc: "نحن منصة تهدف إلى تسهيل تعلم اللغة الإنجليزية باستخدام أحدث تقنيات الذكاء الاصطناعي والتحدث الصوتي المباشر." },
  "/faq": { title: "الأسئلة الشائعة", desc: "هنا تجد إجابات على أبرز الأسئلة حول استخدام منصة أنْصِتْ وبدء جلسات المحادثة." },
  "/privacy": { title: "سياسة الخصوصية", desc: "نحن نلتزم بحماية خصوصية بياناتك الشخصية وتعلمك معنا بكل أمان." },
  "/terms": { title: "شروط الاستخدام", desc: "الشروط والأحكام الخاصة بالاستفادة من خدمات منصة أنْصِتْ التعليمية." },
  "/contact": { title: "اتصل بنا", desc: "يسعدنا تواصلكم معنا عبر البريد الإلكتروني أو قنوات الدعم الفني." },
  "/channels": { title: "قنواتنا", desc: "تابعنا على منصات التواصل الاجتماعي وقنواتنا الرسمية ليصلك كل جديد." }
};

export default function InfoPage() {
  const location = useLocation();
  const currentData = pagesContent[location.pathname] || { title: "الصفحة", desc: "محتوى قيد التجهيز." };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col justify-between" dir="rtl">
      {/* الهيدر */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between px-6 py-6 border-b border-slate-800/60">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
            <GraduationCap className="w-6 h-6" />
          </div>
          <span className="font-heading font-extrabold text-xl text-white">أُنْصِتْ</span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
          <ArrowRight className="w-4 h-4" /> العودة للرئيسية
        </Link>
      </header>

      {/* محتوى الصفحة */}
      <main className="max-w-4xl w-full mx-auto px-6 py-16 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">{currentData.title}</h1>
        <div className="card-surface p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
          <p className="text-slate-300 text-lg leading-relaxed">{currentData.desc}</p>
        </div>
      </main>

      {/* الفوتر */}
      <footer className="w-full border-t border-slate-800 text-slate-500 py-6 text-center text-sm">
        برمجة وتصميم <a href="https://edm2n.com" target="_blank" rel="noreferrer" className="text-amber-400 font-medium hover:underline">edm2n</a>
      </footer>
    </div>
  );
}
