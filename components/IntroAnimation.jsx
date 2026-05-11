"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENES = [
  {
    id: "plane",
    bg: "linear-gradient(160deg, #0c1a3a 0%, #1a3a6a 50%, #0EA5E9 100%)",
    emoji: "✈️",
    title: "UzTravel",
    sub: "Sayohatingiz boshlanmoqda...",
    elements: [
      { emoji: "☁️", x: "10%", y: "20%", size: 60, delay: 0.2, drift: 30 },
      { emoji: "☁️", x: "70%", y: "15%", size: 40, delay: 0.5, drift: -20 },
      { emoji: "☁️", x: "85%", y: "35%", size: 50, delay: 0.8, drift: 25 },
      { emoji: "⛰️", x: "5%",  y: "65%", size: 80, delay: 0.3, drift: 0 },
      { emoji: "⛰️", x: "80%", y: "60%", size: 100,delay: 0.4, drift: 0 },
    ],
  },
  {
    id: "fishing",
    bg: "linear-gradient(160deg, #0a2540 0%, #064e6e 40%, #0EA5E9 100%)",
    emoji: "🎣",
    title: "Ko'llar & Daryolar",
    sub: "Baliq ovlash mavsumi...",
    elements: [
      { emoji: "🌊", x: "0%",  y: "60%", size: 120,delay: 0.1, drift: 15 },
      { emoji: "🌊", x: "40%", y: "65%", size: 100,delay: 0.3, drift: -10 },
      { emoji: "🐟", x: "20%", y: "70%", size: 40, delay: 0.6, drift: 20 },
      { emoji: "🐟", x: "60%", y: "75%", size: 35, delay: 0.9, drift: -15 },
      { emoji: "🚣", x: "35%", y: "55%", size: 60, delay: 0.4, drift: 5 },
    ],
  },
  {
    id: "mountains",
    bg: "linear-gradient(160deg, #0f0f2e 0%, #1a1a5e 40%, #6366F1 100%)",
    emoji: "⛰️",
    title: "Tog'lar Dunyosi",
    sub: "Cho'qqilarga yo'l oling...",
    elements: [
      { emoji: "⛰️", x: "0%",  y: "50%", size: 120,delay: 0.2, drift: 0 },
      { emoji: "⛰️", x: "30%", y: "40%", size: 160,delay: 0.1, drift: 0 },
      { emoji: "⛰️", x: "65%", y: "45%", size: 130,delay: 0.3, drift: 0 },
      { emoji: "🌟", x: "15%", y: "10%", size: 30, delay: 0.5, drift: 5 },
      { emoji: "🌟", x: "75%", y: "8%",  size: 25, delay: 0.7, drift: -5 },
      { emoji: "🏔️", x: "45%", y: "55%", size: 90, delay: 0.4, drift: 0 },
    ],
  },
];

export default function IntroAnimation({ onDone }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const TOTAL = 3200;
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / TOTAL) * 100, 100);
      setProgress(pct);
      setSceneIdx(Math.min(Math.floor((elapsed / TOTAL) * SCENES.length), SCENES.length - 1));
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 700);
        }, 300);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onDone]);

  const scene = SCENES[sceneIdx];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Animated BG */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ position: "absolute", inset: 0, background: scene.bg }}
            />
          </AnimatePresence>

          {/* Stars */}
          {[...Array(30)].map((_, i) => (
            <motion.div key={i}
              animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.13) % 2 }}
              style={{
                position: "absolute",
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 23 + 7) % 55}%`,
                width: 2 + (i % 2), height: 2 + (i % 2),
                borderRadius: "50%", background: "#fff",
              }}
            />
          ))}

          {/* Scene elements */}
          <AnimatePresence mode="wait">
            <motion.div key={scene.id + "-els"}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              {scene.elements.map((el, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, x: [0, el.drift, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: el.delay },
                    y:       { duration: 0.5, delay: el.delay },
                    x:       { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                  style={{ position: "absolute", left: el.x, top: el.y, fontSize: el.size }}
                >
                  {el.emoji}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Main hero icon */}
          <AnimatePresence mode="wait">
            <motion.div key={scene.id + "-hero"}
              initial={{ scale: 0.3, opacity: 0, y: 30 }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: 1, y: 0,
                rotate: scene.id === "plane" ? [0, 5, -3, 0] : 0,
                x: scene.id === "plane" ? ["-120%", "0%"] : 0,
              }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: "absolute",
                top: scene.id === "plane" ? "30%" : "auto",
                left: scene.id === "plane" ? "50%" : "50%",
                transform: "translate(-50%, -50%)",
                fontSize: scene.id === "plane" ? 96 : 0,
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
                zIndex: 5,
              }}
            >
              {scene.id === "plane" && (
                <motion.span
                  animate={{ y: [0, -10, 0], rotate: [0, 3, -2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "inline-block", fontSize: 96 }}
                >✈️</motion.span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Center text */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
              style={{
                width: 80, height: 80, borderRadius: 24, margin: "0 auto 24px",
                background: "linear-gradient(145deg,#38BDF8,#6366F1,#A78BFA)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 36, fontWeight: 900, color: "#fff",
                boxShadow: "0 16px 48px rgba(99,102,241,0.6), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.span
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                style={{ display: "inline-block" }}
              >U</motion.span>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div key={scene.id + "-txt"}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
              >
                <h1 style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(2.2rem,6vw,4rem)", fontWeight: 700, color: "#fff",
                  textShadow: "0 4px 24px rgba(0,0,0,0.5)", marginBottom: 10, lineHeight: 1.1,
                }}>
                  {scene.title}
                </h1>
                <p style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 16,
                  color: "rgba(255,255,255,0.65)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}>
                  {scene.sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div style={{ marginTop: 36, width: 220, margin: "36px auto 0" }}>
              <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#38BDF8,#A78BFA)", width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div style={{ marginTop: 10, fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Yuklanmoqda {Math.round(progress)}%
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 80" fill="none" style={{ display: "block" }}>
              <motion.path
                animate={{ d: [
                  "M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z",
                  "M0,30 C360,60 720,20 1080,50 C1260,65 1380,20 1440,30 L1440,80 L0,80 Z",
                  "M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z",
                ]}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                fill="rgba(255,255,255,0.06)"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}