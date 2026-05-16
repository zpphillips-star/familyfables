'use client';

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLUG = 'finding-hampton';
const TITLE = 'Finding Hampton';
const ACCENT = '#FFD46E';

// ── Story pages: illustration + narration text ────────────────────────────
const PAGES = [
  { img: '/images/reader/finding-hampton/page-04.jpg', text: `It was Rosie's birthday, and Hampton was in search of a gift for her. A last minute gift. He was very stressed.`, pn: 4 },
  { img: '/images/reader/finding-hampton/page-05.jpg', text: `What could Rosie want?! Some worms? A fan? A bubble bath?`, pn: 5 },
  { img: '/images/reader/finding-hampton/page-06.jpg', text: `Hampton took a seat on a nearby rock so he could really focus. He needed one hundred percent of his brain power dedicated to birthday present thinking.`, pn: 6 },
  { img: '/images/reader/finding-hampton/page-07.jpg', text: `So, he thought. And, he thought. And, he thought. Until he realized that the rock was moving!`, pn: 7 },
  { img: '/images/reader/finding-hampton/page-08.jpg', text: `Hampton, you're a genius! That's it! A walking rock! Rhinos love rocks. But a WALKING rock?! It's perfect.`, pn: 8 },
  { img: '/images/reader/finding-hampton/page-09.jpg', text: `Hampton reached to pick it up, but the rock took off! And again. And again.`, pn: 9 },
  { img: '/images/reader/finding-hampton/page-10.jpg', text: `Hampton spent hours tracking this elusive rock. In fact, he had walked so far and so long that he couldn't even hear his friends searching for him.`, pn: 10 },
  { img: '/images/reader/finding-hampton/page-11.jpg', text: `Using Hampton's special call, his friends yelled out at the top of their lungs: OINK! OINK! Piggy! Piggy! Up trees. In the water. In the sky. In the grass. In bananas. Under Rosie. In anthills.`, pn: 11 },
  { img: '/images/reader/finding-hampton/page-13.jpg', text: `Nothing.`, pn: 13 },
  { img: '/images/reader/finding-hampton/page-14.jpg', text: `Just then, he got a pig-of-a-genius idea! Hampton was too far and too focused on tracking that rock.`, pn: 14 },
  { img: '/images/reader/finding-hampton/page-16.jpg', text: `BOUNCE!`, pn: 16 },
  { img: '/images/reader/finding-hampton/page-17.jpg', text: `Who said that? Me. Get off me. Rock? Is that you?! A walking AND talking rock? Super rare… I'm just a turtle. A turtle running away from a hungry piggy.`, pn: 17 },
  { img: '/images/reader/finding-hampton/page-18.jpg', text: `There's no such thing as a walking rock! Or a talking rock! I've been tracking you all morning so I could give you as a gift to my friend. She's a rhino. Today's her birthday. But I thought you were a rock.`, pn: 18 },
  { img: '/images/reader/finding-hampton/page-19.jpg', text: `Your friend's birthday, huh? Which, by the way — still a turtle. Why not spend it WITH your friend instead? And maybe receive a gift? Not a rock gift, please.`, pn: 19 },
  { img: '/images/reader/finding-hampton/page-20.jpg', text: `Oh no! You're right! I need to get back to them!`, pn: 20 },
  { img: '/images/reader/finding-hampton/page-21.jpg', text: `Well, pig, you're in luck. Turtles are actual expert trackers. Follow my directions exactly and you'll reach your friends in time.`, pn: 21 },
  { img: '/images/reader/finding-hampton/page-22.jpg', text: `There. They're right there. Through the leaves. We didn't travel very far.`, pn: 22 },
  { img: '/images/reader/finding-hampton/page-23.jpg', text: `Overjoyed, Hampton thanked the turtle and leapt through the leaves.`, pn: 23 },
  { img: '/images/reader/finding-hampton/page-24.jpg', text: `I'm sorry I don't have a gift, Rosie. Don't be silly, Hampton. Having my friends with me on my birthday is the best gift I could have wished for.`, pn: 24 },
  { img: '/images/reader/finding-hampton/page-25.jpg', text: `Hampton then told his friends the whole story about the magical rock that walked and talked and had legs and a head. Everyone totally believed him.`, pn: 25 },
  { img: '/images/reader/finding-hampton/page-26.jpg', text: `It turned out to be Rosie's best birthday yet! With that, they spent the rest of the day together celebrating: eating worms, splashing around, and staying cool.`, pn: 26 },
  { img: '/images/reader/finding-hampton/page-27.jpg', text: `Not a rock.`, pn: 27 },
];

const FLIP_MS = 600;

// ── Animated sparkle overlay (plays during audio) ─────────────────────────
function PageSparkle() {
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
            background: i % 2 === 0 ? ACCENT : '#9B6FD0',
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

export default function ReaderPage() {
  const [started, setStarted] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
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

  // ── Audio ────────────────────────────────────────────────────────────────
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
      const mp3Url = `/audio/reader/${SLUG}/page-${String(PAGES[idx].pn).padStart(3, '0')}.mp3`;
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

  // ── Page turn ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
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

  // ── Swipe ─────────────────────────────────────────────────────────────────
  const touchX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) goNext();
    if (dx > 40) goPrev();
    touchX.current = null;
  };

  // ── Start screen ──────────────────────────────────────────────────────────
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

        <div style={{
          width: 200, height: 200, borderRadius: 16,
          overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          marginBottom: 32, border: `3px solid ${ACCENT}66`,
        }}>
          <Image
            src={`/images/reader/${SLUG}/${PAGES[0].img.split('/').pop()}`}
            alt={TITLE}
            width={200} height={200}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        <h1 style={{
          fontFamily: "'Concert One', cursive",
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          color: ACCENT,
          margin: '0 0 8px',
          textShadow: `0 0 20px ${ACCENT}80`,
        }}>
          {TITLE}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: '0 0 32px' }}>
          by Family Fables
        </p>

        <button
          onClick={() => setStarted(true)}
          style={{
            background: 'linear-gradient(135deg, #9B6FD0, #7C3AED)',
            color: 'white',
            border: `2px solid ${ACCENT}80`,
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
          🦛 Read It To Me!
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

  // ── Reader ────────────────────────────────────────────────────────────────
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
        borderBottom: `1px solid ${ACCENT}26`,
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
          color: `${ACCENT}b3`,
          fontSize: '0.78rem',
          fontFamily: "'Concert One', cursive",
          letterSpacing: '0.05em',
        }}>
          🦛 {TITLE}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', minWidth: 50, textAlign: 'right' }}>
          {pageIdx + 1} / {total}
        </span>
      </div>

      {/* Page spread */}
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
            return (
              <div style={{ position: 'relative' }}>
                <Image
                  src={current.img}
                  alt={`Page ${pageIdx + 1}`}
                  width={1800} height={900}
                  priority={pageIdx < 3}
                  style={imgStyle}
                />
                {audioStatus === 'playing' && <PageSparkle />}
              </div>
            );
          }

          const incomingImg = PAGES[flipState.toIdx].img;
          const outgoingImg = PAGES[flipState.fromIdx].img;
          const isForward = flipState.dir === 'forward';

          return (
            <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center' }}>
              <Image
                src={incomingImg}
                alt={`Page ${flipState.toIdx + 1}`}
                width={1800} height={900}
                priority
                style={{ ...imgStyle, display: 'block' }}
              />
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

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
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
                  background: i === pageIdx ? ACCENT : i < pageIdx ? 'rgba(155,111,208,0.6)' : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

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
