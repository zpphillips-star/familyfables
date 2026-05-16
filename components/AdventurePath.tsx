"use client";

/**
 * AdventurePath — the golden winding road that snakes through all 12 lands.
 *
 * Layout strategy:
 *  - viewBox: 0 0 100 1400  (100 wide, 1400 tall = 100 units per section)
 *  - preserveAspectRatio="none" so SVG stretches to fill the actual page height
 *  - vectorEffect="non-scaling-stroke" keeps pixel stroke widths consistent
 *    across all viewport sizes (no huge road on widescreen, no hair-thin on mobile)
 *  - Odd lands  (1,3,5…) → content left, path milestone RIGHT  (x ≈ 73)
 *  - Even lands (2,4,6…) → content right, path milestone LEFT  (x ≈ 27)
 *  - Sections:  hero(0) + 12 lands(1-12) + end(13) = 14 × 100 = 1400 units tall
 */

import React, { useMemo } from "react";

const LAND_COUNT = 12;
const SECTION_H = 100; // SVG user units per page section
const TOTAL_H = (LAND_COUNT + 2) * SECTION_H; // 1400

// ── Waypoints ──────────────────────────────────────────────────────────────────
// The snake visits the centre of each land, alternating right / left.
function buildWaypoints(): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = [
    { x: 50, y: 0 },      // very top
    { x: 50, y: 50 },     // hero centre
  ];

  for (let i = 1; i <= LAND_COUNT; i++) {
    const midY = i * SECTION_H + SECTION_H / 2; // 150, 250, 350 …
    const x = i % 2 === 1 ? 73 : 27;            // odd → right, even → left
    pts.push({ x, y: midY });
  }

  pts.push({ x: 50, y: TOTAL_H - SECTION_H / 2 }); // end-section centre (1350)
  pts.push({ x: 50, y: TOTAL_H });                   // very bottom (1400)
  return pts;
}

// ── Catmull-Rom → cubic-bezier path string ─────────────────────────────────────
function catmullRomPath(
  pts: Array<{ x: number; y: number }>,
  tension = 0.38,
): string {
  const n = pts.length;
  if (n < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(n - 1, i + 2)];
    const cp1x = +(p1.x + (p2.x - p0.x) * tension).toFixed(2);
    const cp1y = +(p1.y + (p2.y - p0.y) * tension).toFixed(2);
    const cp2x = +(p2.x - (p3.x - p1.x) * tension).toFixed(2);
    const cp2y = +(p2.y - (p3.y - p1.y) * tension).toFixed(2);
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

const WAYPOINTS = buildWaypoints();
// Milestone points = the 12 land midpoints (indices 2–13 in the waypoints array)
const MILESTONES = WAYPOINTS.slice(2, 2 + LAND_COUNT);

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdventurePath() {
  const pathD = useMemo(() => catmullRomPath(WAYPOINTS), []);

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 100 ${TOTAL_H}`}
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        // Isolate the SVG's stacking context so it sits above section
        // backgrounds but the section content (z-index 2+) stays on top.
        isolation: "auto",
      }}
    >
      {/* ── Road layers (back → front) ──────────────────────────────────── */}

      {/* 1. Outer drop-shadow glow */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(50,28,4,0.45)"
        strokeWidth="44"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.7}
      />

      {/* 2. Dark road edge / border */}
      <path
        d={pathD}
        fill="none"
        stroke="#7a5010"
        strokeWidth="35"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* 3. Main road surface — warm earthy sand */}
      <path
        d={pathD}
        fill="none"
        stroke="#c8a45a"
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* 4. Inner highlight — lighter sandy centre */}
      <path
        d={pathD}
        fill="none"
        stroke="#e8c97e"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />

      {/* 5. Centre dash line (like a real road) */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,255,0.38)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="18 14"
        vectorEffect="non-scaling-stroke"
      />

      {/* ── Milestone dots at each land's midpoint ──────────────────────── */}
      {MILESTONES.map((pt, i) => (
        <g key={i}>
          {/* Outer glow halo */}
          <circle
            cx={pt.x}
            cy={pt.y}
            r="4"
            fill="rgba(255,218,80,0.22)"
            vectorEffect="non-scaling-stroke"
          />
          {/* Main dot */}
          <circle
            cx={pt.x}
            cy={pt.y}
            r="2.4"
            fill="#f5d87a"
            stroke="#8a6010"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bright centre spark */}
          <circle
            cx={pt.x}
            cy={pt.y}
            r="0.9"
            fill="#fffbe8"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}
