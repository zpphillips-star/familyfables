interface WaveDividerProps {
  /** Fill color matching the section below the divider */
  fill: string;
  /** Flip vertically to use at TOP of a section */
  flip?: boolean;
  /** Total height of the divider in px (default 380) */
  height?: number;
}

/**
 * WaveDivider — layered ocean-wave SVG divider.
 * Two sinusoidal wave paths at different vertical offsets:
 * a back wave (30% opacity, higher) and a front wave (solid, lower)
 * give a nautical depth effect fitting a kids book brand.
 * Set fill to the background color of the section BELOW the divider.
 */
export default function WaveDivider({ fill, flip = false, height = 380 }: WaveDividerProps) {
  // Back wave — higher up, one full sinusoidal period across 1440px
  // Amplitude ≈ 35px, baseline at y=65, trough at y=100, crest at y=30
  const backPath =
    "M0,65 C180,30 360,100 540,65 C720,30 900,100 1080,65 C1260,30 1440,65 1440,65 L1440,120 L0,120 Z";

  // Front wave — lower, half-period offset (starts at trough, ends at trough)
  // Amplitude ≈ 28px, baseline at y=82, trough at y=110, crest at y=54
  const frontPath =
    "M0,82 C180,54 360,110 540,82 C720,54 900,110 1080,82 C1260,54 1440,82 1440,82 L1440,120 L0,120 Z";

  const wrapStyle: React.CSSProperties = {
    position: "absolute",
    [flip ? "top" : "bottom"]: 0,
    left: 0,
    width: "100%",
    height: `${height}px`,
    pointerEvents: "none",
    zIndex: 2,
  };
  const svgStyle: React.CSSProperties = {
    position: "absolute",
    [flip ? "top" : "bottom"]: -2,
    left: 0,
    width: "100%",
    height: "100%",
    display: "block",
    transform: flip ? "scaleY(-1)" : undefined,
    transformOrigin: "center",
  };

  return (
    <div style={wrapStyle}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={svgStyle}
        aria-hidden="true"
      >
        {/* Back wave — lighter, peeks above front wave for depth */}
        <path d={backPath} fill={fill} fillOpacity="0.35" />
        {/* Front wave — solid, dominant foreground wave */}
        <path d={frontPath} fill={fill} />
      </svg>
    </div>
  );
}
