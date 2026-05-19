"use client";
import { useState, lazy, Suspense } from "react";
import GameModal from "@/components/games/GameModal";
import { GAME_DATA } from "@/lib/gameData";
import { SCENES } from "@/components/games/GameScenes";

const WordSearch = lazy(() => import("@/components/games/WordSearch"));
const Crossword = lazy(() => import("@/components/games/Crossword"));
const FindDifferences = lazy(() => import("@/components/games/FindDifferences"));
const HiddenObjects = lazy(() => import("@/components/games/HiddenObjects"));

type GameKey = "wordsearch" | "crossword" | "finddiff" | "hidden";

interface GameCard {
  key: GameKey;
  emoji: string;
  title: string;
  desc: string;
}

const GAME_CARDS: GameCard[] = [
  { key: "wordsearch", emoji: "🔤", title: "Word Search", desc: "Find hidden words — drag to select!" },
  { key: "crossword",  emoji: "✏️", title: "Crossword",  desc: "Fill in the themed puzzle" },
  { key: "finddiff",   emoji: "🔍", title: "Spot the Difference", desc: "Find 5 differences between the pictures" },
  { key: "hidden",     emoji: "🕵️", title: "Hidden Objects", desc: "Tap to find 6 hidden things" },
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
      {/* Section header */}
      <div style={{ padding: "48px 24px 8px", maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#1a1060", marginBottom: 8, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
          🎮 Fun &amp; Games
        </p>
        <h2 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: "clamp(22px, 4vw, 36px)", color: "#1a1060", marginBottom: 24, lineHeight: 1.2 }}>
          More adventures await!
        </h2>

        {/* 2×2 game card grid */}
        <div
          className="book-games-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
          }}
        >
          {GAME_CARDS.map(card => (
            <button
              key={card.key}
              onClick={() => setOpen(card.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 6,
                padding: "18px 20px",
                borderRadius: 16,
                border: `2px solid ${accentColor}44`,
                background: `${accentColor}0c`,
                cursor: "pointer",
                textAlign: "left",
                transition: "transform 0.15s, box-shadow 0.15s, background 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px ${accentColor}33`;
                (e.currentTarget as HTMLButtonElement).style.background = `${accentColor}18`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
                (e.currentTarget as HTMLButtonElement).style.background = `${accentColor}0c`;
              }}
            >
              <span style={{ fontSize: 32 }}>{card.emoji}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: "#1a1060", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif", marginBottom: 3 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 12, color: "#555", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", lineHeight: 1.4 }}>
                  {card.desc}
                </div>
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
              <WordSearch
                slug={slug}
                words={gameData.wordSearch.words}
                accentColor={accentColor}
              />
            )}
            {open === "crossword" && (
              <Crossword
                words={gameData.crossword.words}
                accentColor={accentColor}
              />
            )}
            {open === "finddiff" && scene && (
              <FindDifferences config={scene} accentColor={accentColor} />
            )}
            {open === "hidden" && scene && (
              <HiddenObjects config={scene} accentColor={accentColor} />
            )}
          </Suspense>
        </GameModal>
      )}
    </>
  );
}
