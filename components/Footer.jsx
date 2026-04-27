export default function Footer() {
  return (
    <footer
      className="relative mt-20 pt-16 pb-8 overflow-hidden"
      style={{ background: "#0F172A" }}
    >
      {/* decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(14,165,233,0.5),rgba(107,127,212,0.5),transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#0EA5E9,#6B7FD4)",
                }}
              >
                U
              </div>
              <span className="font-display text-xl font-bold text-white">
                UzTravel
              </span>
            </div>
            <p
              className="text-sm font-body leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              O'zbekistonning eng go'zal tog'lari, ko'llari va tabiat
              qo'ynidagi joylarni kashf eting. Sayohatingizni biz bilan
              rejalashtiring.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-sm font-body font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Kategoriyalar
            </h4>
            <ul className="space-y-3">
              {[
                "⛰️ Tog'li Joylar",
                "🏞️ Ko'l va Havzalar",
                "🧺 Piknik Joylari",
                "🎣 Baliq Ovlash",
                "🥾 Trekking",
                "🏜️ Cho'l va Sahrolar",
              ].map((item) => (
                <li key={item}>
                  <span
                    className="text-sm font-body cursor-pointer transition-colors duration-200 hover:text-sky-400"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-body font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Aloqa
            </h4>
            <ul className="space-y-3">
              {[
                { icon: "📍", text: "Toshkent, O'zbekiston" },
                { icon: "📞", text: "+998 90 123 45 67" },
                { icon: "✉️", text: "info@uztravel.uz" },
              ].map((c) => (
                <li
                  key={c.text}
                  className="flex items-center gap-2 text-sm font-body"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  <span>{c.icon}</span>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p
            className="text-xs font-body"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            © 2025 UzTravel. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: "#4ADE80" }}
            />
            <span
              className="text-xs font-body"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Xizmat ishlayapti
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}