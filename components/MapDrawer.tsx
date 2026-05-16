"use client";

import { useState } from "react";

export interface MapStop {
  id: string;
  index: number;
  emoji: string;
  landName: string;
  accentColor: string;
}

interface MapDrawerProps {
  stops: MapStop[];
}

export default function MapDrawer({ stops }: MapDrawerProps) {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Floating map button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open adventure map"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 100,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#6B3FA0",
          border: "3px solid rgba(255,255,255,0.75)",
          boxShadow: "0 6px 24px rgba(107,63,160,0.5)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        className="map-fab"
      >
        🗺️
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 101,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Adventure Map — all 12 lands"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 102,
          width: "min(380px, 100vw)",
          maxHeight: "85vh",
          backgroundColor: "#1a0a3a",
          borderRadius: "24px 24px 0 0",
          boxShadow: "0 -8px 48px rgba(0,0,0,0.5)",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Drawer header */}
        <div
          style={{
            padding: "16px 20px 12px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              style={{
                color: "#fff",
                fontSize: 18,
                fontWeight: 900,
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                margin: 0,
              }}
            >
              🗺️ Adventure Map
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, margin: "2px 0 0" }}>
              12 magical worlds — tap to explore
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close map"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              color: "#fff",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable stops list */}
        <div style={{ overflowY: "auto", flex: 1, padding: "12px 0 24px" }}>
          {stops.map((stop, i) => (
            <button
              key={stop.id}
              onClick={() => scrollTo(stop.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "10px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s ease",
                position: "relative",
              }}
              className="map-stop-btn"
            >
              {/* Vertical path connector */}
              {i < stops.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: 30,
                    top: "50%",
                    width: 2,
                    height: "100%",
                    borderLeft: "2px dashed rgba(255,255,255,0.2)",
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Numbered marker */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: stop.accentColor,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#fff",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: `0 2px 8px ${stop.accentColor}80`,
                }}
              >
                {stop.index}
              </div>

              {/* Land info */}
              <div style={{ flex: 1 }}>
                <span
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    display: "block",
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                  }}
                >
                  {stop.emoji} {stop.landName}
                </span>
              </div>

              {/* Arrow */}
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
