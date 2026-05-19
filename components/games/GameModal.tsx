"use client";
import { useEffect, useCallback } from "react";

interface GameModalProps {
  title: string;
  emoji: string;
  accentColor: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function GameModal({ title, emoji, accentColor, onClose, children }: GameModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "12px" }}>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }} />

      {/* Modal card */}
      <div style={{ position: "relative", background: "#fff", borderRadius: 24, maxWidth: 680, width: "100%", maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,0.45)" }}>
        {/* Header */}
        <div style={{ background: accentColor, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{emoji}</span>
            <h2 style={{ color: "#fff", fontSize: "clamp(16px, 3vw, 22px)", fontFamily: "var(--font-concert-one), 'Concert One', cursive", margin: 0, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close game"
            style={{ background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.5)", borderRadius: "50%", width: 38, height: 38, cursor: "pointer", color: "#fff", fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable game content */}
        <div style={{ overflowY: "auto", flex: 1, padding: "20px", WebkitOverflowScrolling: "touch" as const }}>
          {children}
        </div>
      </div>
    </div>
  );
}
