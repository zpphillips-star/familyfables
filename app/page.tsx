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

// ── Adventure map zone illustrations ─────────────────────────────────────────
function IconAmber() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Mountain */}
      <polygon points="32,8 6,54 58,54" fill="#7b3fa0" opacity="0.9"/>
      <polygon points="32,8 20,28 44,28" fill="#a060c8" opacity="0.7"/>
      {/* Snow cap */}
      <polygon points="32,8 24,24 40,24" fill="white" opacity="0.85"/>
      {/* Crystals on mountain */}
      <polygon points="14,54 17,42 20,54" fill="#d9b7e5"/>
      <polygon points="44,54 47,40 50,54" fill="#c090d8"/>
      <polygon points="29,54 32,44 35,54" fill="#b070cc"/>
      {/* Dragon silhouette flying */}
      <ellipse cx="50" cy="18" rx="6" ry="3.5" fill="#ff9c1a" opacity="0.95"/>
      <polygon points="44,18 40,14 42,20" fill="#ff9c1a" opacity="0.95"/>
      <polygon points="56,15 60,12 58,19" fill="#ff9c1a" opacity="0.85"/>
      {/* Dragon eye */}
      <circle cx="52" cy="17" r="1.2" fill="white"/>
      <circle cx="52.3" cy="17" r="0.6" fill="#2a0038"/>
    </svg>
  );
}

function IconDragon() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="32" cy="36" rx="18" ry="16" fill="#7b4a00"/>
      <ellipse cx="32" cy="33" rx="17" ry="15" fill="#8b5a10"/>
      {/* Highlight */}
      <ellipse cx="28" cy="28" rx="8" ry="6" fill="#a06820" opacity="0.5"/>
      {/* Eyes */}
      <circle cx="24" cy="30" r="5" fill="white"/>
      <circle cx="40" cy="30" r="5" fill="white"/>
      <circle cx="25" cy="30" r="3" fill="#1a0800"/>
      <circle cx="41" cy="30" r="3" fill="#1a0800"/>
      <circle cx="26" cy="29" r="1" fill="white"/>
      <circle cx="42" cy="29" r="1" fill="white"/>
      {/* Smile */}
      <path d="M22,42 Q32,50 42,42" stroke="#5a2800" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Swirl top */}
      <path d="M32,18 Q28,10 32,7 Q36,4 38,10" stroke="#8b5a10" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <circle cx="38" cy="10" r="3.5" fill="#8b5a10"/>
      {/* Blush */}
      <ellipse cx="18" cy="37" rx="4" ry="2.5" fill="#e07040" opacity="0.45"/>
      <ellipse cx="46" cy="37" rx="4" ry="2.5" fill="#e07040" opacity="0.45"/>
    </svg>
  );
}

function IconBooks() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bottom book - teal */}
      <rect x="8" y="42" width="48" height="14" rx="3" fill="#009380"/>
      <rect x="8" y="42" width="7" height="14" rx="2" fill="#007060"/>
      <line x1="20" y1="45" x2="50" y2="45" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      <line x1="20" y1="50" x2="44" y2="50" stroke="white" strokeWidth="1.5" opacity="0.3"/>
      {/* Middle book - orange, slightly askew */}
      <rect x="10" y="27" width="42" height="13" rx="3" fill="#ff9c1a" transform="rotate(-2 10 27)"/>
      <rect x="10" y="27" width="7" height="13" rx="2" fill="#e07800" transform="rotate(-2 10 27)"/>
      <line x1="22" y1="30" x2="46" y2="29" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      {/* Top book - purple */}
      <rect x="12" y="13" width="38" height="13" rx="3" fill="#78087c" transform="rotate(1.5 12 13)"/>
      <rect x="12" y="13" width="7" height="13" rx="2" fill="#5a0060" transform="rotate(1.5 12 13)"/>
      <line x1="24" y1="17" x2="44" y2="17" stroke="white" strokeWidth="1.5" opacity="0.4"/>
      {/* Bookmark ribbon */}
      <rect x="44" y="8" width="5" height="20" rx="1" fill="#ff9c1a"/>
      <polygon points="44,28 46.5,24 49,28" fill="#e07800"/>
    </svg>
  );
}

function IconColoring() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pencil body */}
      <rect x="28" y="8" width="12" height="38" rx="2" fill="#ffcc44" transform="rotate(15 34 27)"/>
      <rect x="28" y="8" width="12" height="8" rx="2" fill="#e8a820" transform="rotate(15 34 27)"/>
      {/* Pencil tip */}
      <polygon points="34,46 30,56 38,56" fill="#f0c090" transform="rotate(15 34 51)"/>
      <polygon points="34,52 31.5,56 36.5,56" fill="#cc6633" transform="rotate(15 34 54)"/>
      {/* Eraser */}
      <rect x="28" y="8" width="12" height="5" rx="2" fill="#ffaabb" transform="rotate(15 34 10.5)"/>
      {/* Color swatches / strokes in background */}
      <ellipse cx="14" cy="48" rx="10" ry="5" fill="#009380" opacity="0.7" transform="rotate(-20 14 48)"/>
      <ellipse cx="50" cy="46" rx="10" ry="5" fill="#d9b7e5" opacity="0.8" transform="rotate(20 50 46)"/>
      <ellipse cx="10" cy="22" rx="7" ry="3.5" fill="#ff9c1a" opacity="0.65" transform="rotate(-30 10 22)"/>
    </svg>
  );
}

function IconCampfire() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stars */}
      <circle cx="10" cy="12" r="1.5" fill="white" opacity="0.8"/>
      <circle cx="54" cy="8" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="48" cy="20" r="1" fill="white" opacity="0.6"/>
      <circle cx="16" cy="22" r="1" fill="white" opacity="0.5"/>
      {/* Log base */}
      <ellipse cx="32" cy="52" rx="20" ry="5" fill="#3a1a00" opacity="0.6"/>
      <line x1="14" y1="50" x2="50" y2="54" stroke="#5a2800" strokeWidth="5" strokeLinecap="round"/>
      <line x1="18" y1="54" x2="46" y2="50" stroke="#4a2000" strokeWidth="4" strokeLinecap="round"/>
      {/* Flames - outer */}
      <path d="M32,48 Q20,38 24,26 Q26,18 32,14 Q38,18 40,26 Q44,38 32,48Z" fill="#ff5500"/>
      {/* Flames - mid */}
      <path d="M32,48 Q22,40 26,30 Q28,22 32,18 Q36,22 38,30 Q42,40 32,48Z" fill="#ff8c00"/>
      {/* Flames - inner */}
      <path d="M32,46 Q25,38 28,32 Q30,26 32,24 Q34,26 36,32 Q39,38 32,46Z" fill="#ffcc00"/>
      {/* Flame core */}
      <path d="M32,44 Q28,38 30,34 Q31,30 32,28 Q33,30 34,34 Q36,38 32,44Z" fill="#fff8c0"/>
    </svg>
  );
}

// ── ADVENTURE MAP strip ───────────────────────────────────────────────────────
const ZONES = [
  {
    id: 'amber',
    icon: <IconAmber />,
    label: "Amber's Mountain",
    hint: 'Play Crystal Rush',
    bg: 'linear-gradient(160deg, #b078d8 0%, #7030a0 100%)',
    border: '#c090e0',
    glow: 'rgba(160,80,220,0.45)',
  },
  {
    id: 'dragon',
    icon: <IconDragon />,
    label: "Dragon's Town",
    hint: 'Make your Poo Poo Face',
    bg: 'linear-gradient(160deg, #a030b0 0%, #4a0058 100%)',
    border: '#c050d0',
    glow: 'rgba(160,40,180,0.45)',
  },
  {
    id: 'books',
    icon: <IconBooks />,
    label: 'The Bookshelf',
    hint: 'Find your next read',
    bg: 'linear-gradient(160deg, #ffcc55 0%, #e07800 100%)',
    border: '#ffaa30',
    glow: 'rgba(255,160,0,0.45)',
  },
  {
    id: 'coloring',
    icon: <IconColoring />,
    label: 'Coloring Meadow',
    hint: 'Free printable pages',
    bg: 'linear-gradient(160deg, #50d8b8 0%, #007060 100%)',
    border: '#20c090',
    glow: 'rgba(0,180,140,0.45)',
  },
  {
    id: 'campfire',
    icon: <IconCampfire />,
    label: 'The Campfire',
    hint: 'Join the family',
    bg: 'linear-gradient(160deg, #9020a0 0%, #1e0028 100%)',
    border: '#b040c8',
    glow: 'rgba(120,0,160,0.45)',
  },
];

function AdventureMap() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ position: 'relative', zIndex: 4, width: '100%', padding: '0 16px' }}>
      <p style={{
        fontFamily: CAT, fontWeight: 800, textAlign: 'center',
        color: '#004a3a', fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        marginBottom: '14px', opacity: 0.65,
      }}>
        Your Adventure Awaits
      </p>

      <div style={{
        display: 'flex', gap: '10px', overflowX: 'auto',
        scrollSnapType: 'x mandatory', paddingBottom: '6px',
        WebkitOverflowScrolling: 'touch' as 'touch',
        justifyContent: 'center', flexWrap: 'wrap',
      }} className="shelf-scroll">
        {ZONES.map((z, i) => (
          <button
            key={z.id}
            onClick={() => scrollTo(z.id)}
            style={{
              flex: '0 0 auto', scrollSnapAlign: 'start',
              background: z.bg,
              border: `2px solid ${z.border}`,
              borderRadius: '18px',
              padding: '16px 14px 12px',
              cursor: 'pointer', outline: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              minWidth: '108px', maxWidth: '124px',
              boxShadow: `0 5px 20px ${z.glow}, 0 2px 6px rgba(0,0,0,0.15)`,
              transition: 'transform 0.18s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.18s ease',
              animation: `popIn 0.45s ease-out ${i * 90}ms both`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08) translateY(-4px)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 14px 36px ${z.glow}, 0 4px 12px rgba(0,0,0,0.2)`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 5px 20px ${z.glow}, 0 2px 6px rgba(0,0,0,0.15)`;
            }}
          >
            {/* Illustration */}
            <div style={{
              width: 54, height: 54,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
            }}>
              {z.icon}
            </div>
            <span style={{
              fontFamily: FF, color: '#ffffff',
              fontSize: 'clamp(0.72rem, 2vw, 0.88rem)',
              textAlign: 'center', lineHeight: 1.2,
              textShadow: '0 1px 5px rgba(0,0,0,0.4)',
            }}>{z.label}</span>
            <span style={{
              fontFamily: OS, color: 'rgba(255,255,255,0.78)',
              fontSize: 'clamp(0.6rem, 1.4vw, 0.7rem)',
              textAlign: 'center', lineHeight: 1.2,
            }}>{z.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

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

      {/* Adventure Map */}
      <div style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '780px', marginTop: '44px', animation: 'fadeSlideUp 1s ease-out 0.5s both' }}>
        <AdventureMap />
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
    <section id="amber" style={{
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
// Static star positions — fixed so no hydration mismatch
const DRAGON_TOWN_STARS = [
  {x:4,y:6,r:1.5},{x:11,y:15,r:1},{x:19,y:4,r:2},{x:27,y:20,r:1.5},{x:36,y:8,r:1},
  {x:44,y:16,r:2},{x:52,y:3,r:1.5},{x:61,y:18,r:1},{x:70,y:7,r:2},{x:79,y:13,r:1.5},
  {x:87,y:5,r:1},{x:94,y:19,r:2},{x:8,y:32,r:1.5},{x:16,y:38,r:1},{x:25,y:28,r:2},
  {x:33,y:42,r:1},{x:41,y:30,r:1.5},{x:49,y:44,r:2},{x:57,y:26,r:1},{x:65,y:40,r:1.5},
  {x:73,y:35,r:2},{x:81,y:48,r:1},{x:90,y:32,r:1.5},{x:96,y:41,r:1},
];

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
    <section id="dragon" style={{
      background: 'linear-gradient(180deg, #160025 0%, #2e0045 25%, #52006a 60%, #78087c 100%)',
      position: 'relative', minHeight: '100vh', overflow: 'hidden',
      paddingTop: '80px', paddingBottom: '260px',
    }}>

      {/* Stars */}
      <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '55%', pointerEvents: 'none' }}>
        {DRAGON_TOWN_STARS.map((s, i) => (
          <circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
            fill="white" opacity={0.55 + (i % 4) * 0.12}
            style={{ animation: `twinkle ${2.2 + (i % 3) * 0.8}s ease-in-out infinite ${i * 0.28}s` }}
          />
        ))}
      </svg>

      {/* Moon */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '5%', right: '7%',
        width: 'clamp(56px, 7vw, 90px)', height: 'clamp(56px, 7vw, 90px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 38%, #fffbe0, #ffd555, #ffaa20)',
        boxShadow: '0 0 32px 10px rgba(255,200,50,0.28), 0 0 70px 24px rgba(255,180,30,0.12)',
        pointerEvents: 'none',
      }}/>

      {/* Back city layer — distant, darker */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax meet"
          style={{ display: 'block', width: '100%', height: 'clamp(220px, 30vw, 360px)' }}>
          {/* Ground */}
          <rect x="0" y="300" width="1440" height="60" fill="#2a0040"/>
          {/* Far buildings */}
          <rect x="0"   y="160" width="80"  height="200" fill="#3a0052"/>
          <rect x="90"  y="120" width="100" height="240" fill="#350048"/>
          <rect x="200" y="155" width="65"  height="205" fill="#3e0058"/>
          <rect x="275" y="100" width="110" height="260" fill="#330046"/>
          <rect x="395" y="145" width="70"  height="215" fill="#400060"/>
          <rect x="475" y="110" width="95"  height="250" fill="#360050"/>
          <rect x="580" y="130" width="80"  height="230" fill="#3c0055"/>
          <rect x="670" y="90"  width="120" height="270" fill="#310044"/>
          <rect x="800" y="140" width="75"  height="220" fill="#3f005a"/>
          <rect x="885" y="115" width="90"  height="245" fill="#350050"/>
          <rect x="985" y="150" width="70"  height="210" fill="#3a0054"/>
          <rect x="1065" y="95" width="115" height="265" fill="#320046"/>
          <rect x="1190" y="130" width="85" height="230" fill="#3d0055"/>
          <rect x="1285" y="105" width="100" height="255" fill="#360050"/>
          <rect x="1395" y="155" width="45" height="205" fill="#3c0058"/>
          {/* Dim far windows */}
          {[90,275,475,670,1065,1285].flatMap((bx, bi) => [
            [bx+12, 140],[bx+35, 140],[bx+12, 170],[bx+35, 170],[bx+12, 200],[bx+35, 200],
          ].map(([wx,wy], wi) => (
            <rect key={`bw${bi}${wi}`} x={wx} y={wy} width="14" height="10" rx="2" fill="#ffd060" opacity="0.18"/>
          )))}
        </svg>
      </div>

      {/* Front city layer — closer, more detail, glowing windows */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax meet"
          style={{ display: 'block', width: '100%', height: 'clamp(180px, 26vw, 300px)' }}>
          {/* Street */}
          <rect x="0" y="248" width="1440" height="52" fill="#3d0055"/>
          <rect x="0" y="248" width="1440" height="4"  fill="#5a0080" opacity="0.5"/>
          {/* Sidewalk line */}
          <rect x="0" y="252" width="1440" height="6" fill="#4a0068" opacity="0.6"/>

          {/* Building L1 — tall tower */}
          <rect x="0"   y="40"  width="100" height="210" fill="#580082" rx="3"/>
          <rect x="25"  y="40"  width="50"  height="10"  fill="#6e009a"/>
          <rect x="38"  y="30"  width="24"  height="18"  fill="#6000a0" rx="2"/>
          {[65,100,135,170,205].flatMap((wy, ri) => [10,38,66].map((wx, ci) => (
            <rect key={`l1${ri}${ci}`} x={wx} y={wy} width="16" height="12" rx="2"
              fill="#ffd060" opacity={0.55 + ci * 0.08}/>
          )))}

          {/* Building L2 — medium */}
          <rect x="110" y="100" width="90"  height="150" fill="#4e0072" rx="3"/>
          <rect x="128" y="100" width="54"  height="10"  fill="#620088"/>
          {[118,148,178,208].flatMap((wy, ri) => [116,140,164,188].map((wx, ci) => (
            <rect key={`l2${ri}${ci}`} x={wx} y={wy} width="14" height="10" rx="2"
              fill="#ffb830" opacity={0.5 + ci * 0.07}/>
          )))}

          {/* Building L3 — wide squat */}
          <rect x="210" y="140" width="130" height="110" fill="#550078" rx="3"/>
          <rect x="228" y="140" width="94"  height="9"   fill="#680094"/>
          {[155,178,205,228].flatMap((wy, ri) => [218,248,278,308,338].map((wx, ci) => (
            <rect key={`l3${ri}${ci}`} x={wx} y={wy} width="13" height="9" rx="2"
              fill="#ffd060" opacity={0.48 + ci * 0.05}/>
          )))}

          {/* Street lamp L */}
          <rect x="355" y="192" width="5" height="56" fill="#7a10a0"/>
          <rect x="344" y="192" width="27" height="5" rx="2" fill="#7a10a0"/>
          <circle cx="344" cy="192" r="10" fill="#ffd060" opacity="0.85"/>
          <circle cx="344" cy="192" r="18" fill="#ffd060" opacity="0.2"/>

          {/* Building R1 — mirror tall tower */}
          <rect x="1340" y="45"  width="100" height="205" fill="#580082" rx="3"/>
          <rect x="1365" y="45"  width="50"  height="10"  fill="#6e009a"/>
          <rect x="1378" y="34"  width="24"  height="18"  fill="#6000a0" rx="2"/>
          {[68,103,138,173,208].flatMap((wy, ri) => [1348,1376,1404].map((wx, ci) => (
            <rect key={`r1${ri}${ci}`} x={wx} y={wy} width="16" height="12" rx="2"
              fill="#ffd060" opacity={0.55 + ci * 0.08}/>
          )))}

          {/* Building R2 */}
          <rect x="1240" y="105" width="90"  height="145" fill="#4e0072" rx="3"/>
          <rect x="1258" y="105" width="54"  height="9"   fill="#620088"/>
          {[120,150,180,210].flatMap((wy, ri) => [1246,1270,1294,1318].map((wx, ci) => (
            <rect key={`r2${ri}${ci}`} x={wx} y={wy} width="14" height="10" rx="2"
              fill="#ffb830" opacity={0.5 + ci * 0.07}/>
          )))}

          {/* Building R3 — wide squat */}
          <rect x="1100" y="145" width="130" height="105" fill="#550078" rx="3"/>
          <rect x="1118" y="145" width="94"  height="9"   fill="#680094"/>
          {[160,182,207,228].flatMap((wy, ri) => [1108,1138,1168,1198].map((wx, ci) => (
            <rect key={`r3${ri}${ci}`} x={wx} y={wy} width="13" height="9" rx="2"
              fill="#ffd060" opacity={0.48 + ci * 0.05}/>
          )))}

          {/* Street lamp R */}
          <rect x="1080" y="192" width="5" height="56" fill="#7a10a0"/>
          <rect x="1069" y="192" width="27" height="5" rx="2" fill="#7a10a0"/>
          <circle cx="1096" cy="192" r="10" fill="#ffd060" opacity="0.85"/>
          <circle cx="1096" cy="192" r="18" fill="#ffd060" opacity="0.2"/>
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(2.6rem, 7vw, 5rem)',
            color: '#ffffff', textAlign: 'center', marginBottom: '48px',
            textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
          }}>
            The Dragon&apos;s Town
          </h2>
        </Reveal>

        {/* Three storefronts on the same street */}
        <div style={{
          display: 'flex', gap: '24px', flexWrap: 'wrap',
          alignItems: 'flex-end', justifyContent: 'center',
        }}>

          {/* ── DRAGON CORNER ── */}
          <Reveal delay={80}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Speech bubble */}
              <div style={{ position: 'relative', marginBottom: '8px' }}>
                {dragonEmoji && (
                  <div key={emojiKey} style={{
                    position: 'absolute', top: '-96px', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, pointerEvents: 'none',
                    animation: 'popIn 0.35s cubic-bezier(.175,.885,.32,1.275) both',
                  }}>
                    <div style={{
                      background: 'white', borderRadius: '50%', width: '80px', height: '80px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '3rem', boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
                    }}>{dragonEmoji}</div>
                    {/* Bubble tail */}
                    <div style={{
                      position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
                      width: 0, height: 0,
                      borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
                      borderTop: '12px solid white',
                    }}/>
                  </div>
                )}
                <div
                  onClick={tapDragon}
                  role="button" tabIndex={0} aria-label="Tap the dragon for a silly face"
                  onKeyDown={e => e.key === 'Enter' && tapDragon()}
                  style={{
                    cursor: 'pointer', outline: 'none',
                    animation: 'floatBob 5s ease-in-out infinite 0.3s',
                    filter: 'drop-shadow(0 6px 30px rgba(180,0,200,0.5))',
                  }}
                >
                  <Image
                    src="/images/originals/poo-poo-dragon-flipped.png"
                    alt="Poo Poo Dragon" width={260} height={260}
                    style={{ width: 'clamp(180px, 28vw, 280px)', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
              <p style={{
                fontFamily: FF, color: '#f0d8fa', fontSize: '0.88rem',
                background: 'rgba(0,0,0,0.35)', padding: '6px 18px', borderRadius: '999px',
                border: '1px solid rgba(255,200,255,0.2)',
              }}>
                👆 Tap the dragon!
              </p>
            </div>
          </Reveal>

          {/* ── PHOTO BOOTH STOREFRONT ── */}
          <Reveal delay={160}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'clamp(200px, 28vw, 270px)' }}>
              {/* Storefront sign board */}
              <div style={{
                background: 'linear-gradient(90deg, #e07000, #ff9c1a, #ffb840, #ff9c1a, #e07000)',
                borderRadius: '12px 12px 0 0',
                padding: '8px 16px', textAlign: 'center',
                fontFamily: FF, color: 'white', fontSize: '0.9rem', letterSpacing: '0.06em',
                boxShadow: '0 -3px 16px rgba(255,156,26,0.45)',
                textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
              }}>
                ✦ PHOTO BOOTH ✦
              </div>
              {/* Storefront body */}
              <div
                onClick={() => setCameraOpen(true)}
                role="button" tabIndex={0} aria-label="Make your Poo Poo Face with the camera"
                onKeyDown={e => e.key === 'Enter' && setCameraOpen(true)}
                style={{
                  cursor: 'pointer', outline: 'none',
                  background: 'linear-gradient(160deg, #5a0080, #420060)',
                  border: '3px solid rgba(255,180,50,0.45)',
                  borderTop: 'none', borderRadius: '0 0 12px 12px',
                  padding: '24px 16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                  transition: 'filter 0.15s',
                  boxShadow: 'inset 0 -8px 24px rgba(0,0,0,0.3)',
                }}
              >
                {/* Mirror frame */}
                <div style={{
                  width: '120px', height: '148px', borderRadius: '50%',
                  background: 'linear-gradient(160deg, #1e0030, #3a005a)',
                  border: '5px solid',
                  borderColor: 'rgba(255,210,80,0.8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.08), inset 0 4px 24px rgba(0,0,0,0.6), 0 0 24px rgba(255,180,30,0.3)',
                }}>
                  {/* Mirror shine */}
                  <div style={{
                    position: 'absolute', top: '12%', left: '18%',
                    width: '22%', height: '48%', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.13)', transform: 'rotate(-20deg)',
                  }}/>
                  {/* Mirror icon */}
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                    <circle cx="28" cy="28" r="22" fill="#5a0080" opacity="0.6"/>
                    <ellipse cx="21" cy="24" rx="4" ry="4.5" fill="#ffd060"/>
                    <ellipse cx="35" cy="24" rx="4" ry="4.5" fill="#ffd060"/>
                    <path d="M17 33 Q22 40 28 37 Q34 40 39 33" stroke="#ff9c1a" strokeWidth="3" fill="none" strokeLinecap="round"/>
                    <circle cx="21" cy="24" r="1.8" fill="#3a0050"/>
                    <circle cx="35" cy="24" r="1.8" fill="#3a0050"/>
                  </svg>
                </div>
                <span style={{
                  fontFamily: FF, color: '#ffd4fa', fontSize: '1rem',
                  textAlign: 'center', lineHeight: 1.25,
                  textShadow: '1px 1px 6px rgba(0,0,0,0.5)',
                }}>
                  Make Your<br/>Poo Poo Face!
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── TOWN HALL QUIZ STOREFRONT ── */}
          <Reveal delay={240} style={{ flex: '1 1 280px', maxWidth: '460px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              {/* Storefront sign */}
              <div style={{
                background: 'linear-gradient(90deg, #5a006a, #78087c, #9010a0, #78087c, #5a006a)',
                borderRadius: '12px 12px 0 0',
                padding: '8px 16px', textAlign: 'center',
                fontFamily: FF, color: 'white', fontSize: '0.9rem', letterSpacing: '0.06em',
                boxShadow: '0 -3px 14px rgba(120,8,124,0.45)',
                textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
              }}>
                ✦ TOWN HALL QUIZ ✦
              </div>
              {/* Storefront body */}
              <div style={{
                background: 'linear-gradient(160deg, #420060, #300048)',
                border: '3px solid rgba(200,120,220,0.3)',
                borderTop: 'none', borderRadius: '0 0 12px 12px',
                padding: '20px', textAlign: 'center',
                boxShadow: 'inset 0 -8px 24px rgba(0,0,0,0.3)',
              }}>
                <h3 style={{
                  fontFamily: FF, color: '#f0d8fa',
                  fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                  marginBottom: '16px',
                }}>
                  What&apos;s Your Face?
                </h3>
                <PooFaceQuiz />
              </div>

              {/* Book card — same storefront language */}
              <div style={{
                marginTop: '16px',
                background: 'linear-gradient(160deg, #4a0068, #320050)',
                borderRadius: '12px',
                border: '2px solid rgba(200,120,220,0.25)',
                padding: '14px 16px',
                display: 'flex', gap: '14px', alignItems: 'center',
              }}>
                <Image
                  src="/images/wp/whats-your-poopoo-face-400.png"
                  alt="What's Your Poo Poo Face" width={120} height={120}
                  style={{ width: '76px', height: 'auto', borderRadius: '8px', flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: FF, color: '#fff', fontSize: '0.92rem', marginBottom: '10px', lineHeight: 1.2 }}>
                    What&apos;s Your Poo Poo Face?
                  </p>
                  <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-block', background: '#ff9c1a', color: '#fff',
                    padding: '7px 18px', borderRadius: '8px', textDecoration: 'none',
                    fontFamily: FF, fontSize: '0.85rem',
                    boxShadow: '0 3px 12px rgba(255,156,26,0.4)',
                  }}>
                    Get on Amazon →
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Camera modal */}
      {cameraOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.9)',
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
    <section id="books" style={{
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
    <section id="coloring" style={{
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
    <section id="campfire" style={{
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
