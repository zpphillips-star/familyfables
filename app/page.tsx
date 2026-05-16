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
      {/* Sky teal gradient background circle */}
      <circle cx="32" cy="32" r="30" fill="#4ec9b8" opacity="0.25"/>
      {/* Back mountain - darker */}
      <polygon points="32,6 4,56 60,56" fill="#5a2880"/>
      <polygon points="32,6 18,30 46,30" fill="#7840a8" opacity="0.8"/>
      {/* Snow cap */}
      <polygon points="32,6 24,22 40,22" fill="white" opacity="0.9"/>
      {/* Teal crystal spires - left */}
      <polygon points="12,56 15,40 18,56" fill="#20c8a8"/>
      <polygon points="18,56 21,44 24,56" fill="#30d8b8"/>
      {/* Teal crystal spires - right */}
      <polygon points="40,56 43,42 46,56" fill="#30d8b8"/>
      <polygon points="46,56 50,38 54,56" fill="#20c8a8"/>
      {/* Center crystal */}
      <polygon points="29,56 32,42 35,56" fill="#50e0c8"/>
      {/* Crystal shimmer dots */}
      <circle cx="15" cy="42" r="1.2" fill="white" opacity="0.8"/>
      <circle cx="50" cy="40" r="1" fill="white" opacity="0.7"/>
      <circle cx="32" cy="44" r="0.9" fill="white" opacity="0.9"/>
      {/* Amber the dragon - small, warm orange, flying */}
      <ellipse cx="50" cy="16" rx="7" ry="4" fill="#ff9c1a"/>
      <polygon points="43,16 38,11 41,18" fill="#ff9c1a"/>
      <polygon points="57,13 62,9 59,17" fill="#ff8800" opacity="0.9"/>
      {/* Dragon eye */}
      <circle cx="52" cy="15" r="1.5" fill="white"/>
      <circle cx="52.4" cy="15" r="0.8" fill="#2a0038"/>
      {/* Sparkles */}
      <circle cx="8" cy="18" r="1.2" fill="white" opacity="0.7"/>
      <circle cx="56" cy="28" r="1" fill="white" opacity="0.6"/>
      <circle cx="22" cy="10" r="0.9" fill="#ffe080" opacity="0.9"/>
    </svg>
  );
}

function IconDragon() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Swirl / hat top */}
      <ellipse cx="32" cy="12" rx="7" ry="5" fill="#6b3a00"/>
      <ellipse cx="34" cy="8" rx="5" ry="4" fill="#7b4a05"/>
      <ellipse cx="36" cy="5" rx="3.5" ry="3" fill="#8b5a10"/>
      <circle cx="37" cy="3" r="2" fill="#9a6615"/>
      {/* Mid layer */}
      <ellipse cx="32" cy="22" rx="13" ry="9" fill="#7b4a05"/>
      {/* Main body - pear shaped */}
      <ellipse cx="32" cy="38" rx="18" ry="19" fill="#8b5a10"/>
      <ellipse cx="32" cy="36" rx="17" ry="18" fill="#9a6820"/>
      {/* Sheen highlight */}
      <ellipse cx="26" cy="28" rx="7" ry="5" fill="#b07828" opacity="0.55"/>
      {/* Big friendly eyes */}
      <circle cx="23" cy="34" r="7" fill="white"/>
      <circle cx="41" cy="34" r="7" fill="white"/>
      {/* Pupils */}
      <circle cx="24.5" cy="34.5" r="4.5" fill="#1a0800"/>
      <circle cx="42.5" cy="34.5" r="4.5" fill="#1a0800"/>
      {/* Iris shine */}
      <circle cx="23" cy="32" r="1.5" fill="white"/>
      <circle cx="41" cy="32" r="1.5" fill="white"/>
      {/* Tiny extra glint */}
      <circle cx="26" cy="36" r="0.7" fill="white" opacity="0.6"/>
      <circle cx="44" cy="36" r="0.7" fill="white" opacity="0.6"/>
      {/* Happy smile */}
      <path d="M22,46 Q32,55 42,46" stroke="#5a2800" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      {/* Rosy cheeks */}
      <ellipse cx="15" cy="40" rx="4.5" ry="3" fill="#e06030" opacity="0.38"/>
      <ellipse cx="49" cy="40" rx="4.5" ry="3" fill="#e06030" opacity="0.38"/>
      {/* Little arms */}
      <ellipse cx="10" cy="44" rx="4" ry="3" fill="#8b5a10" transform="rotate(-20 10 44)"/>
      <ellipse cx="54" cy="44" rx="4" ry="3" fill="#8b5a10" transform="rotate(20 54 44)"/>
    </svg>
  );
}

function IconBooks() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Book 1 - red, left, slight tilt */}
      <rect x="8" y="18" width="12" height="38" rx="3" fill="#e03060" transform="rotate(-4 14 37)"/>
      <rect x="8" y="18" width="4" height="38" rx="2" fill="#b01040" transform="rotate(-4 14 37)"/>
      <rect x="9" y="20" width="10" height="3" rx="1" fill="white" opacity="0.35" transform="rotate(-4 14 21)"/>
      {/* Book 2 - purple, center */}
      <rect x="24" y="14" width="13" height="42" rx="3" fill="#7030a0"/>
      <rect x="24" y="14" width="4.5" height="42" rx="2" fill="#5a1080"/>
      <rect x="25" y="16" width="11" height="3" rx="1" fill="white" opacity="0.35"/>
      <rect x="25" y="22" width="8" height="2" rx="1" fill="white" opacity="0.25"/>
      {/* Book 3 - orange, right, slight tilt */}
      <rect x="40" y="16" width="13" height="40" rx="3" fill="#ff9c1a" transform="rotate(3 46 36)"/>
      <rect x="40" y="16" width="4.5" height="40" rx="2" fill="#d07000" transform="rotate(3 46 36)"/>
      <rect x="41" y="18" width="11" height="3" rx="1" fill="white" opacity="0.35" transform="rotate(3 46 19)"/>
      {/* Shelf line */}
      <rect x="4" y="55" width="56" height="5" rx="2.5" fill="#5a2800" opacity="0.5"/>
      {/* Sparkle above */}
      <circle cx="32" cy="7" r="2" fill="#ffe066"/>
      <line x1="32" y1="3" x2="32" y2="5" stroke="#ffe066" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="32" y1="9" x2="32" y2="11" stroke="#ffe066" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="28" y1="7" x2="30" y2="7" stroke="#ffe066" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="34" y1="7" x2="36" y2="7" stroke="#ffe066" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function IconColoring() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Big crayon - center, angled */}
      <rect x="27" y="10" width="11" height="34" rx="3" fill="#ffcc44" transform="rotate(12 32 27)"/>
      <rect x="27" y="10" width="11" height="9" rx="3" fill="#e8a820" transform="rotate(12 32 14)"/>
      <rect x="27" y="10" width="11" height="4" rx="2" fill="#ffaabb" transform="rotate(12 32 12)"/>
      {/* Tip */}
      <polygon points="32,44 28.5,54 35.5,54" fill="#f0c080" transform="rotate(12 32 49)"/>
      <polygon points="32,50 29.5,54 34.5,54" fill="#dd7733" transform="rotate(12 32 52)"/>
      {/* Flower left */}
      <circle cx="10" cy="46" r="5" fill="#ff6090" opacity="0.9"/>
      <circle cx="10" cy="46" r="2.5" fill="#ffe066"/>
      <circle cx="10" cy="40" r="3.5" fill="#ff6090" opacity="0.7"/>
      <circle cx="5" cy="44" r="3" fill="#ff80a0" opacity="0.7"/>
      <circle cx="15" cy="43" r="3" fill="#ff80a0" opacity="0.7"/>
      {/* Flower right - teal */}
      <circle cx="52" cy="44" r="4.5" fill="#20c8a0" opacity="0.9"/>
      <circle cx="52" cy="44" r="2.2" fill="#ffe066"/>
      <circle cx="52" cy="38" r="3" fill="#20c8a0" opacity="0.7"/>
      <circle cx="47" cy="42" r="3" fill="#30d8b0" opacity="0.7"/>
      <circle cx="57" cy="42" r="3" fill="#30d8b0" opacity="0.7"/>
      {/* Color dots */}
      <circle cx="8" cy="20" r="3" fill="#e03060" opacity="0.75"/>
      <circle cx="54" cy="22" r="3" fill="#7030a0" opacity="0.75"/>
      <circle cx="14" cy="30" r="2" fill="#ff9c1a" opacity="0.7"/>
    </svg>
  );
}

function IconCampfire() {
  return (
    <svg viewBox="0 0 64 64" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stars */}
      <circle cx="8" cy="10" r="1.8" fill="white" opacity="0.85"/>
      <circle cx="55" cy="8" r="1.4" fill="white" opacity="0.75"/>
      <circle cx="50" cy="18" r="1.1" fill="white" opacity="0.6"/>
      <circle cx="14" cy="20" r="1" fill="white" opacity="0.55"/>
      {/* Little moon */}
      <path d="M56,14 Q60,18 56,22 Q62,18 56,14Z" fill="white" opacity="0.7"/>
      {/* Crossed logs */}
      <line x1="14" y1="58" x2="42" y2="48" stroke="#5a2800" strokeWidth="6" strokeLinecap="round"/>
      <line x1="50" y1="58" x2="22" y2="48" stroke="#4a2000" strokeWidth="5" strokeLinecap="round"/>
      {/* Flame outer */}
      <path d="M32,50 Q18,40 22,26 Q25,16 32,12 Q39,16 42,26 Q46,40 32,50Z" fill="#ff5500"/>
      {/* Flame mid */}
      <path d="M32,50 Q21,41 25,29 Q28,20 32,16 Q36,20 39,29 Q43,41 32,50Z" fill="#ff8c00"/>
      {/* Flame inner */}
      <path d="M32,48 Q24,40 27,32 Q29,25 32,22 Q35,25 37,32 Q40,40 32,48Z" fill="#ffcc00"/>
      {/* Flame core */}
      <path d="M32,46 Q27,39 29,34 Q31,29 32,27 Q33,29 35,34 Q37,39 32,46Z" fill="#fff0a0"/>
      {/* Cute face on flame */}
      <circle cx="28" cy="36" r="2" fill="#ff5500"/>
      <circle cx="36" cy="36" r="2" fill="#ff5500"/>
      <circle cx="28" cy="36" r="1" fill="#1a0000"/>
      <circle cx="36" cy="36" r="1" fill="#1a0000"/>
      <path d="M27,41 Q32,45 37,41" stroke="#cc4400" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

// ── ADVENTURE MAP strip ───────────────────────────────────────────────────────
const ZONES = [
  {
    id: 'amber',
    icon: <IconAmber />,
    img: null,
    label: "Amber's Mountain",
    hint: 'Play Crystal Rush',
    bg: '#9040c0',
    border: '#b068d8',
  },
  {
    id: 'dragon',
    icon: <IconDragon />,
    img: null,
    label: "Dragon's Town",
    hint: 'Make your Poo Poo Face',
    bg: '#7020a0',
    border: '#a040c0',
  },
  {
    id: 'books',
    icon: <IconBooks />,
    img: null,
    label: 'The Bookshelf',
    hint: 'Find your next read',
    bg: '#f59c1a',
    border: '#ffc040',
  },
  {
    id: 'coloring',
    icon: <IconColoring />,
    img: null,
    label: 'Coloring Meadow',
    hint: 'Free printable pages',
    bg: '#28b090',
    border: '#40d8b0',
  },
  {
    id: 'campfire',
    icon: <IconCampfire />,
    img: null,
    label: 'The Campfire',
    hint: 'Join the family',
    bg: '#7010a0',
    border: '#a030c0',
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
            className="adv-map-btn"
            style={{
              flex: '0 0 auto', scrollSnapAlign: 'start',
              background: z.bg,
              border: `2px solid ${z.border}`,
              borderRadius: '18px',
              padding: '16px 14px 12px',
              cursor: 'pointer', outline: 'none',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              minWidth: '108px', maxWidth: '124px',
              boxShadow: 'none',
              transition: 'transform 0.18s cubic-bezier(.175,.885,.32,1.275)',
              animation: `popIn 0.45s ease-out ${i * 90}ms both`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08) translateY(-4px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            <div style={{ width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {z.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={z.img} alt={z.label} style={{ width: 54, height: 54, objectFit: 'cover', borderRadius: '10px' }} />
              ) : z.icon}
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

  // Fewer clouds, better spaced — only background atmosphere
  const clouds = [
    { top: '8%',  left: '2%',   w: 180, dur: '24s', shape: 0 },
    { top: '18%', right: '4%',  w: 150, dur: '32s', shape: 1 },
    { top: '52%', left: '10%',  w: 130, dur: '38s', shape: 2 },
    { top: '12%', left: '40%',  w: 200, dur: '28s', shape: 0 },
  ];

  const tapCloud = (i: number) => { setPulsed(i); setTimeout(() => setPulsed(null), 500); };
  const tapNarwhal = () => { setWiggle(true); setTimeout(() => setWiggle(false), 750); };

  return (
    <section style={{
      background: 'linear-gradient(180deg, #9de8e0 0%, #c6f4ef 45%, #dcf9f3 100%)',
      minHeight: '100svh', position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingBottom: '120px', paddingTop: '40px',
    }}>
      {/* Drifting clouds — background only, subtle */}
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
            transform: pulsed === i ? 'scale(1.3)' : 'scale(1)',
            transition: 'transform 0.25s cubic-bezier(.175,.885,.32,1.275)',
            cursor: 'pointer', outline: 'none',
            opacity: 0.55,
          }}
        >
          <Cloud shape={c.shape} style={{ width: '100%', height: '100%', position: 'relative' }} />
        </div>
      ))}

      {/* Narwhal — right side, floats freely */}
      <div
        onClick={tapNarwhal}
        role="button" tabIndex={0} aria-label="Tap the narwhal!"
        onKeyDown={e => e.key === 'Enter' && tapNarwhal()}
        style={{
          position: 'absolute',
          right: 'clamp(-80px, -2vw, 20px)',
          top: '50%',
          transform: 'translateY(-52%)',
          zIndex: 1,
          animation: wiggle ? undefined : 'floatBob 4.5s ease-in-out infinite',
          cursor: 'pointer', outline: 'none',
          opacity: 0.92,
        }}
        className={`hero-narwhal-wrap${wiggle ? ' narwhal-wiggle' : ''}`}
      >
        <TiltNarwhal size={420} />
      </div>

      {/* Content block — left on desktop, centered on tablet/mobile */}
      <div className="hero-content-wrap" style={{
        position: 'relative', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        maxWidth: '640px', width: '100%',
        padding: '0 clamp(24px, 6vw, 64px)',
        gap: '0',
      }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: CAT, fontWeight: 800,
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
          color: '#005a4a', letterSpacing: '0.18em',
          textTransform: 'uppercase', opacity: 0.7,
          marginBottom: '10px',
          animation: 'fadeSlideUp 0.6s ease-out both',
        }}>
          ✨ Award-winning kids&apos; books
        </p>

        {/* Title */}
        <h1 style={{
          fontFamily: FF,
          fontSize: 'clamp(2.6rem, 13vw, 8.5rem)',
          color: '#ffffff',
          textShadow: '3px 3px 0 #009380, 7px 7px 0 rgba(0,100,80,0.18)',
          lineHeight: 0.92, marginBottom: '20px',
          letterSpacing: '-0.01em',
          animation: 'fadeSlideUp 0.75s ease-out 0.1s both',
        }}>
          Family<br />Fables
        </h1>

        {/* Tagline */}
        <p className="hero-tagline" style={{
          fontFamily: CAT, fontWeight: 700,
          fontSize: 'clamp(1.05rem, 3.5vw, 1.5rem)',
          color: '#005a4a',
          marginBottom: '36px',
          maxWidth: '420px',
          lineHeight: 1.4,
          animation: 'fadeSlideUp 0.85s ease-out 0.2s both',
        }}>
          Where every bedtime becomes<br />an adventure
        </p>

        {/* Two CTAs */}
        <div className="hero-ctas" style={{
          display: 'flex', gap: '14px', flexWrap: 'wrap',
          animation: 'fadeSlideUp 1s ease-out 0.32s both',
        }}>
          <Link href="/books" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#ff9c1a', color: '#fff',
            padding: '16px 36px', borderRadius: '999px',
            fontFamily: FF, fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(255,156,26,0.45)',
            whiteSpace: 'nowrap',
          }}>
            📚 Browse Books
          </Link>
          <Link href="/read" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(0,147,128,0.15)', color: '#005a4a',
            padding: '16px 32px', borderRadius: '999px',
            fontFamily: FF, fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            textDecoration: 'none',
            border: '2.5px solid #009380',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
          }}>
            📖 Read a Story
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
        animation: 'floatBob 1.8s ease-in-out infinite',
        color: '#009380', pointerEvents: 'none', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      }} aria-hidden>
        <span style={{ fontFamily: CAT, fontWeight: 800, fontSize: '0.72rem', opacity: 0.6, letterSpacing: '0.06em' }}>scroll to explore</span>
        <span style={{ fontSize: '1.4rem' }}>↓</span>
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

        <div className="amber-zone-flex" style={{
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
                  className="amber-zone-img"
                  style={{ width: 'clamp(220px, 38vw, 420px)', height: 'auto', display: 'block' }}
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
  const [quizOpen, setQuizOpen] = useState(false);
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
      paddingTop: '80px', paddingBottom: '240px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
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

      {/* Back city */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax meet"
          style={{ display: 'block', width: '100%', height: 'clamp(200px, 28vw, 320px)' }}>
          <rect x="0" y="270" width="1440" height="50" fill="#2a0040"/>
          {[0,90,200,310,430,545,660,775,890,1000,1110,1220,1340].map((bx, i) => (
            <rect key={i} x={bx} y={80 + (i%4)*30} width={70+(i%3)*20} height={240-(i%4)*30} fill={`hsl(280,${50+i%10}%,${14+i%6}%)`} rx="2"/>
          ))}
          {[90,310,545,775,1000,1220].flatMap((bx, bi) =>
            [[bx+8,110],[bx+28,110],[bx+8,140],[bx+28,140],[bx+8,170],[bx+28,170]].map(([wx,wy],wi) => (
              <rect key={`${bi}${wi}`} x={wx} y={wy} width="13" height="9" rx="2" fill="#ffd060" opacity="0.2"/>
            ))
          )}
        </svg>
      </div>

      {/* Front city with street */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
        <svg viewBox="0 0 1440 280" preserveAspectRatio="xMidYMax meet"
          style={{ display: 'block', width: '100%', height: 'clamp(180px, 24vw, 280px)' }}>
          <rect x="0" y="240" width="1440" height="40" fill="#3d0055"/>
          <rect x="0" y="240" width="1440" height="5" fill="#5a0080" opacity="0.6"/>
          {/* Buildings L */}
          <rect x="0"   y="50"  width="95"  height="190" fill="#560080" rx="2"/>
          <rect x="105" y="95"  width="80"  height="145" fill="#4a0068" rx="2"/>
          <rect x="195" y="130" width="120" height="110" fill="#52007a" rx="2"/>
          {[0,105,195].flatMap((bx,bi) => [60,90,120,150,180].flatMap((wy,ri) =>
            [bx+10,bx+32,bx+54].map((wx,ci) =>
              wx < bx + (bi===2?110:bi===1?70:85) ? (
                <rect key={`lb${bi}${ri}${ci}`} x={wx} y={wy} width="14" height="10" rx="2" fill="#ffd060" opacity={0.5+ci*0.07}/>
              ) : null
            )
          ))}
          {/* Street lamp L */}
          <rect x="330" y="192" width="5" height="48" fill="#7010a0"/>
          <rect x="319" y="192" width="27" height="5" rx="2" fill="#7010a0"/>
          <circle cx="319" cy="192" r="9" fill="#ffd060" opacity="0.9"/>
          <circle cx="319" cy="192" r="16" fill="#ffd060" opacity="0.18"/>
          {/* Buildings R */}
          <rect x="1345" y="50"  width="95"  height="190" fill="#560080" rx="2"/>
          <rect x="1255" y="95"  width="80"  height="145" fill="#4a0068" rx="2"/>
          <rect x="1125" y="130" width="120" height="110" fill="#52007a" rx="2"/>
          {[1345,1255,1125].flatMap((bx,bi) => [60,90,120,150,180].flatMap((wy,ri) =>
            [bx+10,bx+32,bx+54].map((wx,ci) =>
              wx < bx + (bi===2?110:bi===1?70:85) ? (
                <rect key={`rb${bi}${ri}${ci}`} x={wx} y={wy} width="14" height="10" rx="2" fill="#ffd060" opacity={0.5+ci*0.07}/>
              ) : null
            )
          ))}
          {/* Street lamp R */}
          <rect x="1096" y="192" width="5" height="48" fill="#7010a0"/>
          <rect x="1096" y="192" width="27" height="5" rx="2" fill="#7010a0"/>
          <circle cx="1123" cy="192" r="9" fill="#ffd060" opacity="0.9"/>
          <circle cx="1123" cy="192" r="16" fill="#ffd060" opacity="0.18"/>
        </svg>
      </div>

      {/* Dragon — part of the section, no box, PNG blends with purple background */}
      <div
        onClick={tapDragon}
        role="button" tabIndex={0} aria-label="Tap the dragon for a silly face"
        onKeyDown={e => e.key === 'Enter' && tapDragon()}
        style={{
          position: 'absolute',
          top: 'clamp(60px, 8vh, 100px)',
          right: '-3%',
          width: 'clamp(280px, 70vw, 560px)',
          zIndex: 3,
          cursor: 'pointer', outline: 'none',
          animation: 'floatBob 5s ease-in-out infinite 0.3s',
          filter: 'drop-shadow(0 8px 50px rgba(180,0,200,0.4))',
        }}
      >
        {dragonEmoji && (
          <div key={emojiKey} style={{
            position: 'absolute', top: '-60px', right: '15%',
            zIndex: 10, pointerEvents: 'none',
            animation: 'popIn 0.35s cubic-bezier(.175,.885,.32,1.275) both',
          }}>
            <div style={{
              background: 'white', borderRadius: '50%', width: '72px', height: '72px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.6rem', boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
            }}>{dragonEmoji}</div>
            <div style={{
              position: 'absolute', bottom: '-9px', left: '50%', transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
              borderTop: '10px solid white',
            }}/>
          </div>
        )}
        <Image
          src="/images/originals/poo-poo-dragon-flipped.png"
          alt="Poo Poo Dragon" width={1200} height={772}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <p style={{
          position: 'absolute', top: '30%', right: '5%',
          fontFamily: FF, color: '#f0d8fa', fontSize: '0.85rem',
          background: 'rgba(0,0,0,0.4)', padding: '5px 16px', borderRadius: '999px',
          border: '1px solid rgba(255,200,255,0.25)',
          pointerEvents: 'none', margin: 0,
        }}>
          👆 Tap the dragon!
        </p>
      </div>

      {/* ── Content column ── */}
      <div style={{ position: 'relative', zIndex: 8, width: '100%', maxWidth: '700px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Reveal>
          <h2 style={{
            fontFamily: FF, fontSize: 'clamp(2.6rem, 8vw, 5rem)',
            color: '#ffffff', textAlign: 'center', marginBottom: '0',
            textShadow: '3px 3px 0 rgba(0,0,0,0.35)',
          }}>
            The Dragon&apos;s Town
          </h2>
        </Reveal>

        {/* ── Activity buttons — normal flow, below title, left-aligned into tail zone ── */}
        <div className="dragon-activity-reveal-wrap">
        <Reveal delay={160} style={{ alignSelf: 'flex-start', marginTop: 'clamp(55px, 9vw, 85px)', width: 'clamp(220px, 55%, 320px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

            {/* Photo Booth button */}
            <div
              onClick={() => setCameraOpen(true)}
              role="button" tabIndex={0} aria-label="Make your Poo Poo Face with the camera"
              onKeyDown={e => e.key === 'Enter' && setCameraOpen(true)}
              style={{
                cursor: 'pointer', outline: 'none',
                background: '#ff9c1a',
                borderRadius: '16px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
                border: '2px solid rgba(255,220,100,0.5)',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(160deg, #2a0040, #500070)',
                border: '2px solid rgba(255,220,80,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                  <ellipse cx="10" cy="12" rx="2.5" ry="2.8" fill="#ffd060"/>
                  <ellipse cx="18" cy="12" rx="2.5" ry="2.8" fill="#ffd060"/>
                  <path d="M8 18 Q11 22 14 20 Q17 22 20 18" stroke="#ff9c1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ fontFamily: FF, color: '#3a0050', fontSize: 'clamp(0.9rem, 3.4vw, 1.1rem)', lineHeight: 1.1 }}>
                Make Your<br/>Poo Poo Face!
              </div>
            </div>

            {/* Divider */}
            <div style={{ textAlign: 'center', fontFamily: CAT, fontWeight: 800, color: 'rgba(230,180,255,0.7)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>— or —</div>

            {/* Quiz toggle button */}
            <div
              onClick={() => setQuizOpen(o => !o)}
              role="button" tabIndex={0} aria-label="Take the What's Your Face quiz"
              onKeyDown={e => e.key === 'Enter' && setQuizOpen(o => !o)}
              style={{
                cursor: 'pointer', outline: 'none',
                background: 'rgba(100,0,110,0.88)',
                borderRadius: '16px', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: '12px',
                transition: 'all 0.2s',
                border: '2px solid rgba(200,120,240,0.45)',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #ffd060, #ff9c1a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem',
              }}>🤣</div>
              <div>
                <div style={{ fontFamily: FF, color: '#f0d8fa', fontSize: 'clamp(0.9rem, 3.4vw, 1.1rem)', lineHeight: 1.1 }}>
                  What&apos;s Your<br/>Poo Poo Face?
                </div>
                <div style={{ fontFamily: OS, color: 'rgba(220,180,240,0.85)', fontSize: '0.7rem', marginTop: '2px' }}>
                  {quizOpen ? 'tap to close ↑' : 'quiz ↓'}
                </div>
              </div>
            </div>

          </div>
        </Reveal>
        </div>{/* end dragon-activity-reveal-wrap */}

        {/* Quiz — expands below the dragon, full width */}
        {quizOpen && (
          <div style={{ width: '100%', padding: '0 16px', animation: 'popIn 0.3s ease-out both' }}>
            <PooFaceQuiz />
          </div>
        )}

        {/* Book buy strip — full width, below everything */}
        <Reveal delay={240} style={{ width: '100%', padding: '0 16px', marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <Image
              src="/images/wp/whats-your-poopoo-face-400.png"
              alt="What's Your Poo Poo Face" width={100} height={100}
              style={{ width: '64px', height: 'auto', borderRadius: '8px', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: FF, color: '#f0d8fa', fontSize: '0.9rem', marginBottom: '8px', lineHeight: 1.2 }}>
                What&apos;s Your Poo Poo Face?
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="/read/poo-poo-face" style={{
                  display: 'inline-block', background: '#7c3aed', color: '#fff',
                  padding: '7px 18px', borderRadius: '10px', textDecoration: 'none',
                  fontFamily: FF, fontSize: '0.85rem',
                }}>
                  📖 Read It!
                </a>
                <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-block', background: '#ff9c1a', color: '#fff',
                  padding: '7px 18px', borderRadius: '10px', textDecoration: 'none',
                  fontFamily: FF, fontSize: '0.85rem',
                }}>
                  Get on Amazon →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
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

function ZoneReadStory() {
  const books = [
    {
      slug: 'poo-poo-face',
      title: "What's Your Poo Poo Face?",
      cover: '/images/books/poo-poo-face.png',
      color: '#7030a0',
      emoji: '😂',
    },
    {
      slug: 'amber-dragon-keeper',
      title: 'Amber the Dragon Keeper',
      cover: '/images/books/amber-dragon-keeper.png',
      color: '#009380',
      emoji: '🐉',
    },
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #1a0028 0%, #3a0060 50%, #2a0045 100%)',
      position: 'relative', overflow: 'hidden',
      padding: '80px 24px 100px',
    }}>
      {/* Subtle star dots */}
      {[...Array(18)].map((_, i) => (
        <div key={i} aria-hidden style={{
          position: 'absolute',
          left: `${(i * 37 + 11) % 97}%`,
          top: `${(i * 53 + 7) % 75}%`,
          width: 2 + (i % 3),
          height: 2 + (i % 3),
          borderRadius: '50%',
          background: 'white',
          opacity: 0.25 + (i % 4) * 0.1,
          animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite ${i * 0.3}s`,
        }} />
      ))}

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{
              fontFamily: CAT, fontWeight: 800, color: '#d9b7e5',
              fontSize: '0.85rem', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: '12px', opacity: 0.8,
            }}>
              ✨ Interactive Read-Aloud
            </p>
            <h2 style={{
              fontFamily: FF,
              fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
              color: '#ffffff',
              textShadow: '2px 2px 0 rgba(180,100,220,0.4)',
              marginBottom: '14px', lineHeight: 1,
            }}>
              Read a Story 📖
            </h2>
            <p style={{
              fontFamily: CAT, fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              maxWidth: '480px', margin: '0 auto',
            }}>
              Flip the pages, hear the story — free, no downloads needed
            </p>
          </div>
        </Reveal>

        {/* Book cards */}
        <div className="read-story-cards" style={{
          display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: '44px',
        }}>
          {books.map((b, i) => (
            <Reveal key={b.slug} delay={i * 120}>
              <Link href={`/read/${b.slug}`} style={{ textDecoration: 'none' }}>
                <div className="read-story-card" style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: `2px solid ${b.color}`,
                  borderRadius: '20px',
                  padding: '24px 20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                  width: '220px',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-8px) scale(1.03)';
                    el.style.boxShadow = `0 16px 48px ${b.color}55`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(0) scale(1)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <Image
                    src={b.cover}
                    alt={b.title}
                    width={140}
                    height={180}
                    style={{
                      width: 'auto', height: '160px', objectFit: 'contain',
                      filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))',
                    }}
                  />
                  <p style={{
                    fontFamily: FF, color: '#ffffff',
                    fontSize: '0.95rem', textAlign: 'center', lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {b.title}
                  </p>
                  <div style={{
                    background: b.color, color: '#fff',
                    fontFamily: FF, fontSize: '0.9rem',
                    padding: '10px 20px', borderRadius: '999px',
                    width: '100%', textAlign: 'center',
                  }}>
                    {b.emoji} Read Now
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div style={{ textAlign: 'center' }}>
            <Link href="/read" style={{
              fontFamily: CAT, fontWeight: 800,
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none', fontSize: '0.9rem',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}>
              See all stories →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

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
              className="coloring-card-item"
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
              <div className="campfire-inputs-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
      <ZoneReadStory />
      <ZoneColoringMeadow />
      <ZoneCampfire />
    </div>
  );
}
