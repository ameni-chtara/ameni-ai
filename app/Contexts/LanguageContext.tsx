"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "fr" | "ar";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.book": "Book a Call",
    "nav.back": "← Back",

    // Hero
    "hero.tag": "AI Solutions for Tunisian Businesses",
    "hero.h1a": "Elevate Your Business",
    "hero.h1b": "With Intelligent Tools",
    "hero.sub": "We build modern websites, AI chatbots, and smart booking systems that help restaurants, boutiques, and services grow — starting at affordable local prices.",
    "hero.cta1": "Get Started",
    "hero.cta2": "Book a Demo",

    // Services
    "services.label": "What We Offer",
    "services.h2a": "Everything a modern business",
    "services.h2b": "needs to thrive online",
    "services.01.title": "Business Website",
    "services.01.desc": "Fast, modern websites built to convert visitors into customers — fully optimised for mobile and search.",
    "services.01.tag": "From 199 TND",
    "services.02.title": "AI Chatbot",
    "services.02.desc": "A 24/7 assistant that answers customer questions, takes bookings, and handles enquiries in Arabic, French, or English.",
    "services.02.tag": "Add-on: 199 TND",
    "services.03.title": "Smart Booking",
    "services.03.desc": "Online booking systems with reminders, WhatsApp confirmations, and a clean admin dashboard.",
    "services.03.tag": "Included in bundles",

    // Stats
    "stats.48h.label": "Delivery time for basic sites",
    "stats.3x.label": "More enquiries on average",
    "stats.100.label": "Arabic & French support",
    "stats.247.label": "Chatbot availability",

    // How it works
    "how.label": "Process",
    "how.h2": "Simple from day one",
    "how.1.t": "Book a free call",
    "how.1.d": "Tell us about your business and what you need.",
    "how.2.t": "We build it",
    "how.2.d": "Design, development, and AI setup — handled.",
    "how.3.t": "You review",
    "how.3.d": "Feedback round, revisions, final approval.",
    "how.4.t": "Go live",
    "how.4.d": "Launch with training so you stay in control.",

    // Pricing
    "pricing.label": "Pricing",
    "pricing.h2a": "Transparent prices,",
    "pricing.h2b": "no surprises",
    "pricing.starting": "starting price",
    "pricing.bookcall": "Book a Call",
    "pricing.popular": "Most Popular",
    "pricing.note": "All prices are starting prices. Final quote depends on your specific needs. Delivery: 2–7 days.",
    "plan.starter.name": "Starter",
    "plan.starter.price": "199 TND",
    "plan.starter.desc": "Perfect for solo businesses and service providers who need a clean online presence fast.",
    "plan.starter.f1": "1-page website",
    "plan.starter.f2": "Mobile friendly",
    "plan.starter.f3": "Contact form",
    "plan.starter.f4": "WhatsApp button",
    "plan.starter.f5": "Delivered in 48h",
    "plan.business.name": "Business",
    "plan.business.price": "399 TND",
    "plan.business.desc": "For growing businesses that need more pages, better SEO, and a professional look.",
    "plan.business.f1": "Multi-page website",
    "plan.business.f2": "Services section",
    "plan.business.f3": "Contact system",
    "plan.business.f4": "Basic SEO setup",
    "plan.business.f5": "Delivered in 5 days",
    "plan.resto.name": "Restaurant / Boutique",
    "plan.resto.price": "599 TND",
    "plan.resto.desc": "Built for food & retail — showcase your menu or products with a booking or order system.",
    "plan.resto.f1": "Menu or product display",
    "plan.resto.f2": "Modern custom design",
    "plan.resto.f3": "Booking or order system",
    "plan.resto.f4": "WhatsApp integration",
    "plan.resto.f5": "Delivered in 7 days",
    "addon.label": "Add-on",
    "addon.title": "AI Chatbot — 199 TND",
    "addon.desc": "Answers customer questions, generates leads, available 24/7. Add to any package.",
    "addon.cta": "Add to my package",

    // CTA Banner
    "cta.h": "Ready to stand out in your market?",
    "cta.em": "your market?",
    "cta.sub": "Book a free 20-minute call. We'll map out exactly what you need and give you a clear quote — no pressure, no jargon.",
    "cta.btn": "Book Free Consultation",

    // Footer
    "footer.copy": "© 2026 Ameni AI — Built for Tunisian businesses",
    "footer.services": "Services",
    "footer.pricing": "Pricing",
    "footer.book": "Book a Call",

    // Book page
    "book.tag": "Free Consultation",
    "book.h1a": "Book a free",
    "book.h1b": "20-minute call",
    "book.sub": "Tell us about your business and what you need. We'll reply within 24 hours with a clear plan and honest quote.",
    "book.firstname": "First name *",
    "book.lastname": "Last name",
    "book.email": "Email *",
    "book.phone": "Phone",
    "book.company": "Business / Company name",
    "book.service": "What do you need? *",
    "book.message": "Tell us more",
    "book.ph.firstname": "Ameni",
    "book.ph.lastname": "Ben Ali",
    "book.ph.email": "you@example.com",
    "book.ph.phone": "+216 XX XXX XXX",
    "book.ph.company": "Your restaurant, shop, clinic…",
    "book.ph.message": "Describe your business, your goals, any specific features…",
    "book.select": "Select a service…",
    "book.opt.restaurant": "Restaurant website",
    "book.opt.shop": "Shop / boutique website",
    "book.opt.chatbot": "AI chatbot only",
    "book.opt.booking": "Booking system",
    "book.opt.full": "Full package (website + chatbot + booking)",
    "book.opt.other": "Not sure — let's talk",
    "book.submit": "Request Free Consultation",
    "book.loading": "Sending…",
    "book.note": "No commitment. We'll reply within 24 hours.",
    "book.error": "⚠ Please fill in your first name, email, and select a service.",
    "book.success.h": "Request received",
    "book.success.sub": "We'll be in touch within 24 hours to confirm your consultation.",
    "book.success.btn": "Submit another",
  },

  fr: {
    "nav.services": "Services",
    "nav.pricing": "Tarifs",
    "nav.book": "Réserver un appel",
    "nav.back": "← Retour",

    "hero.tag": "Solutions IA pour les entreprises tunisiennes",
    "hero.h1a": "Faites évoluer votre entreprise",
    "hero.h1b": "Avec des outils intelligents",
    "hero.sub": "Nous créons des sites web modernes, des chatbots IA et des systèmes de réservation intelligents pour aider les restaurants, boutiques et services à se développer — à des prix locaux abordables.",
    "hero.cta1": "Commencer",
    "hero.cta2": "Réserver une démo",

    "services.label": "Ce que nous offrons",
    "services.h2a": "Tout ce dont une entreprise moderne",
    "services.h2b": "a besoin pour prospérer en ligne",
    "services.01.title": "Site web professionnel",
    "services.01.desc": "Des sites web rapides et modernes conçus pour convertir les visiteurs en clients — entièrement optimisés pour mobile et référencement.",
    "services.01.tag": "À partir de 199 TND",
    "services.02.title": "Chatbot IA",
    "services.02.desc": "Un assistant 24h/24 qui répond aux questions, prend des réservations et gère les demandes en arabe, français ou anglais.",
    "services.02.tag": "Option : 199 TND",
    "services.03.title": "Réservation intelligente",
    "services.03.desc": "Systèmes de réservation en ligne avec rappels, confirmations WhatsApp et tableau de bord admin épuré.",
    "services.03.tag": "Inclus dans les forfaits",

    "stats.48h.label": "Délai de livraison pour les sites basiques",
    "stats.3x.label": "Plus de demandes en moyenne",
    "stats.100.label": "Support arabe et français",
    "stats.247.label": "Disponibilité du chatbot",

    "how.label": "Processus",
    "how.h2": "Simple dès le premier jour",
    "how.1.t": "Réservez un appel gratuit",
    "how.1.d": "Parlez-nous de votre entreprise et de vos besoins.",
    "how.2.t": "Nous le construisons",
    "how.2.d": "Design, développement et configuration IA — tout est géré.",
    "how.3.t": "Vous vérifiez",
    "how.3.d": "Retours, révisions, approbation finale.",
    "how.4.t": "Mise en ligne",
    "how.4.d": "Lancement avec formation pour rester maître de votre site.",

    "pricing.label": "Tarifs",
    "pricing.h2a": "Des prix transparents,",
    "pricing.h2b": "sans surprises",
    "pricing.starting": "prix de départ",
    "pricing.bookcall": "Réserver un appel",
    "pricing.popular": "Le plus populaire",
    "pricing.note": "Tous les prix sont des prix de départ. Le devis final dépend de vos besoins. Livraison : 2–7 jours.",
    "plan.starter.name": "Starter",
    "plan.starter.price": "199 TND",
    "plan.starter.desc": "Idéal pour les indépendants et prestataires qui ont besoin d'une présence en ligne rapide et soignée.",
    "plan.starter.f1": "Site 1 page",
    "plan.starter.f2": "Compatible mobile",
    "plan.starter.f3": "Formulaire de contact",
    "plan.starter.f4": "Bouton WhatsApp",
    "plan.starter.f5": "Livré en 48h",
    "plan.business.name": "Business",
    "plan.business.price": "399 TND",
    "plan.business.desc": "Pour les entreprises en croissance qui ont besoin de plus de pages, d'un meilleur SEO et d'un look professionnel.",
    "plan.business.f1": "Site multi-pages",
    "plan.business.f2": "Section services",
    "plan.business.f3": "Système de contact",
    "plan.business.f4": "SEO de base",
    "plan.business.f5": "Livré en 5 jours",
    "plan.resto.name": "Restaurant / Boutique",
    "plan.resto.price": "599 TND",
    "plan.resto.desc": "Conçu pour la restauration et le commerce — présentez votre menu ou vos produits avec un système de réservation.",
    "plan.resto.f1": "Affichage menu ou produits",
    "plan.resto.f2": "Design personnalisé moderne",
    "plan.resto.f3": "Système de réservation ou commande",
    "plan.resto.f4": "Intégration WhatsApp",
    "plan.resto.f5": "Livré en 7 jours",
    "addon.label": "Option",
    "addon.title": "Chatbot IA — 199 TND",
    "addon.desc": "Répond aux questions, génère des leads, disponible 24/7. À ajouter à n'importe quel forfait.",
    "addon.cta": "Ajouter à mon forfait",

    "cta.h": "Prêt à vous démarquer sur votre marché ?",
    "cta.em": "votre marché ?",
    "cta.sub": "Réservez un appel gratuit de 20 minutes. Nous définirons ensemble exactement ce dont vous avez besoin et vous fournirons un devis clair — sans pression, sans jargon.",
    "cta.btn": "Réserver une consultation gratuite",

    "footer.copy": "© 2026 Ameni AI — Conçu pour les entreprises tunisiennes",
    "footer.services": "Services",
    "footer.pricing": "Tarifs",
    "footer.book": "Réserver un appel",

    "book.tag": "Consultation gratuite",
    "book.h1a": "Réservez un appel",
    "book.h1b": "gratuit de 20 minutes",
    "book.sub": "Parlez-nous de votre entreprise et de vos besoins. Nous répondrons dans les 24 heures avec un plan clair et un devis honnête.",
    "book.firstname": "Prénom *",
    "book.lastname": "Nom",
    "book.email": "E-mail *",
    "book.phone": "Téléphone",
    "book.company": "Nom de l'entreprise",
    "book.service": "De quoi avez-vous besoin ? *",
    "book.message": "Dites-nous en plus",
    "book.ph.firstname": "Ameni",
    "book.ph.lastname": "Ben Ali",
    "book.ph.email": "vous@exemple.com",
    "book.ph.phone": "+216 XX XXX XXX",
    "book.ph.company": "Votre restaurant, boutique, clinique…",
    "book.ph.message": "Décrivez votre activité, vos objectifs, les fonctionnalités souhaitées…",
    "book.select": "Sélectionnez un service…",
    "book.opt.restaurant": "Site web restaurant",
    "book.opt.shop": "Site web boutique",
    "book.opt.chatbot": "Chatbot IA uniquement",
    "book.opt.booking": "Système de réservation",
    "book.opt.full": "Forfait complet (site + chatbot + réservation)",
    "book.opt.other": "Pas sûr — parlons-en",
    "book.submit": "Demander une consultation gratuite",
    "book.loading": "Envoi en cours…",
    "book.note": "Sans engagement. Nous répondrons dans les 24 heures.",
    "book.error": "⚠ Veuillez renseigner votre prénom, e-mail et sélectionner un service.",
    "book.success.h": "Demande reçue",
    "book.success.sub": "Nous vous contacterons dans les 24 heures pour confirmer votre consultation.",
    "book.success.btn": "Soumettre une autre demande",
  },

  ar: {
    "nav.services": "الخدمات",
    "nav.pricing": "الأسعار",
    "nav.book": "احجز مكالمة",
    "nav.back": "→ رجوع",

    "hero.tag": "حلول الذكاء الاصطناعي للشركات التونسية",
    "hero.h1a": "ارتقِ بعملك",
    "hero.h1b": "بأدوات ذكية",
    "hero.sub": "نبني مواقع ويب حديثة وروبوتات دردشة بالذكاء الاصطناعي وأنظمة حجز ذكية تساعد المطاعم والمحلات والخدمات على النمو — بأسعار محلية معقولة.",
    "hero.cta1": "ابدأ الآن",
    "hero.cta2": "احجز عرضاً توضيحياً",

    "services.label": "ما نقدمه",
    "services.h2a": "كل ما تحتاجه شركة حديثة",
    "services.h2b": "للازدهار على الإنترنت",
    "services.01.title": "موقع الشركة",
    "services.01.desc": "مواقع سريعة وحديثة مصممة لتحويل الزوار إلى عملاء — محسّنة بالكامل للجوال ومحركات البحث.",
    "services.01.tag": "من 199 دينار تونسي",
    "services.02.title": "روبوت الدردشة الذكي",
    "services.02.desc": "مساعد متاح 24/7 يجيب على أسئلة العملاء ويقبل الحجوزات ويتعامل مع الاستفسارات بالعربية والفرنسية والإنجليزية.",
    "services.02.tag": "إضافة: 199 دينار تونسي",
    "services.03.title": "الحجز الذكي",
    "services.03.desc": "أنظمة حجز إلكترونية مع تذكيرات وتأكيدات واتساب ولوحة تحكم إدارية أنيقة.",
    "services.03.tag": "مضمّن في الباقات",

    "stats.48h.label": "وقت التسليم للمواقع الأساسية",
    "stats.3x.label": "مزيد من الاستفسارات في المتوسط",
    "stats.100.label": "دعم العربية والفرنسية",
    "stats.247.label": "توفر روبوت الدردشة",

    "how.label": "كيف يعمل",
    "how.h2": "بسيط من اليوم الأول",
    "how.1.t": "احجز مكالمة مجانية",
    "how.1.d": "أخبرنا عن عملك واحتياجاتك.",
    "how.2.t": "نبنيه لك",
    "how.2.d": "التصميم والتطوير وإعداد الذكاء الاصطناعي — نتكفل بكل شيء.",
    "how.3.t": "تراجع وتوافق",
    "how.3.d": "جولة ملاحظات ومراجعات وموافقة نهائية.",
    "how.4.t": "الإطلاق",
    "how.4.d": "إطلاق مع تدريب حتى تبقى في السيطرة الكاملة.",

    "pricing.label": "الأسعار",
    "pricing.h2a": "أسعار شفافة،",
    "pricing.h2b": "بلا مفاجآت",
    "pricing.starting": "سعر البداية",
    "pricing.bookcall": "احجز مكالمة",
    "pricing.popular": "الأكثر شعبية",
    "pricing.note": "جميع الأسعار هي أسعار بداية. السعر النهائي يعتمد على احتياجاتك. التسليم: 2–7 أيام.",
    "plan.starter.name": "ستارتر",
    "plan.starter.price": "199 دت",
    "plan.starter.desc": "مثالي للمشاريع الفردية ومقدمي الخدمات الذين يحتاجون إلى حضور إلكتروني سريع وأنيق.",
    "plan.starter.f1": "موقع صفحة واحدة",
    "plan.starter.f2": "متوافق مع الجوال",
    "plan.starter.f3": "نموذج اتصال",
    "plan.starter.f4": "زر واتساب",
    "plan.starter.f5": "تسليم خلال 48 ساعة",
    "plan.business.name": "بيزنس",
    "plan.business.price": "399 دت",
    "plan.business.desc": "للشركات النامية التي تحتاج صفحات أكثر وتحسين محركات بحث ومظهراً احترافياً.",
    "plan.business.f1": "موقع متعدد الصفحات",
    "plan.business.f2": "قسم الخدمات",
    "plan.business.f3": "نظام التواصل",
    "plan.business.f4": "إعداد SEO أساسي",
    "plan.business.f5": "تسليم في 5 أيام",
    "plan.resto.name": "مطعم / بوتيك",
    "plan.resto.price": "599 دت",
    "plan.resto.desc": "مصمم للمطاعم والتجزئة — اعرض قائمتك أو منتجاتك مع نظام حجز أو طلب.",
    "plan.resto.f1": "عرض القائمة أو المنتجات",
    "plan.resto.f2": "تصميم مخصص حديث",
    "plan.resto.f3": "نظام حجز أو طلب",
    "plan.resto.f4": "تكامل واتساب",
    "plan.resto.f5": "تسليم في 7 أيام",
    "addon.label": "إضافة",
    "addon.title": "روبوت دردشة ذكي — 199 دت",
    "addon.desc": "يجيب على أسئلة العملاء ويولّد عملاء محتملين، متاح 24/7. أضفه لأي باقة.",
    "addon.cta": "أضف إلى باقتي",

    "cta.h": "مستعد للتميز في سوقك؟",
    "cta.em": "في سوقك؟",
    "cta.sub": "احجز مكالمة مجانية لمدة 20 دقيقة. سنحدد معك بالضبط ما تحتاجه ونقدم لك عرض سعر واضح — بلا ضغط ولا مصطلحات معقدة.",
    "cta.btn": "احجز استشارة مجانية",

    "footer.copy": "© 2026 أميني AI — مصمم للشركات التونسية",
    "footer.services": "الخدمات",
    "footer.pricing": "الأسعار",
    "footer.book": "احجز مكالمة",

    "book.tag": "استشارة مجانية",
    "book.h1a": "احجز مكالمة",
    "book.h1b": "مجانية لمدة 20 دقيقة",
    "book.sub": "أخبرنا عن عملك واحتياجاتك. سنردّ خلال 24 ساعة بخطة واضحة وعرض سعر صادق.",
    "book.firstname": "الاسم الأول *",
    "book.lastname": "اسم العائلة",
    "book.email": "البريد الإلكتروني *",
    "book.phone": "الهاتف",
    "book.company": "اسم الشركة / النشاط",
    "book.service": "ماذا تحتاج؟ *",
    "book.message": "أخبرنا أكثر",
    "book.ph.firstname": "أميني",
    "book.ph.lastname": "بن علي",
    "book.ph.email": "you@example.com",
    "book.ph.phone": "+216 XX XXX XXX",
    "book.ph.company": "مطعمك، محلك، عيادتك…",
    "book.ph.message": "صف نشاطك وأهدافك والميزات التي تريدها…",
    "book.select": "اختر خدمة…",
    "book.opt.restaurant": "موقع مطعم",
    "book.opt.shop": "موقع بوتيك / متجر",
    "book.opt.chatbot": "روبوت دردشة ذكي فقط",
    "book.opt.booking": "نظام حجز",
    "book.opt.full": "الباقة الكاملة (موقع + روبوت + حجز)",
    "book.opt.other": "لست متأكداً — لنتحدث",
    "book.submit": "طلب استشارة مجانية",
    "book.loading": "جارٍ الإرسال…",
    "book.note": "بدون التزام. سنردّ خلال 24 ساعة.",
    "book.error": "⚠ يرجى ملء الاسم الأول والبريد الإلكتروني واختيار خدمة.",
    "book.success.h": "تم استلام طلبك",
    "book.success.sub": "سنتواصل معك خلال 24 ساعة لتأكيد استشارتك.",
    "book.success.btn": "إرسال طلب آخر",
  },
};

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  dir: "ltr",
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ameni-lang") as Lang;
    if (saved === "en" || saved === "fr" || saved === "ar") {
      setLangState(saved);
    }
    setMounted(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ameni-lang", l);
  };

  const t = (key: string) => {
    if (!mounted) return translations["en"][key] ?? key;
    return translations[lang][key] ?? translations["en"][key] ?? key;
  };

  const dir = mounted && lang === "ar" ? "rtl" : "ltr";

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// Language Switcher UI component
export function LangSwitcher() {
  const { lang, setLang } = useLang();

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "ع" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
      {langs.map(({ code, label }, i) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.72rem",
            letterSpacing: "0.1em",
            fontWeight: lang === code ? 600 : 400,
            color: lang === code ? "var(--gold)" : "var(--muted)",
            padding: "0.25rem 0.4rem",
            borderRight: i < langs.length - 1 ? "1px solid var(--border)" : "none",
            transition: "color 0.15s",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
