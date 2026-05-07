import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Free Kids Activities | Family Fables',
  description: 'Free printable coloring pages and activities for kids — from the Family Fables books.',
  robots: 'noindex', // hidden from search engines for now
};

const ff = "'Concert One', cursive";

// Books we'll eventually have coloring pages for
const BOOKS = [
  { id: 'poo-poo-face',       title: "What's Your Poo Poo Face", cover: '/images/books/poo-poo-face.png',       color: '#9B6FD0' },
  { id: 'dream-ideas',        title: 'Dream Ideas',               cover: '/images/books/dream-ideas.png',        color: '#5B9BD5' },
  { id: 'amber-dragon-keeper',title: 'Amber The Dragon Keeper',   cover: '/images/books/amber-dragon-keeper.jpg',color: '#E86BB5' },
  { id: 'gilroys-gobble',     title: "Gilroy's Gobble",           cover: '/images/books/gilroys-gobble.png',     color: '#F4A839' },
  { id: 'finding-hampton',    title: 'Finding Hampton',           cover: '/images/books/finding-hampton.jpg',    color: '#5CB85C' },
  { id: 'lumpiest-pumpkin',   title: 'The Lumpiest Pumpkin',      cover: '/images/books/lumpiest-pumpkin.png',   color: '#E07B39' },
  { id: 'one-tom-turkey',     title: 'One Tom Turkey',            cover: '/images/books/one-tom-turkey.png',     color: '#C06B39' },
  { id: 'ollie-come-home',    title: 'Ollie Come Home',           cover: '/images/books/ollie-come-home.png',    color: '#5CB85C' },
  { id: 'what-a-doodle-do',   title: 'What-a-Doodle-Do',         cover: '/images/books/what-a-doodle-do.jpg',   color: '#E86BB5' },
  { id: 'shut-in-button',     title: 'The Shut-In Button',        cover: '/images/books/shut-in-button.png',     color: '#5B9BD5' },
  { id: 'frog-a-dog',         title: 'Frog a Dog',                cover: '/images/books/frog-a-dog.png',         color: '#9B6FD0' },
];

export default function ActivitiesPage() {
  return (
    <div style={{ background: '#daf8f2', minHeight: '100vh', fontFamily: ff }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #daf8f2 0%, #d9b5e5 100%)',
        padding: 'clamp(60px, 10vw, 100px) 32px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative bg circles */}
        {['15%','80%','50%'].map((left, i) => (
          <div key={i} aria-hidden style={{
            position: 'absolute',
            top: i === 1 ? '10%' : '40%',
            left,
            width: `${120 + i * 60}px`,
            height: `${120 + i * 60}px`,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#F7941D',
            color: '#fff',
            padding: '6px 20px',
            borderRadius: '50px',
            fontSize: '0.9rem',
            marginBottom: '20px',
            boxShadow: '0 4px 14px rgba(247,148,29,0.4)',
          }}>
            🎨 Totally Free — No Signup Needed
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            color: '#007d68',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}>
            Free Kids Coloring Pages
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#006e59',
            maxWidth: '560px',
            margin: '0 auto 36px',
            lineHeight: 1.65,
          }}>
            Print &amp; color your favorite Family Fables characters. New pages added with every book. Just print, grab some crayons, and go!
          </p>

          <Link href="/" style={{
            fontFamily: ff,
            fontSize: '0.95rem',
            color: '#007d68',
            textDecoration: 'none',
            opacity: 0.75,
          }}>
            ← Back to Family Fables
          </Link>
        </div>
      </div>

      {/* Book grid — each card = coming soon placeholder */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '60px 32px 80px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          {BOOKS.map(book => (
            <div key={book.id} style={{
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}>
              {/* Coming soon ribbon */}
              <div style={{
                position: 'absolute',
                top: '14px',
                right: '-28px',
                background: book.color,
                color: '#fff',
                fontSize: '0.65rem',
                fontFamily: ff,
                letterSpacing: '0.05em',
                padding: '4px 36px',
                transform: 'rotate(35deg)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1,
              }}>
                SOON
              </div>

              {/* Cover thumbnail — grayscale hint at what's coming */}
              <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#f0f0f0' }}>
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  style={{ objectFit: 'cover', filter: 'grayscale(85%) brightness(1.1)' }}
                  sizes="220px"
                />
                {/* Overlay with pencil icon */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.45)',
                }}>
                  <span style={{ fontSize: '2.5rem' }}>✏️</span>
                </div>
              </div>

              {/* Title */}
              <div style={{ padding: '14px 16px 18px' }}>
                <p style={{
                  fontFamily: ff,
                  fontSize: '0.9rem',
                  color: '#007d68',
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {book.title}
                </p>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#999',
                  margin: '6px 0 0',
                  fontFamily: 'sans-serif',
                }}>
                  Coloring pages coming soon
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <p style={{ color: '#006e59', fontSize: '1rem', marginBottom: '20px' }}>
            Want to be the first to know when pages drop?
          </p>
          <Link href="/#newsletter" style={{
            display: 'inline-block',
            background: '#F7941D',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: '50px',
            fontFamily: ff,
            fontSize: '1rem',
            textDecoration: 'none',
            letterSpacing: '0.03em',
            boxShadow: '0 4px 18px rgba(247,148,29,0.4)',
          }}>
            Join the Family Newsletter →
          </Link>
        </div>
      </div>
    </div>
  );
}
