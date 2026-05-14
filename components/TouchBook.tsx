'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface TouchBookProps {
  title: string;
  cover: string;
  ageRange: string;
  backContent: string;
  amazonUrl: string;
  accentColor?: string;
  tag?: string;
}

// Pick the most natural-sounding voice available
function getBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Ranked preference: Apple/Google natural voices first
  const prefer = [
    'Samantha',       // iOS — very natural
    'Karen',          // iOS AU
    'Tessa',          // macOS
    'Moira',          // macOS IE
    'Google US English',
    'Google UK English Female',
    'Microsoft Aria',
    'Microsoft Jenny',
  ];
  for (const name of prefer) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  // Fall back to first en-US female, then any English
  return (
    voices.find(v => v.lang === 'en-US' && v.name.toLowerCase().includes('female')) ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en')) ||
    voices[0]
  );
}

export default function TouchBook({
  title,
  cover,
  ageRange,
  backContent,
  amazonUrl,
  accentColor = '#9B6FD0',
  tag,
}: TouchBookProps) {
  const [flipped, setFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speak = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(`${title}. ${backContent}`);
    utter.rate = 0.88;
    utter.pitch = 1.05;
    utter.volume = 1;
    // Try to assign voice — voices may not be loaded yet, so try after a short delay
    const tryAssignVoice = () => {
      const v = getBestVoice();
      if (v) utter.voice = v;
    };
    tryAssignVoice();
    if (!utter.voice) setTimeout(tryAssignVoice, 120);
    utter.onstart  = () => setSpeaking(true);
    utter.onend    = () => setSpeaking(false);
    utter.onerror  = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }, [title, backContent]);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  // Auto-read on flip; stop on flip-back
  useEffect(() => {
    if (flipped) {
      speak();
    } else {
      stopSpeaking();
    }
    return () => { if (!flipped) stopSpeaking(); };
  }, [flipped]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Desktop: hover to flip ──────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (!isTouchDevice) setFlipped(true);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice) setFlipped(false);
  };

  // ── Mobile: tap or swipe to flip ────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger flip if horizontal movement dominates (not a scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Swipe OR tap (both flip)
      setFlipped(f => !f);
      if (Math.abs(deltaX) > 50) {
        // It was a swipe — prevent the browser from also treating it as a click
        e.preventDefault();
      }
    } else if (Math.abs(deltaX) <= 10 && Math.abs(deltaY) <= 10) {
      // Pure tap (almost no movement)
      setFlipped(f => !f);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="book-card-3d select-none"
      style={{ height: 380, cursor: 'pointer' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`book-card-inner ${flipped ? 'book-card-flipped' : ''}`}>

        {/* ── FRONT ─────────────────────────────────────────────────── */}
        <div
          className="book-card-face book-card-front rounded-2xl overflow-hidden"
          style={{ boxShadow: `0 6px 28px ${accentColor}28` }}
        >
          <div
            className="relative h-64 flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}18` }}
          >
            <Image
              src={cover}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="280px"
            />

            {tag && (
              <div
                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {tag}
              </div>
            )}

            {ageRange && (
              <div
                className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: '#66D9A0', color: '#1C3A2E' }}
              >
                {ageRange}
              </div>
            )}

            <div
              className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold"
              style={{ color: accentColor, opacity: 0.5 }}
            >
              {isTouchDevice ? 'tap or swipe to open' : 'hover to open'}
            </div>
          </div>

          <div className="p-4 bg-white">
            <h3 className="font-bold text-base leading-snug" style={{ color: '#2D1B69' }}>
              {title}
            </h3>
          </div>
        </div>

        {/* ── BACK ──────────────────────────────────────────────────── */}
        <div
          className="book-card-face book-card-back rounded-2xl overflow-hidden flex flex-col"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 6px 28px ${accentColor}50`,
          }}
        >
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3
                className="font-bold text-xl text-white mb-3"
                style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
              >
                {title}
              </h3>
              {/* Speaking indicator */}
              {speaking && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(0,0,0,0.2)', borderRadius: '999px',
                  padding: '3px 10px', marginBottom: '10px',
                  fontSize: '0.72rem', color: 'rgba(255,255,255,0.9)',
                  fontWeight: 600, letterSpacing: '0.03em',
                }}>
                  <span style={{ animation: 'floatBob 0.6s ease-in-out infinite' }}>🔊</span>
                  Reading aloud…
                </div>
              )}
              <p className="text-sm leading-relaxed text-white opacity-90 line-clamp-6">
                {backContent}
              </p>
            </div>

            {/* Amazon stamp/badge */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#2D0D6B',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  transform: 'rotate(-2deg)',
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.35)',
                  border: '2px solid rgba(255,255,255,0.18)',
                  letterSpacing: '0.02em',
                }}
              >
                Read on Amazon →
              </a>
              {/* Replay / stop TTS button */}
              <button
                onClick={(e) => { e.stopPropagation(); speaking ? stopSpeaking() : speak(); }}
                title={speaking ? 'Stop reading' : 'Read aloud'}
                style={{
                  background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.35)',
                  borderRadius: '50%', width: '38px', height: '38px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0,
                  transition: 'background 0.15s',
                }}
                aria-label={speaking ? 'Stop reading' : 'Read aloud'}
              >
                {speaking ? '⏹' : '🔊'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
