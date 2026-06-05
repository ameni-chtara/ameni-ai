"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { LangProvider, LangSwitcher, useLang } from "../contexts/LanguageContext";

function BookContent() {
  const { t, dir } = useLang();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!firstName.trim() || !email.trim() || !serviceType) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    const { data, error } = await supabase.from("bookings").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        company_name: companyName,
        service_type: serviceType,
        message: message,
      },
    ]).select();

    if (error) {
      console.error("Supabase error:", error);
      setStatus("error");
    } else {
      setStatus("success");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setCompanyName("");
      setServiceType("");
      setMessage("");
    }
  };

  const inputStyle = (name: string) => ({
    width: "100%",
    background: "var(--surface)",
    border: `1px solid ${focused === name ? "var(--gold)" : "var(--border)"}`,
    borderRadius: "2px",
    padding: "0.85rem 1rem",
    color: "var(--foreground)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    fontWeight: 300,
    outline: "none",
    transition: "border-color 0.2s",
    textAlign: dir === "rtl" ? "right" as const : "left" as const,
    direction: dir,
  });

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--muted)",
    marginBottom: "0.5rem",
  };

  return (
    <div
      style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh", fontFamily: "var(--font-body)" }}
      dir={dir}
    >

      {/* Navbar */}
      <nav style={{
        borderBottom: "1px solid var(--border)",
        padding: "1.25rem 3.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.06em", textDecoration: "none" }}>
          Ameni AI
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {/* Language Switcher */}
          <LangSwitcher />

          <Link href="/" style={{ color: "var(--muted)", fontSize: "0.8rem", letterSpacing: "0.08em", textDecoration: "none" }}>
            {t("nav.back")}
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
            {t("book.tag")}
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, lineHeight: 1.1, marginBottom: "1rem" }}>
            {t("book.h1a")}{" "}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>{t("book.h1b")}</em>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.8 }}>
            {t("book.sub")}
          </p>
        </div>

        {/* Success */}
        {status === "success" ? (
          <div style={{ background: "var(--surface)", border: "1px solid var(--gold)", borderRadius: "2px", padding: "3rem 2rem", textAlign: "center" }}>
            <div style={{ width: "3rem", height: "3rem", border: "1px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--gold)", fontSize: "1.2rem" }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 600, marginBottom: "0.75rem" }}>
              {t("book.success.h")}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              {t("book.success.sub")}
            </p>
            <button
              onClick={() => setStatus("idle")}
              style={{ border: "1px solid var(--border-hover)", color: "var(--foreground)", padding: "0.75rem 2rem", borderRadius: "2px", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", background: "transparent", cursor: "pointer" }}
            >
              {t("book.success.btn")}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>{t("book.firstname")}</label>
                <input
                  placeholder={t("book.ph.firstname")}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => setFocused("first_name")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("first_name")}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("book.lastname")}</label>
                <input
                  placeholder={t("book.ph.lastname")}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => setFocused("last_name")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("last_name")}
                />
              </div>
            </div>

            {/* Email + phone row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>{t("book.email")}</label>
                <input
                  type="email"
                  placeholder={t("book.ph.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("email")}
                />
              </div>
              <div>
                <label style={labelStyle}>{t("book.phone")}</label>
                <input
                  placeholder={t("book.ph.phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("phone")}
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label style={labelStyle}>{t("book.company")}</label>
              <input
                placeholder={t("book.ph.company")}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onFocus={() => setFocused("company_name")}
                onBlur={() => setFocused(null)}
                style={inputStyle("company_name")}
              />
            </div>

            {/* Service */}
            <div>
              <label style={labelStyle}>{t("book.service")}</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                onFocus={() => setFocused("service_type")}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle("service_type"),
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237a7880' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: dir === "rtl" ? "left 1rem center" : "right 1rem center",
                  paddingRight: dir === "rtl" ? "1rem" : "2.5rem",
                  paddingLeft: dir === "rtl" ? "2.5rem" : "1rem",
                }}
              >
                <option value="">{t("book.select")}</option>
                <option value="restaurant">{t("book.opt.restaurant")}</option>
                <option value="shop">{t("book.opt.shop")}</option>
                <option value="chatbot">{t("book.opt.chatbot")}</option>
                <option value="booking">{t("book.opt.booking")}</option>
                <option value="full">{t("book.opt.full")}</option>
                <option value="other">{t("book.opt.other")}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>{t("book.message")}</label>
              <textarea
                placeholder={t("book.ph.message")}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                rows={4}
                style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.7 }}
              />
            </div>

            {/* Error */}
            {status === "error" && (
              <p style={{ color: "#e24b4a", fontSize: "0.8rem", letterSpacing: "0.04em", padding: "0.75rem 1rem", border: "1px solid #e24b4a", borderRadius: "2px" }}>
                {t("book.error")}
              </p>
            )}

            {/* Submit */}
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  background: status === "loading" ? "var(--surface-2)" : "var(--gold)",
                  color: status === "loading" ? "var(--muted)" : "#0c0c0e",
                  border: "none",
                  padding: "1rem",
                  borderRadius: "2px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-body)",
                }}
              >
                {status === "loading" ? t("book.loading") : t("book.submit")}
              </button>
              <p style={{ color: "var(--muted)", fontSize: "0.75rem", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
                {t("book.note")}
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return <BookContent />;
}
