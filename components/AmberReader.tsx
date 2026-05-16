'use client';

import { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ReaderPage {
  /** Narration text — null means no TTS for this page */
  text: string | null;
  /** Optional page image URL (if omitted, a storybook text card is shown) */
  img?: string;
  /** Optional pre-generated MP3 URL (tried before TTS fallback) */
  audioUrl?: string;
}

export interface AmberReaderProps {
  title: string;
  /** Emoji shown in header & start screen */
  emoji: string;
  /** Cover image for the start screen (e.g. book cover PNG/JPG) */
  coverImg: string;
  pages: ReaderPage[];
  /** CSS color for accent elements; defaults to amber gold */
  accentColor?: string;
  /** Secondary accent (buttons etc.); defaults to purple */
  buttonColor?: string;
  /** Background color; defaults to near-black */
  bgColor?: string;
  /** When true: shows musical note decoration and uses a slower TTS rate */
  isSingalong?: boolean;
  /** Note shown on start screen, e.g. "Sing along to the tune of Wheels on the Bus!" */
  startNote?: string;
}

const FLIP_MS = 600;
const DEFAULT_ACCENT = '#FFD700';
const DEFAULT_BUTTON = '#9B6FD0';
const DEFAULT_BG = '#0a0018';

// ── Particle sparkle overlay ──────────────────────────────────────────────────
function Sparkles({ color }: { color: string }) {
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
            background: i % 2 === 0 ? color : DEFAULT_BUTTON,
            opacity: 0,
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
            animation: `ar-sparkle ${1.4 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes ar-sparkle {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0); }
          50% { opacity: 0.7; transform: scale(1) translateY(-12px); }
        }
      `}</style>
    </div>
  );
}

// ── Musical note decoration for singalongs ────────────────────────────────────
function MusicalNotes({ color }: { color: string }) {
  const notes = ['♩', '♪', '♫', '♬', '♩', '♪'];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {notes.map((note, i) => (
        <div key={i} style={{
          position: 'absolute',
          color,
          fontSize: `${1 + (i % 2) * 0.6}rem`,
          opacity: 0,
          top: `${8 + i * 14}%`,
          left: i % 2 === 0 ? `${2 + i * 8}%` : 'auto',
          right: i % 2 !== 0 ? `${2 + (i - 1) * 6}%` : 'auto',
          animation: `ar-note ${2 + i * 0.4}s ease-in-out ${i * 0.35}s infinite`,
        }}>
          {note}
        </div>
      ))}
      <style>{`
        @keyframes ar-note {
          0%, 100% { opacity: 0; transform: translateY(0) rotate(0deg); }
          40% { opacity: 0.65; transform: translateY(-18px) rotate(${Math.random() > 0.5 ? 15 : -15}deg); }
        }
      `}</style>
    </div>
  );
}

export default function AmberReader({
  title,
  emoji,
  coverImg,
  pages,
  accentColor = DEFAULT_ACCENT,
  buttonColor = DEFAULT_BUTTON,
  bgColor = DEFAULT_BG,
  isSingalong = false,
  startNote,
}: AmberReaderProps) {
  const total = pages.length;

  const [started, setStarted] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [flipState, setFlipState] = useState<{
    dir: 'forward' | 'back';
    fromIdx: number;
    toIdx: number;
  } | null>(null);
  const [audioStatus, setAudioStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [autoPlay, setAutoPlay] = useState(true);
  const [mapOpen, setMapOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const touchX = useRef<number | null>(null);

  const current = pages[pageIdx];

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Audio ─────────────────────────────────────────────────────────────────
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (utteranceRef.current) {
      utteranceRef.current = null;
    }
    setAudioStatus('idle');
  }, []);

  const playTTS = useCallback((text: string, onEnd?: () => void) => {
    if (!synthRef.current) { onEnd?.(); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = isSingalong ? 0.72 : 0.88;
    utterance.pitch = isSingalong ? 1.15 : 1.05;
    utterance.volume = 1;

    const voices = synthRef.current.getVoices();
    const preferred = voices.find(
      (v) =>
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('female') ||
        (v.lang.startsWith('en') && v.name.toLowerCase().includes('google'))
    );
    if (preferred) utterance.voice = preferred;
    utteranceRef.current = utterance;
    utterance.onstart = () => setAudioStatus('playing');
    utterance.onend = () => { setAudioStatus('idle'); onEnd?.(); };
    utterance.onerror = () => { setAudioStatus('idle'); onEnd?.(); };
    synthRef.current.speak(utterance);
  }, [isSingalong]);

  const playPage = useCallback(async (idx: number, onEnd?: () => void) => {
    stopAudio();
    const page = pages[idx];
    if (!page.text) { onEnd?.(); return; }

    setAudioStatus('loading');

    // Try pre-generated MP3 first
    if (page.audioUrl) {
      const audio = new Audio(page.audioUrl);
      audioRef.current = audio;
      audio.onplaying = () => setAudioStatus('playing');
      audio.onended = () => { setAudioStatus('idle'); onEnd?.(); };
      audio.onerror = () => {
        // Fallback to TTS
        playTTS(page.text!, onEnd);
      };
      try {
        await audio.play();
        return;
      } catch {
        playTTS(page.text!, onEnd);
        return;
      }
    }

    // No MP3 → TTS directly
    setAudioStatus('loading');
    // Give voices time to load on first call
    const go = () => {
      setAudioStatus('idle');
      playTTS(page.text!, onEnd);
    };
    if (synthRef.current && synthRef.current.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.onvoiceschanged = null; go(); };
    } else {
      go();
    }
  }, [pages, stopAudio, playTTS]);

  // Auto-play on page change
  useEffect(() => {
    if (started && autoPlay && !flipState) {
      const timer = setTimeout(() => {
        playPage(pageIdx, () => {
          // After narration, wait a beat then auto-advance
          const advanceTimer = setTimeout(() => {
            if (pageIdx < total - 1) {
              setFlipState({ dir: 'forward', fromIdx: pageIdx, toIdx: pageIdx + 1 });
              setTimeout(() => {
                setPageIdx(idx => idx + 1);
                setFlipState(null);
              }, FLIP_MS);
            } else {
              setAutoPlay(false);
            }
          }, 1400);
          return () => clearTimeout(advanceTimer);
        });
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIdx, started, flipState]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (pageIdx >= total - 1 || flipState) return;
    stopAudio();
    const toIdx = pageIdx + 1;
    setFlipState({ dir: 'forward', fromIdx: pageIdx, toIdx });
    setTimeout(() => { setPageIdx(toIdx); setFlipState(null); }, FLIP_MS);
  }, [pageIdx, total, flipState, stopAudio]);

  const goPrev = useCallback(() => {
    if (pageIdx <= 0 || flipState) return;
    stopAudio();
    const toIdx = pageIdx - 1;
    setFlipState({ dir: 'back', fromIdx: pageIdx, toIdx });
    setTimeout(() => { setPageIdx(toIdx); setFlipState(null); }, FLIP_MS);
  }, [pageIdx, flipState, stopAudio]);

  const jumpTo = useCallback((idx: number) => {
    if (idx === pageIdx || flipState) return;
    stopAudio();
    const dir = idx > pageIdx ? 'forward' : 'back';
    setFlipState({ dir, fromIdx: pageIdx, toIdx: idx });
    setTimeout(() => { setPageIdx(idx); setFlipState(null); }, FLIP_MS);
  }, [pageIdx, flipState, stopAudio]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Swipe
  const handleTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) goNext();
    if (dx > 40) goPrev();
    touchX.current = null;
  };

  // ── Shared image style ─────────────────────────────────────────────────────
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

  // ── Text card (for pages without an image) ────────────────────────────────
  const renderTextCard = (text: string | null, showSparkle: boolean) => (
    <div
      style={{
        position: 'relative',
        maxWidth: 'min(560px, 90vw)',
        width: '100%',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)',
        border: `1px solid ${accentColor}33`,
        borderRadius: 16,
        padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 48px)',
        boxShadow: `0 0 60px ${accentColor}11, 0 8px 40px rgba(0,0,0,0.6)`,
        textAlign: 'center',
      }}
    >
      {/* Decorative corner accents */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <div
          key={corner}
          style={{
            position: 'absolute',
            width: 14,
            height: 14,
            borderColor: `${accentColor}66`,
            borderStyle: 'solid',
            borderWidth: 0,
            ...(corner === 'top-left' ? { top: 8, left: 8, borderTopWidth: 2, borderLeftWidth: 2 } : {}),
            ...(corner === 'top-right' ? { top: 8, right: 8, borderTopWidth: 2, borderRightWidth: 2 } : {}),
            ...(corner === 'bottom-left' ? { bottom: 8, left: 8, borderBottomWidth: 2, borderLeftWidth: 2 } : {}),
            ...(corner === 'bottom-right' ? { bottom: 8, right: 8, borderBottomWidth: 2, borderRightWidth: 2 } : {}),
          }}
        />
      ))}

      {isSingalong && (
        <div style={{ fontSize: '1.5rem', marginBottom: 12, opacity: 0.8 }}>♫</div>
      )}

      {text ? (
        <p
          style={{
            fontFamily: "'Concert One', cursive",
            fontSize: 'clamp(1.15rem, 3.5vw, 1.65rem)',
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.55,
            margin: 0,
            textShadow: `0 0 30px ${accentColor}44`,
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </p>
      ) : (
        <div style={{ color: `${accentColor}44`, fontSize: '2rem' }}>{emoji}</div>
      )}

      {isSingalong && (
        <div style={{ fontSize: '1.2rem', marginTop: 12, opacity: 0.6 }}>♬</div>
      )}

      {showSparkle && (
        isSingalong
          ? <MusicalNotes color={accentColor} />
          : <Sparkles color={accentColor} />
      )}
    </div>
  );

  // ── Render page content (image or text) ───────────────────────────────────
  const renderPageContent = (idx: number, forceShowSparkle = false) => {
    const page = pages[idx];
    if (page.img) {
      return (
        <div style={{ position: 'relative' }}>
          <Image
            src={page.img}
            alt={`Page ${idx + 1} of ${title}`}
            width={1800}
            height={900}
            priority={idx < 3}
            style={imgStyle}
          />
          {forceShowSparkle && (isSingalong ? <MusicalNotes color={accentColor} /> : <Sparkles color={accentColor} />)}
        </div>
      );
    }
    return renderTextCard(page.text, forceShowSparkle);
  };

  // ── START SCREEN ──────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: `linear-gradient(160deg, ${bgColor} 0%, ${adjustColor(bgColor, 30)} 50%, ${adjustColor(bgColor, 15)} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Stars */}
        {[...Array(22)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            borderRadius: '50%',
            background: 'white',
            opacity: 0.3 + (i % 5) * 0.1,
            top: `${(i * 17 + 5) % 90}%`,
            left: `${(i * 23 + 3) % 95}%`,
            animation: `ar-twinkle ${2 + (i % 3)}s ease-in-out ${i * 0.25}s infinite`,
          }} />
        ))}
        <style>{`
          @keyframes ar-twinkle { 0%,100%{opacity:0.15} 50%{opacity:0.85} }
          @keyframes ar-pageTurnForward { 0%{transform:perspective(1800px) rotateY(0deg)} 100%{transform:perspective(1800px) rotateY(-180deg)} }
          @keyframes ar-pageTurnBack    { 0%{transform:perspective(1800px) rotateY(0deg)} 100%{transform:perspective(1800px) rotateY(180deg)} }
          @keyframes ar-pageShadow { 0%{opacity:0} 40%{opacity:1} 80%{opacity:0.6} 100%{opacity:0} }
        `}</style>

        {/* Book cover */}
        <div style={{
          width: 200, height: 200, borderRadius: 16,
          overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          marginBottom: 32, border: `3px solid ${accentColor}66`,
        }}>
          <Image
            src={coverImg}
            alt={title}
            width={200}
            height={200}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>

        <h1 style={{
          fontFamily: "'Concert One', cursive",
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          color: accentColor,
          margin: '0 0 8px',
          textShadow: `0 0 20px ${accentColor}55`,
        }}>
          {title}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', margin: '0 0 8px' }}>
          by Family Fables
        </p>

        {startNote && (
          <div style={{
            background: `${accentColor}1a`,
            border: `1px solid ${accentColor}44`,
            borderRadius: 12,
            padding: '8px 16px',
            margin: '0 0 20px',
            color: accentColor,
            fontSize: '0.85rem',
            maxWidth: 320,
          }}>
            {startNote}
          </div>
        )}

        <button
          onClick={() => setStarted(true)}
          style={{
            background: `linear-gradient(135deg, ${buttonColor}, ${adjustColor(buttonColor, -20)})`,
            color: 'white',
            border: `2px solid ${accentColor}66`,
            borderRadius: 50,
            padding: '16px 40px',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: `0 6px 24px ${buttonColor}55`,
            letterSpacing: '0.03em',
            marginBottom: 12,
            fontFamily: "'Concert One', cursive",
          }}
        >
          {emoji} Read It To Me!
        </button>

        <label style={{
          display: 'flex', alignItems: 'center', gap: 8,
          color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', cursor: 'pointer',
          marginBottom: 4,
        }}>
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={e => setAutoPlay(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer', accentColor }}
          />
          Read aloud automatically
        </label>

        <button
          onClick={() => { setStarted(true); setAutoPlay(false); }}
          style={{
            background: 'transparent',
            border: `1px solid ${accentColor}33`,
            borderRadius: 50,
            padding: '10px 28px',
            fontSize: '0.85rem',
            color: `${accentColor}99`,
            cursor: 'pointer',
            marginTop: 8,
            marginBottom: 16,
            fontFamily: "'Concert One', cursive",
          }}
        >
          📖 Browse Silently
        </button>

        <Link href="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', textDecoration: 'none' }}>
          ← Back to Family Fables
        </Link>
      </div>
    );
  }

  // ── READER ────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: bgColor,
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        overflow: 'hidden',
        position: 'relative',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Map button ─────────────────────────────────────────────────────── */}
      <button
        onClick={(e) => { e.stopPropagation(); setMapOpen(true); }}
        aria-label="Open adventure map"
        style={{
          position: 'fixed', top: 52, right: 12,
          background: 'rgba(0,0,0,0.5)',
          border: `1px solid ${accentColor}33`,
          borderRadius: '50%',
          width: 38, height: 38,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', cursor: 'pointer', zIndex: 20,
        }}
      >
        🗺️
      </button>

      {/* ── Map overlay ────────────────────────────────────────────────────── */}
      {mapOpen && (
        <>
          <div
            onClick={() => setMapOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 30 }}
          />
          <div
            role="dialog" aria-modal="true" aria-label="Adventure Map"
            style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              background: '#1a0a2e',
              border: `1px solid ${accentColor}44`,
              borderRadius: 16, padding: 24,
              width: 'min(360px, 90vw)',
              maxHeight: '80vh', overflowY: 'auto',
              zIndex: 40,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontFamily: "'Concert One', cursive", color: accentColor, margin: 0, fontSize: '1.1rem' }}>
                🗺️ Adventure Map
              </h2>
              <button
                onClick={() => setMapOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer', lineHeight: 1 }}
                aria-label="Close map"
              >✕</button>
            </div>
            {[
              { id: 'dream-ideas',         emoji: '🌙', name: 'Dream Ideas Land' },
              { id: 'amber-dragon-keeper', emoji: '🐉', name: 'Dragon Mountain' },
              { id: 'poo-poo-face',        emoji: '😂', name: 'Poo Poo Face Town' },
              { id: 'finding-hampton',     emoji: '🎈', name: "Hampton's Quest Meadow" },
              { id: 'gilroys-gobble',      emoji: '🦃', name: "Gilroy's Harvest Forest" },
              { id: 'lumpiest-pumpkin',    emoji: '🎃', name: 'The Lumpiest Pumpkin Patch' },
              { id: 'ollie-come-home',     emoji: '🐱', name: "Ollie's Cozy Corner" },
              { id: 'shut-in-button',      emoji: '👆', name: 'Shut-In Button Land' },
              { id: 'what-a-doodle-do',    emoji: '🐓', name: "Doodle-Do's Barnyard" },
              { id: 'one-tom-turkey',      emoji: '🦃', name: "Tom Turkey's Harvest Parade" },
              { id: 'frog-a-dog',          emoji: '🐸', name: "Bailey's Frog Dream" },
              { id: 'brian-the-ghost',     emoji: '👻', name: "Brian's Haunted House" },
            ].map((land) => (
              <a
                key={land.id}
                href={`/#${land.id}`}
                onClick={() => setMapOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.9rem',
                  fontFamily: "'Catamaran', sans-serif",
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  transition: 'background 0.15s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: '1.1rem' }}>{land.emoji}</span>
                <span style={{ flex: 1 }}>{land.name}</span>
                <span style={{ color: `${accentColor}66`, fontSize: '0.8rem' }}>→</span>
              </a>
            ))}
          </div>
        </>
      )}

      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${accentColor}1a`,
        zIndex: 10, flexShrink: 0,
      }}>
        <Link
          href="/read"
          style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', textDecoration: 'none', padding: '4px 8px' }}
        >
          ← Stories
        </Link>
        <span style={{
          color: `${accentColor}bb`,
          fontSize: '0.78rem',
          fontFamily: "'Concert One', cursive",
          letterSpacing: '0.05em',
        }}>
          {emoji} {title}
        </span>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.78rem', minWidth: 50, textAlign: 'right' }}>
          {pageIdx + 1} / {total}
        </span>
      </div>

      {/* ── Page area ──────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          padding: '8px',
          minHeight: 0,
          overflow: 'hidden',
        }}
        onClick={goNext}
      >
        {flipState ? (
          // ── Flip animation ───────────────────────────────────────────────
          <div style={{ position: 'relative', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {/* Incoming page (behind) */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              {renderPageContent(flipState.toIdx)}
            </div>

            {/* Outgoing page (folding away) */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transformStyle: 'preserve-3d',
              transformOrigin: flipState.dir === 'forward' ? 'left center' : 'right center',
              animation: flipState.dir === 'forward'
                ? `ar-pageTurnForward ${FLIP_MS}ms cubic-bezier(0.645,0.045,0.355,1.000) forwards`
                : `ar-pageTurnBack ${FLIP_MS}ms cubic-bezier(0.645,0.045,0.355,1.000) forwards`,
            }}>
              {renderPageContent(flipState.fromIdx)}
              {/* Shadow overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 8,
                background: flipState.dir === 'forward'
                  ? 'linear-gradient(to left, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)'
                  : 'linear-gradient(to right, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.55) 100%)',
                animation: `ar-pageShadow ${FLIP_MS}ms ease-in forwards`,
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        ) : (
          // ── Static page ──────────────────────────────────────────────────
          renderPageContent(pageIdx, audioStatus === 'playing')
        )}
      </div>

      {/* ── Bottom controls ────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.7)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        gap: 12, flexShrink: 0,
      }}>
        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          disabled={pageIdx === 0}
          aria-label="Previous page"
          style={{
            background: pageIdx === 0 ? 'rgba(255,255,255,0.04)' : `${buttonColor}44`,
            border: `1px solid ${buttonColor}55`,
            borderRadius: 40, width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: pageIdx === 0 ? 'rgba(255,255,255,0.12)' : 'white',
            fontSize: '1.2rem',
            cursor: pageIdx === 0 ? 'default' : 'pointer', flexShrink: 0,
          }}
        >◀</button>

        {/* Center: dots + audio */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); jumpTo(i); }}
                aria-label={`Go to page ${i + 1}`}
                style={{
                  width: i === pageIdx ? 18 : 8, height: 8, borderRadius: 4,
                  background: i === pageIdx ? accentColor : i < pageIdx ? `${buttonColor}88` : 'rgba(255,255,255,0.12)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0, flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Audio row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (audioStatus !== 'idle') { stopAudio(); } else { playPage(pageIdx); }
              }}
              style={{
                background: `${buttonColor}2a`,
                border: `1px solid ${buttonColor}55`,
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
              onClick={(e) => {
                e.stopPropagation();
                if (autoPlay) { setAutoPlay(false); stopAudio(); } else { setAutoPlay(true); }
              }}
              title={autoPlay ? 'Auto-play on' : 'Auto-play off'}
              style={{
                background: autoPlay ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${autoPlay ? accentColor : 'rgba(255,255,255,0.15)'}44`,
                borderRadius: 20,
                padding: '4px 10px',
                color: autoPlay ? accentColor : 'rgba(255,255,255,0.3)',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              {autoPlay ? '▶ Auto' : '⏸ Manual'}
            </button>
          </div>
        </div>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          disabled={pageIdx === total - 1}
          aria-label="Next page"
          style={{
            background: pageIdx === total - 1 ? 'rgba(255,255,255,0.04)' : `${buttonColor}44`,
            border: `1px solid ${buttonColor}55`,
            borderRadius: 40, width: 44, height: 44,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: pageIdx === total - 1 ? 'rgba(255,255,255,0.12)' : 'white',
            fontSize: '1.2rem',
            cursor: pageIdx === total - 1 ? 'default' : 'pointer', flexShrink: 0,
          }}
        >▶</button>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
/** Slightly lighten or darken a hex color. Amount positive = lighter, negative = darker. */
function adjustColor(hex: string, amount: number): string {
  try {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
    const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } catch {
    return hex;
  }
}
