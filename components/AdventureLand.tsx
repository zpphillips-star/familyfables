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

function HillDivider({ fill }: { fill: string }) {
  return (
    <div
      className="adventure-divider-wrap"
      style={{
        position: "absolute",
        bottom: -2,
        left: 0,
        width: "100%",
        height: 120,
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <path
          d="M0,120 L0,70 C180,110 360,30 540,60 C720,90 900,20 1080,50 C1260,80 1380,40 1440,55 L1440,120 Z"
          fill={fill}
          fillOpacity="0.5"
        />
        <path
          d="M0,120 L0,80 C200,120 400,45 600,70 C800,95 1000,35 1200,60 C1320,75 1400,50 1440,65 L1440,120 Z"
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
        bottom: -2,
        left: 0,
        width: "100%",
        height: 100,
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,100 L0,100 Z"
          fill={fill}
          fillOpacity="0.4"
        />
        <path
          d="M0,70 C200,110 440,30 720,70 C1000,110 1240,30 1440,70 L1440,100 L0,100 Z"
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
        bottom: -2,
        left: 0,
        width: "100%",
        height: 120,
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
        aria-hidden="true"
      >
        <path d="M0,60 Q720,120 1440,40 L1440,120 L0,120 Z" fill={fill} fillOpacity="0.4" />
        <path d="M0,80 Q720,120 1440,60 L1440,120 L0,120 Z" fill={fill} />
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
        minHeight: "92vh",
        background: gradient,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
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
      <div
        className="adventure-milestone-wrap"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [isEven ? "right" : "left"]: "clamp(8px, 3vw, 48px)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          width: 44,
        }}
        aria-hidden="true"
      >
        {/* Numbered circle — the SVG AdventurePath trails through/under this */}
        <div
          className="adventure-milestone-number"
          style={{
            position: "relative",
            zIndex: 1,
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: accentColor,
            border: "3px solid rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 900,
            color: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
          }}
        >
          {index}
        </div>
      </div>

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
        {/* Book cover */}
        <div
          className="adventure-cover-outer"
          style={{
            flex: "0 0 auto",
            position: "relative",
          }}
        >
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
              color: "rgba(255,255,255,0.75)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 6,
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
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
