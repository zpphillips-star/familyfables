'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// Clamp a value between min and max
function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export default function TiltNarwhal({ size = 340 }: { size?: number }) {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [wiggling, setWiggling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [secretShown, setSecretShown] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const mobile = typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    setIsMobile(mobile);
  }, []);

  const attachOrientation = useCallback(() => {
    const handler = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right tilt → X
      const beta = e.beta ?? 0;   // forward/back tilt → Y (normalize away from ~45° resting angle)
      setTiltX(clamp(gamma * 0.55, -20, 20));
      setTiltY(clamp((beta - 45) * 0.35, -15, 15));
    };
    window.addEventListener('deviceorientation', handler, { passive: true });
    cleanupRef.current = () => window.removeEventListener('deviceorientation', handler);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    // iOS 13+ requires permission for DeviceOrientationEvent
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<'granted' | 'denied'>;
    };

    if (typeof DOE.requestPermission === 'function') {
      // Don't auto-request on mount — attach a one-time click handler to request permission
      const requestOnInteraction = async () => {
        try {
          const perm = await DOE.requestPermission!();
          if (perm === 'granted') attachOrientation();
        } catch (_) {
          // silently fail — tilt just won't work
        }
      };
      window.addEventListener('touchstart', requestOnInteraction, { once: true });
      return () => window.removeEventListener('touchstart', requestOnInteraction);
    } else {
      // Non-iOS: attach immediately
      attachOrientation();
      return () => cleanupRef.current?.();
    }
  }, [isMobile, attachOrientation]);

  const handleInteract = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (wiggling) return;

    setWiggling(true);
    setTimeout(() => setWiggling(false), 750);

    const newCount = tapCount + 1;
    setTapCount(newCount);

    // Easter egg at 7 taps
    if (newCount === 7) {
      setTimeout(() => {
        setSecretShown(true);
        setTimeout(() => setSecretShown(false), 4000);
      }, 300);
    }
  };

  const mobileTransform = isMobile
    ? `translateX(${tiltX}px) translateY(${tiltY}px)`
    : undefined;

  return (
    <div
      className="relative inline-block select-none"
      style={{ cursor: 'pointer' }}
      onClick={handleInteract}
      onTouchStart={handleInteract}
    >
      {/* "tap me!" hint */}
      <div
        className="absolute -top-9 left-1/2 text-sm font-bold pointer-events-none whitespace-nowrap"
        style={{ transform: 'translateX(-50%)', color: '#A8E8EC', opacity: 0.85 }}
      >
        tap me!
      </div>

      <Image
        src="/images/logo-detail-860.png"
        alt="Family Fables narwhal mascot"
        width={size}
        height={size}
        className={wiggling ? 'narwhal-wiggle' : isMobile ? '' : 'hero-bob'}
        style={{
          maxWidth: '88vw',
          filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.35))',
          transform: mobileTransform,
          transition: isMobile && !wiggling ? 'transform 0.12s ease-out' : undefined,
        }}
        priority
      />

      {/* Secret easter egg toast */}
      {secretShown && (
        <div
          className="absolute -top-20 left-1/2 pointer-events-none z-50"
          style={{ transform: 'translateX(-50%)', animation: 'fadeInUp 0.4s ease' }}
        >
          <div
            className="px-5 py-3 rounded-2xl text-sm font-bold text-center whitespace-nowrap shadow-2xl"
            style={{ backgroundColor: '#F4A839', color: '#2D0D6B', border: '3px solid white' }}
          >
            You found a secret! The narwhal loves being tickled 🎉
          </div>
        </div>
      )}
    </div>
  );
}
