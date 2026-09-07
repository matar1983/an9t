import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Mic,
  BookOpen,
  PenLine,
  Library,
  Award,
  LogOut,
  GraduationCap,
  Users,
  Settings,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard, testid: "nav-dashboard" },
  { to: "/session/practice", label: "جلسة محادثة", icon: Mic, testid: "nav-session" },
  { to: "/reading", label: "القراءة", icon: BookOpen, testid: "nav-reading" },
  { to: "/writing", label: "الكتابة", icon: PenLine, testid: "nav-writing" },
  { to: "/vocabulary", label: "بنك المفردات", icon: Library, testid: "nav-vocabulary" },
  { to: "/certificate", label: "الشهادة", icon: Award, testid: "nav-certificate" },
];

const ADMIN_NAV = [
  { to: "/admin", label: "الطلاب المشتركين", icon: Users, testid: "nav-admin-students" },
  { to: "/admin/settings", label: "إعدادات الموقع", icon: Settings, testid: "nav-admin-settings" },
  { to: "/admin/messages", label: "رسائل التواصل", icon: MessageSquare, testid: "nav-admin-messages" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex">
      <aside className="hidden lg:flex flex-col w-72 shrink-0 glass border-l border-white/10 p-6 sticky top-0 h-screen overflow-y-auto">
        <Link to="/dashboard" className="flex items-center gap-3 mb-8" data-testid="logo-link">
          <div className="w-11 h-11 rounded-xl bg-emerald-500 grid place-items-center glow">
            <GraduationCap className="w-6 h-6 text-[#04120c]" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg text-white leading-tight">أَنْصِتْ</div>
            <div className="text-xs text-emerald-400 font-en">AI English Live</div>
          </div>
        </Link>

        {/* قسم روابط المدير */}
        {isAdmin && (
          <div className="mb-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-3 px-2">
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة المدير</span>
            </div>
            <nav className="flex flex-col gap-1.5">
              {ADMIN_NAV.map((item) => {
                const active = location.pathname === item.to;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-testid={item.testid}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      active
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* قسم روابط المنصة العامة */}
        <div className="text-xs text-slate-500 font-bold mb-2 px-2">المنصة التعليمية</div>
        <nav className="flex flex-col gap-1.5 flex-1">
          {NAV.map((item) => {
            const active = location.pathname.startsWith(item.to.split("/:")[0]) &&
              (item.to.includes("session") ? location.pathname.startsWith("/session") : location.pathname === item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                data-testid={item.testid}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  active
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 grid place-items-center text-indigo-300 font-bold">
              {user?.name?.[0]?.toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white truncate">{user?.name}</div>
              <div className="text-xs text-emerald-400 font-mono-en">
                {isAdmin ? "مدير المنصة" : (user?.cefr_level || "غير محدد")} · {user?.xp || 0} XP
              </div>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate("/"); }}
            data-testid="logout-btn"
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* mobile top bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 glass border-t border-white/10 flex justify-around py-2">
        {NAV.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = location.pathname.startsWith(item.to.split("/:")[0]) &&
            (item.to.includes("session") ? location.pathname.startsWith("/session") : location.pathname === item.to);
          return (
            <Link key={item.to} to={item.to} data-testid={`m-${item.testid}`}
              className={cn("flex flex-col items-center gap-1 px-3 py-1 text-[10px]",
                active ? "text-emerald-400" : "text-slate-500")}>
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </div>

      <main className="flex-1 min-w-0 p-5 sm:p-8 pb-24 lg:pb-8">{children}</main>
    </div>
  );
}
