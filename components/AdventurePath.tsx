'use client'

/**
 * AdventurePath — full-page creative SVG trail
 *
 * Each segment between numbered land badges has a unique visual personality:
 * arcs, loops, spirals, zigzags, diagonals, and grand sweeps.
 * The endpoint of every bezier segment lands exactly on the badge centre so
 * the trail visually passes through every milestone marker.
 *
 * ViewBox: 0 0 100 1300  (hero=100 units, each land=100 units, 12 lands)
 * Badge positions — odd lands LEFT (x=6), even lands RIGHT (x=94):
 *   badgeY(n) = 150 + (n−1)×100
 *
 * z-index: 2 → above section backgrounds, below Navbar/FAB (z≥50).
 */

export default function AdventurePath({ landCount = 12 }: { landCount?: number }) {
  const L = 6    // left badge x
  const R = 94   // right badge x

  // Badge centre coordinates in viewBox space
  const bx = (n: number) => (n % 2 !== 0 ? L : R)
  const by = (n: number) => 150 + (n - 1) * 100

  // ── Handcrafted path — every segment has its own character ────────────
  //
  //  C x1,y1  x2,y2  ex,ey   = cubic bezier (control-pt-1, control-pt-2, endpoint)
  //  Control points outside 0–100 x-range are fine: the CURVE is clipped by the
  //  container overflow, but the interesting deviation stays on-screen.
  //
  const d = [
    // ── Start exactly at Badge 1 ────────────────────────────────────────
    `M ${L},${by(1)}`,

    // ── 1 → 2 : BIG SWEEPING RIGHT ARC ─────────────────────────────────
    // Like a parenthesis ")" hugging the right side of the page.
    `C 132,155  132,245  ${R},${by(2)}`,

    // ── 2 → 3 : LEFT HOOK LOOP ──────────────────────────────────────────
    // Shoots wide left past the page edge, curls back to land at badge 3.
    `C 50,262  -42,292  -28,332`,
    `C -16,348   0,356  ${L},${by(3)}`,

    // ── 3 → 4 : TIGHT DOUBLE ZIGZAG ─────────────────────────────────────
    // Two quick S-bends — a snappy left-then-right wriggle.
    `C  ${L},372  52,382  52,401`,
    `C  52,422  ${R},432  ${R},${by(4)}`,

    // ── 4 → 5 : WIDE LAZY LEFT CURVE ────────────────────────────────────
    // A single long bow that drifts well past the left edge.
    `C ${R},472  -22,528  ${L},${by(5)}`,

    // ── 5 → 6 : LOOSE SPIRAL ────────────────────────────────────────────
    // Two curves that arc through the page centre — a tightening gyre.
    `C 60,562  80,600  64,622`,
    `C 50,642  ${R},645  ${R},${by(6)}`,

    // ── 6 → 7 : TIGHT RIGHT LOOP ────────────────────────────────────────
    // Rockets right off the page, curls back around, arrives on the left.
    `C 124,658  124,710  90,726`,
    `C 66,740   20,748  ${L},${by(7)}`,

    // ── 7 → 8 : LONG CONFIDENT DIAGONAL ────────────────────────────────
    // Clean crossing from left to right — like a bold stride.
    `C 28,772  70,828  ${R},${by(8)}`,

    // ── 8 → 9 : WIDE LEFT SWOOPING LOOP ─────────────────────────────────
    // Sweeps far left, hooks downward, snaps back to badge on left side.
    `C 50,866  -30,898  -22,937`,
    `C -14,958   4,956  ${L},${by(9)}`,

    // ── 9 → 10 : RELAXED GENTLE S-CURVE ────────────────────────────────
    // Unhurried left-to-right classic S.
    `C ${L},978  ${R},1022  ${R},${by(10)}`,

    // ── 10 → 11 : OVERSIZED RIGHT BALLOON LOOP ──────────────────────────
    // Balloons way out to the right before arcing back left to badge 11.
    `C 136,1062  136,1140  50,1148`,
    `C  12,1150   ${L},1152  ${L},${by(11)}`,

    // ── 11 → 12 : GRAND FINALE — FULL-WIDTH LEFT SWEEP ──────────────────
    // One dramatic arc that crosses the full width from far-left to badge 12.
    `C -38,1162  -38,1238  ${R},${by(12)}`,

    // Trail fades off the bottom of the page
    `L ${R},1300`,
  ].join(' ')

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
        zIndex: 2,
        overflow: 'visible',
      }}
      viewBox="0 0 100 1300"
      preserveAspectRatio="none"
    >
      <path
        d={d}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={4}
        strokeDasharray="12 8"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.12))' }}
      />
    </svg>
  )
}
