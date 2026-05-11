"use client";
import { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import SplashIntro from "../components/SplashIntro";

export default function HomePage() {
  const [splashDone, setSplashDone] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Faqat bir marta ko'rsin (session boshida)
    const seen = sessionStorage.getItem("splash_seen");
    if (seen) { setShowSplash(false); setSplashDone(true); }
  }, []);

  const handleSplashDone = () => {
    sessionStorage.setItem("splash_seen", "1");
    setSplashDone(true);
    setTimeout(() => setShowSplash(false), 800);
  };

  return (
    <div style={{ background:"#060b14", minHeight:"100vh", overflowX:"hidden" }}>
      {showSplash && <SplashIntro onDone={handleSplashDone} />}
      {splashDone && <Dashboard />}
    </div>
  );
}