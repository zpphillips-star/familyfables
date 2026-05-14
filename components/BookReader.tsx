"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookReaderProps {
  bookSlug: string;
  title: string;
  totalPages: number;
  storyPages: number[];
  narration: (string | null)[];
}

export default function BookReader({
  bookSlug,
  title,
  totalPages,
  storyPages,
  narration,
}: BookReaderProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed
  const [isReading, setIsReading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [flipDir, setFlipDir] = useState<"left" | "right" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [audioSupported, setAudioSupported] = useState(false);
  const [showStartOverlay, setShowStartOverlay] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check audio support
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudioSupported("speechSynthesis" in window);
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopSpeech();
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, []);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 4000);
  }, []);

  useEffect(() => {
    resetControlsTimer();
    return () => {
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, [currentPage, resetControlsTimer]);

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsReading(false);
  };

  const pageNum = (idx: number) => String(idx + 1).padStart(3, "0");
  const imgSrc = (idx: number) =>
    `/images/reader/${bookSlug}/page-${pageNum(idx)}.jpg`;

  const speakPage = useCallback(
    (pageIdx: number, onEnd?: () => void) => {
      const text = narration[pageIdx];
      if (!text) {
        setIsReading(false);
        onEnd?.();
        return;
      }

      stopSpeech();

      // Try MP3 first
      const mp3Path = `/audio/reader/${bookSlug}/page-${pageNum(pageIdx)}.mp3`;
      const audio = new Audio(mp3Path);
      audioRef.current = audio;

      audio.onloadeddata = () => {
        setIsReading(true);
        audio.play();
        audio.onended = () => {
          setIsReading(false);
          onEnd?.();
        };
        audio.onerror = null;
      };

      audio.onerror = () => {
        // Fallback: Web Speech API
        if (!synthRef.current) {
          onEnd?.();
          return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.88;
        utterance.pitch = 1.1;
        utterance.volume = 1;

        // Prefer a friendly female voice
        const voices = synthRef.current.getVoices();
        const preferred = voices.find(
          (v) =>
            v.name.toLowerCase().includes("samantha") ||
            v.name.toLowerCase().includes("karen") ||
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("female") ||
            (v.lang.startsWith("en") && v.name.toLowerCase().includes("google"))
        );
        if (preferred) utterance.voice = preferred;

        utteranceRef.current = utterance;
        utterance.onstart = () => setIsReading(true);
        utterance.onend = () => {
          setIsReading(false);
          onEnd?.();
        };
        utterance.onerror = () => {
          setIsReading(false);
          onEnd?.();
        };

        synthRef.current.speak(utterance);
      };

      // Trigger load
      audio.load();
    },
    [bookSlug, narration]
  );

  const goToPage = useCallback(
    (newIdx: number, direction: "left" | "right") => {
      if (isFlipping || newIdx < 0 || newIdx >= totalPages) return;
      stopSpeech();
      setFlipDir(direction);
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(newIdx);
        setIsFlipping(false);
        setFlipDir(null);
      }, 350);
    },
    [isFlipping, totalPages]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1, "left");
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1, "right");
  }, [currentPage, goToPage]);

  // Auto-play: read page then advance
  const autoPlayPage = useCallback(
    (pageIdx: number) => {
      if (!autoPlay) return;
      const text = narration[pageIdx];
      if (text) {
        speakPage(pageIdx, () => {
          // Pause 1.5s then advance
          autoPlayTimerRef.current = setTimeout(() => {
            if (pageIdx < totalPages - 1) {
              goToPage(pageIdx + 1, "left");
            } else {
              setAutoPlay(false);
            }
          }, 1500);
        });
      } else {
        // No narration — pause briefly then advance
        autoPlayTimerRef.current = setTimeout(() => {
          if (pageIdx < totalPages - 1) {
            goToPage(pageIdx + 1, "left");
          } else {
            setAutoPlay(false);
          }
        }, 2000);
      }
    },
    [autoPlay, narration, speakPage, totalPages, goToPage]
  );

  // Trigger auto-play when page changes in auto mode
  useEffect(() => {
    if (autoPlay && !isFlipping) {
      autoPlayPage(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isFlipping, autoPlay]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        resetControlsTimer();
        nextPage();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        resetControlsTimer();
        prevPage();
      } else if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nextPage, prevPage, router, resetControlsTimer]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      resetControlsTimer();
      if (dx < 0) nextPage();
      else prevPage();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleReadAloud = () => {
    if (isReading) {
      stopSpeech();
    } else {
      speakPage(currentPage);
    }
  };

  const handleAutoPlay = () => {
    if (autoPlay) {
      setAutoPlay(false);
      stopSpeech();
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    } else {
      setAutoPlay(true);
    }
  };

  const startReading = () => {
    setShowStartOverlay(false);
    resetControlsTimer();
  };

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <div
      className="book-reader"
      onClick={resetControlsTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Start Overlay */}
      {showStartOverlay && (
        <div className="book-reader__start-overlay" onClick={startReading}>
          <div className="book-reader__start-card">
            <div className="book-reader__start-icon">📖</div>
            <h1>{title}</h1>
            <p>A Family Fables Story</p>
            <button className="book-reader__start-btn" onClick={startReading}>
              Open Book
            </button>
            <button
              className="book-reader__start-btn book-reader__start-btn--secondary"
              onClick={() => {
                startReading();
                setTimeout(() => setAutoPlay(true), 400);
              }}
            >
              🔊 Read It To Me!
            </button>
          </div>
        </div>
      )}

      {/* Page image */}
      <div
        className={`book-reader__page ${
          isFlipping
            ? flipDir === "left"
              ? "book-reader__page--flip-left"
              : "book-reader__page--flip-right"
            : ""
        }`}
      >
        <Image
          src={imgSrc(currentPage)}
          alt={`Page ${currentPage + 1} of ${title}`}
          fill
          style={{ objectFit: "contain" }}
          priority={currentPage < 3}
          sizes="100vw"
        />
      </div>

      {/* Preload next + prev */}
      {currentPage < totalPages - 1 && (
        <div style={{ display: "none" }}>
          <Image
            src={imgSrc(currentPage + 1)}
            alt=""
            fill
            sizes="1px"
          />
        </div>
      )}

      {/* Tap zones — left/right halves */}
      {!showStartOverlay && (
        <>
          <button
            className="book-reader__tap-zone book-reader__tap-zone--left"
            onClick={prevPage}
            disabled={isFirstPage}
            aria-label="Previous page"
          />
          <button
            className="book-reader__tap-zone book-reader__tap-zone--right"
            onClick={nextPage}
            disabled={isLastPage}
            aria-label="Next page"
          />
        </>
      )}

      {/* Controls overlay */}
      {!showStartOverlay && (
        <div className={`book-reader__controls ${showControls ? "book-reader__controls--visible" : ""}`}>
          {/* Top bar */}
          <div className="book-reader__top-bar">
            <button
              className="book-reader__btn book-reader__btn--close"
              onClick={() => { stopSpeech(); router.back(); }}
              aria-label="Close reader"
            >
              ✕
            </button>
            <span className="book-reader__title">{title}</span>
            <div className="book-reader__audio-btns">
              {audioSupported && (
                <>
                  <button
                    className={`book-reader__btn ${isReading ? "book-reader__btn--active" : ""}`}
                    onClick={handleReadAloud}
                    aria-label={isReading ? "Stop reading" : "Read this page"}
                    title={isReading ? "Stop" : "Read page aloud"}
                  >
                    {isReading ? "⏸" : "🔊"}
                  </button>
                  <button
                    className={`book-reader__btn ${autoPlay ? "book-reader__btn--active" : ""}`}
                    onClick={handleAutoPlay}
                    aria-label={autoPlay ? "Stop auto-read" : "Auto-read book"}
                    title={autoPlay ? "Stop auto-reading" : "Read whole book"}
                  >
                    {autoPlay ? "⏹" : "▶"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="book-reader__bottom-bar">
            <button
              className="book-reader__nav-btn"
              onClick={prevPage}
              disabled={isFirstPage}
              aria-label="Previous page"
            >
              ‹
            </button>

            {/* Page dots */}
            <div className="book-reader__dots">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`book-reader__dot ${i === currentPage ? "book-reader__dot--active" : ""}`}
                  onClick={() => {
                    const dir = i > currentPage ? "left" : "right";
                    goToPage(i, dir);
                  }}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="book-reader__nav-btn"
              onClick={nextPage}
              disabled={isLastPage}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        .book-reader {
          position: fixed;
          inset: 0;
          background: #0a0a0a;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
        }

        /* Hide root layout's navbar/footer padding */
        body {
          padding: 0 !important;
          margin: 0 !important;
        }

        nav, footer {
          display: none !important;
        }

        .book-reader__page {
          position: absolute;
          inset: 0;
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.35s ease;
        }

        .book-reader__page--flip-left {
          transform: translateX(-6%) scale(0.96);
          opacity: 0;
        }

        .book-reader__page--flip-right {
          transform: translateX(6%) scale(0.96);
          opacity: 0;
        }

        /* Start overlay */
        .book-reader__start-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          backdrop-filter: blur(8px);
        }

        .book-reader__start-card {
          text-align: center;
          padding: 2.5rem 2rem;
          max-width: 380px;
          width: 90%;
        }

        .book-reader__start-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .book-reader__start-card h1 {
          font-family: var(--font-concert-one), sans-serif;
          color: #fff;
          font-size: 1.6rem;
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }

        .book-reader__start-card p {
          color: rgba(255,255,255,0.6);
          font-size: 0.9rem;
          margin: 0 0 2rem;
          font-family: var(--font-open-sans), sans-serif;
        }

        .book-reader__start-btn {
          display: block;
          width: 100%;
          padding: 0.9rem 1.5rem;
          border-radius: 50px;
          border: none;
          font-family: var(--font-concert-one), sans-serif;
          font-size: 1.1rem;
          cursor: pointer;
          margin-bottom: 0.75rem;
          transition: transform 0.15s, box-shadow 0.15s;
          background: #7c3aed;
          color: #fff;
        }

        .book-reader__start-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.5);
        }

        .book-reader__start-btn--secondary {
          background: #0ea5e9;
        }

        .book-reader__start-btn--secondary:hover {
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5);
        }

        /* Tap zones */
        .book-reader__tap-zone {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 30%;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 10;
        }

        .book-reader__tap-zone--left {
          left: 0;
        }

        .book-reader__tap-zone--right {
          right: 0;
        }

        .book-reader__tap-zone:disabled {
          cursor: default;
          pointer-events: none;
        }

        /* Controls */
        .book-reader__controls {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .book-reader__controls--visible {
          opacity: 1;
        }

        .book-reader__top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%);
          pointer-events: auto;
          gap: 0.75rem;
        }

        .book-reader__title {
          font-family: var(--font-concert-one), sans-serif;
          color: rgba(255,255,255,0.9);
          font-size: 0.95rem;
          flex: 1;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .book-reader__audio-btns {
          display: flex;
          gap: 0.5rem;
        }

        .book-reader__btn {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 1.1rem;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.15s;
          backdrop-filter: blur(4px);
          pointer-events: auto;
          flex-shrink: 0;
        }

        .book-reader__btn:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }

        .book-reader__btn--active {
          background: rgba(124, 58, 237, 0.7);
        }

        .book-reader__btn--close {
          font-size: 0.9rem;
        }

        .book-reader__bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 1.25rem 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
          pointer-events: auto;
          gap: 1rem;
        }

        .book-reader__nav-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          font-size: 1.6rem;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          backdrop-filter: blur(4px);
          flex-shrink: 0;
          line-height: 1;
          padding-bottom: 2px;
        }

        .book-reader__nav-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.3);
        }

        .book-reader__nav-btn:disabled {
          opacity: 0.2;
          cursor: default;
        }

        .book-reader__dots {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          justify-content: center;
          max-width: calc(100vw - 140px);
        }

        .book-reader__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          padding: 0;
          flex-shrink: 0;
        }

        .book-reader__dot:hover {
          background: rgba(255,255,255,0.6);
        }

        .book-reader__dot--active {
          background: #fff;
          transform: scale(1.35);
        }
      `}</style>
    </div>
  );
}
