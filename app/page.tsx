"use client";

import Link from "next/link";
import { LangProvider, LangSwitcher, useLang } from "./contexts/LanguageContext";

function HomeContent() {
  const { t, dir } = useLang();

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
      dir={dir}
    >

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 md:px-14 py-5"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(12, 12, 14, 0.85)",
          backdropFilter: "blur(16px)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            letterSpacing: "0.06em",
            color: "var(--gold)",
            fontWeight: 600,
          }}
        >
          Ameni AI
        </span>

        <div className="flex items-center gap-6">
          <Link
            href="#services"
            style={{ color: "var(--muted)", fontSize: "0.875rem", letterSpacing: "0.04em" }}
            className="hidden md:inline hover:opacity-100 transition-opacity"
          >
            {t("nav.services")}
          </Link>
          <Link
            href="#pricing"
            style={{ color: "var(--muted)", fontSize: "0.875rem", letterSpacing: "0.04em" }}
            className="hidden md:inline hover:opacity-100 transition-opacity"
          >
            {t("nav.pricing")}
          </Link>

          {/* Language Switcher */}
          <LangSwitcher />

          <Link
            href="/book"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              padding: "0.55rem 1.4rem",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              borderRadius: "2px",
              textTransform: "uppercase",
              fontWeight: 400,
              transition: "background 0.2s, color 0.2s",
            }}
            className="hover:bg-amber-500 hover:text-black"
          >
            {t("nav.book")}
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 pt-24"
        style={{ overflow: "hidden" }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p
            className="animate-fade-up"
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.75rem",
              fontWeight: 400,
            }}
          >
            {t("hero.tag")}
          </p>

          <h1
            className="animate-fade-up delay-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              marginBottom: "1.75rem",
            }}
          >
            {t("hero.h1a")}
            <br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>
              {t("hero.h1b")}
            </em>
          </h1>

          <p
            className="animate-fade-up delay-2"
            style={{
              color: "var(--muted)",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: "0 auto 2.75rem",
              fontWeight: 300,
            }}
          >
            {t("hero.sub")}
          </p>

          <div className="animate-fade-up delay-3 flex gap-4 flex-wrap justify-center">
            <Link
              href="/book"
              style={{
                background: "var(--gold)",
                color: "#0c0c0e",
                padding: "0.85rem 2.2rem",
                borderRadius: "2px",
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t("hero.cta1")}
            </Link>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                border: "1px solid var(--border-hover)",
                color: "var(--foreground)",
                padding: "0.85rem 2.2rem",
                borderRadius: "2px",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {t("hero.cta2")}
            </Link>
          </div>
        </div>

        <div
          className="animate-fade-up delay-5 absolute bottom-10 left-1/2"
          style={{ transform: "translateX(-50%)" }}
          aria-hidden
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, var(--border-hover), transparent)",
              margin: "0 auto",
            }}
          />
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────── */}
      <section id="services" className="px-8 md:px-14 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.75rem",
              }}
            >
              {t("services.label")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.1,
              }}
            >
              {t("services.h2a")}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--muted)" }}>
                {t("services.h2b")}
              </em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {(["01", "02", "03"] as const).map((num) => (
              <div
                key={num}
                style={{
                  background: "var(--surface)",
                  padding: "2.5rem 2rem",
                  position: "relative",
                  transition: "background 0.2s",
                }}
                className="group hover:bg-[#1a1a1f]"
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    fontWeight: 600,
                    color: "var(--border-hover)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "1.5rem",
                  }}
                >
                  {num}
                </span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.75rem", letterSpacing: "0.01em" }}>
                  {t(`services.${num}.title`)}
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                  {t(`services.${num}.desc`)}
                </p>
                <span
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    borderTop: "1px solid var(--border)",
                    paddingTop: "1rem",
                    display: "block",
                  }}
                >
                  {t(`services.${num}.tag`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF / STATS ───────────────────────────────── */}
      <section
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
        className="px-8 md:px-14 py-16"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "48h", key: "48h" },
            { val: "3×", key: "3x" },
            { val: "100%", key: "100" },
            { val: "24/7", key: "247" },
          ].map((s) => (
            <div key={s.val}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.8rem",
                  fontWeight: 600,
                  color: "var(--gold)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {s.val}
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.5 }}>
                {t(`stats.${s.key}.label`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section className="px-8 md:px-14 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
              {t("how.label")}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600 }}>
              {t("how.h2")}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {(["1", "2", "3", "4"] as const).map((n) => (
              <div key={n} className="flex flex-col gap-3">
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    border: "1px solid var(--gold)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {n}
                </div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 500 }}>{t(`how.${n}.t`)}</h4>
                <p style={{ color: "var(--muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>{t(`how.${n}.d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section id="pricing" className="px-8 md:px-14 py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
              {t("pricing.label")}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, lineHeight: 1.1 }}>
              {t("pricing.h2a")}
              <br />
              <em style={{ fontStyle: "italic", color: "var(--muted)" }}>{t("pricing.h2b")}</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {(["starter", "business", "resto"] as const).map((key) => {
              const highlight = key === "business";
              return (
                <div
                  key={key}
                  style={{
                    background: highlight ? "var(--surface)" : "var(--background)",
                    padding: "2.5rem 2rem",
                    position: "relative",
                    border: highlight ? "1px solid var(--gold)" : "none",
                    marginTop: highlight ? "-1px" : "0",
                  }}
                >
                  {highlight && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-1px",
                        left: "2rem",
                        background: "var(--gold)",
                        color: "#0c0c0e",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.75rem",
                      }}
                    >
                      {t("pricing.popular")}
                    </span>
                  )}
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem" }}>
                    {t(`plan.${key}.name`)}
                  </p>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", fontWeight: 600, color: highlight ? "var(--gold)" : "var(--foreground)", marginBottom: "0.25rem" }}>
                    {t(`plan.${key}.price`)}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--muted)", marginBottom: "1.25rem", letterSpacing: "0.04em" }}>
                    {t("pricing.starting")}
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                    {t(`plan.${key}.desc`)}
                  </p>
                  <ul style={{ marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {(["f1", "f2", "f3", "f4", "f5"] as const).map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.85rem", color: "var(--foreground)" }}>
                        <span style={{ color: "var(--gold)", fontSize: "0.75rem" }}>✓</span>
                        {t(`plan.${key}.${f}`)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    style={{
                      display: "block",
                      textAlign: "center",
                      background: highlight ? "var(--gold)" : "transparent",
                      color: highlight ? "#0c0c0e" : "var(--foreground)",
                      border: highlight ? "none" : "1px solid var(--border-hover)",
                      padding: "0.85rem",
                      borderRadius: "2px",
                      fontSize: "0.8rem",
                      fontWeight: highlight ? 500 : 400,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("pricing.bookcall")}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* AI Chatbot add-on */}
          <div
            style={{
              marginTop: "1px",
              background: "var(--surface)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              borderTop: "1px solid var(--border)",
            }}
            className="md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.4rem" }}>
                {t("addon.label")}
              </p>
              <p style={{ fontWeight: 500, fontSize: "1rem", marginBottom: "0.25rem" }}>{t("addon.title")}</p>
              <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{t("addon.desc")}</p>
            </div>
            <Link
              href="/book"
              style={{
                display: "inline-block",
                border: "1px solid var(--gold)",
                color: "var(--gold)",
                padding: "0.7rem 1.8rem",
                borderRadius: "2px",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {t("addon.cta")}
            </Link>
          </div>

          <p style={{ color: "var(--muted)", fontSize: "0.78rem", textAlign: "center", marginTop: "1.5rem", lineHeight: 1.7 }}>
            {t("pricing.note")}
          </p>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section
        className="px-8 md:px-14 py-24 mx-8 md:mx-14 mb-20 rounded-sm"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              marginBottom: "1.25rem",
            }}
          >
            {t("cta.h").replace(t("cta.em"), "")}{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{t("cta.em")}</em>
          </p>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            {t("cta.sub")}
          </p>
          <Link
            href="/book"
            style={{
              display: "inline-block",
              background: "var(--gold)",
              color: "#0c0c0e",
              padding: "0.9rem 2.6rem",
              borderRadius: "2px",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {t("cta.btn")}
          </Link>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer
        className="px-8 md:px-14 py-10 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.06em" }}>
          Ameni AI
        </span>
        <p style={{ color: "var(--muted)", fontSize: "0.8rem" }}>
          {t("footer.copy")}
        </p>
        <div className="flex gap-6">
          <Link href="#services" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{t("footer.services")}</Link>
          <Link href="#pricing" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{t("footer.pricing")}</Link>
          <Link href="/book" style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{t("footer.book")}</Link>
        </div>
      </footer>

    </div>
  );
}

export default function Home() {
  return <HomeContent />;
}
