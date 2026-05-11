"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENES = [
  {
    id: "plane",
    label: "Sayohat boshlang",
    bg: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85",
    color: "#38BDF8",
    Animation: PlaneSvg,
  },
  {
    id: "fishing",
    label: "Tabiatni kashf eting",
    bg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=85",
    color: "#22C55E",
    Animation: FishingSvg,
  },
  {
    id: "mountain",
    label: "Cho'qqilarga chiqing",
    bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85",
    color: "#A78BFA",
    Animation: MountainSvg,
  },
];

/* ── PlaneSvg: oddiy x/y animate bilan (offsetPath yo'q) ── */
function PlaneSvg() {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" fill="none">
      {/* Clouds */}
      <motion.ellipse cx="30" cy="30" rx="22" ry="12" fill="rgba(255,255,255,0.25)"
        animate={{ x: [0, 8, 0], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 4, repeat: Infinity }} />
      <motion.ellipse cx="180" cy="20" rx="28" ry="14" fill="rgba(255,255,255,0.2)"
        animate={{ x: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity }} />
      <motion.ellipse cx="100" cy="15" rx="18" ry="9" fill="rgba(255,255,255,0.18)"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity }} />

      {/* Dotted trail */}
      <motion.path
        d="M10 80 Q110 20 210 60"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Plane — simple translate along arc points */}
      <motion.g
        initial={{ x: 10, y: 80, rotate: -20 }}
        animate={{ x: [10, 60, 110, 160, 210], y: [80, 45, 25, 35, 60], rotate: [-20, -15, -5, 5, 10] }}
        transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
      >
        <g transform="translate(-18,-10)">
          <ellipse cx="18" cy="10" rx="16" ry="6" fill="white" />
          <path d="M4 10 L0 16 L8 14 Z" fill="rgba(255,255,255,0.8)" />
          <path d="M8 4 L16 0 L18 8 Z" fill="rgba(255,255,255,0.9)" />
          <path d="M8 14 L14 18 L16 12 Z" fill="rgba(255,255,255,0.7)" />
          <circle cx="14" cy="10" r="2" fill="#38BDF8" opacity="0.8" />
          <circle cx="20" cy="10" r="2" fill="#38BDF8" opacity="0.8" />
          <motion.circle cx="2" cy="10" r="3" fill="#FCD34D"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }} />
        </g>
      </motion.g>

      {/* Stars */}
      {[{x:50,y:50},{x:150,y:40},{x:90,y:70},{x:170,y:65}].map((s, i) => (
        <motion.circle key={i} cx={s.x} cy={s.y} r="1.5" fill="white"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
      ))}
    </svg>
  );
}

/* ── FishingSvg ── */
function FishingSvg() {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
      <motion.path d="M0 90 Q55 82 110 90 Q165 98 220 90 L220 140 L0 140 Z"
        fill="rgba(14,165,233,0.35)"
        animate={{ d: [
          "M0 90 Q55 82 110 90 Q165 98 220 90 L220 140 L0 140 Z",
          "M0 90 Q55 98 110 90 Q165 82 220 90 L220 140 L0 140 Z",
          "M0 90 Q55 82 110 90 Q165 98 220 90 L220 140 L0 140 Z",
        ]}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      <motion.path d="M0 100 Q55 92 110 100 Q165 108 220 100 L220 140 L0 140 Z"
        fill="rgba(14,165,233,0.25)"
        animate={{ d: [
          "M0 100 Q55 92 110 100 Q165 108 220 100 L220 140 L0 140 Z",
          "M0 100 Q55 108 110 100 Q165 92 220 100 L220 140 L0 140 Z",
          "M0 100 Q55 92 110 100 Q165 108 220 100 L220 140 L0 140 Z",
        ]}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />

      {/* Person body */}
      <rect x="70" y="60" width="12" height="22" rx="4" fill="rgba(255,255,255,0.8)" />
      <circle cx="76" cy="54" r="8" fill="rgba(255,255,255,0.9)" />
      <path d="M66 52 L86 52 L84 46 L68 46 Z" fill="rgba(255,200,0,0.8)" />

      {/* Rod arm — gentle sway */}
      <motion.g
        animate={{ rotate: [-5, 5, -5] }}
        style={{ transformOrigin: "70px 66px" }}
        transition={{ duration: 3, repeat: Infinity }}>
        <line x1="70" y1="66" x2="50" y2="50" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
        <line x1="50" y1="50" x2="90" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        <motion.line x1="90" y1="35" x2="115" y2="92"
          stroke="rgba(255,255,255,0.4)" strokeWidth="0.8"
          animate={{ x2: [115, 112, 115] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="115" cy="92" r="4" fill="#EF4444"
          animate={{ cy: [92, 95, 92], opacity: [1, 0.6, 1] }}
          transition={{ duration: 3, repeat: Infinity }} />
      </motion.g>

      {/* Fish underwater */}
      <motion.g
        animate={{ x: [0, 30, 0], y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <ellipse cx="140" cy="115" rx="12" ry="6" fill="rgba(255,165,0,0.6)" />
        <path d="M152 115 L160 110 L160 120 Z" fill="rgba(255,165,0,0.5)" />
        <circle cx="138" cy="113" r="1.5" fill="white" />
        <circle cx="137.5" cy="113" r="0.7" fill="#333" />
      </motion.g>

      {/* Ripples */}
      {[110, 145, 170].map((x, i) => (
        <motion.ellipse key={i} cx={x} cy={96} rx="8" ry="3"
          fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"
          animate={{ rx: [8, 18, 8], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.7 }} />
      ))}
    </svg>
  );
}

/* ── MountainSvg ── */
function MountainSvg() {
  return (
    <svg width="220" height="140" viewBox="0 0 220 140" fill="none">
      <motion.circle cx="180" cy="25" r="20" fill="rgba(255,200,50,0.5)"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }} />
      {Array(8).fill(0).map((_, i) => (
        <motion.line key={i}
          x1={180 + Math.cos(i * Math.PI / 4) * 22}
          y1={25 + Math.sin(i * Math.PI / 4) * 22}
          x2={180 + Math.cos(i * Math.PI / 4) * 30}
          y2={25 + Math.sin(i * Math.PI / 4) * 30}
          stroke="rgba(255,200,50,0.6)" strokeWidth="2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
      ))}

      <path d="M0 120 L40 50 L80 120 Z" fill="rgba(99,102,241,0.35)" />
      <path d="M60 120 L110 30 L160 120 Z" fill="rgba(107,127,212,0.4)" />
      <path d="M130 120 L170 60 L210 120 Z" fill="rgba(99,102,241,0.3)" />
      <path d="M110 30 L100 55 L120 55 Z" fill="rgba(255,255,255,0.85)" />
      <path d="M40 50 L33 65 L47 65 Z" fill="rgba(255,255,255,0.7)" />
      <path d="M170 60 L163 75 L177 75 Z" fill="rgba(255,255,255,0.7)" />

      {/* Hiker — simple translate */}
      <motion.g
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 20, 45, 70], y: [0, -8, -16, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
      >
        <circle cx="55" cy="95" r="6" fill="rgba(255,255,255,0.9)" />
        <rect x="52" y="101" width="6" height="12" rx="2" fill="rgba(255,255,255,0.8)" />
        <rect x="58" y="102" width="5" height="9" rx="1.5" fill="rgba(255,100,100,0.7)" />
        <motion.line x1="53" y1="113" x2="50" y2="123"
          stroke="rgba(255,255,255,0.7)" strokeWidth="2"
          animate={{ rotate: [-15, 15, -15] }}
          style={{ transformOrigin: "53px 113px" }}
          transition={{ duration: 0.5, repeat: Infinity }} />
        <motion.line x1="57" y1="113" x2="60" y2="123"
          stroke="rgba(255,255,255,0.7)" strokeWidth="2"
          animate={{ rotate: [15, -15, 15] }}
          style={{ transformOrigin: "57px 113px" }}
          transition={{ duration: 0.5, repeat: Infinity }} />
        <line x1="50" y1="105" x2="45" y2="123" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      </motion.g>

      {/* Flag */}
      <motion.g
        animate={{ rotate: [-8, 8, -8] }}
        style={{ transformOrigin: "110px 30px" }}
        transition={{ duration: 2, repeat: Infinity }}>
        <line x1="110" y1="30" x2="110" y2="18" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
        <path d="M110 18 L118 22 L110 26 Z" fill="rgba(255,50,50,0.8)" />
      </motion.g>
    </svg>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function SplashIntro({ onDone }) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  const SCENE_DURATION = 2000; // ms — har bir scene 2 soniya (oldin 900ms edi)

  useEffect(() => {
    if (exiting) return;
    const interval = 16;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / SCENE_DURATION) * 100);

      if (elapsed >= SCENE_DURATION) {
        elapsed = 0;
        setProgress(0);
        setSceneIdx(prev => {
          const next = prev + 1;
          if (next >= SCENES.length) {
            clearInterval(timer);
            setExiting(true);
            setTimeout(() => onDoneRef.current(), 700);
            return prev;
          }
          return next;
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [exiting]);

  const scene = SCENES[sceneIdx];
  const Anim = scene.Animation;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background */}
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${scene.bg})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }}
            />
          </AnimatePresence>

          {/* Overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg,rgba(4,8,20,0.82),rgba(4,8,20,0.65) 40%,rgba(4,8,20,0.88))"
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{
                width: 72, height: 72, borderRadius: 22,
                margin: "0 auto 28px",
                background: "linear-gradient(145deg,#38BDF8,#6366F1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 800, color: "#fff",
                boxShadow: `0 12px 40px ${scene.color}60`,
              }}
            >U</motion.div>

            {/* SVG Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: 28 }}
              >
                <Anim />
              </motion.div>
            </AnimatePresence>

            {/* Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${sceneIdx}`}
                initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
              >
                <div style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(1.6rem,4vw,2.4rem)",
                  fontWeight: 700, color: "#fff", marginBottom: 10,
                  textShadow: `0 0 30px ${scene.color}88`,
                }}>UzTravel</div>
                <div style={{
                  fontFamily: "'DM Sans',sans-serif", fontSize: 14,
                  color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em",
                }}>{scene.label}</div>
              </motion.div>
            </AnimatePresence>

            {/* Skip button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => {
                setExiting(true);
                setTimeout(() => onDoneRef.current(), 700);
              }}
              style={{
                marginTop: 24,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "rgba(255,255,255,0.6)",
                padding: "6px 18px", borderRadius: 999,
                fontSize: 12, cursor: "pointer",
                fontFamily: "'DM Sans',sans-serif",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s",
              }}
            >
              O'tkazib yuborish →
            </motion.button>

            {/* Progress dots */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              justifyContent: "center", marginTop: 20,
            }}>
              {SCENES.map((_, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{
                    width: i === sceneIdx ? 28 : 7,
                    height: 7, borderRadius: 99,
                    background: "rgba(255,255,255,0.2)",
                    transition: "width 0.3s",
                  }} />
                  {i === sceneIdx && (
                    <motion.div style={{
                      position: "absolute", top: 0, left: 0,
                      height: 7, borderRadius: 99,
                      background: scene.color,
                      width: `${Math.min(progress, 100)}%`,
                      maxWidth: 28,
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}