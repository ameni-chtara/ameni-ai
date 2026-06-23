"use client";

import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS (unchanged) ─────────────────────────────────────────────────

const T = {
  tn: {
    dir: "rtl" as const,
    label: "🇹🇳 تونسي",
    nav: { services: "خدماتنا", why: "علاش احنا", contact: "تواصل معانا", book: "أحجز مكالمة" },
    hero: {
      badge: "تونس · أسعار واضحة · شغل جدي",
      h1: "موقع ويب وحلول رقمية لمشروعك",
      sub: "نعاونوا أصحاب المشاريع في تونس يعملوا موقع احترافي، نظام حجز، أو شات بوت ذكي — كل شي يتعمل حسب نشاطهم.",
      cta1: "أحجز مكالمة مجانية", cta2: "شوف الأسعار",
      call: "اتصل بينا", wa: "إبعثلنا على واتساب",
    },
    svc: {
      badge: "خدماتنا وأسعارنا", h2: "شنوّا نجموا نعملولك؟",
      sub: "كل مشروع يتعمل من الصفر. ما نستعملوش قوالب جاهزة.",
      cards: [
        { price: "60 دينار", title: "موقع ويب احترافي", desc: "نعملولك موقع حسب ذوقك — الألوان، التصميم، والمحتوى كل شي على حسابك." },
        { price: "60 دينار", title: "نظام حجز للمواعيد", desc: "عملاؤك يحجزوا مباشرة من الموقع وتوصلك رسالة بالبريد على كل حجز جديد." },
        { price: "100 دينار", title: "شات بوت ذكي", desc: "مش شات بوت عادي. نعلموه على نشاطك وأسئلة عملاؤك — يجاوب بدلك 24 على 24." },
      ],
      pkgBadge: "الأوفر", pkgTitle: "الباكاج الكامل",
      pkgPrice: "200 دينار", pkgOld: "220 دينار",
      pkgDesc: "موقع + نظام حجز + شات بوت. كل شي مع بعض بسعر أقل.",
      pkgCta1: "إبدا تونا", pkgCta2: "إسألنا على واتساب",
    },
    why: {
      badge: "علاش تختارنا؟", h2: "بسيط، مباشر، بلا تعقيد",
      cards: [
        { e: "💰", title: "أسعار واضحة", desc: "تعرف من الأول بالضبط شقدر تخلص. ما فماش مفاجآت." },
        { e: "📱", title: "تتكلم معانا مباشرة", desc: "تنجم تتصل بينا أو تكتبلنا على واتساب. ما فماش وسيط." },
        { e: "🎯", title: "كل شي يتعمل حسبك", desc: "ما نستعملوش قوالب. كل مشروع يتعمل من الصفر حسب نشاطك." },
        { e: "🤝", title: "موجودين بعد التسليم", desc: "بعد ما ننهيوا الشغل نبقاوا متاحين كي تحتاجنا." },
      ],
    },
    trust: {
      badge: "كيفاش نشتغلوا", h2: "تتكلم مع الناس اللي يعملوا ليك",
      cards: [
        { title: "من تونس", desc: "نفهموا السوق المحلي وكيفاش يفكر العميل التونسي." },
        { title: "دعم مباشر", desc: "تتعامل معانا مباشرة. ما فماش ticket ولا call center." },
        { title: "رد سريع", desc: "هاتف وواتساب. نجاوبوك في نفس اليوم." },
      ],
    },
    contact: { h2: "جاهز تبدا؟", sub: "اتصل بينا أو إبعثلنا على واتساب. نجاوبوك في نفس اليوم.", call: "اتصل بينا", wa: "واتساب", book: "أحجز مكالمة" },
    footer: { copy: "© 2025 AMtech. جميع الحقوق محفوظة.", services: "خدماتنا", why: "علاش احنا", book: "أحجز" },
  },
  fr: {
    dir: "ltr" as const,
    label: "🇫🇷 Français",
    nav: { services: "Services", why: "Pourquoi nous", contact: "Contact", book: "Réserver un appel" },
    hero: {
      badge: "Tunisie · Prix clairs · Travail sérieux",
      h1: "Sites web et solutions digitales pour votre business",
      sub: "On aide les entrepreneurs tunisiens à créer un site pro, un système de réservation, ou un chatbot IA — tout est fait selon votre activité.",
      cta1: "Réserver un appel gratuit", cta2: "Voir les tarifs",
      call: "Nous appeler", wa: "WhatsApp",
    },
    svc: {
      badge: "Nos services et tarifs", h2: "Ce qu'on peut faire pour vous",
      sub: "Chaque projet est fait from scratch. On n'utilise pas de templates.",
      cards: [
        { price: "60 TND", title: "Création de site web", desc: "Un site fait selon vos préférences — couleurs, design, contenu. Tout est personnalisé." },
        { price: "60 TND", title: "Système de réservation", desc: "Vos clients réservent en ligne et vous recevez un email à chaque nouvelle réservation." },
        { price: "100 TND", title: "Chatbot IA", desc: "Pas un bot générique. On le forme sur votre activité et vos questions fréquentes." },
      ],
      pkgBadge: "Le plus populaire", pkgTitle: "Pack complet",
      pkgPrice: "200 TND", pkgOld: "220 TND",
      pkgDesc: "Site + réservation + chatbot IA. Tout inclus à prix réduit.",
      pkgCta1: "Commencer maintenant", pkgCta2: "Question sur WhatsApp",
    },
    why: {
      badge: "Pourquoi nous choisir", h2: "Simple, direct, sans complications",
      cards: [
        { e: "💰", title: "Prix clairs", desc: "Vous savez exactement ce que vous payez dès le départ. Pas de surprises." },
        { e: "📱", title: "Contact direct", desc: "Appelez ou écrivez sur WhatsApp. Pas d'intermédiaire, pas d'attente." },
        { e: "🎯", title: "Fait pour vous", desc: "Chaque projet est construit from scratch selon votre besoin." },
        { e: "🤝", title: "Disponibles après livraison", desc: "On reste joignables même après la fin du projet." },
      ],
    },
    trust: {
      badge: "Comment on travaille", h2: "Vous parlez directement à ceux qui font le travail",
      cards: [
        { title: "Basés en Tunisie", desc: "On connaît le marché local et les attentes des clients tunisiens." },
        { title: "Support direct", desc: "Pas de ticket, pas de call center. Vous traitez avec nous directement." },
        { title: "Réponse rapide", desc: "Téléphone et WhatsApp. On répond le même jour." },
      ],
    },
    contact: { h2: "Prêt à commencer ?", sub: "Appelez-nous ou écrivez sur WhatsApp. On répond le même jour.", call: "Nous appeler", wa: "WhatsApp", book: "Réserver un appel" },
    footer: { copy: "© 2025 AMtech. Tous droits réservés.", services: "Services", why: "Pourquoi nous", book: "Réserver" },
  },
  en: {
    dir: "ltr" as const,
    label: "🇬🇧 English",
    nav: { services: "Services", why: "Why us", contact: "Contact", book: "Book a call" },
    hero: {
      badge: "Tunisia · Clear pricing · Serious work",
      h1: "Websites and digital solutions for your business",
      sub: "We help Tunisian business owners build a professional website, an online booking system, or an AI chatbot — all made specifically for their work.",
      cta1: "Book a free call", cta2: "See pricing",
      call: "Call us", wa: "WhatsApp us",
    },
    svc: {
      badge: "Our services & pricing", h2: "What we can build for you",
      sub: "Every project is built from scratch. We don't use templates.",
      cards: [
        { price: "60 TND", title: "Professional website", desc: "A site built the way you want it — your colors, your layout, your content." },
        { price: "60 TND", title: "Online booking system", desc: "Your customers book online and you get an email for every new appointment." },
        { price: "100 TND", title: "AI chatbot", desc: "Not a generic bot. We train it on your business and your most common questions." },
      ],
      pkgBadge: "Most popular", pkgTitle: "Complete package",
      pkgPrice: "200 TND", pkgOld: "220 TND",
      pkgDesc: "Website + booking system + AI chatbot. Everything included at a lower price.",
      pkgCta1: "Get started", pkgCta2: "Ask on WhatsApp",
    },
    why: {
      badge: "Why choose us", h2: "Simple, direct, no fuss",
      cards: [
        { e: "💰", title: "Clear pricing", desc: "You know exactly what you're paying upfront. No hidden costs." },
        { e: "📱", title: "Direct contact", desc: "Call or message us on WhatsApp. No middleman, no waiting." },
        { e: "🎯", title: "Made for you", desc: "Every project is built from scratch based on your needs." },
        { e: "🤝", title: "Here after delivery", desc: "We stay reachable even after the project is done." },
      ],
    },
    trust: {
      badge: "How we work", h2: "You talk directly to the people doing the work",
      cards: [
        { title: "Based in Tunisia", desc: "We know the local market and what Tunisian customers expect." },
        { title: "Direct support", desc: "No tickets, no call center. You deal with us directly." },
        { title: "Fast replies", desc: "Phone and WhatsApp. We get back to you the same day." },
      ],
    },
    contact: { h2: "Ready to start?", sub: "Call us or message us on WhatsApp. We get back to you the same day.", call: "Call us", wa: "WhatsApp us", book: "Book a call" },
    footer: { copy: "© 2025 AMtech. All rights reserved.", services: "Services", why: "Why us", book: "Book" },
  },
} as const;

type Lang = keyof typeof T;

// ─── ICONS ───────────────────────────────────────────────────────────────────

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
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {i === 0 && <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>}
    {i === 1 && <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><circle cx="12" cy="16" r="1.5"/></>}
    {i === 2 && <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>}
  </svg>
);

const TrustIcon = ({ i }: { i: number }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {i === 0 && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>}
    {i === 1 && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
    {i === 2 && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>}
  </svg>
);

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("tn");
  const [ready, setReady] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("amtech_lang") as Lang | null;
      if (saved && T[saved]) setLang(saved);
    } catch {}
    setReady(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pick = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("amtech_lang", l); } catch {}
  };

  const t = T[lang];
  const rtl = t.dir === "rtl";

  if (!ready) return null;

  return (
    <div dir={t.dir} style={{ background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-body)", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::selection { background: #e0d9ff; }

        /* NAV */
        .nav-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 64px; gap: 14px;
          transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .nav-scrolled {
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.04);
        }
        .nav-top { background: transparent; border-bottom: 1px solid transparent; }

        .nav-logo { font-size: 20px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.035em; flex-shrink: 0; }
        .nav-logo span { background: linear-gradient(135deg, #7c3aed, #4f46e5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .nav-link { color: #555; font-size: 0.875rem; letter-spacing: -0.01em; transition: color 0.18s; }
        .nav-link:hover { color: #0a0a0a; }

        /* LANG BUTTONS */
        .lb {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 8px;
          font-size: 12.5px; font-weight: 500; cursor: pointer;
          border: 1px solid #e8e8e8; background: #fff; color: #444;
          font-family: var(--font-body); white-space: nowrap;
          transition: all 0.18s; letter-spacing: -0.01em;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }
        .lb:hover { border-color: #c4b5fd; color: #5b21b6; background: #faf5ff; }
        .lb.on { background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; border-color: transparent; box-shadow: 0 2px 8px rgba(124,58,237,0.3); }

        /* CTA BUTTONS */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          color: #fff; border: none; border-radius: 10px;
          padding: 13px 24px; font-size: 14.5px; font-weight: 600;
          cursor: pointer; font-family: var(--font-body);
          box-shadow: 0 4px 14px rgba(124,58,237,0.35), 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.18s;
          letter-spacing: -0.01em; position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          pointer-events: none;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(124,58,237,0.4), 0 2px 6px rgba(0,0,0,0.1); }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.8); color: #1a1a1a;
          border: 1px solid rgba(0,0,0,0.1); border-radius: 10px;
          padding: 13px 24px; font-size: 14.5px; font-weight: 500;
          cursor: pointer; font-family: var(--font-body);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          transition: transform 0.2s, box-shadow 0.2s, background 0.18s;
          letter-spacing: -0.01em;
        }
        .btn-ghost:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: #fff; }

        .btn-call {
          display: inline-flex; align-items: center; gap: 9px;
          background: #0a0a0a; color: #fff; border: none; border-radius: 10px;
          padding: 12px 22px; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: var(--font-body);
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: -0.01em;
        }
        .btn-call:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,0.2); }

        .btn-wa {
          display: inline-flex; align-items: center; gap: 9px;
          background: #22c55e; color: #fff; border: none; border-radius: 10px;
          padding: 12px 22px; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: var(--font-body);
          box-shadow: 0 2px 8px rgba(34,197,94,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
          letter-spacing: -0.01em;
        }
        .btn-wa:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(34,197,94,0.4); }

        /* HERO */
        .hero-section {
          min-height: 100vh; display: flex; align-items: center;
          padding: 120px 48px 80px;
          position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(79,70,229,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 50%);
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, black 0%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 0%, black 0%, transparent 100%);
        }
        .hero-orb {
          position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
          animation: float 8s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.03); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(16px) scale(0.97); }
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,0.06); border: 1px solid rgba(124,58,237,0.18);
          color: #6d28d9; font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
          padding: 6px 14px; border-radius: 100px;
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
        }
        .hero-badge-dot { width: 6px; height: 6px; background: #7c3aed; border-radius: 50%; animation: ping 2s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }

        .gradient-text {
          background: linear-gradient(135deg, #0a0a0a 0%, #0a0a0a 40%, #7c3aed 70%, #4f46e5 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* SECTION */
        .section { padding: 100px 48px; }
        .section-alt { background: #fafafa; }
        .section-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #7c3aed; margin-bottom: 16px;
        }
        .section-label::before { content: ''; width: 16px; height: 1.5px; background: currentColor; display: inline-block; }
        .section-h { font-size: clamp(1.9rem, 3vw, 2.75rem); font-weight: 700; color: #0a0a0a; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 14px; }
        .section-sub { font-size: 16px; color: #666; line-height: 1.75; max-width: 520px; }

        /* GLASS CARD */
        .glass-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 28px 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
          transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
          position: relative; overflow: hidden;
        }
        .glass-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.02) 0%, transparent 60%);
          pointer-events: none; border-radius: inherit;
        }
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(124,58,237,0.1);
          border-color: rgba(124,58,237,0.2);
        }

        .svc-icon {
          width: 46px; height: 46px; border-radius: 12px; margin-bottom: 18px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, #f5f3ff, #ede9fe);
          color: #7c3aed;
          box-shadow: 0 2px 8px rgba(124,58,237,0.15);
        }

        /* PKG CARD */
        .pkg-card {
          border-radius: 24px; padding: 44px 40px;
          background: linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #1e1b4b 100%);
          position: relative; overflow: hidden;
          box-shadow: 0 20px 60px rgba(79,46,229,0.25), 0 4px 16px rgba(0,0,0,0.15);
        }
        .pkg-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 60% at 80% 20%, rgba(167,139,250,0.15) 0%, transparent 60%),
                      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,102,241,0.12) 0%, transparent 60%);
        }
        .pkg-shine {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%);
        }

        /* WHY CARD */
        .why-card {
          background: #fff; border: 1px solid #f0f0f0; border-radius: 18px; padding: 26px 22px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .why-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.07); border-color: #e0d9ff; }

        /* TRUST CARD */
        .trust-card {
          display: flex; align-items: flex-start; gap: 14px;
          background: #fff; border: 1px solid #f0f0f0; border-radius: 16px; padding: 20px 18px;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .trust-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); border-color: #e0d9ff; }
        .trust-ico {
          width: 38px; height: 38px; flex-shrink: 0; border-radius: 10px;
          background: linear-gradient(135deg, #f5f3ff, #ede9fe);
          display: flex; align-items: center; justify-content: center;
          color: #7c3aed;
        }

        /* CONTACT SECTION */
        .contact-section {
          padding: 120px 48px;
          background: linear-gradient(180deg, #fff 0%, #faf8ff 100%);
          text-align: center;
          position: relative; overflow: hidden;
        }
        .contact-section::before {
          content: ''; position: absolute;
          top: -100px; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* GRID */
        .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
        .row { display: flex; gap: 10px; flex-wrap: wrap; }
        .wrap { max-width: 1060px; margin: 0 auto; }

        /* FOOTER */
        .footer-wrap {
          padding: 28px 48px; border-top: 1px solid #f0f0f0;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
          background: #fff;
        }

        /* SCROLL INDICATOR */
        .scroll-line { width: 1px; height: 60px; background: linear-gradient(to bottom, #7c3aed, transparent); margin: 0 auto; animation: scrollDown 2s ease-in-out infinite; }
        @keyframes scrollDown { 0% { opacity: 0; transform: scaleY(0); transform-origin: top; } 50% { opacity: 1; transform: scaleY(1); } 100% { opacity: 0; transform: scaleY(1); transform-origin: bottom; } }

        /* NAV BOOK BTN */
        .nav-book {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          color: #fff; border: none; border-radius: 8px;
          padding: 8px 16px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: var(--font-body); flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(124,58,237,0.3);
          transition: box-shadow 0.2s, transform 0.2s;
          letter-spacing: -0.01em;
        }
        .nav-book:hover { box-shadow: 0 4px 14px rgba(124,58,237,0.4); transform: translateY(-1px); }

        /* DIVIDER */
        .section-divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(124,58,237,0.15), transparent); }

        @media (max-width: 860px) {
          .g3 { grid-template-columns: 1fr !important; }
          .g2 { grid-template-columns: 1fr !important; }
          .nhide { display: none !important; }
          .pkg-card { padding: 28px 22px !important; }
          .hero-section { padding: 100px 24px 60px; min-height: auto; }
          .section { padding: 72px 24px; }
          .contact-section { padding: 80px 24px; }
          .footer-wrap { padding: 22px 24px; }
          .nav-wrap { padding: 0 20px; }
        }
        @media (max-width: 540px) {
          .lb { padding: 6px 10px; font-size: 11.5px; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className={`nav-wrap ${scrolled ? "nav-scrolled" : "nav-top"}`}>
        <span className="nav-logo">AM<span>tech</span></span>

        <div style={{ display: "flex", gap: "6px" }}>
          {(["tn", "fr", "en"] as Lang[]).map(l => (
            <button key={l} className={`lb${lang === l ? " on" : ""}`} onClick={() => pick(l)}>
              {T[l].label}
            </button>
          ))}
        </div>

        <div className="nhide" style={{ display: "flex", gap: "28px" }}>
          <a href="#services" className="nav-link">{t.nav.services}</a>
          <a href="#why" className="nav-link">{t.nav.why}</a>
          <a href="#contact" className="nav-link">{t.nav.contact}</a>
        </div>

        <a href="/book" className="nav-book">{t.nav.book}</a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-orb" style={{ width: 500, height: 500, top: -100, left: "60%", background: "rgba(124,58,237,0.07)", animationDuration: "8s" }} />
        <div className="hero-orb" style={{ width: 300, height: 300, top: "60%", left: "-5%", background: "rgba(79,70,229,0.05)", animationName: "floatB", animationDuration: "10s" }} />

        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ opacity: 0, animation: "none" }}>
            <Reveal>
              <div className="hero-badge" style={{ marginBottom: 24 }}>
                <span className="hero-badge-dot" />
                {t.hero.badge}
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <h1 style={{
              fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
              fontWeight: 800, lineHeight: 1.04,
              letterSpacing: "-0.045em", marginBottom: 24,
              maxWidth: 820,
            }}>
              <span className="gradient-text">{t.hero.h1}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{ fontSize: 18, color: "#555", lineHeight: 1.8, maxWidth: 540, marginBottom: 40 }}>
              {t.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="row" style={{ marginBottom: 20 }}>
              <a href="/book" className="btn-primary" style={{ padding: "15px 28px", fontSize: 15 }}>{t.hero.cta1}</a>
              <a href="#services" className="btn-ghost" style={{ padding: "15px 28px", fontSize: 15 }}>{t.hero.cta2}</a>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="row">
              <a href="tel:+21654012506" className="btn-call"><Phone />{t.hero.call} · 54 012 506</a>
              <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="btn-wa"><Wa />{t.hero.wa} · 93 826 499</a>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div style={{ marginTop: 72, display: "flex", flexDirection: "column", alignItems: rtl ? "flex-end" : "flex-start" }}>
              <div className="scroll-line" />
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── SERVICES ── */}
      <section id="services" className="section section-alt">
        <div className="wrap">
          <Reveal>
            <div className="section-label">{t.svc.badge}</div>
            <div className="section-h">{t.svc.h2}</div>
            <p className="section-sub" style={{ marginBottom: 52 }}>{t.svc.sub}</p>
          </Reveal>

          <div className="g3" style={{ marginBottom: 20 }}>
            {t.svc.cards.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="glass-card" style={{ height: "100%" }}>
                  <div className="svc-icon"><SvcIcon i={i} /></div>
                  <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.04em", color: "#0a0a0a", marginBottom: 4, lineHeight: 1 }}>{c.price}</div>
                  <div style={{ fontSize: 15.5, fontWeight: 600, color: "#111", marginBottom: 12, letterSpacing: "-0.01em" }}>{c.title}</div>
                  <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.75 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Package */}
          <Reveal delay={200}>
            <div className="pkg-card">
              <div className="pkg-shine" />
              <div style={{
                position: "absolute", top: 22,
                ...(rtl ? { left: 24 } : { right: 24 }),
                background: "linear-gradient(135deg, #a78bfa, #818cf8)",
                color: "#fff", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.08em", padding: "5px 13px", borderRadius: "100px", zIndex: 1,
              }}>{t.svc.pkgBadge}</div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{t.svc.pkgTitle}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 52, fontWeight: 800, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1 }}>{t.svc.pkgPrice}</span>
                  <span style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", textDecoration: "line-through" }}>{t.svc.pkgOld}</span>
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 32, lineHeight: 1.7, maxWidth: 480 }}>{t.svc.pkgDesc}</p>
                <div className="row">
                  <a href="/book" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "#fff", color: "#1e1b4b",
                    padding: "13px 26px", borderRadius: 10, fontSize: 14, fontWeight: 700,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)", transition: "transform 0.2s, box-shadow 0.2s",
                  }}>{t.svc.pkgCta1}</a>
                  <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(255,255,255,0.1)", color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "13px 26px", borderRadius: 10, fontSize: 14,
                    backdropFilter: "blur(8px)", transition: "background 0.2s",
                  }}><Wa />{t.svc.pkgCta2}</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── WHY ── */}
      <section id="why" className="section">
        <div className="wrap">
          <Reveal>
            <div className="section-label">{t.why.badge}</div>
            <div className="section-h" style={{ marginBottom: 48 }}>{t.why.h2}</div>
          </Reveal>
          <div className="g2">
            {t.why.cards.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="why-card">
                  <div style={{ fontSize: 26, marginBottom: 12 }}>{c.e}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 8, letterSpacing: "-0.01em" }}>{c.title}</div>
                  <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.75 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TRUST ── */}
      <section className="section section-alt">
        <div className="wrap">
          <Reveal>
            <div className="section-label">{t.trust.badge}</div>
            <div className="section-h" style={{ marginBottom: 44 }}>{t.trust.h2}</div>
          </Reveal>
          <div className="g3">
            {t.trust.cards.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="trust-card">
                  <div className="trust-ico"><TrustIcon i={i} /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", marginBottom: 5, letterSpacing: "-0.01em" }}>{c.title}</div>
                    <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>{c.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-section">
        <div style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div className="section-label" style={{ justifyContent: "center" }}>{t.contact.h2}</div>
            <h2 style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.04em", marginBottom: 16 }}>
              {t.contact.h2}
            </h2>
            <p style={{ fontSize: 17, color: "#555", lineHeight: 1.8, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
              {t.contact.sub}
            </p>
            <div className="row" style={{ justifyContent: "center" }}>
              <a href="tel:+21654012506" className="btn-call" style={{ fontSize: 14 }}><Phone />{t.contact.call}</a>
              <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="btn-wa" style={{ fontSize: 14 }}><Wa />{t.contact.wa}</a>
              <a href="/book" className="btn-ghost" style={{ fontSize: 14 }}>{t.contact.book}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-wrap">
        <span style={{ fontSize: 18, fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.03em" }}>
          AM<span style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>tech</span>
        </span>
        <p style={{ fontSize: 13, color: "#bbb" }}>{t.footer.copy}</p>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#services" style={{ fontSize: 13, color: "#aaa" }}>{t.footer.services}</a>
          <a href="#why" style={{ fontSize: 13, color: "#aaa" }}>{t.footer.why}</a>
          <a href="/book" style={{ fontSize: 13, color: "#aaa" }}>{t.footer.book}</a>
        </div>
      </footer>
    </div>
  );
}
