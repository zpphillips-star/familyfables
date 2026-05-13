interface CloudDividerProps {
  /** Color of the foreground (front) cloud layer — should match section below */
  fill: string;
  /** Optional back layer color — creates depth; defaults to fill */
  fillBack?: string;
  /** Flip vertically to use at TOP of a section instead of bottom */
  flip?: boolean;
  /** Total height of the divider in px (default 380) */
  height?: number;
}

/**
 * CloudDivider — full-width SVG cloud silhouette divider.
 * Two-layer design: a back layer with tall dramatic peaks and a front
 * layer with lower, wider bumps for a fluffy depth effect.
 * Set fill to the background color of the section BELOW the divider.
 */
export default function CloudDivider({
  fill,
  fillBack,
  flip = false,
  height = 380,
}: CloudDividerProps) {
  // 7 cloud bumps across the full 1440px width.
  // Built with quadratic beziers: each bump is two Q segments —
  // the first sweeps up to the peak (control = horizontal with peak y),
  // the second sweeps back down (control = horizontal with peak y).
  // All y values are within viewBox 0-120.
  const frontPath =
    "M0,120 L0,78 " +
    "Q56,30 80,30 Q104,30 160,72 " +       // bump 1 — center 80
    "Q244,8 280,8 Q315,8 395,68 " +        // bump 2 — center 280
    "Q479,4 515,4 Q550,4 630,65 " +        // bump 3 — center 515 (tallest)
    "Q707,20 740,20 Q773,20 850,62 " +     // bump 4 — center 740
    "Q934,2 970,2 Q1005,2 1085,60 " +      // bump 5 — center 970 (tallest)
    "Q1155,15 1185,15 Q1218,15 1295,58 " + // bump 6 — center 1185
    "Q1362,32 1390,32 Q1405,32 1440,78 " + // bump 7 — center 1390
    "L1440,120 Z";

  // Back layer: taller peaks, slightly different spacing for realistic depth
  const backPath =
    "M0,120 L0,88 " +
    "Q40,55 75,48 Q110,38 140,62 Q170,80 205,78 " + // bump 1
    "Q250,42 295,22 Q330,8 365,20 Q400,35 440,32 " + // bump 2
    "Q475,12 510,5 Q545,2 580,15 Q615,35 655,30 " +  // bump 3 (tallest)
    "Q692,10 730,8 Q768,5 805,22 Q842,45 882,40 " +  // bump 4
    "Q918,18 955,8 Q992,2 1030,20 Q1068,40 1108,38 " + // bump 5
    "Q1148,12 1185,10 Q1222,8 1258,32 Q1294,55 1332,58 " + // bump 6
    "Q1368,38 1400,45 Q1430,52 1440,62 " +             // bump 7
    "L1440,120 Z";

  const resolvedBack = fillBack ?? fill;
  const frontH = Math.round(height * 0.70);
  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    [flip ? "top" : "bottom"]: 0,
    left: 0,
    width: "100%",
    height: `${height}px`,
    pointerEvents: "none",
    zIndex: 2,
  };
  const svgBase: React.CSSProperties = {
    position: "absolute",
    [flip ? "top" : "bottom"]: -2,
    left: 0,
    width: "100%",
    display: "block",
    transform: flip ? "scaleY(-1)" : undefined,
    transformOrigin: "center",
  };

  return (
    <div style={wrapStyle}>
      {/* Back layer — taller, slightly lighter, creates cloud depth */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="xMidYMax slice"
        style={{ ...svgBase, height: `${height}px` }}
        aria-hidden="true"
      >
        <path d={backPath} fill={resolvedBack} />
      </svg>
      {/* Front layer — main foreground clouds, 70% height so back peaks show above */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="xMidYMax slice"
        style={{ ...svgBase, height: `${frontH}px` }}
        aria-hidden="true"
      >
        <path d={frontPath} fill={fill} />
      </svg>
    </div>
  );
}
