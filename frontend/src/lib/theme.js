// src/lib/theme.js
// أداة مركزية لتطبيق ألوان المنصة كـ CSS Variables على مستوى الموقع بالكامل.
// تُستخدم في مكانين:
//  1) نقطة تشغيل التطبيق (App.js / Layout.jsx) لتحميل الألوان المحفوظة عند فتح أي صفحة.
//  2) لوحة تحكم المدير (Admin.jsx) لعرض معاينة حية فور تغيير أي لون، وقبل الحفظ في السيرفر.

// القيم الافتراضية (نفس الهوية الحالية للمنصة تقريبًا: emerald + slate)
export const DEFAULT_THEME = {
  backgroundColor: '#F8FAFC',      // خلفية الموقع العامة
  surfaceColor: '#FFFFFF',         // خلفية البطاقات والصناديق
  headingColor: '#1E293B',         // لون العناوين
  textColor: '#334155',            // لون النصوص الأساسية
  mutedTextColor: '#64748B',       // لون النصوص الثانوية / الوصف
  primaryColor: '#10B981',         // اللون الأساسي (الأزرار، الروابط، التمييز)
  menuBackgroundColor: '#FFFFFF',  // خلفية القائمة / الشريط الجانبي
  menuTextColor: '#1E293B',        // لون نص القائمة
  borderColor: '#E2E8F0',          // لون الحدود والفواصل
};

// خريطة كل مفتاح إلى اسم متغير CSS المقابل له في :root
const CSS_VAR_MAP = {
  backgroundColor: '--color-bg',
  surfaceColor: '--color-surface',
  headingColor: '--color-heading',
  textColor: '--color-text',
  mutedTextColor: '--color-text-muted',
  primaryColor: '--color-primary',
  menuBackgroundColor: '--color-menu-bg',
  menuTextColor: '--color-menu-text',
  borderColor: '--color-border',
};

// يطبّق كائن ألوان (قد يكون جزئيًا) كمتغيرات CSS على جذر الصفحة فورًا
export function applyThemeVars(theme = {}) {
  const merged = { ...DEFAULT_THEME, ...theme };
  const root = document.documentElement;
  Object.entries(CSS_VAR_MAP).forEach(([key, cssVar]) => {
    if (merged[key]) {
      root.style.setProperty(cssVar, merged[key]);
    }
  });
}

// يقرأ الألوان المحفوظة محليًا (تحميل فوري بدون انتظار السيرفر) ثم يطبّقها
export function applySavedThemeFromLocalStorage() {
  try {
    const saved = localStorage.getItem('site_theme');
    if (saved) {
      applyThemeVars(JSON.parse(saved));
    } else {
      applyThemeVars(DEFAULT_THEME);
    }
  } catch (e) {
    applyThemeVars(DEFAULT_THEME);
  }
}

// يحسب "التباين" التقريبي بين لونين لتحذير المدير إذا اختار لونين متقاربين
// (نفس سبب مشكلة "نص أبيض على خلفية فاتحة" الظاهرة في لقطات الشاشة الحالية)
export function getContrastRatio(hex1, hex2) {
  const luminance = (hex) => {
    const rgb = hex
      .replace('#', '')
      .match(/.{1,2}/g)
      .map((c) => {
        const v = parseInt(c, 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = luminance(hex1) + 0.05;
  const l2 = luminance(hex2) + 0.05;
  return l1 > l2 ? l1 / l2 : l2 / l1;
}
