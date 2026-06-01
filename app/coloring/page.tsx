'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ColoringPage {
  file: string;
  label: string;
}

interface Book {
  slug: string;
  title: string;
  emoji: string;
  pages: ColoringPage[];
}

// Landscape (2:1) books: amber-dragon-keeper, dream-ideas, finding-hampton, one-tom-turkey, poo-poo-face
// Square (1:1) books: brian-the-ghost, frog-a-dog, gilroys-gobble, ollie-come-home, the-shut-in-button, what-a-doodle-do
const LANDSCAPE_BOOKS = new Set([
  'amber-dragon-keeper',
  'dream-ideas',
  'finding-hampton',
  'one-tom-turkey',
  'poo-poo-face',
]);

const books: Book[] = [
  {
    slug: 'amber-dragon-keeper',
    title: 'Amber the Dragon Keeper',
    emoji: '🐉',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'brian-the-ghost',
    title: 'Brian the Ghost',
    emoji: '👻',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'dream-ideas',
    title: 'Dream Ideas',
    emoji: '💭',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'finding-hampton',
    title: 'Finding Hampton',
    emoji: '🐾',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'frog-a-dog',
    title: 'Frog-a-Dog',
    emoji: '🐸',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'gilroys-gobble',
    title: "Gilroy's Gobble",
    emoji: '🦃',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'ollie-come-home',
    title: 'Ollie Come Home',
    emoji: '🏠',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'one-tom-turkey',
    title: 'One Tom Turkey',
    emoji: '🦃',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'poo-poo-face',
    title: "What's Your Poo Poo Face?",
    emoji: '💩',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'the-shut-in-button',
    title: 'The Shut-in Button',
    emoji: '🔘',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
  {
    slug: 'what-a-doodle-do',
    title: 'What a Doodle Do',
    emoji: '✏️',
    pages: [
      { file: 'page-01.png', label: 'Page 1' },
      { file: 'page-02.png', label: 'Page 2' },
      { file: 'page-03.png', label: 'Page 3' },
      { file: 'page-04.png', label: 'Page 4' },
      { file: 'page-05.png', label: 'Page 5' },
    ],
  },
];

const bookColors = [
  { from: '#7C3AED', to: '#4F46E5' },
  { from: '#0EA5E9', to: '#6366F1' },
  { from: '#10B981', to: '#0EA5E9' },
  { from: '#F59E0B', to: '#EF4444' },
  { from: '#EC4899', to: '#8B5CF6' },
  { from: '#14B8A6', to: '#3B82F6' },
  { from: '#F97316', to: '#EF4444' },
  { from: '#8B5CF6', to: '#EC4899' },
  { from: '#22C55E', to: '#16A34A' },
  { from: '#3B82F6', to: '#1D4ED8' },
  { from: '#EF4444', to: '#F97316' },
];

export default function ColoringPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxLandscape, setLightboxLandscape] = useState(false);

  const openLightbox = (src: string, title: string, isLandscape: boolean) => {
    setLightboxSrc(src);
    setLightboxTitle(title);
    setLightboxLandscape(isLandscape);
  };

  const closeLightbox = () => setLightboxSrc(null);

  return (
    <main style={{ background: '#FDF8F2', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #7C3AED 0%, #0EA5E9 50%, #10B981 100%)',
        padding: '60px 24px',
        textAlign: 'center',
        color: 'white',
      }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: 0, marginBottom: '16px' }}>
          Free Coloring Pages from ALL Our Books! 🎨
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', margin: 0, opacity: 0.95, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Print and color characters from every Family Fables story — always free!
        </p>
      </div>

      {/* Book sections */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        {books.map((book, bookIdx) => {
          const color = bookColors[bookIdx % bookColors.length];
          const isLandscape = LANDSCAPE_BOOKS.has(book.slug);
          return (
            <section key={book.slug} style={{ marginBottom: '64px' }}>
              {/* Book header */}
              <div style={{
                background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                borderRadius: '16px 16px 0 0',
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{ fontSize: '2rem' }}>{book.emoji}</span>
                <h2 style={{ margin: 0, color: 'white', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 800 }}>
                  {book.title}
                </h2>
              </div>

              {/* Page grid */}
              <div style={{
                background: 'white',
                borderRadius: '0 0 16px 16px',
                padding: '24px',
                boxShadow: `0 4px 24px ${color.from}33`,
                display: 'grid',
                gridTemplateColumns: isLandscape
                  ? 'repeat(auto-fill, minmax(280px, 1fr))'
                  : 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '16px',
              }}>
                {book.pages.map((page) => {
                  const imgSrc = `/coloring-pages/${book.slug}/${page.file}`;
                  return (
                    <div
                      key={page.file}
                      style={{
                        background: '#FAFAFA',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: `0 2px 12px ${color.from}40`,
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px) scale(1.02)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${color.from}60`;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.transform = '';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 2px 12px ${color.from}40`;
                      }}
                      onClick={() => openLightbox(imgSrc, `${book.title} — ${page.label}`, isLandscape)}
                    >
                      <div style={{
                        position: 'relative',
                        aspectRatio: isLandscape ? '2 / 1' : '1 / 1',
                        background: '#F3F3F3',
                      }}>
                        <Image
                          src={imgSrc}
                          alt={`${book.title} ${page.label} coloring page`}
                          fill
                          style={{ objectFit: 'contain', padding: '8px' }}
                          unoptimized
                        />
                      </div>
                      <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#555', fontWeight: 600 }}>{page.label}</span>
                        <a
                          href={imgSrc}
                          download
                          onClick={e => e.stopPropagation()}
                          style={{
                            background: `linear-gradient(135deg, ${color.from}, ${color.to})`,
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '4px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          ⬇ Print
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Printing tips */}
        <section style={{
          background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '48px',
        }}>
          <h2 style={{ color: '#92400E', fontSize: '1.5rem', fontWeight: 800, marginTop: 0 }}>🖨️ Printing Tips</h2>
          <ul style={{ color: '#78350F', lineHeight: 1.8, fontSize: '1rem' }}>
            <li>Use <strong>Letter size paper (8.5&quot; × 11&quot;)</strong> for best fit</li>
            <li>Set printer to <strong>&quot;Fit to Page&quot;</strong> or <strong>&quot;Scale to Fit&quot;</strong></li>
            <li>Select <strong>Black &amp; White</strong> mode to save color ink</li>
            <li>Heavier paper (65 lb cardstock) works great with markers</li>
            <li>Crayons, colored pencils, and washable markers all work beautifully!</li>
          </ul>
        </section>

        {/* CTA */}
        <div style={{ textAlign: 'center', paddingBottom: '32px' }}>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '16px' }}>
            Want to read the full stories? Check out all our books!
          </p>
          <Link
            href="/books"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              padding: '14px 36px',
              fontSize: '1.1rem',
              fontWeight: 800,
              boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
            }}
          >
            📚 See All Our Books
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={closeLightbox}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '16px',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: '#333' }}>{lightboxTitle}</h3>
              <button
                onClick={closeLightbox}
                style={{
                  background: '#EEE',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                }}
              >×</button>
            </div>
            <img
              src={lightboxSrc}
              alt={lightboxTitle}
              style={{
                maxWidth: lightboxLandscape ? '90vw' : '80vw',
                maxHeight: '75vh',
                width: lightboxLandscape ? '90vw' : 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
            <a
              href={lightboxSrc}
              download
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #0EA5E9)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px',
                padding: '10px 28px',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              ⬇ Download &amp; Print
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
