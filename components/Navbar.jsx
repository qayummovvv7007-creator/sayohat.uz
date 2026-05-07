"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/* ── LIQUID RIPPLE HOOK ─────────────────────── */
function useRipple() {
  const [ripples, setRipples] = useState([]);
  const fire = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
  };
  return { ripples, fire };
}

/* ── 3D LOGO ICON ───────────────────────────── */
function Logo3D() {
  const [hov, setHov] = useState(false);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 22);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * -22);
  };
  const onLeave = () => { x.set(0); y.set(0); setHov(false); };

  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
      <motion.div
        onMouseMove={onMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={onLeave}
        style={{
          width: 40, height: 40, borderRadius: 12,
          background: "linear-gradient(145deg, #38BDF8, #6366F1, #A78BFA)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative", overflow: "hidden",
          rotateX: y, rotateY: x,
          transformStyle: "preserve-3d",
          boxShadow: hov
            ? "0 12px 28px rgba(99,102,241,0.55), 0 4px 10px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.4)"
            : "0 4px 14px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Inner shine */}
        <div style={{
          position: "absolute", top: 2, left: 3, right: 3, height: "45%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
          borderRadius: "8px 8px 50% 50%", pointerEvents: "none",
        }} />
        <motion.span
          animate={{ rotateY: hov ? 360 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: 18, fontWeight: 800, color: "#fff", fontFamily: "'Playfair Display',serif", position: "relative", zIndex: 1 }}
        >U</motion.span>
      </motion.div>

      {/* Text */}
      <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 18, lineHeight: 1.1 }}
          className="nav-title">UzTravel</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase" }}
          className="nav-sub">O'zbekiston Sayohati</div>
      </motion.div>
    </Link>
  );
}

/* ── NAV LINK ───────────────────────────────── */
const NAV_ITEMS = [
  { href: "/",       label: "Bosh sahifa", icon: "🏠", desc: "Asosiy sahifa"     },
  { href: "/explore",label: "Kashf etish", icon: "🧭", desc: "Joylarni ko'rish"  },
  { href: "/map",    label: "3D Xarita",   icon: "🗺️", desc: "Interaktiv xarita" },
];

function NavLink({ item, isActive, scrolled }) {
  const { ripples, fire } = useRipple();
  const [hov, setHov] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Link
        href={item.href}
        onClick={fire}
        onMouseEnter={() => { setHov(true); setTimeout(() => setShowDesc(true), 200); }}
        onMouseLeave={() => { setHov(false); setShowDesc(false); }}
        style={{ textDecoration: "none", position: "relative", display: "block" }}
      >
        <motion.div
          whileHover={{ y: -1 }}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "8px 14px", borderRadius: 12, position: "relative", overflow: "hidden",
            background: isActive
              ? scrolled ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.18)"
              : hov
              ? scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.12)"
              : "transparent",
            border: isActive
              ? scrolled ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(255,255,255,0.3)"
              : "1px solid transparent",
            backdropFilter: hov ? "blur(8px)" : "none",
            transition: "background 0.25s, border 0.25s",
          }}
        >
          {/* Ripples */}
          {ripples.map(rp => (
            <motion.span key={rp.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.65 }}
              style={{
                position: "absolute", left: rp.x, top: rp.y,
                width: 30, height: 30, borderRadius: "50%",
                background: scrolled ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.35)",
                transform: "translate(-50%,-50%)", pointerEvents: "none",
              }}
            />
          ))}

          {/* Animated icon */}
          <motion.span
            animate={hov
              ? { rotate: [0, -12, 12, -6, 0], scale: [1, 1.3, 1.1, 1.2, 1] }
              : { rotate: 0, scale: 1 }
            }
            transition={{ duration: 0.45, ease: "easeInOut" }}
            style={{ fontSize: 15, display: "inline-block", filter: isActive ? "drop-shadow(0 0 4px rgba(99,102,241,0.6))" : "none" }}
          >
            {item.icon}
          </motion.span>

          <span style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, fontWeight: isActive ? 600 : 400,
            color: isActive
              ? scrolled ? "#6366F1" : "#fff"
              : scrolled ? "#334155" : "rgba(255,255,255,0.82)",
            transition: "color 0.25s", position: "relative", zIndex: 1,
          }}>{item.label}</span>

          {/* Active dot */}
          {isActive && (
            <motion.div
              layoutId="activeNavDot"
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: scrolled ? "#6366F1" : "#fff",
                boxShadow: scrolled ? "0 0 6px rgba(99,102,241,0.7)" : "0 0 6px rgba(255,255,255,0.9)",
              }}
            />
          )}

          {/* Bottom shimmer bar */}
          <motion.div
            animate={{ scaleX: hov || isActive ? 1 : 0 }}
            style={{
              position: "absolute", bottom: 0, left: 6, right: 6, height: 2,
              background: scrolled
                ? "linear-gradient(90deg,transparent,#6366F1,#0EA5E9,transparent)"
                : "linear-gradient(90deg,transparent,rgba(255,255,255,0.8),transparent)",
              borderRadius: 99, transformOrigin: "center",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>

      {/* Tooltip */}
      <AnimatePresence>
        {showDesc && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)",
              background: "rgba(15,23,42,0.92)",
              backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
              border: "0.5px solid rgba(255,255,255,0.15)",
              borderRadius: 8, padding: "5px 12px",
              fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap", pointerEvents: "none", zIndex: 200,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          >
            {item.desc}
            <div style={{
              position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
              width: 8, height: 8, background: "rgba(15,23,42,0.92)",
              border: "0.5px solid rgba(255,255,255,0.15)",
              borderBottom: "none", borderRight: "none",
              rotate: "45deg",
            }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── USER AVATAR ────────────────────────────── */
function UserMenu({ user, scrolled, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const initials = user.phone
    ? user.phone.slice(0, 2)
    : (user.email || "U")[0].toUpperCase();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        style={{
          display: "flex", alignItems: "center", gap: 9, padding: "6px 14px 6px 6px",
          borderRadius: 999, cursor: "pointer", border: "none",
          background: open
            ? scrolled ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.2)"
            : scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          boxShadow: open ? "0 4px 16px rgba(99,102,241,0.25)" : "none",
          transition: "all 0.25s",
        }}
      >
        {/* Avatar */}
        <motion.div
          animate={{ rotate: open ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "linear-gradient(135deg,#0EA5E9,#6366F1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "#fff",
            boxShadow: "0 2px 8px rgba(99,102,241,0.4)",
            flexShrink: 0,
          }}
        >{initials}</motion.div>

        <span style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 500,
          color: scrolled ? "#334155" : "rgba(255,255,255,0.88)",
          maxWidth: 90, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
        }}>
          {user.city || (user.phone ? `+998${user.phone}` : user.email?.split("@")[0])}
        </span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: 10, color: scrolled ? "#94A3B8" : "rgba(255,255,255,0.5)" }}
        >▼</motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0, minWidth: 200,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(28px) saturate(1.8)", WebkitBackdropFilter: "blur(28px) saturate(1.8)",
              border: "1px solid rgba(255,255,255,0.65)",
              borderRadius: 16, overflow: "hidden",
              boxShadow: "0 16px 48px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
              zIndex: 200,
            }}
          >
            {/* User info */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg,#0EA5E9,#6366F1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#fff",
                }}>{initials}</div>
                <div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>
                    {user.city || "Sayohatchi"}
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 10, color: "#94A3B8" }}>
                    {user.phone ? `+998${user.phone}` : user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            {[
              { icon: "🧭", label: "Kashf etish", href: "/explore" },
              { icon: "🗺️", label: "3D Xarita", href: "/map" },
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ x: 4, background: "rgba(99,102,241,0.06)" }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
                    fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#334155",
                    cursor: "pointer", transition: "background 0.15s",
                  }}
                >
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {item.label}
                </motion.div>
              </Link>
            ))}

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <motion.button
                whileHover={{ x: 4, background: "rgba(239,68,68,0.06)" }}
                onClick={() => { setOpen(false); onLogout(); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px",
                  fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "#EF4444",
                  cursor: "pointer", background: "none", border: "none", textAlign: "left",
                  transition: "background 0.15s",
                }}
              >
                <span>🚪</span> Chiqish
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── LIQUID AUTH BUTTON ─────────────────────── */
function AuthButton() {
  const { ripples, fire } = useRipple();
  const [hov, setHov] = useState(false);

  return (
    <Link href="/auth" style={{ textDecoration: "none" }}>
      <motion.div
        onClick={fire}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
        style={{
          position: "relative", overflow: "hidden",
          padding: "9px 22px", borderRadius: 14, cursor: "pointer",
          background: hov
            ? "linear-gradient(135deg,#38BDF8,#6366F1,#A78BFA)"
            : "linear-gradient(135deg,#0EA5E9,#6366F1)",
          border: "0.5px solid rgba(255,255,255,0.35)",
          boxShadow: hov
            ? "0 10px 28px rgba(99,102,241,0.5), 0 4px 10px rgba(14,165,233,0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
            : "0 4px 14px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
          transition: "background 0.35s, box-shadow 0.35s",
        }}
      >
        {/* Ripples */}
        {ripples.map(rp => (
          <motion.span key={rp.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "absolute", left: rp.x, top: rp.y,
              width: 24, height: 24, borderRadius: "50%",
              background: "rgba(255,255,255,0.4)",
              transform: "translate(-50%,-50%)", pointerEvents: "none",
            }}
          />
        ))}
        {/* Shine */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "50%",
          background: "linear-gradient(to bottom,rgba(255,255,255,0.22),transparent)",
          borderRadius: "14px 14px 0 0", pointerEvents: "none",
        }} />
        <span style={{
          position: "relative", zIndex: 1,
          fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600, color: "#fff",
          display: "flex", alignItems: "center", gap: 7,
        }}>
          <motion.span
            animate={hov ? { rotate: [0, -15, 15, 0] } : {}}
            transition={{ duration: 0.4 }}
          >✨</motion.span>
          Kirish
        </span>
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser]         = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    try { const s = localStorage.getItem("uztravel_user"); if (s) setUser(JSON.parse(s)); } catch {}
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => { localStorage.removeItem("uztravel_user"); setUser(null); router.push("/"); };

  return (
    <>
      <style>{`
        .nav-title { color: ${scrolled ? "#0F172A" : "#fff"}; transition: color 0.3s; }
        .nav-sub   { color: ${scrolled ? "#94A3B8" : "rgba(255,255,255,0.55)"}; transition: color 0.3s; }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(28px) saturate(2)",
          WebkitBackdropFilter: "blur(28px) saturate(2)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.18)",
          boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.08)" : "none",
          transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Top shimmer line */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1.5,
            background: "linear-gradient(90deg,transparent,rgba(14,165,233,0.6),rgba(99,102,241,0.7),rgba(167,139,250,0.6),transparent)",
            backgroundSize: "200% auto",
            opacity: scrolled ? 0 : 0.8,
            transition: "opacity 0.4s",
          }}
        />

        <div style={{
          maxWidth: 1320, margin: "0 auto", padding: "0 28px",
          height: 66, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <Logo3D />

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {NAV_ITEMS.map(item => (
              <NavLink
                key={item.href}
                item={item}
                isActive={pathname === item.href}
                scrolled={scrolled}
              />
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user
              ? <UserMenu user={user} scrolled={scrolled} onLogout={logout} />
              : <AuthButton />
            }

            {/* Mobile burger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(o => !o)}
              style={{
                display: "none", // hidden on desktop
                padding: 8, background: "none", border: "none", cursor: "pointer",
              }}
            >
              <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
                {[0, 1, 2].map(i => (
                  <motion.div key={i}
                    animate={{ rotate: mobileOpen && i === 0 ? 45 : mobileOpen && i === 2 ? -45 : 0, y: mobileOpen && i === 0 ? 9 : mobileOpen && i === 2 ? -9 : 0, opacity: mobileOpen && i === 1 ? 0 : 1 }}
                    style={{ height: 1.5, borderRadius: 99, background: scrolled ? "#334155" : "#fff" }}
                  />
                ))}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}