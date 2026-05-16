import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Read a Story | Family Fables',
  description: 'Read along with your favourite Family Fables books — flip pages, hear the story, and go on an adventure!',
};

const STORIES = [
  {
    slug: 'poo-poo-face',
    title: "What's Your Poo Poo Face?",
    tagline: 'A hilarious potty-training adventure 🚽',
    cover: '/images/books/poo-poo-face.png',
    color: '#7030a0',
    accent: '#9b5dc8',
    badge: '🎉 Kids\' Favourite',
    pages: 16,
    voiceNote: 'Read aloud by a fun storybook narrator',
  },
  {
    slug: 'amber-dragon-keeper',
    title: 'Amber the Dragon Keeper',
    tagline: 'A magical journey to a world of dragons 🐉',
    cover: '/images/books/amber-dragon-keeper.png',
    color: '#009380',
    accent: '#00b89a',
    badge: '✨ Best Seller',
    pages: 18,
    voiceNote: 'Narrated by an adventurous storyteller',
  },
];

export default function ReadLandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #b8f0eb 0%, #dcf9f3 40%, #d9b7e5 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(14px, 3vw, 20px) clamp(16px, 5vw, 28px)',
        maxWidth: '900px',
        margin: '0 auto',
        width: '100%',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: '#005a4a',
          fontFamily: "'Concert One', cursive",
          fontSize: '1rem',
          opacity: 0.75,
          transition: 'opacity 0.2s',
        }}>
          <span style={{ fontSize: '1.2rem' }}>←</span> Home
        </Link>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image
            src="/images/logo-detail-860.png"
            alt="Family Fables"
            width={44}
            height={44}
          />
        </Link>
      </header>

      {/* Hero text */}
      <div style={{
        textAlign: 'center',
        padding: '16px 24px 40px',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        <h1 style={{
          fontFamily: "'Concert One', cursive",
          fontSize: 'clamp(2.4rem, 8vw, 3.8rem)',
          color: '#2a0038',
          lineHeight: 1,
          marginBottom: '12px',
          textShadow: '2px 2px 0 rgba(255,255,255,0.4)',
        }}>
          📖 Read a Story
        </h1>
        <p style={{
          fontFamily: "'Catamaran', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: '#005a4a',
          opacity: 0.8,
        }}>
          Pick a book, flip the pages, and listen along
        </p>
      </div>

      {/* Book cards */}
      <main className="read-landing-cards" style={{
        display: 'flex',
        gap: '28px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '0 24px 60px',
        maxWidth: '860px',
        margin: '0 auto',
        width: '100%',
      }}>
        {STORIES.map((story) => (
          <Link
            key={story.slug}
            href={`/read/${story.slug}`}
            className="read-landing-card"
            style={{
              textDecoration: 'none',
              flex: '1 1 320px',
              maxWidth: '380px',
            }}
          >
            <div className="read-landing-card-inner" style={{
              background: '#ffffff',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              border: `3px solid ${story.accent}`,
              transition: 'transform 0.2s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
            >
              {/* Cover image */}
              <div style={{
                position: 'relative',
                background: `linear-gradient(135deg, ${story.color}, ${story.accent})`,
                padding: '28px 28px 0',
                display: 'flex',
                justifyContent: 'center',
              }}>
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: 16, right: 16,
                  background: '#ff9c1a',
                  color: '#fff',
                  fontFamily: "'Concert One', cursive",
                  fontSize: '0.75rem',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  boxShadow: '0 2px 8px rgba(255,156,26,0.4)',
                }}>
                  {story.badge}
                </div>
                <Image
                  src={story.cover}
                  alt={story.title}
                  width={220}
                  height={280}
                  style={{
                    width: 'auto',
                    height: '220px',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: '20px 24px 24px' }}>
                <h2 style={{
                  fontFamily: "'Concert One', cursive",
                  fontSize: 'clamp(1.2rem, 3.5vw, 1.45rem)',
                  color: '#1a0028',
                  marginBottom: '6px',
                  lineHeight: 1.2,
                }}>
                  {story.title}
                </h2>
                <p style={{
                  fontFamily: "'Catamaran', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#555',
                  marginBottom: '16px',
                }}>
                  {story.tagline}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.8rem',
                    color: '#777',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    📄 {story.pages} pages
                  </span>
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.8rem',
                    color: '#777',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    🎙️ {story.voiceNote}
                  </span>
                </div>

                <div style={{
                  background: story.color,
                  color: '#fff',
                  fontFamily: "'Concert One', cursive",
                  fontSize: '1.05rem',
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: '12px',
                  letterSpacing: '0.02em',
                }}>
                  Read This Book →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* Footer note */}
      <div style={{
        textAlign: 'center',
        paddingBottom: '32px',
        fontFamily: "'Open Sans', sans-serif",
        fontSize: '0.8rem',
        color: '#005a4a',
        opacity: 0.6,
      }}>
        More stories coming soon 🌟
      </div>
    </div>
  );
}
