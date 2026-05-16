'use client'

/**
 * AdventurePath — full-page squiggly SVG trail
 *
 * Renders a single <svg> stretched over the entire adventure-map wrapper.
 * The path snakes left↔right, threading through the center of each land's
 * numbered milestone badge (odd lands badge on LEFT, even lands on RIGHT).
 *
 * z-index: 2 puts it above section backgrounds (z-index: auto) but the
 * badges themselves (z-index: 5 within their section stacking context) and
 * brighter colors ensure they always read as "in front" of the faint trail.
 */

export default function AdventurePath({ landCount = 12 }: { landCount?: number }) {
  // ── Horizontal badge positions in viewBox x-space (0–100) ──────────────
  // Milestone column is clamp(8px,3vw,48px) from the edge; badge is 44px wide.
  // At 1200px desktop: (36+22)/1200*100 ≈ 5%.  At 360px mobile: (8+16)/360*100 ≈ 7%.
  // Using 6 / 94 gives a good centred average that works across breakpoints.
  const LEFT = 6;
  const RIGHT = 94;

  // ── ViewBox: 0 0 100 1300 ───────────────────────────────────────────────
  // Hero section  : y=0 … 100  (~100 vh, ≈7.7 % of total)
  // Land n section: starts at y = 100+(n-1)*100, badge centre at midpoint
  //   → badge y = 100 + (n-1)*100 + 50 = 150 + (n-1)*100
  const badgeX = (n: number) => (n % 2 !== 0 ? LEFT : RIGHT)
  const badgeY = (n: number) => 150 + (n - 1) * 100

  // ── Build SVG path ──────────────────────────────────────────────────────
  // Start at top of page, run straight down to first badge (left side).
  let d = `M ${LEFT},0 L ${LEFT},${badgeY(1)}`

  for (let i = 2; i <= landCount; i++) {
    const x1 = badgeX(i - 1)
    const y1 = badgeY(i - 1)
    const x2 = badgeX(i)
    const y2 = badgeY(i)
    // Cubic bezier: leave each badge going straight down (CP1 stays at x1),
    // approach next badge straight from above (CP2 stays at x2).
    // This creates a clean S-curve that crosses the page centre at the midpoint.
    const third = Math.round((y2 - y1) / 3) // ≈ 33 units
    d += ` C ${x1},${y1 + third} ${x2},${y2 - third} ${x2},${y2}`
  }

  // Extend a bit below the last badge to the bottom of the viewBox.
  d += ` L ${badgeX(landCount)},1300`

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        // Positive z-index keeps the trail above section backgrounds
        // (sections are position:relative with no explicit z-index → z-index:auto)
        // while remaining below the Navbar and MapDrawer FAB (both z-index 50+).
        zIndex: 2,
      }}
      viewBox="0 0 100 1300"
      // Non-uniform scaling so the path covers the exact page width & height.
      preserveAspectRatio="none"
    >
      <path
        d={d}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={4}
        strokeDasharray="12 8"
        strokeLinecap="round"
        fill="none"
        // Keep stroke-width in screen pixels regardless of viewBox scaling.
        vectorEffect="non-scaling-stroke"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.12))' }}
      />
    </svg>
  )
}
