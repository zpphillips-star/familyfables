import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookActivity from "@/components/BookActivity";
import BookGames from "@/components/BookGames";

// ── Static params for all 12 book slugs ──────────────────────────────────────
export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return {};
  return {
    title: `${book.title} | Family Fables`,
    description: book.description,
  };
}

// ── Land-specific decoration emojis ─────────────────────────────────────────
function getDecorations(landIndex: number): React.ReactNode {
  // 1. Dream Ideas Land — moons, stars, drifting clouds
  if (landIndex === 1) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"8%",left:"4%",fontSize:34,opacity:0.72,animation:"adventureFloat 4.5s ease-in-out infinite",pointerEvents:"none"}}>🌙</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"22%",right:"5%",fontSize:28,opacity:0.62,animation:"adventureFloat 5.5s ease-in-out infinite 1.2s",pointerEvents:"none"}}>🌙</span>
      <span aria-hidden="true" style={{position:"absolute",top:"14%",right:"6%",fontSize:20,opacity:0.55,animation:"twinkle 3s ease-in-out infinite 0.5s",pointerEvents:"none"}}>⭐</span>
      <span aria-hidden="true" style={{position:"absolute",top:"55%",left:"3%",fontSize:16,opacity:0.5,animation:"twinkle 3.8s ease-in-out infinite 1.4s",pointerEvents:"none"}}>💫</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"14%",left:"7%",fontSize:22,opacity:0.42,animation:"driftFloat 7s ease-in-out infinite 2s",pointerEvents:"none"}}>☁️</span>
      <span aria-hidden="true" style={{position:"absolute",top:"38%",right:"4%",fontSize:18,opacity:0.4,animation:"driftFloat 6s ease-in-out infinite 0.8s",pointerEvents:"none"}}>☁️</span>
    </>
  );
  // 2. Dragon Mountain — fire sparks, crystal gems, sword
  if (landIndex === 2) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"9%",left:"4%",fontSize:30,opacity:0.72,animation:"adventureFloat 3.2s ease-in-out infinite",pointerEvents:"none"}}>🔥</span>
      <span aria-hidden="true" style={{position:"absolute",top:"45%",right:"3%",fontSize:20,opacity:0.6,animation:"adventureFloat 2.8s ease-in-out infinite 0.7s",pointerEvents:"none"}}>🔥</span>
      <span aria-hidden="true" style={{position:"absolute",top:"20%",right:"6%",fontSize:26,opacity:0.7,animation:"adventureFloat 4.5s ease-in-out infinite 0.5s",pointerEvents:"none"}}>💎</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"22%",left:"5%",fontSize:22,opacity:0.65,animation:"adventureFloat 5s ease-in-out infinite 1.2s",pointerEvents:"none"}}>💎</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"32%",right:"6%",fontSize:28,opacity:0.55,animation:"adventureFloat 6s ease-in-out infinite 0.3s",pointerEvents:"none"}}>💎</span>
      <span aria-hidden="true" style={{position:"absolute",top:"62%",left:"3%",fontSize:16,opacity:0.45,animation:"twinkle 3s ease-in-out infinite 0.8s",pointerEvents:"none"}}>✨</span>
      <span aria-hidden="true" style={{position:"absolute",top:"10%",right:"10%",fontSize:20,opacity:0.5,animation:"adventureFloat 4s ease-in-out infinite 1.8s",pointerEvents:"none"}}>⚔️</span>
    </>
  );
  // 3. Poo Poo Face Town — silly poop, toilets, rainbow
  if (landIndex === 3) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"9%",left:"5%",fontSize:30,opacity:0.7,animation:"adventureFloat 3.2s ease-in-out infinite",pointerEvents:"none"}}>💩</span>
      <span aria-hidden="true" style={{position:"absolute",top:"32%",right:"4%",fontSize:24,opacity:0.6,animation:"adventureFloat 4.5s ease-in-out infinite 0.8s",pointerEvents:"none"}}>💩</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"18%",right:"4%",fontSize:22,opacity:0.5,animation:"adventureFloat 5s ease-in-out infinite 2s",pointerEvents:"none"}}>💩</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"28%",left:"4%",fontSize:32,opacity:0.55,animation:"adventureFloat 5.5s ease-in-out infinite 1s",pointerEvents:"none"}}>🌈</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"32%",right:"6%",fontSize:22,opacity:0.65,animation:"adventureFloat 3.5s ease-in-out infinite 0.3s",pointerEvents:"none"}}>🚽</span>
      <span aria-hidden="true" style={{position:"absolute",top:"56%",left:"3%",fontSize:18,opacity:0.48,animation:"adventureFloat 4s ease-in-out infinite 1.6s",pointerEvents:"none"}}>🚽</span>
      <span aria-hidden="true" style={{position:"absolute",top:"16%",right:"9%",fontSize:18,opacity:0.5,animation:"twinkle 2.8s ease-in-out infinite 0.5s",pointerEvents:"none"}}>⭐</span>
    </>
  );
  // 4. Hampton's Quest Meadow — balloons floating up, confetti, stars
  if (landIndex === 4) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"7%",left:"5%",fontSize:28,opacity:0.72,animation:"floatUp 4s ease-in-out infinite",pointerEvents:"none"}}>🎈</span>
      <span aria-hidden="true" style={{position:"absolute",top:"14%",right:"6%",fontSize:24,opacity:0.65,animation:"floatUp 5.5s ease-in-out infinite 0.9s",pointerEvents:"none"}}>🎈</span>
      <span aria-hidden="true" style={{position:"absolute",top:"32%",left:"3%",fontSize:20,opacity:0.55,animation:"floatUp 3.8s ease-in-out infinite 1.6s",pointerEvents:"none"}}>🎈</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"26%",right:"5%",fontSize:24,opacity:0.6,animation:"adventureFloat 4s ease-in-out infinite 0.4s",pointerEvents:"none"}}>🎊</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"14%",left:"6%",fontSize:20,opacity:0.5,animation:"twinkle 3s ease-in-out infinite 1s",pointerEvents:"none"}}>⭐</span>
      <span aria-hidden="true" style={{position:"absolute",top:"52%",right:"3%",fontSize:18,opacity:0.45,animation:"adventureFloat 5s ease-in-out infinite 2s",pointerEvents:"none"}}>🎁</span>
      <span aria-hidden="true" style={{position:"absolute",top:"68%",left:"4%",fontSize:20,opacity:0.5,animation:"twinkle 2.6s ease-in-out infinite 0.4s",pointerEvents:"none"}}>✨</span>
    </>
  );
  // 5. Gilroy's Harvest Forest — autumn leaves, turkey feathers
  if (landIndex === 5) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"8%",right:"5%",fontSize:28,opacity:0.7,animation:"leafSpin 4.5s ease-in-out infinite",pointerEvents:"none"}}>🍂</span>
      <span aria-hidden="true" style={{position:"absolute",top:"22%",left:"4%",fontSize:24,opacity:0.62,animation:"leafSpin 5.5s ease-in-out infinite 0.6s",pointerEvents:"none"}}>🍁</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"26%",right:"5%",fontSize:22,opacity:0.55,animation:"leafSpin 3.8s ease-in-out infinite 1.2s",pointerEvents:"none"}}>🍂</span>
      <span aria-hidden="true" style={{position:"absolute",top:"44%",right:"3%",fontSize:20,opacity:0.5,animation:"adventureFloat 6s ease-in-out infinite 1.5s",pointerEvents:"none"}}>🦃</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"14%",left:"5%",fontSize:22,opacity:0.5,animation:"leafSpin 4.2s ease-in-out infinite 2s",pointerEvents:"none"}}>🍁</span>
      <span aria-hidden="true" style={{position:"absolute",top:"62%",left:"3%",fontSize:16,opacity:0.45,animation:"adventureFloat 5s ease-in-out infinite 0.8s",pointerEvents:"none"}}>🍂</span>
      <span aria-hidden="true" style={{position:"absolute",top:"12%",left:"8%",fontSize:18,opacity:0.42,animation:"leafSpin 3.2s ease-in-out infinite 1.2s",pointerEvents:"none"}}>🌿</span>
    </>
  );
  // 6. The Lumpiest Pumpkin Patch — pumpkins, autumn leaves, cobwebs
  if (landIndex === 6) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"9%",left:"5%",fontSize:32,opacity:0.68,animation:"adventureFloat 4.2s ease-in-out infinite",pointerEvents:"none"}}>🎃</span>
      <span aria-hidden="true" style={{position:"absolute",top:"22%",right:"5%",fontSize:26,opacity:0.62,animation:"adventureFloat 5.5s ease-in-out infinite 0.8s",pointerEvents:"none"}}>🎃</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"20%",left:"4%",fontSize:20,opacity:0.55,animation:"leafSpin 3.8s ease-in-out infinite 1s",pointerEvents:"none"}}>🍂</span>
      <span aria-hidden="true" style={{position:"absolute",top:"50%",right:"3%",fontSize:18,opacity:0.5,animation:"leafSpin 4.5s ease-in-out infinite 0.5s",pointerEvents:"none"}}>🍁</span>
      <span aria-hidden="true" style={{position:"absolute",top:"4%",right:"3%",fontSize:18,opacity:0.45,pointerEvents:"none"}}>🕸️</span>
      <span aria-hidden="true" style={{position:"absolute",top:"4%",left:"2%",fontSize:16,opacity:0.38,pointerEvents:"none"}}>🕸️</span>
      <span aria-hidden="true" style={{position:"absolute",top:"66%",left:"3%",fontSize:26,opacity:0.48,animation:"adventureFloat 5.8s ease-in-out infinite 1.8s",pointerEvents:"none"}}>🎃</span>
    </>
  );
  // 7. Ollie's Cozy Corner — paw prints, yarn balls, cat faces
  if (landIndex === 7) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"11%",left:"4%",fontSize:26,opacity:0.68,animation:"adventureFloat 4s ease-in-out infinite",pointerEvents:"none"}}>🐾</span>
      <span aria-hidden="true" style={{position:"absolute",top:"36%",right:"5%",fontSize:22,opacity:0.62,animation:"adventureFloat 5.2s ease-in-out infinite 0.7s",pointerEvents:"none"}}>🐾</span>
      <span aria-hidden="true" style={{position:"absolute",top:"58%",left:"3%",fontSize:18,opacity:0.5,animation:"adventureFloat 6s ease-in-out infinite 1.4s",pointerEvents:"none"}}>🐾</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"22%",left:"5%",fontSize:30,opacity:0.6,animation:"yarnBounce 2.2s ease-in-out infinite 0.3s",pointerEvents:"none"}}>🧶</span>
      <span aria-hidden="true" style={{position:"absolute",top:"18%",right:"3%",fontSize:18,opacity:0.42,animation:"yarnBounce 2.6s ease-in-out infinite 0.8s",pointerEvents:"none"}}>🧶</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"28%",right:"4%",fontSize:24,opacity:0.55,animation:"adventureFloat 3.8s ease-in-out infinite 1s",pointerEvents:"none"}}>🐱</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"12%",right:"6%",fontSize:20,opacity:0.48,animation:"adventureFloat 5s ease-in-out infinite 2s",pointerEvents:"none"}}>🐱</span>
    </>
  );
  // 8. Shut-In Button Land — colorful buttons spinning slowly
  if (landIndex === 8) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"10%",left:"4%",fontSize:28,opacity:0.72,animation:"spinSlow 8s linear infinite",pointerEvents:"none"}}>🔵</span>
      <span aria-hidden="true" style={{position:"absolute",top:"26%",right:"5%",fontSize:22,opacity:0.68,animation:"spinSlow 6s linear infinite 1s",pointerEvents:"none"}}>🔴</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"26%",left:"5%",fontSize:30,opacity:0.62,animation:"spinSlow 10s linear infinite 2s",pointerEvents:"none"}}>🟡</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"14%",right:"4%",fontSize:24,opacity:0.58,animation:"spinSlow 7s linear infinite 0.5s",pointerEvents:"none"}}>🟢</span>
      <span aria-hidden="true" style={{position:"absolute",top:"50%",right:"3%",fontSize:18,opacity:0.52,animation:"spinSlow 5s linear infinite 1.5s",pointerEvents:"none"}}>🔵</span>
      <span aria-hidden="true" style={{position:"absolute",top:"66%",left:"3%",fontSize:20,opacity:0.48,animation:"spinSlow 9s linear infinite 3s",pointerEvents:"none"}}>🔴</span>
      <span aria-hidden="true" style={{position:"absolute",top:"16%",left:"8%",fontSize:16,opacity:0.42,animation:"adventureFloat 4s ease-in-out infinite 0.7s",pointerEvents:"none"}}>🪡</span>
    </>
  );
  // 9. Doodle-Do's Barnyard — sunrise, roosters, sunflowers
  if (landIndex === 9) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"7%",right:"5%",fontSize:34,opacity:0.68,animation:"adventureFloat 5s ease-in-out infinite",pointerEvents:"none"}}>☀️</span>
      <span aria-hidden="true" style={{position:"absolute",top:"26%",left:"4%",fontSize:26,opacity:0.62,animation:"adventureFloat 4.5s ease-in-out infinite 0.8s",pointerEvents:"none"}}>🌅</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"26%",right:"5%",fontSize:22,opacity:0.6,animation:"adventureFloat 3.8s ease-in-out infinite 1.2s",pointerEvents:"none"}}>🐓</span>
      <span aria-hidden="true" style={{position:"absolute",top:"50%",right:"3%",fontSize:18,opacity:0.48,animation:"twinkle 3s ease-in-out infinite 0.5s",pointerEvents:"none"}}>✨</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"14%",left:"5%",fontSize:24,opacity:0.52,animation:"adventureFloat 6.5s ease-in-out infinite 1.5s",pointerEvents:"none"}}>🌾</span>
      <span aria-hidden="true" style={{position:"absolute",top:"66%",left:"3%",fontSize:20,opacity:0.44,animation:"adventureFloat 4.2s ease-in-out infinite 2s",pointerEvents:"none"}}>🌻</span>
      <span aria-hidden="true" style={{position:"absolute",top:"16%",left:"7%",fontSize:16,opacity:0.42,animation:"twinkle 2.8s ease-in-out infinite 0.3s",pointerEvents:"none"}}>⭐</span>
    </>
  );
  // 10. Tom Turkey's Harvest Parade — corn, maple leaves, turkey
  if (landIndex === 10) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"10%",left:"4%",fontSize:28,opacity:0.68,animation:"leafSpin 5.2s ease-in-out infinite",pointerEvents:"none"}}>🍁</span>
      <span aria-hidden="true" style={{position:"absolute",top:"22%",right:"5%",fontSize:26,opacity:0.65,animation:"adventureFloat 4.5s ease-in-out infinite 0.5s",pointerEvents:"none"}}>🌽</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"26%",left:"5%",fontSize:22,opacity:0.58,animation:"leafSpin 3.8s ease-in-out infinite 1s",pointerEvents:"none"}}>🍁</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"14%",right:"4%",fontSize:24,opacity:0.52,animation:"adventureFloat 5.5s ease-in-out infinite 1.5s",pointerEvents:"none"}}>🦃</span>
      <span aria-hidden="true" style={{position:"absolute",top:"50%",right:"3%",fontSize:20,opacity:0.48,animation:"leafSpin 4.2s ease-in-out infinite 0.8s",pointerEvents:"none"}}>🍂</span>
      <span aria-hidden="true" style={{position:"absolute",top:"66%",left:"3%",fontSize:18,opacity:0.42,animation:"adventureFloat 6s ease-in-out infinite 2s",pointerEvents:"none"}}>🌽</span>
      <span aria-hidden="true" style={{position:"absolute",top:"12%",right:"8%",fontSize:16,opacity:0.4,animation:"leafSpin 3.2s ease-in-out infinite 1.2s",pointerEvents:"none"}}>🍁</span>
    </>
  );
  // 11. Bailey's Frog Dream — lily pad frogs, water drops, green reeds
  if (landIndex === 11) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"10%",left:"4%",fontSize:30,opacity:0.68,animation:"adventureFloat 4.2s ease-in-out infinite",pointerEvents:"none"}}>🐸</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"28%",right:"4%",fontSize:24,opacity:0.62,animation:"adventureFloat 5.8s ease-in-out infinite 0.9s",pointerEvents:"none"}}>🐸</span>
      <span aria-hidden="true" style={{position:"absolute",top:"28%",right:"5%",fontSize:22,opacity:0.62,animation:"waterDrop 2.8s ease-in-out infinite 0.3s",pointerEvents:"none"}}>💧</span>
      <span aria-hidden="true" style={{position:"absolute",top:"56%",left:"3%",fontSize:18,opacity:0.5,animation:"waterDrop 3.5s ease-in-out infinite 1s",pointerEvents:"none"}}>💧</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"18%",left:"5%",fontSize:26,opacity:0.58,animation:"adventureFloat 3.8s ease-in-out infinite 1.2s",pointerEvents:"none"}}>🌿</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"12%",right:"6%",fontSize:24,opacity:0.5,animation:"adventureFloat 5.5s ease-in-out infinite 0.6s",pointerEvents:"none"}}>🌿</span>
      <span aria-hidden="true" style={{position:"absolute",top:"18%",right:"3%",fontSize:18,opacity:0.42,animation:"waterDrop 4s ease-in-out infinite 2s",pointerEvents:"none"}}>🌊</span>
    </>
  );
  // 12. Brian's Haunted House — bobbing ghosts, bats, cobwebs, candles
  if (landIndex === 12) return (
    <>
      <span aria-hidden="true" style={{position:"absolute",top:"11%",left:"5%",fontSize:34,opacity:0.78,animation:"ghostFloat 3.8s ease-in-out infinite",pointerEvents:"none"}}>👻</span>
      <span aria-hidden="true" style={{position:"absolute",top:"40%",right:"6%",fontSize:28,opacity:0.68,animation:"ghostFloat 4.8s ease-in-out infinite 1.1s",pointerEvents:"none"}}>👻</span>
      <span aria-hidden="true" style={{position:"absolute",top:"62%",left:"3%",fontSize:20,opacity:0.55,animation:"ghostFloat 6s ease-in-out infinite 2s",pointerEvents:"none"}}>👻</span>
      <span aria-hidden="true" style={{position:"absolute",top:"20%",right:"4%",fontSize:22,opacity:0.58,animation:"batFly 2.6s ease-in-out infinite",pointerEvents:"none"}}>🦇</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"26%",left:"4%",fontSize:20,opacity:0.52,animation:"batFly 3.2s ease-in-out infinite 0.6s",pointerEvents:"none"}}>🦇</span>
      <span aria-hidden="true" style={{position:"absolute",top:"4%",right:"3%",fontSize:18,opacity:0.48,pointerEvents:"none"}}>🕸️</span>
      <span aria-hidden="true" style={{position:"absolute",top:"4%",left:"2%",fontSize:16,opacity:0.42,pointerEvents:"none"}}>🕸️</span>
      <span aria-hidden="true" style={{position:"absolute",bottom:"16%",right:"5%",fontSize:20,opacity:0.55,animation:"adventureFloat 5s ease-in-out infinite 1.5s",pointerEvents:"none"}}>🕯️</span>
    </>
  );
  return null;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const amazonUrl = book.amazonUrl || AMAZON_STORE_URL;
  const description = book.longDescription || book.description;

  // Determine if text should be light or dark based on gradient start
  const darkGradients = [
    "amber-the-dragon-keeper",
    "dream-ideas",
    "ollie-come-home",
    "frog-a-dog",
    "brian-the-ghost",
    "the-lumpiest-pumpkin",
  ];
  const heroTextLight = darkGradients.includes(slug);
  const heroTextColor = heroTextLight ? "#ffffff" : "#1a1a1a";
  const heroSubColor = heroTextLight ? "rgba(255,255,255,0.85)" : "rgba(30,30,30,0.75)";
  const heroBadgeBg = heroTextLight ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  const heroBadgeBorder = heroTextLight ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.2)";
  const heroBadgeColor = heroTextLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)";

  // Blend a hex color over a background at given alpha → fully opaque solid color.
  function blendColors(bg: string, fg: string, alpha: number): string {
    const br = parseInt(bg.slice(1,3),16), bg2 = parseInt(bg.slice(3,5),16), bb = parseInt(bg.slice(5,7),16);
    const fr = parseInt(fg.slice(1,3),16), fg2 = parseInt(fg.slice(3,5),16), fb = parseInt(fg.slice(5,7),16);
    return `rgb(${Math.round(fr*alpha+br*(1-alpha))},${Math.round(fg2*alpha+bg2*(1-alpha))},${Math.round(fb*alpha+bb*(1-alpha))})`;
  }
  // Day-mode solids (white bg = #ffffff)
  const readAloudBgSolid = blendColors('#ffffff', book.accentColor, 0x2e / 255);
  // First color stop of the gradient — used as wave fill when Activity uses the gradient bg
  const gradientStartColor = (book.gradient.match(/#[0-9a-fA-F]{6}/) ?? ['#ffffff'])[0];

  // dream-ideas + amber + poo-poo-face: Activity in white section, About+CTA merged in gradient section
  const activityFirst = slug === 'dream-ideas' || slug === 'amber-the-dragon-keeper' || slug === 'whats-your-poo-poo-face' || slug === 'finding-hampton' || slug === 'gilroys-gobble' || slug === 'the-lumpiest-pumpkin' || slug === 'one-tom-turkey' || slug === 'ollie-come-home' || slug === 'what-a-doodle-do' || slug === 'the-shut-in-button' || slug === 'frog-a-dog' || slug === 'brian-the-ghost';
  // poo-poo-face uses a landscape dragon — position it differently in the hero
  const isPooPooFace = slug === 'whats-your-poo-poo-face';

  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }
        @keyframes bookFadeIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes adventureFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50%       { transform: translateY(-28px) rotate(3deg); }
        }
        @keyframes leafSpin {
          0%   { transform: rotate(0deg)   translateY(0px); }
          25%  { transform: rotate(18deg)  translateY(-8px); }
          75%  { transform: rotate(-12deg) translateY(-14px); }
          100% { transform: rotate(0deg)   translateY(0px); }
        }
        @keyframes spinSlow {
          0%   { transform: rotate(0deg)   scale(1); }
          50%  { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes yarnBounce {
          0%, 100% { transform: translateY(0)    scale(1); }
          30%       { transform: translateY(-14px) scale(1.1); }
          60%       { transform: translateY(-5px)  scale(0.95); }
        }
        @keyframes ghostFloat {
          0%, 100% { transform: translateY(0)    rotate(-5deg) scale(1); }
          50%       { transform: translateY(-22px) rotate(5deg)  scale(1.08); }
        }
        @keyframes batFly {
          0%   { transform: translateX(0)     translateY(0); }
          25%  { transform: translateX(22px)  translateY(-14px); }
          75%  { transform: translateX(-15px) translateY(-8px); }
          100% { transform: translateX(0)     translateY(0); }
        }
        @keyframes driftFloat {
          0%, 100% { transform: translateX(0)     translateY(0); }
          33%       { transform: translateX(18px)  translateY(-10px); }
          66%       { transform: translateX(-12px) translateY(-6px); }
        }
        @keyframes waterDrop {
          0%, 100% { transform: translateY(0)    scale(1);    opacity: 0.5; }
          50%       { transform: translateY(12px) scale(0.85); opacity: 0.8; }
        }
        .book-page-cover { animation: bookFloat 5s ease-in-out infinite; }
        .book-page-hero-content { animation: bookFadeIn 0.8s ease forwards; }
        .book-cta-btn:hover {
          transform: translateY(-3px) scale(1.04) !important;
          box-shadow: 0 10px 32px rgba(0,0,0,0.3) !important;
        }
        .book-back-link:hover { opacity: 0.75; }

        /* Section backgrounds */
        /* readAloudBgSolid = pre-computed solid hex (no color-mix, no CSS vars) — safe on every browser */
        .section-read-aloud { background-color: ${readAloudBgSolid}; }
        /* Activity always uses the same warm gradient as CTA — they visually merge, no seam */
        .section-activity { background: ${book.gradient}; }

        /* Wave fills — must exactly match the section they blend into */
        .wave-fill-read-aloud { fill: ${readAloudBgSolid}; }
        /* Wave into Activity fills with gradient start color so it matches Activity's background */
        .wave-fill-activity { fill: ${gradientStartColor}; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — themed gradient + cover + title
      ══════════════════════════════════════════════════════════════════ */}
      <section
        className="book-page-hero"
        style={{
          background: book.gradient,
          minHeight: isPooPooFace ? "62vh" : "50vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "48px 24px 88px",
        }}
      >
        {/* Themed land decorations — positioned as background atmosphere */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {getDecorations(book.landIndex)}
        </div>

        {/* Back button */}
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 3, marginBottom: 40 }}>
          <Link
            href="/"
            className="book-back-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: heroSubColor,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              transition: "opacity 0.2s",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            ← Back to the Map
          </Link>
        </div>

        {/* Hero content */}
        <div
          className="book-page-hero-content"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "clamp(32px, 6vw, 80px)",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Cover / Character */}
          {activityFirst && book.characterImage ? (
            isPooPooFace ? (
              /* poo-poo-face: dragon centered, text below — simple stacked layout */
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, position: "relative", zIndex: 2 }}>
                {/* Dragon — centered, slightly smaller */}
                <Image
                  src={book.characterImage}
                  alt={`${book.title} character`}
                  width={600}
                  height={386}
                  style={{ width: "clamp(260px, 44vw, 560px)", height: "auto", display: "block", filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.18))", transform: "scaleX(-1)" }}
                  priority
                />
                {/* Text below the dragon, centered */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                  <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: heroBadgeBg, border: `1.5px solid ${heroBadgeBorder}`, color: heroBadgeColor, marginBottom: 12, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif", backdropFilter: "blur(4px)" }}>
                    Land {book.landIndex} — {book.landName}
                  </span>
                  <h1 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: "clamp(28px, 5vw, 56px)", color: heroTextColor, lineHeight: 1.05, marginBottom: 12 }}>
                    {book.title}
                  </h1>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 12 }}>
                    {book.themes.map((theme) => (
                      <span key={theme} style={{ display: "inline-block", padding: "5px 14px", borderRadius: 50, fontSize: 13, fontWeight: 700, backgroundColor: book.accentColor, color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.2)", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                        {theme}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: heroSubColor, fontWeight: 600, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                    📚 {book.ageRange}
                  </p>
                </div>
              </div>
            ) : (
              /* dream-ideas / amber: portrait character art */
              <div
                className="book-page-cover"
                style={{
                  flex: "0 0 auto",
                  width: "clamp(180px, 24vw, 300px)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={book.characterImage}
                  alt={`${book.title} character`}
                  width={300}
                  height={400}
                  style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.45))" }}
                  priority
                />
              </div>
            )
          ) : (
            <div
              className="book-page-cover"
              style={{
                flex: "0 0 auto",
                width: "clamp(160px, 22vw, 260px)",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 20px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src={book.coverImage}
                alt={`${book.title} book cover`}
                width={260}
                height={260}
                style={{ width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
          )}

          {/* Text block — hidden for poo-poo-face (text lives inside the stacked layout above) */}
          <div
            className={`book-page-text-block${isPooPooFace ? " poo-hide" : ""}`}
            style={{
              flex: "1 1 280px",
              minWidth: 240,
              ...(isPooPooFace ? { display: "none" } : {}),
            }}
          >
            {/* Land name badge */}
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backgroundColor: heroBadgeBg,
                border: `1.5px solid ${heroBadgeBorder}`,
                color: heroBadgeColor,
                marginBottom: 16,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                backdropFilter: "blur(4px)",
              }}
            >
              Land {book.landIndex} — {book.landName}
            </span>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(32px, 6vw, 64px)",
                color: heroTextColor,
                lineHeight: 1.05,
                marginBottom: 12,
                textShadow: heroTextLight
                  ? "0 3px 20px rgba(0,0,0,0.4)"
                  : "0 2px 8px rgba(255,255,255,0.3)",
              }}
            >
              {book.title}
            </h1>

            {/* Theme badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {book.themes.map((theme) => (
                <span
                  key={theme}
                  style={{
                    display: "inline-block",
                    padding: "5px 14px",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 700,
                    backgroundColor: book.accentColor,
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                  }}
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* Age range */}
            <p
              style={{
                fontSize: 15,
                color: heroSubColor,
                fontWeight: 600,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              }}
            >
              📚 {book.ageRange}
            </p>
          </div>
        </div>

        {/* Wave 1 — Hero → About (unique shape, fills white below) */}
        <div style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 64, pointerEvents: "none", zIndex: 4 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
            <path d="M0,40 C360,16 720,58 1080,22 C1260,10 1380,50 1440,32 L1440,64 L0,64 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WHITE SECTION — About the Book (default) OR Activity (activityFirst)
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff", padding: activityFirst ? "0" : "28px 24px 72px", position: "relative", overflow: "visible" }}>
        {activityFirst ? (
          /* dream-ideas: Activity goes here in white section */
          <>
          <BookActivity slug={slug} accentColor={book.accentColor} transparent textLight={false} />
          <BookGames slug={slug} accentColor={book.accentColor} />
          </>
        ) : (
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: book.accentColor,
              marginBottom: 12,
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            📖 About the Book
          </p>
          <h2
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(24px, 4vw, 40px)",
              color: "#2D1B69",
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            {book.hook}
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#4a3a6e",
              lineHeight: 1.75,
              marginBottom: 32,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            {description}
          </p>

          {/* Perfect For */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              backgroundColor: `${book.accentColor}12`,
              border: `2px solid ${book.accentColor}33`,
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 15,
                color: book.accentColor,
                fontWeight: 700,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              }}
            >
              {book.perfectFor}
            </p>
          </div>

          {/* Age badge */}
          <span
            style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 700,
              backgroundColor: book.accentColor,
              color: "#fff",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Perfect for {book.ageRange}
          </span>
        </div>
        )} {/* end activityFirst conditional */}

        {/* Wave 2 — About/Activity → Read Aloud (unique shape, fills Read Aloud color below) */}
        <div style={{ position: "absolute", bottom: -1, left: 0, width: "100%", height: 64, pointerEvents: "none", zIndex: 4 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
            <path d="M0,32 C240,56 540,8 840,46 C1060,60 1280,14 1440,38 L1440,64 L0,64 Z" className="wave-fill-read-aloud" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          READ ALOUD SECTION
      ══════════════════════════════════════════════════════════════════ */}
      {book.hasReadAloud ? (
        <section
          style={{
            backgroundColor: undefined,
            padding: "48px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "visible",
            zIndex: 1,
          }}
          className="section-read-aloud"
        >
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: book.accentColor,
                marginBottom: 12,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              }}
            >
              🎧 Read Aloud
            </p>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(24px, 4vw, 40px)",
                color: "#2D1B69",
                marginBottom: 16,
              }}
            >
              Read It To Me!
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#4a3a6e",
                marginBottom: 32,
                lineHeight: 1.6,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              Snuggle up — the full story is ready to read aloud. Tap a page to hear it read to you, flip through at your own pace, or let it play automatically! 📖✨
            </p>
            <Link
              href={`/read/${book.id}`}
              className="book-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 50,
                backgroundColor: book.accentColor,
                color: "#fff",
                fontWeight: 900,
                fontSize: 17,
                textDecoration: "none",
                boxShadow: `0 6px 24px ${book.accentColor}55`,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              📖 Start Reading Now →
            </Link>
          </div>

          {/* Wave 3 — Read Aloud → Activity (fills above with Read Aloud color, 1px overlap eliminates seam) */}
          <div style={{ position: "absolute", bottom: -63, left: 0, width: "100%", height: 65, pointerEvents: "none", zIndex: 4 }}>
            <svg viewBox="0 0 1440 65" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
              <path d="M0,39 C300,13 620,59 940,19 C1140,5 1320,53 1440,31 L1440,0 L0,0 Z" className="wave-fill-read-aloud" />
            </svg>
          </div>
        </section>
      ) : (
        <section
          style={{
            backgroundColor: "#f9f5ff",
            padding: "64px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "visible",
            zIndex: 1,
          }}
        >
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: `${book.accentColor}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 36,
              }}
            >
              📖
            </div>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 16,
              }}
            >
              Coming Soon — Read Aloud!
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#7B6898",
                lineHeight: 1.6,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              We&apos;re recording{" "}
              <strong style={{ color: book.accentColor }}>{book.title}</strong> right now!
              Check back soon — the full read-aloud experience is coming. 🎙️
            </p>
          </div>

          {/* Wave 4 — Coming Soon → Activity (fills above, 1px overlap eliminates seam) */}
          <div style={{ position: "absolute", bottom: -63, left: 0, width: "100%", height: 65, pointerEvents: "none", zIndex: 4 }}>
            <svg viewBox="0 0 1440 65" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
              <path d="M0,29 C280,55 580,9 880,45 C1110,63 1320,17 1440,37 L1440,0 L0,0 Z" style={{ fill: "#f9f5ff" }} />
            </svg>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          ACTIVITY + CTA — one shared gradient wrapper, zero seams
      ══════════════════════════════════════════════════════════════════ */}
      <div style={{ background: book.gradient, marginTop: -64, position: "relative", zIndex: 0 }}>
        {/* Wave at top — fills Read Aloud color above curve, gradient shows below */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 65, pointerEvents: "none", zIndex: 4 }}>
          <svg viewBox="0 0 1440 65" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
            <path d="M0,39 C300,13 620,59 940,19 C1140,5 1320,53 1440,31 L1440,0 L0,0 Z" className="wave-fill-read-aloud" />
          </svg>
        </div>

        {/* Activity (default) OR merged About+CTA (activityFirst — dream-ideas) */}
        {activityFirst ? (
          /* dream-ideas: About + CTA merged into one unified section */
          <section className="book-activityfirst-bottom" style={{ padding: "170px 24px 96px", textAlign: "center", position: "relative", overflow: "visible" }}>
            {/* Decorations */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
              {getDecorations(book.landIndex)}
            </div>
            <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto" }}>
              {/* Hook */}
              <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 40px)", color: "#ffffff", marginBottom: 20, lineHeight: 1.25, textShadow: "0 2px 16px rgba(0,0,0,0.4)", wordBreak: "break-word" }}>
                {book.hook}
              </h2>
              {/* Description */}
              <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: 20, fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                {description}
              </p>
              {/* Perfect For — single clean line, no bubbles */}
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginBottom: 48, fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                ✨ {book.perfectFor} · {book.ageRange}
              </p>

              {/* 2-column: cover left, CTA right — tight container keeps them adjacent */}
              <div className="book-cta-container" style={{ display: "inline-flex", gap: 32, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
                {/* Left — book cover */}
                {book.coverImage && (
                  <div style={{ flex: "0 0 auto", width: 180, height: 180, borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.55)" }}>
                    <Image src={book.coverImage} alt={book.title} width={180} height={180} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
                {/* Right — buy buttons, centered */}
                <div className="book-cta-btn-group" style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                  <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="book-cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 50, backgroundColor: "#ff9c1a", color: "#fff", fontWeight: 900, fontSize: 17, textDecoration: "none", boxShadow: "0 6px 24px rgba(255,156,26,0.5)", fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", transition: "transform 0.2s ease, box-shadow 0.2s ease", whiteSpace: "nowrap" }}>
                    Get {book.title} on Amazon →
                  </a>
                  <a href="https://www.amazon.com/familyfables" target="_blank" rel="noopener noreferrer" className="book-cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 50, backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 700, fontSize: 16, textDecoration: "none", border: "2px solid rgba(255,255,255,0.5)", backdropFilter: "blur(4px)", fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", transition: "transform 0.2s ease, box-shadow 0.2s ease", whiteSpace: "nowrap" }}>
                    ← Browse all books
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <BookActivity slug={slug} accentColor={book.accentColor} transparent textLight={heroTextLight} />
        )}

        {/* CTA — only for standard pages (activityFirst pages use the merged section above) */}
        {!activityFirst && (
        <section
          style={{
            padding: "80px 24px",
            textAlign: "center",
            position: "relative",
            overflow: "visible",
          }}
        >
        {/* No wave needed — Activity and CTA share the same gradient, they merge seamlessly */}
        {/* Themed land decorations */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {getDecorations(book.landIndex)}
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Small cover */}
          {book.coverImage && (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 16,
                overflow: "hidden",
                margin: "0 auto 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src={book.coverImage}
                alt={book.title}
                width={100}
                height={100}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          <h2
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(24px, 4.5vw, 48px)",
              color: heroTextColor,
              marginBottom: 12,
              textShadow: heroTextLight ? "0 2px 16px rgba(0,0,0,0.4)" : "none",
            }}
          >
            Love {book.title}?
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              color: heroSubColor,
              marginBottom: 32,
              maxWidth: 480,
              margin: "0 auto 32px",
              lineHeight: 1.5,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            Get your copy on Amazon and bring {book.landName} home with you. 🌟
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="book-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 50,
                backgroundColor: "#ff9c1a",
                color: "#fff",
                fontWeight: 900,
                fontSize: 17,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(255,156,26,0.5)",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              Get {book.title} on Amazon →
            </a>

            <Link
              href="/"
              className="book-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 50,
                backgroundColor: "rgba(255,255,255,0.15)",
                color: heroTextLight ? "#fff" : "#333",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                border: `2px solid ${heroTextLight ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.25)"}`,
                backdropFilter: "blur(4px)",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              ← Browse all books
            </Link>
          </div>
        </div>
      </section>
        )} {/* end !activityFirst CTA */}
      </div>{/* end gradient wrapper */}
    </>
  );
}
