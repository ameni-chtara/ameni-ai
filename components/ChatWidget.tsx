"use client";

import { useState, useRef, useEffect } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the AMtech assistant. AMtech is a Tunisian digital agency that builds websites, booking systems, and AI chatbots for small businesses.

Your job is to answer questions about AMtech's services and pricing, and help visitors choose the right solution. Be friendly, concise, and helpful. Never mention "Ameni AI" — the company is called AMtech.

SERVICES & PRICING:
1. Website Creation — 60 TND
   Professional website designed according to the client's preferences. Custom style, layout, and features.

2. Online Booking System — 60 TND
   Allows customers to book appointments online. The business owner gets email notifications for every new booking.

3. AI Chatbot Integration — 100 TND
   An AI assistant trained specifically on the business's information, services, and FAQs. Not a generic chatbot.

4. Complete Package — 200 TND (normally 220 TND)
   Includes Website Creation + Online Booking System + AI Chatbot Integration. Best value.

CONTACT:
- Phone: +216 54 012 506
- WhatsApp: +216 93 826 499
- Booking page: /book

GUIDELINES:
- Keep answers short and clear.
- If someone asks about pricing, list the relevant service(s) with the price.
- If someone wants to get started, direct them to /book or suggest calling/WhatsApp.
- If unsure about something, say you'll connect them with the team.
- Do not make up features or services that aren't listed above.
- Respond in the same language the user writes in (Arabic, French, or English).
- For Tunisian Arabic (Derja), respond naturally in Derja.`;

// ─── ICONS ───────────────────────────────────────────────────────────────────

const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.38 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const WaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

// ─── TYPING DOTS ─────────────────────────────────────────────────────────────

const TypingDots = () => (
  <div style={{ display: "flex", gap: "5px", alignItems: "center", padding: "4px 2px" }}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: "7px", height: "7px", borderRadius: "50%", background: "#aaa",
        display: "inline-block",
        animation: "dotPulse 1.2s ease-in-out infinite",
        animationDelay: `${i * 0.18}s`,
      }} />
    ))}
  </div>
);

// ─── MAIN WIDGET ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can we help you today? We can answer questions about our services, pricing, or help you choose the right solution for your business.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open, messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? "Sorry, something went wrong. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. You can reach us directly at +216 54 012 506." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 60%, 100% { opacity: 0.25; transform: scale(0.85); }
          30% { opacity: 1; transform: scale(1); }
        }
        @keyframes widgetSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes bubblePop {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        @keyframes notifPing {
          0%   { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .chat-bubble {
          width: 58px; height: 58px;
          background: #111; color: #fff;
          border-radius: 50%; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.12);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .chat-bubble:hover {
          transform: scale(1.07);
          box-shadow: 0 8px 28px rgba(0,0,0,0.22), 0 2px 6px rgba(0,0,0,0.12);
        }
        .chat-bubble:active { transform: scale(0.97); }
        .notif-dot {
          position: absolute; top: 2px; right: 2px;
          width: 13px; height: 13px;
          background: #8B7CF6; border-radius: 50%;
          border: 2px solid #fff;
        }
        .notif-dot::after {
          content: '';
          position: absolute; inset: -2px;
          border-radius: 50%;
          background: rgba(139,124,246,0.5);
          animation: notifPing 1.6s ease-out infinite;
        }
        .chat-window {
          position: fixed;
          bottom: 84px; right: 24px;
          width: 380px;
          max-height: 560px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08);
          display: flex; flex-direction: column;
          overflow: hidden;
          border: 1px solid #ebebeb;
          animation: widgetSlideUp 0.25s ease both;
          z-index: 9999;
        }
        .chat-header {
          padding: 18px 20px 16px;
          border-bottom: 1px solid #f0f0f0;
          background: #fff;
          flex-shrink: 0;
        }
        .messages-area {
          flex: 1; overflow-y: auto;
          padding: 18px 16px;
          display: flex; flex-direction: column;
          gap: 12px;
          scroll-behavior: smooth;
        }
        .messages-area::-webkit-scrollbar { width: 4px; }
        .messages-area::-webkit-scrollbar-track { background: transparent; }
        .messages-area::-webkit-scrollbar-thumb { background: #e5e5e5; border-radius: 2px; }
        .msg-user {
          align-self: flex-end;
          background: #111; color: #fff;
          padding: 11px 15px; border-radius: 16px 16px 4px 16px;
          font-size: 14px; line-height: 1.6;
          max-width: 82%; word-break: break-word;
        }
        .msg-bot {
          align-self: flex-start;
          background: #f5f5f5; color: #111;
          padding: 11px 15px; border-radius: 16px 16px 16px 4px;
          font-size: 14px; line-height: 1.6;
          max-width: 88%; word-break: break-word;
          white-space: pre-wrap;
        }
        .typing-bubble {
          align-self: flex-start;
          background: #f5f5f5;
          padding: 10px 14px; border-radius: 16px 16px 16px 4px;
        }
        .input-area {
          padding: 12px 14px;
          border-top: 1px solid #f0f0f0;
          display: flex; gap: 8px; align-items: flex-end;
          background: #fff; flex-shrink: 0;
        }
        .chat-input {
          flex: 1; border: 1.5px solid #e5e5e5;
          border-radius: 10px; padding: 10px 14px;
          font-size: 14px; font-family: var(--font-body);
          color: #111; background: #fafafa; outline: none;
          resize: none; line-height: 1.5;
          transition: border-color 0.18s, background 0.18s;
        }
        .chat-input:focus { border-color: #8B7CF6; background: #fff; }
        .chat-input::placeholder { color: #bbb; }
        .send-btn {
          width: 40px; height: 40px; border-radius: 10px;
          background: #111; color: #fff; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background 0.18s, transform 0.15s;
        }
        .send-btn:hover:not(:disabled) { background: #333; transform: scale(1.05); }
        .send-btn:disabled { background: #ddd; cursor: not-allowed; }
        .contact-strip {
          padding: 10px 14px;
          background: #fafafa;
          border-top: 1px solid #f0f0f0;
          display: flex; gap: 8px; flex-shrink: 0;
        }
        .contact-btn {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 9px 10px; border-radius: 8px;
          font-size: 12px; font-weight: 600; text-decoration: none;
          transition: opacity 0.18s, transform 0.15s;
          font-family: var(--font-body);
        }
        .contact-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .contact-btn-phone { background: #111; color: #fff; }
        .contact-btn-wa    { background: #22c55e; color: #fff; }
        @media (max-width: 440px) {
          .chat-window {
            width: calc(100vw - 24px);
            right: 12px; left: 12px;
            bottom: 82px;
          }
        }
      `}</style>

      {/* CHAT BUBBLE */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999 }}>
        {!open && (
          <button
            className="chat-bubble"
            onClick={() => setOpen(true)}
            aria-label="Open chat"
          >
            <ChatIcon />
            <span className="notif-dot" />
          </button>
        )}
        {open && (
          <button
            className="chat-bubble"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            style={{ background: "#333" }}
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div className="chat-window" role="dialog" aria-label="AMtech chat">

          {/* Header */}
          <div className="chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: "#111", display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>A</span>
              </div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#111", letterSpacing: "-0.01em" }}>
                  AM<span style={{ color: "#8B7CF6" }}>tech</span> Assistant
                </div>
                <div style={{ fontSize: "12px", color: "#888", marginTop: "1px" }}>
                  Ask us about websites, booking systems, or AI chatbot solutions.
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ marginLeft: "auto", background: "none", border: "none", color: "#bbb", cursor: "pointer", padding: "4px", borderRadius: "6px", display: "flex", transition: "color 0.18s" }}
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-area">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "msg-user" : "msg-bot"}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="typing-bubble">
                <TypingDots />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="input-area">
            <input
              ref={inputRef}
              className="chat-input"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
              aria-label="Chat input"
            />
            <button
              className="send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>

          {/* Contact strip */}
          <div className="contact-strip">
            <a href="tel:+21654012506" className="contact-btn contact-btn-phone">
              <PhoneIcon /> Call us
            </a>
            <a href="https://wa.me/21693826499" target="_blank" rel="noopener noreferrer" className="contact-btn contact-btn-wa">
              <WaIcon /> WhatsApp
            </a>
          </div>

        </div>
      )}
    </>
  );
}
