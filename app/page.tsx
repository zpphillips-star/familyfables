"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AdventureLand, { AdventureLandProps } from "@/components/AdventureLand";
import MapDrawer, { MapStop } from "@/components/MapDrawer";
import { AMAZON_STORE_URL } from "@/lib/books";

// ── Scroll indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        marginTop: 40,
        animation: "adventureBounce 1.8s ease-in-out infinite",
      }}
      aria-hidden="true"
    >
      <span
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 13,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
        }}
      >
        scroll to explore
      </span>
      <span style={{ fontSize: 28 }}>🐾</span>
      <span style={{ fontSize: 28, marginTop: -8, opacity: 0.6 }}>🐾</span>
    </div>
  );
}

// ── Decorative helpers ────────────────────────────────────────────────────────
function Stars({ count = 20, color = "rgba(255,255,255,0.6)" }: { count?: number; color?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 47 + 11) % 100}%`,
            top: `${(i * 31 + 7) % 90}%`,
            fontSize: `${8 + (i % 4) * 5}px`,
            color,
            opacity: 0.4 + (i % 5) * 0.12,
            animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite ${i * 0.3}s`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </>
  );
}

function Leaves({ count = 12 }: { count?: number }) {
  const leaves = ["🍁", "🍂", "🍃", "🌿"];
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 53 + 5) % 100}%`,
            top: `${(i * 37 + 10) % 95}%`,
            fontSize: `${14 + (i % 3) * 8}px`,
            opacity: 0.25 + (i % 4) * 0.1,
            transform: `rotate(${i * 37}deg)`,
            animation: `adventureFloat ${3 + (i % 3)}s ease-in-out infinite ${i * 0.4}s`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          {leaves[i % 4]}
        </span>
      ))}
    </>
  );
}

function Pumpkins() {
  const emojis = ["🎃", "✨", "🕷️", "🌙", "⭐"];
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 67 + 3) % 100}%`,
            top: `${(i * 43 + 8) % 92}%`,
            fontSize: `${16 + (i % 3) * 10}px`,
            opacity: 0.2 + (i % 5) * 0.1,
            animation: `adventureFloat ${2.5 + (i % 3)}s ease-in-out infinite ${i * 0.5}s`,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          {emojis[i % 5]}
        </span>
      ))}
    </>
  );
}

// ── The 12 lands data ─────────────────────────────────────────────────────────
const SHOP = AMAZON_STORE_URL;

type LandDef = Omit<AdventureLandProps, "decorations">;

const landDefs: LandDef[] = [
  // 1. Dream Ideas Land
  {
    id: "dream-ideas",
    index: 1,
    emoji: "🌙",
    landName: "Dream Ideas Land",
    tagline: "Your best idea ever is waiting in a dream",
    bookTitle: "Dream Ideas",
    coverImage: "/images/books/dream-ideas.png",
    characterImage: "/images/characters/dream-ideas-400-height.png",
    characterAlt: "Dream Ideas character",
    gradient: "linear-gradient(160deg, #0a0422 0%, #1a1060 35%, #2d1b80 65%, #4a2da0 100%)",
    nextGradientColor: "#2d0a3a",
    dividerType: "cloud",
    activities: [
      { label: "🎵 Play Lullaby", href: "/activities", variant: "primary" },
      { label: "Explore this Land →", href: "/books/dream-ideas", variant: "secondary" },
    ],
    accentColor: "#5B9BD5",
    textColor: "#e8d8ff",
    flip: false,
  },
  // 2. Amber's Dragon Mountain
  {
    id: "amber-dragon-keeper",
    index: 2,
    emoji: "🐉",
    landName: "Dragon Mountain",
    tagline: "She didn't ask to be a dragon keeper — the dragons had other plans",
    bookTitle: "Amber The Dragon Keeper",
    coverImage: "/images/books/amber-cover-square.jpg",
    characterImage: "/images/characters/amber-no-background.png",
    characterAlt: "Amber the Dragon Keeper",
    gradient: "linear-gradient(155deg, #2d0a3a 0%, #5a1060 30%, #8b1a6b 60%, #c0394a 100%)",
    nextGradientColor: "#fff3e0",
    dividerType: "hill",
    activities: [
      { label: "📖 Read It To Me", href: "/read/amber-dragon-keeper", variant: "primary" },
      { label: "Explore this Land →", href: "/books/amber-the-dragon-keeper", variant: "secondary" },
    ],
    accentColor: "#E86BB5",
    textColor: "#ffe8f5",
    flip: true,
  },
  // 3. Poo Poo Face Town
  {
    id: "poo-poo-face",
    index: 3,
    emoji: "😂",
    landName: "Poo Poo Face Town",
    tagline: "Everybody makes it — even dragons, even unicorns, even your teacher",
    bookTitle: "What's Your Poo Poo Face",
    coverImage: "/images/books/poo-poo-face.png",
    characterImage: "/images/characters/poo-poo-dragon.png",
    characterAlt: "Poo Poo Dragon",
    gradient: "linear-gradient(150deg, #fff3e0 0%, #ffe08a 30%, #ffb3c6 70%, #ff8fab 100%)",
    nextGradientColor: "#e8f5e9",
    dividerType: "wave",
    activities: [
      { label: "📖 Read It To Me", href: "/read/poo-poo-face", variant: "primary" },
      { label: "Explore this Land →", href: "/books/whats-your-poo-poo-face", variant: "secondary" },
    ],
    accentColor: "#9B6FD0",
    textColor: "#4a1060",
    flip: false,
  },
  // 4. Hampton's Quest Meadow
  {
    id: "finding-hampton",
    index: 4,
    emoji: "🎈",
    landName: "Hampton's Quest Meadow",
    tagline: "The perfect gift isn't a thing — it's a feeling",
    bookTitle: "Finding Hampton",
    coverImage: "/images/books/finding-hampton.png",
    characterImage: "/images/characters/finding-hampton-400-height.png",
    characterAlt: "Hampton",
    gradient: "linear-gradient(155deg, #e8f5e9 0%, #a5d6a7 30%, #66bb6a 60%, #43a047 100%)",
    nextGradientColor: "#fff8e1",
    dividerType: "slope",
    activities: [
      { label: "Explore this Land →", href: "/books/finding-hampton", variant: "primary" },
    ],
    accentColor: "#5CB85C",
    textColor: "#1b3a1e",
    flip: true,
  },
  // 5. Gilroy's Harvest Forest
  {
    id: "gilroys-gobble",
    index: 5,
    emoji: "🦃",
    landName: "Gilroy's Harvest Forest",
    tagline: "Be different — your voice is yours and yours alone",
    bookTitle: "Gilroy's Gobble",
    coverImage: "/images/books/gilroys-gobble.png",
    characterImage: "/images/characters/gilroys-gobble-483-height.png",
    characterAlt: "Gilroy the turkey",
    gradient: "linear-gradient(150deg, #fff8e1 0%, #ffcc80 30%, #ffa726 65%, #e65100 100%)",
    nextGradientColor: "#3e1a00",
    dividerType: "hill",
    activities: [
      { label: "Explore this Land →", href: "/books/gilroys-gobble", variant: "primary" },
    ],
    accentColor: "#F4A839",
    textColor: "#3e1a00",
    flip: false,
  },
  // 6. Lumpiest Pumpkin Patch
  {
    id: "lumpiest-pumpkin",
    index: 6,
    emoji: "🎃",
    landName: "The Lumpiest Pumpkin Patch",
    tagline: "The most beautiful things are the ones nobody else wanted",
    bookTitle: "The Lumpiest Pumpkin",
    coverImage: "/images/books/lumpiest-pumpkin.png",
    characterImage: "/images/characters/lumpiest-pumpkin-400.png",
    characterAlt: "The Lumpiest Pumpkin",
    gradient: "linear-gradient(155deg, #3e1a00 0%, #6a2a0a 25%, #bf5600 55%, #ff8c00 80%, #ff6b35 100%)",
    nextGradientColor: "#1a2a1a",
    dividerType: "wave",
    activities: [
      { label: "Explore this Land →", href: "/books/the-lumpiest-pumpkin", variant: "primary" },
    ],
    accentColor: "#E07B39",
    textColor: "#fff3e0",
    flip: true,
  },
  // 7. Ollie's Cozy Corner
  {
    id: "ollie-come-home",
    index: 7,
    emoji: "🐱",
    landName: "Ollie's Cozy Corner",
    tagline: "Adventure awaits — but home is always sweeter",
    bookTitle: "Ollie Come Home",
    coverImage: "/images/books/ollie-come-home.png",
    characterImage: "/images/characters/ollie-383-height.png",
    characterAlt: "Ollie the cat",
    gradient: "linear-gradient(155deg, #1a2a1a 0%, #2d4a20 30%, #4a7c3f 60%, #6db85c 100%)",
    nextGradientColor: "#e3f0ff",
    dividerType: "slope",
    activities: [
      { label: "Explore this Land →", href: "/books/ollie-come-home", variant: "primary" },
    ],
    accentColor: "#5CB85C",
    textColor: "#f0fff0",
    flip: false,
  },
  // 8. Shut-In Button Land
  {
    id: "shut-in-button",
    index: 8,
    emoji: "👆",
    landName: "Shut-In Button Land",
    tagline: "This button had one job — and absolutely refused to do it",
    bookTitle: "The Shut-In Button",
    coverImage: "/images/books/shut-in-button.png",
    characterImage: "/images/characters/shut-in-button-400.png",
    characterAlt: "The Shut-In Button",
    gradient: "linear-gradient(150deg, #e3f0ff 0%, #b3d4f5 30%, #7bb8f0 60%, #4a9de0 100%)",
    nextGradientColor: "#fff9e6",
    dividerType: "hill",
    activities: [
      { label: "Explore this Land →", href: "/books/the-shut-in-button", variant: "primary" },
    ],
    accentColor: "#5B9BD5",
    textColor: "#0a2d61",
    flip: true,
  },
  // 9. Doodle-Do's Barnyard
  {
    id: "what-a-doodle-do",
    index: 9,
    emoji: "🐓",
    landName: "Doodle-Do's Barnyard",
    tagline: "One very loud rooster. Zero chill. Maximum fun.",
    bookTitle: "What-a-Doodle-Do",
    coverImage: "/images/books/what-a-doodle-do.jpg",
    characterImage: "/images/characters/doodle-do-without-background.png",
    characterAlt: "The Doodle-Do rooster",
    gradient: "linear-gradient(155deg, #fff9e6 0%, #ffe57f 30%, #ffca28 60%, #ff8f00 100%)",
    nextGradientColor: "#fff3e8",
    dividerType: "wave",
    activities: [
      { label: "Explore this Land →", href: "/books/what-a-doodle-do", variant: "primary" },
    ],
    accentColor: "#E86BB5",
    textColor: "#3a1a00",
    flip: false,
  },
  // 10. Tom Turkey's Harvest Parade
  {
    id: "one-tom-turkey",
    index: 10,
    emoji: "🦃",
    landName: "Tom Turkey's Harvest Parade",
    tagline: "Sung to Wheels on the Bus — now it's stuck in your head. You're welcome.",
    bookTitle: "One Tom Turkey",
    coverImage: "/images/books/one-tom-turkey.png",
    characterImage: "/images/characters/turkey.jpg",
    characterAlt: "Tom Turkey",
    gradient: "linear-gradient(150deg, #fff3e8 0%, #ffccaa 30%, #e08040 60%, #c0560a 100%)",
    nextGradientColor: "#1a1a3a",
    dividerType: "slope",
    activities: [
      { label: "Explore this Land →", href: "/books/one-tom-turkey", variant: "primary" },
    ],
    accentColor: "#C06B39",
    textColor: "#fff8f0",
    flip: true,
  },
  // 11. Bailey's Frog Dream
  {
    id: "frog-a-dog",
    index: 11,
    emoji: "🐸",
    landName: "Bailey's Frog Dream",
    tagline: "She was a dog — inside, she was definitely a frog",
    bookTitle: "Frog a Dog",
    coverImage: "/images/books/frog-a-dog.png",
    characterImage: "/images/characters/bailey-frog-a-dog-400.png",
    characterAlt: "Bailey the frog-dog",
    gradient: "linear-gradient(155deg, #1a1a3a 0%, #2a3a20 30%, #3a6a2a 60%, #4a9b35 100%)",
    nextGradientColor: "#1a0a2a",
    dividerType: "hill",
    activities: [
      { label: "Explore this Land →", href: "/books/frog-a-dog", variant: "primary" },
    ],
    accentColor: "#9B6FD0",
    textColor: "#e8ffe8",
    flip: false,
  },
  // 12. Brian the Ghost's Haunted House
  {
    id: "brian-the-ghost",
    index: 12,
    emoji: "👻",
    landName: "Brian's Haunted House",
    tagline: "Every monster had one job: spook & scare. Brian liked to wave.",
    bookTitle: "Brian the Ghost",
    coverImage: "/images/books/brian-the-ghost.jpg",
    characterImage: undefined,
    gradient: "linear-gradient(155deg, #1a0a2a 0%, #2d1260 35%, #4a1a80 65%, #7b5ea7 100%)",
    nextGradientColor: "#050212",
    dividerType: "wave",
    activities: [
      { label: "Explore this Land →", href: "/books/brian-the-ghost", variant: "primary" },
    ],
    accentColor: "#7B5EA7",
    textColor: "#f0e8ff",
    flip: true,
  },
];

// Map stops for the drawer
const MAP_STOPS: MapStop[] = landDefs.map((l) => ({
  id: l.id,
  index: l.index,
  emoji: l.emoji,
  landName: l.landName,
  accentColor: l.accentColor,
}));

// Land-specific decorations
function LandDecorations({ index }: { index: number }) {
  if (index === 1) return <Stars count={25} color="rgba(200,180,255,0.7)" />;
  if (index === 2) return <Stars count={8} color="rgba(255,150,200,0.5)" />;
  if (index === 5) return <Leaves count={14} />;
  if (index === 6) return <Pumpkins />;
  if (index === 12) {
    return (
      <>
        {["👻", "🕸️", "🌙", "⭐", "🦇"].map((e, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute",
            left: `${[6, 88, 22, 76, 50][i]}%`,
            top: `${[20, 15, 78, 60, 40][i]}%`,
            fontSize: `${20 + i * 6}px`,
            opacity: 0.2,
            animation: `adventureFloat ${3 + i * 0.7}s ease-in-out infinite ${i * 0.4}s`,
          }}>{e}</span>
        ))}
      </>
    );
  }
  return null;
}

// ── Main Adventure Map Page ───────────────────────────────────────────────────
export default function AdventurelandPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Global keyframes for the adventure map ── */}
      <style>{`
        @keyframes adventureFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes adventureBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        .adventure-btn:hover {
          transform: translateY(-2px) scale(1.04) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
        }
        .adventure-book-cover:hover {
          transform: rotate(0deg) scale(1.05) !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.3) !important;
        }
        .map-fab:hover {
          transform: scale(1.1) rotate(-8deg) !important;
          box-shadow: 0 8px 32px rgba(107,63,160,0.7) !important;
        }
        .map-stop-btn:hover {
          background: rgba(255,255,255,0.08) !important;
        }
      `}</style>

      {/*
       * ── Scrolling adventure map wrapper ────────────────────────────────
       * overflow-x:hidden prevents milestone column edges causing horizontal scroll.
       * Each AdventureLand now carries its own full-height dotted milestone line.
       */}
      <div style={{ position: "relative", overflowX: "hidden" }}>

        {/* ═══ HERO — Welcome to Adventureland ═══════════════════════ */}
        <section
        ref={heroRef}
        className="adventure-hero-section"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "linear-gradient(170deg, #050212 0%, #0d0440 30%, #1a0a5a 60%, #2d1280 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px 140px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <Stars count={40} />

        {/* Floating planets */}
        {["🌙", "⭐", "✨", "💫", "🌟"].map((e, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute",
            left: `${[12, 88, 5, 78, 50][i]}%`,
            top: `${[10, 8, 55, 25, 78][i]}%`,
            fontSize: `${32 + i * 10}px`,
            opacity: 0.3,
            animation: `adventureFloat ${4 + i * 0.8}s ease-in-out infinite ${i * 0.6}s`,
            pointerEvents: "none",
          }}>{e}</span>
        ))}

        {/* Hero content */}
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "none" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          maxWidth: 700,
          position: "relative",
          zIndex: 2,
        }}>
          {/* Logo */}
          <div
            className="adventure-hero-logo-wrap"
            style={{
              width: "clamp(80px, 16vw, 140px)",
              height: "clamp(80px, 16vw, 140px)",
              position: "relative",
              filter: "drop-shadow(0 8px 32px rgba(90,50,200,0.6))",
            }}
          >
            <Image
              src="/images/logo-detail-860.png"
              alt="Family Fables"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(36px, 8vw, 80px)",
            color: "#ffffff",
            lineHeight: 1.05,
            textShadow: "0 4px 24px rgba(100,50,200,0.7), 0 2px 8px rgba(0,0,0,0.5)",
            margin: 0,
          }}>
            Welcome to<br />
            <span style={{
              background: "linear-gradient(90deg, #b388ff, #ff8fab, #ffd740, #69f0ae)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Family Fables
            </span>
            <br />Adventureland
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 22px)",
            color: "rgba(230,210,255,0.88)",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            lineHeight: 1.5,
            maxWidth: 480,
            margin: 0,
          }}>
            12 magical worlds. Each one a story. All of them waiting just for you.
            <br />
            <strong style={{ color: "#b388ff" }}>Scroll down</strong> to explore every land.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href={SHOP}
              target="_blank"
              rel="noopener noreferrer"
              className="adventure-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 50,
                backgroundColor: "#ff9c1a",
                color: "#fff",
                fontWeight: 900,
                fontSize: 16,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(255,156,26,0.4)",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              Shop All Books
            </a>

          </div>

          <ScrollIndicator />
        </div>

        {/* Hero → Land 1 transition */}
        <div style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 100, pointerEvents: "none", zIndex: 4 }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
            <path d="M0,60 C360,100 720,20 1080,60 C1260,80 1380,50 1440,60 L1440,100 L0,100 Z" fill="#0a0422" fillOpacity="0.5" />
            <path d="M0,75 C240,100 520,35 800,70 C1040,100 1280,45 1440,75 L1440,100 L0,100 Z" fill="#0a0422" />
          </svg>
        </div>
      </section>

      {/* ═══ THE 12 LANDS ════════════════════════════════════════════════════ */}
      {landDefs.map((land) => (
        <AdventureLand
          key={land.id}
          {...land}
          decorations={<LandDecorations index={land.index} />}
        />
      ))}

      {/* ═══ END OF ADVENTURE ════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(170deg, #050212 0%, #0d0440 50%, #1a0a3a 100%)",
        padding: "80px 24px",
        textAlign: "center",
        position: "relative",
      }}>
        <Stars count={20} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(24px, 5vw, 48px)",
            color: "#fff",
            marginBottom: 16,
            textShadow: "0 2px 16px rgba(100,50,200,0.5)",
          }}>
            🌟 Adventure Complete! 🌟
          </p>
          <p style={{
            color: "rgba(220,200,255,0.75)",
            fontSize: "clamp(14px, 2vw, 18px)",
            maxWidth: 480,
            margin: "0 auto 32px",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
          }}>
            You&apos;ve explored all 12 magical worlds. Ready to bring one home?
          </p>
          <a
            href={SHOP}
            target="_blank"
            rel="noopener noreferrer"
            className="adventure-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 32px",
              borderRadius: 50,
              backgroundColor: "#ff9c1a",
              color: "#fff",
              fontWeight: 900,
              fontSize: 18,
              textDecoration: "none",
              boxShadow: "0 6px 24px rgba(255,156,26,0.4)",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            🛒 Shop the Full Collection
          </a>
        </div>
      </section>

      </div>{/* end adventure-map-wrapper */}

      {/* ═══ FLOATING MAP DRAWER ══════════════════════════════════════════════ */}
      <MapDrawer stops={MAP_STOPS} />
    </>
  );
}
