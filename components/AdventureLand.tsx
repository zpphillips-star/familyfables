"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AMAZON_STORE_URL } from "@/lib/books";

export interface LandActivity {
  label: string;
  href: string;
  external?: boolean;
  emoji?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface AdventureLandProps {
  id: string;
  index: number; // 1-12
  emoji: string;
  landName: string;
  tagline: string;
  bookTitle: string;
  bookSlug: string;
  coverImage: string;
  characterImage?: string;
  characterAlt?: string;
  gradient: string; // CSS gradient string for this land
  nextGradientColor: string; // solid color of NEXT section for divider
  activities: LandActivity[];
  accentColor: string;
  textColor?: string;
  flip?: boolean; // whether content is on the left (vs right)
  // small floating decorations specific to this land
  decorations?: React.ReactNode;
}

/**
 * 12 unique organic squiggle paths — all same gentle wave style,
 * each with a different amplitude, phase, and curve profile.
 * All use viewBox "0 0 1440 64" and fill downward to y=64.
 */
const SQUIGGLE_PATHS: Record<number, string> = {
  1:  "M0,38 C240,10 480,58 720,30 C960,4 1200,52 1440,24 L1440,64 L0,64 Z",
  2:  "M0,32 C240,56 540,8 840,46 C1060,60 1280,14 1440,38 L1440,64 L0,64 Z",
  3:  "M0,28 C200,52 400,12 600,44 C800,58 1000,14 1200,46 C1320,56 1400,30 1440,36 L1440,64 L0,64 Z",
  4:  "M0,42 C300,16 600,54 900,20 C1100,4 1300,48 1440,30 L1440,64 L0,64 Z",
  5:  "M0,20 C180,50 360,8 540,40 C720,58 900,16 1080,48 C1200,60 1340,26 1440,34 L1440,64 L0,64 Z",
  6:  "M0,48 C240,18 480,58 720,26 C960,2 1200,52 1440,20 L1440,64 L0,64 Z",
  7:  "M0,36 C360,10 720,58 1080,16 C1260,2 1380,50 1440,32 L1440,64 L0,64 Z",
  8:  "M0,24 C160,56 320,6 480,46 C640,58 800,10 960,42 C1120,60 1280,18 1440,40 L1440,64 L0,64 Z",
  9:  "M0,40 C280,12 560,54 840,18 C1020,2 1240,58 1440,26 L1440,64 L0,64 Z",
  10: "M0,30 C200,60 500,4 720,52 C900,64 1100,8 1440,36 L1440,64 L0,64 Z",
  11: "M0,44 C240,14 480,60 720,24 C960,6 1200,56 1440,28 L1440,64 L0,64 Z",
  12: "M0,22 C300,54 600,10 900,48 C1100,60 1280,12 1440,38 L1440,64 L0,64 Z",
};

function SquiggleDivider({ fill, index }: { fill: string; index: number }) {
  const d = SQUIGGLE_PATHS[index] ?? SQUIGGLE_PATHS[1];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 64, pointerEvents: "none", zIndex: 1 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
        <path d={d} fill={fill} />
      </svg>
    </div>
  );
}

export default function AdventureLand({
  id,
  index,
  emoji,
  landName,
  tagline,
  bookTitle,
  bookSlug,
  coverImage,
  characterImage,
  characterAlt,
  gradient,
  nextGradientColor,
  activities,
  accentColor,
  textColor = "#ffffff",
  flip = false,
  decorations,
}: AdventureLandProps) {
  const isEven = index % 2 === 0;
  const router = useRouter();

  return (
    <section
      id={id}
      className="adventure-land-section"
      onClick={(e) => {
        // If click landed on/inside a real link or button, let it handle itself
        const target = e.target as HTMLElement;
        if (target.closest("a, button")) return;
        router.push(`/books/${bookSlug}`);
      }}
      style={{
        position: "relative",
        background: gradient,
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        // Each section slides 64px under the previous section's wave.
        // Decreasing z-index ensures earlier sections (higher z) paint their
        // wave ON TOP of later sections' backgrounds. No stacking-context tricks.
        marginTop: -64,
        zIndex: 20 - index,
        cursor: "pointer",
      }}
    >
      {/* ── Milestone marker (continuous dotted path node) ──────────── */}
      {/*
       * The wrap spans the full section height (top:0 → bottom:0).
       * A dotted line div runs the entire height behind the number badge,
       * so when adjacent sections stack, their lines meet seamlessly — creating
       * one unbroken dotted thread from Land 1 to Land 12.
       * Hidden on mobile via globals.css (.adventure-milestone-wrap display:none).
       */}
      {/* Colored badge removed — "Land #" label lives inline with the title */}

      {/* ── Decorations ─────────────────────────────────────────────── */}
      {decorations && (
        <div
          style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
          aria-hidden="true"
        >
          {decorations}
        </div>
      )}

      {/* ── Main content ────────────────────────────────────────────── */}
      <div
        className="adventure-land-content"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "144px clamp(24px, 6vw, 80px) 80px",
          display: "flex",
          flexDirection: isEven ? "row-reverse" : "row",
          alignItems: "center",
          gap: "clamp(24px, 5vw, 72px)",
          flexWrap: "wrap",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        {/* Book cover — clicks into the land page */}
        <div
          className="adventure-cover-outer"
          style={{
            flex: "0 0 auto",
            position: "relative",
          }}
        >
          <Link href={`/books/${bookSlug}`} style={{ display: "block" }}>
            <div
              className="adventure-book-cover adventure-cover-wrap"
              style={{
                position: "relative",
                width: "clamp(140px, 22vw, 240px)",
                borderRadius: 16,
                boxShadow: "0 12px 48px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25)",
                overflow: "hidden",
                transform: `rotate(${isEven ? "2deg" : "-2deg"})`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
              }}
            >
              <Image
                src={coverImage}
                alt={`${bookTitle} book cover`}
                width={240}
                height={300}
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="(max-width: 768px) 140px, 240px"
              />
            </div>
          </Link>
        </div>



        {/* Text + activities */}
        <div className="adventure-land-text" style={{ flex: "1 1 260px", minWidth: 220 }}>
          {/* Land name */}
          <p
            style={{
              fontSize: "clamp(13px, 1.5vw, 16px)",
              fontWeight: 700,
              color: textColor,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 6,
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              opacity: 0.85,
            }}
          >
            {emoji} Land {index}
          </p>

          <h2
            className="adventure-land-title"
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(28px, 5vw, 52px)",
              color: textColor,
              lineHeight: 1.1,
              marginBottom: 10,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {landName}
          </h2>

          <p
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              color: "rgba(255,255,255,0.88)",
              fontStyle: "italic",
              marginBottom: 20,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            {tagline}
          </p>

          {/* Activity buttons */}
          <div
            className="adventure-land-btns"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {activities.map((act, i) => {
              const isShop = act.href === AMAZON_STORE_URL || act.external;
              const btnStyle: React.CSSProperties =
                act.variant === "secondary"
                  ? {
                      backgroundColor: "rgba(255,255,255,0.18)",
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,0.55)",
                      backdropFilter: "blur(4px)",
                    }
                  : act.variant === "ghost"
                  ? {
                      backgroundColor: "transparent",
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,0.6)",
                    }
                  : {
                      backgroundColor: accentColor,
                      color: "#fff",
                      border: "none",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                    };

              const baseStyle: React.CSSProperties = {
                ...btnStyle,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 20px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: "clamp(13px, 1.5vw, 15px)",
                cursor: "pointer",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              };

              if (isShop || act.external) {
                return (
                  <a
                    key={i}
                    href={act.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={baseStyle}
                    className="adventure-btn"
                  >
                    {act.emoji && <span>{act.emoji}</span>}
                    {act.label}
                  </a>
                );
              }
              return (
                <Link key={i} href={act.href} style={baseStyle} className="adventure-btn">
                  {act.emoji && <span>{act.emoji}</span>}
                  {act.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section divider into next land ──────────────────────────── */}
      <SquiggleDivider fill={nextGradientColor} index={index} />
    </section>
  );
}

