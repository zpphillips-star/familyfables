'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

type GameState = 'idle' | 'playing' | 'gameover';

interface Crystal {
  id: number;
  x: number;
  y: number;
  speed: number;
  collected: boolean;
}

interface MutableGameState {
  running: boolean;
  score: number;
  misses: number;
  timeLeft: number;
  amberX: number;
  crystals: Crystal[];
  crystalId: number;
  spawnTimer: number;
  lastTime: number;
  keys: { left: boolean; right: boolean };
  canvasW: number;
  canvasH: number;
}

const AMBER_SPEED = 360; // px per second
const CRYSTAL_SIZE = 26;
const AMBER_SIZE = 44;
const GAME_DURATION = 30;
const MAX_MISSES = 3;

export default function AmberGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [highScore, setHighScore] = useState(0);

  const gameRef = useRef<MutableGameState>({
    running: false,
    score: 0,
    misses: 0,
    timeLeft: GAME_DURATION,
    amberX: 0,
    crystals: [],
    crystalId: 0,
    spawnTimer: 0,
    lastTime: 0,
    keys: { left: false, right: false },
    canvasW: 0,
    canvasH: 0,
  });

  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const hs = localStorage.getItem('ff-amber-high-score');
      if (hs) setHighScore(parseInt(hs, 10));
    } catch (_) {}
  }, []);

  const endGame = useCallback(() => {
    gameRef.current.running = false;
    cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    const finalScore = gameRef.current.score;
    setScore(finalScore);
    setGameState('gameover');

    try {
      const prev = parseInt(localStorage.getItem('ff-amber-high-score') || '0', 10);
      if (finalScore > prev) {
        localStorage.setItem('ff-amber-high-score', String(finalScore));
        setHighScore(finalScore);
      }
    } catch (_) {}
  }, []);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    gameRef.current = {
      running: true,
      score: 0,
      misses: 0,
      timeLeft: GAME_DURATION,
      amberX: w / 2,
      crystals: [],
      crystalId: 0,
      spawnTimer: 0,
      lastTime: performance.now(),
      keys: { left: false, right: false },
      canvasW: w,
      canvasH: h,
    };

    setScore(0);
    setMisses(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const g = gameRef.current;
      if (!g.running) return;
      g.timeLeft -= 1;
      setTimeLeft(g.timeLeft);
      if (g.timeLeft <= 0) endGame();
    }, 1000);

    const loop = (now: number) => {
      const g = gameRef.current;
      if (!g.running) return;

      const dt = Math.min((now - g.lastTime) / 1000, 0.1);
      g.lastTime = now;

      if (g.keys.left) g.amberX -= AMBER_SPEED * dt;
      if (g.keys.right) g.amberX += AMBER_SPEED * dt;
      g.amberX = Math.max(AMBER_SIZE / 2, Math.min(g.canvasW - AMBER_SIZE / 2, g.amberX));

      g.spawnTimer += dt;
      const spawnInterval = Math.max(0.5, 1.4 - g.score * 0.004);
      if (g.spawnTimer >= spawnInterval) {
        g.spawnTimer = 0;
        g.crystals.push({
          id: g.crystalId++,
          x: CRYSTAL_SIZE + Math.random() * (g.canvasW - CRYSTAL_SIZE * 2),
          y: -CRYSTAL_SIZE,
          speed: 100 + Math.random() * 80 + g.score * 0.3,
          collected: false,
        });
      }

      const toRemove = new Set<number>();
      for (const c of g.crystals) {
        c.y += c.speed * dt;

        if (!c.collected) {
          const dx = c.x - g.amberX;
          const dy = c.y - (g.canvasH - AMBER_SIZE * 0.9);
          if (Math.sqrt(dx * dx + dy * dy) < AMBER_SIZE / 2 + CRYSTAL_SIZE / 2) {
            c.collected = true;
            g.score += 10;
            setScore(g.score);
            toRemove.add(c.id);
          }
        }

        if (c.y > g.canvasH + CRYSTAL_SIZE) {
          if (!c.collected) {
            g.misses += 1;
            setMisses(g.misses);
          }
          toRemove.add(c.id);
          if (g.misses >= MAX_MISSES) {
            g.crystals = g.crystals.filter(cr => !toRemove.has(cr.id));
            endGame();
            return;
          }
        }
      }
      g.crystals = g.crystals.filter(c => !toRemove.has(c.id));

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#dcf9f3';
        ctx.fillRect(0, 0, g.canvasW, g.canvasH);

        ctx.strokeStyle = 'rgba(0,147,128,0.07)';
        ctx.lineWidth = 1;
        for (let x = 0; x < g.canvasW; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, g.canvasH); ctx.stroke();
        }
        for (let y = 0; y < g.canvasH; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(g.canvasW, y); ctx.stroke();
        }

        for (const c of g.crystals) {
          ctx.save();
          ctx.translate(c.x, c.y);
          const hw = CRYSTAL_SIZE * 0.6;
          const hh = CRYSTAL_SIZE * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -hh);
          ctx.lineTo(hw, 0);
          ctx.lineTo(0, hh);
          ctx.lineTo(-hw, 0);
          ctx.closePath();
          const grad = ctx.createLinearGradient(0, -hh, 0, hh);
          grad.addColorStop(0, '#c4b5fd');
          grad.addColorStop(0.5, '#7c3aed');
          grad.addColorStop(1, '#4c1d95');
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.strokeStyle = 'rgba(196,181,253,0.8)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.beginPath();
          ctx.ellipse(-hw * 0.25, -hh * 0.3, hw * 0.2, hh * 0.18, -0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        const amberY = g.canvasH - AMBER_SIZE * 0.9;
        ctx.save();
        const glow = ctx.createRadialGradient(g.amberX, amberY, 0, g.amberX, amberY, AMBER_SIZE);
        glow.addColorStop(0, 'rgba(255,156,26,0.35)');
        glow.addColorStop(1, 'rgba(255,156,26,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(g.amberX, amberY, AMBER_SIZE, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff9c1a';
        ctx.beginPath();
        ctx.arc(g.amberX, amberY, AMBER_SIZE / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#005a4a';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.font = `${Math.round(AMBER_SIZE * 0.68)}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐉', g.amberX, amberY + 1);
        ctx.restore();

        for (let i = 0; i < MAX_MISSES; i++) {
          ctx.font = '18px serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillText(i < g.misses ? '🖤' : '❤️', 10 + i * 26, 10);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [endGame]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); gameRef.current.keys.left = true; }
      if (e.key === 'ArrowRight') { e.preventDefault(); gameRef.current.keys.right = true; }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') gameRef.current.keys.left = false;
      if (e.key === 'ArrowRight') gameRef.current.keys.right = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouch = (e: TouchEvent) => {
      if (!gameRef.current.running) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0] || e.changedTouches[0];
      if (!touch) return;
      const x = (touch.clientX - rect.left) * (canvas.width / rect.width);
      gameRef.current.amberX = Math.max(
        AMBER_SIZE / 2,
        Math.min(gameRef.current.canvasW - AMBER_SIZE / 2, x)
      );
    };

    canvas.addEventListener('touchstart', handleTouch, { passive: false });
    canvas.addEventListener('touchmove', handleTouch, { passive: false });
    return () => {
      canvas.removeEventListener('touchstart', handleTouch);
      canvas.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const ff = "'Concert One', var(--font-concert-one), cursive";

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #dcf9f3 0%, #b8f0e8 100%)',
        borderRadius: '24px',
        padding: '28px 20px',
        maxWidth: '520px',
        margin: '0 auto',
        border: '3px solid #009380',
        boxShadow: '0 12px 48px rgba(0,147,128,0.22)',
        textAlign: 'center',
      }}
    >
      <h3
        style={{
          fontFamily: ff,
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          color: '#005a4a',
          marginBottom: '6px',
          marginTop: 0,
        }}
      >
        🐉 Amber&apos;s Crystal Rush
      </h3>

      {gameState !== 'idle' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '6px 14px',
            background: 'rgba(0,147,128,0.12)',
            borderRadius: '8px',
            marginBottom: '10px',
            fontFamily: ff,
            fontSize: '1rem',
            color: '#005a4a',
          }}
        >
          <span>💎 {score}</span>
          <span>⏱ {timeLeft}s</span>
          <span>🏆 {highScore}</span>
        </div>
      )}

      <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={460}
          height={320}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            borderRadius: '16px',
            touchAction: 'none',
            userSelect: 'none',
          }}
        />

        {gameState === 'idle' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(220,249,243,0.93)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              borderRadius: '16px',
            }}
          >
            <div style={{ fontSize: '3rem' }}>🐉💎</div>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.9rem',
                color: '#005a4a',
                maxWidth: '260px',
                lineHeight: 1.5,
                margin: 0,
                textAlign: 'center',
              }}
            >
              Catch crystals before they fall!<br />
              Use <strong>arrow keys</strong> or <strong>tap the screen</strong>
            </p>
            <button
              onClick={startGame}
              style={{
                background: '#ff9c1a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 44px',
                fontFamily: ff,
                fontSize: '1.4rem',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(255,156,26,0.45)',
                letterSpacing: '0.05em',
                minHeight: '52px',
              }}
            >
              Play! 🎮
            </button>
            {highScore > 0 && (
              <p style={{ fontFamily: ff, color: '#78087c', fontSize: '0.85rem', margin: 0 }}>
                High Score: {highScore}
              </p>
            )}
          </div>
        )}

        {gameState === 'gameover' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(220,249,243,0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '24px',
              borderRadius: '16px',
            }}
          >
            <div style={{ fontSize: '2.8rem' }}>
              {score >= 150 ? '🏆' : score >= 80 ? '⭐' : '💫'}
            </div>
            <h4
              style={{
                fontFamily: ff,
                fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
                color: '#005a4a',
                margin: 0,
              }}
            >
              {score >= 150 ? 'Dragon Master!' : score >= 80 ? 'Crystal Keeper!' : 'Nice Try!'}
            </h4>
            <p style={{ fontFamily: ff, fontSize: '1.15rem', color: '#78087c', margin: 0 }}>
              Score: {score}
              {score > 0 && score === highScore ? ' 🎉 New High!' : ''}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '100%',
                maxWidth: '300px',
                marginTop: '8px',
              }}
            >
              <button
                onClick={startGame}
                style={{
                  background: '#ff9c1a',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '12px 32px',
                  fontFamily: ff,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  minHeight: '48px',
                  boxShadow: '0 4px 14px rgba(255,156,26,0.4)',
                }}
              >
                Play Again!
              </button>
              <a
                href="https://www.amazon.com/stores/page/1DEB841F-05B8-46B0-A42E-55B618C36B12"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#005a4a',
                  color: '#ffffff',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1.4,
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                Think you can handle a real dragon?<br />
                Get Amber&apos;s book →
              </a>
            </div>
          </div>
        )}
      </div>

      {gameState === 'idle' && (
        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '0.78rem',
            color: '#009380',
            marginTop: '10px',
            marginBottom: 0,
            opacity: 0.8,
          }}
        >
          Miss {MAX_MISSES} crystals = game over • {GAME_DURATION}s time limit
        </p>
      )}
    </div>
  );
}
