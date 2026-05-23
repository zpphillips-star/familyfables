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
  dividerType?: "hill" | "wave" | "cloud" | "slope";
  activities: LandActivity[];
  accentColor: string;
  textColor?: string;
  flip?: boolean; // whether content is on the left (vs right)
  // small floating decorations specific to this land
  decorations?: React.ReactNode;
}

/**
 * Ribbon dividers — positioned at bottom:-80px so they straddle the seam
 * between two sections (80px into current section, 80px into next).
 * The seam sits at y=80 in the 160px viewBox.
 * Both top AND bottom edges are curved — ribbon is ~50-60px thick.
 */
/** Wave divider — exact same code as book detail page hero wave */
function HillDivider({ fill }: { fill: string }) {
  return (
    <div style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 64, pointerEvents: "none", zIndex: 4 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
        <path d="M0,40 C360,16 720,58 1080,22 C1260,10 1380,50 1440,32 L1440,64 L0,64 Z" fill={fill} />
      </svg>
    </div>
  );
}

function WaveDivider({ fill }: { fill: string }) {
  return (
    <div style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 64, pointerEvents: "none", zIndex: 4 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
        <path d="M0,32 C240,56 540,8 840,46 C1060,60 1280,14 1440,38 L1440,64 L0,64 Z" fill={fill} />
      </svg>
    </div>
  );
}

function SlopeDivider({ fill }: { fill: string }) {
  return (
    <div style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 64, pointerEvents: "none", zIndex: 4 }}>
      <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
        <path d="M0,44 Q360,8 720,40 Q1080,68 1440,26 L1440,64 L0,64 Z" fill={fill} />
      </svg>
    </div>
  );
}

const DIVIDER_MAP = {
  hill: HillDivider,
  wave: WaveDivider,
  cloud: HillDivider,
  slope: SlopeDivider,
};

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
  dividerType = "hill",
  activities,
  accentColor,
  textColor = "#ffffff",
  flip = false,
  decorations,
}: AdventureLandProps) {
  const Divider = DIVIDER_MAP[dividerType];
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
        cursor: "pointer",
      }}
    >
      {/* ── Decorations ─────────────────────────────────────────────── */}
      {decorations && (
        <div
          style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}
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
          padding: "32px clamp(24px, 6vw, 80px) 96px",
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
      <Divider fill={nextGradientColor} />
    </section>
  );
}

