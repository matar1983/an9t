import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Settings, 
  MessageSquare, 
  Trash2, 
  RefreshCw, 
  Search, 
  Mail,
  Edit,
  ArrowUpCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export default function AdminDashboard({ activeTab = 'students', setActiveTab }) {
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchMessage] = useState('');

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('site_settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      seoDescription: 'أُنْصُتْ – تعلّم الإنجليزية بالذكاء الاصطناعي: منصة ذكية لتعلم اللغات وتطوير المهارات.',
      googleAnalytics: 'G-VTB8DTXKBK',
      googleAdsense: 'ca-pub-9253000029468266',
      footerText: 'جميع الحقوق محفوظة © 2026',
      maintenanceMode: false
    };
  });

  // جلب الطلاب والرسائل من الباك إند أو الـ localStorage احتياطياً
  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    } else if (activeTab === 'messages') {
      fetchMessages();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/students', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        localStorage.setItem('admin_students', JSON.stringify(data));
        return;
      }
      throw new Error('API failed');
    } catch (error) {
      // Fallback to localStorage if API fails
      const localStudents = localStorage.getItem('admin_students') || localStorage.getItem('students');
      if (localStudents) {
        setStudents(JSON.parse(localStudents));
      } else {
        const defaultStudents = [
          {
            id: 1,
            name: "مطر متعب",
            email: "edm2n@msn.com",
            level: "متوسط",
            joinedDate: "2026-09-01",
            status: "نشط"
          }
        ];
        setStudents(defaultStudents);
        localStorage.setItem('admin_students', JSON.stringify(defaultStudents));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/messages', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
        localStorage.setItem('admin_messages', JSON.stringify(data));
        return;
      }
      throw new Error('API failed');
    } catch (error) {
      // Fallback to localStorage
      const localMessages = localStorage.getItem('admin_messages');
      if (localMessages) {
        setMessages(JSON.parse(localMessages));
      } else {
        const defaultMessages = [
          {
            id: Date.now(),
            name: "مطر متعب",
            email: "edm2n@msn.com",
            message: "مرحباً، هذه رسالة تجريبية لاختبار لوحة التحكم وتعمل بنجاح.",
            date: "2026-09-08 10:00",
            read: false
          }
        ];
        setMessages(defaultMessages);
        localStorage.setItem('admin_messages', JSON.stringify(defaultMessages));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    try {
      await fetch(`/api/admin/students/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
    } catch (err) {
      console.log('العملية تمت محلياً فقط');
    }
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    localStorage.setItem('admin_students', JSON.stringify(updated));
  };

  const handleUpgradeStudent = async (id, currentLevel) => {
    const levels = ['مبتدئ', 'متوسط', 'متقدم'];
    const currentIndex = levels.indexOf(currentLevel);
    const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'متقدم';

    try {
      await fetch(`/api/admin/students/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ level: nextLevel })
      });
    } catch (e) {
      console.log('التحديث تم محلياً');
    }
    const updated = students.map(s => s.id === id ? { ...s, level: nextLevel } : s);
    setStudents(updated);
    localStorage.setItem('admin_students', JSON.stringify(updated));
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'نشط' ? 'موقوف' : 'نشط';
    try {
      await fetch(`/api/admin/students/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.log('تم التغيير محلياً');
    }
    const updated = students.map(s => s.id === id ? { ...s, status: newStatus } : s);
    setStudents(updated);
    localStorage.setItem('admin_students', JSON.stringify(updated));
  };

  const handleEditStudent = (student) => {
    const newName = prompt('تعديل اسم الطالب:', student.name);
    if (newName) {
      const updated = students.map(s => s.id === student.id ? { ...s, name: newName } : s);
      setStudents(updated);
      localStorage.setItem('admin_students', JSON.stringify(updated));
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      });
    } catch (e) {
      console.log('الحذف محلياً');
    }
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('admin_messages', JSON.stringify(updated));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('site_settings', JSON.stringify(settings));
    alert('تم حفظ جميع التغييرات والإعدادات بنجاح!');
  };

  const filteredMessages = messages.filter(msg => 
    msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 text-right dir-rtl w-full max-w-7xl mx-auto" dir="rtl">
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">الطلاب المشتركون والمستويات</h2>
              <p className="text-sm text-slate-500">إدارة ومتابعة مستويات الطلاب المسجلين في المنصة</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchStudents}
                className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                title="تحديث البيانات"
              >
                <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-sm">
                إجمالي الطلاب: {students.length}
              </div>
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
                  <th className="p-4 text-center">الإجراءات والتحكم</th>
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
                        {student.level || 'مبتدئ'}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{student.joinedDate || (student.created_at ? new Date(student.created_at).toLocaleDateString() : '-')}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs ${(student.status || 'نشط') === 'نشط' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {student.status || 'نشط'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleEditStudent(student)}
                          className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUpgradeStudent(student.id, student.level || 'مبتدئ')}
                          className="p-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                          title="ترقية المستوى"
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(student.id, student.status || 'نشط')}
                          className={`p-1.5 rounded-lg transition-colors ${(student.status || 'نشط') === 'نشط' ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                          title={(student.status || 'نشط') === 'نشط' ? 'إيقاف' : 'تنشيط'}
                        >
                          {(student.status || 'نشط') === 'نشط' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-slate-400">
                      لا توجد بيانات طلاب مسجلين حالياً.
                    </td>
                  </tr>
                )}
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
              رسائل التواصل الواردة ({filteredMessages.length})
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
              onClick={fetchMessages} 
              className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors"
              title="تحديث الرسائل"
            >
              <RefreshCw className={`w-4 h-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center">
                    {msg.name ? msg.name.charAt(0) : '?'}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{msg.name}</h4>
                    <span className="text-xs text-slate-400 font-mono" dir="ltr">{msg.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400">{msg.date || (msg.created_at ? new Date(msg.created_at).toLocaleString() : '')}</span>
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

          {filteredMessages.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400">
              لا توجد رسائل واردة حالياً.
            </div>
          )}
        </div>
      </div>
    )}
  </div>
  );
}
