"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

// ─── TRANSLATIONS (unchanged) ─────────────────────────────────────────────────

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
      name: "الاسم", namePh: "اسمك الكامل",
      business: "اسم النشاط (اختياري)", businessPh: "اسم مشروعك أو شركتك",
      phone: "رقم الهاتف", phonePh: "+216 XX XXX XXX",
      service: "الخدمة المطلوبة", servicePh: "اختر خدمة...",
      services: ["موقع ويب", "نظام حجز", "شات بوت ذكي", "الباكاج الكامل", "أخرى"],
      message: "رسالتك", messagePh: "حكيلنا على مشروعك وشنوّا تحتاج...",
      submit: "أرسل الطلب", loading: "يتبعث...",
    },
    contact: { title: "ولا تواصل معانا مباشرة", call: "اتصل بينا", whatsapp: "إبعثلنا على واتساب" },
    trust: [
      { icon: "⚡", text: "نرد في نفس اليوم" },
      { icon: "📱", text: "تواصل مباشر بالهاتف وواتساب" },
      { icon: "🤝", text: "بلا وسيط، بلا تأخير" },
    ],
    success: { h: "تم إرسال طلبك!", sub: "نتواصل معك قريباً.", btn: "إرسال طلب آخر" },
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
      name: "Nom complet", namePh: "Votre nom",
      business: "Nom de l'entreprise (optionnel)", businessPh: "Votre business ou société",
      phone: "Numéro de téléphone", phonePh: "+216 XX XXX XXX",
      service: "Service souhaité", servicePh: "Choisir un service...",
      services: ["Création de site web", "Système de réservation", "Chatbot IA", "Pack complet", "Autre"],
      message: "Votre message", messagePh: "Parlez-nous de votre projet et de ce dont vous avez besoin...",
      submit: "Envoyer la demande", loading: "Envoi en cours...",
    },
    contact: { title: "Ou contactez-nous directement", call: "Nous appeler", whatsapp: "WhatsApp" },
    trust: [
      { icon: "⚡", text: "On répond le même jour" },
      { icon: "📱", text: "Contact direct par téléphone et WhatsApp" },
      { icon: "🤝", text: "Pas d'intermédiaire, pas de délais" },
    ],
    success: { h: "Demande envoyée !", sub: "On vous contacte très bientôt.", btn: "Envoyer une autre demande" },
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
      name: "Full name", namePh: "Your name",
      business: "Business name (optional)", businessPh: "Your business or company name",
      phone: "Phone number", phonePh: "+216 XX XXX XXX",
      service: "Service needed", servicePh: "Choose a service...",
      services: ["Website creation", "Booking system", "AI chatbot", "Complete package", "Other"],
      message: "Your message", messagePh: "Tell us about your project and what you need...",
      submit: "Send request", loading: "Sending...",
    },
    contact: { title: "Or contact us directly", call: "Call us", whatsapp: "WhatsApp us" },
    trust: [
      { icon: "⚡", text: "We respond the same day" },
      { icon: "📱", text: "Direct contact by phone and WhatsApp" },
      { icon: "🤝", text: "No middleman, no delays" },
    ],
    success: { h: "Request sent!", sub: "We'll get back to you very soon.", btn: "Send another request" },
    error: "Please fill in all required fields.",
  },
};

type Lang = "tn" | "fr" | "en";

// ─── ICONS ───────────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BookPage() {
  // ── All original state & logic preserved exactly ──
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

  // Original Supabase submit — untouched
  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) { setStatus("error"); return; }
    setStatus("loading");
    try {
      const { error } = await supabase.from("bookings").insert([{
        first_name: name, phone, company_name: business, service_type: service, message,
      }]);
      if (error) throw error;
      setStatus("success");
      setName(""); setBusiness(""); setPhone(""); setService(""); setMessage("");
    } catch { setStatus("error"); }
  };

  // Input styles — no padding shorthand conflict
  const inputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    border: `1.5px solid ${focused === field ? "#7c3aed" : "#e8e8e8"}`,
    borderRadius: "10px",
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: isRtl ? "16px" : "16px",
    paddingRight: isRtl ? "16px" : "16px",
    fontSize: "14.5px",
    fontFamily: "var(--font-body)",
    color: "#0a0a0a",
    background: focused === field ? "#fff" : "#fafafa",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(124,58,237,0.1)" : "none",
    textAlign: isRtl ? "right" : "left",
    direction: t.dir,
    appearance: "none" as const,
  });

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "12.5px", fontWeight: 600,
    color: "#444", marginBottom: "7px", letterSpacing: "-0.01em",
  };

  return (
    <div dir={t.dir} style={{ background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-body)", minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::selection { background: #e0d9ff; }

        .bk-lang-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 13px; border-radius: 8px;
          font-size: 12px; font-weight: 500; cursor: pointer;
          border: 1px solid #e8e8e8; background: #fff; color: #444;
          font-family: var(--font-body); white-space: nowrap;
          transition: all 0.18s; box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }
        .bk-lang-btn:hover { border-color: #c4b5fd; color: #5b21b6; background: #faf5ff; }
        .bk-lang-btn.on { background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; border-color: transparent; box-shadow: 0 2px 8px rgba(124,58,237,0.3); }

        .bk-nav {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 44px; height: 64px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 0 rgba(0,0,0,0.04);
          gap: 12px;
        }

        .bk-logo { font-size: 19px; font-weight: 700; color: #0a0a0a; letter-spacing: -0.035em; }
        .bk-logo span {
          background: linear-gradient(135deg, #7c3aed, #4f46e5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bk-back { font-size: 13px; color: #888; transition: color 0.18s; white-space: nowrap; }
        .bk-back:hover { color: #0a0a0a; }

        /* HERO */
        .bk-hero {
          padding: 56px 44px 48px;
          background: linear-gradient(180deg, #faf8ff 0%, #fff 100%);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          position: relative; overflow: hidden;
        }
        .bk-hero::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 60%);
        }

        .bk-hero-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(124,58,237,0.06); border: 1px solid rgba(124,58,237,0.18);
          color: #6d28d9; font-size: 11.5px; font-weight: 600; letter-spacing: 0.04em;
          padding: 5px 13px; border-radius: 100px; margin-bottom: 18px;
        }
        .bk-hero-dot { width: 5px; height: 5px; background: #7c3aed; border-radius: 50%; }

        /* LAYOUT */
        .bk-layout {
          display: grid; grid-template-columns: 1fr 320px;
          max-width: 900px; margin: 0 auto;
        }

        /* FORM */
        .bk-form-col {
          padding-top: 48px; padding-bottom: 60px;
          padding-left: 44px; padding-right: 40px;
          border-right: 1px solid #f0f0f0;
        }
        .bk-form-col-rtl {
          padding-top: 48px; padding-bottom: 60px;
          padding-right: 44px; padding-left: 40px;
          border-left: 1px solid #f0f0f0; border-right: none;
        }

        .bk-form-title { font-size: 20px; font-weight: 700; color: #0a0a0a; margin-bottom: 30px; letter-spacing: -0.025em; }

        .bk-submit {
          width: 100%;
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          color: #fff; border: none; border-radius: 10px;
          padding: 15px; font-size: 15px; font-weight: 600;
          cursor: pointer; font-family: var(--font-body);
          box-shadow: 0 4px 14px rgba(124,58,237,0.35);
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.18s;
          letter-spacing: -0.01em;
        }
        .bk-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(124,58,237,0.4); }
        .bk-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        /* SIDEBAR */
        .bk-sidebar {
          padding-top: 48px; padding-bottom: 60px;
        }
        .bk-sidebar-ltr { padding-left: 36px; padding-right: 20px; }
        .bk-sidebar-rtl { padding-right: 36px; padding-left: 20px; }

        .bk-contact-label {
          font-size: 11px; font-weight: 700; color: #999;
          letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px;
        }

        .bk-btn-call {
          display: flex; align-items: center; gap: 10px;
          background: #0a0a0a; color: #fff; border: none; border-radius: 12px;
          padding: 16px 18px; font-size: 14px; font-weight: 500; width: 100%;
          font-family: var(--font-body); cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bk-btn-call:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.2); }

        .bk-btn-wa {
          display: flex; align-items: center; gap: 10px;
          background: #22c55e; color: #fff; border: none; border-radius: 12px;
          padding: 16px 18px; font-size: 14px; font-weight: 500; width: 100%;
          font-family: var(--font-body); cursor: pointer;
          box-shadow: 0 2px 8px rgba(34,197,94,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .bk-btn-wa:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(34,197,94,0.4); }

        .bk-trust-item {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 14px;
          background: #fafafa; border: 1px solid #f0f0f0; border-radius: 10px;
        }

        /* SUCCESS */
        .bk-success {
          text-align: center; padding: 72px 20px;
          display: flex; flex-direction: column; align-items: center;
        }
        .bk-success-ring {
          width: 68px; height: 68px; border-radius: 50%;
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          border: 2px solid #86efac;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px; color: #16a34a;
          box-shadow: 0 4px 16px rgba(34,197,94,0.2);
        }
        .bk-reset-btn {
          background: #fff; color: #333; border: 1px solid #e8e8e8;
          border-radius: 8px; padding: 10px 22px; font-size: 13.5px;
          font-weight: 500; cursor: pointer; font-family: var(--font-body);
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .bk-reset-btn:hover { border-color: #c4b5fd; box-shadow: 0 2px 8px rgba(124,58,237,0.1); }

        /* ERROR */
        .bk-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 8px; padding: 11px 14px; font-size: 13px; color: #dc2626;
        }

        /* DIVIDER */
        .bk-divider { height: 1px; background: #f0f0f0; }

        select { appearance: none; cursor: pointer; }

        @media (max-width: 800px) {
          .bk-layout { grid-template-columns: 1fr !important; }
          .bk-form-col, .bk-form-col-rtl {
            padding-top: 36px; padding-bottom: 36px;
            padding-left: 24px; padding-right: 24px;
            border-right: none; border-left: none;
          }
          .bk-sidebar { padding-top: 0; padding-bottom: 40px; padding-left: 24px; padding-right: 24px; border-top: 1px solid #f0f0f0; }
          .bk-sidebar-ltr, .bk-sidebar-rtl { padding-left: 24px; padding-right: 24px; }
          .bk-nav { padding: 0 20px; }
          .bk-hero { padding: 36px 24px 32px; }
        }
        @media (max-width: 480px) {
          .bk-lang-btn { padding: 6px 9px; font-size: 11px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="bk-nav">
        <Link href="/" className="bk-logo">AM<span>tech</span></Link>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["tn", "fr", "en"] as Lang[]).map(l => (
            <button key={l} className={`bk-lang-btn${lang === l ? " on" : ""}`} onClick={() => setLang(l)}>
              {{ tn: "🇹🇳 تونسي", fr: "🇫🇷 Français", en: "🇬🇧 English" }[l]}
            </button>
          ))}
        </div>
        <Link href="/" className="bk-back">{t.nav.back}</Link>
      </nav>

      {/* HERO */}
      <div className="bk-hero">
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="bk-hero-tag">
            <span className="bk-hero-dot" />
            {t.hero.tag}
          </div>
          <h1 style={{
            fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 800,
            color: "#0a0a0a", letterSpacing: "-0.035em", lineHeight: 1.1, marginBottom: 12,
          }}>
            {t.hero.h1}
          </h1>
          <p style={{ fontSize: 15.5, color: "#666", lineHeight: 1.75, maxWidth: 480 }}>
            {t.hero.sub}
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 900, margin: "0 auto", paddingLeft: 0, paddingRight: 0 }}>
        <div className="bk-layout">

          {/* FORM COLUMN */}
          <div className={isRtl ? "bk-form-col-rtl" : "bk-form-col"}>

            {status === "success" ? (
              <div className="bk-success">
                <div className="bk-success-ring"><CheckIcon /></div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0a0a0a", marginBottom: 10, letterSpacing: "-0.025em" }}>{t.success.h}</h2>
                <p style={{ fontSize: 14.5, color: "#666", marginBottom: 32, lineHeight: 1.7 }}>{t.success.sub}</p>
                <button className="bk-reset-btn" onClick={() => setStatus("idle")}>{t.success.btn}</button>
              </div>
            ) : (
              <>
                <div className="bk-form-title">{t.form.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                  {/* Name */}
                  <div>
                    <label style={labelStyle}>{t.form.name} <span style={{ color: "#7c3aed" }}>*</span></label>
                    <input type="text" placeholder={t.form.namePh} value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      style={inputStyle("name")} />
                  </div>

                  {/* Business */}
                  <div>
                    <label style={labelStyle}>{t.form.business}</label>
                    <input type="text" placeholder={t.form.businessPh} value={business}
                      onChange={e => setBusiness(e.target.value)}
                      onFocus={() => setFocused("business")} onBlur={() => setFocused(null)}
                      style={inputStyle("business")} />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={labelStyle}>{t.form.phone} <span style={{ color: "#7c3aed" }}>*</span></label>
                    <input type="tel" placeholder={t.form.phonePh} value={phone}
                      onChange={e => setPhone(e.target.value)}
                      onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                      style={inputStyle("phone")} />
                  </div>

                  {/* Service */}
                  <div>
                    <label style={labelStyle}>{t.form.service}</label>
                    <select value={service} onChange={e => setService(e.target.value)}
                      onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                      style={{
                        ...inputStyle("service"),
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: isRtl ? "left 14px center" : "right 14px center",
                        paddingRight: isRtl ? "16px" : "36px",
                        paddingLeft: isRtl ? "36px" : "16px",
                      }}>
                      <option value="">{t.form.servicePh}</option>
                      {t.form.services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={labelStyle}>{t.form.message}</label>
                    <textarea placeholder={t.form.messagePh} value={message}
                      onChange={e => setMessage(e.target.value)}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      rows={4}
                      style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.7 }} />
                  </div>

                  {/* Error */}
                  {status === "error" && <div className="bk-error">{t.error}</div>}

                  {/* Submit */}
                  <div style={{ paddingTop: 4 }}>
                    <button className="bk-submit" onClick={handleSubmit} disabled={status === "loading"}>
                      {status === "loading" ? t.form.loading : t.form.submit}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <div className={`bk-sidebar ${isRtl ? "bk-sidebar-rtl" : "bk-sidebar-ltr"}`}>
            <div className="bk-contact-label">{t.contact.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              <a href="tel:+21654012506" className="bk-btn-call">
                <PhoneIcon />
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600 }}>{t.contact.call}</span>
                  <span style={{ display: "block", fontSize: 12, opacity: 0.6, marginTop: 1 }}>+216 54 012 506</span>
                </span>
              </a>
              <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="bk-btn-wa">
                <WaIcon />
                <span>
                  <span style={{ display: "block", fontSize: 14, fontWeight: 600 }}>{t.contact.whatsapp}</span>
                  <span style={{ display: "block", fontSize: 12, opacity: 0.7, marginTop: 1 }}>+216 93 826 499</span>
                </span>
              </a>
            </div>

            <div className="bk-divider" style={{ marginBottom: 24 }} />

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {t.trust.map((item, i) => (
                <div key={i} className="bk-trust-item">
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 12.5, color: "#555", fontWeight: 500, lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
