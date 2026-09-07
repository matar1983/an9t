import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Settings, 
  MessageSquare, 
  Trash2, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  Mail,
  Lock,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminDashboard() {
  // حالة المصادقة (هل تم تسجيل الدخول كمدير؟)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // حالة إظهار/إخفاء كلمة المرور
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('students');
   
  // بيانات الطلاب والمستويات
  const [students, setStudents] = useState([
    { id: 1, name: 'أحمد محمد العنزي', email: 'ahmed@example.com', level: 'متقدم', joinedDate: '2026-08-01', status: 'نشط' },
    { id: 2, name: 'سارة خالد', email: 'sara@example.com', level: 'متوسط', joinedDate: '2026-08-05', status: 'نشط' },
    { id: 3, name: 'فيصل عبد الله', email: 'faisal@example.com', level: 'مبتدئ', joinedDate: '2026-08-10', status: 'موقوف' },
  ]);

  // إعدادات الموقع
  const [settings, setSettings] = useState({
    seoDescription: 'أُنْصُتْ – تعلّم الإنجليزية بالذكاء الاصطناعي: منصة ذكية لتعلم اللغات وتطوير المهارات.',
    googleAnalytics: 'G-VTB8DTXKBK',
    googleAdsense: 'ca-pub-9253000029468266',
    footerText: 'جميع الحقوق محفوظة © 2026',
    maintenanceMode: false
  });

  // رسائل التواصل الواردة
  const [messages, setMessages] = useState([
    { id: 1, name: 'مطر العنزي', email: 'm6r.game@gmail.com', message: 'السلام عليكم، لدي استفسار بخصوص المنصة.', date: '٢٠٢٦/٨/١٠, ١:٢٩:٤٨ م' },
  ]);

  const [searchTerm, setSearchMessage] = useState('');

  // دالة تسجيل الدخول الخاصة بالمدير
  const handleLogin = (e) => {
    e.preventDefault();
    // يمكنك تعديل بيانات المدير هنا (البريد وكلمة المرور)
    if (email === 'admin@an9t.com' && password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('تم حفظ جميع التغييرات والإعدادات بنجاح!');
  };

  // إذا لم يتم تسجيل الدخول، اعرض شاشة تسجيل دخول المدير
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6" dir="rtl">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">دخول لوحة التحكم</h1>
            <p className="text-slate-400 text-sm mt-1">خاص بمدير منصة أُنْصُتْ</p>
          </div>

          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-sm mb-4 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                required
                placeholder="admin@an9t.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">كلمة المرور</label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm pl-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg text-sm"
            >
              تسجيل الدخول كمدير
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-slate-500 hover:text-slate-300">← العودة للرئيسية</a>
          </div>
        </div>
      </div>
    );
  }

  // الواجهة الأساسية للوحة التحكم بعد تسجيل الدخول بنجاح
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-right dir-rtl" dir="rtl">
       
      {/* القائمة الجانبية */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <ShieldAlert className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="font-bold text-lg">لوحة المدير</h1>
              <p className="text-xs text-slate-400">منصة أُنْصُتْ</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'students' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Users className="w-5 h-5" />
              <span>الطلاب المشتركون</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>إعدادات الموقع</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>رسائل التواصل ({messages.length})</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
          <div className="text-xs text-slate-500 text-center">أُنْصُتْ © 2026</div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
         
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">الطلاب المشتركون والمستويات</h2>
                <p className="text-sm text-slate-500">إدارة ومتابعة مستويات الطلاب المسجلين في المنصة</p>
              </div>
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-sm">
                إجمالي الطلاب: {students.length}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 text-sm border-b border-slate-200">
                    <th className="p-4">اسم الطالب</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">المستوى</th>
                    <th className="p-4">تاريخ الانضمام</th>
                    <th className="p-4">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-800">{student.name}</td>
                      <td className="p-4 text-slate-600">{student.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          student.level === 'متقدم' ? 'bg-purple-100 text-purple-700' :
                          student.level === 'متوسط' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {student.level}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500">{student.joinedDate}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs ${student.status === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-800">إعدادات الموقع</h2>
              <p className="text-sm text-slate-500">تعديل بيانات وصف المنصة والإعدادات العامة</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">وصف الموقع (SEO & Meta)</label>
                <textarea 
                  rows="3"
                  className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  value={settings.seoDescription}
                  onChange={(e) => setSettings({...settings, seoDescription: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">مُعرّف Google Analytics</label>
                  <input 
                    type="text"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono text-left"
                    dir="ltr"
                    value={settings.googleAnalytics}
                    onChange={(e) => setSettings({...settings, googleAnalytics: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">مُعرّف Google AdSense</label>
                  <input 
                    type="text"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono text-left"
                    dir="ltr"
                    value={settings.googleAdsense}
                    onChange={(e) => setSettings({...settings, googleAdsense: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">نص الحقوق التذييلي</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  value={settings.footerText}
                  onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-bold text-slate-700 mb-3">حالة التشغيل والصيانة</label>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">وضع الصيانة الكامل</h4>
                    <p className="text-xs text-slate-500">عند تفعيله، سيتم إغلاق الواجهة الأمامية للزوار</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                    className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      settings.maintenanceMode ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {settings.maintenanceMode ? 'مفعل (الموقع مغلق)' : 'معطل (الموقع يعمل)'}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-md transition-all text-center"
            >
              حفظ كل التغييرات والإعدادات
            </button>
          </form>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-emerald-500" />
                  رسائل التواصل الواردة ({messages.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">إدارة وتصفح كافة الرسائل المستقبلة</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="بحث في الرسائل..."
                    className="pl-4 pr-10 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchMessage(e.target.value)}
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
                <button 
                  onClick={() => alert('تم التحديث')} 
                  className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                        {msg.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{msg.name}</h4>
                        <span className="text-xs text-slate-400 font-mono" dir="ltr">{msg.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400">{msg.date}</span>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="حذف الرسالة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-slate-700 text-sm border border-slate-100">
                    {msg.message}
                  </div>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400">
                  لا توجد رسائل واردة حالياً.
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
