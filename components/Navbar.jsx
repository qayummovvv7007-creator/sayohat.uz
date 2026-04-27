"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const stored = localStorage.getItem("uztravel_user");
    if (stored) setUser(JSON.parse(stored));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("uztravel_user");
    router.push("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.72)"
          : "rgba(255,255,255,0.12)",
        backdropFilter: "blur(24px) saturate(1.8)",
        WebkitBackdropFilter: "blur(24px) saturate(1.8)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.5)"
          : "1px solid rgba(255,255,255,0.22)",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)" }}
          >
            U
          </div>
          <div>
            <span
              className="font-display font-bold text-lg leading-none"
              style={{ color: scrolled ? "#0F172A" : "#fff" }}
            >
              UzTravel
            </span>
            <span
              className="block text-xs font-body"
              style={{ color: scrolled ? "#64748B" : "rgba(255,255,255,0.6)" }}
            >
              O'zbekiston Sayohati
            </span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "/explore", label: "Kashf etish" },
            { href: "/map", label: "Xarita" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-body font-medium transition-colors duration-200"
              style={{ color: scrolled ? "#334155" : "rgba(255,255,255,0.82)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body"
                style={{
                  background: "rgba(14,165,233,0.12)",
                  color: scrolled ? "#0EA5E9" : "#fff",
                  border: "1px solid rgba(14,165,233,0.3)",
                }}
              >
                <span>👤</span>
                <span>{user.phone || user.email?.split("@")[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-xs font-body font-medium transition-all duration-200"
                style={{
                  background: "rgba(239,68,68,0.12)",
                  color: scrolled ? "#EF4444" : "rgba(255,200,200,0.9)",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
              >
                Chiqish
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-5 py-2 rounded-full text-sm font-body font-semibold text-white transition-all duration-300 shadow-lg"
              style={{
                background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
                boxShadow: "0 4px 14px rgba(14,165,233,0.4)",
              }}
            >
              Kirish
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}