'use client';

import { useEffect, useRef, useState } from 'react';

interface Quote {
  text: string;
  author: string;
  rotation: number;
}

const QUOTES: Quote[] = [
  {
    text: '"My son asked for this three nights in a row. THREE."',
    author: '— Sarah M., mom of 2',
    rotation: 3,
  },
  {
    text: '"Finally a book that makes my kid laugh AND me."',
    author: '— Dad of two, 5-star review',
    rotation: -2,
  },
  {
    text: '"She carried it to show-and-tell. That\'s a five-star review right there."',
    author: '— Preschool parent',
    rotation: 4,
  },
  {
    text: '"We didn\'t buy one book. We bought all of them."',
    author: '— Grandma who regrets absolutely nothing',
    rotation: -3,
  },
];

function HeartSVG() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" aria-hidden fill="#FF6B9D" opacity={0.75}>
      <path d="M11 18.5 C11 18.5 1 12 1 5.5 C1 2.9 3.1 1 5.8 1 C7.8 1 9.6 2.1 11 3.9 C12.4 2.1 14.2 1 16.2 1 C18.9 1 21 2.9 21 5.5 C21 12 11 18.5 11 18.5 Z" />
    </svg>
  );
}

function QuoteCard({ quote, index }: { quote: Quote; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: index % 2 === 0 ? '#FFFDF7' : '#FFF8F0',
        borderRadius: 12,
        padding: '16px 20px',
        boxShadow: '0 4px 18px rgba(45,27,105,0.12), 0 1px 4px rgba(45,27,105,0.08)',
        transform: visible
          ? `rotate(${quote.rotation}deg) translateY(0)`
          : `rotate(${quote.rotation}deg) translateY(24px)`,
        opacity: visible ? 1 : 0,
        transition: `opacity 0.55s ease ${index * 0.12}s, transform 0.55s ease ${index * 0.12}s`,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Heart icon in top-right corner */}
      <div style={{ position: 'absolute', top: 10, right: 12 }}>
        <HeartSVG />
      </div>

      <p
        style={{
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: 19,
          lineHeight: 1.4,
          color: '#3B1A8C',
          margin: 0,
          paddingRight: 28,
        }}
      >
        {quote.text}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-caveat), cursive',
          fontSize: 15,
          color: '#7B5FC4',
          margin: 0,
          fontWeight: 600,
        }}
      >
        {quote.author}
      </p>
    </div>
  );
}

export default function ParentQuotes() {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#F0EBF8' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2"
            style={{
              fontFamily: 'var(--font-fredoka), cursive',
              color: '#3B1A8C',
            }}
          >
            What Parents Are Saying ❤️
          </h2>
          <p style={{ color: '#7B6898', fontSize: 15 }}>
            Straight from the bedtime trenches.
          </p>
        </div>

        {/* 2×2 grid on desktop, stacked on mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px 32px',
          }}
        >
          {QUOTES.map((quote, i) => (
            <QuoteCard key={i} quote={quote} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
