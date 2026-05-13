'use client';

import Image from 'next/image';
import { books, AMAZON_STORE_URL } from '@/lib/books';
import BedtimeToggle from '@/components/BedtimeToggle';
import TouchBook from '@/components/TouchBook';
import TiltNarwhal from '@/components/TiltNarwhal';
import NewsletterSection from '@/components/NewsletterSection';
import CloudDivider from '@/components/CloudDivider';
import WaveDivider from '@/components/WaveDivider';

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
// Bright orange CTA — used across all buttons
const CTA_ORANGE = '#F7941D';
const CTA_ORANGE_SHADOW = 'rgba(247,148,29,0.45)';

export default function Home() {
  const ff = "'Concert One', var(--font-concert-one), cursive";

  return (
    <div style={{ overflowX: 'hidden' }}>
      <SparkleTrail />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          background: 'linear-gradient(to bottom, #daf8f2 calc(100% - 380px), #d9b5e5 100%)',
          position: 'relative',
          overflow: 'visible',
          minHeight: '92vh',
          paddingBottom: '380px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2,
        }}
      >
        {/* Hero content row */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            zIndex: 2,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: 'clamp(48px, 8vw, 88px) 32px 60px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
          className="hero-content-row"
        >
          {/* Narwhal — the star of the show, goes first (left on desktop, top on mobile) */}
          <div style={{
            flex: '0 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            order: 0,
            maxWidth: '90vw',
          }}>
            <TiltNarwhal size={460} />
          </div>

          {/* Text side */}
          <div style={{ flex: '1 1 280px', maxWidth: '520px', order: 1 }}>
            {/* Fun badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: CTA_ORANGE,
              color: '#fff',
              padding: '6px 18px',
              borderRadius: '50px',
              fontFamily: ff,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              marginBottom: '20px',
              boxShadow: `0 4px 14px ${CTA_ORANGE_SHADOW}`,
            }}>
              ✨ Bedtime just got better
            </div>

            <h1
              style={{
                fontFamily: ff,
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.08,
                color: '#007d68',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              Books That Make Kids Giggle & Parents Cheer
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: '#006e59',
                marginBottom: '36px',
                lineHeight: 1.65,
                maxWidth: '420px',
              }}
            >
              Weird. Warm. Wonderful. The books kids demand at bedtime — every single night.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="#books"
                className="btn-scale-pulse btn-shine active:scale-95 transition-transform"
                style={{
                  display: 'inline-block',
                  background: CTA_ORANGE,
                  color: '#ffffff',
                  padding: '16px 40px',
                  borderRadius: '50px',
                  fontFamily: ff,
                  fontSize: '1.15rem',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  boxShadow: `0 6px 24px ${CTA_ORANGE_SHADOW}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                See the Books →
              </a>
              <a
                href="#about"
                style={{
                  fontFamily: ff,
                  fontSize: '1rem',
                  color: '#007d68',
                  textDecoration: 'none',
                  opacity: 0.8,
                  letterSpacing: '0.02em',
                }}
              >
                Our story ↓
              </a>
            </div>

            {/* Social proof */}
            <div style={{
              marginTop: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex' }}>
                {['⭐','⭐','⭐','⭐','⭐'].map((s,i) => (
                  <span key={i} style={{ fontSize: '1rem' }}>{s}</span>
                ))}
              </div>
              <span style={{ fontFamily: ff, fontSize: '0.88rem', color: '#007d68', opacity: 0.85 }}>
                Loved by thousands of families
              </span>
            </div>

            {/* Value-prop chips */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { icon: '🎨', label: 'Free Kids Activities', href: '/activities' },
                { icon: '📖', label: 'Read-Aloud Friendly', href: null },
                { icon: '😂', label: 'Parents Love Them Too', href: null },
              ].map(({ icon, label, href }) => {
                const style = {
                  display: 'inline-flex' as const,
                  alignItems: 'center' as const,
                  gap: '6px',
                  background: 'rgba(0,125,104,0.1)',
                  border: '1.5px solid rgba(0,125,104,0.25)',
                  color: '#006e59',
                  padding: '6px 14px',
                  borderRadius: '50px',
                  fontFamily: ff,
                  fontSize: '0.82rem',
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  cursor: href ? 'pointer' : 'default',
                };
                return href
                  ? <a key={label} href={href} style={style}><span>{icon}</span> {label}</a>
                  : <div key={label} style={style}><span>{icon}</span> {label}</div>;
              })}
            </div>
          </div>
        </div>

        {/* Clouds at bottom of hero → lavender matches books section bg */}
        <CloudDivider fill="#d9b5e5" fillBack="#e8d0f2" />
      </section>

      {/* ── SECTION 2: BOOKS GRID ───────────────────────────────────── */}
      <section
        id="books"
        style={{
          background: 'linear-gradient(to bottom, #d9b5e5 0px, #d9b5e5 384px, #78087c 100%)',
          position: 'relative',
          marginTop: '-384px',
          paddingTop: '384px',
          paddingBottom: '380px',
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
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(225px, calc(50vw - 20px)), 1fr))',
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
        {/* Wave at bottom of books → mint matches about section bg */}
        <WaveDivider fill="#daf8f2" />
      </section>

      {/* ── SECTION 3: CHARACTER / ABOUT ────────────────────────────── */}
      <section
        id="about"
        style={{
          background: '#daf8f2',
          marginTop: '-384px',
          paddingTop: '384px',
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
                background: CTA_ORANGE,
                color: '#ffffff',
                padding: '14px 36px',
                borderRadius: '50px',
                fontFamily: ff,
                fontSize: '1.05rem',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                boxShadow: `0 4px 18px ${CTA_ORANGE_SHADOW}`,
              }}
              className="active:scale-95 transition-transform"
            >
              Browse All Books →
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

