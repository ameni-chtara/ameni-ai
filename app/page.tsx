"use client";

import Link from "next/link";
import { LangProvider, LangSwitcher, useLang } from "./contexts/LanguageContext";

function HomeContent() {
  const { t, dir } = useLang();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#ffffff", color: "#111111", fontFamily: "var(--font-body)" }}
      dir={dir}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }

        .nav-link {
          color: #555;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #111; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          font-family: var(--font-body);
          letter-spacing: -0.01em;
        }
        .btn-primary:hover { background: #222; transform: translateY(-1px); }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          color: #111;
          border: 1.5px solid #ddd;
          border-radius: 8px;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, transform 0.15s;
          font-family: var(--font-body);
          letter-spacing: -0.01em;
        }
        .btn-secondary:hover { border-color: #aaa; transform: translateY(-1px); }

        .btn-call {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          font-family: var(--font-body);
        }
        .btn-call:hover { background: #222; transform: translateY(-1px); }

        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #22c55e;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          font-family: var(--font-body);
        }
        .btn-whatsapp:hover { background: #16a34a; transform: translateY(-1px); }

        .service-card {
          background: #fff;
          border: 1.5px solid #ebebeb;
          border-radius: 16px;
          padding: 32px 28px;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          position: relative;
        }
        .service-card:hover {
          border-color: #d4d0ff;
          box-shadow: 0 8px 32px rgba(139,124,246,0.08);
          transform: translateY(-2px);
        }

        .why-card {
          background: #fafafa;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 24px 20px;
          transition: background 0.2s;
        }
        .why-card:hover { background: #f5f3ff; border-color: #e0dbff; }

        .package-card {
          background: #111;
          border-radius: 20px;
          padding: 40px 36px;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .package-card::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(139,124,246,0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
          background: #fff;
          border: 1px solid #f0f0f0;
        }

        .icon-box {
          width: 44px; height: 44px;
          border-radius: 10px;
          background: #f5f3ff;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 20px;
        }

        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .hero-btns { flex-direction: column; }
          .contact-btns { flex-direction: column; }
          .nav-links { display: none; }
          .hero-h { font-size: clamp(2.2rem, 8vw, 3.5rem) !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "64px",
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <span style={{ fontSize: "17px", fontWeight: 600, color: "#111", letterSpacing: "-0.02em" }}>
          AM<span style={{ color: "#8B7CF6" }}>tech</span>
        </span>

        <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
          <a href="#services" className="nav-link">Services</a>
          <a href="#why" className="nav-link">Why us</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <LangSwitcher />
          <a href="/book" className="btn-primary" style={{ padding: "9px 18px", fontSize: "14px", borderRadius: "8px" }}>
            Book a consultation
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "120px", paddingBottom: "80px", paddingLeft: "48px", paddingRight: "48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="fade-up" style={{ marginBottom: "16px" }}>
          <span style={{
            display: "inline-block",
            background: "#f5f3ff", color: "#6B5CE7",
            fontSize: "12px", fontWeight: 500,
            letterSpacing: "0.08em", padding: "6px 14px",
            borderRadius: "100px", border: "1px solid #e0dbff",
          }}>
            Tunisia · Affordable · Professional
          </span>
        </div>

        <h1
          className="hero-h fade-up fade-up-1"
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#111",
            marginBottom: "22px",
            maxWidth: "780px",
          }}
        >
          Websites and business<br />
          automation for Tunisian{" "}
          <span style={{ color: "#8B7CF6" }}>businesses</span>
        </h1>

        <p className="fade-up fade-up-2" style={{ fontSize: "17px", color: "#555", lineHeight: 1.75, maxWidth: "560px", marginBottom: "40px" }}>
          We create professional websites, online booking systems, and AI solutions designed specifically for your business.
        </p>

        <div className="hero-btns fade-up fade-up-3" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "52px" }}>
          <a href="/book" className="btn-primary" style={{ padding: "16px 32px", fontSize: "16px", borderRadius: "10px" }}>
            Book a free consultation
          </a>
          <a href="#services" className="btn-secondary" style={{ padding: "16px 32px", fontSize: "16px", borderRadius: "10px" }}>
            See our services
          </a>
        </div>

        {/* Contact buttons — above the fold */}
        <div className="contact-btns fade-up" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a href="tel:+21654012506" className="btn-call">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call us · +216 54 012 506
          </a>
          <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
            WhatsApp · +216 93 826 499
          </a>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "80px 48px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#8B7CF6", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
            Services &amp; Pricing
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "#111", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            What we build for you
          </h2>
          <p style={{ fontSize: "16px", color: "#666", marginBottom: "52px", lineHeight: 1.7 }}>
            Every solution is built from scratch — no templates, no shortcuts.
          </p>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "24px" }}>

            {/* Card 1 */}
            <div className="service-card">
              <div className="icon-box" style={{ marginBottom: "20px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              </div>
              <div style={{ fontSize: "28px", fontWeight: 600, color: "#111", letterSpacing: "-0.03em", marginBottom: "4px" }}>60 TND</div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: "#111", marginBottom: "12px" }}>Website Creation</div>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>
                Professional website designed according to your preferences. Choose the style, layout, and features that suit your business.
              </p>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <div className="icon-box" style={{ marginBottom: "20px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><circle cx="12" cy="16" r="1.5"/></svg>
              </div>
              <div style={{ fontSize: "28px", fontWeight: 600, color: "#111", letterSpacing: "-0.03em", marginBottom: "4px" }}>60 TND</div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: "#111", marginBottom: "12px" }}>Online Booking System</div>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>
                Allow customers to book appointments online and receive email notifications whenever a new reservation is made.
              </p>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <div className="icon-box" style={{ marginBottom: "20px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <div style={{ fontSize: "28px", fontWeight: 600, color: "#111", letterSpacing: "-0.03em", marginBottom: "4px" }}>100 TND</div>
              <div style={{ fontSize: "16px", fontWeight: 500, color: "#111", marginBottom: "12px" }}>AI Chatbot Integration</div>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>
                An AI assistant trained specifically on your business information, services, and frequently asked questions. This is not a generic chatbot.
              </p>
            </div>
          </div>

          {/* Package */}
          <div className="package-card">
            <div style={{
              position: "absolute", top: "20px", right: "24px",
              background: "#8B7CF6", color: "#fff",
              fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
              padding: "5px 14px", borderRadius: "100px",
            }}>
              MOST POPULAR
            </div>
            <div style={{ fontSize: "13px", color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>Complete Package</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "48px", fontWeight: 600, letterSpacing: "-0.04em", color: "#fff" }}>200 TND</span>
              <span style={{ fontSize: "20px", color: "#666", textDecoration: "line-through" }}>220 TND</span>
            </div>
            <p style={{ fontSize: "15px", color: "#aaa", marginBottom: "28px" }}>
              Website + Booking System + AI Chatbot — everything included at a discounted price.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="/book" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#fff", color: "#111",
                padding: "13px 28px", borderRadius: "8px",
                fontSize: "15px", fontWeight: 500,
                textDecoration: "none", transition: "opacity 0.2s",
              }}>
                Get started
              </a>
              <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.1)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "13px 28px", borderRadius: "8px",
                fontSize: "15px", textDecoration: "none",
              }}>
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY AMTECH ── */}
      <section id="why" style={{ padding: "80px 48px", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#8B7CF6", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
            Why AMtech
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "#111", letterSpacing: "-0.02em", marginBottom: "48px" }}>
            What makes us different
          </h2>

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
            {[
              {
                icon: "💰",
                title: "Affordable solutions",
                desc: "Professional quality at prices that make sense for Tunisian businesses — no hidden fees.",
              },
              {
                icon: "🎨",
                title: "Custom designs",
                desc: "Nothing is copy-pasted. Every page is built around your brand, your content, and your goals.",
              },
              {
                icon: "⚡",
                title: "Fast communication",
                desc: "We're reachable by phone and WhatsApp. You'll always know where things stand.",
              },
              {
                icon: "🎯",
                title: "Built for your business",
                desc: "We take the time to understand what you actually need — not just what's easiest to build.",
              },
            ].map((item, i) => (
              <div key={i} className="why-card">
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{item.icon}</div>
                <div style={{ fontSize: "15px", fontWeight: 600, color: "#111", marginBottom: "8px" }}>{item.title}</div>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section style={{ padding: "80px 48px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.14em", color: "#8B7CF6", textTransform: "uppercase", marginBottom: "12px", fontWeight: 500 }}>
            Working with us
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, color: "#111", letterSpacing: "-0.02em", marginBottom: "40px" }}>
            A local team you can reach directly
          </h2>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            <div className="trust-item">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>Based in Tunisia</div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6 }}>We understand the local market and build for it — no translation needed.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>Personalized support</div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6 }}>You work directly with us — not a support ticket system or a call center.</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="icon-box">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>Direct contact</div>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.6 }}>Reach us anytime by phone or WhatsApp. Quick answers, real people.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section id="contact" style={{ padding: "96px 48px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 600, color: "#111", letterSpacing: "-0.03em", marginBottom: "16px" }}>
            Ready to get started?
          </h2>
          <p style={{ fontSize: "17px", color: "#555", lineHeight: 1.75, marginBottom: "44px" }}>
            Book a free consultation or reach us directly — we'll get back to you the same day.
          </p>
          <div className="contact-btns" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+21654012506" className="btn-call" style={{ fontSize: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call us
            </a>
            <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" style={{ fontSize: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WhatsApp us
            </a>
            <a href="/book" className="btn-secondary" style={{ fontSize: "16px", padding: "16px 28px" }}>
              Book a consultation
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "24px 48px",
        borderTop: "1px solid #f0f0f0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "12px",
      }}>
        <span style={{ fontSize: "16px", fontWeight: 600, color: "#111", letterSpacing: "-0.02em" }}>
          AM<span style={{ color: "#8B7CF6" }}>tech</span>
        </span>
        <p style={{ fontSize: "13px", color: "#aaa" }}>© 2025 AMtech. All rights reserved.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          <a href="#services" style={{ fontSize: "13px", color: "#aaa", textDecoration: "none" }}>Services</a>
          <a href="#why" style={{ fontSize: "13px", color: "#aaa", textDecoration: "none" }}>Why us</a>
          <a href="/book" style={{ fontSize: "13px", color: "#aaa", textDecoration: "none" }}>Book</a>
        </div>
      </footer>

    </div>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <HomeContent />
    </LangProvider>
  );
}
