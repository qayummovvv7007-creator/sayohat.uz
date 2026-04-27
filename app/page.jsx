"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES } from "../lib/places";

const HERO_BG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=85";

const STATS = [
  { num: "13+", label: "Diqqatga sazovor joy" },
  { num: "6", label: "Kategoriya" },
  { num: "10K+", label: "Sayohatchilar" },
  { num: "5 ★", label: "O'rtacha baho" },
];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
    const move = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div style={{ background: "#fff" }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", minHeight: 640 }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translate(${(mousePos.x - 0.5) * -18}px, ${(mousePos.y - 0.5) * -12}px) scale(1.06)`,
          }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(0,0,0,0.28) 0%,rgba(0,0,0,0.18) 40%,rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Glass overlay panel — top area */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom,rgba(255,255,255,0.08),transparent)",
            backdropFilter: "blur(2px)",
          }}
        />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Glass pill badge */}
          <div
            className={`glass mb-8 px-5 py-2 rounded-full text-white text-sm font-body font-medium transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "0.1s" }}
          >
            🇺🇿 O'zbekiston Sayohat Gidi
          </div>

          <h1
            className={`font-display text-white font-bold leading-tight mb-6 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              textShadow: "0 4px 24px rgba(0,0,0,0.4)",
              transitionDelay: "0.2s",
            }}
          >
            Tabiatning
            <br />
            <em
              style={{
                fontStyle: "italic",
                background: "linear-gradient(90deg,#7DD3FC,#C4B5FD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sirli Dunyosi
            </em>
          </h1>

          <p
            className={`text-white font-body text-lg mb-10 max-w-xl leading-relaxed transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              color: "rgba(255,255,255,0.78)",
              transitionDelay: "0.35s",
              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          >
            Chimgan tog'laridan Aydar Ko'ligacha — O'zbekistonning go'zal
            tabiatini kashf eting
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "0.5s" }}
          >
            <Link
              href="/auth"
              className="group relative px-8 py-4 rounded-2xl font-body font-semibold text-white text-sm overflow-hidden transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
                boxShadow: "0 8px 32px rgba(14,165,233,0.45)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Sayohatni Boshlash
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg,#38BDF8,#818CF8)" }} />
            </Link>

            <Link
              href="/explore"
              className="glass px-8 py-4 rounded-2xl font-body font-semibold text-white text-sm flex items-center gap-2 hover:bg-white/25 transition-all duration-300"
            >
              <span>🗺️</span> Xaritada Ko'rish
            </Link>
          </div>
        </div>

        {/* Stats — bottom glass bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "0.7s" }}
        >
          <div
            className="mx-6 mb-6 rounded-2xl px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{
              background: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(28px) saturate(2)",
              WebkitBackdropFilter: "blur(28px) saturate(2)",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-display text-2xl font-bold text-white"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
                >
                  {s.num}
                </div>
                <div
                  className="text-xs font-body mt-1"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-28 right-8 flex flex-col items-center gap-2">
          <div className="w-px h-12 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.2)" }}>
            <div className="w-full h-1/2 bg-white/70"
              style={{ animation: "float 1.8s ease-in-out infinite" }} />
          </div>
          <span className="text-xs font-body" style={{ color: "rgba(255,255,255,0.4)", writingMode: "vertical-rl" }}>
            Pastga suring
          </span>
        </div>
      </section>

      {/* ─── CATEGORY CARDS SECTION ─── */}
      <section className="relative py-24 px-6" style={{ background: "#fff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-semibold mb-4 uppercase tracking-widest"
              style={{
                background: "rgba(14,165,233,0.1)",
                color: "#0EA5E9",
                border: "1px solid rgba(14,165,233,0.2)",
              }}
            >
              Kategoriyalar
            </div>
            <h2
              className="font-display text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#0F172A" }}
            >
              Qayerga borishni
              <br />
              <em style={{ color: "#0EA5E9", fontStyle: "italic" }}>
                tanlaysiz?
              </em>
            </h2>
            <p
              className="mt-4 font-body text-base max-w-lg mx-auto"
              style={{ color: "#64748B" }}
            >
              Tog'lar, ko'llar, piknik joylari va yana ko'p narsa — hammasi bir
              joyda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/map?category=${cat.id}`}
                className="group block relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  height: 260,
                }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background: `linear-gradient(160deg,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.7) 100%)`,
                  }}
                />
                {/* Glass content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div
                    className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-white text-xs font-body self-start transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.35)",
                    }}
                  >
                    <span className="text-base">{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </div>
                  <p
                    className="text-xs font-body"
                    style={{ color: "rgba(255,255,255,0.62)" }}
                  >
                    {cat.desc}
                  </p>

                  {/* Arrow */}
                  <div
                    className="mt-3 flex items-center gap-2 text-xs font-body font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  >
                    Ko'rish
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section
        className="py-24 px-6"
        style={{
          background: "linear-gradient(135deg,#F0F9FF 0%,#EEF2FF 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📍", title: "Aniq Joylashuv", desc: "Xaritada real koordinatalar bilan har bir joy ko'rsatiladi." },
              { icon: "🌟", title: "Tasdiqlangan Joylar", desc: "Faqat tekshirilgan va reytingi yuqori joylar tavsiya etiladi." },
              { icon: "🧭", title: "Shaxsiy Tavsiya", desc: "Siz tanlagan kategoriyaga qarab eng mos joylar ko'rsatiladi." },
            ].map((f) => (
              <div
                key={f.title}
                className="glass-card p-8 rounded-3xl text-center"
              >
                <div className="text-5xl mb-5">{f.icon}</div>
                <h3
                  className="font-display text-xl font-bold mb-3"
                  style={{ color: "#0F172A" }}
                >
                  {f.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="relative rounded-3xl overflow-hidden p-14"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg,rgba(14,165,233,0.85),rgba(107,127,212,0.85))",
              }}
            />
            <div className="relative z-10">
              <h2 className="font-display text-4xl font-bold text-white mb-4">
                Sayohatingizni bugun boshlang
              </h2>
              <p
                className="font-body text-base mb-8 max-w-lg mx-auto"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Ro'yxatdan o'ting va O'zbekistonning eng go'zal joylarini
                xaritada ko'ring
              </p>
              <Link
                href="/auth"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-body font-bold text-sky-600 bg-white hover:bg-sky-50 transition-all duration-300 shadow-2xl"
              >
                Bepul Ro'yxatdan O'tish
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}