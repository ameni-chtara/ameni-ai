"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "👋 Hi! I'm AMENI AI's assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700&display=swap');

        .cw-root * { box-sizing: border-box; margin: 0; padding: 0; }

        .cw-bubble {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%);
          border: 2px solid #e8c97e;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(232, 201, 126, 0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cw-bubble:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 32px rgba(232, 201, 126, 0.45);
        }
        .cw-bubble svg { width: 24px; height: 24px; }

        .cw-window {
          position: fixed;
          bottom: 96px;
          right: 28px;
          z-index: 9998;
          width: 360px;
          height: 520px;
          border-radius: 20px;
          background: #0d0d0d;
          border: 1px solid #2a2a2a;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,201,126,0.1);
          font-family: 'DM Sans', sans-serif;
          transform-origin: bottom right;
          animation: cw-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes cw-pop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .cw-header {
          padding: 16px 20px;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%);
          border-bottom: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cw-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e8c97e, #c9a84c);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0d0d0d;
          flex-shrink: 0;
        }
        .cw-header-info { flex: 1; }
        .cw-header-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #e8c97e;
          letter-spacing: 0.02em;
        }
        .cw-header-status {
          font-size: 11px;
          color: #666;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 2px;
        }
        .cw-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: cw-pulse 2s infinite;
        }
        @keyframes cw-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .cw-close {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s;
          display: flex;
        }
        .cw-close:hover { color: #e8c97e; }

        .cw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: #2a2a2a transparent;
        }
        .cw-messages::-webkit-scrollbar { width: 4px; }
        .cw-messages::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }

        .cw-msg {
          display: flex;
          flex-direction: column;
          max-width: 82%;
          animation: cw-fadein 0.2s ease;
        }
        @keyframes cw-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cw-msg.user { align-self: flex-end; align-items: flex-end; }
        .cw-msg.bot  { align-self: flex-start; align-items: flex-start; }

        .cw-bubble-msg {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.55;
          white-space: pre-wrap;
        }
        .cw-msg.user .cw-bubble-msg {
          background: linear-gradient(135deg, #e8c97e, #c9a84c);
          color: #0d0d0d;
          border-bottom-right-radius: 4px;
          font-weight: 500;
        }
        .cw-msg.bot .cw-bubble-msg {
          background: #1a1a1a;
          color: #e0e0e0;
          border: 1px solid #2a2a2a;
          border-bottom-left-radius: 4px;
        }

        .cw-typing {
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        .cw-typing span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #555;
          animation: cw-bounce 1.2s infinite;
        }
        .cw-typing span:nth-child(2) { animation-delay: 0.15s; }
        .cw-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes cw-bounce {
          0%, 60%, 100% { transform: translateY(0); background: #555; }
          30% { transform: translateY(-5px); background: #e8c97e; }
        }

        .cw-footer {
          padding: 12px 16px;
          border-top: 1px solid #1e1e1e;
          background: #0d0d0d;
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .cw-input {
          flex: 1;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 10px 14px;
          color: #e0e0e0;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          resize: none;
          outline: none;
          max-height: 100px;
          line-height: 1.4;
          transition: border-color 0.2s;
        }
        .cw-input::placeholder { color: #444; }
        .cw-input:focus { border-color: #e8c97e44; }

        .cw-send {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e8c97e, #c9a84c);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.15s;
        }
        .cw-send:hover:not(:disabled) { transform: scale(1.05); }
        .cw-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .cw-send svg { width: 16px; height: 16px; color: #0d0d0d; }

        @media (max-width: 420px) {
          .cw-window { width: calc(100vw - 32px); right: 16px; bottom: 88px; }
          .cw-bubble { right: 16px; bottom: 16px; }
        }
      `}</style>

      <div className="cw-root">
        {/* Chat Window */}
        {open && (
          <div className="cw-window">
            {/* Header */}
            <div className="cw-header">
              <div className="cw-avatar">AI</div>
              <div className="cw-header-info">
                <div className="cw-header-name">AMENI AI</div>
                <div className="cw-header-status">
                  <span className="cw-dot" />
                  Online · Ready to help
                </div>
              </div>
              <button className="cw-close" onClick={() => setOpen(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="cw-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`cw-msg ${msg.role}`}>
                  <div className="cw-bubble-msg">{msg.text}</div>
                </div>
              ))}
              {loading && (
                <div className="cw-typing">
                  <span /><span /><span />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="cw-footer">
              <textarea
                className="cw-input"
                rows={1}
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className="cw-send" onClick={sendMessage} disabled={loading || !input.trim()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Floating Bubble */}
        <button className="cw-bubble" onClick={() => setOpen((o) => !o)}>
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#e8c97e" strokeWidth="2">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
