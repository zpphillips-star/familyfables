"use client";
import { useState, useRef, useCallback } from "react";
import type { SceneConfig } from "./GameScenes";

interface Props {
  config: SceneConfig;
  accentColor: string;
}

export default function FindDifferences({ config, accentColor }: Props) {
  const [found, setFound] = useState<Set<number>>(new Set());
  const [markers, setMarkers] = useState<{ panel: "a" | "b"; x: number; y: number; hit: boolean }[]>([]);
  const [won, setWon] = useState(false);
  const svgRefA = useRef<SVGSVGElement>(null);
  const svgRefB = useRef<SVGSVGElement>(null);

  const { Scene, differences, viewBox } = config;
  const [vbW, vbH] = viewBox.split(" ").slice(2).map(Number);

  function svgCoords(e: React.MouseEvent | React.TouchEvent, ref: React.RefObject<SVGSVGElement | null>) {
    const svg = ref.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = ((clientX - rect.left) / rect.width) * vbW;
    const y = ((clientY - rect.top) / rect.height) * vbH;
    return { x, y };
  }

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent, panel: "a" | "b") => {
    e.preventDefault();
    const ref = panel === "a" ? svgRefA : svgRefB;
    const pt = svgCoords(e, ref);
    if (!pt) return;

    // Check if click is near any unfound difference
    let hit = -1;
    for (let i = 0; i < differences.length; i++) {
      if (found.has(i)) continue;
      const d = differences[i];
      const dist = Math.hypot(pt.x - d.x, pt.y - d.y);
      if (dist <= d.r) { hit = i; break; }
    }

    setMarkers(prev => [...prev, { panel, x: pt.x, y: pt.y, hit: hit >= 0 }]);

    if (hit >= 0) {
      const next = new Set(found);
      next.add(hit);
      setFound(next);
      if (next.size === differences.length) setTimeout(() => setWon(true), 600);
    }

    // Remove miss marker after a moment
    if (hit < 0) {
      setTimeout(() => setMarkers(prev => prev.filter(m => !(m.panel === panel && m.x === pt.x && m.y === pt.y))), 800);
    }
  }, [found, differences]);

  if (won) return (
    <div style={{ textAlign: "center", padding: "32px 16px" }}>
      <div style={{ fontSize: 64, marginBottom: 12 }}>🎊</div>
      <h3 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 28, color: accentColor, marginBottom: 8 }}>
        All {differences.length} differences found!
      </h3>
      <p style={{ color: "#555", fontSize: 16 }}>You have eagle eyes! 🦅</p>
      <div style={{ fontSize: 40, marginTop: 16 }}>⭐⭐⭐</div>
    </div>
  );

  const panels: Array<"a" | "b"> = ["a", "b"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ textAlign: "center", fontSize: 14, color: "#666", margin: 0 }}>
        Find <strong>{differences.length - found.size}</strong> difference{differences.length - found.size !== 1 ? "s" : ""} remaining · Tap or click to mark them!
      </p>

      {/* Two panels */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {panels.map(panel => (
          <div
            key={panel}
            style={{ flex: "1 1 140px", minWidth: 140, border: `2px solid ${accentColor}44`, borderRadius: 10, overflow: "hidden", cursor: "crosshair" }}
          >
            <div style={{ background: `${accentColor}22`, padding: "4px 8px", fontSize: 11, fontWeight: 700, color: accentColor, textTransform: "uppercase", textAlign: "center" }}>
              {panel === "a" ? "Picture 1" : "Picture 2"}
            </div>
            <svg
              ref={panel === "a" ? svgRefA : svgRefB}
              viewBox={viewBox}
              style={{ width: "100%", display: "block", touchAction: "none" }}
              onClick={e => handleClick(e, panel)}
              onTouchStart={e => handleClick(e, panel)}
            >
              <Scene variant={panel} />

              {/* Found markers on both panels */}
              {found.size > 0 && differences.map((d, i) =>
                found.has(i) ? (
                  <g key={i}>
                    <circle cx={d.x} cy={d.y} r={d.r} fill="none" stroke="#22c55e" strokeWidth="3" opacity="0.8" />
                    <circle cx={d.x} cy={d.y} r="6" fill="#22c55e" />
                  </g>
                ) : null
              )}

              {/* Click markers for this panel */}
              {markers.filter(m => m.panel === panel).map((m, i) =>
                m.hit ? null : (
                  <g key={i}>
                    <circle cx={m.x} cy={m.y} r="14" fill="#ef4444" opacity="0.5" />
                    <text x={m.x} y={m.y + 5} textAnchor="middle" fontSize="14" fill="#fff">✗</text>
                  </g>
                )
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        {differences.map((d, i) => (
          <div
            key={i}
            title={found.has(i) ? `✓ ${d.label}` : "?"}
            style={{
              width: 18, height: 18, borderRadius: "50%",
              background: found.has(i) ? "#22c55e" : "#e5e7eb",
              border: found.has(i) ? "none" : `2px solid ${accentColor}44`,
              transition: "all 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, color: "#fff", fontWeight: 700,
            }}
          >
            {found.has(i) ? "✓" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}
