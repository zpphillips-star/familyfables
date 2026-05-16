'use client';

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ── Story pages: illustration + narration text ─────────────────────────────
const PAGES = [
  {
    img: '/images/reader/amber-dragon-keeper/page-01.jpg',
    text: 'Amber was a little girl who lived a normal happy life. She went to school, played with her toys, laughed with her parents, and dreamed her wonderful dreams. But Amber had a secret.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-02.jpg',
    text: 'Amber had a magical closet that took her to a far-off place. A place where fairies flew free and mermaids swam the deepest seas. But the most amazing of all the creatures that roamed this land were the dragons that took to the skies.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-03.jpg',
    text: 'This land was called Sydar. And in Sydar, Amber was the famous dragon keeper.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-04.jpg',
    text: 'What is a dragon keeper? To know that, you must first know the dragons.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-05.jpg',
    text: "The dragons of Sydar weren't nasty or scary or mean. They were the most gentle creatures that roamed the land.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-06.jpg',
    text: 'There were tall ones. Short ones. Skinny ones. Fat ones. Old ones. And baby ones.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-07.jpg',
    text: 'And Amber was friends with them all.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-08.jpg',
    text: 'She taught them to fly and to walk and to swim. She kept them clean from their scaly nose to their scaly toes. And she trained them to control their magical breath of fire and ice!',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-09.jpg',
    text: 'But her most favorite thing of all the things to do with the dragons was to ride them. Amber and the dragons would spend hours in the skies. Diving, swirling, twirling, and scoobatoobing...',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-10.jpg',
    text: '...scoobatoobing was a special move you could only do with the dragons of Sydar.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-11.jpg',
    text: 'All the dragons of Sydar were amazing in their own special way, but Amber did have a favorite. She considered this dragon her best friend in all of Sydar. He was a majestic dragon with soft blue scales and a golden mane. His name was Cinnamon.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-12.jpg',
    text: 'Cinnamon and Amber went on amazing adventures together. They fought off dangerous witches and warlocks, helped villagers build their cottages, and watched over all the creatures of Sydar.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-13.jpg',
    text: "But it wasn't always work for Amber and Cinnamon — they also found a way to have fun. They flew high up above the clouds. They went camping and roasted as many marshmallows as they could fit in their mouths. They created ice lakes for the villagers to skate on and made many, many friends along the way.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-14.jpg',
    text: 'This was everyday life in Sydar. But days are still days, and all days come to an end.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-15.jpg',
    text: 'Cinnamon would fly Amber to the Glowing Mountains where Amber would give her friend a biiiigggg hug goodbye, and they would smile knowing they were that much closer to seeing each other again. Then, Amber would enter the magical cave and come out of the closet into her bedroom on the other side.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-16.jpg',
    text: 'She would go to sleep and dream her wonderful dreams, excited to tell her parents about her adventures in the morning.',
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-17.jpg',
    text: "Whether her parents thought her adventures were dreams or not, Amber always knew the truth. Every night when she walked through the magical closet to visit Cinnamon and the other dragons of Sydar, she became...",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-18.jpg',
    text: 'Amber, the Dragon Keeper!',
  },
];

const FLIP_MS = 600;

// ── Animated dragon sparkle overlay ───────────────────────────────────────
function DragonSparkle() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 6 + (i % 3) * 4,
            height: 6 + (i % 3) * 4,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#FFD700' : '#9B6FD0',
            opacity: 0,
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
            animation: `sparkle ${1.4 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 0.7; transform: scale(1) translateY(-12px); }
        }
      `}</style>
    </div>
  );
}

export default function AmberReaderPage() {
  const [started, setStarted] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  // flipState: null = idle, otherwise page is mid-turn
  const [flipState, setFlipState] = useState<{
    dir: 'forward' | 'back';
    fromIdx: number;
    toIdx: number;
  } | null>(null);
  const [audioStatus, setAudioStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [autoPlay, setAutoPlay] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const total = PAGES.length;
  const current = PAGES[pageIdx];

  // ── Audio ──────────────────────────────────────────────────────────────
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setAudioStatus('idle');
  }, []);

  const playPage = useCallback(async (idx: number) => {
    stopAudio();
    setAudioStatus('loading');
    try {
      const mp3Url = `/audio/amber-dragon-keeper/page-${String(idx + 1).padStart(2, '0')}.mp3`;
      const audio = new Audio(mp3Url);
      audioRef.current = audio;
      audio.onended = () => setAudioStatus('idle');
      audio.onerror = () => setAudioStatus('idle');
      audio.onplaying = () => setAudioStatus('playing');
      await audio.play();
    } catch {
      setAudioStatus('idle');
    }
  }, [stopAudio]);

  // Auto-play when page changes
  useEffect(() => {
    if (started && autoPlay) {
      playPage(pageIdx);
    }
    return stopAudio;
  }, [pageIdx, started]); // eslint-disable-line

  // ── Page turn ─────────────────────────────────────────────────────────

  const goNext= useCallback(() => {
    if (pageIdx >= total - 1 || flipState) return;
    stopAudio();
    const toIdx = pageIdx + 1;
    setFlipState({ dir: 'forward', fromIdx: pageIdx, toIdx });
    setTimeout(() => {
      setPageIdx(toIdx);
      setFlipState(null);
    }, FLIP_MS);
  }, [pageIdx, total, flipState, stopAudio]);

  const goPrev = useCallback(() => {
    if (pageIdx <= 0 || flipState) return;
    stopAudio();
    const toIdx = pageIdx - 1;
    setFlipState({ dir: 'back', fromIdx: pageIdx, toIdx });
    setTimeout(() => {
      setPageIdx(toIdx);
      setFlipState(null);
    }, FLIP_MS);
  }, [pageIdx, flipState, stopAudio]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // ── Swipe ─────────────────────────────────────────────────────────────
  const touchX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) goNext();
    if (dx > 40) goPrev();
    touchX.current = null;
  };

  // ── Start screen ──────────────────────────────────────────────────────
  if (!started) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1060 50%, #0d1f3c 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Stars */}
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            borderRadius: '50%',
            background: 'white',
            opacity: 0.4 + (i % 5) * 0.12,
            top: `${(i * 17 + 5) % 90}%`,
            left: `${(i * 23 + 3) % 95}%`,
            animation: `twinkle ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
          }} />
        ))}
        <style>{`@keyframes twinkle { 0%,100%{opacity:0.2} 50%{opacity:0.9} }`}</style>

        {/* Book cover */}
        <div style={{
          width: 200, height: 200, borderRadius: 16,
          overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          marginBottom: 32, border: '3px solid rgba(255,215,0,0.4)',
        }}>
          <Image
            src="/images/reader/amber-dragon-keeper/page-01.jpg"
            alt="Amber the Dragon Keeper"
            width={200} height={200}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        <h1 style={{
          fontFamily: "'Concert One', cursive",
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          color: '#FFD700',
          margin: '0 0 8px',
          textShadow: '0 0 20px rgba(255,215,0,0.5)',
        }}>
          Amber the Dragon Keeper
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 32px' }}>
          by Family Fables
        </p>

        <button
          onClick={() => setStarted(true)}
          style={{
            background: 'linear-gradient(135deg, #9B6FD0, #7C3AED)',
            color: 'white',
            border: '2px solid rgba(255,215,0,0.5)',
            borderRadius: 50,
            padding: '16px 40px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(155,111,208,0.5)',
            letterSpacing: '0.03em',
            marginBottom: 16,
          }}
        >
          🐉 Read It To Me!
        </button>

        <label style={{
          display: 'flex', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={e => setAutoPlay(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          Read aloud automatically
        </label>

        <Link
          href="/"
          style={{
            marginTop: 24, color: 'rgba(255,255,255,0.35)',
            fontSize: '0.8rem', textDecoration: 'none',
          }}
        >
          ← Back to Family Fables
        </Link>
      </div>
    );
  }

  // ── Reader ────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#0a0018',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,215,0,0.15)',
        zIndex: 10,
        flexShrink: 0,
      }}>
        <Link
          href="/"
          style={{
            color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem',
            textDecoration: 'none', padding: '4px 8px',
          }}
        >
          ← Home
        </Link>
        <span style={{
          color: 'rgba(255,215,0,0.7)',
          fontSize: '0.78rem',
          fontFamily: "'Concert One', cursive",
          letterSpacing: '0.05em',
        }}>
          🐉 Amber the Dragon Keeper
        </span>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', minWidth: 50, textAlign: 'right' }}>
          {pageIdx + 1} / {total}
        </span>
      </div>

      {/* Page spread — real page turn */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          padding: '8px',
          minHeight: 0,
          overflow: 'hidden',
        }}
        onClick={goNext}
      >
        {/* ── Shared image style ─────────────────────────────────────── */}
        {(() => {
          const imgStyle: CSSProperties = {
            maxWidth: '100%',
            maxHeight: 'calc(100dvh - 160px)',
            objectFit: 'contain',
            borderRadius: 8,
            display: 'block',
            boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
            userSelect: 'none',
            pointerEvents: 'none',
          };

          if (!flipState) {
            // ── Static: just show current page ──────────────────────────
            return (
              <div style={{ position: 'relative' }}>
                <Image
                  src={current.img}
                  alt={`Page ${pageIdx + 1}`}
                  width={1800} height={900}
                  priority={pageIdx < 3}
                  style={imgStyle}
                />
                {audioStatus === 'playing' && <DragonSparkle />}
              </div>
            );
          }

          // ── Flipping: two-layer page turn ──────────────────────────────
          const incomingImg = PAGES[flipState.toIdx].img;
          const outgoingImg = PAGES[flipState.fromIdx].img;
          const isForward = flipState.dir === 'forward';

          return (
            <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
              {/* Layer 1 (bottom): incoming page */}
              <Image
                src={incomingImg}
                alt={`Page ${flipState.toIdx + 1}`}
                width={1800} height={900}
                priority
                style={{ ...imgStyle, display: 'block' }}
              />

              {/* Layer 2 (top): outgoing page folding away */}
              <div style={{
                position: 'absolute',
                inset: 0,
                transformStyle: 'preserve-3d',
                transformOrigin: isForward ? 'left center' : 'right center',
                animation: isForward
                  ? `pageTurnForward ${FLIP_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1.000) forwards`
                  : `pageTurnBack ${FLIP_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1.000) forwards`,
                perspective: '1800px',
              }}>
                <Image
                  src={outgoingImg}
                  alt={`Page ${flipState.fromIdx + 1}`}
                  width={1800} height={900}
                  style={{ ...imgStyle, width: '100%', height: '100%', objectFit: 'contain' }}
                />
                {/* Shadow gradient that darkens as the page folds */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 8,
                  background: isForward
                    ? 'linear-gradient(to left, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)',
                  animation: `pageShadow ${FLIP_MS}ms ease-in forwards`,
                  pointerEvents: 'none',
                }} />
              </div>

              <style>{`
                @keyframes pageTurnForward {
                  0%   { transform: perspective(1800px) rotateY(0deg); }
                  100% { transform: perspective(1800px) rotateY(-180deg); }
                }
                @keyframes pageTurnBack {
                  0%   { transform: perspective(1800px) rotateY(0deg); }
                  100% { transform: perspective(1800px) rotateY(180deg); }
                }
                @keyframes pageShadow {
                  0%   { opacity: 0; }
                  40%  { opacity: 1; }
                  80%  { opacity: 0.6; }
                  100% { opacity: 0; }
                }
              `}</style>
            </div>
          );
        })()}
      </div>

      {/* Bottom controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.7)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        gap: 12,
        flexShrink: 0,
      }}>
        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          disabled={pageIdx === 0}
          aria-label="Previous page"
          style={{
            background: pageIdx === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(155,111,208,0.3)',
            border: '1px solid rgba(155,111,208,0.4)',
            borderRadius: 40,
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: pageIdx === 0 ? 'rgba(255,255,255,0.15)' : 'white',
            fontSize: '1.2rem',
            cursor: pageIdx === 0 ? 'default' : 'pointer',
            flexShrink: 0,
          }}
        >◀</button>

        {/* Audio / progress */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            {PAGES.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== pageIdx && !flipState) {
                    stopAudio();
                    const dir = i > pageIdx ? 'forward' : 'back';
                    setFlipState({ dir, fromIdx: pageIdx, toIdx: i });
                    setTimeout(() => { setPageIdx(i); setFlipState(null); }, 600);
                  }
                }}
                aria-label={`Go to page ${i + 1}`}
                style={{
                  width: i === pageIdx ? 18 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === pageIdx ? '#FFD700' : i < pageIdx ? 'rgba(155,111,208,0.6)' : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Audio button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (audioStatus !== 'idle') { stopAudio(); } else { playPage(pageIdx); }
              }}
              style={{
                background: 'rgba(155,111,208,0.2)',
                border: '1px solid rgba(155,111,208,0.4)',
                borderRadius: 20,
                padding: '4px 14px',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              {audioStatus === 'idle' ? '🔊 Read aloud' : audioStatus === 'loading' ? '⏳ Loading…' : '⏹ Stop'}
            </button>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          disabled={pageIdx === total - 1}
          aria-label="Next page"
          style={{
            background: pageIdx === total - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(155,111,208,0.3)',
            border: '1px solid rgba(155,111,208,0.4)',
            borderRadius: 40,
            width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: pageIdx === total - 1 ? 'rgba(255,255,255,0.15)' : 'white',
            fontSize: '1.2rem',
            cursor: pageIdx === total - 1 ? 'default' : 'pointer',
            flexShrink: 0,
          }}
        >▶</button>
      </div>
    </div>
  );
}
