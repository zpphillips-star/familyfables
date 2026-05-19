"use client";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import type { CrosswordWordDef } from "@/lib/gameData";

// ── Auto-place crossword words on a grid ─────────────────────────────────────

interface Placement {
  word: string; row: number; col: number; dir: "across" | "down"; num: number;
}

function buildCrossword(entries: CrosswordWordDef[]): { placements: Placement[]; rows: number; cols: number } {
  const words = [...entries].sort((a, b) => b.word.length - a.word.length).map(e => e.word);
  const cellMap = new Map<string, string>(); // "r,c" -> letter
  const placements: Placement[] = [];
  let clueNum = 1;

  function get(r: number, c: number) { return cellMap.get(`${r},${c}`); }
  function set(r: number, c: number, ch: string) { cellMap.set(`${r},${c}`, ch); }

  function canPlace(word: string, row: number, col: number, dir: "across" | "down"): boolean {
    for (let i = 0; i < word.length; i++) {
      const r = dir === "across" ? row : row + i;
      const c = dir === "across" ? col + i : col;
      const ex = get(r, c);
      if (ex && ex !== word[i]) return false;
      // Only crossing (perpendicular) overlaps allowed — no parallel touching
      if (!ex) {
        const sameRow = dir === "across";
        const adj1 = sameRow ? get(r - 1, c) : get(r, c - 1);
        const adj2 = sameRow ? get(r + 1, c) : get(r, c + 1);
        if (adj1 || adj2) {
          // Adjacent cell occupied — only OK if it's part of crossing word
          // Simplified: allow if the intersection is a shared letter (already checked above)
          // For adjacent non-crossing, skip this placement
          return false;
        }
      }
    }
    // Check the cell before and after the word is empty
    const preR = dir === "across" ? row : row - 1;
    const preC = dir === "across" ? col - 1 : col;
    const postR = dir === "across" ? row : row + word.length;
    const postC = dir === "across" ? col + word.length : col;
    if (get(preR, preC) || get(postR, postC)) return false;
    return true;
  }

  function place(word: string, row: number, col: number, dir: "across" | "down") {
    for (let i = 0; i < word.length; i++) set(dir === "across" ? row : row + i, dir === "across" ? col + i : col, word[i]);
    placements.push({ word, row, col, dir, num: clueNum++ });
  }

  // Place first word horizontally
  place(words[0], 0, 0, "across");

  for (let wi = 1; wi < words.length; wi++) {
    const word = words[wi];
    let placed = false;

    for (const p of placements) {
      if (placed) break;
      const newDir = p.dir === "across" ? "down" : "across";
      for (let pi = 0; pi < p.word.length && !placed; pi++) {
        for (let wi2 = 0; wi2 < word.length && !placed; wi2++) {
          if (p.word[pi] !== word[wi2]) continue;
          const intR = p.dir === "across" ? p.row : p.row + pi;
          const intC = p.dir === "across" ? p.col + pi : p.col;
          const nr = newDir === "across" ? intR : intR - wi2;
          const nc = newDir === "across" ? intC - wi2 : intC;
          if (canPlace(word, nr, nc, newDir)) {
            place(word, nr, nc, newDir);
            placed = true;
          }
        }
      }
    }

    if (!placed) {
      // Place standalone below
      const maxRow = placements.reduce((m, p) =>
        Math.max(m, p.dir === "down" ? p.row + p.word.length - 1 : p.row), 0);
      place(word, maxRow + 2, 0, "across");
    }
  }

  // Normalize
  const allKeys = [...cellMap.keys()].map(k => k.split(",").map(Number));
  const minR = Math.min(...allKeys.map(k => k[0]));
  const minC = Math.min(...allKeys.map(k => k[1]));
  const norm = placements.map(p => ({ ...p, row: p.row - minR, col: p.col - minC }));
  const maxR = norm.reduce((m, p) => Math.max(m, p.dir === "down" ? p.row + p.word.length - 1 : p.row), 0);
  const maxC = norm.reduce((m, p) => Math.max(m, p.dir === "across" ? p.col + p.word.length - 1 : p.col), 0);

  return { placements: norm, rows: maxR + 1, cols: maxC + 1 };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  words: CrosswordWordDef[];
  accentColor: string;
}

export default function Crossword({ words, accentColor }: Props) {
  const { placements, rows, cols } = useMemo(() => buildCrossword(words), [words]);
  const wordMap = useMemo(() => Object.fromEntries(words.map(w => [w.word, w])), [words]);

  // user input: "r,c" -> letter
  const [userGrid, setUserGrid] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [won, setWon] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Build solution map and clue numbering
  const solution = useMemo(() => {
    const m: Record<string, string> = {};
    for (const p of placements)
      for (let i = 0; i < p.word.length; i++) {
        const r = p.dir === "across" ? p.row : p.row + i;
        const c = p.dir === "across" ? p.col + i : p.col;
        m[`${r},${c}`] = p.word[i];
      }
    return m;
  }, [placements]);

  // Cells that start a word get a clue number
  const startNums = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of placements) m[`${p.row},${p.col}`] = p.num;
    return m;
  }, [placements]);

  // Across and down clues
  const acrossClues = useMemo(() =>
    placements.filter(p => p.dir === "across").sort((a, b) => a.num - b.num), [placements]);
  const downClues = useMemo(() =>
    placements.filter(p => p.dir === "down").sort((a, b) => a.num - b.num), [placements]);

  // Get cells belonging to the focused word
  const focusedCells = useMemo(() => {
    const set = new Set<string>();
    if (!focused) return set;
    const [fr, fc] = focused.split(",").map(Number);
    for (const p of placements) {
      for (let i = 0; i < p.word.length; i++) {
        const r = p.dir === "across" ? p.row : p.row + i;
        const c = p.dir === "across" ? p.col + i : p.col;
        if (r === fr && c === fc) {
          for (let j = 0; j < p.word.length; j++) {
            const rr = p.dir === "across" ? p.row : p.row + j;
            const cc = p.dir === "across" ? p.col + j : p.col;
            set.add(`${rr},${cc}`);
          }
        }
      }
    }
    return set;
  }, [focused, placements]);

  const handleInput = useCallback((key: string, value: string) => {
    const letter = value.toUpperCase().slice(-1);
    setUserGrid(prev => ({ ...prev, [key]: letter }));
    setChecked(false);

    // Auto-advance to next cell in word
    if (letter) {
      const [r, c] = key.split(",").map(Number);
      for (const p of placements) {
        for (let i = 0; i < p.word.length - 1; i++) {
          const cr = p.dir === "across" ? p.row : p.row + i;
          const cc = p.dir === "across" ? p.col + i : p.col;
          if (cr === r && cc === c) {
            const nr = p.dir === "across" ? r : r + 1;
            const nc = p.dir === "across" ? c + 1 : c;
            const nk = `${nr},${nc}`;
            if (solution[nk]) {
              inputRefs.current[nk]?.focus();
              return;
            }
          }
        }
      }
    }
  }, [placements, solution]);

  const handleKeyDown = useCallback((key: string, e: React.KeyboardEvent) => {
    const [r, c] = key.split(",").map(Number);
    if (e.key === "Backspace" && !userGrid[key]) {
      // Move back
      for (const p of placements) {
        for (let i = 1; i < p.word.length; i++) {
          const cr = p.dir === "across" ? p.row : p.row + i;
          const cc = p.dir === "across" ? p.col + i : p.col;
          if (cr === r && cc === c) {
            const pr = p.dir === "across" ? r : r - 1;
            const pc = p.dir === "across" ? c - 1 : c;
            inputRefs.current[`${pr},${pc}`]?.focus();
            return;
          }
        }
      }
    }
  }, [userGrid, placements]);

  const checkAnswers = useCallback(() => {
    setChecked(true);
    const allCorrect = Object.entries(solution).every(([k, v]) => userGrid[k] === v);
    if (allCorrect) setWon(true);
  }, [solution, userGrid]);

  const CELL = 36; // px per cell

  if (won) return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>🎊</div>
      <h3 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 28, color: accentColor, marginBottom: 8 }}>Crossword Complete!</h3>
      <p style={{ color: "#555", fontSize: 16 }}>You're a word wizard! 🧙‍♂️</p>
      <div style={{ fontSize: 40, marginTop: 16 }}>⭐⭐⭐</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Grid */}
      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, ${CELL}px)`,
            gridTemplateRows: `repeat(${rows}, ${CELL}px)`,
            gap: 2,
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              const k = `${r},${c}`;
              const inGrid = !!solution[k];
              const num = startNums[k];
              const isFocused = focused === k;
              const isHighlighted = focusedCells.has(k);
              const userLetter = userGrid[k] || "";
              const isCorrect = checked && userLetter === solution[k];
              const isWrong = checked && userLetter && userLetter !== solution[k];

              if (!inGrid) return (
                <div key={k} style={{ width: CELL, height: CELL, background: "#1a1060", borderRadius: 4 }} />
              );

              return (
                <div
                  key={k}
                  style={{
                    width: CELL, height: CELL, position: "relative",
                    border: `2px solid ${isFocused ? accentColor : isHighlighted ? `${accentColor}88` : "#ccc"}`,
                    borderRadius: 4,
                    background: isCorrect ? "#dcfce7" : isWrong ? "#fee2e2" : isFocused ? `${accentColor}18` : isHighlighted ? `${accentColor}0e` : "#fff",
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                >
                  {num && (
                    <span style={{ position: "absolute", top: 1, left: 2, fontSize: 8, fontWeight: 700, color: "#666", lineHeight: 1 }}>
                      {num}
                    </span>
                  )}
                  <input
                    ref={el => { inputRefs.current[k] = el; }}
                    maxLength={1}
                    value={userLetter}
                    onChange={e => handleInput(k, e.target.value)}
                    onKeyDown={e => handleKeyDown(k, e)}
                    onFocus={() => setFocused(k)}
                    onBlur={() => setFocused(null)}
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      border: "none", outline: "none",
                      background: "transparent",
                      textAlign: "center",
                      fontSize: 16, fontWeight: 700,
                      fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
                      color: isCorrect ? "#16a34a" : isWrong ? "#dc2626" : "#1a1060",
                      cursor: "pointer",
                      paddingTop: num ? 6 : 0,
                      textTransform: "uppercase",
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Clues */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[{ label: "Across", list: acrossClues }, { label: "Down", list: downClues }].map(({ label, list }) => (
          <div key={label}>
            <h4 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 16, color: accentColor, marginBottom: 8 }}>{label}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {list.map(p => {
                const def = wordMap[p.word];
                return (
                  <div
                    key={p.num}
                    onClick={() => inputRefs.current[`${p.row},${p.col}`]?.focus()}
                    style={{ fontSize: 13, color: "#444", cursor: "pointer", lineHeight: 1.4 }}
                  >
                    <strong style={{ color: accentColor }}>{p.num}.</strong> {def?.emoji} {def?.clue}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Check button */}
      <button
        onClick={checkAnswers}
        style={{
          padding: "12px 32px",
          borderRadius: 50,
          backgroundColor: accentColor,
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
          alignSelf: "center",
        }}
      >
        Check Answers ✓
      </button>

      {checked && !won && (
        <p style={{ textAlign: "center", fontSize: 14, color: "#888" }}>
          Keep going — some letters still need fixing! 🔤
        </p>
      )}
    </div>
  );
}
