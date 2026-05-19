"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface Props {
  slug: string;
  accentColor: string;
}

const W = 9;
const H = 9;
const CELL = 36;

class SeededRandom {
  private seed: number;
  constructor(seed: number) { this.seed = seed; }
  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) & 0xffffffff;
    return (this.seed >>> 0) / 0x100000000;
  }
}

function hashSlug(slug: string): number {
  return slug.split("").reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7);
}

interface Walls { right: boolean[][]; down: boolean[][]; }

function generateMaze(slug: string): Walls {
  const rng = new SeededRandom(hashSlug(slug));
  const right: boolean[][] = Array.from({ length: H }, () => Array(W).fill(true));
  const down: boolean[][] = Array.from({ length: H }, () => Array(W).fill(true));
  const visited: boolean[][] = Array.from({ length: H }, () => Array(W).fill(false));
  const stack: [number, number][] = [[0, 0]];
  visited[0][0] = true;
  while (stack.length > 0) {
    const [r, c] = stack[stack.length - 1];
    const neighbors = (
      [[r-1,c,"up"],[r+1,c,"down"],[r,c-1,"left"],[r,c+1,"right"]] as [number,number,string][]
    ).filter(([nr,nc]) => nr>=0 && nr<H && nc>=0 && nc<W && !visited[nr][nc]);
    if (neighbors.length === 0) { stack.pop(); }
    else {
      const [nr, nc, dir] = neighbors[Math.floor(rng.next() * neighbors.length)];
      if (dir==="right") right[r][c]=false;
      else if (dir==="down") down[r][c]=false;
      else if (dir==="left") right[r][c-1]=false;
      else if (dir==="up") down[r-1][c]=false;
      visited[nr][nc]=true; stack.push([nr,nc]);
    }
  }
  return { right, down };
}

function getPlayerEmoji(slug: string): string {
  if (slug.includes("amber")) return "🐉";
  if (slug.includes("poo-poo")) return "💩";
  if (slug.includes("hampton")) return "🦛";
  if (slug.includes("gilroy") || slug.includes("tom-turkey")) return "🦃";
  if (slug.includes("ollie")) return "🐱";
  if (slug.includes("frog")) return "🐸";
  if (slug.includes("brian")) return "👻";
  return "⭐";
}

export default function Maze({ slug, accentColor }: Props) {
  const [walls] = useState<Walls>(() => generateMaze(slug));
  const [playerPos, setPlayerPos] = useState({ r: 0, c: 0 });
  const [timerStarted, setTimerStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [won, setWon] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragAnchor = useRef<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const playerEmoji = getPlayerEmoji(slug);
  const svgW = W * CELL;
  const svgH = H * CELL;

  useEffect(() => {
    if (timerStarted && !won) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [timerStarted, won]);

  useEffect(() => {
    if (playerPos.r === H - 1 && playerPos.c === W - 1) {
      setWon(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [playerPos]);

  const move = useCallback((dr: number, dc: number) => {
    if (won) return;
    setPlayerPos(pos => {
      const nr = pos.r + dr, nc = pos.c + dc;
      if (nr < 0 || nr >= H || nc < 0 || nc >= W) return pos;
      if (dc === 1  && walls.right[pos.r][pos.c]) return pos;
      if (dc === -1 && walls.right[pos.r][nc])    return pos;
      if (dr === 1  && walls.down[pos.r][pos.c])  return pos;
      if (dr === -1 && walls.down[nr][pos.c])     return pos;
      return { r: nr, c: nc };
    });
    if (!timerStarted) setTimerStarted(true);
  }, [walls, won, timerStarted]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key==="ArrowUp")    { e.preventDefault(); move(-1,0); }
      else if (e.key==="ArrowDown")  { e.preventDefault(); move(1,0); }
      else if (e.key==="ArrowLeft")  { e.preventDefault(); move(0,-1); }
      else if (e.key==="ArrowRight") { e.preventDefault(); move(0,1); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move]);

  // Convert pointer event coords → SVG coords
  const getSVGPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: (clientX - rect.left) / rect.width  * svgW,
      y: (clientY - rect.top)  / rect.height * svgH,
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragAnchor.current = getSVGPoint(e.clientX, e.clientY);
    if (!timerStarted) setTimerStarted(true);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragAnchor.current || won) return;
    const pt = getSVGPoint(e.clientX, e.clientY);
    if (!pt) return;
    const dx = pt.x - dragAnchor.current.x;
    const dy = pt.y - dragAnchor.current.y;
    const threshold = CELL * 0.55;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      move(0, dx > 0 ? 1 : -1);
      dragAnchor.current = pt;
    } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
      move(dy > 0 ? 1 : -1, 0);
      dragAnchor.current = pt;
    }
  };

  const onPointerUp = () => { dragAnchor.current = null; };

  const playAgain = () => {
    setPlayerPos({ r: 0, c: 0 });
    setTimerStarted(false);
    setElapsed(0);
    setWon(false);
  };

  const stars = elapsed < 60 ? "⭐⭐⭐" : elapsed < 120 ? "⭐⭐" : "⭐";

  // Collect wall lines
  const wallLines: { x1:number; y1:number; x2:number; y2:number }[] = [];
  for (let r=0; r<H; r++)
    for (let c=0; c<W-1; c++)
      if (walls.right[r][c])
        wallLines.push({ x1:(c+1)*CELL, y1:r*CELL, x2:(c+1)*CELL, y2:(r+1)*CELL });
  for (let r=0; r<H-1; r++)
    for (let c=0; c<W; c++)
      if (walls.down[r][c])
        wallLines.push({ x1:c*CELL, y1:(r+1)*CELL, x2:(c+1)*CELL, y2:(r+1)*CELL });

  return (
    <div style={{ padding: "16px", textAlign: "center", userSelect: "none" }}>
      {/* Status */}
      <div style={{ display:"flex", justifyContent:"space-between", maxWidth:svgW, margin:"0 auto 12px" }}>
        <span style={{ fontSize:14, color:"#555" }}>⏱ {elapsed}s</span>
        <span style={{ fontSize:14, color:"#555" }}>{won ? "🏆 Finished!" : "Drag to move • Find 🏠"}</span>
      </div>

      {/* Win panel */}
      {won && (
        <div style={{ background:"#f0fdf4", border:"2px solid #86efac", borderRadius:16, padding:"20px", maxWidth:svgW, margin:"0 auto 16px" }}>
          <div style={{ fontSize:40, marginBottom:8 }}>🏠</div>
          <h3 style={{ fontFamily:"var(--font-catamaran),'Catamaran',sans-serif", fontSize:20, fontWeight:800, color:"#1a1060", marginBottom:4 }}>
            You found the way home!
          </h3>
          <p style={{ fontSize:14, color:"#555", marginBottom:8 }}>Time: {elapsed} seconds</p>
          <p style={{ fontSize:24, marginBottom:16 }}>{stars}</p>
          <button onClick={playAgain} style={{ background:accentColor, color:"#fff", border:"none", borderRadius:10, padding:"10px 24px", fontSize:15, fontWeight:800, cursor:"pointer" }}>
            Play Again
          </button>
        </div>
      )}

      {/* Maze SVG — drag/pointer controlled */}
      <div
        style={{ display:"inline-block", maxWidth:"100%", overflowX:"auto", cursor: won ? "default" : "grab", touchAction:"none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgW} ${svgH}`}
          width={svgW}
          height={svgH}
          style={{ display:"block", maxWidth:"100%" }}
        >
          <rect x={0} y={0} width={svgW} height={svgH} fill="#fefce8" />
          {wallLines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#374151" strokeWidth={2} />
          ))}
          {/* Outer border with entrance/exit gaps */}
          <line x1={CELL} y1={0} x2={svgW} y2={0} stroke="#374151" strokeWidth={3} />
          <line x1={svgW} y1={0} x2={svgW} y2={svgH} stroke="#374151" strokeWidth={3} />
          <line x1={0} y1={0} x2={0} y2={svgH} stroke="#374151" strokeWidth={3} />
          <line x1={0} y1={svgH} x2={(W-1)*CELL} y2={svgH} stroke="#374151" strokeWidth={3} />
          {/* Goal */}
          {!(playerPos.r===H-1 && playerPos.c===W-1) && (
            <text x={(W-1)*CELL+CELL/2} y={(H-1)*CELL+CELL/2+10} textAnchor="middle" fontSize={CELL*0.65}>🏠</text>
          )}
          {/* Player */}
          <text x={playerPos.c*CELL+CELL/2} y={playerPos.r*CELL+CELL/2+10} textAnchor="middle" fontSize={CELL*0.65}>
            {playerEmoji}
          </text>
        </svg>
      </div>

      {/* Hint text */}
      {!won && (
        <p style={{ fontSize:12, color:"#999", marginTop:10, fontFamily:"var(--font-catamaran),'Catamaran',sans-serif" }}>
          👆 Drag on the maze to move • ⌨️ Arrow keys also work
        </p>
      )}
    </div>
  );
}
