"use client";
import { useState, lazy, Suspense } from "react";
import GameModal from "@/components/games/GameModal";
import { GAME_DATA } from "@/lib/gameData";
import { SCENES } from "@/components/games/GameScenes";

const WordSearch = lazy(() => import("@/components/games/WordSearch"));
const Crossword = lazy(() => import("@/components/games/Crossword"));
const FindDifferences = lazy(() => import("@/components/games/FindDifferences"));
const HiddenObjects = lazy(() => import("@/components/games/HiddenObjects"));
const MemoryMatch = lazy(() => import("@/components/games/MemoryMatch"));
const WordUnscramble = lazy(() => import("@/components/games/WordUnscramble"));
const Maze = lazy(() => import("@/components/games/Maze"));

type GameKey = "wordsearch" | "crossword" | "memory" | "unscramble" | "finddiff" | "hidden" | "maze";

interface GameCard {
  key: GameKey;
  emoji: string;
  title: string;
  color: string;
}

const GAME_CARDS: GameCard[] = [
  { key: "wordsearch",  emoji: "🔍", title: "Word Search",         color: "#6366f1" },
  { key: "crossword",   emoji: "🧩", title: "Crossword",           color: "#f59e0b" },
  { key: "memory",      emoji: "🌟", title: "Memory Match",        color: "#ec4899" },
  { key: "unscramble",  emoji: "🔡", title: "Word Unscramble",     color: "#10b981" },
  { key: "finddiff",    emoji: "👀", title: "Spot the Diff",       color: "#06b6d4" },
  { key: "hidden",      emoji: "🕵️", title: "Hidden Objects",      color: "#8b5cf6" },
  { key: "maze",        emoji: "🗺️", title: "Maze",                color: "#f97316" },
];

interface Props {
  slug: string;
  accentColor: string;
}

function LoadingSpinner({ color }: { color: string }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 16px", color }}>
      <div style={{ fontSize: 32, animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
      <p style={{ marginTop: 8, fontSize: 14 }}>Loading game…</p>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function BookGames({ slug, accentColor }: Props) {
  const [open, setOpen] = useState<GameKey | null>(null);

  const gameData = GAME_DATA[slug];
  if (!gameData) return null;

  const sceneKey = gameData.findDiff.scene;
  const scene = SCENES[sceneKey];
  const activeCard = GAME_CARDS.find(c => c.key === open);

  return (
    <>
      {/* Fun Zone section */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 8px" }}>

        {/* Playful Fun Zone header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${accentColor}dd 0%, ${accentColor}aa 100%)`,
            borderRadius: "20px 20px 0 0",
            padding: "22px 28px 18px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {["✨","⭐","🌟"].map((s, i) => (
            <span key={i} aria-hidden="true" style={{
              position: "absolute",
              fontSize: 18,
              opacity: 0.45,
              top: `${[20, 50, 25][i]}%`,
              left: `${[6, 88, 82][i]}%`,
              pointerEvents: "none",
            }}>{s}</span>
          ))}
          <p
            style={{
              fontSize: "clamp(20px, 4vw, 26px)",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              fontFamily: "var(--font-concert-one),'Concert One',cursive",
              textShadow: "0 2px 8px rgba(0,0,0,0.25)",
              letterSpacing: "0.03em",
            }}
          >
            🎮 Fun Zone!
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", margin: "4px 0 0", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
            Tap a game to play!
          </p>
        </div>

        {/* 3-column game card grid */}
        <div
          className="book-games-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            background: `${accentColor}14`,
            borderRadius: "0 0 20px 20px",
            padding: "14px",
            border: `2px solid ${accentColor}35`,
            borderTop: "none",
          }}
        >
          {GAME_CARDS.map(card => (
            <button
              key={card.key}
              onClick={() => setOpen(card.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "16px 10px 12px",
                borderRadius: 18,
                border: `2px solid ${card.color}50`,
                background: `${card.color}1a`,
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.transform = "translateY(-4px) scale(1.04)";
                btn.style.boxShadow = `0 8px 20px ${card.color}55`;
                btn.style.borderColor = `${card.color}99`;
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.transform = "";
                btn.style.boxShadow = "";
                btn.style.borderColor = `${card.color}50`;
              }}
            >
              <span style={{ fontSize: 34, lineHeight: 1 }}>{card.emoji}</span>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(11px, 2vw, 13px)",
                  color: "#1a1060",
                  fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {open && activeCard && (
        <GameModal
          title={activeCard.title}
          emoji={activeCard.emoji}
          accentColor={accentColor}
          onClose={() => setOpen(null)}
        >
          <Suspense fallback={<LoadingSpinner color={accentColor} />}>
            {open === "wordsearch" && (
              <WordSearch slug={slug} words={gameData.wordSearch.words} accentColor={accentColor} />
            )}
            {open === "crossword" && (
              <Crossword words={gameData.crossword.words} accentColor={accentColor} />
            )}
            {open === "memory" && (
              <MemoryMatch pairs={gameData.memoryMatch.pairs} accentColor={accentColor} />
            )}
            {open === "unscramble" && (
              <WordUnscramble words={gameData.unscramble.words} accentColor={accentColor} />
            )}
            {open === "finddiff" && scene && (
              <FindDifferences config={scene} accentColor={accentColor} />
            )}
            {open === "hidden" && scene && (
              <HiddenObjects config={scene} accentColor={accentColor} />
            )}
            {open === "maze" && (
              <Maze slug={slug} accentColor={accentColor} />
            )}
          </Suspense>
        </GameModal>
      )}
    </>
  );
}
