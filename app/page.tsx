"use client";

import { useState, useEffect } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const T = {
  tn: {
    dir: "rtl" as const,
    label: "🇹🇳 تونسي",
    nav: {
      services: "خدماتنا",
      why: "علاش احنا",
      contact: "تواصل معانا",
      book: "أحجز مكالمة",
    },
    hero: {
      badge: "تونس · أسعار واضحة · شغل جدي",
      h1: "موقع ويب وحلول رقمية لمشروعك",
      sub: "نعاونوا أصحاب المشاريع في تونس يعملوا موقع احترافي، نظام حجز، أو شات بوت ذكي — كل شي يتعمل حسب نشاطهم.",
      cta1: "أحجز مكالمة مجانية",
      cta2: "شوف الأسعار",
      call: "اتصل بينا",
      wa: "إبعثلنا على واتساب",
    },
    svc: {
      badge: "خدماتنا وأسعارنا",
      h2: "شنوّا نجموا نعملولك؟",
      sub: "كل مشروع يتعمل من الصفر. ما نستعملوش قوالب جاهزة.",
      cards: [
        {
          price: "60 دينار",
          title: "موقع ويب احترافي",
          desc: "نعملولك موقع حسب ذوقك — الألوان، التصميم، والمحتوى كل شي على حسابك.",
        },
        {
          price: "60 دينار",
          title: "نظام حجز للمواعيد",
          desc: "عملاؤك يحجزوا مباشرة من الموقع وتوصلك رسالة بالبريد على كل حجز جديد.",
        },
        {
          price: "100 دينار",
          title: "شات بوت ذكي",
          desc: "مش شات بوت عادي. نعلموه على نشاطك وأسئلة عملاؤك — يجاوب بدلك 24 على 24.",
        },
      ],
      pkgBadge: "الأوفر",
      pkgTitle: "الباكاج الكامل",
      pkgPrice: "200 دينار",
      pkgOld: "220 دينار",
      pkgDesc: "موقع + نظام حجز + شات بوت. كل شي مع بعض بسعر أقل.",
      pkgCta1: "إبدا تونا",
      pkgCta2: "إسألنا على واتساب",
    },
    why: {
      badge: "علاش تختارنا؟",
      h2: "بسيط، مباشر، بلا تعقيد",
      cards: [
        { e: "💰", title: "أسعار واضحة", desc: "تعرف من الأول بالضبط شقدر تخلص. ما فماش مفاجآت." },
        { e: "📱", title: "تتكلم معانا مباشرة", desc: "تنجم تتصل بينا أو تكتبلنا على واتساب. ما فماش وسيط." },
        { e: "🎯", title: "كل شي يتعمل حسبك", desc: "ما نستعملوش قوالب. كل مشروع يتعمل من الصفر حسب نشاطك." },
        { e: "🤝", title: "موجودين بعد التسليم", desc: "بعد ما ننهيوا الشغل نبقاوا متاحين كي تحتاجنا." },
      ],
    },
    trust: {
      badge: "كيفاش نشتغلوا",
      h2: "تتكلم مع الناس اللي يعملوا ليك",
      cards: [
        { title: "من تونس", desc: "نفهموا السوق المحلي وكيفاش يفكر العميل التونسي." },
        { title: "دعم مباشر", desc: "تتعامل معانا مباشرة. ما فماش ticket ولا call center." },
        { title: "رد سريع", desc: "هاتف وواتساب. نجاوبوك في نفس اليوم." },
      ],
    },
    contact: {
      h2: "جاهز تبدا؟",
      sub: "اتصل بينا أو إبعثلنا على واتساب. نجاوبوك في نفس اليوم.",
      call: "اتصل بينا",
      wa: "واتساب",
      book: "أحجز مكالمة",
    },
    footer: {
      copy: "© 2025 AMtech. جميع الحقوق محفوظة.",
      services: "خدماتنا",
      why: "علاش احنا",
      book: "أحجز",
    },
  },

  fr: {
    dir: "ltr" as const,
    label: "🇫🇷 Français",
    nav: {
      services: "Services",
      why: "Pourquoi nous",
      contact: "Contact",
      book: "Réserver un appel",
    },
    hero: {
      badge: "Tunisie · Prix clairs · Travail sérieux",
      h1: "Sites web et solutions digitales pour votre business",
      sub: "On aide les entrepreneurs tunisiens à créer un site pro, un système de réservation, ou un chatbot IA — tout est fait selon votre activité.",
      cta1: "Réserver un appel gratuit",
      cta2: "Voir les tarifs",
      call: "Nous appeler",
      wa: "WhatsApp",
    },
    svc: {
      badge: "Nos services et tarifs",
      h2: "Ce qu'on peut faire pour vous",
      sub: "Chaque projet est fait from scratch. On n'utilise pas de templates.",
      cards: [
        {
          price: "60 TND",
          title: "Création de site web",
          desc: "Un site fait selon vos préférences — couleurs, design, contenu. Tout est personnalisé.",
        },
        {
          price: "60 TND",
          title: "Système de réservation",
          desc: "Vos clients réservent en ligne et vous recevez un email à chaque nouvelle réservation.",
        },
        {
          price: "100 TND",
          title: "Chatbot IA",
          desc: "Pas un bot générique. On le forme sur votre activité et vos questions fréquentes.",
        },
      ],
      pkgBadge: "Le plus populaire",
      pkgTitle: "Pack complet",
      pkgPrice: "200 TND",
      pkgOld: "220 TND",
      pkgDesc: "Site + réservation + chatbot IA. Tout inclus à prix réduit.",
      pkgCta1: "Commencer maintenant",
      pkgCta2: "Question sur WhatsApp",
    },
    why: {
      badge: "Pourquoi nous choisir",
      h2: "Simple, direct, sans complications",
      cards: [
        { e: "💰", title: "Prix clairs", desc: "Vous savez exactement ce que vous payez dès le départ. Pas de surprises." },
        { e: "📱", title: "Contact direct", desc: "Appelez ou écrivez sur WhatsApp. Pas d'intermédiaire, pas d'attente." },
        { e: "🎯", title: "Fait pour vous", desc: "Chaque projet est construit from scratch selon votre besoin." },
        { e: "🤝", title: "Disponibles après livraison", desc: "On reste joignables même après la fin du projet." },
      ],
    },
    trust: {
      badge: "Comment on travaille",
      h2: "Vous parlez directement à ceux qui font le travail",
      cards: [
        { title: "Basés en Tunisie", desc: "On connaît le marché local et les attentes des clients tunisiens." },
        { title: "Support direct", desc: "Pas de ticket, pas de call center. Vous traitez avec nous directement." },
        { title: "Réponse rapide", desc: "Téléphone et WhatsApp. On répond le même jour." },
      ],
    },
    contact: {
      h2: "Prêt à commencer ?",
      sub: "Appelez-nous ou écrivez sur WhatsApp. On répond le même jour.",
      call: "Nous appeler",
      wa: "WhatsApp",
      book: "Réserver un appel",
    },
    footer: {
      copy: "© 2025 AMtech. Tous droits réservés.",
      services: "Services",
      why: "Pourquoi nous",
      book: "Réserver",
    },
  },

  en: {
    dir: "ltr" as const,
    label: "🇬🇧 English",
    nav: {
      services: "Services",
      why: "Why us",
      contact: "Contact",
      book: "Book a call",
    },
    hero: {
      badge: "Tunisia · Clear pricing · Serious work",
      h1: "Websites and digital solutions for your business",
      sub: "We help Tunisian business owners build a professional website, an online booking system, or an AI chatbot — all made specifically for their work.",
      cta1: "Book a free call",
      cta2: "See pricing",
      call: "Call us",
      wa: "WhatsApp us",
    },
    svc: {
      badge: "Our services & pricing",
      h2: "What we can build for you",
      sub: "Every project is built from scratch. We don't use templates.",
      cards: [
        {
          price: "60 TND",
          title: "Professional website",
          desc: "A site built the way you want it — your colors, your layout, your content.",
        },
        {
          price: "60 TND",
          title: "Online booking system",
          desc: "Your customers book online and you get an email for every new appointment.",
        },
        {
          price: "100 TND",
          title: "AI chatbot",
          desc: "Not a generic bot. We train it on your business and your most common questions.",
        },
      ],
      pkgBadge: "Most popular",
      pkgTitle: "Complete package",
      pkgPrice: "200 TND",
      pkgOld: "220 TND",
      pkgDesc: "Website + booking system + AI chatbot. Everything included at a lower price.",
      pkgCta1: "Get started",
      pkgCta2: "Ask on WhatsApp",
    },
    why: {
      badge: "Why choose us",
      h2: "Simple, direct, no fuss",
      cards: [
        { e: "💰", title: "Clear pricing", desc: "You know exactly what you're paying upfront. No hidden costs." },
        { e: "📱", title: "Direct contact", desc: "Call or message us on WhatsApp. No middleman, no waiting." },
        { e: "🎯", title: "Made for you", desc: "Every project is built from scratch based on your needs." },
        { e: "🤝", title: "Here after delivery", desc: "We stay reachable even after the project is done." },
      ],
    },
    trust: {
      badge: "How we work",
      h2: "You talk directly to the people doing the work",
      cards: [
        { title: "Based in Tunisia", desc: "We know the local market and what Tunisian customers expect." },
        { title: "Direct support", desc: "No tickets, no call center. You deal with us directly." },
        { title: "Fast replies", desc: "Phone and WhatsApp. We get back to you the same day." },
      ],
    },
    contact: {
      h2: "Ready to start?",
      sub: "Call us or message us on WhatsApp. We get back to you the same day.",
      call: "Call us",
      wa: "WhatsApp us",
      book: "Book a call",
    },
    footer: {
      copy: "© 2025 AMtech. All rights reserved.",
      services: "Services",
      why: "Why us",
      book: "Book",
    },
  },
} as const;

type Lang = keyof typeof T;

// ─── SVG ICONS ────────────────────────────────────────────────────────────────

const Phone = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const Wa = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const SvcIcon = ({ i }: { i: number }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {i === 0 && <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>}
    {i === 1 && <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><circle cx="12" cy="16" r="1.5"/></>}
    {i === 2 && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>}
  </svg>
);

const TrustIcon = ({ i }: { i: number }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {i === 0 && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
    {i === 1 && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
    {i === 2 && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>}
  </svg>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("tn");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("amtech_lang") as Lang | null;
      if (saved && T[saved]) setLang(saved);
    } catch {}
    setReady(true);
  }, []);

  const pick = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("amtech_lang", l); } catch {}
  };

  const t = T[lang];
  const rtl = t.dir === "rtl";

  // Don't render until localStorage has been read — avoids flash of wrong language
  if (!ready) return null;

  return (
    <div dir={t.dir} style={{ background: "#fff", color: "#111", fontFamily: "var(--font-body)", minHeight: "100vh" }}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}

        @keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .fu {animation:fu .5s ease both}
        .d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}.d4{animation-delay:.28s}

        .nl{color:#555;font-size:.88rem;transition:color .18s}.nl:hover{color:#111}

        .lb{
          display:inline-flex;align-items:center;gap:6px;
          padding:8px 16px;border-radius:100px;font-size:13px;font-weight:500;
          cursor:pointer;border:1.5px solid #e5e5e5;background:#fff;color:#444;
          font-family:var(--font-body);white-space:nowrap;transition:all .18s
        }
        .lb:hover{border-color:#c4b5fd;color:#6B5CE7;background:#f5f3ff}
        .lb.on{background:#6B5CE7;color:#fff;border-color:#6B5CE7}

        .bd{
          display:inline-flex;align-items:center;gap:8px;
          background:#111;color:#fff;border:none;border-radius:10px;
          padding:14px 28px;font-size:15px;font-weight:600;
          cursor:pointer;font-family:var(--font-body);transition:background .18s,transform .15s
        }
        .bd:hover{background:#2a2a2a;transform:translateY(-1px)}

        .bo{
          display:inline-flex;align-items:center;gap:8px;
          background:#fff;color:#111;border:1.5px solid #ddd;border-radius:10px;
          padding:14px 28px;font-size:15px;font-weight:500;
          cursor:pointer;font-family:var(--font-body);transition:border-color .18s,transform .15s
        }
        .bo:hover{border-color:#999;transform:translateY(-1px)}

        .bc{
          display:inline-flex;align-items:center;gap:8px;
          background:#111;color:#fff;border:none;border-radius:10px;
          padding:13px 24px;font-size:14px;font-weight:500;
          cursor:pointer;font-family:var(--font-body);transition:background .18s,transform .15s
        }
        .bc:hover{background:#2a2a2a;transform:translateY(-1px)}

        .bw{
          display:inline-flex;align-items:center;gap:8px;
          background:#22c55e;color:#fff;border:none;border-radius:10px;
          padding:13px 24px;font-size:14px;font-weight:500;
          cursor:pointer;font-family:var(--font-body);transition:background .18s,transform .15s
        }
        .bw:hover{background:#16a34a;transform:translateY(-1px)}

        .sc{
          background:#fff;border:1.5px solid #ebebeb;border-radius:18px;padding:28px 24px;
          transition:border-color .2s,box-shadow .2s,transform .2s
        }
        .sc:hover{border-color:#c4b5fd;box-shadow:0 8px 28px rgba(139,124,246,.1);transform:translateY(-3px)}

        .wc{
          background:#fafafa;border:1px solid #f0f0f0;border-radius:14px;padding:22px 18px;
          transition:background .2s,border-color .2s
        }
        .wc:hover{background:#f5f3ff;border-color:#ddd8ff}

        .tc{
          display:flex;align-items:flex-start;gap:13px;
          background:#fff;border:1px solid #f0f0f0;border-radius:14px;padding:19px 17px
        }

        .ico{
          width:42px;height:42px;border-radius:11px;background:#f5f3ff;
          display:flex;align-items:center;justify-content:center;flex-shrink:0
        }

        .pkg{
          background:#111;border-radius:20px;padding:38px 34px;
          color:#fff;position:relative;overflow:hidden
        }
        .pkg::after{
          content:'';position:absolute;top:-70px;right:-70px;
          width:210px;height:210px;
          background:radial-gradient(circle,rgba(139,124,246,.22) 0%,transparent 70%);
          pointer-events:none
        }

        .bdt{font-size:11px;font-weight:600;letter-spacing:.13em;text-transform:uppercase;color:#8B7CF6;margin-bottom:11px}
        .sh{font-size:clamp(1.85rem,3vw,2.65rem);font-weight:700;color:#111;line-height:1.15;letter-spacing:-.03em;margin-bottom:11px}
        .ss{font-size:15px;color:#666;line-height:1.75}

        .wrap{max-width:1060px;margin:0 auto}
        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .g2{display:grid;grid-template-columns:repeat(2,1fr);gap:13px}
        .row{display:flex;gap:10px;flex-wrap:wrap}

        @media(max-width:840px){
          .g3{grid-template-columns:1fr !important}
          .g2{grid-template-columns:1fr !important}
          .nhide{display:none !important}
          .pkg{padding:26px 20px !important}
        }
        @media(max-width:540px){
          .lb{padding:7px 11px !important;font-size:12px !important}
          .px{padding-left:20px !important;padding-right:20px !important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:50,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 42px",height:"67px",gap:"12px",
        background:"rgba(255,255,255,.95)",backdropFilter:"blur(14px)",
        borderBottom:"1px solid #f0f0f0",
      }}>
        <span style={{fontSize:"19px",fontWeight:700,color:"#111",letterSpacing:"-.03em",flexShrink:0}}>
          AM<span style={{color:"#8B7CF6"}}>tech</span>
        </span>

        {/* Language buttons */}
        <div style={{display:"flex",gap:"7px"}}>
          {(["tn","fr","en"] as Lang[]).map(l => (
            <button key={l} className={`lb${lang===l?" on":""}`} onClick={() => pick(l)}>
              {T[l].label}
            </button>
          ))}
        </div>

        <div className="nhide" style={{display:"flex",gap:"24px"}}>
          <a href="#services" className="nl">{t.nav.services}</a>
          <a href="#why" className="nl">{t.nav.why}</a>
          <a href="#contact" className="nl">{t.nav.contact}</a>
        </div>

        <a href="/book" className="bd" style={{padding:"9px 17px",fontSize:"13px",borderRadius:"8px",flexShrink:0}}>
          {t.nav.book}
        </a>
      </nav>

      {/* HERO */}
      <section style={{paddingTop:"124px",paddingBottom:"76px",paddingLeft:"48px",paddingRight:"48px"}} className="px">
        <div className="wrap">
          <div className="fu" style={{marginBottom:"16px"}}>
            <span style={{
              display:"inline-block",background:"#f5f3ff",color:"#6B5CE7",
              fontSize:"12px",fontWeight:600,letterSpacing:".07em",
              padding:"6px 14px",borderRadius:"100px",border:"1px solid #e0dbff",
            }}>{t.hero.badge}</span>
          </div>

          <h1 className="fu d1" style={{
            fontSize:"clamp(2.5rem,5.5vw,4.7rem)",fontWeight:700,
            lineHeight:1.06,letterSpacing:"-.04em",color:"#111",
            marginBottom:"20px",maxWidth:"800px",
          }}>
            {t.hero.h1.split(" ").slice(0,-1).join(" ")}{" "}
            <span style={{color:"#8B7CF6"}}>{t.hero.h1.split(" ").slice(-1)}</span>
          </h1>

          <p className="fu d2" style={{fontSize:"17px",color:"#555",lineHeight:1.8,maxWidth:"520px",marginBottom:"36px"}}>
            {t.hero.sub}
          </p>

          <div className="fu d3 row" style={{marginBottom:"20px"}}>
            <a href="/book" className="bd" style={{padding:"15px 30px",fontSize:"15px"}}>{t.hero.cta1}</a>
            <a href="#services" className="bo" style={{padding:"15px 30px",fontSize:"15px"}}>{t.hero.cta2}</a>
          </div>

          <div className="fu d4 row">
            <a href="tel:+21654012506" className="bc"><Phone />{t.hero.call} · 54 012 506</a>
            <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="bw"><Wa />{t.hero.wa} · 93 826 499</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{padding:"72px 48px",background:"#fafafa",borderTop:"1px solid #f0f0f0",borderBottom:"1px solid #f0f0f0"}} className="px">
        <div className="wrap">
          <div className="bdt">{t.svc.badge}</div>
          <div className="sh">{t.svc.h2}</div>
          <p className="ss" style={{marginBottom:"42px"}}>{t.svc.sub}</p>

          <div className="g3" style={{marginBottom:"20px"}}>
            {t.svc.cards.map((c,i) => (
              <div key={i} className="sc">
                <div className="ico" style={{marginBottom:"16px"}}><SvcIcon i={i} /></div>
                <div style={{fontSize:"27px",fontWeight:700,color:"#111",letterSpacing:"-.04em",marginBottom:"4px"}}>{c.price}</div>
                <div style={{fontSize:"15px",fontWeight:600,color:"#111",marginBottom:"10px"}}>{c.title}</div>
                <p style={{fontSize:"13.5px",color:"#666",lineHeight:1.75}}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Package */}
          <div className="pkg">
            <div style={{
              position:"absolute",top:"20px",
              ...(rtl?{left:"22px"}:{right:"22px"}),
              background:"#8B7CF6",color:"#fff",fontSize:"11px",fontWeight:700,
              letterSpacing:".08em",padding:"4px 12px",borderRadius:"100px",zIndex:1,
            }}>{t.svc.pkgBadge}</div>

            <div style={{fontSize:"12px",color:"#888",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"12px"}}>
              {t.svc.pkgTitle}
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:"12px",marginBottom:"10px",flexWrap:"wrap"}}>
              <span style={{fontSize:"48px",fontWeight:700,letterSpacing:"-.05em",color:"#fff",lineHeight:1}}>{t.svc.pkgPrice}</span>
              <span style={{fontSize:"20px",color:"#555",textDecoration:"line-through"}}>{t.svc.pkgOld}</span>
            </div>
            <p style={{fontSize:"15px",color:"#999",marginBottom:"28px",lineHeight:1.7,maxWidth:"480px"}}>{t.svc.pkgDesc}</p>
            <div className="row">
              <a href="/book" style={{
                display:"inline-flex",alignItems:"center",gap:"7px",
                background:"#fff",color:"#111",padding:"13px 26px",
                borderRadius:"10px",fontSize:"14px",fontWeight:600,
              }}>{t.svc.pkgCta1}</a>
              <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" style={{
                display:"inline-flex",alignItems:"center",gap:"7px",
                background:"rgba(255,255,255,.08)",color:"#fff",
                border:"1.5px solid rgba(255,255,255,.18)",
                padding:"13px 26px",borderRadius:"10px",fontSize:"14px",
              }}><Wa />{t.svc.pkgCta2}</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" style={{padding:"72px 48px",background:"#fff"}} className="px">
        <div className="wrap">
          <div className="bdt">{t.why.badge}</div>
          <div className="sh" style={{marginBottom:"40px"}}>{t.why.h2}</div>
          <div className="g2">
            {t.why.cards.map((c,i) => (
              <div key={i} className="wc">
                <div style={{fontSize:"25px",marginBottom:"10px"}}>{c.e}</div>
                <div style={{fontSize:"15px",fontWeight:600,color:"#111",marginBottom:"6px"}}>{c.title}</div>
                <p style={{fontSize:"13.5px",color:"#666",lineHeight:1.75}}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{padding:"72px 48px",background:"#fafafa",borderTop:"1px solid #f0f0f0",borderBottom:"1px solid #f0f0f0"}} className="px">
        <div className="wrap">
          <div className="bdt">{t.trust.badge}</div>
          <div className="sh" style={{marginBottom:"38px"}}>{t.trust.h2}</div>
          <div className="g3">
            {t.trust.cards.map((c,i) => (
              <div key={i} className="tc">
                <div className="ico"><TrustIcon i={i} /></div>
                <div>
                  <div style={{fontSize:"14px",fontWeight:600,color:"#111",marginBottom:"4px"}}>{c.title}</div>
                  <p style={{fontSize:"13px",color:"#777",lineHeight:1.7}}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"90px 48px"}} className="px">
        <div style={{maxWidth:"580px",margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontSize:"clamp(1.9rem,3.6vw,2.9rem)",fontWeight:700,color:"#111",letterSpacing:"-.035em",marginBottom:"14px"}}>
            {t.contact.h2}
          </h2>
          <p style={{fontSize:"16px",color:"#555",lineHeight:1.8,marginBottom:"40px"}}>{t.contact.sub}</p>
          <div className="row" style={{justifyContent:"center"}}>
            <a href="tel:+21654012506" className="bc" style={{fontSize:"14px"}}><Phone />{t.contact.call}</a>
            <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="bw" style={{fontSize:"14px"}}><Wa />{t.contact.wa}</a>
            <a href="/book" className="bo" style={{fontSize:"14px"}}>{t.contact.book}</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding:"20px 48px",borderTop:"1px solid #f0f0f0",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        flexWrap:"wrap",gap:"11px",
      }}>
        <span style={{fontSize:"17px",fontWeight:700,color:"#111",letterSpacing:"-.03em"}}>
          AM<span style={{color:"#8B7CF6"}}>tech</span>
        </span>
        <p style={{fontSize:"13px",color:"#aaa"}}>{t.footer.copy}</p>
        <div style={{display:"flex",gap:"20px"}}>
          <a href="#services" style={{fontSize:"13px",color:"#aaa"}}>{t.footer.services}</a>
          <a href="#why" style={{fontSize:"13px",color:"#aaa"}}>{t.footer.why}</a>
          <a href="/book" style={{fontSize:"13px",color:"#aaa"}}>{t.footer.book}</a>
        </div>
      </footer>
    </div>
  );
}
