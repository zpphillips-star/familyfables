'use client';

import { useState, useEffect } from 'react';
import '../app/bedtime.css';

function MoonIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M18 3 C11 5 7 12 9 19 C11 26 19 29 26 27 C18 31 7 25 4 16 C1 7 8 -2 17 1 C17.6 1.2 18 2 18 3 Z"
        fill="#F4DAFF"
      />
      <circle cx="21" cy="7" r="1.8" fill="#F4DAFF" opacity="0.5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <circle cx="13" cy="13" r="5" fill="#F4A839" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="13" y1="13"
          x2={13 + 9 * Math.cos((angle * Math.PI) / 180)}
          y2={13 + 9 * Math.sin((angle * Math.PI) / 180)}
          stroke="#F4A839"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2.5,
  duration: `${2 + Math.random() * 4}s`,
  delay: `${Math.random() * 4}s`,
}));

export default function BedtimeToggle() {
  const [bedtime, setBedtime] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.getAttribute('data-mode') === 'bedtime';
    setBedtime(isDark);
  }, []);

  const toggle = () => {
    const next = !bedtime;
    setBedtime(next);
    if (next) {
      document.documentElement.setAttribute('data-mode', 'bedtime');
      document.documentElement.setAttribute('data-bedtime', 'true');
      try { localStorage.setItem('ff-bedtime', 'on'); } catch (_) {}
      try { localStorage.setItem('bedtime-mode', 'true'); } catch (_) {}
    } else {
      document.documentElement.removeAttribute('data-mode');
      document.documentElement.setAttribute('data-bedtime', 'false');
      try { localStorage.removeItem('ff-bedtime'); } catch (_) {}
      try { localStorage.removeItem('bedtime-mode'); } catch (_) {}
    }
  };

  return (
    <>
      {bedtime && (
        <div className="pointer-events-none fixed inset-0 z-[9990]" aria-hidden>
          {STARS.map((s) => (
            <div
              key={s.id}
              className="star-field-dot"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                '--duration': s.duration,
                '--delay': s.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
      <button
        className="bedtime-btn"
        onClick={toggle}
        aria-label={bedtime ? 'Switch to day mode' : 'Switch to bedtime mode'}
        title={bedtime ? 'Rise and shine!' : 'Bedtime mode'}
      >
        {bedtime ? <SunIcon /> : <MoonIcon />}
      </button>
    </>
  );
}
