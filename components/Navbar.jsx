"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Dashboard from "./Dashboard.jsx";

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

function Tilt3D({ children, depth = 10, style = {} }) {
  const ref = useRef(null);
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const rotX = useSpring(useTransform(yRaw, [-0.5, 0.5], [depth, -depth]), { stiffness: 280, damping: 24 });
  const rotY = useSpring(useTransform(xRaw, [-0.5, 0.5], [-depth, depth]), { stiffness: 280, damping: 24 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    xRaw.set((e.clientX - r.left) / r.width - 0.5);
    yRaw.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={() => { xRaw.set(0); yRaw.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 900, ...style }}>
      {children}
    </motion.div>
  );
}

function WaterBlob({ color = "#0EA5E9", size = 400, style = {} }) {
  return (
    <motion.div animate={{ scale: [1, 1.08, 0.96, 1.04, 1], rotate: [0, 4, -3, 5, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", width: size, height: size, pointerEvents: "none", ...style }}>
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", opacity: 0.1 }}>
        <motion.path fill={color}
          animate={{ d: [
            "M44.3,-76.5C55.9,-67.5,62.7,-52.2,70.2,-37.2C77.7,-22.2,86,-7.5,84.5,6.5C83,20.5,71.7,33.8,61.1,45.8C50.5,57.8,40.6,68.5,28.1,74.5C15.6,80.5,0.5,81.8,-14.1,79.1C-28.7,76.4,-42.8,69.7,-55.2,60C-67.6,50.3,-78.3,37.6,-82.9,22.7C-87.5,7.8,-86,-9.3,-79.3,-23.6C-72.6,-37.9,-60.7,-49.4,-47.4,-58C-34.1,-66.6,-19.4,-72.3,-2.5,-68.7C14.4,-65.1,32.7,-52.2,44.3,-76.5Z",
            "M47.5,-80.5C59.9,-71.2,67.1,-55.2,74.2,-39.5C81.3,-23.8,88.3,-8.4,86.5,6.2C84.7,20.8,74.1,34.6,62.5,46.3C50.9,58,38.3,67.6,23.9,73.9C9.5,80.2,-6.7,83.2,-21.4,79.5C-36.1,75.8,-49.3,65.4,-60.2,53C-71.1,40.6,-79.7,26.2,-82.6,10.5C-85.5,-5.2,-82.7,-22.2,-74.7,-36C-66.7,-49.8,-53.5,-60.4,-39.5,-68.9C-25.5,-77.4,-10.7,-83.8,3.8,-89.3C18.3,-94.8,35.1,-89.8,47.5,-80.5Z",
            "M44.3,-76.5C55.9,-67.5,62.7,-52.2,70.2,-37.2C77.7,-22.2,86,-7.5,84.5,6.5C83,20.5,71.7,33.8,61.1,45.8C50.5,57.8,40.6,68.5,28.1,74.5C15.6,80.5,0.5,81.8,-14.1,79.1C-28.7,76.4,-42.8,69.7,-55.2,60C-67.6,50.3,-78.3,37.6,-82.9,22.7C-87.5,7.8,-86,-9.3,-79.3,-23.6C-72.6,-37.9,-60.7,-49.4,-47.4,-58C-34.1,-66.6,-19.4,-72.3,-2.5,-68.7C14.4,-65.1,32.7,-52.2,44.3,-76.5Z",
          ]}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc, color, delay = 0 }) {
  const { ripples, fire } = useRipple();
  const [hov, setHov] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}>
      <Tilt3D depth={8} style={{ position: "relative" }}>
        <motion.div onClick={fire} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 280, damping: 22 }}
          style={{
            position: "relative", overflow: "hidden", borderRadius: 28, padding: "40px 32px 36px",
            textAlign: "center", cursor: "default",
            background: hov ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.72)",
            backdropFilter: "blur(24px) saturate(2)", WebkitBackdropFilter: "blur(24px) saturate(2)",
            border: hov ? `1px solid ${color}40` : "1px solid rgba(255,255,255,0.7)",
            boxShadow: hov ? `0 24px 56px rgba(0,0,0,0.12), 0 8px 24px ${color}20` : "0 4px 20px rgba(0,0,0,0.06)",
            transition: "all 0.3s",
          }}>
          {ripples.map(rp => (
            <motion.span key={rp.id} initial={{ scale: 0, opacity: 0.45 }} animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 0.9 }} style={{
                position: "absolute", left: rp.x, top: rp.y, width: 40, height: 40,
                borderRadius: "50%", background: `${color}35`, transform: "translate(-50%,-50%)", pointerEvents: "none",
              }} />
          ))}
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay }} style={{
              position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", width: 80, height: 80,
              borderRadius: "50%", background: `radial-gradient(circle, ${color}45, transparent 70%)`, filter: "blur(16px)", pointerEvents: "none",
            }} />
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.5 }} style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "50%",
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)", pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 22, background: `linear-gradient(145deg, ${color}22, ${color}44)`,
              border: `1.5px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, boxShadow: `0 4px 16px ${color}25`,
            }}>
              <motion.span animate={hov ? { rotate: [0,-12,14,-8,0], scale: [1,1.3,1.05,1.2,1] } : { rotate: [0,-3,3,-2,0], scale: [1,1.04,1] }}
                transition={hov ? { duration: 0.5 } : { duration: 4, repeat: Infinity }}
                style={{ display: "inline-block" }}>{icon}</motion.span>
            </div>
          </div>
          <motion.div animate={{ scaleX: hov ? 1 : 0.3, opacity: hov ? 1 : 0.4 }}
            style={{ position: "relative", zIndex: 2, width: 40, height: 3, borderRadius: 99, margin: "0 auto 16px",
              background: `linear-gradient(90deg, ${color}, ${color}88)`, transformOrigin: "center" }}
            transition={{ duration: 0.35 }} />
          <h3 style={{ position: "relative", zIndex: 2, fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>{title}</h3>
          <p style={{ position: "relative", zIndex: 2, fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#64748B", lineHeight: 1.75 }}>{desc}</p>
        </motion.div>
      </Tilt3D>
    </motion.div>
  );
}

const FEATURES = [
  { icon: "📍", title: "Aniq Joylashuv", color: "#0EA5E9", desc: "Xaritada real koordinatalar va 3D manzara orqali har bir joy aniq ko'rsatiladi." },
  { icon: "🌟", title: "Tasdiqlangan Joylar", color: "#F59E0B", desc: "Faqat tekshirilgan, baholangan va yuqori reytingli joylar tavsiya etiladi." },
  { icon: "🧭", title: "Shaxsiy Tavsiya", color: "#6366F1", desc: "AI asosida kategoriya va mevsimga qarab eng mos sayohat marshrutlari taklif qilinadi." },
];

export default function HomePage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Dashboard fullscreen (no Navbar over it) */}
      <Dashboard />

      {/* Features section */}
      <section style={{ padding: "96px 24px", background: "linear-gradient(160deg,#F8FAFF 0%,#EEF2FF 40%,#F0FDF4 100%)", position: "relative", overflow: "hidden" }}>
        <WaterBlob color="#22C55E" size={380} style={{ top: -60, right: -80 }} />
        <WaterBlob color="#0EA5E9" size={280} style={{ bottom: -40, left: -60 }} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.65 }} style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, color: "#0F172A", lineHeight: 1.15, marginBottom: 16 }}>
              Nima uchun{" "}
              <em style={{ fontStyle: "italic", background: "linear-gradient(90deg,#0EA5E9,#6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>UzTravel?</em>
            </h2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 0.12} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Tilt3D depth={4} style={{ borderRadius: 32 }}>
            <div style={{ position: "relative", borderRadius: 32, overflow: "hidden", padding: "72px 48px", textAlign: "center",
              backgroundImage: "url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85)",
              backgroundSize: "cover", backgroundPosition: "center" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(14,165,233,0.92),rgba(99,102,241,0.88))" }} />
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
                style={{ position: "absolute", top: 0, bottom: 0, width: "40%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)", transform: "skewX(-15deg)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                  Sayohatingizni bugun boshlang
                </h2>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.78)", maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.75 }}>
                  Dashboard orqali barcha joylarni real vaqtda kuzating, parvozlarni ko'ring va sayohatingizni rejalashtiring
                </p>
                <Link href="/auth" style={{
                  display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 36px", borderRadius: 16,
                  fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#0EA5E9", background: "#fff",
                  textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                }}>🚀 Bepul Ro'yxatdan O'tish →</Link>
              </div>
            </div>
          </Tilt3D>
        </div>
      </section>

      <Footer />
    </div>
  );
}