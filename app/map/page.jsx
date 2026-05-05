"use client";
import { useEffect, useRef, useState, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";

/* ══════════════════════════════════════════════════════════════
   DATA — barcha joylar (explore bilan bir xil)
══════════════════════════════════════════════════════════════ */
const CATS = [
  { id:"mountains", label:"Tog'lar",  emoji:"⛰️", color:"#6366F1", glow:"rgba(99,102,241,0.5)"  },
  { id:"lakes",     label:"Ko'llar",  emoji:"🏞️", color:"#0EA5E9", glow:"rgba(14,165,233,0.5)"  },
  { id:"picnic",    label:"Piknik",   emoji:"🧺", color:"#22C55E", glow:"rgba(34,197,94,0.5)"   },
  { id:"history",   label:"Tarix",    emoji:"🕌", color:"#F59E0B", glow:"rgba(245,158,11,0.5)"  },
  { id:"fishing",   label:"Baliq",    emoji:"🎣", color:"#14B8A6", glow:"rgba(20,184,166,0.5)"  },
  { id:"desert",    label:"Cho'l",    emoji:"🏜️", color:"#F97316", glow:"rgba(249,115,22,0.5)"  },
];

const ALL_PLACES = {
  mountains:[
    { id:1,  name:"Amirsoy Tog' Kurordi",      region:"Toshkent viloyati",  lat:41.563, lng:70.018, rating:4.9, distance:"80 km",  difficulty:"O'rtacha", altitude:"2316 m", season:"Yil davomida",   color:"#6366F1", tags:["Kanatlift","Qish sporti","Glamping","Spa"],          image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85", description:"Amirsoy — O'zbekistonning eng zamonaviy va hashamatli tog' kurortidir. 2316 metr balandlikda joylashgan bu joy qishda nur sochib turuvchi qor va yozda yashil yaylovlar bilan sayohatchilarni o'ziga tortadi. Zamonaviy kanatlift tizimlari va premium mehmonxonalar bilan Markaziy Osiyodagi eng nufuzli kurortlardan biriga aylangan." },
    { id:2,  name:"Chimgan Tog' Massivi",       region:"Toshkent viloyati",  lat:41.546, lng:70.013, rating:4.8, distance:"78 km",  difficulty:"Oson",     altitude:"2097 m", season:"Yil davomida",   color:"#6366F1", tags:["Trekking","Chang'i","Daryo","Alpinizm"],             image:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85", description:"Chimgan tog'lari — asrlar davomida poytaxt aholisining sevimli dam olish maskani. Toshkentdan 78 km uzoqlikda joylashgan bu go'sha bahorgi lola dastalari, yoz trekking yo'llari va qishki chang'i pistalari bilan har qanday dam oluvchini qoniqtiradi." },
    { id:3,  name:"Zaamin Milliy Bog'i",        region:"Jizzax viloyati",    lat:39.700, lng:68.400, rating:4.7, distance:"280 km", difficulty:"Oson",     altitude:"2180 m", season:"May–Sentabr",    color:"#6366F1", tags:["Archa o'rmoni","Sog'lomlashtirish","Ekotarizm"],     image:"https://images.unsplash.com/photo-1502786129293-79981df4e689?w=900&q=85", description:"Zaamin milliy bog'i — O'zbekiston janubidagi ekologik sayohatning durdonasi. Archa o'rmonlari tog' qoyalari orasidan o'sib chiqadi. Nafas kasalliklariga shifobaxsh tog' havosi va kumush suvlar bu joyni sog'liqni tiklash uchun ideal maskan qiladi." },
    { id:4,  name:"Ugam–Chatqol Qo'riqxonasi", region:"Toshkent viloyati",  lat:41.650, lng:70.350, rating:4.9, distance:"100 km", difficulty:"Qiyin",    altitude:"3309 m", season:"Iyun–Sentabr",  color:"#6366F1", tags:["Irbis","Dovon","Muzlik","Ekspeditsiya"],             image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85", description:"O'rta Osiyoning eng katta qo'riqxonalaridan biri. Bu yerda irbis va tulporlar erkin yayraydi. Tog' ko'llari aks ettiradigan osmon va dovonlar trekkingchilarni cheksiz kengliklar sari chorlaydi." },
  ],
  lakes:[
    { id:5,  name:"Chorvoq Suv Ombori",         region:"Toshkent viloyati",  lat:41.576, lng:70.033, rating:4.8, distance:"75 km",  difficulty:"Oson",     season:"May–Sentabr",    color:"#0EA5E9", tags:["Suzish","SUP board","Qayiq","Pansionat"],            image:"https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=85", description:"Ko'k moviy suvlari bilan ufqqa tutashgan Chorvoq — O'zbekistonning eng mashhur suv dam olish maskani. Toshkent tog'lari quchog'idagi bu ulkan suv ombori yozda minglab sayohatchilarni suzish va SUP surfing uchun jalb etadi." },
    { id:6,  name:"Aydar Ko'li",                region:"Navoiy viloyati",    lat:40.900, lng:66.900, rating:4.7, distance:"360 km", difficulty:"Oson",     season:"Aprel–Oktabr",  color:"#0EA5E9", tags:["Flamingo","Cho'l safari","Yurt camp","Qayiq"],       image:"https://images.unsplash.com/photo-1439405326-b42525451c48?w=900&q=85", description:"Qizilqum cho'li qoynida yashiringan Aydar Ko'li — tabiatning eng hayratlanarli paradokslaridan biri. Flamingo va pelikanlarning makoni; kechalari yulduzlar ko'lning tekis sirtida aks etib, osmono'par manzara hosil qiladi." },
    { id:7,  name:"Arnasoy Ko'llari",           region:"Jizzax viloyati",    lat:40.470, lng:65.960, rating:4.5, distance:"230 km", difficulty:"Oson",     season:"Mart–Noyabr",   color:"#0EA5E9", tags:["Baliq ovlash","Qush kuzatish","Qayiqda sayr"],       image:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=85", description:"Arnasoy — bir-biri bilan bog'langan ko'llar tizimi. Sirdaryodan suv olishi hisobiga yuzlab kvadrat kilometrga yoyilgan noyob ekotizimni vujudga keltirgan. Qushlarning xilma-xilligi ornitologlarni bu manzilga qayta-qayta tortadi." },
  ],
  picnic:[
    { id:8,  name:"Humsan Daryo Vodiysi",       region:"Toshkent viloyati",  lat:41.350, lng:69.900, rating:4.7, distance:"55 km",  difficulty:"Oson",     season:"Mart–Oktabr",   color:"#22C55E", tags:["Sharsharalar","Choyxona","Shashlik","Oilaviy"],      image:"https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=85", description:"Humsan vodiysi — poytaxt yaqinidagi eng sehrli tabiat burchi. Ohaktosh qoyalar orasidan oqib o'tuvchi tiniq daryo sohilida gullab-yashnagan o'rikzorlar va olmazorlar qo'ynida piknik qilish — bu esdan chiqmaydigan tajriba." },
    { id:9,  name:"Bostanliq Yaylovlari",       region:"Toshkent viloyati",  lat:41.100, lng:69.870, rating:4.8, distance:"62 km",  difficulty:"Oson",     season:"Aprel–Oktabr",  color:"#22C55E", tags:["Olma bog'i","Yaylov","Daryo","Foto"],                image:"https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=85", description:"Bostanliq — O'zbekistonning jannat deb atalgan burchagi. Bahor oylarida olma, shaftoli va o'rik bog'lari bir vaqtda gullashi natijasida hosil bo'ladigan oq-pushti gullар dengiziда sayr qilish ruhni to'ldiradi." },
  ],
  history:[
    { id:10, name:"Registon Maydoni",           region:"Samarqand shahari",  lat:39.654, lng:66.975, rating:4.9, distance:"350 km", difficulty:"Oson",     season:"Yil davomida",   color:"#F59E0B", tags:["UNESCO","Madrasalar","Kechki shou","Muzey"],         image:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&q=85", description:"UNESCO tomonidan Insoniyat Madaniy Merosi ro'yxatiga kiritilgan Registon — islom me'morchiligining eng ulug'vor yodgorliklaridan biri. Uch madrasaning muazzam peshtoqlari ko'k farang mozaikalar va oltin naqshlar bilan bezalgan." },
    { id:11, name:"Buxoro Eski Shahri",         region:"Buxoro shahari",     lat:39.773, lng:64.427, rating:4.9, distance:"570 km", difficulty:"Oson",     season:"Mart–Nov",       color:"#F59E0B", tags:["Qal'a","Bozor","Minora","Ipak yo'li"],               image:"https://images.unsplash.com/photo-1555993539-1732b0258235?w=900&q=85", description:"Ming yillik tarix nafasi seziluvchi Buxoro — Ipak yo'lining jonli yodgorligi. Kalon minorasi soyasidagi tor ko'chalarda yurish, hunarmand ustalar ishxonalaridan eshitiluvchi mis va kumush zarb tovushlari — bu qadimiy shaharga o'ziga xos mistik ruh bag'ishlaydi." },
    { id:12, name:"Xiva — Ichan Qal'a",         region:"Xorazm viloyati",    lat:41.378, lng:60.363, rating:4.8, distance:"980 km", difficulty:"Oson",     season:"Aprel–Oktabr",  color:"#F59E0B", tags:["UNESCO","Muzey","Bozor","Ipak gilamlari"],           image:"https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=85", description:"Xivaning Ichan Qal'asi — ochiq osmon ostidagi muzey. Loydan qurilgan uylar, masjidlar va minaralardan iborat bu shaharcha shunchalik yaxlit saqlanganki, go'yoki Xorazm xonligining oltin davriga qaytib kelgandek his qilasiz." },
  ],
  fishing:[
    { id:13, name:"Chorvoq — Karp Ovlash",      region:"Toshkent viloyati",  lat:41.560, lng:70.020, rating:4.7, distance:"75 km",  difficulty:"Oson",     season:"Yil davomida",   color:"#14B8A6", tags:["Karp","Zander","Trout","Qayiq ijarasi"],            image:"https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=900&q=85", description:"Chorvoq suv omboridagi baliq ovlash — O'zbekistondagi eng hosildor ovlash tajribasini beradi. Karp, zander va trout baliqlar ombor tubida to'p-to'p bo'lib yuradi. Erta tongda suv yuzasiga cho'zilgan tuman orasida ovlash o'ziga xos meditatsiya." },
    { id:14, name:"Sirdaryo Deltasi",           region:"Sirdaryo viloyati",  lat:40.830, lng:68.710, rating:4.5, distance:"120 km", difficulty:"Oson",     season:"Aprel–Oktabr",  color:"#14B8A6", tags:["Som","Sazан","Delta","Tungi ovlash"],                image:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85", description:"O'zbekistonning eng uzun daryosi — Sirdaryo — sayoz qirg'oqlarida yirik som va sazanlar yashaydi. Kechasi suv yuzasiga tushirilgan lipa yorug'ida baliqlarni jalb qilib ovlash mahalliy baliqchilarning asriy sirini ochib beradi." },
  ],
  desert:[
    { id:15, name:"Qizilqum Safari",            region:"Navoiy viloyati",    lat:41.500, lng:63.500, rating:4.8, distance:"500 km", difficulty:"O'rtacha", season:"Sentabr–Aprel",  color:"#F97316", tags:["Tuya safari","Yurt camp","Qum barxanlari","Off-road"], image:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=85", description:"Qizilqum — Markaziy Osiyoning ulug'vor qizil qumli sahrosi. Erta tong saforlari paytida qum barxanlarining soyasi ranglarni o'ynatadi. Tuyaning orqasida soatlab yurish va kechqurun yurt ichida milliy ovqatlar yeyish sizni boshqa dunyoga olib o'tadi." },
    { id:16, name:"Orol Dengizi Manzaralari",   region:"Qoraqalpog'iston",   lat:44.700, lng:58.400, rating:4.6, distance:"1200 km",difficulty:"O'rtacha", season:"Aprel–Oktabr",  color:"#F97316", tags:["Kemalar","Tuz tekisligi","Foto","Ekspeditsiya"],      image:"https://images.unsplash.com/photo-1547234935-80c7145ec969?w=900&q=85", description:"Orol dengizining qurigan tubi — insoniyat va tabiat munosabatlarining ibratli amfiteatri. Cho'l o'rtasida zanglab yotgan baliqchilik kemalarini ko'rish va bir paytlar dengiz bo'lgan pasttekislikda yurish — fotochilar uchun tengsiz ilhom manbai." },
  ],
};

/* ══════════════════════════════════════════════════════════════
   MARKER HTML (animated, glowing, 3D-like)
══════════════════════════════════════════════════════════════ */
function markerHTML(color, emoji, isSelected) {
  return `
<div style="
  position:relative;
  width:48px;height:56px;
  cursor:pointer;
  filter:drop-shadow(0 6px 18px ${color}88);
  animation:markerFloat 2.8s ease-in-out infinite;
  transform-origin:50% 100%;
">
  <style>
    @keyframes markerFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes pulseRing{0%{transform:scale(1);opacity:0.7}80%{transform:scale(2.4);opacity:0}100%{transform:scale(2.4);opacity:0}}
  </style>
  <!-- pulse ring -->
  <div style="
    position:absolute;bottom:4px;left:50%;transform:translateX(-50%);
    width:22px;height:22px;border-radius:50%;
    background:${color}55;
    animation:pulseRing 2.2s ease-out infinite;
  "></div>
  <div style="
    position:absolute;bottom:4px;left:50%;transform:translateX(-50%);
    width:22px;height:22px;border-radius:50%;
    background:${color}35;
    animation:pulseRing 2.2s ease-out infinite 0.7s;
  "></div>
  <!-- pin body -->
  <div style="
    position:absolute;top:0;left:50%;transform:translateX(-50%);
    width:40px;height:46px;
    border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;
    background:linear-gradient(145deg,${color},${color}bb);
    border:2.5px solid rgba(255,255,255,0.85);
    box-shadow:
      0 4px 16px ${color}66,
      0 2px 6px rgba(0,0,0,0.25),
      inset 0 2px 4px rgba(255,255,255,0.35);
    display:flex;align-items:center;justify-content:center;
    font-size:19px;
  ">
    ${emoji}
    <!-- inner shine -->
    <div style="
      position:absolute;top:4px;left:6px;right:6px;height:40%;
      background:linear-gradient(to bottom,rgba(255,255,255,0.45),transparent);
      border-radius:50%;
    "></div>
  </div>
  <!-- pin tip -->
  <div style="
    position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:0;height:0;
    border-left:7px solid transparent;
    border-right:7px solid transparent;
    border-top:14px solid ${color};
    filter:drop-shadow(0 3px 4px ${color}55);
  "></div>
</div>`;
}

/* ══════════════════════════════════════════════════════════════
   MAP CONTENT
══════════════════════════════════════════════════════════════ */
function MapContent() {
  const searchParams = useSearchParams();
  const mapRef      = useRef(null);
  const mapInst     = useRef(null);
  const markersRef  = useRef([]);
  const inited      = useRef(false);

  const [activeCat,  setActiveCat]  = useState(searchParams.get("category") || "mountains");
  const [selected,   setSelected]   = useState(null);
  const [mapReady,   setMapReady]   = useState(false);
  const [sidebarOpen,setSidebarOpen]= useState(true);

  const places  = ALL_PLACES[activeCat] || [];
  const catInfo = CATS.find(c => c.id === activeCat);

  /* ── INIT MAP ── */
useEffect(() => {
    if (inited.current) return;
    inited.current = true;

    import("maplibre-gl").then(({ default: maplibregl }) => {
      const container = mapRef.current;
      if (!container) return;

      // Tozalash ishlari
      if (mapInst.current) {
        mapInst.current.remove();
        mapInst.current = null;
      }

      const map = new maplibregl.Map({
        container,
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: [64.5, 41.0],
        zoom: 5.6,
        pitch: 52,
        bearing: -14,
        antialias: true,
      });

      map.on("load", () => {
        /* --- BUG FIX: setFog o'rniga --- */
        // MapLibre'da tuman (fog) property orqali tekshiriladi
        if (map.setFog) { 
            map.setFog({
              "range": [0.5, 10],
              "color": "#bad2eb",
              "horizon-blend": 0.025
            });
        } else {
            // Agar setFog ishlamasa, osmon (sky) qatlami orqali effekt beramiz
            map.setPaintProperty('sky', 'sky-atmosphere-color', 'rgba(186, 210, 235, 1)');
        }

        /* 3D Binolar (Extrusion) */
        // OpenFreeMap'da layer nomi 'building' bo'lmasligi mumkin, 
        // shuning uchun barcha binolarni qidiramiz
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(layer => layer.type === 'symbol' && layer.layout['text-field'])?.id;

        map.addLayer({
          id: "3d-buildings",
          source: "openmaptiles",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 12,
          paint: {
            "fill-extrusion-color": [
              "interpolate", ["linear"], ["zoom"],
              12, "#c9d4e0",
              15, "#e8eef5",
            ],
            "fill-extrusion-height": [
              "interpolate", ["linear"], ["zoom"],
              12, 0,
              12.05, ["coalesce", ["get", "render_height"], ["get", "height"], 8]
            ],
            "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], ["get", "min_height"], 0],
            "fill-extrusion-opacity": 0.8,
          },
        }, labelLayerId); // Binolar yozuvlarning tagida ko'rinishi uchun

        mapInst.current = map;
        setMapReady(true);
      });

      map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    });

    return () => {
      if (mapInst.current) {
        mapInst.current.remove();
        mapInst.current = null;
      }
      inited.current = false;
    };
  }, []);

  /* ── MARKERS ── */
  useEffect(() => {
    if (!mapReady || !mapInst.current) return;

    import("maplibre-gl").then(({ default: maplibregl }) => {
      const map = mapInst.current;
      if (!map) return;

      markersRef.current.forEach(m => { try { m.remove(); } catch {} });
      markersRef.current = [];

      places.forEach(place => {
        const el = document.createElement("div");
        el.innerHTML = markerHTML(place.color, catInfo?.emoji || "📍", false);

        const mk = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([place.lng, place.lat])
          .addTo(map);

        el.addEventListener("click", () => {
          setSelected(place);
          map.flyTo({
            center: [place.lng, place.lat],
            zoom: 12,
            pitch: 58,
            bearing: Math.random() * 60 - 30,
            duration: 2200,
            essential: true,
          });
        });

        markersRef.current.push(mk);
      });

      /* Fit bounds */
      try {
        const coords = places.map(p => [p.lng, p.lat]);
        if (coords.length > 1) {
          const lngs = coords.map(c => c[0]);
          const lats = coords.map(c => c[1]);
          map.fitBounds(
            [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
            { padding: { top:80, bottom:80, left: sidebarOpen ? 380 : 80, right: 80 }, maxZoom: 9, duration: 1600, pitch: 48 }
          );
        } else if (coords.length === 1) {
          map.flyTo({ center: coords[0], zoom: 10, pitch: 50, duration: 1200 });
        }
      } catch {}
    });
  }, [activeCat, mapReady, places, catInfo]);

  const switchCat = (id) => {
    if (id === activeCat) return;
    setActiveCat(id);
    setSelected(null);
  };

  return (
    <div style={{ position:"fixed", inset:0, top:64, display:"flex", overflow:"hidden" }}>

      {/* ══ SIDEBAR ══════════════════════════════ */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -360 }} animate={{ x: 0 }} exit={{ x: -360 }}
            transition={{ type:"spring", stiffness:300, damping:32 }}
            style={{
              width: 340, flexShrink:0, zIndex:20, display:"flex", flexDirection:"column",
              background:"rgba(255,255,255,0.9)",
              backdropFilter:"blur(24px) saturate(1.8)",
              WebkitBackdropFilter:"blur(24px) saturate(1.8)",
              borderRight:"1px solid rgba(0,0,0,0.08)",
              boxShadow:"4px 0 32px rgba(0,0,0,0.1)",
            }}
          >
            {/* Header */}
            <div style={{
              padding:"16px 18px 14px",
              background:"linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,58,95,0.96))",
              flexShrink:0,
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <Link href="/" style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontFamily:"'DM Sans',sans-serif", textDecoration:"none" }}>
                  ← Bosh sahifa
                </Link>
                <button onClick={() => setSidebarOpen(false)}
                  style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"rgba(255,255,255,0.5)", borderRadius:6, padding:"4px 8px", cursor:"pointer", fontSize:12 }}>
                  ✕
                </button>
              </div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#fff", marginBottom:4 }}>
                <em style={{
                  fontStyle:"italic",
                  background:"linear-gradient(90deg,#7DD3FC,#A78BFA)",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                }}>O'zbekiston</em> Xaritasi
              </div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.4)" }}>
                {places.length} ta joy · 3D Ko'rinish
              </div>
            </div>

            {/* Category pills */}
            <div style={{ padding:"12px 14px", borderBottom:"1px solid rgba(0,0,0,0.06)", flexShrink:0 }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {CATS.map(cat => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                    onClick={() => switchCat(cat.id)}
                    style={{
                      padding:"5px 12px", borderRadius:999, border:"none", cursor:"pointer",
                      fontFamily:"'DM Sans',sans-serif", fontSize:11,
                      fontWeight: activeCat===cat.id ? 700 : 400,
                      background: activeCat===cat.id ? cat.color : "rgba(0,0,0,0.05)",
                      color: activeCat===cat.id ? "#fff" : "#64748B",
                      boxShadow: activeCat===cat.id ? `0 4px 12px ${cat.glow}` : "none",
                      transition:"all 0.25s",
                      display:"flex", alignItems:"center", gap:5,
                    }}
                  >
                    <motion.span
                      animate={activeCat===cat.id ? { rotate:[0,-8,8,0] } : {}}
                      transition={{ duration:0.4 }}
                      style={{ fontSize:13 }}
                    >{cat.emoji}</motion.span>
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Place list */}
            <div style={{ flex:1, overflowY:"auto", padding:"8px 12px" }}>
              <AnimatePresence mode="popLayout">
                {places.map((place, i) => (
                  <motion.div
                    key={`${activeCat}-${place.id}`}
                    initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                    transition={{ delay:i*0.05, duration:0.35 }}
                  >
                    <SidebarCard
                      place={place}
                      catColor={catInfo?.color}
                      isSelected={selected?.id === place.id}
                      onClick={() => {
                        setSelected(selected?.id === place.id ? null : place);
                        if (mapInst.current) {
                          mapInst.current.flyTo({
                            center:[place.lng, place.lat], zoom:11,
                            pitch:55, bearing:Math.random()*50-25,
                            duration:1800, essential:true,
                          });
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar toggle */}
      {!sidebarOpen && (
        <motion.button
          initial={{ opacity:0 }} animate={{ opacity:1 }}
          whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
          onClick={() => setSidebarOpen(true)}
          style={{
            position:"absolute", top:16, left:16, zIndex:30,
            background:"rgba(255,255,255,0.88)",
            backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
            border:"1px solid rgba(255,255,255,0.6)",
            borderRadius:12, padding:"10px 16px", cursor:"pointer",
            boxShadow:"0 4px 20px rgba(0,0,0,0.12)",
            fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:600, color:"#0F172A",
            display:"flex", alignItems:"center", gap:8,
          }}
        >
          ☰ Joylar ro'yxati
        </motion.button>
      )}

      {/* ══ MAP ══════════════════════════════════ */}
      <div style={{ flex:1, position:"relative" }}>
        <div ref={mapRef} style={{ width:"100%", height:"100%", background:"#E8EEF5" }} />

        {/* Cat badge top-left */}
        <motion.div
          key={activeCat}
          initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
          style={{
            position:"absolute", top:16, left: sidebarOpen ? 16 : 80, zIndex:15,
            background:"rgba(255,255,255,0.88)",
            backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
            border:"1px solid rgba(255,255,255,0.65)",
            borderRadius:16, padding:"10px 18px",
            boxShadow:"0 4px 20px rgba(0,0,0,0.1)",
            display:"flex", alignItems:"center", gap:10,
            transition:"left 0.4s",
          }}
        >
          <motion.span
            animate={{ rotate:[0,10,-10,0] }}
            transition={{ duration:0.5, delay:0.2 }}
            style={{ fontSize:24 }}
          >{catInfo?.emoji}</motion.span>
          <div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:700, color:"#0F172A" }}>
              {catInfo?.label}
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#94A3B8" }}>
              {places.length} ta joy · 3D xarita
            </div>
          </div>
        </motion.div>

        {/* ══ DETAIL CARD ══ */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity:0, y:32, scale:0.95 }}
              animate={{ opacity:1, y:0, scale:1 }}
              exit={{ opacity:0, y:24, scale:0.95 }}
              transition={{ type:"spring", stiffness:280, damping:28 }}
              style={{
                position:"absolute", bottom:24, right:24, zIndex:25,
                width:340,
                background:"rgba(255,255,255,0.88)",
                backdropFilter:"blur(28px) saturate(1.8)",
                WebkitBackdropFilter:"blur(28px) saturate(1.8)",
                border:"1px solid rgba(255,255,255,0.7)",
                borderRadius:24, overflow:"hidden",
                boxShadow:`0 24px 64px rgba(0,0,0,0.2), 0 8px 24px ${selected.color}25`,
              }}
            >
              {/* Hero image */}
              <div style={{ position:"relative", height:180 }}>
                <motion.div
                  initial={{ scale:1.08 }} animate={{ scale:1 }}
                  transition={{ duration:0.7 }}
                  style={{
                    position:"absolute", inset:0,
                    backgroundImage:`url(${selected.image})`,
                    backgroundSize:"cover", backgroundPosition:"center",
                  }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.75),rgba(0,0,0,0.1) 55%,transparent)" }} />

                {/* Close */}
                <motion.button
                  whileHover={{ scale:1.1, rotate:90 }} whileTap={{ scale:0.9 }}
                  onClick={() => setSelected(null)}
                  style={{
                    position:"absolute", top:12, right:12,
                    width:30, height:30, borderRadius:"50%",
                    background:"rgba(0,0,0,0.45)", border:"0.5px solid rgba(255,255,255,0.3)",
                    color:"#fff", cursor:"pointer", fontSize:13,
                    display:"flex", alignItems:"center", justifyContent:"center",
                  }}
                >✕</motion.button>

                {/* Rating bubble */}
                <div style={{
                  position:"absolute", top:12, left:12,
                  background:"rgba(0,0,0,0.45)", backdropFilter:"blur(10px)",
                  border:"0.5px solid rgba(255,255,255,0.25)", borderRadius:999,
                  padding:"4px 10px", display:"flex", alignItems:"center", gap:4,
                  fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#FCD34D", fontWeight:700,
                }}>⭐ {selected.rating}</div>

                <div style={{ position:"absolute", bottom:14, left:16, right:16 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#fff", marginBottom:3, lineHeight:1.2 }}>
                    {selected.name}
                  </div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.7)" }}>
                    📍 {selected.region}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding:"16px 18px" }}>
                {/* Stat pills */}
                <div style={{ display:"flex", gap:7, marginBottom:13, flexWrap:"wrap" }}>
                  {[
                    { v:`🚗 ${selected.distance}`,  bg:"#F0F9FF", c:"#0EA5E9" },
                    { v:`⚡ ${selected.difficulty}`, bg:`${selected.color}14`, c:selected.color },
                    { v:`📅 ${selected.season?.split("–")[0]}+`, bg:"#F0FDF4", c:"#16A34A" },
                    ...(selected.altitude ? [{ v:`⛰️ ${selected.altitude}`, bg:"#F5F3FF", c:"#7C3AED" }] : []),
                  ].map((b,i) => (
                    <motion.span
                      key={b.v}
                      initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
                      transition={{ delay:i*0.05+0.1 }}
                      style={{
                        fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:500,
                        padding:"4px 10px", borderRadius:999,
                        background:b.bg, color:b.c,
                      }}
                    >{b.v}</motion.span>
                  ))}
                </div>

                <p style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:12.5, color:"#475569",
                  lineHeight:1.7, marginBottom:14,
                  display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden",
                }}>
                  {selected.description}
                </p>

                {/* Tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:16 }}>
                  {selected.tags.map((t,i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity:0 }} animate={{ opacity:1 }}
                      transition={{ delay:i*0.04+0.2 }}
                      style={{
                        fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:500,
                        padding:"3px 10px", borderRadius:999,
                        background:`${selected.color}14`,
                        border:`1px solid ${selected.color}30`,
                        color:selected.color,
                      }}
                    >{t}</motion.span>
                  ))}
                </div>

                {/* CTA row */}
                <div style={{ display:"flex", gap:8 }}>
                  <motion.div style={{ flex:1 }} whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}>
                    <Link href={`/explore?category=${activeCat}`} style={{
                      display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                      padding:"11px", borderRadius:12, textDecoration:"none",
                      background:`linear-gradient(135deg,${selected.color},${selected.color}bb)`,
                      color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:700,
                      boxShadow:`0 6px 20px ${selected.color}45`,
                    }}>
                      Batafsil Ko'rish →
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                    onClick={() => {
                      if (mapInst.current) {
                        mapInst.current.flyTo({
                          center:[selected.lng, selected.lat], zoom:14,
                          pitch:65, bearing:Math.random()*80-40,
                          duration:2000,
                        });
                      }
                    }}
                    style={{
                      padding:"11px 14px", borderRadius:12, border:"none", cursor:"pointer",
                      background:"rgba(0,0,0,0.06)", color:"#475569",
                      fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:600,
                    }}
                    title="3D da ko'rish"
                  >🎥</motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compass / pitch hint */}
        <div style={{
          position:"absolute", bottom:24, left: sidebarOpen ? 16 : 16, zIndex:15,
          background:"rgba(255,255,255,0.82)",
          backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
          borderRadius:12, padding:"8px 14px",
          border:"1px solid rgba(255,255,255,0.6)",
          boxShadow:"0 4px 16px rgba(0,0,0,0.08)",
          fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#64748B",
          display:"flex", alignItems:"center", gap:6,
        }}>
          <span style={{ fontSize:14 }}>🧭</span>
          Scroll — zoom · Ctrl+drag — 3D
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIDEBAR CARD
══════════════════════════════════════════════════════════════ */
function SidebarCard({ place, catColor, isSelected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ x: 3 }} whileTap={{ scale:0.98 }}
      style={{
        display:"flex", gap:12, padding:"10px 10px", borderRadius:14,
        cursor:"pointer", marginBottom:5,
        background: isSelected ? `${catColor}12` : hov ? "rgba(0,0,0,0.03)" : "transparent",
        border: isSelected ? `1.5px solid ${catColor}40` : "1.5px solid transparent",
        transition:"background 0.2s, border 0.2s",
      }}
    >
      <div style={{
        width:56, height:56, borderRadius:12, flexShrink:0, overflow:"hidden",
        boxShadow: isSelected ? `0 4px 12px ${catColor}40` : "0 2px 8px rgba(0,0,0,0.1)",
        transition:"box-shadow 0.2s",
      }}>
        <img src={place.image} alt={place.name}
          style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.3s" }}
          onMouseEnter={e => e.target.style.transform="scale(1.1)"}
          onMouseLeave={e => e.target.style.transform="scale(1)"}
        />
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, color:"#0F172A", marginBottom:2, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
          {place.name}
        </div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#94A3B8", marginBottom:5 }}>
          📍 {place.region}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#F59E0B", fontWeight:700 }}>⭐ {place.rating}</span>
          <span style={{ fontSize:10, color:"#CBD5E1" }}>·</span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:"#94A3B8" }}>{place.distance}</span>
          <span style={{ fontSize:10, color:"#CBD5E1" }}>·</span>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color: catColor, fontWeight:500 }}>{place.difficulty}</span>
        </div>
      </div>
      {isSelected && (
        <div style={{ display:"flex", alignItems:"center" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:catColor }} />
        </div>
      )}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function MapPage() {
  return (
    <div style={{ height:"100vh", overflow:"hidden" }}>
      <Navbar />
      <Suspense fallback={
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          height:"calc(100vh - 64px)", gap:12,
          background:"linear-gradient(135deg,#0F172A,#1E3A5F)",
        }}>
          <motion.div
            animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}
            style={{ width:22, height:22, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.15)", borderTopColor:"#7DD3FC" }}
          />
          <span style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,0.55)", fontSize:14 }}>
            3D Xarita yuklanmoqda...
          </span>
        </div>
      }>
        <MapContent />
      </Suspense>
    </div>
  );
}