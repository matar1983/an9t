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
  XCircle,
  Palette,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import api from "../lib/api";
import { DEFAULT_THEME, applyThemeVars, getContrastRatio } from "../lib/theme";

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

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('site_theme');
    return savedTheme ? { ...DEFAULT_THEME, ...JSON.parse(savedTheme) } : DEFAULT_THEME;
  });
  const [themeSaving, setThemeSaving] = useState(false);
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    } else if (activeTab === 'messages') {
      fetchMessages();
    } else if (activeTab === 'settings') {
      fetchSettings();
    } else if (activeTab === 'design') {
      fetchTheme();
    }
  }, [activeTab]);

  const toCamelTheme = (t) => ({
    backgroundColor: t.background_color ?? DEFAULT_THEME.backgroundColor,
    surfaceColor: t.surface_color ?? DEFAULT_THEME.surfaceColor,
    headingColor: t.heading_color ?? DEFAULT_THEME.headingColor,
    textColor: t.text_color ?? DEFAULT_THEME.textColor,
    mutedTextColor: t.muted_text_color ?? DEFAULT_THEME.mutedTextColor,
    primaryColor: t.primary_color ?? DEFAULT_THEME.primaryColor,
    menuBackgroundColor: t.menu_background_color ?? DEFAULT_THEME.menuBackgroundColor,
    menuTextColor: t.menu_text_color ?? DEFAULT_THEME.menuTextColor,
    borderColor: t.border_color ?? DEFAULT_THEME.borderColor,
  });

  const toSnakeTheme = (t) => ({
    background_color: t.backgroundColor,
    surface_color: t.surfaceColor,
    heading_color: t.headingColor,
    text_color: t.textColor,
    muted_text_color: t.mutedTextColor,
    primary_color: t.primaryColor,
    menu_background_color: t.menuBackgroundColor,
    menu_text_color: t.menuTextColor,
    border_color: t.borderColor,
  });

  const fetchTheme = async () => {
    try {
      const { data } = await api.get('/admin/theme');
      const mapped = toCamelTheme(data);
      setTheme(mapped);
      localStorage.setItem('site_theme', JSON.stringify(mapped));
      applyThemeVars(mapped);
    } catch (e) {
      console.log('تعذّر جلب ألوان التصميم من السيرفر');
    }
  };

  const handleThemeChange = (key, value) => {
    const updated = { ...theme, [key]: value };
    setTheme(updated);
    applyThemeVars(updated);
  };

  const handleSaveTheme = async () => {
    setThemeSaving(true);
    try {
      await api.put('/admin/theme', toSnakeTheme(theme));
      localStorage.setItem('site_theme', JSON.stringify(theme));
      applyThemeVars(theme);
      alert('تم حفظ ألوان التصميم بنجاح');
    } catch (err) {
      alert('حدث خطأ أثناء حفظ الألوان في السيرفر');
    } finally {
      setThemeSaving(false);
    }
  };

  const handleResetTheme = () => {
    if (!window.confirm('هل تريد استعادة الألوان الافتراضية؟')) return;
    setTheme(DEFAULT_THEME);
    applyThemeVars(DEFAULT_THEME);
  };

  const contrastWarnings = [
    { pair: ['textColor', 'backgroundColor'], label: 'لون النصوص مقارنة بخلفية الموقع' },
    { pair: ['headingColor', 'backgroundColor'], label: 'لون العناوين مقارنة بخلفية الموقع' },
  ]
    .map((c) => ({ ...c, ratio: getContrastRatio(theme[c.pair[0]], theme[c.pair[1]]) }))
    .filter((c) => c.ratio < 4.5);

  const toCamelSettings = (s) => ({
    seoDescription: s.seo_description ?? '',
    googleAnalytics: s.google_analytics ?? '',
    googleAdsense: s.google_adsense ?? '',
    footerText: s.footer_text ?? '',
    maintenanceMode: !!s.maintenance_mode,
  });

  const toSnakeSettings = (s) => ({
    seo_description: s.seoDescription,
    google_analytics: s.googleAnalytics,
    google_adsense: s.googleAdsense,
    footer_text: s.footerText,
    maintenance_mode: s.maintenanceMode,
  });

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/admin/settings');
      const mapped = toCamelSettings(data);
      setSettings(mapped);
      localStorage.setItem('site_settings', JSON.stringify(mapped));
    } catch (e) {
      console.log('تعذّر جلب الإعدادات');
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/students');
      if (response.data) {
        setStudents(response.data);
        localStorage.setItem('admin_students', JSON.stringify(response.data));
      }
    } catch (err) {
      const localStudents = localStorage.getItem('admin_students');
      if (localStudents) {
        setStudents(JSON.parse(localStudents));
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/messages');
      if (response.data) {
        setMessages(response.data);
        localStorage.setItem('admin_messages', JSON.stringify(response.data));
      }
    } catch (error) {
      const localMessages = localStorage.getItem('admin_messages');
      if (localMessages) {
        setMessages(JSON.parse(localMessages));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;
    try {
      await api.delete(`/admin/students/${id}`);
    } catch (err) {
      console.log('الحذف محلياً فقط');
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
      await api.put(`/admin/students/${id}`, { level: nextLevel });
    } catch (e) {
      console.log('التحديث محلياً');
    }
    const updated = students.map(s => s.id === id ? { ...s, level: nextLevel } : s);
    setStudents(updated);
    localStorage.setItem('admin_students', JSON.stringify(updated));
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'نشط' ? 'موقوف' : 'نشط';
    try {
      await api.put(`/admin/students/${id}`, { status: newStatus });
    } catch (e) {
      console.log('التغيير محلياً');
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
      await api.delete(`/admin/messages/${id}`);
    } catch (e) {
      console.log('الحذف محلياً');
    }
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('admin_messages', JSON.stringify(updated));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.put('/admin/settings', toSnakeSettings(settings));
      localStorage.setItem('site_settings', JSON.stringify(settings));
      alert('تم حفظ الإعدادات بنجاح');
    } catch (err) {
      alert('حدث خطأ أثناء الحفظ');
    }
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
              <h2 className="text-2xl font-bold" style={{ color: theme.headingColor }}>الطلاب المشتركون والمستويات</h2>
              <p className="text-sm" style={{ color: theme.mutedTextColor }}>إدارة ومتابعة مستويات الطلاب المسجلين في المنصة</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={fetchStudents}
                className="p-2.5 rounded-xl border transition-colors"
                style={{ backgroundColor: theme.surfaceColor, borderColor: theme.borderColor, color: theme.textColor }}
                title="تحديث البيانات"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <div className="px-4 py-2 rounded-xl font-bold text-sm" style={{ backgroundColor: theme.primaryColor, color: '#fff' }}>
                إجمالي الطلاب: {students.length}
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-sm border overflow-hidden" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.borderColor }}>
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="border-b text-sm" style={{ borderColor: theme.borderColor, color: theme.headingColor, backgroundColor: theme.backgroundColor }}>
                  <th className="p-4">اسم الطالب</th>
                  <th className="p-4">البريد الإلكتروني</th>
                  <th className="p-4">المستوى</th>
                  <th className="p-4">تاريخ الانضمام</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">الإجراءات والتحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm" style={{ borderColor: theme.borderColor }}>
                {students.map((student) => (
                  <tr key={student.id} className="transition-colors">
                    <td className="p-4 font-medium" style={{ color: theme.textColor }}>{student.name}</td>
                    <td className="p-4" style={{ color: theme.mutedTextColor }}>{student.email}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                        {student.level || 'مبتدئ'}
                      </span>
                    </td>
                    <td className="p-4" style={{ color: theme.mutedTextColor }}>{student.joinedDate || (student.created_at ? new Date(student.created_at).toLocaleDateString() : '-')}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/20 text-emerald-400">
                        {student.status || 'نشط'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEditStudent(student)} className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" title="تعديل"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleUpgradeStudent(student.id, student.level || 'مبتدئ')} className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" title="ترقية"><ArrowUpCircle className="w-4 h-4" /></button>
                        <button onClick={() => handleToggleStatus(student.id, student.status || 'نشط')} className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" title="تغيير الحالة"><XCircle className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteStudent(student.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30" title="حذف"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-center py-12" style={{ color: theme.mutedTextColor }}>
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
        <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl mx-auto p-8 rounded-3xl shadow-sm border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.borderColor }}>
          <div className="border-b pb-4" style={{ borderColor: theme.borderColor }}>
            <h2 className="text-2xl font-bold" style={{ color: theme.headingColor }}>إعدادات الموقع</h2>
            <p className="text-sm" style={{ color: theme.mutedTextColor }}>تعديل بيانات وصف المنصة والإعدادات العامة</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: theme.textColor }}>وصف الموقع (SEO & Meta)</label>
              <textarea 
                rows="3"
                className="w-full p-4 rounded-xl border text-sm bg-transparent focus:outline-none"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
                value={settings.seoDescription}
                onChange={(e) => setSettings({...settings, seoDescription: e.target.value})}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textColor }}>مُعرّف Google Analytics</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl border text-sm font-mono text-left bg-transparent"
                  style={{ borderColor: theme.borderColor, color: theme.textColor }}
                  dir="ltr"
                  value={settings.googleAnalytics}
                  onChange={(e) => setSettings({...settings, googleAnalytics: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: theme.textColor }}>مُعرّف Google AdSense</label>
                <input 
                  type="text"
                  className="w-full p-3 rounded-xl border text-sm font-mono text-left bg-transparent"
                  style={{ borderColor: theme.borderColor, color: theme.textColor }}
                  dir="ltr"
                  value={settings.googleAdsense}
                  onChange={(e) => setSettings({...settings, googleAdsense: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: theme.textColor }}>نص الحقوق التذييلي</label>
              <input 
                type="text"
                className="w-full p-3 rounded-xl border text-sm bg-transparent"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
                value={settings.footerText}
                onChange={(e) => setSettings({...settings, footerText: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 font-bold rounded-xl shadow-md transition-all text-center"
            style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
          >
            حفظ كل التغييرات والإعدادات
          </button>
        </form>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl shadow-sm border flex justify-between items-center" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.borderColor }}>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.headingColor }}>
                <Mail className="w-6 h-6" style={{ color: theme.primaryColor }} />
                رسائل التواصل الواردة ({filteredMessages.length})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="بحث في الرسائل..."
                className="pl-4 pr-10 py-2 border rounded-xl text-sm bg-transparent"
                style={{ borderColor: theme.borderColor, color: theme.textColor }}
                value={searchTerm}
                onChange={(e) => setSearchMessage(e.target.value)}
              />
              <button onClick={fetchMessages} className="p-2.5 border rounded-xl" style={{ borderColor: theme.borderColor, color: theme.textColor }}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="p-6 rounded-2xl shadow-sm border relative" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.borderColor }}>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold" style={{ color: theme.headingColor }}>{msg.name}</h4>
                  <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
                <p className="text-sm" style={{ color: theme.textColor }}>{msg.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'design' && (
        <div className="max-w-4xl mx-auto space-y-6 p-8 rounded-3xl shadow-sm border" style={{ backgroundColor: theme.surfaceColor, borderColor: theme.borderColor }}>
          <div className="flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: theme.borderColor }}>
            <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: theme.headingColor }}>
              <Palette className="w-6 h-6" style={{ color: theme.primaryColor }} />
              الألوان والتصميم
            </h2>
            <button onClick={handleResetTheme} className="px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 bg-slate-700/20" style={{ color: theme.textColor }}>
              <RotateCcw className="w-4 h-4" /> استعادة الافتراضي
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ColorField label="لون خلفية الموقع" value={theme.backgroundColor} onChange={(v) => handleThemeChange('backgroundColor', v)} theme={theme} />
            <ColorField label="لون خلفية البطاقات" value={theme.surfaceColor} onChange={(v) => handleThemeChange('surfaceColor', v)} theme={theme} />
            <ColorField label="لون العناوين" value={theme.headingColor} onChange={(v) => handleThemeChange('headingColor', v)} theme={theme} />
            <ColorField label="لون النصوص" value={theme.textColor} onChange={(v) => handleThemeChange('textColor', v)} theme={theme} />
            <ColorField label="اللون الأساسي (التمييز)" value={theme.primaryColor} onChange={(v) => handleThemeChange('primaryColor', v)} theme={theme} />
            <ColorField label="لون الحدود والفواصل" value={theme.borderColor} onChange={(v) => handleThemeChange('borderColor', v)} theme={theme} />
          </div>

          <button
            onClick={handleSaveTheme}
            disabled={themeSaving}
            className="w-full mt-8 py-4 font-bold rounded-xl shadow-md transition-all text-center"
            style={{ backgroundColor: theme.primaryColor, color: '#fff' }}
          >
            {themeSaving ? 'جارِ الحفظ...' : 'حفظ ألوان التصميم لكل الزوار'}
          </button>
        </div>
      )}
    </div>
  );
}

function ColorField({ label, value, onChange, theme }) {
  return (
    <div className="p-4 border rounded-2xl" style={{ borderColor: theme.borderColor }}>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-bold" style={{ color: theme.textColor }}>{label}</label>
        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: value, borderColor: theme.borderColor }} />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} dir="ltr" className="flex-1 p-2 rounded-lg border text-sm font-mono bg-transparent" style={{ borderColor: theme.borderColor, color: theme.textColor }} />
      </div>
    </div>
  );
}
