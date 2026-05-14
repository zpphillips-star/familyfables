'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { books, AMAZON_STORE_URL } from '@/lib/books';
import BedtimeToggle from '@/components/BedtimeToggle';
import TouchBook from '@/components/TouchBook';
import TiltNarwhal from '@/components/TiltNarwhal';
import CloudDivider from '@/components/CloudDivider';
import WaveDivider from '@/components/WaveDivider';
import AmberGame from '@/components/AmberGame';
import PooFaceQuiz from '@/components/PooFaceQuiz';

// ── Sparkle Trail ─────────────────────────────────────────────────────────
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

// ── Mood filter ───────────────────────────────────────────────────────────
type MoodKey = 'all' | 'laugh' | 'bedtime' | 'adventure' | 'heartfelt';

const MOODS: { key: MoodKey; label: string }[] = [
  { key: 'all', label: '✨ All' },
  { key: 'laugh', label: '😂 Laugh' },
  { key: 'bedtime', label: '🌙 Bedtime' },
  { key: 'adventure', label: '🐉 Adventure' },
  { key: 'heartfelt', label: '🥹 Heartfelt' },
];

function bookMatchesMood(book: (typeof books)[number], mood: MoodKey): boolean {
  if (mood === 'all') return true;
  if (mood === 'laugh') return book.moods?.some(m => ['silly', 'read-aloud', 'spooky'].includes(m)) ?? false;
  if (mood === 'bedtime') return book.moods?.includes('bedtime') ?? false;
  if (mood === 'adventure') return ['amber-dragon-keeper', 'ollie-come-home', 'frog-a-dog', 'finding-hampton'].includes(book.id);
  if (mood === 'heartfelt') return book.moods?.includes('feel-good') ?? false;
  return false;
}

function MoodBooksSection() {
  const [activeMood, setActiveMood] = useState<MoodKey>('all');
  const ff = "'Concert One', var(--font-concert-one), cursive";
  const filtered = books.filter(b => bookMatchesMood(b, activeMood));

  return (
    <section
      id="books"
      style={{
        background: '#d9b7e5',
        position: 'relative',
        marginTop: '-320px',
        paddingTop: '360px',
        paddingBottom: '380px',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-8%',
        width: '55vmax', height: '55vmax',
        background: 'radial-gradient(circle, rgba(120,8,124,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <h2 style={{
          fontFamily: ff,
          fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
          color: '#78087c',
          textAlign: 'center',
          marginBottom: '12px',
          lineHeight: 1.0,
        }}>
          Find Your Story
        </h2>
        <p style={{
          textAlign: 'center',
          fontFamily: "'Catamaran', var(--font-catamaran), sans-serif",
          fontWeight: 800,
          fontSize: '1.1rem',
          color: '#3a0245',
          marginBottom: '32px',
        }}>
          What kind of book night are you having?
        </p>

        {/* Mood filter pills */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '44px',
        }}>
          {MOODS.map(m => (
            <button
              key={m.key}
              onClick={() => setActiveMood(m.key)}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: `2px solid ${activeMood === m.key ? '#78087c' : 'rgba(120,8,124,0.35)'}`,
                background: activeMood === m.key ? '#78087c' : 'rgba(255,255,255,0.55)',
                color: activeMood === m.key ? '#ffffff' : '#3a0245',
                fontFamily: ff,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '48px',
                letterSpacing: '0.02em',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Book grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, calc(100vw - 48px)), 1fr))',
          gap: '28px',
        }}>
          {filtered.map(book => (
            <div key={book.id} style={{ animation: 'mood-book-appear 0.3s ease' }}>
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
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px', color: '#78087c', fontFamily: ff, fontSize: '1.2rem' }}>
            No books in that mood yet — check back soon! 🌟
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/books" style={{
            display: 'inline-block',
            background: '#ff9c1a',
            color: '#ffffff',
            padding: '15px 52px',
            borderRadius: '6px',
            fontFamily: ff,
            fontSize: '1.05rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 18px rgba(255,156,26,0.4)',
          }} className="btn-shine">
            See All Books 📚
          </a>
        </div>
      </div>

      <WaveDivider fill="#dcf9f3" />
    </section>
  );
}

// ── Amber Character Section ────────────────────────────────────────────────
function AmberCharacterSection() {
  const [bouncing, setBouncing] = useState(false);
  const ff = "'Concert One', var(--font-concert-one), cursive";

  const handleAmberClick = () => {
    if (bouncing) return;
    setBouncing(true);
    setTimeout(() => setBouncing(false), 700);
  };

  return (
    <section
      id="amber"
      style={{
        background: '#dcf9f3',
        position: 'relative',
        marginTop: '-380px',
        paddingTop: '400px',
        paddingBottom: '340px',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Organic blob background */}
      <div style={{
        position: 'absolute', top: '5%', right: '-5%',
        width: '65vmax', height: '65vmax',
        background: 'radial-gradient(ellipse, rgba(217,183,229,0.5) 0%, rgba(217,183,229,0.1) 55%, transparent 75%)',
        borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
        pointerEvents: 'none',
        transform: 'rotate(-15deg)',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-8%',
        width: '40vmax', height: '40vmax',
        background: 'radial-gradient(circle, rgba(0,147,128,0.12) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '56px',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Amber image — interactive */}
        <div
          onClick={handleAmberClick}
          onKeyDown={e => e.key === 'Enter' && handleAmberClick()}
          tabIndex={0}
          role="button"
          aria-label="Tap Amber to make her dance"
          style={{
            flex: '0 0 auto',
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
          }}
        >
          <Image
            src="/images/wp/amber-the-dragon-keeper.jpg"
            alt="Amber the Dragon Keeper book cover"
            width={320}
            height={400}
            style={{
              width: 'clamp(200px, 30vw, 320px)',
              height: 'auto',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,90,74,0.25)',
              transform: bouncing
                ? 'scale(1.08) rotate(-4deg)'
                : 'scale(1) rotate(-2deg)',
              transition: 'transform 0.15s cubic-bezier(.36,.07,.19,.97)',
              display: 'block',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.72rem',
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 700,
            color: '#009380',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            opacity: 0.7,
            whiteSpace: 'nowrap',
          }}>
            tap me!
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: '1 1 280px', position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: "'Catamaran', var(--font-catamaran), sans-serif",
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#009380',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Featured Character
          </div>
          <h2 style={{
            fontFamily: ff,
            fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
            color: '#005a4a',
            lineHeight: 1.0,
            marginBottom: '20px',
          }}>
            Meet Amber
          </h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#1a3a30',
            marginBottom: '32px',
            maxWidth: '420px',
          }}>
            She thought she was just a regular kid — until the dragons chose her.
            Now Amber must protect a secret world of magical creatures, keep her
            grades up, and figure out why the biggest dragon of all keeps following her home.
          </p>
          <a
            href="https://www.amazon.com/stores/page/1DEB841F-05B8-46B0-A42E-55B618C36B12"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#009380',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: '8px',
              fontFamily: ff,
              fontSize: '1.05rem',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 20px rgba(0,147,128,0.35)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            className="btn-shine"
          >
            Her Book →
          </a>
        </div>
      </div>

      <CloudDivider fill="#005a4a" fillBack="#004a3a" height={220} />
    </section>
  );
}

// ── Amber Game Section ─────────────────────────────────────────────────────
function AmberGameSection() {
  const ff = "'Concert One', var(--font-concert-one), cursive";

  return (
    <section
      id="amber-game"
      style={{
        background: 'linear-gradient(180deg, #005a4a 0%, #003a32 100%)',
        position: 'relative',
        marginTop: '-220px',
        paddingTop: '260px',
        paddingBottom: '380px',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Floating crystals decoration */}
      {['10%', '85%', '50%'].map((left, i) => (
        <div key={i} style={{
          position: 'absolute',
          left,
          top: `${20 + i * 25}%`,
          fontSize: '2rem',
          opacity: 0.15,
          animation: `float ${4 + i}s ease-in-out infinite ${i * 0.8}s`,
          pointerEvents: 'none',
        }}>
          💎
        </div>
      ))}

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{
          fontFamily: ff,
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#dcf9f3',
          marginBottom: '12px',
          lineHeight: 1.1,
        }}>
          Amber&apos;s Crystal Rush
        </h2>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '1rem',
          color: 'rgba(220,249,243,0.75)',
          marginBottom: '36px',
          lineHeight: 1.6,
        }}>
          Amber needs your help! Catch the falling crystals before they hit the ground.
        </p>

        <AmberGame />
      </div>

      <WaveDivider fill="#d9b7e5" />
    </section>
  );
}

// ── Poo Poo Face Dragon Section ────────────────────────────────────────────
function PooDragonSection() {
  const [faceEmoji, setFaceEmoji] = useState<string | null>(null);
  const [faceKey, setFaceKey] = useState(0);
  const ff = "'Concert One', var(--font-concert-one), cursive";
  const FACES = ['😤', '😂', '😳', '🤨', '😱', '🥱', '😈', '🤩', '😭', '🤔', '😬', '🥹'];

  const handleDragonTap = () => {
    const f = FACES[Math.floor(Math.random() * FACES.length)];
    setFaceEmoji(f);
    setFaceKey(k => k + 1);
    setTimeout(() => setFaceEmoji(null), 2000);
  };

  return (
    <section
      id="poo-dragon"
      style={{
        background: 'linear-gradient(160deg, #d9b7e5 0%, #e8ccf5 60%, #f0d8fa 100%)',
        position: 'relative',
        marginTop: '-380px',
        paddingTop: '400px',
        paddingBottom: '340px',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Background blobs */}
      <div style={{
        position: 'absolute', bottom: '5%', right: '-6%',
        width: '50vmax', height: '50vmax',
        background: 'radial-gradient(circle, rgba(120,8,124,0.15) 0%, transparent 65%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '56px',
        flexWrap: 'wrap-reverse',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Text */}
        <div style={{ flex: '1 1 280px' }}>
          <div style={{
            fontFamily: "'Catamaran', var(--font-catamaran), sans-serif",
            fontWeight: 800,
            fontSize: '0.9rem',
            color: '#78087c',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '10px',
          }}>
            Fan Favorite
          </div>
          <h2 style={{
            fontFamily: ff,
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            color: '#3a0245',
            lineHeight: 1.05,
            marginBottom: '20px',
          }}>
            The Dragon<br />Who Makes Faces
          </h2>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: '#3a0245',
            marginBottom: '24px',
            maxWidth: '420px',
          }}>
            Spoiler: EVERYONE makes the face. Even unicorns. Even dragons.
            Even your teacher — <em>especially</em> your teacher. A laugh-out-loud
            mirror moment that turns bathtime into showtime.
          </p>
          <p style={{
            fontFamily: ff,
            fontSize: '1rem',
            color: '#78087c',
            marginBottom: '28px',
          }}>
            👆 Tap the dragon to see its face!
          </p>
          <a
            href="https://www.amazon.com/dp/1951173163/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#ff9c1a',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: '8px',
              fontFamily: ff,
              fontSize: '1.05rem',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 20px rgba(255,156,26,0.4)',
            }}
            className="btn-shine"
          >
            Get the Book →
          </a>
        </div>

        {/* Dragon image — interactive */}
        <div
          onClick={handleDragonTap}
          onKeyDown={e => e.key === 'Enter' && handleDragonTap()}
          tabIndex={0}
          role="button"
          aria-label="Tap the dragon to see a funny face"
          style={{
            flex: '0 0 auto',
            cursor: 'pointer',
            outline: 'none',
            position: 'relative',
          }}
        >
          {faceEmoji && (
            <div
              key={faceKey}
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '3.5rem',
                animation: 'bubble-rise-anim 1.8s ease-out forwards',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              {faceEmoji}
            </div>
          )}
          <Image
            src="/images/wp/whats-your-poopoo-face-400.png"
            alt="What's Your Poo Poo Face book cover"
            width={360}
            height={360}
            style={{
              width: 'clamp(200px, 32vw, 340px)',
              height: 'auto',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(120,8,124,0.25)',
              transform: 'rotate(3deg)',
              display: 'block',
              transition: 'transform 0.15s ease',
            }}
          />
        </div>
      </div>

      <CloudDivider fill="#78087c" fillBack="#5a0660" height={240} />
    </section>
  );
}

// ── Poo Face Quiz Section ─────────────────────────────────────────────────
function QuizSection() {
  const ff = "'Concert One', var(--font-concert-one), cursive";

  return (
    <section
      id="quiz"
      style={{
        background: 'linear-gradient(180deg, #78087c 0%, #5a0660 100%)',
        position: 'relative',
        marginTop: '-240px',
        paddingTop: '280px',
        paddingBottom: '380px',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <div style={{ maxWidth: '580px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🤣</div>
        <h2 style={{
          fontFamily: ff,
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          color: '#ffffff',
          marginBottom: '10px',
          lineHeight: 1.1,
        }}>
          What&apos;s Your Poo Poo Face?
        </h2>
        <p style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: '36px',
          lineHeight: 1.6,
        }}>
          4 questions. Life&apos;s most important moments. One result that defines you forever.
        </p>

        <PooFaceQuiz />
      </div>

      <WaveDivider fill="#dcf9f3" />
    </section>
  );
}

// ── Coloring Pages Teaser ─────────────────────────────────────────────────
function ColoringTeaser() {
  const ff = "'Concert One', var(--font-concert-one), cursive";
  const placeholders = [
    { color: '#dcf9f3', border: '#009380', icon: '🐉', label: "Amber's Dragon" },
    { color: '#f3e0ff', border: '#78087c', icon: '🌸', label: 'Fantasy Garden' },
    { color: '#fff3dc', border: '#ff9c1a', icon: '✨', label: 'Magic Crystals' },
  ];

  return (
    <section
      id="coloring"
      style={{
        background: 'linear-gradient(160deg, #dcf9f3 0%, #eef8f5 100%)',
        position: 'relative',
        marginTop: '-380px',
        paddingTop: '420px',
        paddingBottom: '100px',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <div style={{
              fontFamily: "'Catamaran', var(--font-catamaran), sans-serif",
              fontWeight: 800,
              fontSize: '0.9rem',
              color: '#009380',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}>
              Free Activity
            </div>
            <h2 style={{
              fontFamily: ff,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#005a4a',
              lineHeight: 1.05,
              marginBottom: '16px',
            }}>
              Color Amber&apos;s World
            </h2>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#1a3a30',
              marginBottom: '28px',
              maxWidth: '380px',
            }}>
              Free printable coloring pages straight from the Family Fables universe.
              Dragons, crystals, narwhals — bring them to life with your own colors.
            </p>
            <a href="/coloring" style={{
              display: 'inline-block',
              background: '#ff9c1a',
              color: '#ffffff',
              padding: '14px 36px',
              borderRadius: '8px',
              fontFamily: ff,
              fontSize: '1rem',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 4px 16px rgba(255,156,26,0.35)',
            }} className="btn-shine">
              Color Amber&apos;s World →
            </a>
          </div>

          {/* Placeholder coloring page thumbnails */}
          <div style={{ display: 'flex', gap: '16px', flex: '0 0 auto', flexWrap: 'wrap' }}>
            {placeholders.map((p, i) => (
              <div key={i} style={{
                width: '120px',
                height: '150px',
                background: p.color,
                border: `3px dashed ${p.border}`,
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transform: `rotate(${[-2, 1, -1][i]}deg)`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}>
                <div style={{ fontSize: '2.8rem' }}>{p.icon}</div>
                <div style={{
                  fontFamily: ff,
                  fontSize: '0.7rem',
                  color: p.border,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  padding: '0 8px',
                }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Newsletter Section ────────────────────────────────────────────────────
function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const ff = "'Concert One', var(--font-concert-one), cursive";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: '15px 20px',
    borderRadius: '10px',
    border: '2px solid rgba(255,255,255,0.25)',
    background: 'rgba(255,255,255,0.14)',
    color: '#ffffff',
    fontFamily: "'Open Sans', sans-serif",
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
  };

  return (
    <section
      id="subscribe"
      style={{
        background: 'linear-gradient(135deg, #78087c 0%, #a935a6 50%, #5a0660 100%)',
        position: 'relative',
        paddingTop: '80px',
        paddingBottom: '100px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-20%', left: '-8%',
        width: '45vmax', height: '45vmax',
        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-6%',
        width: '40vmax', height: '40vmax',
        background: 'radial-gradient(circle, rgba(220,249,243,0.08) 0%, transparent 60%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '620px',
        margin: '0 auto',
        padding: '0 32px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🌟</div>
        <h2 style={{
          fontFamily: ff,
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: '#ffffff',
          marginBottom: '8px',
          lineHeight: 1.0,
        }}>
          Join the Family
        </h2>
        <p style={{
          fontFamily: "'Catamaran', var(--font-catamaran), sans-serif",
          fontWeight: 800,
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '40px',
        }}>
          New releases, giveaways, and magic delivered to your inbox
        </p>

        {submitted ? (
          <div style={{
            padding: '40px 32px',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: '20px',
            border: '2px solid rgba(255,255,255,0.2)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontFamily: ff, color: '#ffffff', fontSize: '2rem', marginBottom: '8px' }}>
              You&apos;re in!
            </h3>
            <p style={{ color: '#dcf9f3', fontSize: '1rem', lineHeight: 1.6 }}>
              Welcome to the Family Fables family — watch your inbox for magic!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                style={{ ...inputStyle, flex: '1 1 160px' }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                style={{ ...inputStyle, flex: '2 1 220px' }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '16px 32px',
                background: '#ff9c1a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontFamily: ff,
                fontSize: '1.15rem',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                boxShadow: '0 4px 20px rgba(255,156,26,0.5)',
                minHeight: '54px',
              }}
            >
              Subscribe — It&apos;s Free! ✨
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const ff = "'Concert One', var(--font-concert-one), cursive";

  return (
    <div style={{ overflowX: 'hidden' }}>
      <SparkleTrail />
      <BedtimeToggle />

      {/* ── SECTION 1: HERO ────────────────────────────────────────── */}
      <section
        id="hero"
        style={{
          background: '#dcf9f3',
          position: 'relative',
          minHeight: '100svh',
          overflow: 'hidden',
          paddingBottom: '340px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Decorative background circles */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: '50vmax', height: '50vmax',
          background: 'radial-gradient(circle, rgba(0,147,128,0.12) 0%, transparent 65%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', left: '-8%',
          width: '35vmax', height: '35vmax',
          background: 'radial-gradient(circle, rgba(217,183,229,0.45) 0%, transparent 65%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '800px',
          width: '100%',
          padding: '48px 24px 0',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 3,
          flex: 1,
          justifyContent: 'center',
        }}>
          {/* Narwhal */}
          <div className="narwhal-hero-bob" style={{ marginBottom: '-16px', position: 'relative', zIndex: 4 }}>
            <TiltNarwhal size={380} />
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: ff,
              fontSize: 'clamp(3.2rem, 13vw, 100px)',
              color: '#ffffff',
              textShadow: '4px 4px 0px #009380, 3px 3px 0px #009380, -1px -1px 0px #007060',
              lineHeight: 0.95,
              marginBottom: '14px',
              letterSpacing: '0.01em',
              position: 'relative',
              zIndex: 4,
            }}
          >
            Family Fables
          </h1>

          {/* Subtitle */}
          <h2 style={{
            fontFamily: "'Catamaran', var(--font-catamaran), sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
            color: '#005a4a',
            marginBottom: '36px',
            lineHeight: 1.3,
          }}>
            Books that spark wonder, laughter &amp; bedtime magic
          </h2>

          {/* CTA */}
          <a
            href="/books"
            className="btn-shine cta-pulse"
            style={{
              display: 'inline-block',
              background: '#ff9c1a',
              color: '#ffffff',
              padding: '18px 64px',
              borderRadius: '6px',
              fontFamily: ff,
              fontSize: '1.2rem',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 6px 28px rgba(255,156,26,0.5)',
            }}
          >
            Shop Now 🛒
          </a>
        </div>

        <CloudDivider fill="#d9b7e5" fillBack="#e2c8f0" height={340} />
      </section>

      {/* ── SECTION 2: BOOK DISCOVERY ───────────────────────────────── */}
      <MoodBooksSection />

      {/* ── SECTION 3: AMBER CHARACTER ──────────────────────────────── */}
      <AmberCharacterSection />

      {/* ── SECTION 4: AMBER GAME ──────────────────────────────────── */}
      <AmberGameSection />

      {/* ── SECTION 5: POO POO DRAGON ───────────────────────────────── */}
      <PooDragonSection />

      {/* ── SECTION 6: POO POO FACE QUIZ ────────────────────────────── */}
      <QuizSection />

      {/* ── SECTION 7: COLORING PAGES ───────────────────────────────── */}
      <ColoringTeaser />

      {/* ── SECTION 8: NEWSLETTER ────────────────────────────────────── */}
      <NewsletterSection />
    </div>
  );
}
