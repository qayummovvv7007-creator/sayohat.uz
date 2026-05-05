"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BG = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80";

const CITIES = [
  "Toshkent","Samarqand","Buxoro","Namangan","Andijon",
  "Farg'ona","Nukus","Qarshi","Termiz","Jizzax",
  "Navoiy","Urganch","Xiva","Guliston","Qo'qon",
];

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setVisible(true);
    try {
      if (localStorage.getItem("uztravel_user")) router.replace("/explore");
    } catch {}
  }, []);

  // Step 1 — Google bosqichi
  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      setEmail("foydalanuvchi@gmail.com");
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  // Step 1 — Email bilan davom etish
  const handleEmailNext = () => {
    if (!email || !email.includes("@")) {
      setError("To'g'ri email kiriting");
      return;
    }
    setError("");
    setStep(2);
  };

  // Step 2 — Ro'yxatdan o'tish
  const handleRegister = () => {
    if (!phone || phone.replace(/\D/g, "").length < 9) {
      setError("To'g'ri telefon raqam kiriting (9 ta raqam)");
      return;
    }
    if (!city) {
      setError("Shaharingizni tanlang");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      try {
        localStorage.setItem("uztravel_user", JSON.stringify({ email, phone: phone.replace(/\D/g,""), city }));
      } catch {}
      setLoading(false);
      setStep(3);
      setTimeout(() => router.push("/explore"), 2000);
    }, 1400);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px", borderRadius: 14,
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    color: "#fff", background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.25)",
    outline: "none", transition: "border 0.2s, background 0.2s",
    boxSizing: "border-box",
  };

  const btnPrimary = {
    width: "100%", padding: "14px", borderRadius: 14, border: "none", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: "#fff",
    background: loading ? "rgba(14,165,233,0.5)" : "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
    boxShadow: loading ? "none" : "0 6px 20px rgba(14,165,233,0.4)",
    transition: "all 0.25s",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(15,23,42,0.75), rgba(14,165,233,0.25))",
      }} />

      {/* Back button */}
      <Link href="/" style={{
        position: "absolute", top: 20, left: 20, zIndex: 10,
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "8px 16px", borderRadius: 999, textDecoration: "none",
        background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)",
        backdropFilter: "blur(12px)", color: "#fff",
        fontFamily: "'DM Sans', sans-serif", fontSize: 13,
        transition: "background 0.2s",
      }}>
        ← Orqaga
      </Link>

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 5, width: "100%", maxWidth: 420, padding: "0 20px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.14)",
          backdropFilter: "blur(32px) saturate(1.8)",
          WebkitBackdropFilter: "blur(32px) saturate(1.8)",
          border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: 28,
          padding: "36px 32px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 18, margin: "0 auto 14px",
              background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 26, fontWeight: 800, color: "#fff",
              boxShadow: "0 8px 24px rgba(14,165,233,0.4)",
            }}>U</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              {step === 3 ? "Xush kelibsiz! 🎉" : "UzTravel"}
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
              {step === 1 && "Kirish yoki ro'yxatdan o'tish"}
              {step === 2 && "Telefon va shahringizni kiriting"}
              {step === 3 && "Hisobingiz yaratildi! Yo'naltirilmoqda..."}
            </p>
          </div>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Google button */}
              <button onClick={handleGoogle} disabled={loading} style={{
                width: "100%", padding: "13px 16px", borderRadius: 14, cursor: "pointer",
                background: loading ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.92)",
                border: "1px solid rgba(255,255,255,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: "#1E293B",
                transition: "all 0.2s", boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              }}>
                {loading ? (
                  <Spinner />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {loading ? "Tekshirilmoqda..." : "Google bilan kirish"}
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.18)" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)" }}>yoki email bilan</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.18)" }} />
              </div>

              {/* Email input */}
              <input
                type="email"
                placeholder="Email manzilingiz"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                style={{ ...inputStyle, color: email ? "#fff" : undefined }}
                onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.7)"; e.target.style.background = "rgba(255,255,255,0.16)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.background = "rgba(255,255,255,0.1)"; }}
              />

              {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#FCA5A5", textAlign: "center" }}>{error}</p>}

              <button onClick={handleEmailNext} style={{ ...btnPrimary, opacity: email ? 1 : 0.6 }}>
                Davom etish →
              </button>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Email confirmed */}
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 12,
                background: "rgba(74,222,128,0.14)", border: "1px solid rgba(74,222,128,0.3)",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#86EFAC",
              }}>
                <span>✓</span> {email}
              </div>

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>
                  Telefon raqam
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{
                    ...inputStyle, width: "auto", flexShrink: 0, padding: "13px 14px",
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                  }}>
                    🇺🇿 +998
                  </div>
                  <input
                    type="tel"
                    placeholder="90 123 45 67"
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 9)); setError(""); }}
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.7)"; e.target.style.background = "rgba(255,255,255,0.16)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.background = "rgba(255,255,255,0.1)"; }}
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>
                  📍 Joylashuvingiz
                </label>
                <select
                  value={city}
                  onChange={e => { setCity(e.target.value); setError(""); }}
                  style={{
                    ...inputStyle,
                    color: city ? "#fff" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    appearance: "none", WebkitAppearance: "none",
                  }}
                  onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.7)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; }}
                >
                  <option value="" style={{ background: "#1E3A5F" }}>Shahar tanlang...</option>
                  {CITIES.map(c => (
                    <option key={c} value={c} style={{ background: "#1E3A5F", color: "#fff" }}>{c}</option>
                  ))}
                </select>
              </div>

              {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#FCA5A5", textAlign: "center" }}>{error}</p>}

              <button onClick={handleRegister} disabled={loading} style={btnPrimary}>
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <Spinner /> Saqlanmoqda...
                  </span>
                ) : "Ro'yxatdan O'tish ✓"}
              </button>

              <button onClick={() => { setStep(1); setError(""); }} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.38)",
                padding: "4px",
              }}>
                ← Orqaga
              </button>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
                background: "rgba(74,222,128,0.18)", border: "2px solid rgba(74,222,128,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
                animation: "float 2s ease-in-out infinite",
              }}>🎉</div>
              <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.8 }}>
                <strong style={{ color: "#fff" }}>{city}</strong> shahridan<br />
                <strong style={{ color: "#7DD3FC" }}>+998{phone}</strong> raqami saqlandi.<br /><br />
                Sayohat sahifasiga o'tmoqdasiz...
              </p>
              {/* Progress bar */}
              <div style={{ marginTop: 20, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 99, width: "100%",
                  background: "linear-gradient(90deg,#0EA5E9,#6B7FD4)",
                  animation: "prog 2s linear forwards",
                }} />
                <style>{`@keyframes prog{from{width:0%}to{width:100%}}`}</style>
              </div>
            </div>
          )}
        </div>

        <p style={{
          textAlign: "center", marginTop: 16,
          fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.28)",
        }}>
          Ma'lumotlaringiz xavfsiz saqlanadi · UzTravel
        </p>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        border: "2px solid rgba(0,0,0,0.15)", borderTopColor: "#334155",
        animation: "spin 0.8s linear infinite", flexShrink: 0,
      }} />
    </>
  );
}