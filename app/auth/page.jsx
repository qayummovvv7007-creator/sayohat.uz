"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80";

const UZBEKISTAN_CITIES = [
  "Toshkent","Samarqand","Buxoro","Namangan","Andijon",
  "Farg'ona","Nukus","Qarshi","Termiz","Jizzax",
  "Navoiy","Urganch","Xiva","Guliston","Qo'qon",
];

export default function AuthPage() {
  const [step, setStep] = useState(1); // 1=email, 2=phone+location, 3=success
  const [form, setForm] = useState({ email: "", phone: "", city: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
    const user = localStorage.getItem("uztravel_user");
    if (user) router.replace("/explore");
  }, [router]);

  const handleGmail = () => {
    setLoading(true);
    setTimeout(() => {
      setForm((f) => ({ ...f, email: "foydalanuvchi@gmail.com" }));
      setLoading(false);
      setStep(2);
    }, 1600);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.phone || form.phone.length < 9) {
      setError("Iltimos, to'g'ri telefon raqam kiriting");
      return;
    }
    if (!form.city) {
      setError("Iltimos, shaharingizni tanlang");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("uztravel_user", JSON.stringify(form));
      setLoading(false);
      setStep(3);
      setTimeout(() => router.push("/explore"), 2200);
    }, 1400);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg,rgba(15,23,42,0.72) 0%,rgba(14,165,233,0.28) 100%)",
        }}
      />

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-body transition-all duration-200 hover:bg-white/10"
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.22)",
        }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Orqaga
      </Link>

      {/* Center card */}
      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <div
          className={`w-full max-w-md transition-all duration-700 ${loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
        >
          {/* Glass card */}
          <div
            className="rounded-3xl p-8 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(32px) saturate(2)",
              WebkitBackdropFilter: "blur(32px) saturate(2)",
              border: "1px solid rgba(255,255,255,0.38)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-xl"
                style={{ background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)" }}
              >
                U
              </div>
              <h1 className="font-display text-2xl font-bold text-white">
                {step === 3 ? "Xush kelibsiz!" : "Kirish / Ro'yxat"}
              </h1>
              <p className="text-sm font-body mt-1" style={{ color: "rgba(255,255,255,0.58)" }}>
                {step === 1 && "Gmail orqali kiring yoki ro'yxatdan o'ting"}
                {step === 2 && "Qo'shimcha ma'lumotlarni kiriting"}
                {step === 3 && "Hisobingiz yaratildi! Yo'naltirilmoqda..."}
              </p>
            </div>

            {/* Step 1 — Gmail */}
            {step === 1 && (
              <div className="space-y-4">
                <button
                  onClick={handleGmail}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-body font-semibold text-sm transition-all duration-300"
                  style={{
                    background: loading ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.92)",
                    color: "#0F172A",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                  }}
                >
                  {loading ? (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-sky-500"
                      style={{ animation: "spin-slow 0.8s linear infinite" }} />
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {loading ? "Tekshirilmoqda..." : "Google bilan kirish"}
                </button>

                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
                  <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.4)" }}>yoki</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.2)" }} />
                </div>

                <input
                  type="email"
                  placeholder="Email manzil"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3.5 rounded-2xl font-body text-sm text-white placeholder-white/40 outline-none transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    backdropFilter: "blur(8px)",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; e.target.style.background = "rgba(255,255,255,0.16)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.22)"; e.target.style.background = "rgba(255,255,255,0.1)"; }}
                />

                <button
                  onClick={() => { if (form.email) setStep(2); else setError("Email kiriting"); }}
                  className="w-full py-3.5 rounded-2xl font-body font-semibold text-sm text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
                    boxShadow: "0 4px 18px rgba(14,165,233,0.4)",
                  }}
                >
                  Davom etish →
                </button>
                {error && <p className="text-red-300 text-xs font-body text-center">{error}</p>}
              </div>
            )}

            {/* Step 2 — Phone + Location */}
            {step === 2 && (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Email display */}
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body"
                  style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: "#86EFAC" }}
                >
                  <span>✓</span>
                  <span>{form.email}</span>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-body font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Telefon raqam
                  </label>
                  <div className="flex gap-2">
                    <div
                      className="px-3 py-3.5 rounded-2xl text-white text-sm font-body flex items-center gap-1 flex-shrink-0"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)" }}
                    >
                      🇺🇿 +998
                    </div>
                    <input
                      type="tel"
                      placeholder="90 123 45 67"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "") }))}
                      maxLength={9}
                      className="flex-1 px-4 py-3.5 rounded-2xl font-body text-sm text-white placeholder-white/40 outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.22)" }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(14,165,233,0.6)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.22)"; }}
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="text-xs font-body font-semibold mb-2 block" style={{ color: "rgba(255,255,255,0.6)" }}>
                    📍 Joylashuvingiz
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-2xl font-body text-sm outline-none transition-all cursor-pointer"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      color: form.city ? "#fff" : "rgba(255,255,255,0.4)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <option value="" style={{ background: "#1E3A5F" }}>Shahar tanlang</option>
                    {UZBEKISTAN_CITIES.map((c) => (
                      <option key={c} value={c} style={{ background: "#1E3A5F", color: "#fff" }}>{c}</option>
                    ))}
                  </select>
                </div>

                {error && <p className="text-red-300 text-xs font-body text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl font-body font-bold text-sm text-white transition-all duration-300"
                  style={{
                    background: loading
                      ? "rgba(14,165,233,0.5)"
                      : "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
                    boxShadow: loading ? "none" : "0 8px 24px rgba(14,165,233,0.4)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        style={{ animation: "spin-slow 0.8s linear infinite" }} />
                      Saqlanmoqda...
                    </span>
                  ) : "Ro'yxatdan O'tish ✓"}
                </button>

                <button type="button" onClick={() => setStep(1)}
                  className="w-full text-xs font-body transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.4)" }}>
                  ← Orqaga qaytish
                </button>
              </form>
            )}

            {/* Step 3 — Success */}
            {step === 3 && (
              <div className="text-center py-4">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
                  style={{
                    background: "rgba(74,222,128,0.2)",
                    border: "2px solid rgba(74,222,128,0.5)",
                    animation: "float 2s ease-in-out infinite",
                  }}
                >
                  🎉
                </div>
                <p className="font-body text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  <strong className="text-white">{form.city}</strong> shahridagi{" "}
                  <strong className="text-sky-400">{form.phone}</strong> raqamingiz saqlandi.
                  <br />
                  <br />
                  Sayohat sahifasiga o'tmoqdasiz...
                </p>
                <div className="mt-6 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg,#0EA5E9,#6B7FD4)",
                      animation: "shimmer 2s linear forwards",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Privacy note */}
          <p className="text-center text-xs font-body mt-4" style={{ color: "rgba(255,255,255,0.3)" }}>
            Ma'lumotlaringiz xavfsiz saqlanadi · UzTravel Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}