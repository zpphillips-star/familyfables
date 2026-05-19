"use client";
import { useState } from "react";

interface UnscrambleWord {
  word: string;
  hint: string;
}

interface LetterTile {
  letter: string;
  id: number;
  used: boolean;
}

interface Props {
  words: UnscrambleWord[];
  accentColor: string;
}

function scrambleWord(word: string): string {
  let result: string;
  do {
    result = [...word].sort(() => Math.random() - 0.5).join("");
  } while (result === word && word.length > 1);
  return result;
}

function makeScrambled(word: string): LetterTile[] {
  return scrambleWord(word)
    .split("")
    .map((letter, i) => ({ letter, id: i, used: false }));
}

export default function WordUnscramble({ words, accentColor }: Props) {
  const [roundIndex, setRoundIndex] = useState(0);
  const [scrambled, setScrambled] = useState<LetterTile[]>(() =>
    makeScrambled(words[0].word)
  );
  const [answer, setAnswer] = useState<{ letter: string; srcId: number }[]>([]);
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [score, setScore] = useState(0);
  const [won, setWon] = useState(false);
  const [shaking, setShaking] = useState(false);

  const currentWord = words[roundIndex];

  const submitAnswer = (currentAnswer: { letter: string; srcId: number }[]) => {
    const attempt = currentAnswer.map(a => a.letter).join("");
    if (attempt === currentWord.word) {
      setFeedback("correct");
      setScore(s => s + 1);
      setTimeout(() => {
        if (roundIndex + 1 >= words.length) {
          setWon(true);
        } else {
          const next = roundIndex + 1;
          setRoundIndex(next);
          setScrambled(makeScrambled(words[next].word));
          setAnswer([]);
          setFeedback(null);
        }
      }, 800);
    } else {
      setFeedback("wrong");
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setScrambled(prev => prev.map(t => ({ ...t, used: false })));
        setAnswer([]);
        setFeedback(null);
      }, 600);
    }
  };

  const handleLetterTap = (id: number) => {
    if (feedback) return;
    const tile = scrambled.find(t => t.id === id);
    if (!tile || tile.used) return;
    const newAnswer = [...answer, { letter: tile.letter, srcId: id }];
    setScrambled(prev => prev.map(t => (t.id === id ? { ...t, used: true } : t)));
    setAnswer(newAnswer);
    if (newAnswer.length === currentWord.word.length) {
      submitAnswer(newAnswer);
    }
  };

  const handleBackspace = () => {
    if (feedback || answer.length === 0) return;
    const last = answer[answer.length - 1];
    setScrambled(prev => prev.map(t => (t.id === last.srcId ? { ...t, used: false } : t)));
    setAnswer(prev => prev.slice(0, -1));
  };

  const stars = score === 5 ? "⭐⭐⭐" : score >= 4 ? "⭐⭐" : "⭐";

  if (won) {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎊</div>
        <h2
          style={{
            fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: "#1a1060",
            marginBottom: 8,
          }}
        >
          All words unscrambled!
        </h2>
        <p style={{ fontSize: 16, color: "#555", marginBottom: 8 }}>
          Score: {score} / {words.length}
        </p>
        <p style={{ fontSize: 28, marginBottom: 24 }}>{stars}</p>
        <button
          onClick={() => {
            setRoundIndex(0);
            setScrambled(makeScrambled(words[0].word));
            setAnswer([]);
            setFeedback(null);
            setScore(0);
            setWon(false);
          }}
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
    <div style={{ padding: "16px", maxWidth: 400, margin: "0 auto" }}>
      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: "#555",
            marginBottom: 6,
          }}
        >
          <span>
            Round {roundIndex + 1} of {words.length}
          </span>
          <span>Score: {score}</span>
        </div>
        <div
          style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden" }}
        >
          <div
            style={{
              height: "100%",
              width: `${(roundIndex / words.length) * 100}%`,
              background: accentColor,
              borderRadius: 4,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* Hint */}
      <p
        style={{
          fontStyle: "italic",
          color: "#555",
          textAlign: "center",
          marginBottom: 20,
          fontSize: 15,
        }}
      >
        {currentWord.hint}
      </p>

      {/* Answer slots */}
      <div
        className={shaking ? "unscramble-shake" : ""}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginBottom: 20,
          minHeight: 52,
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: currentWord.word.length }).map((_, i) => {
          const a = answer[i];
          return (
            <div
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                border: `2px solid ${a ? accentColor : "#d1d5db"}`,
                background: a
                  ? feedback === "correct"
                    ? "#dcfce7"
                    : feedback === "wrong"
                    ? "#fee2e2"
                    : `${accentColor}15`
                  : "#f9fafb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
                color: "#1a1060",
                transition: "background 0.2s",
              }}
            >
              {a ? a.letter : ""}
            </div>
          );
        })}
      </div>

      {/* Scrambled letter bubbles */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        {scrambled.map(tile => (
          <button
            key={tile.id}
            disabled={tile.used || !!feedback}
            onClick={() => handleLetterTap(tile.id)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              border: `2px solid ${tile.used ? "#e5e7eb" : accentColor}`,
              background: tile.used ? "#f3f4f6" : `${accentColor}18`,
              color: tile.used ? "#9ca3af" : "#1a1060",
              fontSize: 20,
              fontWeight: 900,
              cursor: tile.used ? "default" : "pointer",
              opacity: tile.used ? 0.4 : 1,
              transition: "opacity 0.2s, transform 0.1s",
              minWidth: 44,
              minHeight: 44,
            }}
          >
            {tile.letter}
          </button>
        ))}
      </div>

      {/* Backspace */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleBackspace}
          disabled={answer.length === 0 || !!feedback}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "2px solid #e5e7eb",
            background: "#f9fafb",
            color: "#374151",
            fontSize: 15,
            fontWeight: 700,
            cursor: answer.length > 0 && !feedback ? "pointer" : "default",
            opacity: answer.length === 0 || !!feedback ? 0.4 : 1,
            minHeight: 44,
          }}
        >
          ⌫ Backspace
        </button>
      </div>
    </div>
  );
}
