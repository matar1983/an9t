import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, apiErr } from "@/context/AuthContext";
import { toast } from "sonner";
import { Loader2, GraduationCap, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const GOALS = [
  { v: "travel", l: "السفر والسياحة" },
  { v: "work", l: "العمل والوظيفة" },
  { v: "study", l: "الدراسة الأكاديمية" },
  { v: "general", l: "محادثة عامة" },
];

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", password: "", age: "", gender: "male",
    native_language: "Arabic", target_language: "English", dialect: "American", goal: "general",
  });
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let userData;
      if (mode === "login") {
        userData = await login(form.email, form.password);
      } else {
        userData = await register({ ...form, age: form.age ? parseInt(form.age) : null });
      }
      toast.success("مرحباً بك!");
      
      // التوجيه الذكي حسب صلاحية المستخدم (مدير أو طالب)
      if (userData?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error(apiErr(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm">
          <ArrowLeft className="w-4 h-4 rotate-180" /> العودة للرئيسية
        </Link>
        <div className="card-surface p-8 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 grid place-items-center glow">
              <GraduationCap className="w-6 h-6 text-[#04120c]" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-white">
                {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
              </h1>
              <p className="text-sm text-slate-400">أَنْصِتْ — تعلّم الإنجليزية بالذكاء الاصطناعي</p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <div>
                <Label className="text-slate-300 mb-1.5 block">الاسم</Label>
                <Input data-testid="reg-name" required value={form.name}
                  onChange={(e) => set("name")(e.target.value)}
                  placeholder="اسمك الكامل" className="bg-[#0f1420] border-white/10 text-white" />
              </div>
            )}

            <div>
              <Label className="text-slate-300 mb-1.5 block">البريد الإلكتروني</Label>
              <Input data-testid="auth-email" required type="email" value={form.email}
                onChange={(e) => set("email")(e.target.value)}
                placeholder="you@example.com" dir="ltr"
                className="bg-[#0f1420] border-white/10 text-white text-left" />
            </div>

            <div>
              <Label className="text-slate-300 mb-1.5 block">كلمة المرور</Label>
              <div className="relative w-full">
                <Input data-testid="auth-password" required type={showPassword ? "text" : "password"} value={form.password}
                  onChange={(e) => set("password")(e.target.value)}
                  placeholder="••••••••" dir="ltr"
                  className="bg-[#0f1420] border-white/10 text-white text-left pl-12" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">العمر</Label>
                    <Input data-testid="reg-age" type="number" min="5" max="99" value={form.age}
                      onChange={(e) => set("age")(e.target.value)}
                      placeholder="22" className="bg-[#0f1420] border-white/10 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">الجنس</Label>
                    <Select value={form.gender} onValueChange={set("gender")}>
                      <SelectTrigger data-testid="reg-gender" className="bg-[#0f1420] border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">لغتك الأم</Label>
                    <Select value={form.native_language} onValueChange={set("native_language")}>
                      <SelectTrigger data-testid="reg-native" className="bg-[#0f1420] border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arabic">العربية</SelectItem>
                        <SelectItem value="French">الفرنسية</SelectItem>
                        <SelectItem value="Turkish">التركية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 mb-1.5 block">اللهجة المفضلة</Label>
                    <Select value={form.dialect} onValueChange={set("dialect")}>
                      <SelectTrigger data-testid="dialect-select-dropdown" className="bg-[#0f1420] border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="American">أمريكية</SelectItem>
                        <SelectItem value="British">بريطانية</SelectItem>
                        <SelectItem value="Australian">أسترالية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300 mb-1.5 block">هدفك من التعلّم</Label>
                  <Select value={form.goal} onValueChange={set("goal")}>
                    <SelectTrigger data-testid="reg-goal" className="bg-[#0f1420] border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GOALS.map((g) => <SelectItem key={g.v} value={g.v}>{g.l}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button type="submit" data-testid="auth-submit-btn" disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#04120c] font-bold h-12 text-base">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === "login" ? "دخول" : "إنشاء الحساب والبدء")}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm text-slate-400">
            {mode === "login" ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
            <button
              data-testid="toggle-auth-mode"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-emerald-400 hover:underline font-medium"
            >
              {mode === "login" ? "أنشئ حساباً" : "سجّل الدخول"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
