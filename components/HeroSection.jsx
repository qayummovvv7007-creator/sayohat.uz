"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SCENES = {
  mountains: {
    label: "Tog' bag'ri",
    emoji: "⛰️",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=90",
    accent: "from-[#1a3a5c] to-[#0e2233]",
    glow: "rgba(14,165,233,0.55)",
    tag: "Chimgan · Beldersay",
  },
  picnic: {
    label: "Piknik",
    emoji: "🧺",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1800&q=90",
    accent: "from-[#14381f] to-[#0a1f10]",
    glow: "rgba(34,197,94,0.45)",
    tag: "Humsan · Parkent",
  },
  lakes: {
    label: "Ko'llar",
    emoji: "🏞️",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=90",
    accent: "from-[#0c2a4a] to-[#061525]",
    glow: "rgba(56,189,248,0.5)",
    tag: "Chorvoq · Aydar",
  },
  desert: {
    label: "Cho'l",
    emoji: "🏜️",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1800&q=90",
    accent: "from-[#3d2200] to-[#1a0e00]",
    glow: "rgba(217,119,6,0.5)",
    tag: "Qizilqum · Orol",
  },
  history: {
    label: "Tarix",
    emoji: "🕌",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90",
    accent: "from-[#2d1a0e] to-[#160d07]",
    glow: "rgba(251,191,36,0.45)",
    tag: "Samarqand · Buxoro",
  },
  fishing: {
    label: "Baliq",
    emoji: "🎣",
    image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=1800&q=90",
    accent: "from-[#0a2520] to-[#051210]",
    glow: "rgba(20,184,166,0.45)",
    tag: "Sirdaryo · Chorvoq",
  },
};

const CATEGORY_KEYS = Object.keys(SCENES);

export default function HeroSection() {
  const [active, setActive] = useState("mountains");
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!heroRef.current) return;
      const r = heroRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const switchScene = (key) => {
    if (key === active || transitioning) return;
    clearTimeout(timeoutRef.current);
    setPrev(active);
    setTransitioning(true);
    setActive(key);
    timeoutRef.current = setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 900);
  };

  const scene = SCENES[active];
  const prevScene = prev ? SCENES[prev] : null;

  const px = (mouse.x - 0.5) * -22;
  const py = (mouse.y - 0.5) * -14;

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 640,
        overflow: "hidden",
        background: "#060b14",
      }}
    >
      {/* ── BACKGROUNDS ─────────────────────────── */}
      {/* Previous (fading out) */}
      {prevScene && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            backgroundImage: `url(${prevScene.image})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.9s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      )}
      {/* Current */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          backgroundImage: `url(${scene.image})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: `translate(${px}px, ${py}px) scale(1.07)`,
          transition: `transform 0.7s ease-out, opacity 0.9s cubic-bezier(0.4,0,0.2,1)`,
          opacity: transitioning ? 1 : 1,
        }}
      />

      {/* ── OVERLAYS ─────────────────────────────── */}
      {/* Main gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.82) 100%)",
      }} />
      {/* Dynamic glow orb */}
      <div style={{
        position: "absolute", zIndex: 3,
        width: 600, height: 600, borderRadius: "50%",
        background: `radial-gradient(circle, ${scene.glow}, transparent 70%)`,
        left: "50%", top: "55%",
        transform: "translate(-50%, -50%)",
        transition: "background 1.2s ease",
        pointerEvents: "none",
        filter: "blur(40px)",
      }} />
      {/* Top glass fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 180, zIndex: 4,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
        backdropFilter: "blur(0.5px)",
        pointerEvents: "none",
      }} />

      {/* ── CONTENT ─────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 24px",
      }}>
        {/* Location tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: 28,
          padding: "7px 18px", borderRadius: 999,
          background: "rgba(255,255,255,0.13)",
          backdropFilter: "blur(20px) saturate(1.8)",
          WebkitBackdropFilter: "blur(20px) saturate(1.8)",
          border: "0.5px solid rgba(255,255,255,0.38)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.45)",
          color: "rgba(255,255,255,0.9)",
          fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
          letterSpacing: "0.04em",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.7s 0.1s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.1s",
        }}>
          <span style={{ fontSize: 14 }}>{scene.emoji}</span>
          {scene.tag} · O'zbekiston
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(3rem, 9vw, 7rem)",
          fontWeight: 700, lineHeight: 1.05,
          color: "#fff",
          textShadow: "0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08)",
          marginBottom: 20, maxWidth: 900,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.8s 0.22s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.22s",
        }}>
          Tabiatning
          <br />
          <em style={{
            fontStyle: "italic",
            backgroundImage: `linear-gradient(90deg, #7DD3FC 0%, #C4B5FD 50%, #FDE68A 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 28px rgba(125,211,252,0.35))",
          }}>
            Sirli Dunyosi
          </em>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.75,
          color: "rgba(255,255,255,0.7)",
          maxWidth: 460, marginBottom: 44,
          textShadow: "0 2px 8px rgba(0,0,0,0.35)",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s 0.35s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.35s",
        }}>
          Tog'lardan cho'llargacha — O'zbekistonning noyob go'zalliklarini kashf eting
        </p>

        {/* CTA buttons */}
        <div style={{
          display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
          marginBottom: 72,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s 0.48s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.48s",
        }}>
          <GlassButton href="/auth" primary glow={scene.glow}>
            ✦ Sayohatni Boshlash
          </GlassButton>
          <GlassButton href="/map">
            🗺️ Xaritada Ko'rish
          </GlassButton>
        </div>

        {/* ── LIQUID GLASS CATEGORY BUBBLES ─────── */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s 0.6s",
        }}>
          {CATEGORY_KEYS.map((key, i) => (
            <CategoryBubble
              key={key}
              scene={SCENES[key]}
              isActive={active === key}
              onClick={() => switchScene(key)}
              delay={i * 55}
              loaded={loaded}
            />
          ))}
        </div>
      </div>

      {/* ── SCROLL HINT ─────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 0.45 : 0, transition: "opacity 1s 1.2s",
      }}>
        <div style={{
          width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.7))",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
        <style>{`@keyframes scrollPulse{0%,100%{opacity:0.3;transform:scaleY(0.8)}50%{opacity:1;transform:scaleY(1)}}`}</style>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.6)", textTransform: "uppercase",
        }}>Scroll</span>
      </div>
    </section>
  );
}

/* ── LIQUID GLASS CATEGORY BUBBLE ──────────────── */
function CategoryBubble({ scene, isActive, onClick, delay, loaded }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", cursor: "pointer", border: "none",
        padding: "10px 20px 10px 14px",
        borderRadius: 999,
        background: isActive
          ? "rgba(255,255,255,0.28)"
          : hov
          ? "rgba(255,255,255,0.2)"
          : "rgba(255,255,255,0.1)",
        backdropFilter: "blur(24px) saturate(2)",
        WebkitBackdropFilter: "blur(24px) saturate(2)",
        border: isActive
          ? "0.5px solid rgba(255,255,255,0.65)"
          : "0.5px solid rgba(255,255,255,0.3)",
        boxShadow: isActive
          ? "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.08)"
          : hov
          ? "0 6px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)"
          : "0 2px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.25)",
        transform: hov ? "translateY(-4px) scale(1.06)" : isActive ? "translateY(-2px) scale(1.03)" : "scale(1)",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex", alignItems: "center", gap: 8,
        opacity: loaded ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Emoji */}
      <span style={{ fontSize: 18, lineHeight: 1, filter: isActive ? "drop-shadow(0 0 6px rgba(255,255,255,0.5))" : "none", transition: "filter 0.3s" }}>
        {scene.emoji}
      </span>
      {/* Label */}
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: isActive ? 600 : 400,
        color: isActive ? "#fff" : "rgba(255,255,255,0.82)",
        letterSpacing: "0.01em",
        transition: "all 0.3s",
      }}>
        {scene.label}
      </span>
      {/* Active dot */}
      {isActive && (
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          flexShrink: 0,
        }} />
      )}
      {/* Inner specular highlight */}
      <div style={{
        position: "absolute", top: 2, left: 12, right: 12, height: "40%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
        borderRadius: 999, pointerEvents: "none",
      }} />
    </button>
  );
}

/* ── GLASS BUTTON ─────────────────────────────── */
function GlassButton({ href, children, primary, glow }) {
  const [hov, setHov] = useState(false);

  const baseStyle = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "13px 28px", borderRadius: 16, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
    textDecoration: "none", transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    position: "relative", overflow: "hidden",
  };

  const primaryStyle = {
    background: hov
      ? "linear-gradient(135deg, #38BDF8, #818CF8, #A78BFA)"
      : "linear-gradient(135deg, #0EA5E9, #6B7FD4)",
    color: "#fff",
    boxShadow: hov
      ? `0 14px 40px ${glow || "rgba(14,165,233,0.55)"}, 0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)`
      : `0 8px 28px ${glow || "rgba(14,165,233,0.4)"}, inset 0 1px 0 rgba(255,255,255,0.25)`,
    transform: hov ? "translateY(-3px) scale(1.03)" : "scale(1)",
    border: "0.5px solid rgba(255,255,255,0.3)",
  };

  const secondaryStyle = {
    background: hov ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)",
    color: "#fff",
    boxShadow: hov
      ? "0 10px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)"
      : "0 4px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.35)",
    backdropFilter: "blur(20px) saturate(1.8)",
    WebkitBackdropFilter: "blur(20px) saturate(1.8)",
    border: hov ? "0.5px solid rgba(255,255,255,0.55)" : "0.5px solid rgba(255,255,255,0.38)",
    transform: hov ? "translateY(-3px)" : "none",
  };

  return (
    <Link
      href={href}
      style={{ ...baseStyle, ...(primary ? primaryStyle : secondaryStyle) }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Specular top shine */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "50%",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.18), transparent)",
        pointerEvents: "none", borderRadius: "16px 16px 0 0",
      }} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </Link>
  );
}