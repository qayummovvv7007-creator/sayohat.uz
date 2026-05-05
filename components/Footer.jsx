export default function Footer() {
  return (
    <footer style={{ background: "#0F172A", paddingTop: 64, paddingBottom: 32, marginTop: 0 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "linear-gradient(135deg, #0EA5E9, #6B7FD4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 800, fontSize: 18,
              }}>U</div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>
                UzTravel
              </span>
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.42)",
              lineHeight: 1.8, maxWidth: 280,
            }}>
              O'zbekistonning eng go'zal tog'lari, ko'llari va tabiat qo'ynidagi joylarni kashf eting.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Kategoriyalar
            </h4>
            {["⛰️ Tog'li Joylar", "🏞️ Ko'l va Havzalar", "🧺 Piknik Joylari", "🎣 Baliq Ovlash", "🥾 Trekking", "🏜️ Cho'l"].map(item => (
              <div key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = "#38BDF8"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}
              >{item}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Aloqa
            </h4>
            {[
              { icon: "📍", text: "Toshkent, O'zbekiston" },
              { icon: "📞", text: "+998 90 123 45 67" },
              { icon: "✉️", text: "info@uztravel.uz" },
            ].map(c => (
              <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>
                <span>{c.icon}</span><span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.24)" }}>
            © 2025 UzTravel. Barcha huquqlar himoyalangan.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.28)" }}>
              Xizmat ishlayapti
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}