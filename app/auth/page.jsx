"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=85",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1400&q=85",
];

const CITIES = ["Toshkent","Samarqand","Buxoro","Namangan","Andijon","Farg'ona","Nukus","Qarshi","Termiz","Jizzax","Navoiy","Urganch","Xiva","Guliston","Qo'qon"];

function useRipple() {
  const [ripples, setRipples] = useState([]);
  const fire = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 900);
  };
  return { ripples, fire };
}

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgIdx, setBgIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { ripples, fire } = useRipple();

  useEffect(() => {
    setMounted(true);
    try { if (localStorage.getItem("uztravel_user")) router.replace("/explore"); } catch {}
    const t = setInterval(() => setBgIdx(i => (i + 1) % BG_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => { setEmail("foydalanuvchi@gmail.com"); setLoading(false); setStep(2); }, 1400);
  };

  const handleEmailNext = () => {
    if (!email || !email.includes("@")) { setError("To'g'ri email kiriting"); return; }
    setError(""); setStep(2);
  };

  const handleRegister = () => {
    if (!phone || phone.length < 9) { setError("9 ta raqam kiriting"); return; }
    if (!city) { setError("Shahar tanlang"); return; }
    setError(""); setLoading(true);
    setTimeout(() => {
      try { localStorage.setItem("uztravel_user", JSON.stringify({ email, phone, city })); } catch {}
      setLoading(false); setStep(3);
      setTimeout(() => router.push("/explore"), 2000);
    }, 1400);
  };

  const inp = {
    width:"100%", padding:"13px 16px", borderRadius:14, boxSizing:"border-box",
    fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#fff",
    background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.18)",
    outline:"none", transition:"all 0.2s",
  };

  return (
    <div style={{ minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {/* BG carousel */}
      <AnimatePresence mode="wait">
        <motion.div key={bgIdx}
          initial={{ opacity:0, scale:1.06 }} animate={{ opacity:1, scale:1.1 }} exit={{ opacity:0 }}
          transition={{ duration:1.2 }}
          style={{ position:"absolute", inset:0, backgroundImage:`url(${BG_IMAGES[bgIdx]})`, backgroundSize:"cover", backgroundPosition:"center" }} />
      </AnimatePresence>
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg,rgba(4,8,20,0.9),rgba(4,8,20,0.72) 40%,rgba(4,8,20,0.92))" }} />

      {/* Animated orbs */}
      <motion.div animate={{ scale:[1,1.2,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:6, repeat:Infinity }}
        style={{ position:"absolute", top:"-10%", left:"-5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(99,102,241,0.4),transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />
      <motion.div animate={{ scale:[1,1.15,1], opacity:[0.1,0.25,0.1] }} transition={{ duration:8, repeat:Infinity, delay:2 }}
        style={{ position:"absolute", bottom:"-10%", right:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.35),transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

      {/* Back */}
      <Link href="/" style={{ position:"absolute", top:24, left:24, zIndex:10, display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:999, textDecoration:"none",
        background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", backdropFilter:"blur(12px)", color:"rgba(255,255,255,0.7)", fontFamily:"'DM Sans',sans-serif", fontSize:12 }}>
        ← Orqaga
      </Link>

      {/* Card */}
      <motion.div initial={{ opacity:0, y:32, scale:0.95 }} animate={{ opacity:mounted?1:0, y:mounted?0:32, scale:mounted?1:0.95 }}
        transition={{ duration:0.7, ease:[0.23,1,0.32,1] }}
        style={{ position:"relative", zIndex:5, width:"100%", maxWidth:420, padding:"0 20px" }}>
        <div style={{
          background:"rgba(255,255,255,0.09)",
          backdropFilter:"blur(40px) saturate(2)", WebkitBackdropFilter:"blur(40px) saturate(2)",
          border:"1px solid rgba(255,255,255,0.2)",
          borderRadius:28, padding:"40px 32px",
          boxShadow:"0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
          position:"relative", overflow:"hidden",
        }}>
          {/* Specular */}
          <div style={{ position:"absolute", top:0, left:12, right:12, height:"40%", background:"linear-gradient(to bottom,rgba(255,255,255,0.1),transparent)", borderRadius:"28px 28px 0 0", pointerEvents:"none" }} />
          {/* Ripples */}
          {ripples.map(rp => (
            <motion.span key={rp.id} initial={{ scale:0, opacity:0.3 }} animate={{ scale:10, opacity:0 }}
              transition={{ duration:1 }} style={{ position:"absolute", left:rp.x, top:rp.y, width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.15)", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
          ))}

          {/* Logo */}
          <div style={{ textAlign:"center", marginBottom:28, position:"relative", zIndex:1 }}>
            <motion.div animate={{ boxShadow:["0 8px 24px rgba(14,165,233,0.4)","0 12px 36px rgba(99,102,241,0.6)","0 8px 24px rgba(14,165,233,0.4)"] }}
              transition={{ duration:3, repeat:Infinity }}
              style={{ width:64, height:64, borderRadius:20, margin:"0 auto 16px", background:"linear-gradient(135deg,#0EA5E9,#6366F1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:800, color:"#fff" }}>U</motion.div>
            <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#fff", marginBottom:6 }}>
              {step===3 ? "Xush kelibsiz! 🎉" : "UzTravel"}
            </h1>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,0.45)" }}>
              {step===1&&"Kirish yoki ro'yxatdan o'tish"}
              {step===2&&"Telefon va shahringizni kiriting"}
              {step===3&&"Hisobingiz yaratildi! Yo'naltirilmoqda..."}
            </p>
            {/* Step dots */}
            {step < 3 && (
              <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:14 }}>
                {[1,2].map(s => (
                  <motion.div key={s} animate={{ width:s===step?24:8, background:s===step?"#6366F1":"rgba(255,255,255,0.2)" }}
                    style={{ height:7, borderRadius:99, transition:"all 0.35s" }} />
                ))}
              </div>
            )}
          </div>

          {/* STEP 1 */}
          <AnimatePresence mode="wait">
            {step===1 && (
              <motion.div key="s1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.35 }}
                style={{ display:"flex", flexDirection:"column", gap:12, position:"relative", zIndex:1 }}>
                <motion.button onClick={handleGoogle} disabled={loading} whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                  style={{ width:"100%", padding:"13px 16px", borderRadius:14, cursor:"pointer", background:loading?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.9)", border:"1px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:"#1E293B", boxShadow:"0 4px 14px rgba(0,0,0,0.2)" }}>
                  {loading ? <Spinner /> : (
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  {loading?"Tekshirilmoqda...":"Google bilan kirish"}
                </motion.button>

                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.14)" }} />
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.35)" }}>yoki email bilan</span>
                  <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.14)" }} />
                </div>

                <input type="email" placeholder="Email manzilingiz" value={email}
                  onChange={e=>{setEmail(e.target.value);setError("");}} style={inp}
                  onFocus={e=>{e.target.style.borderColor="rgba(99,102,241,0.6)";e.target.style.background="rgba(255,255,255,0.13)";}}
                  onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.18)";e.target.style.background="rgba(255,255,255,0.08)";}} />

                {error&&<p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#FCA5A5", textAlign:"center" }}>{error}</p>}

                <motion.button onClick={(e)=>{fire(e);handleEmailNext();}} whileHover={{ scale:1.02, boxShadow:"0 12px 28px rgba(99,102,241,0.5)" }} whileTap={{ scale:0.97 }}
                  style={{ position:"relative", overflow:"hidden", width:"100%", padding:"13px", borderRadius:14, border:"none", cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, color:"#fff", opacity:email?1:0.5,
                    background:"linear-gradient(135deg,#6366F1,#0EA5E9)",
                    boxShadow:"0 6px 20px rgba(99,102,241,0.4)" }}>
                  <span style={{ position:"relative", zIndex:1 }}>Davom etish →</span>
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step===2 && (
              <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} transition={{ duration:0.35 }}
                style={{ display:"flex", flexDirection:"column", gap:12, position:"relative", zIndex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px", borderRadius:12, background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.28)", fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#86EFAC" }}>
                  <motion.span animate={{ scale:[1,1.2,1] }} transition={{ duration:1.5, repeat:Infinity }}>✓</motion.span>
                  {email}
                </div>

                <div>
                  <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.5)", marginBottom:7 }}>Telefon raqam</label>
                  <div style={{ display:"flex", gap:8 }}>
                    <div style={{ ...inp, width:"auto", padding:"13px 14px", flexShrink:0, display:"flex", alignItems:"center", gap:5, fontSize:13 }}>
                      🇺🇿 +998
                    </div>
                    <input type="tel" placeholder="90 123 45 67" value={phone}
                      onChange={e=>{setPhone(e.target.value.replace(/\D/g,"").slice(0,9));setError("");}} style={{ ...inp, flex:1 }}
                      onFocus={e=>{e.target.style.borderColor="rgba(99,102,241,0.6)";e.target.style.background="rgba(255,255,255,0.13)";}}
                      onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.18)";e.target.style.background="rgba(255,255,255,0.08)";}} />
                  </div>
                </div>

                <div>
                  <label style={{ display:"block", fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.5)", marginBottom:7 }}>📍 Joylashuvingiz</label>
                  <select value={city} onChange={e=>{setCity(e.target.value);setError("");}}
                    style={{ ...inp, color:city?"#fff":"rgba(255,255,255,0.35)", cursor:"pointer", appearance:"none" }}
                    onFocus={e=>e.target.style.borderColor="rgba(99,102,241,0.6)"}
                    onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.18)"}>
                    <option value="" style={{ background:"#1a1f3a" }}>Shahar tanlang...</option>
                    {CITIES.map(c=><option key={c} value={c} style={{ background:"#1a1f3a", color:"#fff" }}>{c}</option>)}
                  </select>
                </div>

                {error&&<p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"#FCA5A5", textAlign:"center" }}>{error}</p>}

                <motion.button onClick={(e)=>{fire(e);handleRegister();}} disabled={loading}
                  whileHover={{ scale:1.02, boxShadow:"0 12px 28px rgba(99,102,241,0.5)" }} whileTap={{ scale:0.97 }}
                  style={{ position:"relative", overflow:"hidden", width:"100%", padding:"13px", borderRadius:14, border:"none", cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif", fontSize:14, fontWeight:700, color:"#fff",
                    background:loading?"rgba(99,102,241,0.4)":"linear-gradient(135deg,#6366F1,#0EA5E9)",
                    boxShadow:"0 6px 20px rgba(99,102,241,0.4)" }}>
                  {loading ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><Spinner /> Saqlanmoqda...</span>
                    : <span style={{ position:"relative", zIndex:1 }}>Ro'yxatdan O'tish ✓</span>}
                </motion.button>

                <button onClick={()=>{setStep(1);setError("");}} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.32)", padding:"2px" }}>
                  ← Orqaga
                </button>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step===3 && (
              <motion.div key="s3" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5 }}
                style={{ textAlign:"center", padding:"8px 0", position:"relative", zIndex:1 }}>
                <motion.div animate={{ scale:[1,1.1,1], rotate:[0,5,-5,0] }} transition={{ duration:2, repeat:Infinity }}
                  style={{ width:72, height:72, borderRadius:"50%", margin:"0 auto 20px", background:"rgba(74,222,128,0.18)", border:"2px solid rgba(74,222,128,0.45)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>🎉</motion.div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.8 }}>
                  <strong style={{ color:"#fff" }}>{city}</strong> shahridan<br />
                  <strong style={{ color:"#7DD3FC" }}>+998{phone}</strong> raqami saqlandi.
                </p>
                <div style={{ marginTop:20, height:3, borderRadius:99, background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
                  <motion.div initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:2, ease:"linear" }}
                    style={{ height:"100%", borderRadius:99, background:"linear-gradient(90deg,#6366F1,#0EA5E9)" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p style={{ textAlign:"center", marginTop:16, fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"rgba(255,255,255,0.22)" }}>
          Ma'lumotlaringiz xavfsiz saqlanadi · UzTravel Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}

function Spinner() {
  return (
    <motion.div animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:"linear" }}
      style={{ width:16, height:16, borderRadius:"50%", border:"2px solid rgba(0,0,0,0.15)", borderTopColor:"#334155", flexShrink:0 }} />
  );
}