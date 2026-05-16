'use client';

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLUG = 'brian-the-ghost';
const TITLE = 'Brian the Ghost';
const ACCENT = '#B0E0FF';

// ── Story pages: illustration + narration text ────────────────────────────
const PAGES = [
  { img: '/images/reader/brian-the-ghost/page-005.jpg', text: `At night, in the quiet town of St. Germaine… MONSTERS roam the streets.`, pn: 5 },
  { img: '/images/reader/brian-the-ghost/page-006.jpg', text: `There was Cleo, a MATERIALISTIC MUMMY.`, pn: 6 },
  { img: '/images/reader/brian-the-ghost/page-007.jpg', text: `And there was Roman, a WISTFUL WEREWOLF.`, pn: 7 },
  { img: '/images/reader/brian-the-ghost/page-008.jpg', text: `There was Sir Gregor, a GHOULISH… well… GHOUL.`, pn: 8 },
  { img: '/images/reader/brian-the-ghost/page-009.jpg', text: `…and then there was Brian.`, pn: 9 },
  { img: '/images/reader/brian-the-ghost/page-010.jpg', text: `Brian was a perfectly normal, everyday, regular GHOST.`, pn: 10 },
  { img: '/images/reader/brian-the-ghost/page-011.jpg', text: `Yet, Brian was different in one VERY BIG way.`, pn: 11 },
  { img: '/images/reader/brian-the-ghost/page-012.jpg', text: `While all the other monsters of St. Germaine loved to SPOOK! And BOO! And SCARE! Brian did not.`, pn: 12 },
  { img: '/images/reader/brian-the-ghost/page-013.jpg', text: `Brian just wanted to read BOOKS and play GAMES and watch MOVIES.`, pn: 13 },
  { img: '/images/reader/brian-the-ghost/page-014.jpg', text: `But, more than anything, Brian wanted a friend.`, pn: 14 },
  { img: '/images/reader/brian-the-ghost/page-015.jpg', text: `"You want to be friends? With one of them?" laughed the others. "Monsters don't make friends."`, pn: 15 },
  { img: '/images/reader/brian-the-ghost/page-016.jpg', text: `"We HAUNT them. We HOWL at them. We HISS at them. We never make friends." But Brian wasn't listening…`, pn: 16 },
  { img: '/images/reader/brian-the-ghost/page-017.jpg', text: `Something the ghosts said gave him an idea. What if he haunted nicely? Then someone would surely be his friend.`, pn: 17 },
  { img: '/images/reader/brian-the-ghost/page-018.jpg', text: `So, he made plans to begin the next night.`, pn: 18 },
  { img: '/images/reader/brian-the-ghost/page-020.jpg', text: `The first night, Brian went to the Bleecker house. "Children love clowns," he thought. "And surprises!" So, he turned into a clown and hid in the toy box.`, pn: 20 },
  { img: '/images/reader/brian-the-ghost/page-022.jpg', text: `It did not go like he thought.`, pn: 22 },
  { img: '/images/reader/brian-the-ghost/page-024.jpg', text: `The second night, he went to the Peterson house where he spied children washing their faces before bed. "Maybe I can be helpful?" thought Brian.`, pn: 24 },
  { img: '/images/reader/brian-the-ghost/page-026.jpg', text: `It did not go like he thought.`, pn: 26 },
  { img: '/images/reader/brian-the-ghost/page-028.jpg', text: `The third night, Brian had an even better idea. He went to the Smith's, where the family was gathered in front of the television. "I just know this will work," he reassured himself.`, pn: 28 },
  { img: '/images/reader/brian-the-ghost/page-030.jpg', text: `It did not go like he thought.`, pn: 30 },
  { img: '/images/reader/brian-the-ghost/page-032.jpg', text: `After three long nights, Brian was out of ideas. So, he went back to the place where he read his books and played his games and watched his movies… and he began to cry. "I just wish I had someone to play with…"`, pn: 32 },
  { img: '/images/reader/brian-the-ghost/page-034.jpg', text: `"I like your stuff!" A little girl named Lucy springs up from behind a pile of books. Brian screams in terror.`, pn: 34 },
  { img: '/images/reader/brian-the-ghost/page-036.jpg', text: `"You scared me! Oh, now I get it." Sheepishly, Brian asked, "What are you doing here?" "I'm kind of… an explorer!" said the girl. And suddenly, Brian had his best idea yet.`, pn: 36 },
  { img: '/images/reader/brian-the-ghost/page-037.jpg', text: `"I have some books about famous explorers. Do you want to see?" The girl beamed, "I'm Lucy." "I'm Brian. I'm a ghost."`, pn: 37 },
  { img: '/images/reader/brian-the-ghost/page-038.jpg', text: `And so, the two friends played and laughed late into the night in the quiet — well, maybe not so quiet — town of St. Germaine.`, pn: 38 },
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
          👻 Read It To Me!
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
          👻 {TITLE}
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
