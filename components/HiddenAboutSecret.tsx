'use client';

import { useState } from 'react';

// ── Hidden About Page Easter Egg ──────────────────────────────────────────────
// A tiny 🪲 firefly hides in the bottom-left corner — barely visible.
// Click it 3 times to reveal "Victor's Lost Poem."
// This fulfills the promise made by the HiddenStar on the homepage:
//   "✨ You're a true explorer! Check the About page for another secret."

export default function HiddenAboutSecret() {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [wobble, setWobble] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    setWobble(true);
    setTimeout(() => setWobble(false), 400);
    if (next >= 3) {
      setTimeout(() => setRevealed(true), 250);
    }
  };

  const close = () => {
    setRevealed(false);
    setClicks(0);
  };

  // Firefly gets brighter and bigger as you discover it
  const size   = clicks === 0 ? 12 : clicks === 1 ? 18 : 24;
  const opacity = clicks === 0 ? 0.12 : clicks === 1 ? 0.45 : 0.85;

  return (
    <>
      {/* The hidden firefly */}
      <button
        onClick={handleClick}
        aria-label="hidden easter egg"
        title={clicks === 0 ? '' : clicks === 1 ? '🌟 Keep going...' : '✨ One more!'}
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: `${size}px`,
          opacity,
          zIndex: 50,
          transform: wobble ? 'scale(1.6) rotate(-15deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          filter: clicks >= 2 ? 'drop-shadow(0 0 6px #F4A839)' : 'none',
          padding: '8px',
          lineHeight: 1,
        }}
      >
        🪲
      </button>

      {/* Victor's Lost Poem — revealed on 3 clicks */}
      {revealed && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Victor's Lost Poem"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(18, 4, 48, 0.92)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backdropFilter: 'blur(6px)',
            animation: 'poem-fade-in 0.4s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, #2D1B69 0%, #4A2875 50%, #6B3FA0 100%)',
              borderRadius: '28px',
              padding: '44px 40px 36px',
              maxWidth: '460px',
              width: '100%',
              textAlign: 'center',
              border: '2px solid #F4A839',
              boxShadow: '0 0 80px #F4A83944, 0 20px 60px rgba(0,0,0,0.6)',
              animation: 'poem-slide-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Glowing firefly icon */}
            <div style={{ fontSize: '52px', marginBottom: '8px', filter: 'drop-shadow(0 0 12px #F4A839)' }}>
              🪲
            </div>

            {/* Badge */}
            <div style={{
              display: 'inline-block',
              backgroundColor: '#F4A83922',
              border: '1px solid #F4A83966',
              borderRadius: '999px',
              padding: '4px 14px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#F4A839',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              ✨ Secret Unlocked
            </div>

            <h3 style={{
              fontFamily: 'var(--font-fredoka), "Fredoka One", cursive',
              color: '#F4A839',
              fontSize: '28px',
              marginBottom: '4px',
              lineHeight: 1.2,
            }}>
              Victor&apos;s Lost Poem
            </h3>
            <p style={{
              color: '#9B8AC4',
              fontSize: '12px',
              marginBottom: '24px',
              fontStyle: 'italic',
            }}>
              Found in a Brooklyn notebook. Circa whenever.
            </p>

            {/* The poem */}
            <div style={{
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '24px 28px',
              marginBottom: '20px',
              borderLeft: '3px solid #F4A839',
              textAlign: 'left',
            }}>
              <p style={{
                color: 'white',
                fontStyle: 'italic',
                lineHeight: 2,
                fontSize: '15px',
                margin: 0,
              }}>
                &ldquo;A firefly blinked at the moon one night,<br />
                and said, &lsquo;I think I&apos;m brighter.&rsquo;<br />
                The moon just sighed and dimmed a bit —<br />
                some arguments aren&apos;t worth the fight-er.&rdquo;
              </p>
            </div>

            <p style={{ color: '#7B6898', fontSize: '13px', marginBottom: '20px' }}>
              — Victor Plotkin, professional moon-arguer 🌙
            </p>

            <div style={{
              background: '#F4A83911',
              borderRadius: '12px',
              padding: '10px 16px',
              marginBottom: '24px',
            }}>
              <p style={{ color: '#C8B4E8', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                🌟 <strong style={{ color: '#F4A839' }}>You found Victor&apos;s secret!</strong><br />
                You&apos;re officially a True Fables Explorer. There might be more.
              </p>
            </div>

            <button
              onClick={close}
              style={{
                backgroundColor: '#F4A839',
                color: '#2D1B69',
                border: 'none',
                borderRadius: '12px',
                padding: '10px 28px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Close ✨
            </button>
          </div>
        </div>
      )}

      {/* Keyframe animations (injected via style tag) */}
      <style>{`
        @keyframes poem-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes poem-slide-up {
          from { transform: translateY(40px) scale(0.9); opacity: 0; }
          to   { transform: translateY(0)    scale(1);   opacity: 1; }
        }
      `}</style>
    </>
  );
}
