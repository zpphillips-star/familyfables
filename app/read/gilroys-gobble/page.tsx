'use client';

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLUG = 'gilroys-gobble';
const TITLE = "Gilroy's Gobble";
const ACCENT = '#FFB347';

// ── Story pages: illustration + narration text ────────────────────────────
const PAGES = [
  { img: '/images/reader/gilroys-gobble/spreads/spread-001.jpg', text: null, audioUrl: null, pn: 1 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-002.jpg', text: `Overjoyed to see the red fall leaves fall, Gilroy belted out quite an odd turkey call. "Wee Loo Lee Loo!`, audioUrl: '/audio/reader/gilroys-gobble/spread-002.mp3', pn: 2 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-003.jpg', text: `Olivia the owl was watching from above, then asked a question with her owly love: "What was that, my dear? That was no 'Hoo.`, audioUrl: '/audio/reader/gilroys-gobble/spread-003.mp3', pn: 3 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-004.jpg', text: `That's my turkey call. It's what turkeys do. Here, let me help. Do what I do. Let me hear your turkey... Hooooo!`, audioUrl: '/audio/reader/gilroys-gobble/spread-004.mp3', pn: 4 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-005.jpg', text: `Trying to fit in, and without further ado, Gilroy let out a "Wee Loo Lee Loo! Overheard by Corey, the cow on the farm, Gilroy wobbled to him, charmed by his charm.`, audioUrl: '/audio/reader/gilroys-gobble/spread-005.mp3', pn: 5 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-006.jpg', text: `You've got charisma, kid. I'll give you that much. What you've really got to do is add a cow's touch. Now, watch me closely. Balance on four legs, and moo your turkey... Mooooo!" Taking his advice, Gilroy dropped to his wings and let out a "Wee Loo Lee Loo!`, audioUrl: '/audio/reader/gilroys-gobble/spread-006.mp3', pn: 6 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-007.jpg', text: `Wee Loo Lee Loo! That sounds so close," snapped the rooster on the roof, "to what a bird should sound like. That thing on your face — we call it a beak. Use it like mine and speak bird speak.`, audioUrl: '/audio/reader/gilroys-gobble/spread-007.mp3', pn: 7 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-008.jpg', text: `First, puff out your chest and feather your do. Then let us hear your turkey... Cock-a-doodle-Doo!" Taking his advice, Gilroy mirrored his moves and let out a "Wee Loo Lee Loo!`, audioUrl: '/audio/reader/gilroys-gobble/spread-008.mp3', pn: 8 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-009.jpg', text: `Wee Loo Lee Loo! Hey, Gilroy the turkey! You look a little tense. Don't mind the others. They haven't a clue. The remedy you seek is in the form of a 'Coo.`, audioUrl: '/audio/reader/gilroys-gobble/spread-009.mp3', pn: 9 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-010.jpg', text: `Jump up here with me and follow my moves. Then let us hear your turkey... Coo Coo Ka Choo." Taking his advice, Gilroy popped on the post and let out a "Wee Loo Lee Loo.`, audioUrl: '/audio/reader/gilroys-gobble/spread-010.mp3', pn: 10 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-011.jpg', text: `Wee Loo Lee Loo. At the pond nearby swam a spotted looney loon.`, audioUrl: '/audio/reader/gilroys-gobble/spread-011.mp3', pn: 11 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-012.jpg', text: `Come here, young turkey. You've got to sing my tune." Right then she yelled out, "Loo Loo Loo! Loo Dee Loo Dee Loo! All your calls are different! I don't know which one to choose. They all sound great, but they all sound like you!`, audioUrl: '/audio/reader/gilroys-gobble/spread-012.mp3', pn: 12 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-013.jpg', text: null, audioUrl: null, pn: 13 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-014.jpg', text: `Gilroy wandered off thinking, "I'm doing this all wrong. How am I going to find the right turkey song? Then off in the distance, he heard a "Tut Tut Too Doo." It came from a turkey, but wasn't something he knew.`, audioUrl: '/audio/reader/gilroys-gobble/spread-014.mp3', pn: 14 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-015.jpg', text: `Tut Tut Too Doo. What is that sound? Did that come from you? Please teach it to me so I can sound like I'm supposed to.`, audioUrl: '/audio/reader/gilroys-gobble/spread-015.mp3', pn: 15 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-016.jpg', text: `You're not a loon, cow, rooster, or owl. You are who you are, Gilroy the fowl. So no matter your call, make sure it's your own — from the time you're a baby until your full grown.`, audioUrl: '/audio/reader/gilroys-gobble/spread-016.mp3', pn: 16 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-017.jpg', text: `The advice sank in, as he looked all around. Gilroy saw each animal sounding their sound. They all looked happy, for they were who they were, no matter what they wore: feathers or fur.`, audioUrl: '/audio/reader/gilroys-gobble/spread-017.mp3', pn: 17 },
  { img: '/images/reader/gilroys-gobble/spreads/spread-018.jpg', text: `Gilroy smiled a big smile. He finally knew. He was himself — a turkey — through and through. With that he joined the rest of the crew, and let out his own Gilroy "Wee Loo Lee Loo!`, audioUrl: '/audio/reader/gilroys-gobble/spread-018.mp3', pn: 18 },
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
            background: i % 2 === 0 ? ACCENT : '#FF8C00',
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
  const [isLandscape, setIsLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }, []);


  useEffect(() => {
    const check = () => {
      const land = window.innerWidth > window.innerHeight && window.innerHeight < 600;
      setIsLandscape(land);
      if (land && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    };
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
      document.removeEventListener('fullscreenchange', onFsChange);
    };
  }, []);

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
    const audioUrl = PAGES[idx].audioUrl;
    if (!audioUrl) { setAudioStatus('idle'); return; }
    setAudioStatus('loading');
    try {
      const audio = new Audio(audioUrl);
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
          background: 'linear-gradient(160deg, #3d1500 0%, #7a2e00 45%, #bf5600 100%)',
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
            background: 'linear-gradient(135deg, #F4A839, #e65100)',
            color: 'white',
            border: `2px solid ${ACCENT}80`,
            borderRadius: 50,
            padding: '16px 40px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(244,168,57,0.45)',
            letterSpacing: '0.03em',
            marginBottom: 16,
          }}
        >
          🦃 Read It To Me!
        </button>

        <p style={{
          color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem',
          margin: '8px 0 0', letterSpacing: '0.03em',
        }}>📱 Rotate your screen for full screen</p>

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
        background: '#1a0800',
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
        background: 'rgba(30,10,0,0.82)',
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
          🦃 {TITLE}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', minWidth: 50, textAlign: 'right' }}>
          {pageIdx + 1} / {total}
        </span>
      </div>

      {/* Page spread */}
      <div
        style={(isLandscape || isFullscreen) ? {
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', overflow: 'hidden',
        } : {
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer', padding: '8px',
          minHeight: 0, overflow: 'hidden',
        }}
        onClick={goNext}
      >
        {isLandscape && (
          <button
            onClick={(e) => { e.stopPropagation(); setIsLandscape(false); setIsFullscreen(false); if (document.fullscreenElement) document.exitFullscreen(); }}
            style={{
              position: 'absolute', top: 8, right: 8, zIndex: 10,
              background: 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: '50%',
              width: 32, height: 32,
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Exit fullscreen"
          >✕</button>
        )}
        {(() => {
          const imgStyle: CSSProperties = {
            maxWidth: isLandscape ? '100dvw' : '100%',
            maxHeight: isLandscape ? '100dvh' : 'calc(100dvh - 160px)',
            objectFit: 'contain',
            borderRadius: isLandscape ? 0 : 8,
            display: 'block',
            boxShadow: isLandscape ? 'none' : '0 8px 40px rgba(0,0,0,0.8)',
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
        background: 'rgba(30,10,0,0.88)',
        borderTop: '1px solid rgba(244,168,57,0.18)',
        gap: 12,
        flexShrink: 0,
      }}>
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          disabled={pageIdx === 0}
          aria-label="Previous page"
          style={{
            background: pageIdx === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(244,168,57,0.22)',
            border: '1px solid rgba(244,168,57,0.45)',
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
                  background: i === pageIdx ? ACCENT : i < pageIdx ? 'rgba(244,168,57,0.55)' : 'rgba(255,255,255,0.12)',
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
                background: 'rgba(244,168,57,0.18)',
                border: '1px solid rgba(244,168,57,0.45)',
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
            <button
              onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
              style={{
                background: 'rgba(123,94,167,0.18)',
                border: '1px solid rgba(123,94,167,0.45)',
                borderRadius: 20,
                padding: '6px 14px',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: 'pointer',
              }}
              aria-label="Toggle fullscreen"
            >{isFullscreen ? '✕ Exit Full Screen' : '⛶ Full Screen'}</button>
          </div>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          disabled={pageIdx === total - 1}
          aria-label="Next page"
          style={{
            background: pageIdx === total - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(244,168,57,0.22)',
            border: '1px solid rgba(244,168,57,0.45)',
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
