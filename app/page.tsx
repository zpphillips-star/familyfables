'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { books, AMAZON_STORE_URL } from '@/lib/books';

// ── SVG Atoms ──────────────────────────────────────────────────────────────

function StarSVG({ size = 28, color = '#F4A839', pulse = false }: {
  size?: number; color?: string; pulse?: boolean;
}) {
  const [burst, setBurst] = useState(false);
  const fire = () => { setBurst(true); setTimeout(() => setBurst(false), 500); };
  return (
    <svg width={size} height={size} viewBox="0 0 28 28"
      className={`${pulse ? 'star-pulse' : ''} ${burst ? 'star-burst' : ''} select-none`}
      style={{ cursor: 'pointer', display: 'block' }}
      onClick={fire} onTouchStart={(e) => { e.preventDefault(); fire(); }} aria-hidden>
      <polygon points="14,2 17.1,10.5 26,10.7 19.2,16.5 21.5,25.4 14,20.5 6.5,25.4 8.8,16.5 2,10.7 10.9,10.5" fill={color}/>
    </svg>
  );
}

function Sparkle4({ size = 20, color = '#F4A839', className = '' }: {
  size?: number; color?: string; className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden fill={color}>
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"/>
    </svg>
  );
}

function MoonSVG({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" aria-hidden fill="none">
      <path d="M32 6 C22 8 15 18 17 29 C19 40 29 46 40 44 C29 49 16 43 11 32 C6 21 13 7 24 4 C27 3 30 4 32 6 Z"
        fill="#F4DAFF" opacity="0.85"/>
      <circle cx="38" cy="12" r="2.5" fill="#F4DAFF" opacity="0.4"/>
      <circle cx="43" cy="22" r="1.5" fill="#F4DAFF" opacity="0.3"/>
    </svg>
  );
}

function RainbowSVG({ className = '' }: { className?: string }) {
  const [shimmer, setShimmer] = useState(false);
  const fire = () => { setShimmer(true); setTimeout(() => setShimmer(false), 600); };
  return (
    <svg width="240" height="88" viewBox="0 0 240 88"
      className={`${shimmer ? 'rainbow-shimmer' : ''} select-none ${className}`}
      style={{ cursor: 'pointer', display: 'block' }}
      onClick={fire} onTouchStart={(e) => { e.preventDefault(); fire(); }} aria-hidden>
      <path d="M8,78 Q120,-14 232,78"  stroke="#FF6B9D" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M14,81 Q120,-4 226,81"  stroke="#F4A839" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M20,83 Q120,5 220,83"   stroke="#FFE066" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M26,85 Q120,14 214,85"  stroke="#66D9A0" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M32,86 Q120,22 208,86"  stroke="#4CC9C9" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7"/>
      <path d="M38,87 Q120,30 202,87"  stroke="#9B6FD0" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7"/>
    </svg>
  );
}

// ── Cloud Divider ──────────────────────────────────────────────────────────
function CloudDivider({ fill }: { fill: string }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden style={{ zIndex: 5 }}>
      <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <path d="M0,160 L0,108 C25,92 50,72 82,75 C108,78 125,94 153,97 C180,100 202,84 230,77 C258,70 282,73 308,83 C330,92 348,106 377,109 C406,112 428,98 456,91 C484,84 510,86 536,96 C559,104 576,116 605,118 C632,120 655,107 682,100 C710,93 736,95 762,105 C786,114 803,125 830,127 C857,129 879,116 907,109 C935,102 962,104 989,114 C1012,122 1029,133 1057,135 C1085,137 1109,124 1137,117 C1165,110 1192,112 1219,121 C1242,129 1259,140 1287,141 C1315,142 1342,131 1369,124 C1395,117 1418,118 1440,126 L1440,160 Z" fill={fill}/>
      </svg>
    </div>
  );
}

// ── Cursor / Touch Sparkle Trail ───────────────────────────────────────────
type Spark = { id: number; x: number; y: number; rot: number; size: number; color: string };
const SPARK_COLORS = ['#F4A839', '#FF6B9D', '#4CC9C9', '#C084FC', '#66D9A0', '#FFE066'];

function SparkleTrail() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const add = (x: number, y: number) => {
      const now = Date.now();
      if (now - lastTime < 55) return;
      lastTime = now;
      const s: Spark = {
        id: now + Math.random(),
        x, y,
        rot: Math.random() * 360,
        size: 10 + Math.random() * 14,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      };
      setSparks(prev => [...prev.slice(-14), s]);
      setTimeout(() => setSparks(prev => prev.filter(p => p.id !== s.id)), 650);
    };
    const onMove  = (e: MouseEvent) => add(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => { for (const t of Array.from(e.touches)) add(t.clientX, t.clientY); };
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

// ── Interactive Narwhal (uses the REAL logo) ──────────────────────────────
type Bubble = { id: number; x: number; size: number };

function InteractiveNarwhal() {
  const [jumping, setJumping] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const interact = () => {
    if (jumping) return;
    setJumping(true);
    const newBubs: Bubble[] = Array.from({ length: 4 + Math.floor(Math.random() * 3) }, (_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 32,
      size: 10 + Math.random() * 16,
    }));
    setBubbles(prev => [...prev, ...newBubs]);
    setTimeout(() => setJumping(false), 900);
    setTimeout(() => setBubbles(prev => prev.filter(b => !newBubs.find(n => n.id === b.id))), 1600);
  };

  return (
    <div className="relative inline-block select-none" style={{ cursor: 'pointer' }}
      onClick={interact} onTouchStart={(e) => { e.preventDefault(); interact(); }}>
      {/* Hint */}
      <div className="absolute -top-9 left-1/2 text-sm font-bold pointer-events-none whitespace-nowrap"
        style={{ transform: 'translateX(-50%)', color: '#A8E8EC', opacity: 0.85 }}>
        tap me!
      </div>

      <Image
        src="/images/logo-teal.png"
        alt="Family Fables narwhal mascot"
        width={340}
        height={340}
        style={{
          maxWidth: '88vw',
          filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.35))',
          transition: 'transform 0.18s cubic-bezier(.36,.07,.19,.97)',
          transform: jumping ? 'translateY(-34px) rotate(-8deg) scale(1.06)' : 'none',
        }}
      />

      {/* Rising bubbles */}
      {bubbles.map(b => (
        <div key={b.id} className="absolute pointer-events-none bubble-rise"
          style={{ left: `${b.x}%`, bottom: '60%', width: b.size, height: b.size }}>
          <svg viewBox="0 0 20 20" width={b.size} height={b.size} aria-hidden>
            <circle cx="10" cy="10" r="8" fill="none" stroke="#A8ECEC" strokeWidth="2" opacity="0.8"/>
            <circle cx="7"  cy="7"  r="2" fill="white" opacity="0.5"/>
          </svg>
        </div>
      ))}
    </div>
  );
}

// ── Interactive Bubble (in narwhal section) ────────────────────────────────
function InteractiveBubble({ left, right, top, size, delay }: {
  left?: string; right?: string; top: string; size: number; delay: string;
}) {
  const [popped, setPopped] = useState(false);
  const pop = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (popped) return;
    setPopped(true);
    setTimeout(() => setPopped(false), 500);
  };
  return (
    <div className={`absolute float-${delay} select-none`}
      style={{ left, right, top, cursor: 'pointer', zIndex: 2, opacity: 0.3 }}
      onClick={pop} onTouchStart={pop}>
      <svg width={size} height={size} viewBox="0 0 24 24"
        className={popped ? 'bubble-pop' : ''}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#4CC9C9" strokeWidth="2.5"/>
        <circle cx="8"  cy="8"  r="3"  fill="white" opacity="0.4"/>
      </svg>
    </div>
  );
}

// ── Hero Book (click to reveal) ────────────────────────────────────────────
function HeroBook({ book, style, animClass }: {
  book: typeof books[0];
  style: React.CSSProperties;
  animClass: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setOpen(o => !o);
  };
  return (
    <div className={`hero-book-wrap rounded-2xl overflow-hidden shadow-2xl ${animClass}`}
      style={{ ...style, cursor: 'pointer' }}
      onClick={toggle} onTouchStart={toggle}>
      {book.image && (
        <Image src={book.image} alt={book.title} fill className="object-cover" sizes="220px"/>
      )}
      <div className={`book-reveal-overlay ${open ? 'book-reveal-open' : ''}`}>
        <span className="text-white font-bold text-sm leading-snug block mb-2">{book.title}</span>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: '#F4A839', color: '#2D0D6B' }}>
          See this book
        </span>
      </div>
    </div>
  );
}

// ── Interactive Book Card (flip on tap) ───────────────────────────────────
function InteractiveBookCard({ book }: { book: typeof books[0] }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setFlipped(f => !f);
  };
  return (
    <div className="book-card-3d select-none" style={{ height: 380, cursor: 'pointer' }}
      onClick={toggle} onTouchStart={toggle}>
      <div className={`book-card-inner ${flipped ? 'book-card-flipped' : ''}`}>
        {/* Front */}
        <div className="book-card-face book-card-front rounded-2xl overflow-hidden"
          style={{ boxShadow: `0 6px 28px ${book.accentColor}28` }}>
          <div className="relative h-64 flex items-center justify-center"
            style={{ backgroundColor: `${book.accentColor}18` }}>
            {book.image && (
              <Image src={book.image} alt={book.title} fill
                className="object-contain p-4" sizes="280px"/>
            )}
            {book.tag && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: book.accentColor }}>
                {book.tag}
              </div>
            )}
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs font-semibold opacity-40"
              style={{ color: book.accentColor }}>
              tap to open
            </div>
          </div>
          <div className="p-4 bg-white">
            <h3 className="font-bold text-base leading-snug" style={{ color: '#2D1B69' }}>{book.title}</h3>
          </div>
        </div>
        {/* Back */}
        <div className="book-card-face book-card-back rounded-2xl overflow-hidden flex flex-col"
          style={{ backgroundColor: book.accentColor, boxShadow: `0 6px 28px ${book.accentColor}50` }}>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl text-white mb-3"
                style={{ fontFamily: 'var(--font-fredoka), cursive' }}>
                {book.title}
              </h3>
              <p className="text-sm leading-relaxed text-white opacity-90">{book.description}</p>
            </div>
            <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="btn-shine mt-4 block text-center py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: 'white', color: book.accentColor }}>
              Get This Book on Amazon →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  // Parallax on mouse move — books shift slightly relative to cursor
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      setPx((e.clientX - cx) / cx * 12);
      setPy((e.clientY - cy) / cy * 8);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <>
      <SparkleTrail />
      <div style={{ overflowX: 'hidden' }}>

        {/* ─── HERO ────────────────────────────────────────────────────── */}
        <section className="relative" style={{
          background: 'linear-gradient(160deg, #9B3FCF 0%, #5A1FA0 35%, #2D0D6B 70%, #1C0A4F 100%)',
          minHeight: '92vh', paddingBottom: '180px',
        }}>
          {/* SVG decorations — all clickable */}
          <div className="absolute top-8 left-8 float-slow">       <StarSVG size={34} color="#F4A839" pulse /></div>
          <div className="absolute top-14 right-20 float-mid opacity-70"><MoonSVG size={56} /></div>
          <div className="absolute top-1/3 left-4 float-fast opacity-50">  <Sparkle4 size={22} color="#C084FC" /></div>
          <div className="absolute top-1/2 right-8 float-slow opacity-55"><StarSVG size={24} color="#4CC9C9" /></div>
          <div className="absolute top-3/4 left-24 float-mid opacity-40"> <Sparkle4 size={18} color="#FF6B9D" /></div>
          <div className="absolute top-1/4 right-1/3 float-fast opacity-30"><Sparkle4 size={14} color="#FFE066" /></div>
          <div className="absolute top-6 left-1/3 opacity-15">            <RainbowSVG /></div>

          {/* Hero layout */}
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-8 flex flex-col lg:flex-row items-center gap-10 min-h-[80vh]">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left z-10">
              {/* Real logo in hero */}
              <div className="flex justify-center lg:justify-start mb-6">
                <Image
                  src="/images/logo-teal.png"
                  alt="Family Fables"
                  width={100}
                  height={100}
                  className="float-slow"
                  style={{ filter: 'drop-shadow(0 4px 16px rgba(76,201,201,0.5))' }}
                />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#FFFFFF' }}>
                Stories That<br/>
                <span style={{ color: '#F4A839' }}>Spark</span> Every<br/>
                <span style={{ color: '#4CC9C9' }}>Imagination</span>
              </h1>
              <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: '#D4C5F0' }}>
                Joyful, whimsical children's books that warm little hearts
                and create lasting family memories — one story at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/books"
                  className="btn-shine px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:-translate-y-1"
                  style={{ backgroundColor: '#F4A839', color: '#2D1B69' }}>
                  Explore Our Books
                </Link>
                <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
                  className="px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all hover:-translate-y-1"
                  style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#FFFFFF' }}>
                  Shop on Amazon →
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start text-sm font-semibold"
                style={{ color: '#C4B3E8' }}>
                <span className="flex items-center gap-1.5"><StarSVG size={14} color="#C4B3E8"/>11 Books Published</span>
                <span className="flex items-center gap-1.5"><Sparkle4 size={13} color="#C4B3E8"/>Ages 2–8</span>
                <span className="flex items-center gap-1.5"><Sparkle4 size={13} color="#C4B3E8"/>Ships Worldwide</span>
              </div>
            </div>

            {/* Books (parallax on mouse move, tap to reveal title) */}
            <div className="flex-1 flex justify-center items-end relative z-10" style={{ minHeight: 440 }}>
              <HeroBook book={books[2]} animClass="float-slow" style={{
                width: 158, height: 206, zIndex: 1, opacity: 0.88,
                transform: `rotate(-16deg) translate(calc(-112px + ${px * -1.2}px), calc(18px + ${py * 0.8}px))`,
              }}/>
              <HeroBook book={books[4]} animClass="float-mid" style={{
                width: 154, height: 202, zIndex: 1, opacity: 0.85,
                transform: `rotate(15deg) translate(calc(112px + ${px * 1.2}px), calc(14px + ${py * 0.6}px))`,
              }}/>
              <HeroBook book={books[5]} animClass="float-fast" style={{
                width: 138, height: 182, zIndex: 0, opacity: 0.52,
                transform: `rotate(-4deg) translate(calc(54px + ${px * 0.7}px), calc(-76px + ${py * -0.5}px))`,
              }}/>
              <HeroBook book={books[0]} animClass="float-slow" style={{
                width: 224, height: 292, zIndex: 20, marginBottom: -110,
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(244,168,57,0.35)',
                transform: `translate(${px * -0.4}px, ${py * -0.3}px)`,
              }}/>
            </div>
          </div>
          <CloudDivider fill="#FDF6EE"/>
        </section>

        {/* ─── BOOKS GRID (warm cream) ───────────────────────────────── */}
        <section className="relative pt-28 pb-20 px-4" style={{ backgroundColor: '#FDF6EE', zIndex: 4 }}>
          <div className="absolute top-10 right-12 float-slow opacity-22">  <RainbowSVG /></div>
          <div className="absolute top-20 left-10 float-mid opacity-18"> <StarSVG size={32} color="#9B5FD4"/></div>
          <div className="absolute bottom-24 right-16 float-fast opacity-15"><Sparkle4 size={24} color="#FF6B9D"/></div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#3B1A8C' }}>
                Books Kids Love
              </h2>
              <p className="text-base max-w-md mx-auto" style={{ color: '#7B6898' }}>
                Tap any book to open it and find out what it's about.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.filter(b => b.image).slice(0, 6).map(book => (
                <InteractiveBookCard key={book.id} book={book}/>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/books"
                className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1"
                style={{ backgroundColor: '#7B2FBE', color: '#FFFFFF' }}>
                See All 11 Books
              </Link>
            </div>
          </div>
          <CloudDivider fill="#0E7C8A"/>
        </section>

        {/* ─── NARWHAL (teal ocean) ──────────────────────────────────── */}
        <section className="relative pt-36 pb-36 px-4 overflow-hidden" style={{
          background: 'linear-gradient(160deg, #0E7C8A 0%, #0A5C70 50%, #073D52 100%)',
        }}>
          {/* Bubbles — each pops on tap */}
          <InteractiveBubble left="7%"  top="20%" size={20} delay="slow"/>
          <InteractiveBubble left="15%" top="63%" size={28} delay="mid"/>
          <InteractiveBubble right="10%" top="27%" size={22} delay="fast"/>
          <InteractiveBubble right="4%" top="70%" size={14} delay="slow"/>
          <InteractiveBubble left="44%" top="13%" size={12} delay="mid"/>
          <InteractiveBubble left="68%" top="73%" size={18} delay="fast"/>

          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 flex justify-center lg:justify-end">
              <InteractiveNarwhal/>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
                style={{ backgroundColor: '#F4A839', color: '#073D52' }}>
                Where Stories Come Alive
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#FFFFFF' }}>
                Every book is a little<br/>
                <span style={{ color: '#4CC9C9' }}>world to dive into</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#A8E8EC' }}>
                Funny, heartwarming, and full of the kind of magic that only happens
                when you open a book together. Family Fables was built for those moments.
              </p>
              <Link href="/books"
                className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
                style={{ backgroundColor: '#F4A839', color: '#073D52' }}>
                Dive In
              </Link>
            </div>
          </div>
          <CloudDivider fill="#F0E8FF"/>
        </section>

        {/* ─── ABOUT (lavender → deep purple) ──────────────────────── */}
        <section className="relative pt-32 pb-36 px-4 text-center" style={{
          background: 'linear-gradient(160deg, #F0E8FF 0%, #D4B8F5 28%, #9B5FD4 62%, #5A1FA0 100%)',
        }}>
          <div className="absolute top-14 left-14 float-slow opacity-30"><StarSVG size={36} color="#FFFFFF"/></div>
          <div className="absolute top-22 right-16 float-mid opacity-22"><Sparkle4 size={26} color="#F4A839"/></div>
          <div className="absolute bottom-28 left-20 float-fast opacity-18"><Sparkle4 size={18} color="#FFFFFF"/></div>
          <div className="absolute top-1/2 left-6 opacity-10 pointer-events-none"><RainbowSVG/></div>

          {/* Book floating up from the teal section below */}
          <div className="absolute -top-16 left-1/2 float-slow z-10 pointer-events-none"
            style={{ transform: 'translateX(-50%) rotate(5deg)' }}>
            <div className="w-28 h-36 rounded-xl overflow-hidden shadow-2xl opacity-60" style={{ position: 'relative' }}>
              {books[1]?.image && (
                <Image src={books[1].image} alt="" fill className="object-cover" sizes="112px"/>
              )}
            </div>
          </div>

          <div className="max-w-3xl mx-auto relative z-10 pt-10">
            {/* Purple logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-purple.png"
                alt="Family Fables"
                width={90}
                height={90}
                style={{ filter: 'drop-shadow(0 4px 16px rgba(45,13,107,0.3))' }}
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5"
              style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#2D0D6B' }}>
              Stories Built on a Family Legacy
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#4A2080' }}>
              Family Fables was inspired by Z.P. Phillips' grandfather — a creative soul
              who spent his life writing poems and stories that the world never got to read.
              That legacy of imagination and love is woven into every book we publish.
            </p>
            <Link href="/about"
              className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:opacity-90"
              style={{ backgroundColor: '#F4A839', color: '#2D0D6B' }}>
              Our Story →
            </Link>
          </div>
          <CloudDivider fill="#F4A839"/>
        </section>

        {/* ─── SHOP CTA (warm gold) ─────────────────────────────────── */}
        <section className="relative pt-28 pb-20 px-4 text-center" style={{
          background: 'linear-gradient(135deg, #F4A839 0%, #F0842A 60%, #E06A1A 100%)',
        }}>
          <div className="absolute top-12 left-14 float-mid opacity-35"><Sparkle4 size={28} color="white"/></div>
          <div className="absolute top-16 right-12 float-slow opacity-28"><StarSVG size={26} color="white"/></div>
          <div className="absolute bottom-14 left-1/4 float-fast opacity-22"><Sparkle4 size={20} color="#2D0D6B"/></div>

          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#2D0D6B' }}>
              Ready to Start Reading?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#5C2A00' }}>
              All Family Fables books are available on Amazon.
              Perfect for birthdays, holidays, or just because.
            </p>
            <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
              className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:-translate-y-1"
              style={{ backgroundColor: '#2D0D6B', color: '#FFFFFF' }}>
              Shop All Books on Amazon
            </a>
          </div>
        </section>

      </div>
    </>
  );
}

