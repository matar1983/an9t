import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard'; // تأكد من مسار الاستيراد الصحيح حسب مشروعك
import { Users, Settings, MessageSquare, Palette, ShieldAlert } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b1329] text-right dir-rtl" dir="rtl">
      {/* القائمة الجانبية للتحكم */}
      <aside className="w-full md:w-64 bg-[#111c3a] border-l border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <ShieldAlert className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="font-bold text-white text-lg">لوحة الإدارة</h1>
              <p className="text-xs text-slate-400">منصة أنْصِتْ (An9t)</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'students'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              الطلاب والمستويات
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'messages'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              الرسائل والتواصل
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'design'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Palette className="w-5 h-5" />
              الألوان والتصميم
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5" />
              إعدادات الموقع
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-500 text-center">
          أنْصِتْ © 2026 جميع الحقوق محفوظة
        </div>
      </aside>

      {/* محتوى اللوحة بناءً على التبويب النشط */}
      <main className="flex-1 overflow-y-auto">
        <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
      </main>
    </div>
  );
}
