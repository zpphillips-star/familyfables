"use client";
import { useState, useRef, useCallback } from "react";
import type { SceneConfig } from "./GameScenes";

interface Props {
  config: SceneConfig;
  accentColor: string;
}

export default function HiddenObjects({ config, accentColor }: Props) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [missFlash, setMissFlash] = useState(false);
  const [won, setWon] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const { Scene, hiddenItems, viewBox } = config;
  const [vbW, vbH] = viewBox.split(" ").slice(2).map(Number);

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = ((clientX - rect.left) / rect.width) * vbW;
    const y = ((clientY - rect.top) / rect.height) * vbH;

    let hit: string | null = null;
    for (const item of hiddenItems) {
      if (found.has(item.id)) continue;
      const dist = Math.hypot(x - item.zone.x, y - item.zone.y);
      if (dist <= item.zone.r) { hit = item.id; break; }
    }

    if (hit) {
      const next = new Set(found);
      next.add(hit);
      setFound(next);
      if (next.size === hiddenItems.length) setTimeout(() => setWon(true), 400);
    } else {
      setMissFlash(true);
      setTimeout(() => setMissFlash(false), 350);
    }
  }, [found, hiddenItems, vbW, vbH]);

  if (won) return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>🔍</div>
      <h3 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 28, color: accentColor, marginBottom: 8 }}>
        Everything found!
      </h3>
      <p style={{ color: "#555", fontSize: 16 }}>You're the best detective! 🕵️</p>
      <div style={{ fontSize: 40, marginTop: 16 }}>⭐⭐⭐</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Item checklist */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {hiddenItems.map(item => (
          <div
            key={item.id}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 700,
              fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
              background: found.has(item.id) ? "#dcfce7" : `${accentColor}18`,
              color: found.has(item.id) ? "#16a34a" : "#444",
              border: `2px solid ${found.has(item.id) ? "#22c55e" : accentColor + "44"}`,
              textDecoration: found.has(item.id) ? "line-through" : "none",
              transition: "all 0.3s",
            }}
          >
            <span style={{ fontSize: 18 }}>{item.emoji}</span>
            {item.label}
            {found.has(item.id) && <span>✓</span>}
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", fontSize: 13, color: "#777", margin: 0 }}>
        {found.size}/{hiddenItems.length} found · Tap anywhere in the picture!
      </p>

      {/* Scene */}
      <div
        style={{
          border: `3px solid ${missFlash ? "#ef4444" : accentColor + "44"}`,
          borderRadius: 12,
          overflow: "hidden",
          cursor: "crosshair",
          transition: "border-color 0.2s",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={viewBox}
          style={{ width: "100%", display: "block", touchAction: "none" }}
          onClick={handleClick}
          onTouchStart={handleClick}
        >
          <Scene variant="a" />

          {/* Revealed found items — pulsing circle + emoji */}
          {hiddenItems.map(item =>
            found.has(item.id) ? (
              <g key={item.id}>
                <circle cx={item.zone.x} cy={item.zone.y} r={item.zone.r + 4} fill="#22c55e" opacity="0.3" />
                <circle cx={item.zone.x} cy={item.zone.y} r={item.zone.r} fill="none" stroke="#22c55e" strokeWidth="3" />
                <text x={item.zone.x} y={item.zone.y + 6} textAnchor="middle" fontSize={item.zone.r * 1.1}>{item.emoji}</text>
              </g>
            ) : null
          )}
        </svg>
      </div>
    </div>
  );
}
