"use client";
import { useState, useEffect } from "react";

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

interface Props {
  pairs: string[];
  accentColor: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCards(pairs: string[]): Card[] {
  return shuffle([...pairs, ...pairs]).map((emoji, i) => ({
    id: i,
    emoji,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryMatch({ pairs, accentColor }: Props) {
  const [cards, setCards] = useState<Card[]>(() => makeCards(pairs));
  const [selected, setSelected] = useState<{ id: number; emoji: string }[]>([]);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  // Win check
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setWon(true);
    }
  }, [cards]);

  // Match evaluation when two cards are selected
  useEffect(() => {
    if (selected.length !== 2) return;
    const [a, b] = selected;
    setLocked(true);
    setMoves(m => m + 1);
    if (a.emoji === b.emoji) {
      setTimeout(() => {
        setCards(prev =>
          prev.map(c => (c.id === a.id || c.id === b.id ? { ...c, matched: true } : c))
        );
        setSelected([]);
        setLocked(false);
      }, 400);
    } else {
      setTimeout(() => {
        setCards(prev =>
          prev.map(c => (c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c))
        );
        setSelected([]);
        setLocked(false);
      }, 900);
    }
  }, [selected]);

  const handleCardClick = (id: number) => {
    if (locked) return;
    const card = cards.find(c => c.id === id);
    if (!card || card.flipped || card.matched) return;
    if (selected.length >= 2) return;
    setCards(prev => prev.map(c => (c.id === id ? { ...c, flipped: true } : c)));
    setSelected(prev => [...prev, { id, emoji: card.emoji }]);
  };

  const playAgain = () => {
    setCards(makeCards(pairs));
    setSelected([]);
    setLocked(false);
    setMoves(0);
    setWon(false);
  };

  const stars = moves <= 10 ? "⭐⭐⭐" : moves <= 14 ? "⭐⭐" : "⭐";

  if (won) {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2
          style={{
            fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#1a1060",
            marginBottom: 8,
          }}
        >
          You matched them all!
        </h2>
        <p style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>{moves} moves</p>
        <p style={{ fontSize: 28, marginBottom: 24 }}>{stars}</p>
        <button
          onClick={playAgain}
          style={{
            background: accentColor,
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "12px 28px",
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          fontSize: 14,
          color: "#555",
        }}
      >
        <span>
          Moves: <strong>{moves}</strong>
        </span>
        <span>
          Matched: <strong>{cards.filter(c => c.matched).length / 2}</strong> /{" "}
          {pairs.length}
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
        }}
      >
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card${card.flipped ? " flipped" : ""}${card.matched ? " matched" : ""}`}
            style={{ aspectRatio: "1" }}
            onClick={() => handleCardClick(card.id)}
            role="button"
            tabIndex={0}
            aria-label={`Card ${card.id + 1}`}
            onKeyDown={e => e.key === "Enter" && handleCardClick(card.id)}
          >
            <div className="memory-card-inner">
              <div
                className="memory-card-front"
                style={{
                  background: accentColor,
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                ?
              </div>
              <div
                className="memory-card-back"
                style={{
                  background: card.matched ? "#dcfce7" : "#fff",
                  border: `2px solid ${card.matched ? "#86efac" : "#e5e7eb"}`,
                  fontSize: 32,
                }}
              >
                {card.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
