"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// ── Seeded random (deterministic grid per book) ───────────────────────────────
class SeededRandom {
  private s: number;
  constructor(seed: number) { this.s = seed >>> 0; }
  next() { this.s = Math.imul(this.s ^ (this.s >>> 17), 0x45d9f3b) >>> 0; return this.s / 0xffffffff; }
  int(max: number) { return Math.floor(this.next() * max); }
  shuffle<T>(a: T[]) { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = this.int(i + 1); [r[i], r[j]] = [r[j], r[i]]; } return r; }
}

function slugSeed(slug: string) {
  return slug.split("").reduce((acc, c) => Math.imul(acc, 31) + c.charCodeAt(0), 7) >>> 0;
}

// 3 directions: right, down, down-right (forward only — no backwards words)
const DIRS = [[0,1],[1,0],[1,1]] as const;
const FILL = "ABCDEFGHIJKLMNOPRSTUWBCDFGHKLMNPRSTVWXYZ";
const GRID_SIZE = 11;

function buildGrid(words: string[], slug: string): { grid: string[][]; placements: {word:string;r:number;c:number;dr:number;dc:number}[] } {
  const rng = new SeededRandom(slugSeed(slug));
  const g: (string|null)[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));
  const placements: {word:string;r:number;c:number;dr:number;dc:number}[] = [];

  for (const word of rng.shuffle(words)) {
    let placed = false;
    const dirOrder = rng.shuffle([...DIRS]);
    for (let attempt = 0; attempt < 300 && !placed; attempt++) {
      const [dr, dc] = dirOrder[attempt % dirOrder.length];
      const minR = dr > 0 ? 0 : dr < 0 ? word.length - 1 : 0;
      const maxR = dr > 0 ? GRID_SIZE - word.length : dr < 0 ? GRID_SIZE - 1 : GRID_SIZE - 1;
      const minC = dc > 0 ? 0 : dc < 0 ? word.length - 1 : 0;
      const maxC = dc > 0 ? GRID_SIZE - word.length : dc < 0 ? GRID_SIZE - 1 : GRID_SIZE - 1;
      if (maxR < minR || maxC < minC) continue;
      const r = minR + rng.int(maxR - minR + 1);
      const c = minC + rng.int(maxC - minC + 1);
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const nr = r + i * dr, nc = c + i * dc;
        if (g[nr][nc] !== null && g[nr][nc] !== word[i]) { ok = false; break; }
      }
      if (ok) {
        for (let i = 0; i < word.length; i++) g[r + i * dr][c + i * dc] = word[i];
        placements.push({ word, r, c, dr, dc });
        placed = true;
      }
    }
  }

  // Fill remaining cells
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (g[r][c] === null) g[r][c] = FILL[rng.int(FILL.length)];

  return { grid: g as string[][], placements };
}

function getLine(r0: number, c0: number, r1: number, c1: number): [number,number][] {
  const dr = r1 - r0, dc = c1 - c0;
  if (dr === 0 && dc === 0) return [[r0,c0]];
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  // Must be perfectly straight (H, V, or 45°)
  if (Math.abs(dr) !== steps && Math.abs(dc) !== steps && !(dr === 0 || dc === 0)) return [];
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return [];
  const sr = dr === 0 ? 0 : dr / Math.abs(dr);
  const sc = dc === 0 ? 0 : dc / Math.abs(dc);
  return Array.from({ length: steps + 1 }, (_, i) => [r0 + i * sr, c0 + i * sc] as [number,number]);
}

interface Props {
  slug: string;
  words: string[];
  accentColor: string;
}

export default function WordSearch({ slug, words, accentColor }: Props) {
  const { grid, placements } = useMemo(() => buildGrid(words, slug), [words, slug]);

  const [found, setFound] = useState<Set<string>>(new Set());
  const [selection, setSelection] = useState<[number,number][]>([]);
  const [dragging, setDragging] = useState(false);
  const [startCell, setStartCell] = useState<[number,number]|null>(null);
  const [flash, setFlash] = useState<"hit"|"miss"|null>(null);
  const [won, setWon] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const cellSize = useRef(0);

  function getCellFromPt(clientX: number, clientY: number): [number,number]|null {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const cs = rect.width / GRID_SIZE;
    cellSize.current = cs;
    const c = Math.floor((clientX - rect.left) / cs);
    const r = Math.floor((clientY - rect.top) / cs);
    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) return null;
    return [r, c];
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const cell = getCellFromPt(e.clientX, e.clientY);
    if (!cell) return;
    setDragging(true);
    setStartCell(cell);
    setSelection([cell]);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging || !startCell) return;
    const end = getCellFromPt(e.clientX, e.clientY);
    if (!end) return;
    const line = getLine(startCell[0], startCell[1], end[0], end[1]);
    setSelection(line.length > 0 ? line : [startCell]);
  }, [dragging, startCell]);

  const onPointerUp = useCallback(() => {
    if (!dragging || selection.length < 2) { setDragging(false); setStartCell(null); setSelection([]); return; }
    const selected = selection.map(([r,c]) => grid[r][c]).join("");
    const match = words.find(w => !found.has(w) && w === selected);
    if (match) {
      const next = new Set(found); next.add(match);
      setFound(next);
      setFlash("hit");
      setTimeout(() => setFlash(null), 600);
      if (next.size === words.length) setTimeout(() => setWon(true), 300);
    } else {
      setFlash("miss");
      setTimeout(() => setFlash(null), 400);
    }
    setDragging(false);
    setStartCell(null);
    setSelection([]);
  }, [dragging, selection, grid, words, found]);

  // Build cell highlight sets
  const selSet = useMemo(() => new Set(selection.map(([r,c]) => `${r},${c}`)), [selection]);
  const foundCells = useMemo(() => {
    const s = new Set<string>();
    for (const p of placements) {
      if (found.has(p.word)) {
        for (let i = 0; i < p.word.length; i++) s.add(`${p.r + i*p.dr},${p.c + i*p.dc}`);
      }
    }
    return s;
  }, [found, placements]);

  if (won) return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
      <h3 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 28, color: accentColor, marginBottom: 8 }}>You found them all!</h3>
      <p style={{ color: "#555", fontSize: 16 }}>Amazing word detective work! 🔍</p>
      <div style={{ fontSize: 40, marginTop: 16 }}>⭐⭐⭐</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, userSelect: "none" }}>
      {/* Grid */}
      <div
        ref={gridRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: 2,
          cursor: "crosshair",
          touchAction: "none",
          border: `3px solid ${flash === "hit" ? "#22c55e" : flash === "miss" ? "#ef4444" : accentColor}44`,
          borderRadius: 12,
          padding: 6,
          background: flash === "hit" ? "#f0fdf4" : flash === "miss" ? "#fff1f2" : "#fafafa",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const key = `${r},${c}`;
            const isSel = selSet.has(key);
            const isFound = foundCells.has(key);
            return (
              <div
                key={key}
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                  fontSize: "clamp(12px, 2.8vw, 18px)",
                  fontWeight: 700,
                  fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
                  background: isFound ? `${accentColor}33` : isSel ? `${accentColor}66` : "transparent",
                  color: isFound ? accentColor : isSel ? "#1a1060" : "#444",
                  transition: "background 0.1s",
                  minWidth: 0,
                }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      {/* Word list */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 12px" }}>
        {words.map(w => (
          <span
            key={w}
            style={{
              fontSize: "clamp(12px, 2.5vw, 15px)",
              fontWeight: 700,
              fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
              color: found.has(w) ? "#9ca3af" : "#1a1060",
              textDecoration: found.has(w) ? "line-through" : "none",
              background: found.has(w) ? "#f3f4f6" : `${accentColor}18`,
              padding: "3px 10px",
              borderRadius: 20,
              transition: "all 0.2s",
            }}
          >
            {found.has(w) ? "✓ " : ""}{w}
          </span>
        ))}
      </div>

      <p style={{ fontSize: 13, color: "#888", margin: 0, textAlign: "center" }}>
        {found.size}/{words.length} found · Drag across letters to select a word
      </p>
    </div>
  );
}
