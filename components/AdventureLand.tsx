"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
 * Ribbon divider — sits exactly at the section seam (bottom: 0 of the section,
 * SVG overflows upward into the current section and the fill bleeds into the
 * next section via overflow:visible on the parent section).
 * Both the top edge AND the bottom edge are curved — no straight lines.
 */
function HillDivider({ fill }: { fill: string }) {
  return (
    <div
      className="adventure-divider-wrap"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 160,
        pointerEvents: "none",
        zIndex: 4,
        overflow: "visible",
      }}
    >
      {/* viewBox 0 0 1440 160: section seam is at y=80 (midpoint).
          Top curve dips into current section (y ≈ 20-60).
          Bottom curve dips into next section (y ≈ 100-145).
          No path ever touches y=0 or y=160 exactly → both edges stay organic. */}
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "200px", display: "block", position: "absolute", bottom: 0 }}
        aria-hidden="true"
      >
        {/* Shadow/depth layer */}
        <path
          d="M0,45 C180,5 360,75 540,35 C720,0 900,60 1080,25 C1260,0 1380,45 1440,30
             L1440,115 C1260,150 1080,100 900,135 C720,165 540,110 360,148 C200,175 80,130 0,155 Z"
          fill={fill}
          fillOpacity="0.35"
        />
        {/* Main ribbon */}
        <path
          d="M0,58 C200,15 420,88 660,42 C900,0 1150,70 1440,38
             L1440,128 C1200,165 960,105 720,148 C480,180 240,118 0,148 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function WaveDivider({ fill }: { fill: string }) {
  return (
    <div
      className="adventure-divider-wrap"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 160,
        pointerEvents: "none",
        zIndex: 4,
        overflow: "visible",
      }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "200px", display: "block", position: "absolute", bottom: 0 }}
        aria-hidden="true"
      >
        <path
          d="M0,50 C180,10 360,90 540,45 C720,5 900,80 1080,40 C1260,5 1380,55 1440,35
             L1440,120 C1260,155 1080,95 900,135 C720,170 540,105 360,150 C180,180 80,125 0,150 Z"
          fill={fill}
          fillOpacity="0.35"
        />
        <path
          d="M0,62 C240,15 480,100 720,52 C960,8 1200,85 1440,45
             L1440,135 C1200,170 960,108 720,150 C480,180 240,115 0,158 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

function SlopeDivider({ fill }: { fill: string }) {
  return (
    <div
      className="adventure-divider-wrap"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 160,
        pointerEvents: "none",
        zIndex: 4,
        overflow: "visible",
      }}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "200px", display: "block", position: "absolute", bottom: 0 }}
        aria-hidden="true"
      >
        <path
          d="M0,40 Q240,5 480,55 Q720,100 960,35 Q1200,0 1440,50
             L1440,120 Q1200,155 960,110 Q720,165 480,120 Q240,80 0,130 Z"
          fill={fill}
          fillOpacity="0.35"
        />
        <path
          d="M0,55 Q240,15 480,70 Q720,115 960,50 Q1200,10 1440,65
             L1440,138 Q1200,165 960,125 Q720,175 480,135 Q240,100 0,148 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

const DIVIDER_MAP = {
  hill: HillDivider,
  wave: WaveDivider,
  cloud: HillDivider, // fallback
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

  return (
    <section
      id={id}
      className="adventure-land-section"
      style={{
        position: "relative",
        background: gradient,
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        paddingBottom: 120, // space for the ribbon divider overlap
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
          padding: "80px clamp(24px, 6vw, 80px)",
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

        {/* Character art — separate column, beside the cover, not overlapping */}
        {characterImage && (
          <div
            className="adventure-char-wrap"
            style={{
              flex: "0 0 auto",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "clamp(80px, 12vw, 160px)",
              pointerEvents: "none",
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.35))",
              animation: "adventureFloat 4s ease-in-out infinite",
            }}
          >
            <Image
              src={characterImage}
              alt={characterAlt || "character"}
              width={160}
              height={200}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="(max-width: 768px) 80px, 160px"
            />
          </div>
        )}

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
