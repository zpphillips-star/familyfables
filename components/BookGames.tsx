"use client";
import { useState, lazy, Suspense } from "react";
import GameModal from "@/components/games/GameModal";
import { GAME_DATA } from "@/lib/gameData";

const WordSearch = lazy(() => import("@/components/games/WordSearch"));
const Crossword = lazy(() => import("@/components/games/Crossword"));
const MemoryMatch = lazy(() => import("@/components/games/MemoryMatch"));
const WordUnscramble = lazy(() => import("@/components/games/WordUnscramble"));
const Maze = lazy(() => import("@/components/games/Maze"));

type GameKey = "wordsearch" | "crossword" | "memory" | "unscramble" | "maze";

interface GameCard {
  key: GameKey;
  emoji: string;
  title: string;
  color: string;
}

const GAME_CARDS: GameCard[] = [
  { key: "wordsearch",  emoji: "🔍", title: "Word Search",     color: "#6366f1" },
  { key: "crossword",   emoji: "🧩", title: "Crossword",       color: "#f59e0b" },
  { key: "memory",      emoji: "🌟", title: "Memory Match",    color: "#ec4899" },
  { key: "unscramble",  emoji: "🔡", title: "Word Unscramble", color: "#10b981" },
  { key: "maze",        emoji: "🗺️", title: "Maze",            color: "#f97316" },
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

  const activeCard = GAME_CARDS.find(c => c.key === open);

  return (
    <>
      {/* Game cards — no header, just a fun themed grid */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 8px" }}>
        <div
          className="book-games-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
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
                padding: "18px 10px 14px",
                borderRadius: 20,
                border: "none",
                background: card.color,
                cursor: "pointer",
                textAlign: "center",
                transition: "transform 0.15s, box-shadow 0.15s, filter 0.15s",
                boxShadow: `0 4px 16px ${card.color}66`,
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.transform = "translateY(-4px) scale(1.05)";
                btn.style.boxShadow = `0 10px 28px ${card.color}88`;
                btn.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget as HTMLButtonElement;
                btn.style.transform = "";
                btn.style.boxShadow = `0 4px 16px ${card.color}66`;
                btn.style.filter = "";
              }}
            >
              <span style={{ fontSize: 34, lineHeight: 1 }}>{card.emoji}</span>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(11px, 2vw, 13px)",
                  color: "#fff",
                  fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
                  lineHeight: 1.2,
                  textShadow: "0 1px 4px rgba(0,0,0,0.2)",
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
            {open === "maze" && (
              <Maze slug={slug} accentColor={accentColor} />
            )}
          </Suspense>
        </GameModal>
      )}
    </>
  );
}
