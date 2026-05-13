'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const pages = [
  { num: 4,  file: 'page04-300dpi.png', label: 'Page 4'  },
  { num: 5,  file: 'page05-300dpi.png', label: 'Page 5'  },
  { num: 6,  file: 'page06-300dpi.png', label: 'Page 6'  },
  { num: 7,  file: 'page07-300dpi.png', label: 'Page 7'  },
  { num: 8,  file: 'page08-300dpi.png', label: 'Page 8'  },
  { num: 9,  file: 'page09-300dpi.png', label: 'Page 9'  },
  { num: 10, file: 'page10-300dpi.png', label: 'Page 10' },
  { num: 11, file: 'page11-300dpi.png', label: 'Page 11' },
];

export default function ColoringPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF8F2' }}>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #EDE0FF 0%, #D6F5F0 100%)' }}
      >
        {/* Decorative floaters */}
        <span className="absolute top-8 left-10 text-5xl float-slow select-none" aria-hidden>🐉</span>
        <span className="absolute top-12 right-12 text-4xl float-mid select-none" aria-hidden>✏️</span>
        <span className="absolute bottom-10 left-1/4 text-3xl float-fast select-none" aria-hidden>🖍️</span>
        <span className="absolute bottom-8 right-1/4 text-4xl float-slow select-none" aria-hidden>⭐</span>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: '#9B6FD0', color: 'white' }}>
            🎨 Free Printables
          </div>
          <h1
            className="text-5xl md:text-6xl font-display mb-4 leading-tight"
            style={{ color: '#2D1B69', fontFamily: "var(--font-fredoka), 'Fredoka One', cursive" }}
          >
            Color Amber&apos;s World! 🐉
          </h1>
          <p className="text-lg mb-2" style={{ color: '#5A4080' }}>
            Free coloring pages from <em>Amber the Dragon Keeper</em>
          </p>
          <p className="text-sm" style={{ color: '#7B6898' }}>
            Print as many copies as you want. Best on standard 8.5×11&quot; paper. Always free. 💜
          </p>
        </div>

        {/* Blob bottom */}
        <div className="absolute left-0 right-0 bottom-0" aria-hidden style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', width: '100%', height: 60 }}>
            <path d="M0,60 L0,28 Q200,0 400,32 Q600,60 800,24 Q1000,0 1200,30 Q1360,50 1440,20 L1440,60 Z"
              fill="#FDF8F2"/>
          </svg>
        </div>
      </section>

      {/* ── Grid ───────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {pages.map((p) => {
            const src = `/coloring-pages/amber-dragon-keeper/${p.file}`;
            return (
              <div
                key={p.num}
                className="group rounded-2xl overflow-hidden flex flex-col"
                style={{
                  backgroundColor: 'white',
                  boxShadow: '0 4px 20px rgba(107,63,160,0.10)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(107,63,160,0.18)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = '';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(107,63,160,0.10)';
                }}
              >
                {/* Thumbnail — click to preview */}
                <button
                  className="relative w-full overflow-hidden bg-gray-50 cursor-zoom-in"
                  style={{ aspectRatio: '1 / 1' }}
                  onClick={() => setLightbox(src)}
                  aria-label={`Preview ${p.label}`}
                >
                  <Image
                    src={src}
                    alt={`Amber the Dragon Keeper coloring page ${p.num}`}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-400"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  {/* Preview hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'rgba(155,111,208,0.15)' }}>
                    <span className="text-2xl">🔍</span>
                  </div>
                </button>

                {/* Footer */}
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: '#9B6FD0' }}>{p.label}</span>
                  <a
                    href={src}
                    download={`amber-dragon-keeper-${p.label.toLowerCase().replace(' ', '-')}.png`}
                    className="btn-shine flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105"
                    style={{ backgroundColor: '#6B3FA0', color: 'white' }}
                  >
                    ⬇ Print
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── How to print tip ─────────────────────────────────────────── */}
        <div className="mt-14 rounded-3xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #F0E8FF, #E0F7F4)' }}>
          <div className="text-4xl mb-3">🖨️</div>
          <h2
            className="text-2xl font-display mb-2"
            style={{ color: '#2D1B69', fontFamily: "var(--font-fredoka), 'Fredoka One', cursive" }}
          >
            Printing Tips
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: '#5A4080' }}>
            Download any page and open it with your photo viewer or browser, then print.
            For best results, select <strong>Fit to Page</strong> and use <strong>standard 8.5×11&quot;</strong> paper.
            These pages are 300 DPI — they&apos;ll look crisp on any printer. 🌟
          </p>
        </div>

        {/* ── CTA back to books ─────────────────────────────────────────── */}
        <div className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color: '#7B6898' }}>
            Love the story? Grab the full book! 🐉
          </p>
          <Link
            href="/books"
            className="btn-shine inline-block px-8 py-3 rounded-full font-bold text-sm shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: '#F4A839', color: '#2D1B69' }}
          >
            See All Our Books ✨
          </Link>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.80)' }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl overflow-hidden bg-white"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={lightbox}
              alt="Coloring page preview"
              width={2550}
              height={2550}
              className="w-full h-auto"
            />
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm font-semibold" style={{ color: '#7B6898' }}>
                Tap outside to close
              </span>
              <a
                href={lightbox}
                download
                className="btn-shine px-5 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: '#6B3FA0', color: 'white' }}
              >
                ⬇ Download Full Size
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
