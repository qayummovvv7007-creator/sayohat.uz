"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Compass, ArrowRight, Mountain, Tent,
  Waves, Sun, Landmark, Fish, Users,
} from "lucide-react";

/* ─────────────────────────────────────────────────────── */
/*  SCENE DATA                                             */
/* ─────────────────────────────────────────────────────── */
const SCENES = [
  {
    id: "mountains",
    label: "Tog' bag'ri",
    location: "Chimgan · Beldersay",
    subtitle: "Alpine trekking & cable rides",
    description: "Conquer the peaks of Chimgan — where snow-capped ridges meet ancient forests and cloud-piercing summits.",
    image: "https://static.tildacdn.com/tild6438-3038-4530-b430-643633343265/R9D-EaYNsdg.jpg",
    glow: "14,165,233",
    accent: "#38BDF8",
    Icon: Mountain,
    duration: "3–7 days",
    elevation: "3,309m",
  },
  {
    id: "picnic",
    label: "Piknik",
    location: "Humsan · Parkent",
    subtitle: "Riverside escapes & green hills",
    description: "Drift through emerald valleys and crystal streams — the perfect retreat from the city's pulse.",
    image: "https://www.discover.com/online-banking/banking-topics/wp-content/uploads/2019/05/6-Ideas-for-Budget-Friendly-Summer-Fun_Edited_0-MARQUEE.jpg",
    glow: "34,197,94",
    accent: "#4ADE80",
    Icon: Tent,
    duration: "1–3 days",
    elevation: "Lowlands",
  },
  {
    id: "lakes",
    label: "Ko'llar",
    location: "Chorvoq · Aydar",
    subtitle: "Crystal water & sandy shores",
    description: "Turquoise reservoirs and mirrored still waters — where the sky sinks into the depths below.",
    image: "https://avatars.mds.yandex.net/get-altay/16920891/2a000001985c9b92d997215a76dd358a0b2b/orig",
    glow: "56,189,248",
    accent: "#7DD3FC",
    Icon: Waves,
    duration: "2–5 days",
    elevation: "Lakeside",
  },
  {
    id: "desert",
    label: "Cho'l",
    location: "Qizilqum · Orol",
    subtitle: "Dunes, yurts & starry nights",
    description: "Lose yourself in infinite golden dunes, sleep under a billion stars, wake to silence.",
    image: "https://eurasia.travel/wp-content/uploads/2024/12/6.-Yurt-camp-KyzylKum-Desert.jpg",
    glow: "217,119,6",
    accent: "#FCD34D",
    Icon: Sun,
    duration: "4–6 days",
    elevation: "Sea level",
  },
  {
    id: "history",
    label: "Tarix",
    location: "Samarqand · Buxoro",
    subtitle: "Ancient Silk Road wonders",
    description: "Walk the corridors of Timur's empire — mosaic domes that pierced the medieval sky.",
    image: "https://image.winudf.com/v2/image1/Y29tLnBvbGluZXNvZnQudXpiZWtpc3RhbndhbGxwYXBlci5pbWFnZXMubG9ja3NjcmVlbi5pbmRlcGVuZGVuY2VkYXkuZmxhZ19zY3JlZW5fNV8xNjU5MzA3MTU0XzA2OQ/screen-5.jpg?fakeurl=1&type=.jpg",
    glow: "251,191,36",
    accent: "#FDE68A",
    Icon: Landmark,
    duration: "3–5 days",
    elevation: "Cultural",
  },
  {
    id: "fishing",
    label: "Baliq",
    location: "Sirdaryo · Chorvoq",
    subtitle: "Peaceful rivers & fresh catch",
    description: "Riverside mornings, rod in hand, mist on the water — time moves differently here.",
    image: "https://thelodgeatriverside.com/wp-content/uploads/2024/02/AdobeStock_617380033.webp",
    glow: "20,184,166",
    accent: "#2DD4BF",
    Icon: Fish,
    duration: "2–4 days",
    elevation: "Riverside",
  },
];

const NAV_ITEMS = ["Home", "Packages", "Destinations", "Gallery", "About"];
const AUTOPLAY_MS = 5000;
const AVATARS = [
  { initials: "AK", color: "#0ea5e9" },
  { initials: "ZR", color: "#8b5cf6" },
  { initials: "MS", color: "#ec4899" },
  { initials: "BT", color: "#f59e0b" },
];

/* ─────────────────────────────────────────────────────── */
/*  MAIN COMPONENT                                         */
/* ─────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef(null);
  const autoTimerRef = useRef(null);

  const scene = SCENES[activeIdx];
  const prevScene = prevIdx !== null ? SCENES[prevIdx] : null;

  /* Boot */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Parallax mouse */
  useEffect(() => {
    const onMove = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Auto-play */
  const startAutoPlay = useCallback(() => {
    clearInterval(autoTimerRef.current);
    if (paused) return;
    autoTimerRef.current = setInterval(() => {
      setActiveIdx((prev) => {
        setPrevIdx(prev);
        return (prev + 1) % SCENES.length;
      });
    }, AUTOPLAY_MS);
  }, [paused]);

  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(autoTimerRef.current);
  }, [startAutoPlay, activeIdx]);

  const handleSelect = (idx) => {
    if (idx === activeIdx) return;
    setPrevIdx(activeIdx);
    setActiveIdx(idx);
    setPaused(true);
    clearInterval(autoTimerRef.current);
    setTimeout(() => setPaused(false), 9000);
  };

  const px = (mouse.x - 0.5) * -26;
  const py = (mouse.y - 0.5) * -15;

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 760,
        overflow: "hidden",
        background: "#04080f",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ── GLOBAL STYLES ───────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,700;1,600&display=swap');

        .hs-nav-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: rgba(255,255,255,0.68);
          font-size: 12.5px;
          font-weight: 400;
          letter-spacing: 0.03em;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hs-nav-btn:hover { color: #fff; }

        .hs-solid-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 22px;
          border-radius: 13px;
          background: #fff;
          color: #08111f;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.025em;
          text-decoration: none;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.95);
          transition: background 0.2s;
        }
        .hs-solid-btn:hover { background: #eef4ff; }

        .hs-ghost-btn {
          font-family: 'Plus Jakarta Sans', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 20px;
          border-radius: 13px;
          background: rgba(255,255,255,0.09);
          color: rgba(255,255,255,0.88);
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.025em;
          text-decoration: none;
          border: 0.5px solid rgba(255,255,255,0.26);
          cursor: pointer;
          white-space: nowrap;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.25);
          transition: all 0.25s;
        }
        .hs-ghost-btn:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.42);
        }
      `}</style>

      {/* ── CINEMATIC BACKGROUND STACK ──────────── */}
      {/* Prev scene fading out */}
      <AnimatePresence>
        {prevScene && (
          <motion.div
            key={`prev-${prevIdx}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute", inset: 0, zIndex: 1,
              backgroundImage: `url(${prevScene.image})`,
              backgroundSize: "cover", backgroundPosition: "center",
            }}
          />
        )}
      </AnimatePresence>

      {/* Current — slow zoom + parallax */}
      <motion.div
        key={`bg-${activeIdx}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: 1,
          scale: 1.13,
          x: px,
          y: py,
        }}
        transition={{
          opacity: { duration: 1.0, ease: "easeOut" },
          scale: { duration: 9, ease: "linear" },
          x: { duration: 0.7, ease: "easeOut" },
          y: { duration: 0.7, ease: "easeOut" },
        }}
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          backgroundImage: `url(${scene.image})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }}
      />

      {/* ── OVERLAYS ─────────────────────────────── */}
      {/* Main gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(160deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.48) 68%, rgba(0,0,0,0.94) 100%)",
      }} />

      {/* Dynamic scene glow */}
      <motion.div
        key={`glow-${activeIdx}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.0, ease: "easeOut" }}
        style={{
          position: "absolute", zIndex: 3, pointerEvents: "none",
          width: 1000, height: 1000, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${scene.glow},0.32) 0%, transparent 68%)`,
          left: "50%", top: "56%",
          transform: "translate(-50%,-50%)",
          filter: "blur(70px)",
        }}
      />

      {/* Film grain noise */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4,
        opacity: 0.032, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }} />

      {/* ── NAVBAR ───────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -18 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "absolute", top: 28, left: "50%", zIndex: 30,
          transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: 0,
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(30px) saturate(2)",
          WebkitBackdropFilter: "blur(30px) saturate(2)",
          border: "0.5px solid rgba(255,255,255,0.2)",
          borderRadius: 999,
          padding: "7px 7px 7px 22px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.36), inset 0 -0.5px 0 rgba(255,255,255,0.06)",
          maxWidth: "calc(100vw - 48px)",
          minWidth: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 30, flexShrink: 0 }}>
          <motion.div
            animate={{ color: scene.accent }}
            transition={{ duration: 1 }}
          >
            <Compass size={15} strokeWidth={1.8} color={scene.accent} />
          </motion.div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: "0.02em",
          }}>Sayohat</span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginRight: 20 }}>
          {NAV_ITEMS.map((item) => (
            <button key={item} className="hs-nav-btn">{item}</button>
          ))}
        </div>

        {/* Book CTA */}
        <motion.button
          className="hs-solid-btn"
          style={{ borderRadius: 999, paddingLeft: 18, paddingRight: 14 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          Book Now <ArrowRight size={13} strokeWidth={2.5} />
        </motion.button>
      </motion.nav>

      {/* ── HERO TEXT BLOCK ──────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        paddingTop: 70,
        paddingBottom: 230,
      }}>
        {/* Location badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${activeIdx}`}
            initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              marginBottom: 24,
              padding: "6px 14px 6px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.09)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `0.5px solid rgba(${scene.glow},0.55)`,
              boxShadow: `0 0 20px rgba(${scene.glow},0.18), inset 0 1px 0 rgba(255,255,255,0.32)`,
              color: "rgba(255,255,255,0.88)",
              fontSize: 11.5, fontWeight: 500, letterSpacing: "0.055em",
            }}
          >
            <MapPin size={12} color={scene.accent} strokeWidth={2.5} />
            {scene.location} · O'zbekiston
          </motion.div>
        </AnimatePresence>

        {/* H1 */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${activeIdx}`}
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.68, ease: [0.23, 1, 0.32, 1], delay: 0.05 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 6.4rem)",
              fontWeight: 700,
              lineHeight: 1.065,
              color: "#fff",
              textShadow: "0 4px 52px rgba(0,0,0,0.5)",
              marginBottom: 18,
              maxWidth: 830,
              letterSpacing: "-0.01em",
            }}
          >
            Tabiatning{" "}
            <em style={{
              fontStyle: "italic",
              background: `linear-gradient(110deg, rgba(255,255,255,0.9) 0%, ${scene.accent} 50%, rgba(255,255,255,0.75) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `drop-shadow(0 0 28px rgba(${scene.glow},0.45))`,
            }}>
              Sirli Dunyosi
            </em>
          </motion.h1>
        </AnimatePresence>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${activeIdx}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            style={{
              fontSize: 15.5, lineHeight: 1.85,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 450,
              marginBottom: 42,
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {scene.description}
          </motion.p>
        </AnimatePresence>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
        >
          <Link href="/auth">
            <motion.span
              className="hs-solid-btn"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              ✦ Sayohatni Boshlash
              <ArrowRight size={14} strokeWidth={2.5} />
            </motion.span>
          </Link>
          <Link href="/map">
            <motion.span
              className="hs-ghost-btn"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <MapPin size={13} strokeWidth={2} />
              Xaritada Ko'rish
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* ── EXPANDING CARD SLIDER ────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 28 }}
        transition={{ duration: 0.85, delay: 0.72, ease: [0.23, 1, 0.32, 1] }}
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          left: 316,
          zIndex: 20,
          display: "flex",
          gap: 8,
          height: 172,
        }}
      >
        {SCENES.map((s, idx) => (
          <ExpandCard
            key={s.id}
            scene={s}
            isActive={idx === activeIdx}
            onClick={() => handleSelect(idx)}
          />
        ))}
      </motion.div>

      {/* ── GLASS INFO CARD ──────────────────────── */}
      <GlassInfoCard scene={scene} loaded={loaded} activeIdx={activeIdx} />

      {/* ── AUTO-PLAY PROGRESS LINE ──────────────── */}
      {!paused && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 2, background: "rgba(255,255,255,0.06)", zIndex: 25,
        }}>
          <motion.div
            key={`progress-${activeIdx}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            style={{
              height: "100%",
              background: scene.accent,
              boxShadow: `0 0 8px ${scene.accent}`,
            }}
          />
        </div>
      )}

      {/* ── SCROLL HINT ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 0.38 : 0 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        style={{
          position: "absolute", bottom: 32, left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 6, pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ scaleY: [0.55, 1, 0.55], opacity: [0.25, 0.85, 0.25] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 38, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.75))" }}
        />
        <span style={{ fontSize: 8.5, letterSpacing: "0.42em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  EXPANDING CARD                                         */
/* ─────────────────────────────────────────────────────── */
function ExpandCard({ scene, isActive, onClick }) {
  const [hov, setHov] = useState(false);
  const { Icon } = scene;

  return (
    <motion.div
      layout
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      animate={{
        flex: isActive ? "0 0 232px" : hov ? "0 0 70px" : "0 0 52px",
        borderColor: isActive
          ? `rgba(${scene.glow},0.65)`
          : hov
          ? "rgba(255,255,255,0.3)"
          : "rgba(255,255,255,0.16)",
      }}
      transition={{ duration: 0.62, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: "relative",
        borderRadius: 22,
        overflow: "hidden",
        cursor: "pointer",
        border: "0.5px solid rgba(255,255,255,0.16)",
        boxShadow: isActive
          ? `0 12px 48px rgba(${scene.glow},0.28), inset 0 1px 0 rgba(255,255,255,0.28)`
          : "0 6px 24px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.1)",
        height: "100%",
        minWidth: 0,
      }}
    >
      {/* Image with gentle scale on active */}
      <motion.img
        src={scene.image}
        alt={scene.label}
        animate={{ scale: isActive ? 1.1 : 1.0 }}
        transition={{ duration: 8, ease: "linear" }}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
        }}
      />

      {/* Dark gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: isActive
          ? "linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.06) 52%, transparent 100%)"
          : "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.28) 100%)",
        transition: "background 0.5s",
      }} />

      {/* Specular top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "36%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
        pointerEvents: "none", borderRadius: "22px 22px 0 0",
      }} />

      {/* Active: detailed content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, delay: 0.18 }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 15px 16px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 8,
                background: `rgba(${scene.glow},0.25)`,
                backdropFilter: "blur(8px)",
                border: `0.5px solid rgba(${scene.glow},0.5)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={13} color={scene.accent} strokeWidth={2} />
              </div>
              <span style={{
                fontSize: 13, fontWeight: 700, color: "#fff",
                letterSpacing: "0.01em",
                textShadow: "0 1px 6px rgba(0,0,0,0.6)",
                whiteSpace: "nowrap",
              }}>
                {scene.label}
              </span>
            </div>
            <p style={{
              fontSize: 10.5, color: "rgba(255,255,255,0.6)",
              lineHeight: 1.5, margin: "0 0 9px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}>
              {scene.subtitle}
            </p>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.07em",
                color: scene.accent, textTransform: "uppercase",
              }}>
                {scene.duration}
              </span>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 9 }}>·</span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.42)", letterSpacing: "0.04em" }}>
                {scene.elevation}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inactive: rotated label */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div style={{
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <Icon size={11} color="rgba(255,255,255,0.7)" strokeWidth={1.6} />
              <span style={{
                fontSize: 10, fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {scene.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active dot */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              position: "absolute", top: 13, right: 13,
              width: 7, height: 7, borderRadius: "50%",
              background: scene.accent,
              boxShadow: `0 0 10px ${scene.accent}, 0 0 20px rgba(${scene.glow},0.6)`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  GLASS INFO CARD (Bottom Left)                          */
/* ─────────────────────────────────────────────────────── */
function GlassInfoCard({ scene, loaded, activeIdx }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -22 }}
      animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -22 }}
      transition={{ duration: 0.85, delay: 0.88, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: "absolute",
        bottom: 52,
        left: 38,
        zIndex: 20,
        width: 256,
      }}
    >
      <div style={{
        padding: "18px 20px 20px",
        borderRadius: 22,
        background: "rgba(6,12,24,0.58)",
        backdropFilter: "blur(30px) saturate(2.2)",
        WebkitBackdropFilter: "blur(30px) saturate(2.2)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: `0 24px 72px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -0.5px 0 rgba(255,255,255,0.04), 0 0 0 0.5px rgba(255,255,255,0.05)`,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Scene-tinted inner glow */}
        <motion.div
          key={`card-glow-${activeIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(ellipse at 20% 0%, rgba(${scene.glow},0.14) 0%, transparent 60%)`,
          }}
        />
        {/* Glass specular */}
        <div style={{
          position: "absolute", top: 0, left: 10, right: 10, height: "44%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.09), transparent)",
          borderRadius: "22px 22px 0 0", pointerEvents: "none",
        }} />

        {/* Avatars + label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, position: "relative" }}>
          <div style={{ display: "flex" }}>
            {AVATARS.map((a, i) => (
              <motion.div
                key={`${a.initials}-${activeIdx}`}
                initial={{ opacity: 0, scale: 0.5, x: -8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.06, duration: 0.4, type: "spring", stiffness: 320 }}
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: a.color,
                  border: "2px solid rgba(6,12,24,0.75)",
                  outline: "0.5px solid rgba(255,255,255,0.22)",
                  marginLeft: i === 0 ? 0 : -9,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#fff",
                  letterSpacing: "0.04em",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  flexShrink: 0,
                  zIndex: 4 - i,
                  position: "relative",
                }}
              >{a.initials}</motion.div>
            ))}
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(6,12,24,0.75)",
              outline: "0.5px solid rgba(255,255,255,0.18)",
              marginLeft: -9,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8.5, fontWeight: 600, color: "rgba(255,255,255,0.82)",
              flexShrink: 0, position: "relative", zIndex: 0,
            }}>+46</div>
          </div>
          <div>
            <p style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.3 }}>
              50+ Joined
            </p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", margin: 0 }}>
              this month
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.1)", marginBottom: 13 }} />

        {/* Dynamic scene info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-info-${activeIdx}`}
            initial={{ opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.42 }}
            style={{ marginBottom: 16, position: "relative" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
              <scene.Icon size={12} color={scene.accent} strokeWidth={2} />
              <span style={{
                fontSize: 10.5, fontWeight: 700, color: scene.accent,
                letterSpacing: "0.045em", textTransform: "uppercase",
              }}>
                {scene.location}
              </span>
            </div>
            <p style={{
              fontSize: 11.5, lineHeight: 1.72,
              color: "rgba(255,255,255,0.56)",
              margin: 0,
            }}>
              {scene.subtitle}. Guided tours available year-round.
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.button
          className="hs-solid-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{ width: "100%", justifyContent: "center", borderRadius: 13 }}
        >
          <Users size={13} strokeWidth={2} />
          Book a Tour
          <ArrowRight size={13} strokeWidth={2.5} />
        </motion.button>
      </div>
    </motion.div>
  );
}