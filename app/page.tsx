'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { books, AMAZON_STORE_URL } from '@/lib/books';
import BedtimeToggle from '@/components/BedtimeToggle';
import TouchBook from '@/components/TouchBook';
import TiltNarwhal from '@/components/TiltNarwhal';
import AmberGame from '@/components/AmberGame';
import PooFaceQuiz from '@/components/PooFaceQuiz';
import PooFaceCamera from '@/components/PooFaceCamera';

// ── Fonts helpers ──────────────────────────────────────────────────────────
const FF  = "'Concert One', var(--font-concert-one), cursive";
const CAT = "'Catamaran', var(--font-catamaran), sans-serif";
const OS  = "'Open Sans', sans-serif";

// ── SparkleTrail ───────────────────────────────────────────────────────────
type Spark = { id: number; x: number; y: number; rot: number; size: number; color: string };
const SPARK_COLORS = ['#009380','#d9b7e5','#78087c','#dcf9f3','#006e59','#a8e8dc'];

function SparkleTrail() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  useEffect(() => {
    let lastTime = 0;
    const add = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastTime < 55) return;
      lastTime = now;
      const s: Spark = {
        id: now + Math.random(), x, y,
        rot: Math.random() * 360,
        size: 10 + Math.random() * 14,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      };
      setSparks(prev => [...prev.slice(-14), s]);
      setTimeout(() => setSparks(prev => prev.filter(p => p.id !== s.id)), 650);
    };
    const onMove  = (e: MouseEvent)  => add(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent)  => { for (const t of Array.from(e.touches)) add(t.clientX, t.clientY); };
    window.addEventListener('mousemove',  onMove,  { passive: true });
    window.addEventListener('touchmove',  onTouch, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('touchmove',  onTouch);
      window.removeEventListener('touchstart', onTouch);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {sparks.map(s => (
        <div key={s.id} className="absolute sparkle-burst"
          style={{ left: s.x - s.size / 2, top: s.y - s.size / 2 }}>
          <svg width={s.size} height={s.size} viewBox="0 0 20 20" style={{ transform: `rotate(${s.rot}deg)` }}>
            <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill={s.color}/>
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── Sticky buy button ──────────────────────────────────────────────────────
function StickyBuyButton() {
  return (
    <Link href="/books" style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      background: '#ff9c1a', color: '#ffffff',
      padding: '12px 20px', borderRadius: '999px',
      fontFamily: FF, fontSize: '0.95rem',
      textDecoration: 'none',
      boxShadow: '0 4px 20px rgba(255,156,26,0.5)',
      display: 'flex', alignItems: 'center', gap: '6px',
      minHeight: '52px', minWidth: '52px',
      whiteSpace: 'nowrap',
    }}>
      📚 Books
    </Link>
  );
}

// ── Cloud SVG ──────────────────────────────────────────────────────────────
function Cloud({ style }: { style: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 80" fill="white" style={{ ...style, position: 'absolute' }}>
      <ellipse cx="100" cy="50" rx="90" ry="30" />
      <ellipse cx="70"  cy="40" rx="50" ry="28" />
      <ellipse cx="130" cy="38" rx="45" ry="25" />
      <ellipse cx="100" cy="30" rx="40" ry="26" />
    </svg>
  );
}

// ── Wave zone divider ──────────────────────────────────────────────────────
function WaveDivider({ fill, flip }: { fill: string; flip?: boolean }) {
  return (
    <div style={{
      position: 'absolute', bottom: flip ? undefined : 0, top: flip ? 0 : undefined,
      left: 0, right: 0, lineHeight: 0, pointerEvents: 'none',
      transform: flip ? 'scaleY(-1)' : undefined,
    }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
        <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ── ZONE 1: THE SKY ────────────────────────────────────────────────────────
function ZoneSky() {
  const [pulsed, setPulsed] = useState<number | null>(null);

  const handleCloud = (i: number) => {
    setPulsed(i);
    setTimeout(() => setPulsed(null), 400);
  };

  const clouds = [
    { top: '8%',  left: '5%',  w: 180, dur: '20s', dir: 1  },
    { top: '18%', right: '8%', w: 160, dur: '28s', dir: -1 },
    { top: '35%', left: '20%', w: 140, dur: '35s', dir: 1  },
    { top: '12%', left: '55%', w: 200, dur: '24s', dir: -1 },
    { top: '42%', right: '3%', w: 120, dur: '32s', dir: 1  },
  ];

  return (
    <section style={{
      background: '#dcf9f3', minHeight: '100svh', position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingBottom: '100px', paddingTop: '48px',
    }}>
      {/* Clouds */}
      {clouds.map((c, i) => (
        <div
          key={i}
          role="button" tabIndex={0} aria-label={`Cloud ${i + 1}`}
          onClick={() => handleCloud(i)}
          onKeyDown={e => e.key === 'Enter' && handleCloud(i)}
          style={{
            position: 'absolute',
            top: c.top, left: (c as {left?: string}).left, right: (c as {right?: string}).right,
            width: c.w, height: c.w * 0.4,
            animation: `driftCloud ${c.dur} ease-in-out infinite ${c.dir === -1 ? 'alternate-reverse' : 'alternate'}`,
            transform: pulsed === i ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.2s ease',
            cursor: 'pointer', outline: 'none',
            filter: 'drop-shadow(0 4px 12px rgba(0,147,128,0.15))',
          }}
        >
          <Cloud style={{ width: '100%', height: '100%', position: 'relative', opacity: 0.88 }} />
        </div>
      ))}

      {/* Narwhal float wrapper */}
      <div style={{ animation: 'floatBob 4s ease-in-out infinite', marginBottom: '-12px', position: 'relative', zIndex: 3 }}>
        <TiltNarwhal size={300} />
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: FF,
        fontSize: 'clamp(3rem, 12vw, 8rem)',
        color: '#ffffff',
        textShadow: '3px 3px 0 #009380',
        lineHeight: 0.95, marginBottom: '12px',
        position: 'relative', zIndex: 3,
        animation: 'fadeSlideUp 0.8s ease-out both',
        textAlign: 'center',
      }}>
        Family Fables
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: CAT, fontWeight: 800,
        fontSize: 'clamp(1rem, 3.5vw, 1.6rem)',
        color: '#009380', marginBottom: '48px',
        position: 'relative', zIndex: 3,
        animation: 'fadeSlideUp 0.9s ease-out 0.15s both',
        textAlign: 'center',
      }}>
        A Storybook World
      </p>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '96px', left: '50%', transform: 'translateX(-50%)',
        fontSize: '2rem', animation: 'floatBob 1.6s ease-in-out infinite',
        color: '#009380', pointerEvents: 'none', zIndex: 3,
      }} aria-hidden>↓</div>

      <WaveDivider fill="#d9b7e5" />
    </section>
  );
}

// ── ZONE 2: AMBER'S MOUNTAIN ───────────────────────────────────────────────
function ZoneAmberMountain() {
  const [fireActive, setFireActive] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const handleAmberTap = () => {
    setFireActive(true);
    setTimeout(() => setFireActive(false), 700);
  };

  const crystals = [
    { left: '8%',  top: '38%', delay: '0s',   size: 24 },
    { left: '22%', top: '28%', delay: '0.4s',  size: 18 },
    { left: '40%', top: '35%', delay: '0.8s',  size: 22 },
    { left: '60%', top: '30%', delay: '0.2s',  size: 20 },
    { left: '78%', top: '32%', delay: '1.1s',  size: 16 },
    { left: '90%', top: '40%', delay: '0.6s',  size: 26 },
  ];

  return (
    <section style={{
      background: 'linear-gradient(180deg, #d9b7e5 0%, #c9a8d8 100%)',
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      paddingTop: '80px', paddingBottom: '100px',
    }}>
      {/* Crystals */}
      {crystals.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', left: c.left, top: c.top,
          animation: `crystalPulse 2.4s ease-in-out infinite ${c.delay}`,
          pointerEvents: 'none', fontSize: c.size,
        }} aria-hidden>💎</div>
      ))}

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: FF, fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          color: '#3a0245', textAlign: 'center', marginBottom: '8px',
        }}>
          Amber&apos;s Mountain 🏔️
        </h2>
        <p style={{
          fontFamily: CAT, fontWeight: 800, textAlign: 'center',
          color: '#78087c', fontSize: '1.1rem', marginBottom: '48px',
        }}>
          She thought she was just a regular kid…
        </p>

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Amber character */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div
              onClick={handleAmberTap}
              onTouchStart={handleAmberTap}
              role="button" tabIndex={0} aria-label="Tap Amber"
              onKeyDown={e => e.key === 'Enter' && handleAmberTap()}
              style={{
                cursor: 'pointer', outline: 'none',
                filter: fireActive ? 'drop-shadow(0 0 24px #ff9c1a) brightness(1.15)' : 'none',
                transform: fireActive ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.2s ease',
                animation: 'floatBob 5s ease-in-out infinite',
              }}
            >
              <Image
                src="/images/originals/Amber-383-height.png"
                alt="Amber the Dragon Keeper"
                width={280} height={383}
                style={{ width: 'clamp(180px, 28vw, 280px)', height: 'auto', display: 'block' }}
              />
            </div>
            <p style={{ fontFamily: FF, color: '#78087c', fontSize: '0.85rem' }}>👆 Tap Amber!</p>
          </div>

          {/* Book object */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
            {/* Tappable book tome */}
            <div
              onClick={() => setBookOpen(o => !o)}
              onTouchStart={() => setBookOpen(o => !o)}
              role="button" tabIndex={0} aria-label="Open Amber's book"
              onKeyDown={e => e.key === 'Enter' && setBookOpen(o => !o)}
              style={{
                background: '#009380', borderRadius: '16px', padding: '24px 28px',
                cursor: 'pointer', outline: 'none',
                animation: 'floatBob 4s ease-in-out infinite 0.5s',
                boxShadow: '0 8px 32px rgba(0,90,74,0.3)',
                border: '3px solid #005a4a',
              }}
            >
              <div style={{ fontFamily: FF, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#ffffff', marginBottom: '8px' }}>
                📖 Amber the Dragon Keeper
              </div>
              <p style={{ fontFamily: OS, color: '#dcf9f3', fontSize: '0.9rem' }}>
                Tap to open the book!
              </p>
            </div>

            {bookOpen && (
              <div style={{
                background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '24px',
                boxShadow: '0 8px 40px rgba(120,8,124,0.2)',
                animation: 'popIn 0.3s ease-out both',
              }}>
                <h3 style={{ fontFamily: FF, color: '#005a4a', fontSize: '1.3rem', marginBottom: '10px' }}>
                  Amber the Dragon Keeper
                </h3>
                <p style={{ fontFamily: OS, fontSize: '0.9rem', color: '#1a3a30', lineHeight: 1.7, marginBottom: '16px' }}>
                  She thought she was just a regular kid — until the dragons chose her.
                  Now she must protect a secret world of magical creatures.
                </p>
                <a
                  href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'inline-block', background: '#ff9c1a', color: '#fff',
                    padding: '10px 24px', borderRadius: '8px', textDecoration: 'none',
                    fontFamily: FF, fontSize: '1rem',
                  }}
                >
                  Get on Amazon →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Amber Game */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: FF, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#3a0245', marginBottom: '8px' }}>
            Play Crystal Rush 🐉
          </h3>
          <p style={{ fontFamily: OS, color: '#5a0660', marginBottom: '28px', fontSize: '0.95rem' }}>
            Catch the falling crystals — Amber needs your help!
          </p>
          <AmberGame />
        </div>
      </div>

      {/* SVG Mountain at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none', zIndex: 1 }}>
        <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '200px' }}>
          <path d="M0,200 L0,160 L180,60 L360,140 L540,40 L720,130 L900,50 L1100,120 L1260,70 L1440,130 L1440,200 Z"
            fill="#a070c0" opacity="0.7"/>
          <path d="M0,200 L0,180 L200,100 L400,160 L620,80 L800,150 L1020,90 L1200,140 L1440,100 L1440,200 Z"
            fill="#78087c" opacity="0.85"/>
        </svg>
      </div>

      <WaveDivider fill="#78087c" />
    </section>
  );
}

// ── ZONE 3: THE DRAGON'S TOWN ──────────────────────────────────────────────
function ZoneDragonTown() {
  const [dragonEmoji, setDragonEmoji] = useState<string | null>(null);
  const [emojiKey, setEmojiKey] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const FACES = ['😤','😂','😳','😬','🤨','😈','🤩','😭','🤔','🥹'];

  const tapDragon = () => {
    const f = FACES[Math.floor(Math.random() * FACES.length)];
    setDragonEmoji(f);
    setEmojiKey(k => k + 1);
    setTimeout(() => setDragonEmoji(null), 1500);
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #a070c0 0%, #78087c 100%)',
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      paddingTop: '80px', paddingBottom: '100px',
    }}>
      {/* SVG silly buildings */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '220px' }}>
          {/* Building 1 */}
          <rect x="40"  y="120" width="140" height="100" fill="#e8d4f0" rx="4"/>
          <polygon points="40,120 110,60 180,120" fill="#d4c0e8"/>
          <circle cx="90"  cy="155" r="16" fill="#c9a8d8"/>
          <rect x="130" cy="145" width="24" height="30" rx="4" y="145" fill="#c9a8d8"/>
          {/* Building 2 */}
          <rect x="250" y="80"  width="110" height="140" fill="#f0e4f8" rx="4"/>
          <polygon points="250,80 305,30 360,80" fill="#e2ccf0"/>
          <circle cx="285" cy="120" r="14" fill="#d4b8e8"/>
          <circle cx="330" cy="140" r="12" fill="#d4b8e8"/>
          {/* Building 3 */}
          <rect x="900" y="100" width="130" height="120" fill="#e8d4f0" rx="4"/>
          <polygon points="900,100 965,48 1030,100" fill="#d4c0e8"/>
          <rect x="920" y="135" width="22" height="28" rx="3" fill="#c9a8d8"/>
          <circle cx="1005" cy="150" r="15" fill="#c9a8d8"/>
          {/* Building 4 */}
          <rect x="1150" y="90" width="200" height="130" fill="#f0e4f8" rx="4"/>
          <polygon points="1150,90 1250,35 1350,90" fill="#e2ccf0"/>
          <circle cx="1200" cy="130" r="18" fill="#d4b8e8"/>
          <circle cx="1280" cy="145" r="14" fill="#d4b8e8"/>
          <rect x="1300" y="160" width="26" height="32" rx="3" fill="#c9a8d8"/>
        </svg>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: FF, fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#ffffff', textAlign: 'center', marginBottom: '48px',
          textShadow: '2px 2px 0 #5a0660',
        }}>
          The Dragon&apos;s Town 🏙️
        </h2>

        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Poo Poo Dragon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              {dragonEmoji && (
                <div key={emojiKey} style={{
                  position: 'absolute', top: '-70px', left: '50%', transform: 'translateX(-50%)',
                  fontSize: '3rem', zIndex: 10, pointerEvents: 'none',
                  animation: 'popIn 0.3s ease-out both',
                }}>
                  <div style={{
                    background: 'white', borderRadius: '50%', padding: '8px 12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}>{dragonEmoji}</div>
                </div>
              )}
              <div
                onClick={tapDragon} onTouchStart={tapDragon}
                role="button" tabIndex={0} aria-label="Tap the dragon"
                onKeyDown={e => e.key === 'Enter' && tapDragon()}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                <Image
                  src="/images/originals/poo-poo-dragon-flipped.png"
                  alt="Poo Poo Dragon" width={240} height={240}
                  style={{ width: 'clamp(160px, 24vw, 240px)', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
            <p style={{ fontFamily: FF, color: '#f0d8fa', fontSize: '0.85rem' }}>👆 Tap the dragon!</p>
          </div>

          {/* Mirror / PooFaceCamera trigger */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '380px' }}>
            <div
              onClick={() => setCameraOpen(true)}
              onTouchStart={() => setCameraOpen(true)}
              role="button" tabIndex={0} aria-label="Make your face"
              onKeyDown={e => e.key === 'Enter' && setCameraOpen(true)}
              style={{
                cursor: 'pointer', outline: 'none',
                border: '6px solid #ff9c1a',
                borderRadius: '50%',
                width: 'clamp(140px, 22vw, 200px)',
                height: 'clamp(140px, 22vw, 200px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '8px',
                background: 'rgba(255,255,255,0.12)',
                boxShadow: '0 0 0 4px rgba(255,156,26,0.3), inset 0 0 40px rgba(255,156,26,0.1)',
                margin: '0 auto',
                animation: 'floatBob 3.5s ease-in-out infinite 0.3s',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>📸</span>
              <span style={{ fontFamily: FF, color: '#fff', fontSize: '0.85rem', textAlign: 'center', lineHeight: 1.2 }}>
                Make Your Face!
              </span>
            </div>

            {/* Poo Poo Face book */}
            <div style={{
              background: 'rgba(255,255,255,0.15)', borderRadius: '16px', padding: '20px',
              textAlign: 'center',
            }}>
              <Image
                src="/images/wp/whats-your-poopoo-face-400.png"
                alt="What's Your Poo Poo Face" width={160} height={160}
                style={{ width: '120px', height: 'auto', borderRadius: '12px', margin: '0 auto 12px', display: 'block' }}
              />
              <h3 style={{ fontFamily: FF, color: '#fff', fontSize: '1rem', marginBottom: '8px' }}>
                What&apos;s Your Poo Poo Face?
              </h3>
              <a
                href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block', background: '#ff9c1a', color: '#fff',
                  padding: '8px 20px', borderRadius: '8px', textDecoration: 'none',
                  fontFamily: FF, fontSize: '0.9rem',
                }}
              >
                Get on Amazon →
              </a>
            </div>
          </div>

          {/* Poo Face Quiz */}
          <div style={{ flex: '1 1 280px', maxWidth: '500px' }}>
            <h3 style={{ fontFamily: FF, color: '#f0d8fa', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', marginBottom: '16px', textAlign: 'center' }}>
              What&apos;s Your Poo Poo Face? 🤣
            </h3>
            <PooFaceQuiz />
          </div>
        </div>
      </div>

      {/* Camera modal */}
      {cameraOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '540px', padding: '16px' }}>
            <button
              onClick={() => setCameraOpen(false)}
              style={{
                position: 'absolute', top: 0, right: 8,
                background: '#ff9c1a', color: '#fff', border: 'none',
                borderRadius: '50%', width: 44, height: 44,
                fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Close camera"
            >✕</button>
            <PooFaceCamera />
          </div>
        </div>
      )}

      <WaveDivider fill="#fff3e0" />
    </section>
  );
}

// ── ZONE 4: UNDERGROUND BOOKSHELF ──────────────────────────────────────────
type MoodKey = 'all' | 'silly' | 'bedtime' | 'adventure' | 'heartfelt';
const MOODS: { key: MoodKey; emoji: string; label: string }[] = [
  { key: 'all',       emoji: '✨', label: 'All'       },
  { key: 'silly',     emoji: '😂', label: 'Silly'     },
  { key: 'bedtime',   emoji: '🌙', label: 'Bedtime'   },
  { key: 'adventure', emoji: '🐉', label: 'Adventure' },
  { key: 'heartfelt', emoji: '🥹', label: 'Heartfelt' },
];

function bookMatchesMood(book: typeof books[number], mood: MoodKey): boolean {
  if (mood === 'all') return true;
  if (mood === 'silly')     return book.moods?.some(m => ['silly','read-aloud','spooky'].includes(m)) ?? false;
  if (mood === 'bedtime')   return book.moods?.includes('bedtime') ?? false;
  if (mood === 'adventure') return ['amber-dragon-keeper','ollie-come-home','frog-a-dog','finding-hampton'].includes(book.id);
  if (mood === 'heartfelt') return book.moods?.includes('feel-good') ?? false;
  return false;
}

function ZoneBookshelf() {
  const [activeMood, setActiveMood] = useState<MoodKey>('all');
  const filtered = books.filter(b => bookMatchesMood(b, activeMood));

  return (
    <section style={{
      background: '#fff3e0', position: 'relative',
      minHeight: '80vh', overflow: 'hidden',
      paddingTop: '80px', paddingBottom: '100px',
    }}>
      {/* Stalactite cave ceiling */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100px' }}>
          <path d="M0,0 L0,30 L60,90 L120,20 L200,80 L280,15 L360,75 L440,25 L520,70 L600,10 L680,65 L760,20 L840,80 L920,18 L1000,72 L1080,22 L1160,68 L1240,16 L1320,74 L1380,28 L1440,50 L1440,0 Z"
            fill="#fff3e0" stroke="#e8c870" strokeWidth="1" opacity="0.9"/>
          <path d="M0,0 L0,20 L80,70 L160,12 L240,68 L320,8 L420,60 L500,16 L580,72 L660,14 L740,58 L820,10 L900,64 L980,12 L1060,60 L1140,8 L1220,66 L1300,18 L1400,60 L1440,30 L1440,0 Z"
            fill="#ffe8b0" opacity="0.6"/>
        </svg>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <h2 style={{
          fontFamily: FF, fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#005a4a', textAlign: 'center', marginBottom: '8px',
        }}>
          The Underground Bookshelf ��
        </h2>
        <p style={{
          fontFamily: CAT, fontWeight: 800, textAlign: 'center',
          color: '#78087c', fontSize: '1rem', marginBottom: '32px',
        }}>
          What kind of book night are you having?
        </p>

        {/* Mood filter pills */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          {MOODS.map(m => (
            <button
              key={m.key}
              onClick={() => setActiveMood(m.key)}
              style={{
                padding: '10px 22px', borderRadius: '999px', cursor: 'pointer',
                border: `2px solid ${activeMood === m.key ? '#009380' : 'rgba(0,147,128,0.4)'}`,
                background: activeMood === m.key ? '#009380' : 'white',
                color: activeMood === m.key ? 'white' : '#009380',
                fontFamily: FF, fontSize: '0.95rem',
                transition: 'all 0.2s ease', minHeight: '48px',
              }}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {/* Horizontal scrollable book shelf */}
        <div style={{
          display: 'flex', gap: '24px', overflowX: 'auto',
          scrollSnapType: 'x mandatory', paddingBottom: '20px',
          WebkitOverflowScrolling: 'touch' as 'touch',
          msOverflowStyle: 'none',
        }}>
          {filtered.map(book => (
            <div key={book.id} style={{
              flex: '0 0 260px', scrollSnapAlign: 'start',
              animation: 'mood-book-appear 0.3s ease',
            }}>
              <TouchBook
                title={book.title}
                cover={book.image}
                ageRange={book.ageRange}
                backContent={book.hook}
                amazonUrl={AMAZON_STORE_URL}
                accentColor={book.accentColor}
                tag={book.tag}
              />
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ fontFamily: FF, color: '#78087c', fontSize: '1.2rem', padding: '48px', textAlign: 'center', width: '100%' }}>
              No books in that mood yet — check back soon! 🌟
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="/books" style={{
            display: 'inline-block', background: '#ff9c1a', color: '#fff',
            padding: '14px 40px', borderRadius: '8px', textDecoration: 'none',
            fontFamily: FF, fontSize: '1rem', boxShadow: '0 4px 16px rgba(255,156,26,0.4)',
          }}>
            See All Books →
          </a>
        </div>
      </div>

      <WaveDivider fill="#dcf9f3" />
    </section>
  );
}

// ── ZONE 5: COLORING MEADOW ────────────────────────────────────────────────
const COLORING_PAGES = [
  { src: '/coloring-pages/amber-dragon-keeper/page04-300dpi.png', rotate: '-3deg', label: 'Amber & Friends' },
  { src: '/coloring-pages/amber-dragon-keeper/page06-300dpi.png', rotate:  '2deg', label: 'Dragon World'   },
  { src: '/coloring-pages/amber-dragon-keeper/page08-300dpi.png', rotate: '-1deg', label: 'Crystal Valley' },
];

function ZoneColoringMeadow() {
  return (
    <section style={{
      background: 'linear-gradient(180deg, #dcf9f3 0%, #b8f0e4 100%)',
      position: 'relative', minHeight: '60vh', overflow: 'hidden',
      paddingTop: '80px', paddingBottom: '100px',
    }}>
      {/* Rolling hills SVG */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '140px' }}>
          <path d="M0,140 L0,80 Q180,20 360,70 Q540,120 720,60 Q900,10 1080,65 Q1260,120 1440,55 L1440,140 Z"
            fill="#009380" opacity="0.25"/>
          <path d="M0,140 L0,100 Q200,50 400,90 Q600,130 800,75 Q1000,25 1200,80 Q1350,115 1440,80 L1440,140 Z"
            fill="#005a4a" opacity="0.3"/>
        </svg>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 style={{
          fontFamily: FF, fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#009380', marginBottom: '8px',
        }}>
          Color Amber&apos;s World 🎨
        </h2>
        <p style={{
          fontFamily: CAT, fontWeight: 800, color: '#005a4a',
          fontSize: '1rem', marginBottom: '48px',
        }}>
          Free printable coloring pages from the Family Fables universe
        </p>

        {/* Coloring page cards */}
        <div style={{
          display: 'flex', gap: '24px', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '40px',
        }}>
          {COLORING_PAGES.map((p, i) => (
            <div key={i} style={{
              transform: `rotate(${p.rotate})`,
              background: 'white', borderRadius: '12px',
              padding: '10px 10px 16px',
              boxShadow: '0 6px 24px rgba(0,90,74,0.2)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '10px', maxWidth: '200px',
            }}>
              <Image
                src={p.src} alt={p.label} width={180} height={220}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <p style={{ fontFamily: FF, color: '#005a4a', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}>
                {p.label}
              </p>
              <a
                href={p.src} download
                style={{
                  background: '#009380', color: 'white', padding: '6px 16px',
                  borderRadius: '999px', textDecoration: 'none', fontFamily: FF,
                  fontSize: '0.8rem',
                }}
              >
                ⬇ Download
              </a>
            </div>
          ))}
        </div>

        <a href="/coloring" style={{
          display: 'inline-block', background: '#ff9c1a', color: '#fff',
          padding: '14px 40px', borderRadius: '8px', textDecoration: 'none',
          fontFamily: FF, fontSize: '1rem', boxShadow: '0 4px 16px rgba(255,156,26,0.4)',
        }}>
          All Coloring Pages →
        </a>
      </div>

      <WaveDivider fill="#78087c" />
    </section>
  );
}

// ── ZONE 6: THE CAMPFIRE ───────────────────────────────────────────────────
function ZoneCampfire() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
    } catch {
      console.log('[subscribe]', { firstName, email });
    }
    setSubmitted(true);
  };

  const stars = Array.from({ length: 30 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top:  `${Math.random() * 60}%`,
    size: 2 + Math.random() * 3,
    dur:  `${2 + Math.random() * 3}s`,
    delay: `${Math.random() * 3}s`,
  }));

  const inputStyle: React.CSSProperties = {
    padding: '14px 18px', borderRadius: '10px',
    border: '2px solid #d9b7e5', background: 'white',
    fontFamily: OS, fontSize: '1rem', color: '#1a003a',
    outline: 'none', width: '100%',
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #78087c 0%, #4a0050 100%)',
      position: 'relative', minHeight: '80vh', overflow: 'hidden',
      paddingTop: '100px', paddingBottom: '80px',
    }}>
      {/* Stars */}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: s.size, height: s.size,
          background: 'white', borderRadius: '50%',
          animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}`,
          pointerEvents: 'none',
        }} aria-hidden />
      ))}

      {/* Silhouette characters around campfire */}
      <div style={{ position: 'absolute', bottom: '60px', left: '5%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 100" width="60" height="75" fill="#3a0050">
          <ellipse cx="40" cy="30" rx="20" ry="22"/>
          <rect x="25" y="50" width="30" height="50" rx="10"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '60px', right: '5%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 100" width="55" height="68" fill="#3a0050">
          <ellipse cx="40" cy="28" rx="18" ry="20"/>
          <rect x="26" y="46" width="28" height="54" rx="10"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '60px', left: '15%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 90" width="48" height="60" fill="#2a0040">
          <ellipse cx="40" cy="24" rx="16" ry="18"/>
          <rect x="28" y="40" width="24" height="50" rx="8"/>
        </svg>
      </div>

      {/* Campfire SVG */}
      <div style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 80" width="80" height="80">
          <ellipse cx="40" cy="72" rx="30" ry="8" fill="#5a0660" opacity="0.5"/>
          <polygon points="40,10 20,60 60,60" fill="#ff9c1a" style={{ transformOrigin: '40px 60px', animation: 'fireFlicker 0.6s ease-in-out infinite' }}/>
          <polygon points="40,25 25,60 55,60" fill="#ffcc00" style={{ transformOrigin: '40px 60px', animation: 'fireFlicker 0.5s ease-in-out infinite 0.1s' }}/>
          <polygon points="40,35 30,60 50,60" fill="#fff3e0" style={{ transformOrigin: '40px 60px', animation: 'fireFlicker 0.7s ease-in-out infinite 0.2s' }}/>
          <ellipse cx="40" cy="60" rx="20" ry="8" fill="#3a1a00" opacity="0.7"/>
        </svg>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🪵</div>
        <h2 style={{
          fontFamily: FF, fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#ffffff', marginBottom: '8px', lineHeight: 1.05,
        }}>
          Pull up a log
        </h2>
        <p style={{
          fontFamily: CAT, fontWeight: 800, color: '#d9b7e5',
          fontSize: '1.1rem', marginBottom: '40px',
        }}>
          Join the Family — new releases, giveaways &amp; magic in your inbox
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
            padding: '40px 32px', border: '2px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontFamily: FF, color: '#ffffff', fontSize: '2rem', marginBottom: '8px' }}>You&apos;re in!</h3>
            <p style={{ color: '#dcf9f3', fontSize: '1rem', lineHeight: 1.6 }}>
              Welcome to the Family Fables family — watch your inbox!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text" placeholder="First Name" value={firstName}
                onChange={e => setFirstName(e.target.value)}
                style={{ ...inputStyle, flex: '1 1 160px' }}
              />
              <input
                type="email" placeholder="Email Address" value={email} required
                onChange={e => setEmail(e.target.value)}
                style={{ ...inputStyle, flex: '2 1 220px' }}
              />
            </div>
            <button type="submit" style={{
              padding: '16px 32px', background: '#ff9c1a', color: '#fff',
              border: 'none', borderRadius: '10px', fontFamily: FF,
              fontSize: '1.1rem', cursor: 'pointer', minHeight: '54px',
              letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(255,156,26,0.5)',
            }}>
              Subscribe ✨
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── HOME PAGE ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <SparkleTrail />
      <StickyBuyButton />
      <BedtimeToggle />

      <ZoneSky />
      <ZoneAmberMountain />
      <ZoneDragonTown />
      <ZoneBookshelf />
      <ZoneColoringMeadow />
      <ZoneCampfire />
    </div>
  );
}
