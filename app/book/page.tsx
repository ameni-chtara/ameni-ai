"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const translations = {
  tn: {
    dir: "rtl" as const,
    nav: { back: "← الرجوع للرئيسية" },
    hero: {
      tag: "أحجز مكالمة",
      h1: "تواصل مع AMtech",
      sub: "إملا النموذج وانحكيوا على مشروعك — ولا اتصل بينا مباشرة.",
    },
    form: {
      title: "أرسل طلبك",
      name: "الاسم",
      namePh: "اسمك الكامل",
      business: "اسم النشاط (اختياري)",
      businessPh: "اسم مشروعك أو شركتك",
      phone: "رقم الهاتف",
      phonePh: "+216 XX XXX XXX",
      service: "الخدمة المطلوبة",
      servicePh: "اختر خدمة...",
      services: ["موقع ويب", "نظام حجز", "شات بوت ذكي", "الباكاج الكامل", "أخرى"],
      message: "رسالتك",
      messagePh: "حكيلنا على مشروعك وشنوّا تحتاج...",
      submit: "أرسل الطلب",
      loading: "يتبعث...",
    },
    contact: {
      title: "ولا تواصل معانا مباشرة",
      call: "اتصل بينا",
      whatsapp: "إبعثلنا على واتساب",
    },
    trust: [
      { icon: "⚡", text: "نرد في نفس اليوم" },
      { icon: "📱", text: "تواصل مباشر بالهاتف وواتساب" },
      { icon: "🤝", text: "بلا وسيط، بلا تأخير" },
    ],
    success: {
      h: "تم إرسال طلبك!",
      sub: "نتواصل معك قريباً.",
      btn: "إرسال طلب آخر",
    },
    error: "من فضلك إملا الحقول المطلوبة.",
  },
  fr: {
    dir: "ltr" as const,
    nav: { back: "← Retour à l'accueil" },
    hero: {
      tag: "Réserver un appel",
      h1: "Contactez AMtech",
      sub: "Remplissez le formulaire et on discutera de votre projet — ou contactez-nous directement.",
    },
    form: {
      title: "Envoyez votre demande",
      name: "Nom complet",
      namePh: "Votre nom",
      business: "Nom de l'entreprise (optionnel)",
      businessPh: "Votre business ou société",
      phone: "Numéro de téléphone",
      phonePh: "+216 XX XXX XXX",
      service: "Service souhaité",
      servicePh: "Choisir un service...",
      services: ["Création de site web", "Système de réservation", "Chatbot IA", "Pack complet", "Autre"],
      message: "Votre message",
      messagePh: "Parlez-nous de votre projet et de ce dont vous avez besoin...",
      submit: "Envoyer la demande",
      loading: "Envoi en cours...",
    },
    contact: {
      title: "Ou contactez-nous directement",
      call: "Nous appeler",
      whatsapp: "WhatsApp",
    },
    trust: [
      { icon: "⚡", text: "On répond le même jour" },
      { icon: "📱", text: "Contact direct par téléphone et WhatsApp" },
      { icon: "🤝", text: "Pas d'intermédiaire, pas de délais" },
    ],
    success: {
      h: "Demande envoyée !",
      sub: "On vous contacte très bientôt.",
      btn: "Envoyer une autre demande",
    },
    error: "Veuillez remplir les champs obligatoires.",
  },
  en: {
    dir: "ltr" as const,
    nav: { back: "← Back to home" },
    hero: {
      tag: "Book a call",
      h1: "Get in touch with AMtech",
      sub: "Fill in the form and we'll talk about your project — or reach us directly.",
    },
    form: {
      title: "Send your request",
      name: "Full name",
      namePh: "Your name",
      business: "Business name (optional)",
      businessPh: "Your business or company name",
      phone: "Phone number",
      phonePh: "+216 XX XXX XXX",
      service: "Service needed",
      servicePh: "Choose a service...",
      services: ["Website creation", "Booking system", "AI chatbot", "Complete package", "Other"],
      message: "Your message",
      messagePh: "Tell us about your project and what you need...",
      submit: "Send request",
      loading: "Sending...",
    },
    contact: {
      title: "Or contact us directly",
      call: "Call us",
      whatsapp: "WhatsApp us",
    },
    trust: [
      { icon: "⚡", text: "We respond the same day" },
      { icon: "📱", text: "Direct contact by phone and WhatsApp" },
      { icon: "🤝", text: "No middleman, no delays" },
    ],
    success: {
      h: "Request sent!",
      sub: "We'll get back to you very soon.",
      btn: "Send another request",
    },
    error: "Please fill in all required fields.",
  },
};

type Lang = "tn" | "fr" | "en";

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function BookPage() {
  const [lang, setLang] = useState<Lang>("tn");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("amtech_lang") as Lang | null;
      if (saved && translations[saved]) setLang(saved);
    } catch {}
  }, []);

  const t = translations[lang];
  const isRtl = t.dir === "rtl";

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const { error } = await supabase.from("bookings").insert([{
        first_name: name,
        phone,
        company_name: business,
        service_type: service,
        message,
      }]);
      if (error) throw error;
      setStatus("success");
      setName(""); setBusiness(""); setPhone(""); setService(""); setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    border: "1.5px solid",
    borderRadius: "10px",
    padding: "13px 16px",
    fontSize: "15px",
    fontFamily: "var(--font-body)",
    color: "#111",
    background: "#fff",
    outline: "none",
    transition: "border-color 0.18s, box-shadow 0.18s",
    textAlign: isRtl ? "right" : "left",
    direction: t.dir,
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderColor: focused === name ? "#8B7CF6" : "#e5e5e5",
    boxShadow: focused === name ? "0 0 0 3px rgba(139,124,246,0.1)" : "none",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "7px",
    letterSpacing: "0.01em",
  };

  return (
    <div dir={t.dir} style={{ background: "#fff", color: "#111", fontFamily: "var(--font-body)", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lang-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 100px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          border: 1.5px solid #e5e5e5; background: #fff; color: #555;
          font-family: var(--font-body); white-space: nowrap;
          transition: all 0.18s;
        }
        .lang-btn:hover { border-color: #c4b5fd; color: #6B5CE7; background: #f5f3ff; }
        .lang-btn.active { background: #6B5CE7; color: #fff; border-color: #6B5CE7; }

        .btn-submit {
          width: 100%; background: #111; color: #fff; border: none;
          border-radius: 10px; padding: 16px; font-size: 16px; font-weight: 600;
          cursor: pointer; font-family: var(--font-body);
          transition: background 0.18s, transform 0.15s;
          letter-spacing: 0.01em;
        }
        .btn-submit:hover:not(:disabled) { background: #2a2a2a; transform: translateY(-1px); }
        .btn-submit:disabled { background: #ccc; cursor: not-allowed; }

        .btn-call {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #111; color: #fff; border: none; border-radius: 12px;
          padding: 18px 24px; font-size: 16px; font-weight: 600;
          cursor: pointer; text-decoration: none; width: 100%;
          font-family: var(--font-body); transition: background 0.18s, transform 0.15s;
        }
        .btn-call:hover { background: #2a2a2a; transform: translateY(-1px); }

        .btn-wa {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #22c55e; color: #fff; border: none; border-radius: 12px;
          padding: 18px 24px; font-size: 16px; font-weight: 600;
          cursor: pointer; text-decoration: none; width: 100%;
          font-family: var(--font-body); transition: background 0.18s, transform 0.15s;
        }
        .btn-wa:hover { background: #16a34a; transform: translateY(-1px); }

        .trust-item {
          display: flex; align-items: center; gap: 12px;
          padding: 16px 18px; background: #fafafa;
          border: 1px solid #f0f0f0; border-radius: 12px;
        }

        select { appearance: none; cursor: pointer; }

        @media (max-width: 900px) {
          .layout { grid-template-columns: 1fr !important; }
          .sidebar { border-left: none !important; border-right: none !important; border-top: 1px solid #f0f0f0 !important; padding-top: 40px !important; }
        }
        @media (max-width: 600px) {
          .lang-btn { padding: 7px 11px !important; font-size: 12px !important; }
          .hero-h { font-size: 2rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: "66px",
        background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f0f0f0", gap: "12px",
      }}>
        <Link href="/" style={{ fontSize: "19px", fontWeight: 700, color: "#111", letterSpacing: "-0.03em", textDecoration: "none" }}>
          AM<span style={{ color: "#8B7CF6" }}>tech</span>
        </Link>

        <div style={{ display: "flex", gap: "8px" }}>
          <button className={`lang-btn${lang === "tn" ? " active" : ""}`} onClick={() => setLang("tn")}>🇹🇳 تونسي</button>
          <button className={`lang-btn${lang === "fr" ? " active" : ""}`} onClick={() => setLang("fr")}>🇫🇷 Français</button>
          <button className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>🇬🇧 English</button>
        </div>

        <Link href="/" style={{ fontSize: "13px", color: "#888", textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.18s" }}>
          {t.nav.back}
        </Link>
      </nav>

      {/* HERO */}
      <div style={{ background: "#fafafa", borderBottom: "1px solid #f0f0f0", padding: "48px 40px 44px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{
            display: "inline-block", background: "#f5f3ff", color: "#6B5CE7",
            fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em",
            padding: "6px 14px", borderRadius: "100px",
            border: "1px solid #e0dbff", marginBottom: "18px",
          }}>
            {t.hero.tag}
          </div>
          <h1 className="hero-h" style={{
            fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700,
            color: "#111", letterSpacing: "-0.03em", lineHeight: 1.1,
            marginBottom: "14px",
          }}>
            {t.hero.h1}
          </h1>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: 1.75, maxWidth: "500px" }}>
            {t.hero.sub}
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px 80px" }}>
        <div className="layout" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "0", alignItems: "start" }}>

          {/* FORM COLUMN */}
          <div style={{ padding: "44px 40px 44px 0", borderRight: isRtl ? "none" : "1px solid #f0f0f0", borderLeft: isRtl ? "1px solid #f0f0f0" : "none" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ width: "64px", height: "64px", background: "#f0fdf4", border: "2px solid #bbf7d0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <CheckIcon />
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111", marginBottom: "10px", letterSpacing: "-0.02em" }}>{t.success.h}</h2>
                <p style={{ fontSize: "15px", color: "#666", marginBottom: "32px", lineHeight: 1.7 }}>{t.success.sub}</p>
                <button onClick={() => setStatus("idle")} style={{
                  background: "#fff", color: "#111", border: "1.5px solid #ddd",
                  borderRadius: "8px", padding: "11px 24px", fontSize: "14px",
                  fontWeight: 500, cursor: "pointer", fontFamily: "var(--font-body)",
                }}>{t.success.btn}</button>
              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#111", marginBottom: "28px", letterSpacing: "-0.02em" }}>
                  {t.form.title}
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {/* Name */}
                  <div>
                    <label style={labelStyle}>{t.form.name} <span style={{ color: "#8B7CF6" }}>*</span></label>
                    <input
                      type="text" placeholder={t.form.namePh} value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                    />
                  </div>

                  {/* Business */}
                  <div>
                    <label style={labelStyle}>{t.form.business}</label>
                    <input
                      type="text" placeholder={t.form.businessPh} value={business}
                      onChange={e => setBusiness(e.target.value)}
                      onFocus={() => setFocused("business")} onBlur={() => setFocused(null)}
                      style={inputStyle("business")}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>{t.form.phone} <span style={{ color: "#8B7CF6" }}>*</span></label>
                    <input
                      type="tel" placeholder={t.form.phonePh} value={phone}
                      onChange={e => setPhone(e.target.value)}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                      style={inputStyle("phone")}
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label style={labelStyle}>{t.form.service}</label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={service} onChange={e => setService(e.target.value)}
                        onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                        style={{
                          ...inputStyle("service"),
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: isRtl ? "left 14px center" : "right 14px center",
                          paddingRight: isRtl ? "16px" : "36px",
                          paddingLeft: isRtl ? "36px" : "16px",
                        }}
                      >
                        <option value="">{t.form.servicePh}</option>
                        {t.form.services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>{t.form.message}</label>
                    <textarea
                      placeholder={t.form.messagePh} value={message}
                      onChange={e => setMessage(e.target.value)}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      rows={4}
                      style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.7 }}
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "12px 16px", fontSize: "13px", color: "#dc2626" }}>
                      {t.error}
                    </div>
                  )}

                  {/* Submit */}
                  <button className="btn-submit" onClick={handleSubmit} disabled={status === "loading"}>
                    {status === "loading" ? t.form.loading : t.form.submit}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="sidebar" style={{ padding: "44px 0 44px 40px", ...(isRtl ? { paddingLeft: "0", paddingRight: "40px" } : {}) }}>

            {/* Direct contact */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#888", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>
                {t.contact.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a href="tel:+21654012506" className="btn-call">
                  <PhoneIcon />
                  <span>
                    <span style={{ display: "block", fontSize: "15px" }}>{t.contact.call}</span>
                    <span style={{ display: "block", fontSize: "13px", opacity: 0.7 }}>+216 54 012 506</span>
                  </span>
                </a>
                <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <WaIcon />
                  <span>
                    <span style={{ display: "block", fontSize: "15px" }}>{t.contact.whatsapp}</span>
                    <span style={{ display: "block", fontSize: "13px", opacity: 0.7 }}>+216 93 826 499</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: "#f0f0f0", marginBottom: "28px" }} />

            {/* Trust */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {t.trust.map((item, i) => (
                <div key={i} className="trust-item">
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  <span style={{ fontSize: "13px", color: "#444", fontWeight: 500, lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
