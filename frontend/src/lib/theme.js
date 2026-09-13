// src/lib/theme.js
// أداة تطبيق ألوان المنصة على مستوى الموقع بالكامل — تعمل مع نظام المتغيرات
// الحقيقي المستخدم فعلياً في index.css / tailwind.config.js (متغيرات HSL:
// --background, --foreground, --card, --primary, --muted-foreground, --border,
// --heading, --menu-bg, --menu-text) بدل اختراع نظام موازٍ لا يؤثر على الموقع.
//
// يُستخدم في مكانين:
//  1) نقطة تشغيل التطبيق (App.js) لتحميل الألوان المحفوظة عند فتح أي صفحة.
//  2) لوحة تحكم المدير (Admin.jsx) لمعاينة حية فور تغيير أي لون، وللحفظ.

// القيم الافتراضية بصيغة Hex (نفس تصميم الموقع الحالي بالضبط، للوضعين):
export const DEFAULT_THEME = {
  light: {
    backgroundColor: '#f6f6f4',
    surfaceColor: '#f2f1ee',      // --card
    headingColor: '#203d56',      // --heading
    textColor: '#203d56',         // --foreground
    mutedTextColor: '#d5d1c3',    // --muted-foreground
    primaryColor: '#48848e',      // --primary
    menuBackgroundColor: '#f6f6f4', // --menu-bg (نفس الخلفية افتراضياً)
    menuTextColor: '#203d56',       // --menu-text
    borderColor: '#dddbd4',       // --border
  },
  dark: {
    backgroundColor: '#081226',
    surfaceColor: '#10203c',
    headingColor: '#f9fafb',
    textColor: '#f9fafb',
    mutedTextColor: '#746a3e',
    primaryColor: '#61a9b3',
    menuBackgroundColor: '#081226',
    menuTextColor: '#f9fafb',
    borderColor: '#1b3550',
  },
};

// خريطة كل مفتاح إلى اسم متغير CSS الحقيقي المقابل له (بدون hsl())
const CSS_VAR_MAP = {
  backgroundColor: '--background',
  surfaceColor: '--card',
  headingColor: '--heading',
  textColor: '--foreground',
  mutedTextColor: '--muted-foreground',
  primaryColor: '--primary',
  menuBackgroundColor: '--menu-bg',
  menuTextColor: '--menu-text',
  borderColor: '--border',
};

const STYLE_TAG_ID = 'site-theme-overrides';

// تحويل Hex -> "H S% L%" (صيغة متغيرات الموقع الحقيقية)
export function hexToHslTriplet(hex) {
  let r = 0, g = 0, b = 0;
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else {
    r = parseInt(clean.substring(0, 2), 16);
    g = parseInt(clean.substring(2, 4), 16);
    b = parseInt(clean.substring(4, 6), 16);
  }
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

// يبني نص CSS يعيد تعريف المتغيرات لكل من الوضع الفاتح (:root) والداكن (.dark)
// كـ <style> منفصل يُحقن/يُحدَّث في <head>، بدل الكتابة المباشرة على html.style
// (كتابة مباشرة كانت ستفرض نفس القيم على الوضعين معاً بسبب أولوية الأنماط المضمّنة)
export function applyThemeVars({ light = {}, dark = {} } = {}) {
  const mergedLight = { ...DEFAULT_THEME.light, ...light };
  const mergedDark = { ...DEFAULT_THEME.dark, ...dark };

  const buildBlock = (obj) =>
    Object.entries(CSS_VAR_MAP)
      .map(([key, cssVar]) => `  ${cssVar}: ${hexToHslTriplet(obj[key])};`)
      .join('\n');

  const css = `:root {\n${buildBlock(mergedLight)}\n}\n.dark {\n${buildBlock(mergedDark)}\n}`;

  let styleTag = document.getElementById(STYLE_TAG_ID);
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = STYLE_TAG_ID;
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = css;
}

// يقرأ الألوان المحفوظة محلياً (تحميل فوري بدون انتظار السيرفر) ثم يطبّقها
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
