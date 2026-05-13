'use client';

import Image from 'next/image';
import { books, AMAZON_STORE_URL } from '@/lib/books';
import BedtimeToggle from '@/components/BedtimeToggle';
import TouchBook from '@/components/TouchBook';
import TiltNarwhal from '@/components/TiltNarwhal';
import CloudDivider from '@/components/CloudDivider';
import WaveDivider from '@/components/WaveDivider';

// ── Sparkle Trail ──────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

type Spark = { id: number; x: number; y: number; rot: number; size: number; color: string };
const SPARK_COLORS = ['#009380', '#d9b7e5', '#78087c', '#dcf9f3', '#006e59', '#a8e8dc'];

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

// ── Subscribe Section ──────────────────────────────────────────────────────
function SubscribeSection() {
  const ff = "'Concert One', var(--font-concert-one), cursive";
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      id="subscribe"
      style={{
        background: 'linear-gradient(135deg, #78087c 0%, #a935a6 100%)',
        position: 'relative',
        paddingTop: '420px',
        paddingBottom: '80px',
        marginTop: '-380px',
        zIndex: 0,
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: ff,
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '8px',
            lineHeight: 1.1,
          }}
        >
          Subscribe
        </h2>
        <h2
          style={{
            fontFamily: ff,
            fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
            color: '#dbdbdb',
            marginBottom: '40px',
            lineHeight: 1.2,
          }}
        >
          For Updates and Giveaways
        </h2>

        {submitted ? (
          <div style={{ padding: '32px', background: 'rgba(255,255,255,0.15)', borderRadius: '12px' }}>
            <h2 style={{ fontFamily: ff, color: '#ffffff', fontSize: '1.8rem' }}>Success!</h2>
            <p style={{ color: '#dcf9f3', marginTop: '8px' }}>You&apos;re in the family now — watch your inbox!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '6px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '1rem',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '6px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '1rem',
                  outline: 'none',
                  width: '100%',
                }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '6px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#ffffff',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '1rem',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  background: '#ff9c1a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: ff,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
const ORANGE = '#ff9c1a';

export default function Home() {
  const ff = "'Concert One', var(--font-concert-one), cursive";

  // Featured book — "What's Your Poo Poo Face" (Now Available)
  const featuredBook = books.find(b => b.id === 'poo-poo-face')!;

  // Best Sellers grid — Dream Ideas, Amber, Finding Hampton
  const bestSellers = books.filter(b =>
    ['dream-ideas', 'amber-dragon-keeper', 'finding-hampton'].includes(b.id)
  );

  return (
    <div style={{ overflowX: 'hidden' }}>
      <SparkleTrail />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          background: '#dcf9f3',
          position: 'relative',
          overflow: 'hidden',
          paddingBottom: '200px',
          zIndex: 2,
        }}
      >
        {/* Hero: narwhal top-center, text below — works on all screen sizes */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '40px 24px 0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Narwhal — large and centered */}
          <div style={{ marginBottom: '-20px', zIndex: 3, position: 'relative' }}>
            <TiltNarwhal size={340} />
          </div>

          {/* "FAMILY FABLES" — white Concert One with teal outline */}
          <h1
            style={{
              fontFamily: ff,
              fontSize: 'clamp(3.5rem, 14vw, 110px)',
              color: '#ffffff',
              textShadow: '4px 4px 0px #009380, 3px 3px 0px #009380, -1px -1px 0px #007060',
              lineHeight: 1.0,
              marginBottom: '12px',
              letterSpacing: '0.02em',
              position: 'relative',
              zIndex: 4,
            }}
          >
            Family Fables
          </h1>

          {/* "Welcome To Our Bookstore" */}
          <h2
            style={{
              fontFamily: `'Catamaran', var(--font-catamaran), sans-serif`,
              fontSize: 'clamp(1.3rem, 4vw, 2rem)',
              color: '#005a4a',
              fontWeight: 800,
              marginBottom: '32px',
              lineHeight: 1.2,
            }}
          >
            Welcome To Our Bookstore
          </h2>

          {/* SHOP NOW */}
          <a
            href="/books"
            className="btn-shine btn-scale-pulse"
            style={{
              display: 'inline-block',
              background: ORANGE,
              color: '#ffffff',
              padding: '16px 52px',
              borderRadius: '4px',
              fontFamily: ff,
              fontSize: '1.15rem',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(255,156,26,0.45)',
              marginBottom: '20px',
            }}
          >
            Shop Now 🛒
          </a>
        </div>

        {/* Cloud divider — real fluffy clouds into lavender section */}
        <CloudDivider fill="#d9b7e5" fillBack="#e2c8f0" height={160} />
      </section>

      {/* ── SECTION 2: NOW AVAILABLE ────────────────────────────────── */}
      <section
        id="now-available"
        style={{
          background: '#d9b7e5',
          position: 'relative',
          marginTop: '-400px',
          paddingTop: '400px',
          paddingBottom: '400px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '40px 32px 40px',
          }}
        >
          {/* Section heading — big like WordPress */}
          <h2
            style={{
              fontFamily: ff,
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              color: '#78087c',
              textAlign: 'center',
              marginBottom: '48px',
              lineHeight: 1.0,
              letterSpacing: '0.02em',
            }}
          >
            Now Available
          </h2>

          {/* Featured book layout: title image left, cover right */}
          <div
            style={{
              display: 'flex',
              gap: '48px',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            {/* Left: title + description + button */}
            <div style={{ flex: '2 1 340px' }}>
              {/* Poo Poo Face title text image */}
              <div style={{ marginBottom: '24px' }}>
                <Image
                  src="/images/wp/deep-purple-poo-poo-face-title.png"
                  alt="What's Your Poo Poo Face"
                  width={910}
                  height={93}
                  style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                  priority
                />
              </div>

              <p
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                  color: '#3a0245',
                  lineHeight: 1.75,
                  marginBottom: '28px',
                  maxWidth: '560px',
                }}
              >
                {featuredBook.description.split(' Perfect for:')[0]}
              </p>

              <a
                href="https://www.amazon.com/dp/1951173163/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  background: ORANGE,
                  color: '#ffffff',
                  padding: '12px 36px',
                  borderRadius: '4px',
                  fontFamily: ff,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  boxShadow: '0 3px 12px rgba(255,156,26,0.35)',
                }}
                className="btn-shine"
              >
                Amazon
              </a>
            </div>

            {/* Right: book cover */}
            <div
              style={{
                flex: '1 1 200px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Image
                src="/images/wp/whats-your-poopoo-face-400.png"
                alt="What's Your Poo Poo Face cover"
                width={400}
                height={400}
                style={{
                  width: 'clamp(160px, 28vw, 300px)',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '4px 6px 24px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Wave divider → mint (Best Sellers below) */}
        <WaveDivider fill="#dcf9f3" />
      </section>

      {/* ── SECTION 3: BEST SELLERS ─────────────────────────────────── */}
      <section
        id="books"
        style={{
          background: '#dcf9f3',
          position: 'relative',
          marginTop: '-400px',
          paddingTop: '400px',
          paddingBottom: '400px',
          zIndex: 0,
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '40px 32px 40px',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontFamily: ff,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#78087c',
              textAlign: 'center',
              marginBottom: '48px',
              lineHeight: 1.1,
            }}
          >
            Best Sellers
          </h2>

          {/* 3-column best sellers using TouchBook */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, calc(100vw - 64px)), 1fr))',
              gap: '32px',
              marginBottom: '48px',
            }}
          >
            {bestSellers.map(book => (
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

          {/* "See All Books" link to full grid */}
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <a
              href="/books"
              style={{
                display: 'inline-block',
                background: ORANGE,
                color: '#ffffff',
                padding: '14px 40px',
                borderRadius: '4px',
                fontFamily: ff,
                fontSize: '1rem',
                textDecoration: 'none',
                letterSpacing: '0.05em',
                boxShadow: '0 3px 12px rgba(255,156,26,0.35)',
              }}
              className="btn-shine"
            >
              See All Books
            </a>
          </div>
        </div>

        {/* Cloud divider → lavender (About section below) */}
        <CloudDivider fill="#d9b7e5" fillBack="#e2c8f0" />
      </section>

      {/* ── SECTION 4: FIND OUT MORE / OR SHOP ONLINE ───────────────── */}
      <section
        id="about"
        style={{
          background: '#d9b7e5',
          position: 'relative',
          marginTop: '-400px',
          paddingTop: '400px',
          paddingBottom: '80px',
          zIndex: -1,
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 32px 60px',
            textAlign: 'center',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontFamily: ff,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: '#78087c',
              marginBottom: '12px',
              lineHeight: 1.1,
            }}
          >
            find out more about us
          </h2>

          <h2
            className="font-display"
            style={{
              fontFamily: ff,
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              color: '#006e59',
              marginBottom: '36px',
              lineHeight: 1.1,
            }}
          >
            Or Shop Online
          </h2>

          <a
            href="/books"
            style={{
              display: 'inline-block',
              background: ORANGE,
              color: '#ffffff',
              padding: '14px 44px',
              borderRadius: '4px',
              fontFamily: ff,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              boxShadow: '0 3px 12px rgba(255,156,26,0.35)',
              marginBottom: '40px',
            }}
            className="btn-shine"
          >
            Browse The Shop
          </a>

          {/* Social media links */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: '8px',
            }}
          >
            {[
              { name: 'Facebook', url: 'https://www.facebook.com/familyfables/', color: '#1877f2' },
              { name: 'Instagram', url: 'https://www.instagram.com/familyfables/', color: '#e1306c' },
              { name: 'X / Twitter', url: 'https://twitter.com/familyfables', color: '#000000' },
            ].map(({ name, url, color }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(255,255,255,0.7)',
                  color: color,
                  padding: '10px 22px',
                  borderRadius: '6px',
                  fontFamily: ff,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: `2px solid ${color}22`,
                  transition: 'transform 0.15s ease',
                }}
                className="active:scale-95"
              >
                Follow
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.82rem',
                  }}
                >
                  {name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Wave divider → purple subscribe bg */}
        <WaveDivider fill="#78087c" />
      </section>

      {/* ── SECTION 5: SUBSCRIBE ────────────────────────────────────── */}
      <SubscribeSection />

      <BedtimeToggle />
    </div>
  );
}

