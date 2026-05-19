"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { books } from "@/lib/books";

// Build the 12 map stops from books data, sorted by landIndex
const MAP_STOPS = [...books]
  .sort((a, b) => a.landIndex - b.landIndex)
  .map((b) => ({
    id: b.slug.replace(/^(the-|whats-)/, "").replace("amber-the-", "amber-"), // map to homepage section id
    slug: b.slug,
    index: b.landIndex,
    emoji: b.landEmoji,
    landName: b.landName,
    accentColor: b.accentColor,
  }));

// Section IDs on the homepage (must match the `id` prop on each AdventureLand)
const LAND_IDS: Record<number, string> = {
  1: "amber-dragon-keeper",
  2: "poo-poo-face",
  3: "brian-the-ghost",
  4: "finding-hampton",
  5: "dream-ideas",
  6: "gilroys-gobble",
  7: "lumpiest-pumpkin",
  8: "ollie-come-home",
  9: "shut-in-button",
  10: "what-a-doodle-do",
  11: "one-tom-turkey",
  12: "frog-a-dog",
};

export default function GlobalMapDrawer() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const goToLand = (slug: string) => {
    setOpen(false);
    router.push(`/books/${slug}`);
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
          zIndex: 200,
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
            zIndex: 201,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        />
      )}

      {/* Slide-up drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Adventure Map — all 12 lands"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 202,
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
        {/* Header */}
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

        {/* Scrollable list */}
        <div style={{ overflowY: "auto", flex: 1, padding: "12px 0 24px" }}>
          {MAP_STOPS.map((stop, i) => (
            <button
              key={stop.index}
              onClick={() => goToLand(stop.slug)}
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
              {/* Connector line */}
              {i < MAP_STOPS.length - 1 && (
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
              {/* Number badge */}
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
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
