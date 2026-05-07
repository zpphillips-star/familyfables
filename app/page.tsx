'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { books, AMAZON_STORE_URL } from '@/lib/books';
import NewsletterSection from '@/components/NewsletterSection';
import ParentQuotes from '@/components/ParentQuotes';

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

// ── Blob Divider (two-layer organic, zero straight lines) ─────────────────
// Two overlapping sinusoidal blobs in slightly different shades of the destination
// color — creates a depth/layered effect matching the original familyfables.org style.
// NO overflow-hidden on the container — that's what caused the straight line clipping.
// Extends 150px into the NEXT section via negative bottom. Next section uses
// paddingTop ≥ 160px and marginTop: -148px to seamlessly overlap.
function BlobDivider({
  fill,           // front blob color (destination section primary)
  fillDeep,       // back blob color (slightly darker/lighter variant for depth)
}: { fill: string; fillDeep: string }) {
  const H = 160;
  return (
    <div className="absolute left-0 right-0 pointer-events-none"
      aria-hidden style={{ bottom: -148, zIndex: 10, height: H }}>
      <svg viewBox={`0 0 1440 ${H}`} xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '100%' }}>
        {/* Back layer — offset wave in slightly different shade, creates the "no flat line" depth */}
        <path d={`M0,${H} L0,${H*0.72} Q160,${H*0.38} 320,${H*0.60} Q480,${H*0.82} 640,${H*0.50} Q800,${H*0.18} 960,${H*0.55} Q1120,${H*0.88} 1280,${H*0.58} Q1360,${H*0.42} 1440,${H*0.62} L1440,${H} Z`}
          fill={fillDeep}/>
        {/* Front layer — main organic wave, sits above back layer */}
        <path d={`M0,${H} L0,${H*0.58} Q160,${H*0.22} 320,${H*0.48} Q480,${H*0.72} 640,${H*0.36} Q800,${H*0.02} 960,${H*0.42} Q1120,${H*0.76} 1280,${H*0.44} Q1360,${H*0.28} 1440,${H*0.50} L1440,${H} Z`}
          fill={fill}/>
      </svg>
    </div>
  );
}

// ── Hidden Star Easter Egg ──────────────────────────────────────────────────
// Tiny star bottom-right of hero — click/tap 3 times to reveal a secret message
function HiddenStar() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const msgs = ["You found the first star!", "Two down, one to go...", "✨ You're a true explorer! Check the About page for another secret."];
  const tap = () => {
    const next = count + 1;
    setCount(next);
    if (next <= 3) { setShow(true); setTimeout(() => setShow(false), 2800); }
  };
  return (
    <div className="absolute bottom-28 right-6 z-20" style={{ cursor: 'pointer' }} onClick={tap} title="...">
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ opacity: count >= 3 ? 1 : 0.28, transition: 'opacity .4s' }}>
        <polygon points="10,1 12.9,7 20,7.6 14.5,12.4 16.2,19.5 10,15.8 3.8,19.5 5.5,12.4 0,7.6 7.1,7" fill="#FFE066"/>
      </svg>
      {show && (
        <div className="absolute bottom-8 right-0 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shadow-xl z-50"
          style={{ backgroundColor: '#2D0D6B', color: '#FFE066', border: '1px solid #F4A839' }}>
          {msgs[Math.min(count - 1, 2)]}
        </div>
      )}
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
// Easter egg: tap 7 times total to unlock secret message
type Bubble = { id: number; x: number; size: number };

function InteractiveNarwhal() {
  const [jumping, setJumping] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const [secretShown, setSecretShown] = useState(false);

  const interact = () => {
    if (jumping) return;
    setJumping(true);
    const newCount = tapCount + 1;
    setTapCount(newCount);

    const newBubs: Bubble[] = Array.from({ length: 4 + Math.floor(Math.random() * 3) }, (_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 32,
      size: 10 + Math.random() * 16,
    }));
    setBubbles(prev => [...prev, ...newBubs]);
    setTimeout(() => setJumping(false), 900);
    setTimeout(() => setBubbles(prev => prev.filter(b => !newBubs.find(n => n.id === b.id))), 1600);

    // Easter egg at 7 taps
    if (newCount === 7) {
      setTimeout(() => { setSecretShown(true); setTimeout(() => setSecretShown(false), 4000); }, 400);
    }
  };

  return (
    <div className="relative inline-block select-none" style={{ cursor: 'pointer' }}
      onClick={interact} onTouchStart={(e) => { e.preventDefault(); interact(); }}>
      <div className="absolute -top-9 left-1/2 text-sm font-bold pointer-events-none whitespace-nowrap"
        style={{ transform: 'translateX(-50%)', color: '#A8E8EC', opacity: 0.85 }}>
        tap me!
      </div>

      <Image
        src="/images/logo-teal.png"
        alt="Family Fables narwhal mascot"
        width={340} height={340}
        style={{
          maxWidth: '88vw',
          filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.35))',
          transition: 'transform 0.18s cubic-bezier(.36,.07,.19,.97)',
          transform: jumping ? 'translateY(-34px) rotate(-8deg) scale(1.06)' : 'none',
        }}
      />

      {/* Secret easter egg toast */}
      {secretShown && (
        <div className="absolute -top-20 left-1/2 pointer-events-none z-50"
          style={{ transform: 'translateX(-50%)', animation: 'fadeInUp 0.4s ease' }}>
          <div className="px-5 py-3 rounded-2xl text-sm font-bold text-center whitespace-nowrap shadow-2xl"
            style={{ backgroundColor: '#F4A839', color: '#2D0D6B', border: '3px solid white' }}>
            You found a secret! The narwhal loves being tickled
          </div>
        </div>
      )}

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

// ── Roaming Character (easter egg: a book character wanders across the screen)
function RoamingCharacter() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: -120, direction: 1 });

  useEffect(() => {
    // Appear after 12 seconds, then every 35 seconds
    const start = setTimeout(() => {
      triggerRoam();
    }, 12000);
    return () => clearTimeout(start);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerRoam = () => {
    const dir = Math.random() > 0.5 ? 1 : -1;
    const startX = dir === 1 ? -120 : window.innerWidth + 20;
    setPosition({ x: startX, direction: dir });
    setVisible(true);
    // Animate across
    const duration = 9000;
    const startTime = Date.now();
    const endX = dir === 1 ? window.innerWidth + 120 : -120;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentX = startX + (endX - startX) * progress;
      setPosition({ x: currentX, direction: dir });
      if (progress < 1) requestAnimationFrame(animate);
      else {
        setVisible(false);
        setTimeout(triggerRoam, 30000 + Math.random() * 15000);
      }
    };
    requestAnimationFrame(animate);
  };

  if (!visible) return null;

  // Use Gilroy as the roaming character (index 3 in books)
  const book = books[3];
  if (!book?.image) return null;

  return (
    <div className="fixed pointer-events-none z-[100]"
      style={{ bottom: 20, left: position.x, transform: `scaleX(${position.direction})` }}>
      <div className="relative">
        <Image src={book.image} alt="" width={64} height={80}
          style={{ borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transform: `rotate(${position.direction === 1 ? '8deg' : '-8deg'})` }}
        />
        {/* Little legs wobbling underneath */}
        <div className="absolute -bottom-2 left-1/2 flex gap-1"
          style={{ transform: 'translateX(-50%)' }}>
          <div style={{ width: 6, height: 10, backgroundColor: '#F4A839', borderRadius: 3,
            animation: 'float 0.4s ease-in-out infinite' }}/>
          <div style={{ width: 6, height: 10, backgroundColor: '#F4A839', borderRadius: 3,
            animation: 'float 0.4s ease-in-out infinite 0.2s' }}/>
        </div>
      </div>
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
        <circle cx="12" cy="12" r="10" fill="none" stroke="#C084FC" strokeWidth="2.5"/>
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

// ── Age badge color helper ─────────────────────────────────────────────────
function ageBadgeColor(ageRange: string): string {
  if (ageRange === 'Ages 2–4' || ageRange === 'Ages 2–5') return '#66D9A0';
  if (ageRange === 'Ages 3–7') return '#4CC9C9';
  if (ageRange === 'Ages 4–8') return '#9B6FD0';
  return '#66D9A0';
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
            {book.ageRange && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: ageBadgeColor(book.ageRange), color: '#1C3A2E' }}>
                {book.ageRange}
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
              {book.hook && (
                <p className="text-white/80 italic text-sm mb-3">&ldquo;{book.hook}&rdquo;</p>
              )}
              <p className="text-sm leading-relaxed text-white opacity-90">{book.description}</p>
              {book.perfectFor && (
                <p className="text-white/60 text-xs mt-3 italic">{book.perfectFor}</p>
              )}
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

// ── Emergency Dad Joke Button ──────────────────────────────────────────────
const DAD_JOKES = [
  { setup: "Why did the book go to the doctor?",           punchline: "It had too many problems." },
  { setup: "Why can't the narwhal ever be trusted?",       punchline: "Because it always gives you the cold shoulder. (It's a horn. Get it?)" },
  { setup: "What do you call a sleeping dinosaur?",        punchline: "A dino-snore. You're welcome." },
  { setup: "Why did the turkey join the band?",            punchline: "He already had the drumsticks." },
  { setup: "Why don't scientists trust atoms?",            punchline: "Because they make up everything. Just like my kids' bedtime excuses." },
  { setup: "What do you call a bear with no teeth?",       punchline: "A gummy bear. (Kids lose their minds over this one.)" },
  { setup: "What do books wear to the beach?",             punchline: "A cover-up." },
  { setup: "What do you call a fish without eyes?",        punchline: "A fsh. Read it aloud. There you go." },
  { setup: "Why did the kid bring a ladder to school?",    punchline: "Because they wanted to go to high school." },
  { setup: "What happens when a frog parks illegally?",    punchline: "It gets toad away." },
  { setup: "Why do cows wear bells?",                      punchline: "Because their horns don't work." },
  { setup: "What do you call a pony with a cough?",        punchline: "A little hoarse. (Also me at every parent pickup.)" },
];

function DadJokeCard() {
  const [jokeIndex, setJokeIndex] = useState<number | null>(null);
  const [fading, setFading]       = useState(false);

  const nextJoke = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setJokeIndex(prev => {
        let next = Math.floor(Math.random() * DAD_JOKES.length);
        if (next === prev) next = (next + 1) % DAD_JOKES.length;
        return next;
      });
      setFading(false);
    }, 180);
  };

  const joke = jokeIndex !== null ? DAD_JOKES[jokeIndex] : null;

  return (
    <div className="rounded-3xl p-6 flex flex-col gap-4 shadow-md select-none"
      style={{ backgroundColor: '#FFFDF7', border: '2px solid #FF6B9D50' }}>
      <div className="text-4xl text-center">🚨</div>
      <h3 className="text-lg font-bold text-center"
        style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#2D1B69' }}>
        Emergency Dad Joke Button
      </h3>

      <div className="flex-1 min-h-[80px] flex flex-col items-center justify-center text-center"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.18s ease' }}>
        {joke ? (
          <>
            <p className="text-sm font-semibold mb-2" style={{ color: '#2D1B69' }}>{joke.setup}</p>
            <p className="text-sm italic" style={{ color: '#FF6B9D' }}>{joke.punchline}</p>
          </>
        ) : (
          <p className="text-sm" style={{ color: '#7B6898' }}>
            For when bedtime is hard and everyone just needs a groan.
          </p>
        )}
      </div>

      <button onClick={nextJoke}
        className="btn-shine mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
        style={{ backgroundColor: '#FF6B9D', color: 'white' }}>
        {joke ? 'Another One! 😂' : 'Hit Me With It 🎯'}
      </button>
    </div>
  );
}

// ── Mood Filter ────────────────────────────────────────────────────────────
const MOODS = [
  { id: 'all',        label: 'All Books 📚', color: '#2D1B69' },
  { id: 'silly',      label: 'Silly 😂',     color: '#FF6B9D' },
  { id: 'feel-good',  label: 'Feel Good 💛', color: '#F4A839' },
  { id: 'bedtime',    label: 'Bedtime 🌙',   color: '#4CC9C9' },
  { id: 'read-aloud', label: 'Read Aloud 📢', color: '#66D9A0' },
  { id: 'spooky',     label: 'Spooky 🎃',    color: '#9B6FD0' },
];

const MOOD_TAGLINES: Record<string, string> = {
  all:          'From silly to sweet, brave to heartwarming — every book crafted to delight. Tap any cover to open it.',
  silly:        'Warning: side effects include snorting, floor-rolling, and demanding to read it again immediately. 😂',
  'feel-good':  'Books that give you the warm fuzzies. 💛 Great for when someone needs a hug but you only have 10 minutes.',
  bedtime:      'For the exact moment when kids are almost asleep. Almost. 🌙 No guarantees.',
  'read-aloud': 'Grab a snack. These ones are meant to be performed. 📢 Full voice acting strongly encouraged.',
  spooky:       'Spooky enough to be fun. Not spooky enough to cause nightmares. 🎃 (Probably.)',
};

function MoodFilter({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2.5 justify-center">
      {MOODS.map(mood => (
        <button
          key={mood.id}
          onClick={() => onChange(mood.id)}
          className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 select-none"
          style={{
            backgroundColor: active === mood.id ? mood.color : 'white',
            color: active === mood.id ? 'white' : mood.color,
            border: `2px solid ${mood.color}`,
            transform: active === mood.id ? 'scale(1.08)' : 'scale(1)',
            boxShadow: active === mood.id ? `0 4px 14px ${mood.color}66` : 'none',
          }}
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function HomePage() {
  // Parallax on mouse move — books shift slightly relative to cursor
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);
  const [moodFilter, setMoodFilter] = useState('all');

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
      <RoamingCharacter />
      <div style={{ overflowX: 'hidden' }}>

        {/* ─── HERO ────────────────────────────────────────────────────── */}
        <section className="relative" style={{
          background: 'linear-gradient(160deg, #B2EDE8 0%, #72C8C2 30%, #3DA8AA 65%, #1E7878 100%)',
          minHeight: '92vh', paddingBottom: '110px',
        }}>
          {/* SVG decorations — all clickable */}
          <div className="absolute top-8 left-8 float-slow">            <StarSVG size={34} color="#F4A839" pulse /></div>
          <div className="absolute top-14 right-20 float-mid opacity-70"><MoonSVG size={56} /></div>
          <div className="absolute top-1/3 left-4 float-fast opacity-50">  <Sparkle4 size={22} color="#C084FC" /></div>
          <div className="absolute top-1/2 right-8 float-slow opacity-55"><StarSVG size={24} color="#F4A839" /></div>
          <div className="absolute top-3/4 left-24 float-mid opacity-40"> <Sparkle4 size={18} color="#FF6B9D" /></div>
          <div className="absolute top-6 left-1/3 opacity-15 pointer-events-none"><RainbowSVG /></div>
          {/* Hidden easter egg: tiny star bottom-right. Tap it 3 times for a surprise hint */}
          <HiddenStar />

          {/* Hero layout */}
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-8 flex flex-col lg:flex-row items-center gap-10 min-h-[80vh]">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left z-10">
              <div className="flex justify-center lg:justify-start mb-6">
                <Image src="/images/logo-teal.png" alt="Family Fables"
                  width={100} height={100} className="float-slow"
                  style={{ filter: 'drop-shadow(0 4px 16px rgba(76,201,201,0.5))' }}
                />
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#FFFFFF' }}>
                Books That Make<br/>
                <span style={{ color: '#F4A839' }}>Bedtime</span> Worth<br/>
                <span style={{ color: '#2D0D6B' }}>Fighting About</span>
              </h1>
              <p className="text-base leading-snug mb-3 max-w-xl mx-auto lg:mx-0 italic font-semibold" style={{ color: '#A8E8EC' }}>
                (The good kind of fighting. Mostly.)
              </p>
              <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: '#1C5A5E' }}>
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
                  style={{ borderColor: 'rgba(255,255,255,0.7)', color: '#FFFFFF', backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  Shop on Amazon →
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start text-sm font-semibold"
                style={{ color: '#1C5A5E' }}>
                <span className="flex items-center gap-1.5"><StarSVG size={14} color="#1C5A5E"/>11 Books Published</span>
                <span className="flex items-center gap-1.5"><Sparkle4 size={13} color="#1C5A5E"/>Ages 2–8</span>
                <span className="flex items-center gap-1.5"><Sparkle4 size={13} color="#1C5A5E"/>Ships Worldwide</span>
              </div>
            </div>

            {/* Books with parallax */}
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
                width: 224, height: 292, zIndex: 20, marginBottom: -60,
                boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(244,168,57,0.35)',
                transform: `translate(${px * -0.4}px, ${py * -0.3}px)`,
              }}/>
            </div>
          </div>
          {/* Blob into light lavender — two lavender tones, no straight line */}
          <BlobDivider fill="#DDD4FF" fillDeep="#C8B5F5"/>
        </section>

        {/* ─── BOOKS GRID (light lavender) ── overlap pulls under hero blob ── */}
        <section className="relative pb-20 px-4" style={{
          background: 'linear-gradient(160deg, #DDD4FF 0%, #C8B5F5 50%, #B8A0EE 100%)', zIndex: 4, paddingTop: '168px', marginTop: '-148px',
        }}>
          <div className="absolute top-10 right-12 float-slow opacity-20"><RainbowSVG /></div>
          <div className="absolute top-20 left-10 float-mid opacity-15"><StarSVG size={32} color="#7B3FBE"/></div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#3B1A8C' }}>
                Books Kids Love
              </h2>
              <p className="text-base max-w-md mx-auto mb-8" style={{ color: '#5A3A8A' }}>
                {MOOD_TAGLINES[moodFilter] || MOOD_TAGLINES.all}
              </p>
              <MoodFilter active={moodFilter} onChange={setMoodFilter} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {(moodFilter === 'all'
                ? books.filter(b => b.image).slice(0, 6)
                : books.filter(b => b.image && b.moods?.includes(moodFilter))
              ).map((book, i) => (
                <div key={book.id} style={{ animation: `mood-book-appear 0.35s ease-out ${i * 0.07}s both` }}>
                  <InteractiveBookCard book={book}/>
                </div>
              ))}
            </div>
            {moodFilter === 'all' ? (
              <div className="text-center mt-12">
                <Link href="/books"
                  className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1"
                  style={{ backgroundColor: '#5A1FA0', color: '#FFFFFF' }}>
                  See All 11 Books
                </Link>
              </div>
            ) : (
              <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button onClick={() => setMoodFilter('all')}
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-80"
                  style={{ backgroundColor: 'rgba(255,255,255,0.4)', color: '#2D1B69', border: '2px solid rgba(255,255,255,0.6)' }}>
                  ← Show All Books
                </button>
                <Link href="/books"
                  className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1"
                  style={{ backgroundColor: '#5A1FA0', color: '#FFFFFF' }}>
                  See All 11 Books
                </Link>
              </div>
            )}
          </div>
          {/* Blob into medium purple — two purple tones for depth */}
          <BlobDivider fill="#8B5CC8" fillDeep="#6B3AAB"/>
        </section>

        {/* ─── PARENT QUOTES ─── */}
        <ParentQuotes />

        {/* ─── FREE FUN STUFF ─── */}
        <section className="relative py-20 px-4" style={{ backgroundColor: '#FDF8F2', zIndex: 4 }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-3"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#6B3FA0' }}>
                Free Fun Stuff 🎨
              </h2>
              <p className="text-base" style={{ color: '#7B6898' }}>
                Because fun shouldn&apos;t require a credit card. Printables, dad jokes, and chaos — on the house.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 — Dad Joke Generator */}
              <DadJokeCard />
              {/* Card 2 */}
              <div className="rounded-3xl p-6 flex flex-col gap-4 shadow-md" style={{ backgroundColor: '#FFFDF7', border: '2px solid #F4A83940' }}>
                <div className="text-4xl text-center">🦃</div>
                <h3 className="text-lg font-bold text-center" style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#2D1B69' }}>
                  Gilroy&apos;s Confidence Activity Sheet
                </h3>
                <p className="text-sm text-center" style={{ color: '#7B6898' }}>
                  What&apos;s YOUR signature gobble? Fill in the blanks.
                </p>
                <button disabled
                  className="mt-auto w-full py-3 rounded-xl font-bold text-sm cursor-not-allowed"
                  style={{ backgroundColor: '#FDF8F2', color: '#B8A4D0', border: '2px dashed #C8B4E8' }}>
                  Coming Soon!
                </button>
              </div>
              {/* Card 3 */}
              <div className="rounded-3xl p-6 flex flex-col gap-4 shadow-md" style={{ backgroundColor: '#FFFDF7', border: '2px solid #F4A83940' }}>
                <div className="text-4xl text-center">🌙</div>
                <h3 className="text-lg font-bold text-center" style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#2D1B69' }}>
                  Dream Ideas Wish List
                </h3>
                <p className="text-sm text-center" style={{ color: '#7B6898' }}>
                  Write down your top 5 dream ideas. Bonus points for the weird ones.
                </p>
                <button disabled
                  className="mt-auto w-full py-3 rounded-xl font-bold text-sm cursor-not-allowed"
                  style={{ backgroundColor: '#FDF8F2', color: '#B8A4D0', border: '2px dashed #C8B4E8' }}>
                  Coming Soon!
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <NewsletterSection />

        {/* ─── NARWHAL (medium purple) ─── overlaps lavender blob ─────────── */}
        <section className="relative pb-36 px-4" style={{
          background: 'linear-gradient(160deg, #9B6CD4 0%, #7B3FBE 40%, #5A1FA0 75%, #3B1280 100%)',
          paddingTop: '168px', marginTop: '-148px', zIndex: 3,
        }}>
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
                style={{ backgroundColor: '#F4A839', color: '#3B1280' }}>
                Where Stories Come Alive
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5"
                style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#FFFFFF' }}>
                Every book is a little<br/>
                <span style={{ color: '#C8EDFF' }}>world to dive into</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#DDD0FF' }}>
                Funny, heartwarming, and full of the kind of magic that only happens
                when you open a book together. Family Fables was built for those moments.
              </p>
              <Link href="/books"
                className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
                style={{ backgroundColor: '#F4A839', color: '#3B1280' }}>
                Dive In
              </Link>
            </div>
          </div>
          {/* Blob into deep purple — rich deep tones for depth */}
          <BlobDivider fill="#2D0D6B" fillDeep="#1C0A4F"/>
        </section>

        {/* ─── ABOUT (deep royal purple) ─── overlaps medium purple blob ── */}
        <section className="relative pb-32 px-4 text-center" style={{
          background: 'linear-gradient(160deg, #2D0D6B 0%, #1E0850 40%, #140638 70%, #0C0428 100%)',
          paddingTop: '168px', marginTop: '-148px', zIndex: 2,
        }}>
          <div className="absolute top-20 left-14 float-slow opacity-30"><StarSVG size={36} color="#C084FC"/></div>
          <div className="absolute top-28 right-16 float-mid opacity-22"><Sparkle4 size={26} color="#F4A839"/></div>
          <div className="absolute bottom-32 left-20 float-fast opacity-18"><Sparkle4 size={18} color="#C084FC"/></div>
          <div className="absolute top-1/2 left-6 opacity-8 pointer-events-none"><RainbowSVG/></div>

          {/* NO floating Dream Ideas book here — removed */}

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex justify-center mb-6">
              <Image src="/images/logo-purple.png" alt="Family Fables"
                width={90} height={90}
                style={{ filter: 'drop-shadow(0 4px 16px rgba(45,13,107,0.3))' }}
              />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-5"
              style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#FFFFFF' }}>
              Stories Built on a Family Legacy
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#C4B0EE' }}>
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
          {/* Blob into deepest purple — near-black for the final section */}
          <BlobDivider fill="#120430" fillDeep="#0A0220"/>
        </section>

        {/* ─── SHOP CTA (deepest purple, gold accents) ──────────────────────── */}
        <section className="relative pb-24 px-4 text-center" style={{
          background: 'linear-gradient(135deg, #120430 0%, #0A0220 60%, #060110 100%)',
          paddingTop: '168px', marginTop: '-148px', zIndex: 1,
        }}>
          <div className="absolute top-16 left-14 float-mid opacity-35"><Sparkle4 size={28} color="#C084FC"/></div>
          <div className="absolute top-20 right-12 float-slow opacity-28"><StarSVG size={26} color="#F4A839"/></div>

          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-fredoka), cursive', color: '#F4A839' }}>
              Ready to Start Reading?
            </h2>
            <p className="text-lg mb-8" style={{ color: '#C4B0EE' }}>
              All 11 books on Amazon — Prime shipping, no assembly required, and approximately zero splinters. Great for birthdays, holidays, or just because Tuesday deserves a story.
            </p>
            <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
              className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:-translate-y-1"
              style={{ backgroundColor: '#F4A839', color: '#0C0428' }}>
              Shop All Books on Amazon
            </a>
          </div>
        </section>

      </div>
    </>
  );
}

