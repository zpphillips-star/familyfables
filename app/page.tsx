'use client';

import Image from 'next/image';
import { books, AMAZON_STORE_URL } from '@/lib/books';
import BedtimeToggle from '@/components/BedtimeToggle';
import TouchBook from '@/components/TouchBook';
import TiltNarwhal from '@/components/TiltNarwhal';
import NewsletterSection from '@/components/NewsletterSection';

// ── Section Clouds ──────────────────────────────────────────────────────────
// Real cloud look: multiple overlapping ellipses at the bottom of each section.
// All ellipses have cy = viewBox height (200) so only their top halves show.
// Overlapping ellipses of varied sizes = organic bumpy cloud silhouette.
// Back layer (tallest CSS height) peeks above front layer for depth effect.
function SectionClouds({ fill, backFill }: { fill: string; backFill?: string }) {
  const totalH = backFill ? 320 : 140;
  const vb = 220; // viewBox height; ellipse centers sit at cy=220

  // Front clouds — dramatic size variation: huge puffs, tiny puffs, medium
  // ry range 65–200 so the big ones loom and the small ones sit daintily
  const front = [
    { cx:   30, rx: 155, ry: 175 },  // big — left anchor
    { cx:  270, rx:  88, ry:  70 },  // tiny — small puff
    { cx:  430, rx: 195, ry: 200 },  // HUGE — dominant center-left cloud
    { cx:  680, rx: 105, ry:  85 },  // small-medium
    { cx:  860, rx: 230, ry: 190 },  // HUGE — dominant center-right cloud
    { cx: 1080, rx:  80, ry:  65 },  // tiny — gap filler
    { cx: 1230, rx: 185, ry: 168 },  // large
    { cx: 1430, rx: 110, ry:  95 },  // medium — right edge
  ];

  // Back clouds — also varied, phase-shifted to fill gaps between front
  // tallest CSS height so their peaks poke above front layer for depth
  const back = [
    { cx:  140, rx: 170, ry: 155 },  // large — peeks in left gap
    { cx:  360, rx: 130, ry: 118 },  // medium
    { cx:  570, rx: 200, ry: 180 },  // HUGE back cloud (visible in gap between front big ones)
    { cx:  780, rx:  95, ry:  80 },  // small
    { cx:  970, rx: 175, ry: 158 },  // large — fills center-right gap
    { cx: 1155, rx: 120, ry: 105 },  // medium
    { cx: 1340, rx: 160, ry: 148 },  // large — right anchor
  ];

  const frontH = Math.round(totalH * 0.80) + 2;

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${totalH}px`, pointerEvents: 'none', zIndex: 2 }}>
      {/* BACK — full totalH so its peaks poke above the front layer */}
      {backFill && (
        <svg viewBox={`0 0 1440 ${vb}`} preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: `${totalH}px`, display: 'block' }}>
          {back.map((c, i) => <ellipse key={i} cx={c.cx} cy={vb} rx={c.rx} ry={c.ry} fill={backFill} />)}
          <rect x="0" y={vb - 2} width="1440" height="6" fill={backFill} />
        </svg>
      )}
      {/* FRONT — shorter CSS height, larger ry → dominant bumpy cloud look */}
      <svg viewBox={`0 0 1440 ${vb}`} preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: -2, left: 0, width: '100%', height: `${frontH}px`, display: 'block' }}>
        {front.map((c, i) => <ellipse key={i} cx={c.cx} cy={vb} rx={c.rx} ry={c.ry} fill={fill} />)}
        <rect x="0" y={vb - 2} width="1440" height="6" fill={fill} />
      </svg>
    </div>
  );
}

// ── Sparkle Trail ──────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

type Spark = { id: number; x: number; y: number; rot: number; size: number; color: string };
const SPARK_COLORS = ['#007d68', '#d9b5e5', '#78087c', '#daf8f2', '#006e59', '#a8e8dc'];

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

// ── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const ff = "'Concert One', var(--font-concert-one), cursive";

  return (
    <div style={{ overflowX: 'hidden' }}>
      <SparkleTrail />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          background: 'linear-gradient(to bottom, #daf8f2 calc(100% - 320px), #d9b5e5 100%)',
          position: 'relative',
          overflow: 'visible',
          minHeight: '92vh',
          paddingBottom: '320px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        {/* Narwhal watermark — large decorative bg element, positioned left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            left: '-6%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '52%',
            maxWidth: '560px',
            opacity: 0.12,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <Image
            src="/images/originals/detail-logo-860.png"
            alt=""
            width={860}
            height={860}
            style={{ width: '100%', height: 'auto' }}
            priority
          />
        </div>

        {/* Hero content row */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            zIndex: 2,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(60px, 10vw, 100px) 32px 60px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          {/* Text side */}
          <div style={{ flex: '1 1 300px', maxWidth: '580px' }}>
            <h1
              style={{
                fontFamily: ff,
                fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                lineHeight: 1.1,
                color: '#007d68',
                marginBottom: '24px',
                letterSpacing: '-0.01em',
              }}
            >
              Stories That Make Kids Smile (and Parents Laugh)
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                color: '#006e59',
                marginBottom: '40px',
                lineHeight: 1.65,
                maxWidth: '460px',
              }}
            >
              Award-winning children&apos;s books with heart, humor, and a little bit of weird.
            </p>
            <a
              href="#books"
              className="btn-scale-pulse btn-shine"
              style={{
                display: 'inline-block',
                background: '#007d68',
                color: '#ffffff',
                padding: '16px 44px',
                borderRadius: '50px',
                fontFamily: ff,
                fontSize: '1.2rem',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                boxShadow: '0 6px 24px rgba(0,125,104,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              See the Books
            </a>
          </div>

          {/* Interactive narwhal mascot */}
          <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TiltNarwhal />
          </div>
        </div>

        {/* Clouds at bottom of hero — lavender front + lighter lavender back */}
        <SectionClouds fill="#d9b5e5" backFill="#e8d0f2" />
      </section>

      {/* ── SECTION 2: BOOKS GRID ───────────────────────────────────── */}
      <section
        id="books"
        style={{
          background: 'linear-gradient(172deg, #d9b5e5 0%, #78087c 100%)',
          position: 'relative',
          marginTop: '-324px',
          paddingTop: '324px',
          paddingBottom: '320px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '60px 32px 40px',
          }}
        >
          <h2
            style={{
              fontFamily: ff,
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '56px',
              textShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}
          >
            The Books
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
              gap: '28px',
            }}
          >
            {books.map(book => (
              <TouchBook
                key={book.id}
                title={book.title}
                cover={book.image}
                ageRange={book.ageRange}
                backContent={book.hook}
                amazonUrl={AMAZON_STORE_URL}
                accentColor={book.accentColor}
                tag={book.tag}
              />
            ))}
          </div>
        </div>
        {/* Clouds at bottom of books — mint front + lavender back */}
        <SectionClouds fill="#daf8f2" backFill="#d9b5e5" />
      </section>

      {/* ── SECTION 3: CHARACTER / ABOUT ────────────────────────────── */}
      <section
        style={{
          background: '#daf8f2',
          marginTop: '-324px',
          paddingTop: '324px',
          position: 'relative',
          zIndex: 0,
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '60px',
            flexWrap: 'wrap',
          }}
        >
          {/* Purple logo as brand visual */}
          <div
            style={{
              flex: '0 0 auto',
              width: 'clamp(180px, 28vw, 280px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/originals/2020-all-purple-logo.png"
              alt="Family Fables logo"
              width={500}
              height={500}
              style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 8px 24px rgba(120,8,124,0.18))' }}
            />
          </div>

          {/* About text */}
          <div style={{ flex: '1 1 280px' }}>
            <h2
              style={{
                fontFamily: ff,
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                color: '#007d68',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              Made for Real Family Moments
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#006e59',
                lineHeight: 1.75,
                marginBottom: '16px',
              }}
            >
              Family Fables was born out of a simple idea: books should be as fun for the grown-up reading them as for the kid listening. We write stories that are weird, warm, and just a little bit silly — exactly the way bedtime should be.
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                color: '#007d68',
                lineHeight: 1.75,
              }}
            >
              Every book is written to be read out loud — with voices, sound effects, and at least one moment where you look up to see if they&apos;re laughing too. (They are.)
            </p>
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '28px',
                background: '#78087c',
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: '50px',
                fontFamily: ff,
                fontSize: '1.05rem',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                boxShadow: '0 4px 18px rgba(120,8,124,0.3)',
              }}
            >
              Browse All Books
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: NEWSLETTER ───────────────────────────────────── */}
      <NewsletterSection />

      <BedtimeToggle />
    </div>
  );
}
