"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    try {
      const s = localStorage.getItem("uztravel_user");
      if (s) setUser(JSON.parse(s));
    } catch {}
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => { localStorage.removeItem("uztravel_user"); router.push("/"); setUser(null); };

  const navBg = scrolled
    ? "rgba(255,255,255,0.82)"
    : "rgba(255,255,255,0.12)";
  const navBorder = scrolled
    ? "1px solid rgba(255,255,255,0.6)"
    : "1px solid rgba(255,255,255,0.22)";
  const textColor = scrolled ? "#1E293B" : "#fff";
  const subColor = scrolled ? "#64748B" : "rgba(255,255,255,0.6)";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg,
      backdropFilter: "blur(24px) saturate(1.8)",
      WebkitBackdropFilter: "blur(24px) saturate(1.8)",
      borderBottom: navBorder,
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 28px",
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #0EA5E9, #6B7FD4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 16,
            boxShadow: "0 4px 12px rgba(14,165,233,0.4)",
          }}>U</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: textColor, lineHeight: 1.1, transition: "color 0.3s" }}>
              UzTravel
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: subColor, transition: "color 0.3s" }}>
              O'zbekiston Sayohati
            </div>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {[{ href: "/explore", label: "Kashf etish" }, { href: "/map", label: "Xarita" }].map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
              color: textColor, textDecoration: "none", transition: "opacity 0.2s",
              opacity: 0.82,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.82}
            >{l.label}</Link>
          ))}

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                padding: "6px 14px", borderRadius: 999,
                background: "rgba(14,165,233,0.12)",
                border: "1px solid rgba(14,165,233,0.28)",
                color: scrolled ? "#0EA5E9" : "#fff",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 6,
              }}>
                👤 {user.phone ? `+998${user.phone}` : user.email?.split("@")[0]}
              </div>
              <button onClick={logout} style={{
                padding: "6px 14px", borderRadius: 999, cursor: "pointer",
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                color: scrolled ? "#EF4444" : "#FCA5A5",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                transition: "background 0.2s",
              }}>Chiqish</button>
            </div>
          ) : (
            <Link href="/auth" style={{
              padding: "9px 22px", borderRadius: 12,
              background: "linear-gradient(135deg, #0EA5E9, #6B7FD4)",
              color: "#fff", textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              boxShadow: "0 4px 14px rgba(14,165,233,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(14,165,233,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 14px rgba(14,165,233,0.4)"; }}
            >Kirish</Link>
          )}
        </div>
      </div>
    </nav>
  );
}