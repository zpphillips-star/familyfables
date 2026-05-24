'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────
const CW = 760;           // canvas display width
const CH = 380;           // canvas display height
const GRAVITY   = 0.55;
const JUMP_FORCE = -13.5;
const SPRING_FORCE = -19;
const PW = 38;            // player width
const PH = 38;            // player height
const PSPEED = 230;       // px / sec
const MAX_LIVES = 3;
const COIN_R = 13;
const ENEMY_W = 34;
const ENEMY_H = 34;
const INVINCIBLE_SEC = 1.8;

// ── Types ────────────────────────────────────────────────────────────────────
interface Platform {
  x: number; y: number; w: number; h: number;
  color: string; rimColor: string;
  ampY?: number; speedY?: number; _baseY?: number;
  spring?: boolean;
}
interface Coin   { x: number; y: number; collected: boolean; emoji: string; }
interface Enemy  { x: number; y: number; vx: number; alive: boolean; pMin: number; pMax: number; }
interface Level  {
  name: string; hint: string;
  bgA: string; bgB: string; groundColor: string;
  worldW: number; goalX: number;
  platforms: Platform[]; coins: Coin[]; enemies: Enemy[];
}

// ── Level data ───────────────────────────────────────────────────────────────
const LEVELS: Level[] = [
  {
    name: 'Level 1', hint: 'The Cozy Coat',
    bgA: '#1e3c72', bgB: '#f5e6d0', groundColor: '#c4a882',
    worldW: 2300, goalX: 2160,
    platforms: [
      // ground
      { x:0,    y:320, w:280, h:80, color:'#c4a882', rimColor:'#a8896a' },
      { x:340,  y:320, w:220, h:80, color:'#c4a882', rimColor:'#a8896a' },
      { x:620,  y:320, w:260, h:80, color:'#c4a882', rimColor:'#a8896a' },
      { x:950,  y:320, w:290, h:80, color:'#c4a882', rimColor:'#a8896a' },
      { x:1310, y:320, w:350, h:80, color:'#c4a882', rimColor:'#a8896a' },
      { x:1730, y:320, w:570, h:80, color:'#c4a882', rimColor:'#a8896a' },
      // ledges
      { x:160,  y:242, w:120, h:16, color:'#e8d5b0', rimColor:'#c4a882' },
      { x:370,  y:226, w:110, h:16, color:'#b0c4de', rimColor:'#7f9fbe' },
      { x:570,  y:212, w:105, h:16, color:'#e8d5b0', rimColor:'#c4a882' },
      { x:730,  y:242, w:110, h:16, color:'#b0c4de', rimColor:'#7f9fbe', ampY:34, speedY:1.2 },
      { x:940,  y:232, w:115, h:16, color:'#e8d5b0', rimColor:'#c4a882' },
      { x:1090, y:202, w:120, h:16, color:'#b0c4de', rimColor:'#7f9fbe', spring:true },
      { x:1290, y:238, w:105, h:16, color:'#e8d5b0', rimColor:'#c4a882' },
      { x:1450, y:202, w:130, h:16, color:'#b0c4de', rimColor:'#7f9fbe' },
      { x:1660, y:242, w:110, h:16, color:'#e8d5b0', rimColor:'#c4a882' },
      { x:1820, y:210, w:120, h:16, color:'#b0c4de', rimColor:'#7f9fbe' },
      { x:1990, y:252, w:100, h:16, color:'#e8d5b0', rimColor:'#c4a882' },
    ],
    coins: [
      { x:200, y:213, collected:false, emoji:'⭐' },
      { x:410, y:197, collected:false, emoji:'🧵' },
      { x:613, y:183, collected:false, emoji:'⭐' },
      { x:785, y:212, collected:false, emoji:'⭐' },
      { x:998, y:202, collected:false, emoji:'🧵' },
      { x:1150, y:168, collected:false, emoji:'⭐' },
      { x:1333, y:208, collected:false, emoji:'⭐' },
      { x:1515, y:172, collected:false, emoji:'🧵' },
      { x:1715, y:212, collected:false, emoji:'⭐' },
      { x:1880, y:180, collected:false, emoji:'⭐' },
    ],
    enemies: [
      { x:400, y:284, vx:-1.2, alive:true, pMin:340, pMax:540 },
      { x:980, y:284, vx:1.1,  alive:true, pMin:950, pMax:1220 },
      { x:1480, y:284, vx:-1.0,alive:true, pMin:1310, pMax:1630 },
    ],
  },
  {
    name: 'Level 2', hint: 'The Outside World',
    bgA: '#0a2e6e', bgB: '#4a9b35', groundColor: '#3d8028',
    worldW: 2450, goalX: 2290,
    platforms: [
      // start
      { x:0,   y:310, w:180, h:80, color:'#3d8028', rimColor:'#2e6020' },
      // floating cloud platforms
      { x:240, y:292, w:100, h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      { x:400, y:266, w:92,  h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      { x:555, y:242, w:100, h:16, color:'#dce8f5', rimColor:'#b0c8e0', ampY:44, speedY:1.5 },
      { x:715, y:272, w:90,  h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      { x:864, y:252, w:100, h:16, color:'#dce8f5', rimColor:'#b0c8e0', spring:true },
      { x:1020, y:288, w:92, h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      { x:1170, y:250, w:100, h:16, color:'#dce8f5', rimColor:'#b0c8e0', ampY:50, speedY:2.0 },
      { x:1330, y:275, w:90, h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      { x:1480, y:252, w:100, h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      { x:1642, y:272, w:90, h:16, color:'#dce8f5', rimColor:'#b0c8e0', ampY:40, speedY:1.8 },
      { x:1800, y:252, w:100, h:16, color:'#dce8f5', rimColor:'#b0c8e0' },
      // end
      { x:1960, y:310, w:490, h:80, color:'#3d8028', rimColor:'#2e6020' },
    ],
    coins: [
      { x:280, y:263, collected:false, emoji:'⭐' },
      { x:443, y:237, collected:false, emoji:'🧵' },
      { x:600, y:210, collected:false, emoji:'⭐' },
      { x:758, y:242, collected:false, emoji:'⭐' },
      { x:910, y:218, collected:false, emoji:'🧵' },
      { x:1063, y:258, collected:false, emoji:'⭐' },
      { x:1218, y:215, collected:false, emoji:'⭐' },
      { x:1375, y:245, collected:false, emoji:'🧵' },
      { x:1524, y:222, collected:false, emoji:'⭐' },
      { x:1687, y:237, collected:false, emoji:'⭐' },
      { x:1848, y:222, collected:false, emoji:'🧵' },
    ],
    enemies: [
      { x:420, y:256, vx:1.0,  alive:true, pMin:240, pMax:340 },
      { x:730, y:236, vx:-1.1, alive:true, pMin:715, pMax:805 },
      { x:1045, y:252, vx:1.0, alive:true, pMin:1020, pMax:1112 },
      { x:1350, y:239, vx:-1.0,alive:true, pMin:1330, pMax:1420 },
      { x:1820, y:216, vx:1.1, alive:true, pMin:1800, pMax:1900 },
    ],
  },
];

// ── Mutable game state ───────────────────────────────────────────────────────
interface GS {
  running: boolean;
  px: number; py: number; pvx: number; pvy: number;
  onGround: boolean; facing: 1|-1; pState: 'idle'|'run'|'jump';
  camX: number; lives: number; score: number; levelIdx: number;
  platforms: Platform[]; coins: Coin[]; enemies: Enemy[];
  worldW: number; goalX: number;
  keys: { left:boolean; right:boolean; jump:boolean };
  lastTime: number; frameCount: number;
  invincible: number; jumpBuffered: boolean; coyoteTime: number;
  goalReached: boolean;
}

function buildGS(levelIdx: number, lives: number, score: number): GS {
  const lv = LEVELS[levelIdx];
  return {
    running: false,
    px: 60, py: 260, pvx: 0, pvy: 0,
    onGround: false, facing: 1, pState: 'idle',
    camX: 0, lives, score, levelIdx,
    platforms: lv.platforms.map(p => ({ ...p, _baseY: p.y })),
    coins:    lv.coins.map(c => ({ ...c })),
    enemies:  lv.enemies.map(e => ({ ...e })),
    worldW: lv.worldW, goalX: lv.goalX,
    keys: { left:false, right:false, jump:false },
    lastTime: 0, frameCount: 0,
    invincible: 0, jumpBuffered: false, coyoteTime: 0,
    goalReached: false,
  };
}

// ── Drawing helpers ───────────────────────────────────────────────────────────
function roundRect(ctx: CanvasRenderingContext2D, x:number, y:number, w:number, h:number, r:number) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

function drawPlayer(ctx: CanvasRenderingContext2D, x:number, y:number, facing:1|-1, state:string, invincible:number, frame:number) {
  const cx = x + PW/2;
  const cy = y + PH/2;
  const r  = PW/2 - 1;

  ctx.save();
  if (invincible > 0 && Math.floor(invincible * 8) % 2 === 0) {
    ctx.globalAlpha = 0.4;
  }

  // Squash/stretch based on state
  const scaleY = state === 'jump' ? 1.12 : state === 'run' ? (0.92 + Math.sin(frame * 0.4) * 0.06) : 1;
  const scaleX = state === 'jump' ? 0.88 : 1;
  ctx.translate(cx, cy);
  ctx.scale(facing * scaleX, scaleY);
  ctx.translate(-cx, -cy);

  // Shadow
  ctx.beginPath();
  ctx.ellipse(cx, y + PH + 3, r * 0.7, 5, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fill();

  // Button body gradient
  const grad = ctx.createRadialGradient(cx - 6, cy - 6, 2, cx, cy, r);
  grad.addColorStop(0, '#6ab8f0');
  grad.addColorStop(0.6, '#4a9de0');
  grad.addColorStop(1, '#2a6db8');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Rim
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#1a5c99';
  ctx.stroke();

  // Stitch ring (decorative inner ring)
  ctx.beginPath();
  ctx.arc(cx, cy, r - 5, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,0.18)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // 4 holes in 2x2 grid
  const ho = 8;
  for (const [hx, hy] of [[cx-ho, cy-ho],[cx+ho, cy-ho],[cx-ho, cy+ho],[cx+ho, cy+ho]]) {
    ctx.beginPath();
    ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#1a4a7a';
    ctx.fill();
    ctx.strokeStyle = '#0d3360';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Eyes
  const eyeY = cy - 6;
  if (state === 'jump') {
    // Wide scared eyes
    for (const ex of [cx-7, cx+7]) {
      ctx.beginPath(); ctx.arc(ex, eyeY, 4.5, 0, Math.PI*2);
      ctx.fillStyle = 'white'; ctx.fill();
      ctx.beginPath(); ctx.arc(ex+0.5, eyeY+0.5, 2.2, 0, Math.PI*2);
      ctx.fillStyle = '#1a1a3a'; ctx.fill();
    }
    // O mouth
    ctx.beginPath(); ctx.arc(cx, cy+8, 4, 0, Math.PI*2);
    ctx.fillStyle = '#1a1a3a'; ctx.fill();
  } else {
    // Normal eyes
    for (const ex of [cx-7, cx+7]) {
      ctx.beginPath(); ctx.arc(ex, eyeY, 3.5, 0, Math.PI*2);
      ctx.fillStyle = '#1a1a3a'; ctx.fill();
      ctx.beginPath(); ctx.arc(ex-0.8, eyeY-0.8, 1, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fill();
    }
    // Smile
    ctx.beginPath();
    ctx.arc(cx, cy+4, 5.5, 0.15*Math.PI, 0.85*Math.PI);
    ctx.lineWidth = 2; ctx.strokeStyle = '#1a1a3a'; ctx.stroke();
  }

  ctx.restore();
}

function drawPlatform(ctx: CanvasRenderingContext2D, p: Platform) {
  const r = 6;
  if (p.spring) {
    // Spring platform — teal with bounce arrows
    roundRect(ctx, p.x, p.y, p.w, p.h, r);
    ctx.fillStyle = '#00b894'; ctx.fill();
    ctx.strokeStyle = '#00806a'; ctx.lineWidth = 2; ctx.stroke();
    // Spring coils drawn as zigzag
    ctx.beginPath();
    const midX = p.x + p.w/2;
    ctx.moveTo(midX - 10, p.y + 4);
    for (let i = 0; i < 3; i++) {
      ctx.lineTo(midX + (i%2===0?8:-8), p.y + 4 + i*3);
    }
    ctx.lineTo(midX, p.y + 13);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();
    return;
  }
  roundRect(ctx, p.x, p.y, p.w, p.h, r);
  ctx.fillStyle = p.color; ctx.fill();
  ctx.strokeStyle = p.rimColor; ctx.lineWidth = 1.5; ctx.stroke();
  // Top highlight strip
  roundRect(ctx, p.x+2, p.y+2, p.w-4, 5, 3);
  ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill();
}

function drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy, frame: number) {
  if (!e.alive) return;
  const cx = e.x + ENEMY_W/2;
  const cy = e.y + ENEMY_H/2;
  const bounce = Math.sin(frame * 0.08) * 2;

  // Shadow
  ctx.beginPath();
  ctx.ellipse(cx, e.y + ENEMY_H + 2, ENEMY_W/2 * 0.7, 4, 0, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fill();

  // Body — rogue escaped button (red, angry)
  const grad = ctx.createRadialGradient(cx-4, cy-4+bounce, 2, cx, cy+bounce, ENEMY_W/2);
  grad.addColorStop(0, '#ff6b6b');
  grad.addColorStop(0.7, '#e03030');
  grad.addColorStop(1, '#a01010');
  ctx.beginPath();
  ctx.arc(cx, cy + bounce, ENEMY_W/2 - 1, 0, Math.PI*2);
  ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = '#801010'; ctx.lineWidth = 2; ctx.stroke();

  // 4 holes
  const ho = 7;
  for (const [hx, hy] of [[cx-ho,cy-ho+bounce],[cx+ho,cy-ho+bounce],[cx-ho,cy+ho+bounce],[cx+ho,cy+ho+bounce]]) {
    ctx.beginPath(); ctx.arc(hx, hy, 2.5, 0, Math.PI*2);
    ctx.fillStyle = '#601010'; ctx.fill();
  }

  // Angry eyes
  for (const [ex, brow] of [[cx-6, -3],[cx+6, -3]] as [number,number][]) {
    ctx.beginPath(); ctx.arc(ex, cy-4+bounce, 3, 0, Math.PI*2);
    ctx.fillStyle = 'white'; ctx.fill();
    ctx.beginPath(); ctx.arc(ex+0.5, cy-3+bounce, 1.5, 0, Math.PI*2);
    ctx.fillStyle = '#1a1a1a'; ctx.fill();
    // Angry brow
    ctx.beginPath();
    ctx.moveTo(ex-4, cy-8+bounce+brow);
    ctx.lineTo(ex+4, cy-7+bounce-brow);
    ctx.strokeStyle = '#801010'; ctx.lineWidth = 1.5; ctx.stroke();
  }
  // Frown
  ctx.beginPath();
  ctx.arc(cx, cy+7+bounce, 5, 1.1*Math.PI, 1.9*Math.PI);
  ctx.lineWidth = 1.5; ctx.strokeStyle = '#1a1a1a'; ctx.stroke();
}

function drawCoin(ctx: CanvasRenderingContext2D, coin: Coin, frame: number) {
  if (coin.collected) return;
  const bob = Math.sin(frame * 0.05 + coin.x * 0.01) * 3;
  ctx.save();
  ctx.translate(coin.x, coin.y + bob);
  ctx.font = `${COIN_R * 1.6}px serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(coin.emoji, 0, 0);
  ctx.restore();
}

function drawGoal(ctx: CanvasRenderingContext2D, gx: number, groundY: number, frame: number) {
  const x = gx;
  const base = groundY;
  // Flag pole
  ctx.fillStyle = '#c0a060';
  ctx.fillRect(x, base - 80, 6, 80);
  // Flag waving
  ctx.save();
  ctx.translate(x + 6, base - 78);
  const wave = Math.sin(frame * 0.08) * 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(18, 10 + wave, 36, 3 + wave);
  ctx.lineTo(36, 22 + wave);
  ctx.quadraticCurveTo(18, 28 + wave, 0, 18);
  ctx.closePath();
  ctx.fillStyle = '#4a9de0';
  ctx.fill();
  // Star on flag
  ctx.font = '14px serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('🎉', 18, 10 + wave);
  ctx.restore();
}

// ── AABB collision ────────────────────────────────────────────────────────────
function resolvePlayer(gs: GS, dt: number) {
  const t = Math.min(dt, 0.05);
  gs.pvy += GRAVITY;
  gs.pvx *= 0.82; // friction when no input

  const speed = PSPEED * t;
  if (gs.keys.left)  { gs.pvx = -speed; gs.facing = -1; }
  if (gs.keys.right) { gs.pvx =  speed; gs.facing =  1; }

  if ((gs.keys.jump || gs.jumpBuffered) && (gs.onGround || gs.coyoteTime > 0)) {
    gs.pvy = JUMP_FORCE;
    gs.onGround = false;
    gs.coyoteTime = 0;
    gs.jumpBuffered = false;
  } else if (gs.keys.jump && gs.pvy < 0) {
    // Variable jump height — hold to jump higher
    gs.pvy = Math.max(gs.pvy - 0.4, JUMP_FORCE * 1.15);
  }

  if (gs.jumpBuffered) gs.jumpBuffered = false;

  gs.px += gs.pvx;
  gs.py += gs.pvy;

  // Clamp to world
  if (gs.px < 0) { gs.px = 0; gs.pvx = 0; }
  if (gs.px + PW > gs.worldW) { gs.px = gs.worldW - PW; gs.pvx = 0; }

  gs.onGround = false;

  for (const p of gs.platforms) {
    const prevBottom = gs.py + PH - gs.pvy;
    const landingOn  = prevBottom <= p.y && gs.py + PH >= p.y;
    const inXRange   = gs.px + PW > p.x + 4 && gs.px < p.x + p.w - 4;

    if (landingOn && inXRange && gs.pvy >= 0) {
      gs.py = p.y - PH;
      if (p.spring && gs.pvy > 2) {
        gs.pvy = SPRING_FORCE;
      } else {
        gs.pvy = 0;
        gs.onGround = true;
      }
    }
  }

  if (gs.onGround) gs.coyoteTime = 0.12;
  else if (gs.coyoteTime > 0) gs.coyoteTime -= t;

  // Update player state
  if (!gs.onGround) gs.pState = 'jump';
  else if (Math.abs(gs.pvx) > 1) gs.pState = 'run';
  else gs.pState = 'idle';

  // Smooth camera
  const targetCam = gs.px - CW / 2 + PW / 2;
  gs.camX += (targetCam - gs.camX) * 0.12;
  gs.camX = Math.max(0, Math.min(gs.worldW - CW, gs.camX));

  // Invincible timer
  if (gs.invincible > 0) gs.invincible -= t;

  // Fell off screen
  if (gs.py > CH + 100) {
    gs.lives--;
    gs.px = 60; gs.py = 200; gs.pvx = 0; gs.pvy = 0;
    gs.camX = 0; gs.invincible = INVINCIBLE_SEC;
  }
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ShutInPlatformer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gsRef     = useRef<GS>(buildGS(0, MAX_LIVES, 0));
  const rafRef    = useRef<number>(0);
  const [phase, setPhase]   = useState<'menu'|'playing'|'level_win'|'game_over'|'win'>('menu');
  const [display, setDisplay] = useState({ lives: MAX_LIVES, score: 0, level: 1 });

  // ── Key handling ──────────────────────────────────────────────────
  useEffect(() => {
    const isJump = (k: string) => k === 'ArrowUp' || k === ' ' || k === 'KeyW' || k === 'ArrowUp';
    const onDown = (e: KeyboardEvent) => {
      const gs = gsRef.current;
      if (e.code === 'ArrowLeft'  || e.code === 'KeyA') gs.keys.left  = true;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') gs.keys.right = true;
      if (isJump(e.code)) {
        if (!gs.keys.jump) gs.jumpBuffered = true;
        gs.keys.jump = true;
      }
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
    };
    const onUp = (e: KeyboardEvent) => {
      const gs = gsRef.current;
      if (e.code === 'ArrowLeft'  || e.code === 'KeyA') gs.keys.left  = false;
      if (e.code === 'ArrowRight' || e.code === 'KeyD') gs.keys.right = false;
      if (isJump(e.code)) gs.keys.jump = false;
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  // ── Update moving platforms ───────────────────────────────────────
  function updatePlatforms(gs: GS) {
    for (const p of gs.platforms) {
      if (p.ampY && p.speedY && p._baseY !== undefined) {
        gs.frameCount;
        p.y = p._baseY + Math.sin(gs.frameCount * p.speedY * 0.035) * p.ampY;
      }
    }
  }

  // ── Check coins / enemies / goal ──────────────────────────────────
  function checkCollectibles(gs: GS) {
    // Coins
    for (const c of gs.coins) {
      if (c.collected) continue;
      const dx = (gs.px + PW/2) - c.x;
      const dy = (gs.py + PH/2) - c.y;
      if (Math.sqrt(dx*dx+dy*dy) < COIN_R + PW/2 - 6) {
        c.collected = true;
        gs.score += c.emoji === '🧵' ? 50 : 10;
      }
    }
    // Enemies
    if (gs.invincible <= 0) {
      for (const e of gs.enemies) {
        if (!e.alive) continue;
        const playerCx = gs.px + PW/2, playerCy = gs.py + PH/2;
        const enemyCx  = e.x + ENEMY_W/2, enemyCy = e.y + ENEMY_H/2;
        // Stomp check — player falling, top of enemy
        const stompY = gs.py + PH;
        if (gs.pvy > 0 && stompY >= e.y && stompY <= e.y + 16 &&
            gs.px + PW > e.x + 4 && gs.px < e.x + ENEMY_W - 4) {
          e.alive = false;
          gs.pvy = JUMP_FORCE * 0.65;
          gs.score += 100;
        } else {
          // Hit check
          const dx = playerCx - enemyCx, dy = playerCy - enemyCy;
          if (Math.abs(dx) < (PW+ENEMY_W)/2 - 6 && Math.abs(dy) < (PH+ENEMY_H)/2 - 6) {
            gs.lives--;
            gs.invincible = INVINCIBLE_SEC;
            gs.pvx = gs.facing * -4;
            gs.pvy = -8;
          }
        }
      }
    }
    // Goal
    if (!gs.goalReached && gs.px + PW/2 > gs.goalX && gs.px + PW/2 < gs.goalX + 60) {
      gs.goalReached = true;
      gs.score += 500;
    }
  }

  // ── Enemy AI ──────────────────────────────────────────────────────
  function updateEnemies(gs: GS) {
    for (const e of gs.enemies) {
      if (!e.alive) continue;
      e.x += e.vx;
      if (e.x < e.pMin) { e.x = e.pMin; e.vx = Math.abs(e.vx); }
      if (e.x > e.pMax) { e.x = e.pMax; e.vx = -Math.abs(e.vx); }
    }
  }

  // ── Game loop ─────────────────────────────────────────────────────
  const startGame = useCallback((levelIdx: number, lives: number, score: number) => {
    const gs = buildGS(levelIdx, lives, score);
    gs.running = true;
    gsRef.current = gs;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const safeCtx = ctx;

    setPhase('playing');

    function loop(ts: number) {
      const gs = gsRef.current;
      if (!gs.running) return;

      const dt = gs.lastTime ? (ts - gs.lastTime) / 1000 : 0.016;
      gs.lastTime = ts;
      gs.frameCount++;

      updatePlatforms(gs);
      resolvePlayer(gs, dt);
      checkCollectibles(gs);
      updateEnemies(gs);

      // ── Render ────────────────────────────────────────────────────
      const lv = LEVELS[gs.levelIdx];
      const cam = Math.round(gs.camX);

      // Background gradient
      const bg = safeCtx.createLinearGradient(0, 0, 0, CH);
      bg.addColorStop(0, lv.bgA);
      bg.addColorStop(1, lv.bgB);
      safeCtx.fillStyle = bg; safeCtx.fillRect(0, 0, CW, CH);

      // Parallax clouds / background emojis
      safeCtx.save();
      safeCtx.globalAlpha = 0.15;
      safeCtx.font = '32px serif';
      const bgEmojis = gs.levelIdx === 0
        ? ['🧥','🪡','🧵','🪢']
        : ['☁️','🌿','🌸','🍀'];
      bgEmojis.forEach((em, i) => {
        const bx = ((i * 480 - cam * 0.3 + 2000) % (gs.worldW * 0.8)) - 200;
        safeCtx.fillText(em, bx / gs.worldW * CW, 60 + i * 55);
      });
      safeCtx.restore();

      safeCtx.save();
      safeCtx.translate(-cam, 0);

      // Platforms
      for (const p of gs.platforms) {
        if (p.x + p.w < cam || p.x > cam + CW) continue;
        drawPlatform(safeCtx, p);
      }

      // Goal flag
      const groundY = 320;
      drawGoal(safeCtx, gs.goalX, groundY, gs.frameCount);

      // Coins
      for (const c of gs.coins) drawCoin(safeCtx, c, gs.frameCount);

      // Enemies
      for (const e of gs.enemies) drawEnemy(safeCtx, e, gs.frameCount);

      // Player
      drawPlayer(safeCtx, gs.px, gs.py, gs.facing, gs.pState, gs.invincible, gs.frameCount);

      safeCtx.restore();

      // HUD (fixed position)
      safeCtx.fillStyle = 'rgba(0,0,0,0.45)';
      roundRect(safeCtx, 8, 8, 180, 40, 8); safeCtx.fill();
      safeCtx.font = 'bold 15px system-ui';
      safeCtx.fillStyle = '#fff';
      safeCtx.textAlign = 'left'; safeCtx.textBaseline = 'middle';
      const hearts = '❤️'.repeat(Math.max(0, gs.lives));
      safeCtx.fillText(`${hearts}  ⭐ ${gs.score}`, 16, 28);

      // Level badge
      safeCtx.fillStyle = 'rgba(0,0,0,0.45)';
      roundRect(safeCtx, CW - 130, 8, 122, 40, 8); safeCtx.fill();
      safeCtx.textAlign = 'right';
      safeCtx.fillStyle = '#ffe57f';
      safeCtx.fillText(lv.hint, CW - 16, 28);

      // Progress bar
      const progress = Math.min(1, (gs.px + PW/2) / gs.worldW);
      safeCtx.fillStyle = 'rgba(0,0,0,0.35)';
      safeCtx.fillRect(8, CH - 14, CW - 16, 7);
      const pg = safeCtx.createLinearGradient(8, 0, CW-16, 0);
      pg.addColorStop(0, '#4a9de0'); pg.addColorStop(1, '#69f0ae');
      safeCtx.fillStyle = pg;
      safeCtx.fillRect(8, CH - 14, (CW - 16) * progress, 7);

      // Update React display
      setDisplay({ lives: gs.lives, score: gs.score, level: gs.levelIdx + 1 });

      // Check end conditions
      if (gs.goalReached) {
        gs.running = false;
        if (gs.levelIdx < LEVELS.length - 1) setPhase('level_win');
        else setPhase('win');
        return;
      }
      if (gs.lives <= 0) {
        gs.running = false;
        setPhase('game_over');
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Touch handlers
  const touchLeft  = useCallback((down: boolean) => { gsRef.current.keys.left  = down; }, []);
  const touchRight = useCallback((down: boolean) => { gsRef.current.keys.right = down; }, []);
  const touchJump  = useCallback((down: boolean) => {
    const gs = gsRef.current;
    if (down && !gs.keys.jump) gs.jumpBuffered = true;
    gs.keys.jump = down;
  }, []);

  const gs = gsRef.current;

  return (
    <div style={{ fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
      <style>{`
        .sip-canvas { display:block; border-radius:16px; border:3px solid rgba(74,157,224,0.4);
          box-shadow:0 8px 40px rgba(74,157,224,0.25); image-rendering:pixelated; }
        .sip-btn { border:none; cursor:pointer; font-weight:800; border-radius:12px;
          transition:transform 0.12s, box-shadow 0.12s; user-select:none; touch-action:none; }
        .sip-btn:active { transform:scale(0.92)!important; }
        .sip-overlay { position:absolute; inset:0; border-radius:16px;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          background:rgba(5,2,18,0.88); backdrop-filter:blur(4px); }
      `}</style>

      <div style={{ position:'relative', width: CW, maxWidth:'100%', margin:'0 auto' }}>
        <canvas
          ref={canvasRef}
          width={CW} height={CH}
          className="sip-canvas"
          style={{ width:'100%', aspectRatio:`${CW}/${CH}` }}
        />

        {/* ── MENU ── */}
        {phase === 'menu' && (
          <div className="sip-overlay">
            <div style={{ fontSize:72, marginBottom:8, filter:'drop-shadow(0 0 20px #4a9de0)' }}>🔘</div>
            <h2 style={{ color:'#fff', fontSize:'clamp(22px,4vw,32px)', margin:'0 0 6px',
              fontFamily:"var(--font-concert-one),'Concert One',cursive",
              textShadow:'0 2px 12px rgba(74,157,224,0.8)' }}>
              The Shut-In Button
            </h2>
            <p style={{ color:'rgba(200,220,255,0.75)', fontSize:14, margin:'0 0 28px', textAlign:'center', maxWidth:320 }}>
              2 levels · Jump on enemies · Collect ⭐ &amp; 🧵 · Reach the 🎉 flag
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'center', marginBottom:20 }}>
              <div style={{ fontSize:13, color:'rgba(200,220,255,0.6)', textAlign:'center' }}>
                ← → move &nbsp;·&nbsp; ↑ / Space jump &nbsp;·&nbsp; Hold ↑ for higher jump
              </div>
            </div>
            <button className="sip-btn"
              onClick={() => startGame(0, MAX_LIVES, 0)}
              style={{ padding:'14px 40px', background:'#4a9de0', color:'#fff',
                fontSize:18, boxShadow:'0 6px 24px rgba(74,157,224,0.5)' }}>
              🎮 Start Game
            </button>
          </div>
        )}

        {/* ── LEVEL WIN ── */}
        {phase === 'level_win' && (
          <div className="sip-overlay">
            <div style={{ fontSize:64, marginBottom:8 }}>🎉</div>
            <h2 style={{ color:'#69f0ae', fontSize:'clamp(22px,4vw,30px)', margin:'0 0 8px',
              fontFamily:"var(--font-concert-one),'Concert One',cursive" }}>
              Level 1 Clear!
            </h2>
            <p style={{ color:'rgba(200,255,200,0.8)', fontSize:15, margin:'0 0 24px' }}>
              Score: {display.score} &nbsp;·&nbsp; Lives: {'❤️'.repeat(Math.max(0, display.lives))}
            </p>
            <button className="sip-btn"
              onClick={() => startGame(1, display.lives, display.score)}
              style={{ padding:'14px 40px', background:'#4a9de0', color:'#fff',
                fontSize:17, boxShadow:'0 6px 24px rgba(74,157,224,0.5)' }}>
              Level 2 → The Outside World
            </button>
          </div>
        )}

        {/* ── GAME OVER ── */}
        {phase === 'game_over' && (
          <div className="sip-overlay">
            <div style={{ fontSize:64, marginBottom:8 }}>💔</div>
            <h2 style={{ color:'#ff8fab', fontSize:'clamp(22px,4vw,30px)', margin:'0 0 8px',
              fontFamily:"var(--font-concert-one),'Concert One',cursive" }}>
              Game Over
            </h2>
            <p style={{ color:'rgba(255,200,200,0.8)', fontSize:15, margin:'0 0 24px' }}>
              Final Score: {display.score}
            </p>
            <button className="sip-btn"
              onClick={() => startGame(0, MAX_LIVES, 0)}
              style={{ padding:'14px 40px', background:'#e03030', color:'#fff',
                fontSize:17, boxShadow:'0 6px 24px rgba(200,50,50,0.5)' }}>
              Try Again
            </button>
          </div>
        )}

        {/* ── WIN ── */}
        {phase === 'win' && (
          <div className="sip-overlay">
            <div style={{ fontSize:72, marginBottom:8, animation:'bounce 0.6s ease-in-out infinite alternate' }}>🏆</div>
            <style>{`@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-12px)}}`}</style>
            <h2 style={{ color:'#ffd740', fontSize:'clamp(24px,5vw,36px)', margin:'0 0 8px',
              fontFamily:"var(--font-concert-one),'Concert One',cursive",
              textShadow:'0 0 24px rgba(255,215,64,0.8)' }}>
              You Did It! 🎉
            </h2>
            <p style={{ color:'rgba(255,240,180,0.85)', fontSize:15, margin:'0 0 6px' }}>
              The button made it outside — and survived!
            </p>
            <p style={{ color:'#ffd740', fontSize:20, fontWeight:800, margin:'0 0 28px' }}>
              Final Score: {display.score}
            </p>
            <button className="sip-btn"
              onClick={() => startGame(0, MAX_LIVES, 0)}
              style={{ padding:'14px 40px', background:'#ff9c1a', color:'#fff',
                fontSize:17, boxShadow:'0 6px 24px rgba(255,156,26,0.5)' }}>
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile touch controls ── */}
      {phase === 'playing' && (
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          maxWidth: CW, margin:'10px auto 0', padding:'0 8px', gap:8 }}>
          <div style={{ display:'flex', gap:8 }}>
            <button className="sip-btn"
              onPointerDown={() => touchLeft(true)}  onPointerUp={() => touchLeft(false)}
              onPointerCancel={() => touchLeft(false)}
              style={{ width:60, height:60, fontSize:26, background:'rgba(74,157,224,0.2)',
                color:'#fff', border:'2px solid rgba(74,157,224,0.4)' }}>
              ◀
            </button>
            <button className="sip-btn"
              onPointerDown={() => touchRight(true)} onPointerUp={() => touchRight(false)}
              onPointerCancel={() => touchRight(false)}
              style={{ width:60, height:60, fontSize:26, background:'rgba(74,157,224,0.2)',
                color:'#fff', border:'2px solid rgba(74,157,224,0.4)' }}>
              ▶
            </button>
          </div>
          <button className="sip-btn"
            onPointerDown={() => touchJump(true)}  onPointerUp={() => touchJump(false)}
            onPointerCancel={() => touchJump(false)}
            style={{ width:80, height:60, fontSize:18, background:'rgba(105,240,174,0.25)',
              color:'#fff', border:'2px solid rgba(105,240,174,0.4)' }}>
            JUMP ↑
          </button>
        </div>
      )}
    </div>
  );
}
