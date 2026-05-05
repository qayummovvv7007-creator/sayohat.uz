"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
const CATS = [
  { id: "mountains", label: "Tog'lar", emoji: "⛰️", color: "#6366F1", light: "#EEF2FF", glow: "rgba(99,102,241,0.35)" },
  { id: "lakes",     label: "Ko'llar",  emoji: "🏞️", color: "#0EA5E9", light: "#F0F9FF", glow: "rgba(14,165,233,0.35)" },
  { id: "picnic",    label: "Piknik",   emoji: "🧺", color: "#22C55E", light: "#F0FDF4", glow: "rgba(34,197,94,0.35)"  },
  { id: "history",   label: "Tarix",    emoji: "🕌", color: "#F59E0B", light: "#FFFBEB", glow: "rgba(245,158,11,0.35)" },
  { id: "fishing",   label: "Baliq",    emoji: "🎣", color: "#14B8A6", light: "#F0FDFA", glow: "rgba(20,184,166,0.35)" },
  { id: "desert",    label: "Cho'l",    emoji: "🏜️", color: "#F97316", light: "#FFF7ED", glow: "rgba(249,115,22,0.35)" },
];

const ALL_PLACES = {
  mountains: [
    {
      id: 1, name: "Amirsoy Tog' Kurordi", region: "Toshkent viloyati",
      lat: 41.56, lng: 70.02, altitude: "2316 m", rating: 4.9, reviews: 3241,
      season: "Yil davomida", difficulty: "O'rtacha", distance: "80 km",
      description: "Amirsoy — O'zbekistonning eng zamonaviy va hashamatli tog' kurortidir. Dengiz sathidan 2316 metr balandlikda joylashgan bu joy, qishda nur sochib turuvchi qor qoplangan yon bag'irlar, yozda esa nafas rohat qiladigan yashil yaylovlar bilan sayohatchilarni o'ziga tortadi. Zamonaviy kanatlift tizimlari, premium mehmonxonalar va dunyo standartidagi dam olish imkoniyatlari bilan Amirsoy Markaziy Osiyodagi eng nufuzli kurortlardan biriga aylangan.",
      tags: ["Kanatlift", "Qish sporti", "Glamping", "Restoran", "Spa"], color: "#6366F1",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    },
    {
      id: 2, name: "Chimgan Tog' Massivi", region: "Toshkent viloyati",
      lat: 41.54, lng: 70.01, altitude: "2097 m", rating: 4.8, reviews: 5621,
      season: "Yil davomida", difficulty: "Oson–O'rtacha", distance: "78 km",
      description: "Chimgan tog'lari — asrlar davomida poytaxt aholisining sevimli dam olish maskani. Toshkentdan atigi 78 km uzoqlikda joylashgan ushbu go'sha, bahorgi lola dastalari, yoz oyi trekking yo'llari va qishki chang'i pistalarining uyg'un manzarasi bilan har qanday dam oluvchini qoniqtiradi. Chimgan daryosi bo'yidagi manzarali pichoqtosh yo'llarda yurish esa ruhingizni yangilaydi.",
      tags: ["Trekking", "Chang'i", "Daryo", "Alpinizm", "Foto"], color: "#6366F1",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85",
    },
    {
      id: 3, name: "Zaamin Milliy Bog'i", region: "Jizzax viloyati",
      lat: 39.70, lng: 68.40, altitude: "2180 m", rating: 4.7, reviews: 1876,
      season: "May–Sentabr", difficulty: "Oson", distance: "280 km",
      description: "Zaamin milliy bog'i — O'zbekiston janubidagi ekologik sayohatning durdonasi. Archa o'rmonlari tutun rangidagi tog' qoyalari orasidan o'sib chiqadi; buloq suvlari musaffo havoni yanada xushbo'y qiladi. Nafas kasalliklariga shifobaxsh tog' havosi, kumush suvlar va tinch tabiiy muhit bu joyni sog'liqni tiklash uchun ideal maskan sifatida yildan yilga mashhur qilmoqda.",
      tags: ["Archa o'rmoni", "Sog'liqni tiklash", "Buloq", "Kurort", "Ekotarizm"], color: "#6366F1",
      image: "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800&q=85",
    },
    {
      id: 4, name: "Ugam–Chatqol Milliy Bog'i", region: "Toshkent viloyati",
      lat: 41.65, lng: 70.35, altitude: "3309 m", rating: 4.9, reviews: 987,
      season: "Iyun–Sentabr", difficulty: "Qiyin", distance: "100 km",
      description: "O'rta Osiyoning eng katta qo'riqxonalaridan biri bo'lgan Ugam-Chatqol — yovvoyi tabiat ishqibozlari uchun haqiqiy jannat. Bu yerda irbis va tulporlar erkin yayraydi; abadiy muzliklar orasidan ko'tarilgan dovonlar trekkingchilarni cheksiz kengliklar sari chorlaydi. Tog' ko'llari aks ettiradigan osmon va yon bag'irlarni qoplagan qorning oqligi bu manzarani tushimga ham kirmaydigan go'zallikka yetkazadi.",
      tags: ["Yovvoyi hayvonlar", "Dovon", "Muzlik", "Ekspeditsiya", "Kampinq"], color: "#6366F1",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=85",
    },
  ],
  lakes: [
    {
      id: 5, name: "Chorvoq Suv Ombori", region: "Toshkent viloyati",
      lat: 41.58, lng: 70.03, altitude: "920 m", rating: 4.8, reviews: 8903,
      season: "May–Sentabr", difficulty: "Oson", distance: "75 km",
      description: "Ko'k moviy suvlari bilan ufqqa tutashgan Chorvoq — O'zbekistonning eng mashhur suv dam olish maskani. Toshkent tog'lari quchog'idagi bu ulkan suv ombori yozda minglab sayohatchilarni suzish, qayiqda sayr qilish va SUP surfing uchun jalb etadi. Qirg'oq bo'ylab joylashgan pansionatlar, yashil maydonlar va tungi bazarlar bilan Chorvoq — oilaviy dam olishning to'liq paketini taqdim etadi.",
      tags: ["Suzish", "SUP board", "Qayiq", "Pansionat", "Baliq"], color: "#0EA5E9",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85",
    },
    {
      id: 6, name: "Aydar Ko'li", region: "Navoiy viloyati",
      lat: 40.90, lng: 66.90, altitude: "242 m", rating: 4.7, reviews: 2341,
      season: "Aprel–Oktabr", difficulty: "Oson", distance: "360 km",
      description: "Qizilqum cho'li qoynida yashiringan Aydar Ko'li — tabiatning eng hayratlanarli paradokslaridan biri. Quruq cho'l qumidagi bu ulkan ko'l flamingo va pelikanlarning makoni; kechalari yulduzlar ko'lning tekis sirtiga aynan aks etib, yerda ham, osmonda ham bir xil osmono'par manzara hosil qiladi. Yuртлarda tunash, tuya safari va cho'l ekotarizmi bu joyga o'zgacha jozibadar kayfiyat bag'ishlaydi.",
      tags: ["Flamingo", "Cho'l safari", "Yurt camp", "Qush kuzatish", "Qayiq"], color: "#0EA5E9",
      image: "https://images.unsplash.com/photo-1439405326-b42525451c48?w=800&q=85",
    },
    {
      id: 7, name: "Arnasoy Ko'llari Tizimi", region: "Jizzax viloyati",
      lat: 40.47, lng: 65.96, altitude: "258 m", rating: 4.5, reviews: 764,
      season: "Mart–Noyabr", difficulty: "Oson", distance: "230 km",
      description: "Arnasoy — bir-biri bilan bog'langan ko'llar tizimi bo'lib, Sirdaryodan suv olishi hisobiga yuzlab kvadrat kilometrga yoyilgan noyob ekotizimni vujudga keltirgan. Qamishzor o'rmalari orasidan qayiqda suzish, ov qilish va baliq ovlash uchun O'zbekistonda kamdan kam uchraydigan joy. Ko'llar bag'rida yashovchi qushlarning xilma-xilligi ornitologlarni bu manzilga qayta-qayta tortadi.",
      tags: ["Baliq ovlash", "Qush kuzatish", "Qayiqda sayr", "Ovchilik", "Ekotizim"], color: "#0EA5E9",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=85",
    },
  ],
  picnic: [
    {
      id: 8, name: "Humsan Daryo Vodiysi", region: "Toshkent viloyati",
      lat: 41.35, lng: 69.90, altitude: "850 m", rating: 4.7, reviews: 3102,
      season: "Mart–Oktabr", difficulty: "Oson", distance: "55 km",
      description: "Humsan vodiysi — poytaxt yaqinidagi eng sehrli tabiat burchi. Ohaktosh qoyalar orasidan oqib o'tuvchi tiniq daryo sohilida gullab-yashnagan o'rikzorlar va olmazorlar qo'ynida piknik qilish — bu oddiy dam olish emas, bu esdan chiqmaydigan tajriba. Bir necha sharsharalar, daryo bo'yidagi soyabonli choyxonalar va bolalar uchun xavfsiz sayoz suvlar bu joyni oilaviy sayohat uchun eng ommabop manziliga aylantirgan.",
      tags: ["Sharsharalar", "Daryo", "Choyxona", "Oilaviy", "Shashlik"], color: "#22C55E",
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=85",
    },
    {
      id: 9, name: "Bostanliq Yaylovlari", region: "Toshkent viloyati",
      lat: 41.10, lng: 69.87, altitude: "650 m", rating: 4.8, reviews: 2876,
      season: "Aprel–Oktabr", difficulty: "Oson", distance: "62 km",
      description: "Bostanliq — O'zbekistonning jannat deb atalgan burchagi. Bahor oylarida olma, shaftoli va o'rik bog'lari bir vaqtda gullashi natijasida hosil bo'ladigan oq-pushti gullар dengiziда sayr qilish — ruhni to'ldiruvchi munosib his-tuyg'u. Yoz oylarida esa tog' daryolari bo'yidagi tarvuz va qovun savdosi bilan shirin-shakar o'tgan piknik kunlari sizni qayta qaytishga undaydi.",
      tags: ["Olma bog'i", "Yaylov", "Daryo", "Mevalar", "Foto"], color: "#22C55E",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85",
    },
  ],
  history: [
    {
      id: 10, name: "Registon Maydoni", region: "Samarqand shahari",
      lat: 39.65, lng: 66.97, altitude: "702 m", rating: 4.9, reviews: 18432,
      season: "Yil davomida", difficulty: "Oson", distance: "350 km",
      description: "UNESCO tomonidan Insoniyat Madaniy Merosi ro'yxatiga kiritilgan Registon — islom me'morchiligining eng ulug'vor yodgorliklaridan biri. Uch madrasaning — Ulugbek, Sher-Dor va Tilla-Korining — muazzam peshtoqlari ko'k farang rang mosaikalar va oltin naqshlar bilan bezalgan; ularning aks-sadosi asrlar osha yangramoqda. Kechki yorug'lik ko'rsatuvida (son et lumière) binolar xuddi afsonaviy Amir Temur saltanatiga qaytgandek hayajonlantirib yuboradi.",
      tags: ["UNESCO", "Me'morchilik", "Madrasalar", "Kechki shou", "Muzey"], color: "#F59E0B",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=85",
    },
    {
      id: 11, name: "Buxoro Eski Shahri", region: "Buxoro shahari",
      lat: 39.77, lng: 64.43, altitude: "228 m", rating: 4.9, reviews: 14231,
      season: "Mart–May, Sentabr–Noyabr", difficulty: "Oson", distance: "570 km",
      description: "Ming yillik tarix nafasi seziluvchi Buxoro — Ipak yo'lining jonli yodgorligi. Kalon minorasi soyasidagi tor ko'chalarda yurish, hunarmand ustalar ishxonalaridan eshitiluvchi mis va kumush zarb tovushlari, ziyoratgoh hovuzlari sathida miltillovchi chiroqlar aksи — bularning barchasi bu qadimiy shaharga o'ziga xos mistik ruh bag'ishlaydi. Ark qal'asi tepasidan butun shaharning qushdan ko'rinishi esa alohida hikoya.",
      tags: ["Qal'a", "Bozor", "Minora", "Hunarmandchilik", "Ipak yo'li"], color: "#F59E0B",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=85",
    },
    {
      id: 12, name: "Xiva — Ichan Qal'a", region: "Xorazm viloyati",
      lat: 41.38, lng: 60.36, altitude: "93 m", rating: 4.8, reviews: 9871,
      season: "Aprel–Oktabr", difficulty: "Oson", distance: "980 km",
      description: "Xivaning Ichan Qal'asi — ochiq osmon ostidagi muzey. Loydan qurilgan uylar, masjidlar va minarelerdan iborat bu shaharcha shunchalik yaxlit saqlanganki, go'yoki Xorazm xonligining oltin davriga qaytib kelgandek his qilasiz. Kechki payt Kalta-Minor minorasi atrofidagi bozorda savdogarlar bilan tortishuv qilish, aylanma rasmlar solingan sopol idishlar va ipak gilamlar orasida yurish — bu sayohatingizning eng xotiralangan daqiqalari bo'ladi.",
      tags: ["Qal'a", "UNESCO", "Muzey", "Bozor", "Ipak gilamlari"], color: "#F59E0B",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=85",
    },
  ],
  fishing: [
    {
      id: 13, name: "Chorvoq — Karp Ovlash", region: "Toshkent viloyati",
      lat: 41.56, lng: 70.02, altitude: "920 m", rating: 4.7, reviews: 1243,
      season: "Yil davomida", difficulty: "Oson", distance: "75 km",
      description: "Chorvoq suv omboridagi baliq ovlash — O'zbekistondagi eng qulay va hosildor ovlash tajribasini beradi. Karp, zander, ko'krak va trout baliqlar ombor tubida to'p-to'p bo'lib yuradi. Ijaraga beriladigan yaxta qayiqlar, professional baliqovlash uskunalari do'koni va suv bo'yidagi choyxonalar bu mashg'ulotni qo'shimcha qulayliklar bilan boyitadi. Erta tongda suv yuzasiga cho'zilgan tuman orasida ovlash esa o'ziga xos meditatsiya.",
      tags: ["Karp", "Zander", "Trout", "Qayiq ijarasi", "Tungi ovlash"], color: "#14B8A6",
      image: "https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=800&q=85",
    },
    {
      id: 14, name: "Sirdaryo Deltasi", region: "Sirdaryo viloyati",
      lat: 40.83, lng: 68.71, altitude: "220 m", rating: 4.5, reviews: 876,
      season: "Aprel–Oktabr", difficulty: "Oson", distance: "120 km",
      description: "O'zbekistonning eng uzun daryosi — Sirdaryo — sayoz qirg'oqlarida yirik som va sazanlar yashaydi. Delta qismidagi qamishzor va suv o'tlari orasida qayiqda ovlash — bu yovvoyi tabiat bilan to'liq uyg'unlashish imkoniyatidir. Kechasi suv yuzasiga tushirilgan lipa yorug'ida baliqlarni o'ziga jalb qilib ovlash mahalliy baliqchilarning asriy siriga aylangan.",
      tags: ["Som", "Sazан", "Delta", "Qamishzor", "Tungi ovlash"], color: "#14B8A6",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85",
    },
  ],
  desert: [
    {
      id: 15, name: "Qizilqum Safari", region: "Navoiy viloyati",
      lat: 41.50, lng: 63.50, altitude: "200 m", rating: 4.8, reviews: 2109,
      season: "Sentabr–Aprel", difficulty: "O'rtacha", distance: "500 km",
      description: "Qizilqum — Markaziy Osiyoning ulug'vor qizil qumli sahrosi; bu yerda har bir qum tepaligi o'zining qatiga ming yillik siri yashiradi. Erta tong saforlari (safari) paytida qum barxanlarining soyasi ranglarni o'ynatib bo'yadigan paytni ko'rish, tuyaning orqasida osmon rang cho'lda soatlab yurish va kechqurun yurt ichida o'choq atrofida milliy ovqatlar yeyish — bu safar sizni butunlay boshqa bir dunyoga olib o'tadi.",
      tags: ["Tuya safari", "Yurt camp", "Qum barxanlari", "Yulduzli osmon", "Off-road"], color: "#F97316",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=85",
    },
    {
      id: 16, name: "Orol Dengizi Manzaralari", region: "Qoraqalpog'iston",
      lat: 44.70, lng: 58.40, altitude: "53 m", rating: 4.6, reviews: 1432,
      season: "Aprel–Oktabr", difficulty: "O'rtacha", distance: "1200 km",
      description: "Orol dengizining qurigan tubi — insoniyat va tabiat munosabatlarining ibratli amfiteatri. Cho'l o'rtasida zanglab yotgan baliqchilik kemalarini ko'rish, bir paytlar dengiz bo'lgan pasttekislikda yurish va ufqqa cho'zilgan tuz qatlamlarini kuzatish — bu dramatik manzara fotochilar va faylasuflar uchun tengsiz ilhom manbai. Mahalliy qo'riqxona rejasi doirasidagi sayxon safarlar mavzu bo'yicha chuqur tushuncha beradi.",
      tags: ["Kemalar", "Tuz tekisligi", "Foto", "Ekotarizm", "Ekspeditsiya"], color: "#F97316",
      image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=800&q=85",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   ANIMATIONS
═══════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

/* ═══════════════════════════════════════════════════════════
   3D TILT CARD
═══════════════════════════════════════════════════════════ */
function TiltCard({ children, intensity = 8 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   LIQUID BUTTON
═══════════════════════════════════════════════════════════ */
function LiquidTab({ cat, isActive, onClick }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
    onClick();
  };

  return (
    <motion.button
      onClick={addRipple}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      style={{
        position: "relative", overflow: "hidden", cursor: "pointer",
        padding: "10px 22px", borderRadius: 999, border: "none",
        background: isActive ? cat.color : "rgba(0,0,0,0.04)",
        color: isActive ? "#fff" : "#475569",
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: isActive ? 600 : 400,
        display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
        boxShadow: isActive ? `0 6px 20px ${cat.glow}, 0 2px 8px rgba(0,0,0,0.12)` : "none",
        transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Animated emoji */}
      <motion.span
        animate={isActive ? { rotate: [0, -8, 8, -5, 0], scale: [1, 1.2, 1] } : { rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ fontSize: 16, display: "inline-block" }}
      >
        {cat.emoji}
      </motion.span>
      {cat.label}

      {/* Ripple effects */}
      {ripples.map(rp => (
        <motion.span
          key={rp.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 5, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: rp.x, top: rp.y,
            width: 40, height: 40,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.45)",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />
      ))}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════
   PLACE CARD
═══════════════════════════════════════════════════════════ */
function PlaceCard({ place, isSelected, onClick, index }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      layout
    >
      <TiltCard intensity={6}>
        <motion.div
          onClick={onClick}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          whileTap={{ scale: 0.98 }}
          style={{
            background: "#fff", borderRadius: 22, overflow: "hidden", cursor: "pointer",
            border: isSelected ? `2px solid ${place.color}` : "1.5px solid rgba(0,0,0,0.07)",
            boxShadow: hov
              ? `0 24px 60px rgba(0,0,0,0.14), 0 8px 24px ${place.color}25`
              : isSelected
              ? `0 12px 40px ${place.color}30, 0 4px 16px rgba(0,0,0,0.08)`
              : "0 2px 16px rgba(0,0,0,0.06)",
            transition: "box-shadow 0.35s ease, border 0.3s ease",
          }}
        >
          {/* Image */}
          <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
            <motion.div
              animate={{ scale: hov ? 1.08 : 1 }}
              transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url(${place.image})`,
                backgroundSize: "cover", backgroundPosition: "center",
              }}
            />
            {/* Gradient */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
            }} />

            {/* Rating glass badge */}
            <motion.div
              animate={{ y: hov ? -2 : 0 }}
              style={{
                position: "absolute", top: 14, right: 14,
                padding: "5px 12px", borderRadius: 999,
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                border: "0.5px solid rgba(255,255,255,0.25)",
                color: "#FCD34D", fontSize: 12,
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                display: "flex", alignItems: "center", gap: 4,
              }}
            >
              <motion.span
                animate={{ rotate: hov ? [0, 20, 0] : 0 }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: 11 }}
              >⭐</motion.span>
              {place.rating}
            </motion.div>

            {/* Region */}
            <div style={{ position: "absolute", bottom: 14, left: 14 }}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                color: "rgba(255,255,255,0.72)", letterSpacing: "0.04em",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                📍 {place.region}
              </div>
            </div>

            {/* Color accent bar */}
            <motion.div
              animate={{ scaleX: hov ? 1 : 0 }}
              initial={{ scaleX: 0 }}
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${place.color}, ${place.color}88)`,
                transformOrigin: "left",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div style={{ padding: "18px 20px" }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700,
              color: "#0F172A", marginBottom: 8, lineHeight: 1.3,
            }}>{place.name}</h3>

            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#64748B",
              lineHeight: 1.65, marginBottom: 14,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>{place.description}</p>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 6 }}>
                {place.tags.slice(0, 2).map(t => (
                  <motion.span
                    key={t}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 10, padding: "3px 10px",
                      borderRadius: 999,
                      background: `${place.color}18`,
                      color: place.color,
                      border: `1px solid ${place.color}35`,
                      fontWeight: 500,
                    }}
                  >{t}</motion.span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#94A3B8" }}>
                🚗 {place.distance}
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DETAIL PANEL
═══════════════════════════════════════════════════════════ */
function DetailPanel({ place, catId, onClose }) {
  if (!place) return null;
  return (
    <motion.div
      key={place.id}
      variants={scaleIn}
      initial="hidden"
      animate="show"
      exit="exit"
      style={{
        background: "#fff", borderRadius: 24, overflow: "hidden",
        boxShadow: `0 24px 64px rgba(0,0,0,0.14), 0 8px 24px ${place.color}20`,
        border: `1.5px solid ${place.color}30`,
        alignSelf: "start", position: "sticky", top: 126,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 230 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${place.image})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1) 55%, transparent)" }} />

        {/* Close */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
            background: "rgba(0,0,0,0.4)", border: "0.5px solid rgba(255,255,255,0.3)",
            color: "#fff", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >✕</motion.button>

        <div style={{ position: "absolute", bottom: 16, left: 18 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
            {place.name}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
            📍 {place.region}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 16 }}>
          {[
            { label: "Reyting", value: `${place.rating} ★`, c: "#F59E0B" },
            { label: "Masofa", value: place.distance, c: "#0EA5E9" },
            { label: "Fasl", value: place.season, c: "#22C55E" },
            { label: "Qiyinlik", value: place.difficulty, c: "#8B5CF6" },
            ...(place.altitude ? [{ label: "Balandlik", value: place.altitude, c: "#F97316" }] : []),
            { label: "Sharhlar", value: `${place.reviews.toLocaleString()}`, c: "#64748B" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
              style={{
                background: "#F8FAFF", borderRadius: 12, padding: "10px 13px",
                border: "1px solid #EFF2F9",
              }}
            >
              <div style={{ fontSize: 9, color: "#94A3B8", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: s.c, fontFamily: "'DM Sans', sans-serif" }}>
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12.5, color: "#475569", lineHeight: 1.75, marginBottom: 16 }}>
          {place.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {place.tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 + 0.25 }}
              whileHover={{ scale: 1.08 }}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, padding: "4px 12px",
                borderRadius: 999, background: `${place.color}14`,
                border: `1px solid ${place.color}30`, color: place.color, fontWeight: 500,
                cursor: "default",
              }}
            >{t}</motion.span>
          ))}
        </div>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={`/map?category=${catId}&place=${place.id}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px", borderRadius: 14, textDecoration: "none",
              background: `linear-gradient(135deg, ${place.color}, ${place.color}cc)`,
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
              boxShadow: `0 6px 20px ${place.color}45`,
            }}
          >
            🗺️ Xaritada Ko'rish →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
export default function ExplorePage() {
  const [active, setActive] = useState("mountains");
  const [selected, setSelected] = useState(null);

  const places = ALL_PLACES[active] || [];
  const cat = CATS.find(c => c.id === active);

  const switchCat = (id) => {
    if (id === active) return;
    setActive(id);
    setSelected(null);
  };

  return (
    <div style={{ background: "#F5F7FF", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ── */}
      <div style={{
        paddingTop: 96, paddingBottom: 52, paddingLeft: 28, paddingRight: 28,
        background: "linear-gradient(135deg, #0F172A 0%, #1a2d4a 50%, #0F172A 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Animated glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: -120, right: -120, width: 500, height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${cat?.color || "#0EA5E9"}55, transparent 65%)`,
            pointerEvents: "none", filter: "blur(20px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            position: "absolute", bottom: -80, left: -80, width: 350, height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.4), transparent 65%)",
            pointerEvents: "none", filter: "blur(24px)",
          }}
        />

        <div style={{ maxWidth: 1260, margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              color: "rgba(255,255,255,0.45)", fontSize: 12,
              fontFamily: "'DM Sans', sans-serif", textDecoration: "none", marginBottom: 22,
              transition: "color 0.2s",
            }}>
              ← Bosh sahifaga
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 700, color: "#fff", marginBottom: 12, lineHeight: 1.1,
            }}
          >
            Joylarni{" "}
            <em style={{
              fontStyle: "italic",
              background: "linear-gradient(90deg, #7DD3FC, #A78BFA)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Kashf Eting
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: "rgba(255,255,255,0.5)", maxWidth: 460,
            }}
          >
            Kategoriya tanlang va O'zbekistonning go'zal joylarini ko'ring
          </motion.p>
        </div>
      </div>

      {/* ── CATEGORY TABS ── */}
      <div style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        position: "sticky", top: 64, zIndex: 40,
      }}>
        <div style={{ maxWidth: 1260, margin: "0 auto", padding: "12px 28px", display: "flex", gap: 8, overflowX: "auto" }}>
          {CATS.map(cat => (
            <LiquidTab key={cat.id} cat={cat} isActive={active === cat.id} onClick={() => switchCat(cat.id)} />
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth: 1260, margin: "0 auto", padding: "36px 28px 60px" }}>
        {/* Count badge */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24,
            padding: "6px 14px", borderRadius: 999,
            background: `${cat?.color}14`, border: `1px solid ${cat?.color}30`,
          }}
        >
          <motion.span
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: 16 }}
          >{cat?.emoji}</motion.span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
            color: cat?.color,
          }}>
            {places.length} ta joy topildi
          </span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 390px" : "1fr", gap: 24, alignItems: "start" }}>
          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20 }}>
            <AnimatePresence mode="popLayout">
              {places.map((place, i) => (
                <PlaceCard
                  key={`${active}-${place.id}`}
                  place={place}
                  index={i}
                  isSelected={selected?.id === place.id}
                  onClick={() => setSelected(selected?.id === place.id ? null : place)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {selected && (
              <DetailPanel
                key={selected.id}
                place={selected}
                catId={active}
                onClose={() => setSelected(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}