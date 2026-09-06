import { useEffect, useState, useRef } from "react";
import api from "@/lib/api";
import { Loader2, Award, Lock, Download, GraduationCap } from "lucide-react";

export default function Certificate() {
  const [cert, setCert] = useState(null);
  const printRef = useRef(null);

  useEffect(() => {
    api.get("/certificate").then((r) => setCert(r.data)).catch(() => {});
  }, []);

  if (!cert)
    return <div className="grid place-items-center py-32"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>;

  const handlePrint = () => window.print();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white flex items-center gap-3">
          <Award className="w-7 h-7 text-emerald-400" /> شهادة الإتقان
        </h1>
        <p className="text-slate-400 mt-1">اجتز التحديات وصولاً للمستوى C1 لفتح شهادتك الرسمية.</p>
      </div>

      {!cert.eligible ? (
        <div className="card-surface p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 grid place-items-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-2">الشهادة غير متاحة بعد</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            مستواك الحالي: <span className="font-mono-en text-emerald-400">{cert.level || "غير محدد"}</span>.
            واصل الجلسات واجتز تحديات الترقية للوصول إلى C1/C2 والحصول على شهادتك.
          </p>
        </div>
      ) : (
        <>
          <div ref={printRef} className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center bg-gradient-to-br from-[#0f1a15] to-[#0A0D14] border-2 border-emerald-500/40" data-testid="certificate-card">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 30% 20%, #10B981, transparent 40%)" }} />
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 grid place-items-center glow mx-auto mb-6">
              <GraduationCap className="w-9 h-9 text-[#04120c]" />
            </div>
            <p className="text-emerald-400 tracking-widest text-sm font-en mb-2">CERTIFICATE OF MASTERY</p>
            <h2 className="font-heading font-extrabold text-3xl text-white mb-6">شهادة إتقان اللغة الإنجليزية</h2>
            <p className="text-slate-400 mb-2">تُمنح هذه الشهادة إلى</p>
            <div className="text-4xl font-heading font-extrabold text-white mb-6">{cert.name}</div>
            <p className="text-slate-300 max-w-md mx-auto mb-8">
              لإتمامه رحلة التعلّم بنجاح ووصوله إلى مستوى الطلاقة
              <span className="font-mono-en text-emerald-400 mx-2">{cert.level}</span>
              وفق الإطار الأوروبي المرجعي للغات.
            </p>
            <div className="flex justify-center gap-10 text-sm">
              <div>
                <div className="text-slate-500">الجلسات</div>
                <div className="text-white font-mono-en text-lg">{cert.sessions_completed}</div>
              </div>
              <div>
                <div className="text-slate-500">نقاط الخبرة</div>
                <div className="text-white font-mono-en text-lg">{cert.xp}</div>
              </div>
              <div>
                <div className="text-slate-500">رقم التحقق</div>
                <div className="text-white font-mono-en text-lg">{cert.verification_id}</div>
              </div>
            </div>
          </div>

          <button onClick={handlePrint} data-testid="certificate-download-btn"
            className="w-full py-4 rounded-full bg-emerald-500 text-[#04120c] font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> طباعة / حفظ الشهادة
          </button>
        </>
      )}
    </div>
  );
}
