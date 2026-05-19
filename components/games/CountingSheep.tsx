"use client";
import { useState, useMemo, useCallback } from "react";
import type { CSSProperties } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ProblemType = "counting" | "addition" | "subtraction";

interface Problem {
  type: ProblemType;
  a: number;
  b: number;
  answer: number;
  id: number;
}

interface Props {
  accentColor: string;
}

// ─── Seeded PRNG (mulberry32) ──────────────────────────────────────────────────
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Problem pool (300, deterministic seed 42) ────────────────────────────────
function buildPool(): Problem[] {
  const rng = mulberry32(42);
  const pool: Problem[] = [];
  for (let id = 0; id < 300; id++) {
    const kind = Math.floor(rng() * 3);
    if (kind === 0) {
      const n = Math.floor(rng() * 10) + 1;
      pool.push({ type: "counting", a: n, b: 0, answer: n, id });
    } else if (kind === 1) {
      const a = Math.floor(rng() * 10) + 1;
      let b = Math.floor(rng() * 10) + 1;
      if (a + b > 20) b = Math.max(1, 20 - a);
      pool.push({ type: "addition", a, b, answer: a + b, id });
    } else {
      const a = Math.floor(rng() * 13) + 3; // 3–15
      const b = Math.floor(rng() * (a - 1)) + 1; // 1–(a-1)
      pool.push({ type: "subtraction", a, b, answer: a - b, id });
    }
  }
  return pool;
}

const POOL = buildPool();

function sampleRound(seed: number): Problem[] {
  const rng = mulberry32(seed | 0);
  const idx = Array.from({ length: POOL.length }, (_, i) => i);
  for (let i = 0; i < 10; i++) {
    const j = i + Math.floor(rng() * (POOL.length - i));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, 10).map((i) => POOL[i]);
}

// ─── Answer choices ────────────────────────────────────────────────────────────
function makeChoices(answer: number, seed: number): number[] {
  const rng = mulberry32(seed);
  const candidates = Array.from({ length: 20 }, (_, i) => i + 1).filter(
    (n) => n !== answer
  );
  candidates.sort((x, y) => Math.abs(x - answer) - Math.abs(y - answer));
  const choices = [answer, ...candidates.slice(0, 3)];
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return choices;
}

// ─── Constants ─────────────────────────────────────────────────────────────────
const BTN_COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b"];

const CSS = `
@keyframes sheepJump {
  0%   { transform: translateY(0) scale(1); }
  25%  { transform: translateY(-22px) scale(1.25) rotate(-6deg); }
  55%  { transform: translateY(-10px) scale(1.15) rotate(6deg); }
  75%  { transform: translateY(-18px) scale(1.2) rotate(-3deg); }
  100% { transform: translateY(0) scale(1); }
}
@keyframes sheepWalkIn {
  from { opacity: 0; transform: translateX(-14px) scale(0.75); }
  to   { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes btnShake {
  0%,100% { transform: translateX(0); }
  20%     { transform: translateX(-9px); }
  45%     { transform: translateX(9px); }
  65%     { transform: translateX(-6px); }
  85%     { transform: translateX(6px); }
}
@keyframes starFloat {
  0%,100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
  50%     { transform: translateY(-9px) rotate(14deg); opacity: 1; }
}
@keyframes moonBob {
  0%,100% { transform: translateY(0) rotate(-5deg); }
  50%     { transform: translateY(-7px) rotate(5deg); }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bounceSheep {
  0%,100% { transform: translateY(0) scale(1); }
  40%     { transform: translateY(-18px) scale(1.18); }
  70%     { transform: translateY(-9px) scale(1.1); }
}
@keyframes starsReveal {
  from { opacity: 0; transform: scale(0.4) rotate(-15deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}
`;

// ─── SheepGroup ────────────────────────────────────────────────────────────────
function SheepGroup({
  count,
  jumpingIdxs,
}: {
  count: number;
  jumpingIdxs: Set<number>;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        justifyContent: "center",
        maxWidth: 300,
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const isJumping = jumpingIdxs.has(i);
        return (
          <span
            key={i}
            aria-label="sheep"
            style={{
              fontSize: "clamp(24px, 5vw, 34px)",
              lineHeight: 1,
              animation: isJumping
                ? `sheepJump 0.65s ease ${i * 0.04}s both`
                : `sheepWalkIn 0.45s ease ${i * 0.05}s both`,
              willChange: "transform",
            }}
          >
            🐑
          </span>
        );
      })}
    </div>
  );
}

// ─── ProblemDisplay ────────────────────────────────────────────────────────────
function ProblemDisplay({
  problem,
  jumpingIdxs,
}: {
  problem: Problem;
  jumpingIdxs: Set<number>;
}) {
  const equationStyle: CSSProperties = {
    fontSize: "clamp(32px, 7vw, 48px)",
    fontWeight: 900,
    color: "#fff",
    fontFamily: "var(--font-concert-one),'Concert One',cursive",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
    letterSpacing: 2,
    marginBottom: 12,
  };

  const questionMarkStyle: CSSProperties = {
    color: "#fbbf24",
    fontSize: "clamp(34px, 7.5vw, 52px)",
  };

  const sheepBoxStyle: CSSProperties = {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  };

  const hintStyle: CSSProperties = {
    color: "#c4b5fd",
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
    opacity: 0.8,
    marginTop: 4,
  };

  if (problem.type === "counting") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={sheepBoxStyle}>
          <SheepGroup count={problem.answer} jumpingIdxs={jumpingIdxs} />
        </div>
      </div>
    );
  }

  // Addition: show "A + B = ?" then all (A+B) sheep below
  if (problem.type === "addition") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={equationStyle}>
          {problem.a}{" "}
          <span style={{ color: "#f9a8d4" }}>+</span>{" "}
          {problem.b}{" "}
          <span style={{ color: "#94a3b8" }}>=</span>{" "}
          <span style={questionMarkStyle}>?</span>
        </div>
        <div style={sheepBoxStyle}>
          <SheepGroup count={problem.answer} jumpingIdxs={jumpingIdxs} />
        </div>
        <div style={hintStyle}>count the sheep or solve the math!</div>
      </div>
    );
  }

  // Subtraction: show "A - B = ?" then (A-B) sheep below
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={equationStyle}>
        {problem.a}{" "}
        <span style={{ color: "#f9a8d4" }}>−</span>{" "}
        {problem.b}{" "}
        <span style={{ color: "#94a3b8" }}>=</span>{" "}
        <span style={questionMarkStyle}>?</span>
      </div>
      <div style={sheepBoxStyle}>
        <SheepGroup count={problem.answer} jumpingIdxs={jumpingIdxs} />
      </div>
      <div style={hintStyle}>count the sheep or solve the math!</div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function CountingSheep({ accentColor }: Props) {
  const [problems, setProblems] = useState<Problem[]>(() =>
    sampleRound(Date.now())
  );
  const [probIdx, setProbIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isFirstTry, setIsFirstTry] = useState(true);
  const [wrongBtn, setWrongBtn] = useState<number | null>(null);
  const [correctBtn, setCorrectBtn] = useState<number | null>(null);
  const [jumpingIdxs, setJumpingIdxs] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [displayKey, setDisplayKey] = useState(0);

  const problem = problems[probIdx];

  const choices = useMemo(
    () => makeChoices(problem.answer, problem.id * 31 + 7),
    [problem]
  );

  const sheepCount = problem.answer;

  const handleAnswer = useCallback(
    (choice: number, btnIdx: number) => {
      if (advancing) return;
      if (choice === problem.answer) {
        setCorrectBtn(btnIdx);
        if (isFirstTry) setScore((s) => s + 1);
        setJumpingIdxs(
          new Set(Array.from({ length: sheepCount }, (_, i) => i))
        );
        setAdvancing(true);
        setTimeout(() => {
          setJumpingIdxs(new Set());
          setCorrectBtn(null);
          setAdvancing(false);
          if (probIdx + 1 >= problems.length) {
            setDone(true);
          } else {
            setProbIdx((i) => i + 1);
            setIsFirstTry(true);
            setDisplayKey((k) => k + 1);
          }
        }, 870);
      } else {
        setIsFirstTry(false);
        setWrongBtn(btnIdx);
        setTimeout(() => setWrongBtn(null), 560);
      }
    },
    [problem, isFirstTry, probIdx, problems.length, sheepCount, advancing]
  );

  const playAgain = () => {
    const newProblems = sampleRound(Date.now());
    setProblems(newProblems);
    setProbIdx(0);
    setScore(0);
    setIsFirstTry(true);
    setWrongBtn(null);
    setCorrectBtn(null);
    setJumpingIdxs(new Set());
    setDone(false);
    setAdvancing(false);
    setDisplayKey((k) => k + 1);
  };

  // ── End screen ────────────────────────────────────────────────────────────
  if (done) {
    const stars = score === 10 ? 3 : score >= 8 ? 2 : 1;
    return (
      <div
        style={{
          background:
            "linear-gradient(160deg, #1a0a3a 0%, #2d1060 50%, #0d0440 100%)",
          minHeight: 440,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{CSS}</style>
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 18,
            left: 22,
            fontSize: 20,
            animation: "starFloat 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          ✨
        </span>
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 48,
            right: 28,
            fontSize: 14,
            animation: "starFloat 2.5s ease-in-out infinite 0.6s",
            pointerEvents: "none",
          }}
        >
          ✨
        </span>
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 36,
            left: 44,
            fontSize: 12,
            animation: "starFloat 4s ease-in-out infinite 1s",
            pointerEvents: "none",
          }}
        >
          ⭐
        </span>
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: 24,
            right: 34,
            fontSize: 16,
            animation: "moonBob 3.5s ease-in-out infinite",
            pointerEvents: "none",
          }}
        >
          🌙
        </span>

        <div
          style={{
            fontSize: 64,
            marginBottom: 10,
            animation: "bounceSheep 1.2s ease-in-out infinite",
          }}
        >
          🐑
        </div>
        <h2
          style={{
            fontFamily: "var(--font-concert-one),'Concert One',cursive",
            fontSize: "clamp(22px, 5vw, 30px)",
            color: "#fff",
            margin: "0 0 8px",
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
          }}
        >
          Sweet dreams! 🌙
        </h2>
        <p
          style={{
            color: "#c4b5fd",
            fontSize: 16,
            margin: "0 0 16px",
            fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
          }}
        >
          You got{" "}
          <strong style={{ color: "#fff" }}>{score} / 10</strong> on the first
          try!
        </p>
        <div
          style={{
            fontSize: 40,
            margin: "0 0 28px",
            animation: "starsReveal 0.6s ease 0.1s both",
          }}
        >
          {"⭐".repeat(stars)}
        </div>
        <button
          onClick={playAgain}
          style={{
            background: accentColor,
            color: "#fff",
            border: "none",
            borderRadius: 50,
            padding: "14px 36px",
            fontSize: 18,
            fontWeight: 800,
            cursor: "pointer",
            fontFamily: "var(--font-concert-one),'Concert One',cursive",
            boxShadow: `0 6px 20px ${accentColor}66`,
          }}
        >
          Play Again 🐑
        </button>
      </div>
    );
  }

  // ── Game screen ───────────────────────────────────────────────────────────
  const hint =
    problem.type === "counting"
      ? "🌙 How many sheep are there?"
      : "⭐ Solve the math — or just count the sheep!";

  const progress = probIdx / problems.length;

  return (
    <div
      style={{
        background:
          "linear-gradient(160deg, #1a0a3a 0%, #2d1060 50%, #0d0440 100%)",
        borderRadius: 16,
        padding: "16px 14px 22px",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <style>{CSS}</style>

      {/* Decorative sky elements */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 10,
          left: 14,
          fontSize: 20,
          animation: "moonBob 3.5s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        🌙
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 6,
          left: 46,
          fontSize: 11,
          animation: "starFloat 2.2s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        ✨
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 20,
          right: 58,
          fontSize: 10,
          animation: "starFloat 3.1s ease-in-out infinite 0.9s",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        ✨
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: 58,
          right: 12,
          fontSize: 13,
          animation: "starFloat 4.2s ease-in-out infinite 1.4s",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        ⭐
      </span>

      {/* Progress bar + counters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14,
          paddingLeft: 38,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 7,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 99,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: accentColor,
              borderRadius: 99,
              width: `${progress * 100}%`,
              transition: "width 0.45s ease",
            }}
          />
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 11,
            fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
            fontWeight: 700,
            whiteSpace: "nowrap",
            background: "rgba(255,255,255,0.1)",
            padding: "2px 8px",
            borderRadius: 99,
          }}
        >
          {probIdx + 1}&thinsp;/&thinsp;{problems.length}
        </span>
        <span
          style={{
            background: accentColor,
            color: "#fff",
            fontSize: 12,
            fontWeight: 800,
            padding: "3px 10px",
            borderRadius: 99,
            fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
            whiteSpace: "nowrap",
            boxShadow: `0 2px 8px ${accentColor}66`,
          }}
        >
          ⭐&thinsp;{score}
        </span>
      </div>

      {/* Hint label */}
      <div
        style={{
          textAlign: "center",
          fontSize: "clamp(14px, 3.5vw, 19px)",
          color: "#ddd6fe",
          marginBottom: 16,
          fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
          fontWeight: 700,
          position: "relative",
          zIndex: 1,
          animation: "fadeSlideIn 0.3s ease both",
        }}
      >
        {hint}
      </div>

      {/* Problem display — key forces remount + walk-in animation on new problem */}
      <div
        key={displayKey}
        style={{
          minHeight: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
          padding: "0 8px",
          animation: "fadeSlideIn 0.4s ease both",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ProblemDisplay problem={problem} jumpingIdxs={jumpingIdxs} />
      </div>

      {/* Answer buttons */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          position: "relative",
          zIndex: 1,
        }}
      >
        {choices.map((choice, i) => {
          const isWrong = wrongBtn === i;
          const isCorrect = correctBtn === i;
          return (
            <button
              key={i}
              onClick={() => handleAnswer(choice, i)}
              aria-label={`Answer ${choice}`}
              style={{
                background: isCorrect
                  ? "#10b981"
                  : isWrong
                  ? "#ef4444"
                  : BTN_COLORS[i],
                color: "#fff",
                border: "none",
                borderRadius: 50,
                padding: "15px 8px",
                fontSize: "clamp(20px, 5vw, 28px)",
                fontWeight: 800,
                cursor: advancing ? "default" : "pointer",
                fontFamily: "var(--font-concert-one),'Concert One',cursive",
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                animation: isWrong ? "btnShake 0.52s ease" : "none",
                transition: "background 0.2s ease, transform 0.1s ease",
                transform: isCorrect ? "scale(1.07)" : "scale(1)",
                willChange: "transform",
              }}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}
