import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Settings, 
  MessageSquare, 
  Trash2, 
  RefreshCw, 
  Search, 
  ShieldAlert, 
  CheckCircle2, 
  Globe, 
  BarChart3,
  Mail,
  Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('students');
  
  // بيانات الطلاب والمستويات
  const [students, setStudents] = useState([
    { id: 1, name: 'أحمد محمد العنزي', email: 'ahmed@example.com', level: 'متقدم', joinedDate: '2026-08-01', status: 'نشط' },
    { id: 2, name: 'سارة خالد', email: 'sara@example.com', level: 'متوسط', joinedDate: '2026-08-05', status: 'نشط' },
    { id: 3, name: 'فيصل عبد الله', email: 'faisal@example.com', level: 'مبتدئ', joinedDate: '2026-08-10', status: 'موقوف' },
  ]);

  // إعدادات الموقع (مطابقة للصورة تماماً)
  const [settings, setSettings] = useState({
    seoDescription: 'دليل مطر الإلكتروني: منصة عربية مجانية تجمع أكثر من 100 أداة وحاسبة ذكية في مكان واحد. حاسبات تمويل، زكاة، ميراث، تحويل عملات وتاريخ',
    googleAnalytics: 'G-VTB8DTXKBK',
    googleAdsense: 'ca-pub-9253000029468266',
    footerText: 'جميع الحقوق محفوظة © 2026',
    featuredTools: 'daman-calculator, currency, social-downloader, invoice-compare, baloot-calculator, Experiences',
    maintenanceMode: false
  });

  // رسائل التواصل الواردة (مطابقة للصورة تماماً)
  const [messages, setMessages] = useState([
    { id: 1, name: 'matar', email: 'm6r.game@gmail.com', message: 'السلام عليكم', date: '٢٠٢٦/٨/١٠, ١:٢٩:٤٨ م' },
    { id: 2, name: 'سسسسسسسسس', email: 'm6r.game@gmail.com', message: 'سسسسسسسسسسس', date: '٢٠٢٦/٨/١٠, ١:٢٧:٠٧ م' },
    { id: 3, name: 'سسسسس', email: 'm6r.game@gmail.com', message: 'سسسسسس', date: '٢٠٢٦/٨/١٠, ١٢:٠٠:٣٢ م' },
  ]);

  const [searchTerm, setSearchMessage] = useState('');

  const handleDeleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('تم حفظ جميع التغييرات والإعدادات بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-right dir-rtl" dir="rtl">
      
      {/* القائمة الجانبية للوحة التحكم */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <ShieldAlert className="w-8 h-8 text-amber-500" />
            <div>
              <h1 className="font-bold text-lg">لوحة المدير</h1>
              <p className="text-xs text-slate-400">إدارة منصة دليل مطر</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'students' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Users className="w-5 h-5" />
              <span>الطلاب المشتركون</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Settings className="w-5 h-5" />
              <span>إعدادات الموقع</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>رسائل التواصل ({messages.length})</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 text-center">
          دليل مطر الإلكتروني © 2026
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* تبويب الطلاب المشتركين ومستوياتهم */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">الطلاب المشتركون والمستويات</h2>
                <p className="text-sm text-slate-500">إدارة ومتابعة مستويات الطلاب المسجلين في المنصة</p>
              </div>
              <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-xl font-bold text-sm">
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

        {/* تبويب إعدادات الموقع (مطابق للصورة تماماً) */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-800">إعدادات الموقع</h2>
              <p className="text-sm text-slate-500">تعديل بيانات وصف الموقع، الأكواد الترويجية، وحالة الصيانة</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">وصف الموقع (SEO & Meta)</label>
                <textarea 
                  rows="3"
                  className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  value={settings.seoDescription}
                  onChange={(e) => setSettings({...settings, seoDescription: e.target.value})}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">مُعرّف Google Analytics (إن وجد)</label>
                  <input 
                    type="text"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono text-left"
                    dir="ltr"
                    value={settings.googleAnalytics}
                    onChange={(e) => setSettings({...settings, googleAnalytics: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">مُعرّف Google AdSense (إن وجد)</label>
                  <input 
                    type="text"
                    className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono text-left"
                    dir="ltr"
                    value={settings.googleAdsense}
                    onChange={(e) => setSettings({...settings, googleAdsense: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">نص الحقوق التذييلي (Footer Text)</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  value={settings.footerText}
                  onChange={(e) => setSettings({...settings, footerText: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">أدوات قسم (اخترنا لكم)</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                  value={settings.featuredTools}
                  onChange={(e) => setSettings({...settings, featuredTools: e.target.value})}
                />
                <p className="text-xs text-slate-400 mt-1">اكتب مُعرّفات الأدوات (Slug) مفصولة بفاصلة. مثال: zakat, bmi</p>
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
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-md transition-all text-center"
            >
              حفظ كل التغييرات والإعدادات
            </button>
          </form>
        )}

        {/* تبويب رسائل التواصل الواردة (مطابق للصورة تماماً) */}
        {activeTab === 'messages' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Mail className="w-6 h-6 text-amber-500" />
                  رسائل التواصل الواردة ({messages.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">إدارة وتصفح كافة الرسائل المستقبلة من نموذج اتصل بنا</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="بحث في الرسائل..."
                    className="pl-4 pr-10 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center">
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
