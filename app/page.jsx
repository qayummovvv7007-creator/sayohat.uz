"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const FEATURES = [
  { icon: "📍", title: "Aniq Joylashuv", desc: "Xaritada real koordinatalar bilan har bir joy ko'rsatiladi." },
  { icon: "🌟", title: "Tasdiqlangan Joylar", desc: "Faqat tekshirilgan va reytingi yuqori joylar tavsiya etiladi." },
  { icon: "🧭", title: "Shaxsiy Tavsiya", desc: "Siz tanlagan kategoriyaga qarab eng mos joylar ko'rsatiladi." },
];

function FeatureCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "rgba(255,255,255,0.72)", borderRadius: 24, padding: "36px 28px", textAlign: "center",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "0.5px solid rgba(255,255,255,0.7)",
        boxShadow: hov ? "0 16px 40px rgba(0,0,0,0.1)" : "0 4px 20px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
      }}>
      <div style={{ fontSize: 48, marginBottom: 20 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#64748B", lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />

      <HeroSection />

      {/* Features */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#F0F9FF,#EEF2FF)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, color: "#0F172A" }}>
              Nima uchun <em style={{ color: "#0EA5E9", fontStyle: "italic" }}>UzTravel?</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {FEATURES.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{
            position: "relative", borderRadius: 28, overflow: "hidden",
            padding: "72px 48px", textAlign: "center",
            backgroundImage: "url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80)",
            backgroundSize: "cover", backgroundPosition: "center",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(14,165,233,0.88),rgba(107,127,212,0.88))" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
                Sayohatingizni bugun boshlang
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "rgba(255,255,255,0.78)", maxWidth: 440, margin: "0 auto 32px" }}>
                Ro'yxatdan o'ting va O'zbekistonning eng go'zal joylarini xaritada ko'ring
              </p>
              <a href="/auth" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "14px 32px", borderRadius: 14, textDecoration: "none",
                fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 14,
                color: "#0EA5E9", background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}>
                Bepul Ro'yxatdan O'tish →
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}