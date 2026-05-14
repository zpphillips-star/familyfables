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

// ── Font shorthands ──────────────────────────────────────────────────────────
const FF  = "'Concert One', var(--font-concert-one), cursive";
const CAT = "'Catamaran', var(--font-catamaran), sans-serif";
const OS  = "'Open Sans', sans-serif";

// ── Scroll-triggered entrance ────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, style, delay = 0 }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      ...style,
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── SparkleTrail ─────────────────────────────────────────────────────────────
type Spark = { id: number; x: number; y: number; rot: number; size: number; color: string };
const SPARK_COLORS = ['#009380','#d9b7e5','#78087c','#dcf9f3','#006e59','#ff9c1a'];

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

// ── Sticky buy button (fades in after scroll) ─────────────────────────────────
function StickyBuyButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <Link href="/books" style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 9998,
      background: '#ff9c1a', color: '#ffffff',
      padding: '12px 22px', borderRadius: '999px',
      fontFamily: FF, fontSize: '1rem',
      textDecoration: 'none',
      boxShadow: '0 4px 24px rgba(255,156,26,0.55)',
      display: 'flex', alignItems: 'center', gap: '7px',
      minHeight: '52px', whiteSpace: 'nowrap',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(10px)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      📚 Books
    </Link>
  );
}

// ── Cloud shapes ──────────────────────────────────────────────────────────────
function Cloud({ shape = 0, style }: { shape?: number; style?: React.CSSProperties }) {
  if (shape === 1) return (
    <svg viewBox="0 0 200 80" fill="white" style={{ ...style, position: 'absolute' }}>
      <ellipse cx="100" cy="55" rx="88" ry="24" />
      <ellipse cx="60"  cy="44" rx="42" ry="22" />
      <ellipse cx="140" cy="42" rx="40" ry="20" />
      <ellipse cx="105" cy="36" rx="35" ry="22" />
      <ellipse cx="80"  cy="38" rx="30" ry="18" />
    </svg>
  );
  if (shape === 2) return (
    <svg viewBox="0 0 200 80" fill="white" style={{ ...style, position: 'absolute' }}>
      <ellipse cx="100" cy="52" rx="85" ry="27" />
      <ellipse cx="65"  cy="38" rx="44" ry="30" />
      <ellipse cx="135" cy="35" rx="40" ry="28" />
      <ellipse cx="95"  cy="25" rx="36" ry="26" />
      <ellipse cx="120" cy="20" rx="30" ry="22" />
    </svg>
  );
  return (
    <svg viewBox="0 0 200 80" fill="white" style={{ ...style, position: 'absolute' }}>
      <ellipse cx="100" cy="50" rx="90" ry="30" />
      <ellipse cx="70"  cy="40" rx="50" ry="28" />
      <ellipse cx="130" cy="38" rx="45" ry="25" />
      <ellipse cx="100" cy="30" rx="40" ry="26" />
    </svg>
  );
}

// ── Zone blob divider ─────────────────────────────────────────────────────────
function BlobDivider({ fill }: { fill: string }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      lineHeight: 0, pointerEvents: 'none', zIndex: 2,
    }}>
      <svg viewBox="0 0 1440 110" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '110px' }}>
        <path
          d="M0,68 C100,88 220,46 380,70 C520,92 640,44 800,68 C940,90 1060,42 1220,66 C1330,82 1400,54 1440,70 L1440,110 L0,110 Z"
          fill={fill}
        />
        <path
          d="M0,82 C160,60 300,90 480,74 C620,60 740,84 900,72 C1040,60 1160,82 1320,70 C1400,64 1430,78 1440,76 L1440,110 L0,110 Z"
          fill={fill} opacity="0.55"
        />
      </svg>
    </div>
  );
}

// ── ZONE 1: THE SKY ───────────────────────────────────────────────────────────
function ZoneSky() {
  const [pulsed, setPulsed] = useState<number | null>(null);
  const [wiggle, setWiggle] = useState(false);

  const clouds = [
    { top: '9%',  left: '3%',  w: 190, dur: '22s', shape: 0 },
    { top: '22%', right: '6%', w: 155, dur: '30s', shape: 1 },
    { top: '38%', left: '18%', w: 140, dur: '36s', shape: 2 },
    { top: '14%', left: '48%', w: 210, dur: '26s', shape: 0 },
    { top: '44%', right: '2%', w: 125, dur: '33s', shape: 1 },
  ];

  const tapCloud = (i: number) => { setPulsed(i); setTimeout(() => setPulsed(null), 500); };
  const tapNarwhal = () => { setWiggle(true); setTimeout(() => setWiggle(false), 750); };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #b8f0eb 0%, #dcf9f3 55%, #e8fdf9 100%)',
      minHeight: '100svh', position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingBottom: '130px', paddingTop: '60px',
    }}>
      {/* Drifting clouds */}
      {clouds.map((c, i) => (
        <div
          key={i}
          role="button" tabIndex={0} aria-label={`Cloud ${i + 1} — tap me!`}
          onClick={() => tapCloud(i)}
          onKeyDown={e => e.key === 'Enter' && tapCloud(i)}
          style={{
            position: 'absolute',
            top: c.top,
            left: (c as {left?: string}).left,
            right: (c as {right?: string}).right,
            width: c.w, height: c.w * 0.4,
            animation: `driftCloud ${c.dur} ease-in-out infinite alternate`,
            transform: pulsed === i ? 'scale(1.35)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(.175,.885,.32,1.275)',
            cursor: 'pointer', outline: 'none',
            filter: 'drop-shadow(0 6px 16px rgba(0,147,128,0.1))',
            opacity: 0.92,
          }}
        >
          <Cloud shape={c.shape} style={{ width: '100%', height: '100%', position: 'relative' }} />
        </div>
      ))}

      {/* Narwhal — tap to wiggle */}
      <div
        onClick={tapNarwhal}
        role="button" tabIndex={0} aria-label="Tap the narwhal!"
        onKeyDown={e => e.key === 'Enter' && tapNarwhal()}
        style={{
          animation: wiggle ? undefined : 'floatBob 4s ease-in-out infinite',
          marginBottom: '16px', position: 'relative', zIndex: 3,
          cursor: 'pointer', outline: 'none',
        }}
        className={wiggle ? 'narwhal-wiggle' : ''}
      >
        <TiltNarwhal size={420} />
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: FF,
        fontSize: 'clamp(3.5rem, 14vw, 9rem)',
        color: '#ffffff',
        textShadow: '4px 4px 0 #009380, 8px 8px 0 rgba(0,147,128,0.2)',
        lineHeight: 0.9, marginBottom: '16px',
        position: 'relative', zIndex: 3,
        animation: 'fadeSlideUp 0.8s ease-out both',
        textAlign: 'center', letterSpacing: '-0.01em',
      }}>
        Family Fables
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: CAT, fontWeight: 800,
        fontSize: 'clamp(1.4rem, 4.5vw, 2.2rem)',
        color: '#005a4a', marginBottom: '36px',
        position: 'relative', zIndex: 3,
        animation: 'fadeSlideUp 0.9s ease-out 0.15s both',
        textAlign: 'center',
      }}>
        Where every story is an adventure ✨
      </p>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 3, animation: 'fadeSlideUp 1s ease-out 0.3s both' }}>
        <Link href="/books" style={{
          display: 'inline-block',
          background: '#ff9c1a', color: '#fff',
          padding: '18px 52px', borderRadius: '999px',
          fontFamily: FF, fontSize: 'clamp(1.1rem, 3.5vw, 1.45rem)',
          textDecoration: 'none',
          boxShadow: '0 4px 28px rgba(255,156,26,0.5)',
        }}>
          Explore the Books →
        </Link>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        animation: 'floatBob 1.8s ease-in-out infinite',
        color: '#009380', pointerEvents: 'none', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      }} aria-hidden>
        <span style={{ fontFamily: CAT, fontWeight: 800, fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.05em' }}>scroll</span>
        <span style={{ fontSize: '1.5rem' }}>↓</span>
      </div>

      <BlobDivider fill="#d9b7e5" />
    </section>
  );
}

// ── ZONE 2: AMBER'S MOUNTAIN ──────────────────────────────────────────────────
function ZoneAmberMountain() {
  const [fireActive, setFireActive] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const crystals = [
    { left: '5%',  top: '28%', delay: '0s',    size: 28 },
    { left: '14%', top: '18%', delay: '0.5s',  size: 20 },
    { left: '35%', top: '24%', delay: '0.9s',  size: 24 },
    { left: '62%', top: '20%', delay: '0.3s',  size: 22 },
    { left: '80%', top: '26%', delay: '1.2s',  size: 18 },
    { left: '92%', top: '30%', delay: '0.7s',  size: 30 },
  ];

  const tapAmber = () => { setFireActive(true); setTimeout(() => setFireActive(false), 700); };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #d9b7e5 0%, #c5a0d5 60%, #a070c0 100%)',
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      paddingTop: '60px', paddingBottom: '120px',
    }}>
      {/* Crystals */}
      {crystals.map((c, i) => (
        <div key={i} style={{
          position: 'absolute', left: c.left, top: c.top,
          animation: `crystalPulse 2.4s ease-in-out infinite ${c.delay}`,
          pointerEvents: 'none', fontSize: c.size,
        }} aria-hidden>💎</div>
      ))}

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            color: '#2a0038', textAlign: 'center', marginBottom: '6px',
            textShadow: '2px 2px 0 rgba(255,255,255,0.2)',
          }}>
            Amber&apos;s Mountain 🐉
          </h2>
          <p style={{
            fontFamily: CAT, fontWeight: 800, textAlign: 'center',
            color: '#5a0066', fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
            marginBottom: '40px',
          }}>
            She thought she was just a regular kid…
          </p>
        </Reveal>

        <div style={{
          display: 'flex', gap: '40px', flexWrap: 'wrap',
          alignItems: 'flex-start', justifyContent: 'center',
        }}>
          {/* Amber */}
          <Reveal delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div
                onClick={tapAmber}
                role="button" tabIndex={0} aria-label="Tap Amber to see her power!"
                onKeyDown={e => e.key === 'Enter' && tapAmber()}
                style={{
                  cursor: 'pointer', outline: 'none',
                  filter: fireActive
                    ? 'drop-shadow(0 0 32px #ff9c1a) drop-shadow(0 0 60px #ff6b00) brightness(1.2)'
                    : 'drop-shadow(0 8px 24px rgba(120,8,124,0.3))',
                  transform: fireActive ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.2s ease',
                  animation: fireActive ? undefined : 'floatBob 5s ease-in-out infinite',
                }}
              >
                <Image
                  src="/images/originals/Amber-383-height.png"
                  alt="Amber the Dragon Keeper"
                  width={280} height={383}
                  style={{ width: 'clamp(260px, 38vw, 420px)', height: 'auto', display: 'block' }}
                  priority
                />
              </div>
              <p style={{
                fontFamily: FF, color: '#78087c', fontSize: '0.85rem',
                background: 'rgba(255,255,255,0.6)', padding: '4px 14px', borderRadius: '999px',
              }}>
                👆 Tap Amber!
              </p>
            </div>
          </Reveal>

          {/* Book tome */}
          <Reveal delay={200} style={{ flex: '1 1 280px', maxWidth: '420px' }}>
            <div
              onClick={() => setBookOpen(o => !o)}
              role="button" tabIndex={0} aria-label="Open Amber's book"
              onKeyDown={e => e.key === 'Enter' && setBookOpen(o => !o)}
              style={{
                background: 'linear-gradient(135deg, #009380, #005a4a)',
                borderRadius: '20px', padding: '24px 28px',
                cursor: 'pointer', outline: 'none',
                animation: 'floatBob 4s ease-in-out infinite 0.5s',
                boxShadow: '0 10px 40px rgba(0,90,74,0.4)',
                border: '3px solid rgba(255,255,255,0.15)',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontFamily: FF, fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', color: '#ffffff', marginBottom: '8px' }}>
                📖 Amber the Dragon Keeper
              </div>
              <p style={{ fontFamily: OS, color: '#dcf9f3', fontSize: '0.9rem', margin: 0 }}>
                {bookOpen ? '— tap to close' : 'tap to open the book! ✨'}
              </p>
            </div>

            {bookOpen && (
              <div style={{
                background: 'rgba(255,255,255,0.97)', borderRadius: '16px', padding: '24px',
                boxShadow: '0 8px 40px rgba(120,8,124,0.25)',
                animation: 'popIn 0.3s ease-out both',
              }}>
                <Image
                  src="/images/books/amber-dragon-keeper.jpg"
                  alt="Amber the Dragon Keeper cover"
                  width={100} height={140}
                  style={{ width: 80, height: 'auto', borderRadius: 8, float: 'right', marginLeft: 12, marginBottom: 8 }}
                />
                <h3 style={{ fontFamily: FF, color: '#005a4a', fontSize: '1.1rem', marginBottom: '8px' }}>
                  Amber the Dragon Keeper
                </h3>
                <p style={{ fontFamily: OS, fontSize: '0.88rem', color: '#1a3a30', lineHeight: 1.7, marginBottom: '16px' }}>
                  She thought she was just a regular kid — until the dragons chose her. Now she must protect a secret world of magical creatures. Ages 4–8.
                </p>
                <a
                  href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'inline-block', background: '#ff9c1a', color: '#fff',
                    padding: '10px 24px', borderRadius: '10px', textDecoration: 'none',
                    fontFamily: FF, fontSize: '1rem',
                    boxShadow: '0 4px 16px rgba(255,156,26,0.4)',
                  }}
                >
                  Get on Amazon →
                </a>
              </div>
            )}
          </Reveal>
        </div>

        {/* Game */}
        <Reveal delay={150} style={{ marginTop: '64px', textAlign: 'center' }}>
          <h3 style={{
            fontFamily: FF, fontSize: 'clamp(2rem, 5.5vw, 3.2rem)',
            color: '#2a0038', marginBottom: '8px',
          }}>
            Play Crystal Rush 💎
          </h3>
          <p style={{ fontFamily: OS, color: '#5a0066', marginBottom: '24px', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
            Catch the falling crystals — Amber needs your help!
          </p>
          <AmberGame />
        </Reveal>
      </div>

      {/* Mountain silhouette */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none', zIndex: 1 }}>
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '180px' }}>
          <path d="M0,180 L0,148 L160,55 L320,128 L500,32 L680,108 L860,42 L1040,114 L1200,62 L1350,118 L1440,82 L1440,180 Z"
            fill="#9060b8" opacity="0.55"/>
          <path d="M0,180 L0,162 L200,90 L400,150 L600,74 L800,144 L1000,80 L1200,134 L1440,90 L1440,180 Z"
            fill="#78087c" opacity="0.92"/>
        </svg>
      </div>
    </section>
  );
}

// ── ZONE 3: THE DRAGON'S TOWN ─────────────────────────────────────────────────
function ZoneDragonTown() {
  const [dragonEmoji, setDragonEmoji] = useState<string | null>(null);
  const [emojiKey, setEmojiKey] = useState(0);
  const [cameraOpen, setCameraOpen] = useState(false);
  const FACES = ['😤','😂','😳','😬','🤨','😈','🤩','😭','🤔','🥹','😝','🤯'];

  const tapDragon = () => {
    const f = FACES[Math.floor(Math.random() * FACES.length)];
    setDragonEmoji(f);
    setEmojiKey(k => k + 1);
    setTimeout(() => setDragonEmoji(null), 1800);
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #78087c 0%, #5a0060 55%, #420048 100%)',
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      paddingTop: '80px', paddingBottom: '120px',
    }}>
      {/* Silly buildings */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax meet"
          style={{ display: 'block', width: '100%', height: '220px' }}>
          <rect x="40"  y="100" width="140" height="120" fill="#e8d4f0" rx="6"/>
          <polygon points="40,100 110,44 180,100" fill="#d4c0e8"/>
          <circle cx="90"  cy="145" r="18" fill="#c9a8d8"/>
          <circle cx="155" cy="145" r="14" fill="#c9a8d8"/>
          <rect x="90"  y="165" width="28" height="35" rx="6" fill="#c0a0d4"/>
          <rect x="240" y="75"  width="120" height="145" fill="#f0e4f8" rx="6"/>
          <polygon points="240,75 300,25 360,75" fill="#e0cef0"/>
          <circle cx="278" cy="118" r="16" fill="#d4b8e8"/>
          <circle cx="322" cy="118" r="14" fill="#d4b8e8"/>
          <circle cx="300" cy="155" r="12" fill="#d4b8e8"/>
          <rect x="880" y="110" width="110" height="110" fill="#e8d4f0" rx="6"/>
          <polygon points="880,110 935,58 990,110" fill="#d4c0e8"/>
          <circle cx="920" cy="148" r="16" fill="#c9a8d8"/>
          <rect x="948" y="140" width="24" height="30" rx="5" fill="#c0a0d4"/>
          <rect x="1100" y="80"  width="220" height="140" fill="#f0e4f8" rx="6"/>
          <polygon points="1100,80 1210,22 1320,80" fill="#e0cef0"/>
          <circle cx="1155" cy="122" r="20" fill="#d4b8e8"/>
          <circle cx="1245" cy="122" r="18" fill="#d4b8e8"/>
          <rect x="1190" y="155" width="26" height="32" rx="5" fill="#d4b8e8"/>
          <circle cx="1315" cy="138" r="15" fill="#d4b8e8"/>
        </svg>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(2.6rem, 7vw, 5rem)',
            color: '#ffffff', textAlign: 'center', marginBottom: '48px',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)',
          }}>
            The Dragon&apos;s Town 🏙️
          </h2>
        </Reveal>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Dragon */}
          <Reveal delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                {dragonEmoji && (
                  <div key={emojiKey} style={{
                    position: 'absolute', top: '-88px', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, pointerEvents: 'none',
                    animation: 'popIn 0.35s cubic-bezier(.175,.885,.32,1.275) both',
                  }}>
                    <div style={{
                      background: 'white', borderRadius: '50%', width: '80px', height: '80px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '3rem',
                      boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
                    }}>{dragonEmoji}</div>
                  </div>
                )}
                <div
                  onClick={tapDragon}
                  role="button" tabIndex={0} aria-label="Tap the dragon for a silly face"
                  onKeyDown={e => e.key === 'Enter' && tapDragon()}
                  style={{
                    cursor: 'pointer', outline: 'none',
                    animation: 'floatBob 5s ease-in-out infinite 0.3s',
                    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
                  }}
                >
                  <Image
                    src="/images/originals/poo-poo-dragon-flipped.png"
                    alt="Poo Poo Dragon" width={260} height={260}
                    style={{ width: 'clamp(200px, 32vw, 320px)', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
              <p style={{
                fontFamily: FF, color: '#f0d8fa', fontSize: '0.85rem',
                background: 'rgba(0,0,0,0.2)', padding: '4px 14px', borderRadius: '999px',
              }}>
                👆 Tap the dragon!
              </p>
            </div>
          </Reveal>

          {/* Mirror */}
          <Reveal delay={150} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '340px' }}>
            <div
              onClick={() => setCameraOpen(true)}
              role="button" tabIndex={0} aria-label="Make your Poo Poo Face with the camera"
              onKeyDown={e => e.key === 'Enter' && setCameraOpen(true)}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              <div style={{
                position: 'relative', margin: '0 auto',
                width: 'clamp(150px, 22vw, 200px)',
                height: 'clamp(175px, 26vw, 240px)',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50% / 44%',
                  background: 'linear-gradient(135deg, #ffc040, #ff9c1a, #ffc040, #e07000)',
                  boxShadow: '0 0 0 4px rgba(255,156,26,0.35), 0 8px 32px rgba(255,156,26,0.4)',
                  animation: 'floatBob 3.5s ease-in-out infinite 0.5s',
                }}/>
                <div style={{
                  position: 'absolute', inset: '10px',
                  borderRadius: '50% / 44%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(180,200,255,0.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '6px',
                }}>
                  <span style={{ fontSize: '2.2rem' }}>📸</span>
                  <span style={{ fontFamily: FF, color: '#5a0060', fontSize: '0.8rem', textAlign: 'center', lineHeight: 1.2, padding: '0 10px' }}>
                    Make Your<br/>Poo Poo Face!
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.12)', borderRadius: '16px',
              padding: '16px', textAlign: 'center',
              border: '2px solid rgba(255,255,255,0.12)',
            }}>
              <Image
                src="/images/wp/whats-your-poopoo-face-400.png"
                alt="What's Your Poo Poo Face" width={150} height={150}
                style={{ width: '110px', height: 'auto', borderRadius: '10px', margin: '0 auto 10px', display: 'block' }}
              />
              <h3 style={{ fontFamily: FF, color: '#fff', fontSize: '0.95rem', marginBottom: '8px' }}>
                What&apos;s Your Poo Poo Face?
              </h3>
              <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block', background: '#ff9c1a', color: '#fff',
                padding: '8px 20px', borderRadius: '8px', textDecoration: 'none',
                fontFamily: FF, fontSize: '0.88rem',
              }}>
                Get on Amazon →
              </a>
            </div>
          </Reveal>

          {/* Quiz */}
          <Reveal delay={200} style={{ flex: '1 1 280px', maxWidth: '500px' }}>
            <h3 style={{
              fontFamily: FF, color: '#f0d8fa',
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              marginBottom: '16px', textAlign: 'center',
            }}>
              What&apos;s Your Face? 🤣
            </h3>
            <PooFaceQuiz />
          </Reveal>
        </div>
      </div>

      {/* Camera modal */}
      {cameraOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.88)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '540px', padding: '16px' }}>
            <button
              onClick={() => setCameraOpen(false)}
              style={{
                position: 'absolute', top: 0, right: 8, zIndex: 10,
                background: '#ff9c1a', color: '#fff', border: 'none',
                borderRadius: '50%', width: 48, height: 48,
                fontSize: '1.3rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
              aria-label="Close camera"
            >✕</button>
            <PooFaceCamera />
          </div>
        </div>
      )}

      <BlobDivider fill="#fff3e0" />
    </section>
  );
}

// ── ZONE 4: UNDERGROUND BOOKSHELF ─────────────────────────────────────────────
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
      background: 'linear-gradient(180deg, #fff3e0 0%, #ffe8b8 50%, #fff0d4 100%)',
      position: 'relative', minHeight: '80vh', overflow: 'hidden',
      paddingTop: '100px', paddingBottom: '120px',
    }}>
      {/* Cave stalactites */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '120px' }}>
          <rect x="0" y="0" width="1440" height="35" fill="#fff3e0"/>
          <path d="M0,0 L0,32 L55,98 L110,26 L185,86 L255,18 L330,80 L405,20 L480,76 L555,12 L630,70 L710,16 L790,78 L865,20 L940,74 L1020,14 L1095,68 L1170,18 L1250,76 L1320,22 L1395,70 L1440,38 L1440,0 Z"
            fill="#fff3e0" stroke="#e8c870" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M0,0 L0,18 L75,62 L150,14 L230,60 L310,10 L400,54 L490,14 L565,58 L650,8 L730,52 L815,12 L900,56 L985,8 L1065,50 L1150,10 L1240,58 L1310,14 L1400,54 L1440,26 L1440,0 Z"
            fill="#ffe8b0" opacity="0.65"/>
          <ellipse cx="720" cy="120" rx="400" ry="55" fill="#ffcc66" opacity="0.1"/>
        </svg>
      </div>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            color: '#6b3a00', textAlign: 'center', marginBottom: '6px',
          }}>
            The Underground Bookshelf 📚
          </h2>
          <p style={{
            fontFamily: CAT, fontWeight: 800, textAlign: 'center',
            color: '#78087c', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', marginBottom: '32px',
          }}>
            What kind of book night are you having?
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px' }}>
            {MOODS.map(m => (
              <button key={m.key} onClick={() => setActiveMood(m.key)} style={{
                padding: '12px 26px', borderRadius: '999px', cursor: 'pointer',
                border: `2.5px solid ${activeMood === m.key ? '#009380' : 'rgba(0,147,128,0.35)'}`,
                background: activeMood === m.key ? '#009380' : 'rgba(255,255,255,0.82)',
                color: activeMood === m.key ? 'white' : '#005a4a',
                fontFamily: FF, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                transition: 'all 0.2s ease', minHeight: '48px',
                boxShadow: activeMood === m.key ? '0 4px 16px rgba(0,147,128,0.3)' : 'none',
                transform: activeMood === m.key ? 'scale(1.05)' : 'scale(1)',
              }}>
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Shelf with gradient edge hints */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 20, width: '44px', zIndex: 10,
            background: 'linear-gradient(to right, #fff3e0, transparent)',
            pointerEvents: 'none',
          }}/>
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 20, width: '44px', zIndex: 10,
            background: 'linear-gradient(to left, #fff3e0, transparent)',
            pointerEvents: 'none',
          }}/>
          <div className="shelf-scroll" style={{
            display: 'flex', gap: '24px', overflowX: 'auto',
            scrollSnapType: 'x mandatory', paddingBottom: '20px',
            paddingLeft: '12px', paddingRight: '12px',
            WebkitOverflowScrolling: 'touch' as 'touch',
          }}>
            {filtered.map(book => (
              <div key={book.id} style={{ flex: '0 0 300px', scrollSnapAlign: 'start' }}>
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
              <div style={{
                fontFamily: FF, color: '#78087c', fontSize: '1.2rem',
                padding: '48px', textAlign: 'center', width: '100%',
              }}>
                No books in that mood yet — check back soon! 🌟
              </div>
            )}
          </div>
        </div>

        <Reveal delay={150} style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/books" style={{
            display: 'inline-block', background: '#ff9c1a', color: '#fff',
            padding: '16px 52px', borderRadius: '10px', textDecoration: 'none',
            fontFamily: FF, fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          }}>
            See All Books →
          </Link>
        </Reveal>
      </div>

      <BlobDivider fill="#dcf9f3" />
    </section>
  );
}

// ── ZONE 5: COLORING MEADOW ───────────────────────────────────────────────────
const COLORING_PAGES = [
  { src: '/coloring-pages/amber-dragon-keeper/page04-300dpi.png', rotate: '-4deg',   label: 'Amber & Friends' },
  { src: '/coloring-pages/amber-dragon-keeper/page07-300dpi.png', rotate: '2.5deg',  label: 'Dragon World'   },
  { src: '/coloring-pages/amber-dragon-keeper/page09-300dpi.png', rotate: '-2deg',   label: 'Crystal Valley' },
];

function ZoneColoringMeadow() {
  const [lifted, setLifted] = useState<number | null>(null);

  return (
    <section style={{
      background: 'linear-gradient(180deg, #dcf9f3 0%, #c2f5ea 60%, #a8f0df 100%)',
      position: 'relative', minHeight: '60vh', overflow: 'hidden',
      paddingTop: '100px', paddingBottom: '120px',
    }}>
      {/* Rolling hills */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '160px' }}>
          <path d="M0,160 L0,90 Q200,30 400,80 Q600,130 800,65 Q1000,5 1200,72 Q1360,118 1440,75 L1440,160 Z"
            fill="#009380" opacity="0.18"/>
          <path d="M0,160 L0,110 Q240,60 480,100 Q700,138 920,82 Q1120,32 1320,95 Q1400,120 1440,100 L1440,160 Z"
            fill="#005a4a" opacity="0.22"/>
        </svg>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontFamily: FF, fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', color: '#006e59', marginBottom: '8px' }}>
            Color Amber&apos;s World 🎨
          </h2>
          <p style={{ fontFamily: CAT, fontWeight: 800, color: '#005a4a', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', marginBottom: '48px' }}>
            Free printable coloring pages — straight from the storybook
          </p>
        </Reveal>

        <div style={{
          display: 'flex', gap: '28px', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '44px', alignItems: 'flex-end',
        }}>
          {COLORING_PAGES.map((p, i) => (
            <div
              key={i}
              onClick={() => setLifted(lifted === i ? null : i)}
              role="button" tabIndex={0} aria-label={`${p.label} coloring page — tap to pick up`}
              onKeyDown={e => e.key === 'Enter' && setLifted(lifted === i ? null : i)}
              style={{
                transform: lifted === i
                  ? 'rotate(0deg) scale(1.1) translateY(-18px)'
                  : `rotate(${p.rotate}) scale(1)`,
                background: 'white', borderRadius: '12px',
                padding: '10px 10px 20px',
                boxShadow: lifted === i
                  ? '0 24px 60px rgba(0,90,74,0.35)'
                  : '0 6px 28px rgba(0,90,74,0.18)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                maxWidth: '240px', cursor: 'pointer', outline: 'none',
                transition: 'all 0.3s cubic-bezier(.175,.885,.32,1.275)',
              }}
            >
              <Image
                src={p.src} alt={p.label} width={160} height={200}
                style={{ width: '100%', height: 'auto', borderRadius: '6px' }}
              />
              <p style={{ fontFamily: FF, color: '#005a4a', fontSize: '0.95rem', textAlign: 'center', margin: 0 }}>
                {p.label}
              </p>
              <a
                href={p.src} download
                onClick={e => e.stopPropagation()}
                style={{
                  background: '#009380', color: 'white', padding: '10px 20px',
                  borderRadius: '999px', textDecoration: 'none', fontFamily: FF,
                  fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '4px',
                  minHeight: '40px',
                }}
              >
                ⬇ Download
              </a>
            </div>
          ))}
        </div>

        <Reveal delay={100}>
          <Link href="/coloring" style={{
            display: 'inline-block', background: '#ff9c1a', color: '#fff',
            padding: '16px 52px', borderRadius: '10px', textDecoration: 'none',
            fontFamily: FF, fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
          }}>
            All Coloring Pages →
          </Link>
        </Reveal>
      </div>

      <BlobDivider fill="#4a0050" />
    </section>
  );
}

// ── ZONE 6: THE CAMPFIRE ──────────────────────────────────────────────────────
type StarData = { left: string; top: string; size: number; dur: string; delay: string };

function ZoneCampfire() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // FIX: generate stars client-only — prevents React hydration mismatch
  const [stars, setStars] = useState<StarData[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 36 }, () => ({
      left:  `${Math.random() * 100}%`,
      top:   `${Math.random() * 65}%`,
      size:  1.5 + Math.random() * 3,
      dur:   `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 3}s`,
    })));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
    } catch { /* ignore */ }
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: '14px 18px', borderRadius: '10px',
    border: '2px solid rgba(217,183,229,0.4)',
    background: 'rgba(255,255,255,0.1)',
    fontFamily: OS, fontSize: '1rem', color: '#fff',
    outline: 'none', width: '100%',
    backdropFilter: 'blur(4px)',
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #4a0050 0%, #78087c 28%, #4a0050 65%, #2a0032 100%)',
      position: 'relative', minHeight: '80vh', overflow: 'hidden',
      paddingTop: '120px', paddingBottom: '80px',
    }}>
      {/* Stars — client-only */}
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: s.left, top: s.top,
          width: s.size, height: s.size,
          background: 'white', borderRadius: '50%',
          animation: `twinkle ${s.dur} ease-in-out infinite ${s.delay}`,
          pointerEvents: 'none',
        }} aria-hidden />
      ))}

      {/* Silhouettes */}
      <div style={{ position: 'absolute', bottom: '55px', left: '8%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 110" width="58" height="72" fill="#2a0040">
          <ellipse cx="40" cy="28" rx="20" ry="22"/>
          <rect x="24" y="48" width="32" height="62" rx="12"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '55px', right: '10%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 110" width="52" height="65" fill="#2a0040">
          <ellipse cx="40" cy="26" rx="18" ry="20"/>
          <rect x="26" y="44" width="28" height="66" rx="10"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '55px', left: '18%', pointerEvents: 'none' }}>
        <svg viewBox="0 0 80 96" width="44" height="55" fill="#1e0030">
          <ellipse cx="40" cy="22" rx="16" ry="18"/>
          <rect x="28" y="38" width="24" height="58" rx="8"/>
        </svg>
      </div>

      {/* Campfire */}
      <div style={{ position: 'absolute', bottom: '48px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none' }}>
        <svg viewBox="0 0 100 100" width="108" height="108">
          <ellipse cx="50" cy="90" rx="40" ry="10" fill="#2a0040" opacity="0.5"/>
          <polygon points="50,6 20,74 80,74" fill="#ff5500"
            style={{ transformOrigin: '50px 74px', animation: 'fireFlicker 0.65s ease-in-out infinite' }}/>
          <polygon points="50,20 25,74 75,74" fill="#ff9c1a"
            style={{ transformOrigin: '50px 74px', animation: 'fireFlicker 0.5s ease-in-out infinite 0.12s' }}/>
          <polygon points="50,34 32,74 68,74" fill="#ffdd00"
            style={{ transformOrigin: '50px 74px', animation: 'fireFlicker 0.75s ease-in-out infinite 0.07s' }}/>
          <polygon points="50,48 38,74 62,74" fill="#fff8c0"
            style={{ transformOrigin: '50px 74px', animation: 'fireFlicker 0.4s ease-in-out infinite 0.18s' }}/>
          <ellipse cx="50" cy="74" rx="30" ry="9" fill="#4a2000" opacity="0.95"/>
          <line x1="22" y1="74" x2="78" y2="74" stroke="#6b3a00" strokeWidth="5" strokeLinecap="round"/>
          <line x1="28" y1="70" x2="72" y2="78" stroke="#5a3000" strokeWidth="3.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Reveal>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🪵</div>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(2.4rem, 6vw, 4rem)',
            color: '#ffffff', marginBottom: '8px', lineHeight: 1.05,
            textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
          }}>
            Pull up a log
          </h2>
          <p style={{
            fontFamily: CAT, fontWeight: 800, color: '#d9b7e5',
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '36px', lineHeight: 1.5,
          }}>
            Join the Family — new releases, giveaways &amp; stories in your inbox
          </p>
        </Reveal>

        <Reveal delay={120}>
          {submitted ? (
            <div style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: '20px',
              padding: '40px 32px', border: '2px solid rgba(255,255,255,0.15)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
              <h3 style={{ fontFamily: FF, color: '#ffffff', fontSize: '2rem', marginBottom: '8px' }}>You&apos;re in!</h3>
              <p style={{ color: '#dcf9f3', fontSize: '1rem', lineHeight: 1.6 }}>
                Welcome to the Family Fables family — watch your inbox!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text" placeholder="First Name" value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="campfire-input"
                  style={{ ...inputStyle, flex: '1 1 140px' }}
                />
                <input
                  type="email" placeholder="Email Address" value={email} required
                  onChange={e => setEmail(e.target.value)}
                  className="campfire-input"
                  style={{ ...inputStyle, flex: '2 1 200px' }}
                />
              </div>
              <button type="submit" style={{
                padding: '16px 32px', background: '#ff9c1a', color: '#fff',
                border: 'none', borderRadius: '10px', fontFamily: FF,
                fontSize: '1.1rem', cursor: 'pointer', minHeight: '54px',
                letterSpacing: '0.04em', boxShadow: '0 4px 24px rgba(255,156,26,0.5)',
              }}>
                Subscribe ✨
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
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
