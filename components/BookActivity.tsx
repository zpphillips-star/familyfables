"use client";

import { useState, useRef, useEffect } from "react";
import CountingSheep from "@/components/games/CountingSheep";
import HalloweenCountdown from "@/components/HalloweenCountdown";

// ── Per-book activity definitions ─────────────────────────────────────────────

// ── Shared helpers ────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const BAD_WORDS = ["shit","fuck","ass","bitch","damn","cock","dick","pussy","bastard","cunt","nigger","nigga","faggot","retard","whore","slut","piss"];
function filterBadWords(w: string): string {
  let out = w;
  for (const b of BAD_WORDS) out = out.replace(new RegExp(`\\b${b}\\w*`,"gi"), "🌟");
  return out.trim();
}


const AFFIRMATIONS = [
  "You are brave, you are bold, you've got a voice — now go use it! 🎉",
  "Your sound is YOUR sound. Nobody else has it. Ever. 🎵",
  "You are perfectly YOU, and that is the best thing to be. 🌟",
  "Big ideas live in small people. Yours is no exception. ✨",
  "Whatever you say, say it loudly. The world needs to hear you! 🦃",
];

const CHEERS = [
  "Good morning, sunshine! The day called — it wants YOUR energy! ☀️",
  "Rise and SHINE! The chickens are already up and they're waiting for you! 🐓",
  "Today is going to be amazing, and YOU are going to be amazing in it! 🌟",
  "COCK-A-DOODLE-DOO! Translation: GET UP, ADVENTURE AWAITS! 🎉",
  "The morning is here! Which means breakfast, and also — YOU! Hooray! 🍳",
];

function DreamIdeasActivity({ accentColor, textLight }: { accentColor: string; textLight?: boolean }) {
  const [dream, setDream] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {!submitted ? (
        <>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: textLight ? "rgba(255,255,255,0.9)" : "#1a1060" }}>
            What&apos;s YOUR dream idea? Close your eyes, think really hard... then type it below! ✨
          </p>
          <textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="My dream idea is..."
            rows={3}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: `2px solid ${accentColor}88`,
              fontSize: 16,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              resize: "none",
              outline: "none",
              color: "#1a1060",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={() => dream.trim() && setSubmitted(true)}
            style={{
              alignSelf: "flex-start",
              padding: "12px 28px",
              borderRadius: 50,
              backgroundColor: accentColor,
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              cursor: dream.trim() ? "pointer" : "not-allowed",
              opacity: dream.trim() ? 1 : 0.45,
              transition: "opacity 0.2s, transform 0.15s",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              boxShadow: dream.trim() ? `0 4px 20px ${accentColor}66` : "none",
            }}
          >
            Dream it! 💫
          </button>
        </>
      ) : (
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
            border: `2px solid ${accentColor}`,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 14, color: accentColor, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            ✨ Your Dream Idea ✨
          </p>
          <p
            style={{
              fontSize: "clamp(18px, 3vw, 24px)",
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              color: "#1a1060",
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            &ldquo;{dream}&rdquo;
          </p>
          <p style={{ fontSize: 14, color: "#5b5b9b" }}>
            🌙 Don&apos;t forget it! Great ideas visit in dreams all the time.
          </p>
          <button
            onClick={() => { setDream(""); setSubmitted(false); }}
            style={{
              marginTop: 12,
              padding: "8px 20px",
              borderRadius: 50,
              backgroundColor: "transparent",
              color: accentColor,
              fontWeight: 700,
              fontSize: 14,
              border: `2px solid ${accentColor}`,
              cursor: "pointer",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Dream again ↩
          </button>
        </div>
      )}
    </div>
  );
}

function GilroyAffirmation({ accentColor }: { accentColor: string }) {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          padding: "28px 32px",
          borderRadius: 20,
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
          border: `2px solid ${accentColor}`,
          textAlign: "center",
          minHeight: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            color: "#3e1a00",
            lineHeight: 1.4,
          }}
        >
          {AFFIRMATIONS[idx]}
        </p>
      </div>
      <button
        onClick={() => setIdx((i) => (i + 1) % AFFIRMATIONS.length)}
        style={{
          alignSelf: "flex-start",
          padding: "10px 24px",
          borderRadius: 50,
          backgroundColor: accentColor,
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
        }}
      >
        Another one! 🦃
      </button>
    </div>
  );
}

const PUMPKIN_RESULTS = [
  { emoji: "🎃", label: "The Standout", desc: "You're bold, a little lumpy, and totally impossible to ignore. That's not a flaw — that's a superpower." },
  { emoji: "🌟", label: "The Sparkler", desc: "You light up every room you walk into, especially when nobody expected you to. Classic you." },
  { emoji: "✨", label: "The Hidden Gem", desc: "People have to look twice to notice how amazing you are. Their loss — and then their gain." },
];

// ── Pumpkin Carver helpers ──────────────────────────────────────────────────────
function starD(outer: number, inner: number, pts: number): string {
  const arr: string[] = [];
  for (let i = 0; i < pts * 2; i++) {
    const a = (i * Math.PI) / pts - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    arr.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${arr.join(" L")} Z`;
}

type FaceSlot = "eyeL" | "eyeR" | "nose" | "mouth";
interface ShapeOpt { id: string; label: string; d: string; }

const EYE_OPTS: ShapeOpt[] = [
  { id: "none",  label: "—",  d: "" },
  { id: "tri",   label: "▲",  d: "M0,-16 L14,12 L-14,12 Z" },
  { id: "circ",  label: "●",  d: "M-13,0 a13,13 0 1,0 26,0 a13,13 0 1,0 -26,0" },
  { id: "dia",   label: "◆",  d: "M0,-15 L12,0 L0,15 L-12,0 Z" },
  { id: "star",  label: "★",  d: starD(14, 6, 5) },
  { id: "sqr",   label: "■",  d: "M-11,-11 L11,-11 L11,11 L-11,11 Z" },
];
const NOSE_OPTS: ShapeOpt[] = [
  { id: "none",  label: "—",  d: "" },
  { id: "tri",   label: "▲",  d: "M0,-12 L13,10 L-13,10 Z" },
  { id: "circ",  label: "●",  d: "M-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0" },
  { id: "dia",   label: "◆",  d: "M0,-12 L10,0 L0,12 L-10,0 Z" },
  { id: "heart", label: "♥",  d: "M0,9 C-15,1 -15,-9 -7,-9 C-3,-9 0,-5 0,-5 C0,-5 3,-9 7,-9 C15,-9 15,1 0,9 Z" },
];
const MOUTH_OPTS: ShapeOpt[] = [
  { id: "none",   label: "—",  d: "" },
  { id: "smile",  label: "😊", d: "M-36,-2 Q-20,26 0,26 Q20,26 36,-2 L26,-6 Q14,16 0,16 Q-14,16 -26,-6 Z" },
  { id: "scary",  label: "😱", d: "M-38,-10 L-28,10 L-16,-10 L-4,10 L8,-10 L20,10 L32,-10 L38,8 L38,-14 L-38,-14 Z" },
  { id: "gap",    label: "😁", d: "M-36,-4 Q-22,20 0,20 Q22,20 36,-4 L26,-6 Q12,12 5,12 L5,-4 L-5,-4 L-5,12 Q-12,12 -26,-6 Z" },
  { id: "oh",     label: "😮", d: "M-14,0 a14,20 0 1,0 28,0 a14,20 0 1,0 -28,0" },
  { id: "frown",  label: "😟", d: "M-36,10 Q-20,-18 0,-18 Q20,-18 36,10 L26,14 Q12,-8 0,-8 Q-12,-8 -26,14 Z" },
];

const SLOT_CONFIG: Record<FaceSlot, { x: number; y: number; opts: ShapeOpt[]; label: string }> = {
  eyeL:  { x: 168, y: 250, opts: EYE_OPTS,   label: "Left Eye" },
  eyeR:  { x: 292, y: 250, opts: EYE_OPTS,   label: "Right Eye" },
  nose:  { x: 230, y: 295, opts: NOSE_OPTS,  label: "Nose" },
  mouth: { x: 230, y: 345, opts: MOUTH_OPTS, label: "Mouth" },
};

function PumpkinStudio({ accentColor }: { accentColor: string }) {
  const hf = "var(--font-concert-one),'Concert One',cursive";
  const bf = "var(--font-catamaran),'Catamaran',sans-serif";

  interface PumpkinDef { id:string; label:string; emoji:string; body:string }
  const PUMPKINS: PumpkinDef[] = [
    {id:"classic", label:"Classic", emoji:"🎃", body:`
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#a03d00'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#a03d00'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#c45000'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#c45000'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#e86000'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#ff8c10' opacity='0.75'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#ffb040' opacity='0.35'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#a03d00' stroke-width='2'   opacity='0.35'/>
  <line x1='88'  y1='48' x2='86'  y2='171' stroke='#a03d00' stroke-width='1.5' opacity='0.2'/>
  <line x1='112' y1='48' x2='114' y2='171' stroke='#a03d00' stroke-width='1.5' opacity='0.2'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#5d4037'/>
  <path d='M104 40 Q121 32 124 20' stroke='#7cb342' stroke-width='3.5' fill='none' stroke-linecap='round'/>
`},
    {id:"tall", label:"Tall", emoji:"🏔️", body:`
  <ellipse cx='100' cy='174' rx='46' ry='9'  fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='66'  cy='112' rx='16' ry='62' fill='#954000'/>
  <ellipse cx='134' cy='112' rx='16' ry='62' fill='#954000'/>
  <ellipse cx='82'  cy='106' rx='20' ry='70' fill='#b85200'/>
  <ellipse cx='118' cy='106' rx='20' ry='70' fill='#b85200'/>
  <ellipse cx='100' cy='102' rx='24' ry='76' fill='#e06800'/>
  <ellipse cx='100' cy='102' rx='14' ry='72' fill='#ff9020' opacity='0.7'/>
  <ellipse cx='93'  cy='82'  rx='8'  ry='24' fill='#ffb040' opacity='0.3'/>
  <line x1='100' y1='38' x2='100' y2='174' stroke='#954000' stroke-width='2'   opacity='0.35'/>
  <line x1='90'  y1='40' x2='88'  y2='173' stroke='#954000' stroke-width='1.5' opacity='0.2'/>
  <line x1='110' y1='40' x2='112' y2='173' stroke='#954000' stroke-width='1.5' opacity='0.2'/>
  <rect x='95' y='26' width='10' height='22' rx='5' fill='#5d4037'/>
  <path d='M104 36 Q116 28 118 18' stroke='#7cb342' stroke-width='3' fill='none' stroke-linecap='round'/>
`},
    {id:"chubby", label:"Chubby", emoji:"🫃", body:`
  <ellipse cx='100' cy='168' rx='68' ry='12' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='54'  cy='122' rx='28' ry='46' fill='#b04500'/>
  <ellipse cx='146' cy='122' rx='28' ry='46' fill='#b04500'/>
  <ellipse cx='100' cy='116' rx='36' ry='54' fill='#e07000'/>
  <ellipse cx='100' cy='116' rx='22' ry='52' fill='#ff9430' opacity='0.75'/>
  <ellipse cx='90'  cy='98'  rx='14' ry='20' fill='#ffb850' opacity='0.35'/>
  <line x1='100' y1='66' x2='100' y2='165' stroke='#b04500' stroke-width='2'   opacity='0.35'/>
  <line x1='82'  y1='72' x2='78'  y2='164' stroke='#b04500' stroke-width='1.5' opacity='0.2'/>
  <line x1='118' y1='72' x2='122' y2='164' stroke='#b04500' stroke-width='1.5' opacity='0.2'/>
  <rect x='95' y='44' width='10' height='28' rx='5' fill='#5d4037'/>
  <path d='M104 52 Q120 44 122 32' stroke='#7cb342' stroke-width='3.5' fill='none' stroke-linecap='round'/>
`},
    {id:"lumpy", label:"Lumpy", emoji:"🤭", body:`
  <ellipse cx='100' cy='170' rx='55' ry='10' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='58'  cy='122' rx='19' ry='48' fill='#8a3800'/>
  <ellipse cx='142' cy='118' rx='21' ry='50' fill='#8a3800'/>
  <ellipse cx='76'  cy='114' rx='23' ry='57' fill='#b04a00'/>
  <ellipse cx='124' cy='116' rx='25' ry='55' fill='#b04a00'/>
  <ellipse cx='100' cy='110' rx='28' ry='64' fill='#d86000'/>
  <ellipse cx='100' cy='110' rx='17' ry='60' fill='#f07820' opacity='0.7'/>
  <circle  cx='68'  cy='88'  r='8'  fill='#8a3800' opacity='0.6'/>
  <circle  cx='136' cy='92'  r='7'  fill='#8a3800' opacity='0.6'/>
  <circle  cx='84'  cy='68'  r='6'  fill='#8a3800' opacity='0.5'/>
  <circle  cx='115' cy='72'  r='5'  fill='#8a3800' opacity='0.5'/>
  <ellipse cx='90'  cy='92'  rx='8' ry='18' fill='#f8a040' opacity='0.3'/>
  <line x1='100' y1='48' x2='100' y2='170' stroke='#8a3800' stroke-width='2'   opacity='0.3'/>
  <rect x='95' y='34' width='10' height='24' rx='5' fill='#5d4037'/>
  <path d='M104 42 Q118 34 120 24' stroke='#7cb342' stroke-width='3' fill='none' stroke-linecap='round'/>
`},
    {id:"ghost", label:"Ghost", emoji:"👻", body:`
  <ellipse cx='100' cy='174' rx='54' ry='9'  fill='rgba(180,180,220,0.25)'/>
  <ellipse cx='100' cy='110' rx='48' ry='70' fill='#d0d0e8'/>
  <ellipse cx='100' cy='110' rx='40' ry='68' fill='#e8e8f4'/>
  <ellipse cx='100' cy='110' rx='30' ry='64' fill='#f4f4fa'/>
  <ellipse cx='92'  cy='90'  rx='12' ry='24' fill='white' opacity='0.6'/>
  <path d='M52 148 Q55 168 60 168 Q65 168 68 148 Q71 168 76 168 Q81 168 84 148 Q87 168 92 168 Q97 168 100 155 Q103 168 108 168 Q113 168 116 148 Q119 168 124 168 Q129 168 132 148 Q135 168 140 168 Q145 168 148 148' fill='white' stroke='#c8c8e0' stroke-width='1'/>
  <rect x='96' y='34' width='8' height='20' rx='4' fill='#8888aa'/>
  <path d='M103 40 Q115 34 117 24' stroke='#9999bb' stroke-width='3' fill='none' stroke-linecap='round'/>
`},
    {id:"spooky", label:"Spooky", emoji:"🔮", body:`
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,0,0,0.35)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#1a0030'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#1a0030'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#2d0050'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#2d0050'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#5500aa'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#7700cc' opacity='0.75'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#cc44ff' opacity='0.3'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#1a0030' stroke-width='2'   opacity='0.5'/>
  <line x1='88'  y1='48' x2='86'  y2='171' stroke='#1a0030' stroke-width='1.5' opacity='0.35'/>
  <line x1='112' y1='48' x2='114' y2='171' stroke='#1a0030' stroke-width='1.5' opacity='0.35'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#2a2a4a'/>
  <path d='M104 40 Q121 32 124 20' stroke='#8866cc' stroke-width='3.5' fill='none' stroke-linecap='round'/>
`},
    {id:"mini", label:"Mini", emoji:"🍊", body:`
  <ellipse cx='100' cy='164' rx='40' ry='8'  fill='rgba(0,0,0,0.15)'/>
  <ellipse cx='74'  cy='124' rx='16' ry='40' fill='#c04500'/>
  <ellipse cx='126' cy='124' rx='16' ry='40' fill='#c04500'/>
  <ellipse cx='100' cy='118' rx='22' ry='48' fill='#e86000'/>
  <ellipse cx='100' cy='118' rx='14' ry='46' fill='#ff9020' opacity='0.75'/>
  <ellipse cx='94'  cy='104' rx='7'  ry='16' fill='#ffb040' opacity='0.35'/>
  <line x1='100' y1='76' x2='100' y2='162' stroke='#c04500' stroke-width='1.5' opacity='0.35'/>
  <line x1='91'  y1='78' x2='90'  y2='161' stroke='#c04500' stroke-width='1'   opacity='0.2'/>
  <line x1='109' y1='78' x2='110' y2='161' stroke='#c04500' stroke-width='1'   opacity='0.2'/>
  <rect x='96' y='60' width='8' height='20' rx='4' fill='#5d4037'/>
  <path d='M103 68 Q114 62 116 52' stroke='#7cb342' stroke-width='2.5' fill='none' stroke-linecap='round'/>
`},
    {id:"neon", label:"Neon", emoji:"💚", body:`
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,80,0,0.25)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#003a00'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#003a00'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#005500'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#005500'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#00aa00'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#22dd22' opacity='0.75'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#88ff88' opacity='0.35'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#003a00' stroke-width='2'   opacity='0.4'/>
  <line x1='88'  y1='48' x2='86'  y2='171' stroke='#003a00' stroke-width='1.5' opacity='0.25'/>
  <line x1='112' y1='48' x2='114' y2='171' stroke='#003a00' stroke-width='1.5' opacity='0.25'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#2e5d2e'/>
  <path d='M104 40 Q121 32 124 20' stroke='#88cc44' stroke-width='3.5' fill='none' stroke-linecap='round'/>
`},
    {id:"warty", label:"Warty", emoji:"🐸", body:`
  <ellipse cx='100' cy='172' rx='56' ry='10' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='60'  cy='117' rx='20' ry='53' fill='#8b3a00'/>
  <ellipse cx='140' cy='117' rx='20' ry='53' fill='#8b3a00'/>
  <ellipse cx='79'  cy='111' rx='24' ry='61' fill='#b04e00'/>
  <ellipse cx='121' cy='111' rx='24' ry='61' fill='#b04e00'/>
  <ellipse cx='100' cy='108' rx='28' ry='66' fill='#d46400'/>
  <ellipse cx='100' cy='108' rx='17' ry='62' fill='#ee8010' opacity='0.75'/>
  <circle cx='62'  cy='100' r='5' fill='#7a3200' opacity='0.8'/>
  <circle cx='64'  cy='134' r='4' fill='#7a3200' opacity='0.7'/>
  <circle cx='138' cy='108' r='5' fill='#7a3200' opacity='0.8'/>
  <circle cx='135' cy='138' r='4' fill='#7a3200' opacity='0.7'/>
  <circle cx='80'  cy='162' r='3' fill='#7a3200' opacity='0.6'/>
  <circle cx='120' cy='160' r='3' fill='#7a3200' opacity='0.6'/>
  <ellipse cx='92'  cy='90'  rx='9'  ry='22' fill='#f8a040' opacity='0.3'/>
  <line x1='100' y1='46' x2='100' y2='172' stroke='#8b3a00' stroke-width='2'   opacity='0.35'/>
  <rect x='95' y='32' width='10' height='25' rx='5' fill='#5d4037'/>
  <path d='M104 40 Q121 32 124 20' stroke='#7cb342' stroke-width='3.5' fill='none' stroke-linecap='round'/>
`},
    {id:"giant", label:"Giant", emoji:"🫙", body:`
  <ellipse cx='100' cy='172' rx='70' ry='11' fill='rgba(0,0,0,0.18)'/>
  <ellipse cx='44'  cy='120' rx='16' ry='45' fill='#8a3500'/>
  <ellipse cx='156' cy='120' rx='16' ry='45' fill='#8a3500'/>
  <ellipse cx='62'  cy='116' rx='20' ry='54' fill='#a84500'/>
  <ellipse cx='138' cy='116' rx='20' ry='54' fill='#a84500'/>
  <ellipse cx='80'  cy='110' rx='24' ry='62' fill='#cc5a00'/>
  <ellipse cx='120' cy='110' rx='24' ry='62' fill='#cc5a00'/>
  <ellipse cx='100' cy='106' rx='28' ry='68' fill='#f07010'/>
  <ellipse cx='100' cy='106' rx='17' ry='64' fill='#ff9030' opacity='0.75'/>
  <ellipse cx='92'  cy='86'  rx='10' ry='24' fill='#ffb850' opacity='0.3'/>
  <line x1='100' y1='42' x2='100' y2='172' stroke='#8a3500' stroke-width='2'   opacity='0.35'/>
  <line x1='88'  y1='44' x2='86'  y2='172' stroke='#8a3500' stroke-width='1.5' opacity='0.2'/>
  <line x1='112' y1='44' x2='114' y2='172' stroke='#8a3500' stroke-width='1.5' opacity='0.2'/>
  <line x1='74'  y1='48' x2='70'  y2='168' stroke='#8a3500' stroke-width='1.5' opacity='0.15'/>
  <line x1='126' y1='48' x2='130' y2='168' stroke='#8a3500' stroke-width='1.5' opacity='0.15'/>
  <rect x='95' y='28' width='10' height='26' rx='5' fill='#5d4037'/>
  <path d='M104 36 Q122 28 125 16' stroke='#7cb342' stroke-width='4' fill='none' stroke-linecap='round'/>
`},
  ];

  interface FacePart { id:string; label:string; svg:string }
  interface ThemeDef { id:string; label:string; emoji:string; bg:string; accent:string; eyes:FacePart[]; noses:FacePart[]; mouths:FacePart[] }
  const THEMES: ThemeDef[] = [
    {id:"scary",label:"Scary",emoji:"😱",bg:"#1a0800",accent:"#ff4400",eyes:[{id:"tri",label:"Triangle",svg:`<polygon points='65,78 91,78 78,97' fill='#1a0800'/><polygon points='109,78 135,78 122,97' fill='#1a0800'/>`},{id:"dia",label:"Diamond",svg:`<polygon points='78,77 93,90 78,103 63,90' fill='#1a0800'/><polygon points='122,77 137,90 122,103 107,90' fill='#1a0800'/>`},{id:"dot",label:"Classic",svg:`<circle cx='78' cy='90' r='10' fill='#1a0800'/><circle cx='122' cy='90' r='10' fill='#1a0800'/><circle cx='75' cy='87' r='3' fill='white' opacity='0.55'/><circle cx='119' cy='87' r='3' fill='white' opacity='0.55'/>`}],noses:[{id:"tri",label:"Triangle",svg:`<polygon points='96,106 104,106 100,120' fill='#1a0800'/>`},{id:"dia",label:"Diamond",svg:`<polygon points='100,105 108,113 100,121 92,113' fill='#1a0800'/>`}],mouths:[{id:"jag",label:"Jagged",svg:`<path d='M70,128 L80,142 L90,128 L100,142 L110,128 L120,142 L130,128 L130,142 L70,142 Z' fill='#1a0800'/>`},{id:"zig",label:"Zigzag",svg:`<polyline points='70,138 80,128 90,138 100,128 110,138 120,128 130,138' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>`},{id:"grin",label:"Buck Teeth",svg:`<path d='M76,130 Q100,150 124,130 L122,130 Q100,144 78,130 Z' fill='#1a0800'/><rect x='90' y='130' width='9' height='13' fill='white' rx='2'/><rect x='101' y='130' width='9' height='13' fill='white' rx='2'/>`}]},
    {id:"princess",label:"Princess",emoji:"👸",bg:"#fff0f8",accent:"#ff69b4",eyes:[{id:"heart",label:"Hearts",svg:`<path d='M78,96 C78,88 65,81 65,91 C65,101 78,109 78,109 C78,109 91,101 91,91 C91,81 78,88 78,96 Z' fill='#FF69B4'/><path d='M122,96 C122,88 109,81 109,91 C109,101 122,109 122,109 C122,109 135,101 135,91 C135,81 122,88 122,96 Z' fill='#FF69B4'/>`},{id:"star",label:"Stars",svg:`<path d='M78,76 L81,86 L92,83 L84,91 L88,102 L78,96 L68,102 L72,91 L64,83 L75,86 Z' fill='#FFD700'/><path d='M122,76 L125,86 L136,83 L128,91 L132,102 L122,96 L112,102 L116,91 L108,83 L119,86 Z' fill='#FFD700'/>`},{id:"round",label:"Round",svg:`<circle cx='78' cy='90' r='12' fill='#1a0800'/><circle cx='122' cy='90' r='12' fill='#1a0800'/><circle cx='74' cy='86' r='4' fill='white' opacity='0.5'/><circle cx='118' cy='86' r='4' fill='white' opacity='0.5'/>`}],noses:[{id:"heart",label:"Heart",svg:`<path d='M100,120 C100,113 91,107 91,114 C91,121 100,128 100,128 C100,128 109,121 109,114 C109,107 100,113 100,120 Z' fill='#FF69B4'/>`},{id:"star",label:"Star",svg:`<path d='M100,105 L102.5,112 L110,112 L104,117 L106,124 L100,120 L94,124 L96,117 L90,112 L97.5,112 Z' fill='#FFD700'/>`}],mouths:[{id:"hm",label:"Heart",svg:`<path d='M100,150 C100,141 87,133 87,142 C87,151 100,160 100,160 C100,160 113,151 113,142 C113,133 100,141 100,150 Z' fill='#FF69B4'/>`},{id:"smile",label:"Sweet Smile",svg:`<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>`},{id:"wide",label:"Big Smile",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`}]},
    {id:"space",label:"Space",emoji:"🚀",bg:"#000820",accent:"#4488ff",eyes:[{id:"alien",label:"Alien",svg:`<ellipse cx='78' cy='90' rx='18' ry='13' fill='#00cc55'/><ellipse cx='78' cy='88' rx='7' ry='5' fill='#001a00'/><circle cx='80' cy='87' r='2' fill='white' opacity='0.6'/><ellipse cx='122' cy='90' rx='18' ry='13' fill='#00cc55'/><ellipse cx='122' cy='88' rx='7' ry='5' fill='#001a00'/><circle cx='124' cy='87' r='2' fill='white' opacity='0.6'/>`},{id:"moon",label:"Moon",svg:`<path d='M67,78 A14,14 0 1,1 67,102 A10,10 0 1,0 67,78 Z' fill='#FFD700'/><path d='M111,78 A14,14 0 1,1 111,102 A10,10 0 1,0 111,78 Z' fill='#FFD700'/>`},{id:"star",label:"Stars",svg:`<path d='M78,76 L81,86 L92,83 L84,91 L88,102 L78,96 L68,102 L72,91 L64,83 L75,86 Z' fill='#FFD700'/><path d='M122,76 L125,86 L136,83 L128,91 L132,102 L122,96 L112,102 L116,91 L108,83 L119,86 Z' fill='#FFD700'/>`}],noses:[{id:"star",label:"Star",svg:`<path d='M100,105 L102.5,112 L110,112 L104,117 L106,124 L100,120 L94,124 L96,117 L90,112 L97.5,112 Z' fill='#FFD700'/>`},{id:"dot",label:"Dot",svg:`<circle cx='100' cy='113' r='8' fill='#1a0800'/>`}],mouths:[{id:"o",label:"Surprised",svg:`<ellipse cx='100' cy='142' rx='17' ry='13' fill='#1a0800'/>`},{id:"smile",label:"Cool Smile",svg:`<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>`},{id:"zig",label:"Zigzag",svg:`<polyline points='70,138 80,128 90,138 100,128 110,138 120,128 130,138' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>`}]},
    {id:"silly",label:"Silly",emoji:"🤪",bg:"#fffde0",accent:"#ffcc00",eyes:[{id:"x",label:"X Eyes",svg:`<line x1='66' y1='80' x2='90' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/><line x1='90' y1='80' x2='66' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/><line x1='110' y1='80' x2='134' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/><line x1='134' y1='80' x2='110' y2='100' stroke='#1a0800' stroke-width='6' stroke-linecap='round'/>`},{id:"dot",label:"Dots",svg:`<circle cx='78' cy='90' r='10' fill='#1a0800'/><circle cx='122' cy='90' r='10' fill='#1a0800'/><circle cx='75' cy='87' r='3' fill='white' opacity='0.55'/><circle cx='119' cy='87' r='3' fill='white' opacity='0.55'/>`},{id:"star",label:"Stars",svg:`<path d='M78,76 L81,86 L92,83 L84,91 L88,102 L78,96 L68,102 L72,91 L64,83 L75,86 Z' fill='#FFD700'/><path d='M122,76 L125,86 L136,83 L128,91 L132,102 L122,96 L112,102 L116,91 L108,83 L119,86 Z' fill='#FFD700'/>`}],noses:[{id:"dot",label:"Big Dot",svg:`<circle cx='100' cy='113' r='8' fill='#1a0800'/>`},{id:"heart",label:"Heart",svg:`<path d='M100,120 C100,113 91,107 91,114 C91,121 100,128 100,128 C100,128 109,121 109,114 C109,107 100,113 100,120 Z' fill='#FF69B4'/>`}],mouths:[{id:"o",label:"O Face",svg:`<ellipse cx='100' cy='142' rx='17' ry='13' fill='#1a0800'/>`},{id:"zig",label:"Zigzag",svg:`<polyline points='70,138 80,128 90,138 100,128 110,138 120,128 130,138' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round' stroke-linejoin='round'/>`},{id:"buck",label:"Buck Teeth",svg:`<path d='M76,130 Q100,150 124,130 L122,130 Q100,144 78,130 Z' fill='#1a0800'/><rect x='90' y='130' width='9' height='13' fill='white' rx='2'/><rect x='101' y='130' width='9' height='13' fill='white' rx='2'/>`}]},
    {id:"monster",label:"Monster",emoji:"🧟",bg:"#0a1a0a",accent:"#22aa44",eyes:[{id:"angry",label:"Angry",svg:`<path d='M64,84 L92,92' stroke='#1a0800' stroke-width='7' stroke-linecap='round'/><path d='M64,92 L92,84' stroke='#1a0800' stroke-width='4' stroke-linecap='round' opacity='0.4'/><path d='M108,84 L136,92' stroke='#1a0800' stroke-width='7' stroke-linecap='round'/><path d='M108,92 L136,84' stroke='#1a0800' stroke-width='4' stroke-linecap='round' opacity='0.4'/>`},{id:"tri",label:"Triangle",svg:`<polygon points='65,78 91,78 78,97' fill='#1a0800'/><polygon points='109,78 135,78 122,97' fill='#1a0800'/>`},{id:"dia",label:"Diamond",svg:`<polygon points='78,77 93,90 78,103 63,90' fill='#1a0800'/><polygon points='122,77 137,90 122,103 107,90' fill='#1a0800'/>`}],noses:[{id:"tri",label:"Triangle",svg:`<polygon points='96,106 104,106 100,120' fill='#1a0800'/>`},{id:"dia",label:"Diamond",svg:`<polygon points='100,105 108,113 100,121 92,113' fill='#1a0800'/>`}],mouths:[{id:"jag",label:"Jagged",svg:`<path d='M70,128 L80,142 L90,128 L100,142 L110,128 L120,142 L130,128 L130,142 L70,142 Z' fill='#1a0800'/>`},{id:"grin",label:"Big Grin",svg:`<path d='M70,130 Q100,160 130,130 L127,130 Q100,152 73,130 Z' fill='#1a0800'/><rect x='84' y='130' width='7' height='9' fill='white' rx='1'/><rect x='96' y='130' width='8' height='9' fill='white' rx='1'/><rect x='109' y='130' width='7' height='9' fill='white' rx='1'/>`},{id:"wide",label:"Wide",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`}]},
    {id:"rainbow",label:"Rainbow",emoji:"🌈",bg:"#fff8f0",accent:"#ff8800",eyes:[{id:"round",label:"Round",svg:`<circle cx='78' cy='90' r='12' fill='#1a0800'/><circle cx='122' cy='90' r='12' fill='#1a0800'/><circle cx='74' cy='86' r='4' fill='white' opacity='0.5'/><circle cx='118' cy='86' r='4' fill='white' opacity='0.5'/>`},{id:"dot",label:"Dots",svg:`<circle cx='78' cy='90' r='10' fill='#1a0800'/><circle cx='122' cy='90' r='10' fill='#1a0800'/><circle cx='75' cy='87' r='3' fill='white' opacity='0.55'/><circle cx='119' cy='87' r='3' fill='white' opacity='0.55'/>`},{id:"heart",label:"Hearts",svg:`<path d='M78,96 C78,88 65,81 65,91 C65,101 78,109 78,109 C78,109 91,101 91,91 C91,81 78,88 78,96 Z' fill='#FF69B4'/><path d='M122,96 C122,88 109,81 109,91 C109,101 122,109 122,109 C122,109 135,101 135,91 C135,81 122,88 122,96 Z' fill='#FF69B4'/>`}],noses:[{id:"dot",label:"Round",svg:`<circle cx='100' cy='113' r='8' fill='#1a0800'/>`},{id:"star",label:"Star",svg:`<path d='M100,105 L102.5,112 L110,112 L104,117 L106,124 L100,120 L94,124 L96,117 L90,112 L97.5,112 Z' fill='#FFD700'/>`}],mouths:[{id:"smile",label:"Happy Smile",svg:`<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>`},{id:"wide",label:"Big Smile",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`},{id:"grin",label:"Toothy Grin",svg:`<path d='M70,130 Q100,160 130,130 L127,130 Q100,152 73,130 Z' fill='#1a0800'/><rect x='84' y='130' width='7' height='9' fill='white' rx='1'/><rect x='96' y='130' width='8' height='9' fill='white' rx='1'/><rect x='109' y='130' width='7' height='9' fill='white' rx='1'/>`}]},
    {id:"unicorn",label:"Unicorn",emoji:"🦄",bg:"#f8f0ff",accent:"#cc44ff",eyes:[{id:"heart",label:"Hearts",svg:`<path d='M78,96 C78,88 65,81 65,91 C65,101 78,109 78,109 C78,109 91,101 91,91 C91,81 78,88 78,96 Z' fill='#FF69B4'/><path d='M122,96 C122,88 109,81 109,91 C109,101 122,109 122,109 C122,109 135,101 135,91 C135,81 122,88 122,96 Z' fill='#FF69B4'/>`},{id:"star",label:"Stars",svg:`<path d='M78,76 L81,86 L92,83 L84,91 L88,102 L78,96 L68,102 L72,91 L64,83 L75,86 Z' fill='#FFD700'/><path d='M122,76 L125,86 L136,83 L128,91 L132,102 L122,96 L112,102 L116,91 L108,83 L119,86 Z' fill='#FFD700'/>`},{id:"moon",label:"Moons",svg:`<path d='M67,78 A14,14 0 1,1 67,102 A10,10 0 1,0 67,78 Z' fill='#FFD700'/><path d='M111,78 A14,14 0 1,1 111,102 A10,10 0 1,0 111,78 Z' fill='#FFD700'/>`}],noses:[{id:"heart",label:"Heart",svg:`<path d='M100,120 C100,113 91,107 91,114 C91,121 100,128 100,128 C100,128 109,121 109,114 C109,107 100,113 100,120 Z' fill='#FF69B4'/>`},{id:"star",label:"Star",svg:`<path d='M100,105 L102.5,112 L110,112 L104,117 L106,124 L100,120 L94,124 L96,117 L90,112 L97.5,112 Z' fill='#FFD700'/>`}],mouths:[{id:"hm",label:"Heart Mouth",svg:`<path d='M100,150 C100,141 87,133 87,142 C87,151 100,160 100,160 C100,160 113,151 113,142 C113,133 100,141 100,150 Z' fill='#FF69B4'/>`},{id:"smile",label:"Cute Smile",svg:`<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>`},{id:"wide",label:"Big Smile",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`}]},
    {id:"hero",label:"Hero",emoji:"🦸",bg:"#1a0a00",accent:"#ff2200",eyes:[{id:"angry",label:"Determined",svg:`<path d='M64,84 L92,92' stroke='#1a0800' stroke-width='7' stroke-linecap='round'/><path d='M64,92 L92,84' stroke='#1a0800' stroke-width='4' stroke-linecap='round' opacity='0.4'/><path d='M108,84 L136,92' stroke='#1a0800' stroke-width='7' stroke-linecap='round'/><path d='M108,92 L136,84' stroke='#1a0800' stroke-width='4' stroke-linecap='round' opacity='0.4'/>`},{id:"bolt",label:"Lightning",svg:`<polygon points='72,76 79,90 74,90 81,104 67,90 73,90' fill='#FFD700'/><polygon points='116,76 123,90 118,90 125,104 111,90 117,90' fill='#FFD700'/>`},{id:"round",label:"Focused",svg:`<circle cx='78' cy='90' r='12' fill='#1a0800'/><circle cx='122' cy='90' r='12' fill='#1a0800'/><circle cx='74' cy='86' r='4' fill='white' opacity='0.5'/><circle cx='118' cy='86' r='4' fill='white' opacity='0.5'/>`}],noses:[{id:"dia",label:"Diamond",svg:`<polygon points='100,105 108,113 100,121 92,113' fill='#1a0800'/>`},{id:"tri",label:"Triangle",svg:`<polygon points='96,106 104,106 100,120' fill='#1a0800'/>`}],mouths:[{id:"grin",label:"Hero Grin",svg:`<path d='M70,130 Q100,160 130,130 L127,130 Q100,152 73,130 Z' fill='#1a0800'/><rect x='84' y='130' width='7' height='9' fill='white' rx='1'/><rect x='96' y='130' width='8' height='9' fill='white' rx='1'/><rect x='109' y='130' width='7' height='9' fill='white' rx='1'/>`},{id:"smirk",label:"Smirk",svg:`<path d='M78,136 Q100,154 126,132' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/><path d='M118,132 Q130,134 128,142' stroke='#1a0800' stroke-width='3' fill='none' stroke-linecap='round'/>`},{id:"wide",label:"Strong Jaw",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`}]},
    {id:"harvest",label:"Harvest",emoji:"🍂",bg:"#fff4e0",accent:"#cc7700",eyes:[{id:"round",label:"Friendly",svg:`<circle cx='78' cy='90' r='12' fill='#1a0800'/><circle cx='122' cy='90' r='12' fill='#1a0800'/><circle cx='74' cy='86' r='4' fill='white' opacity='0.5'/><circle cx='118' cy='86' r='4' fill='white' opacity='0.5'/>`},{id:"tri",label:"Classic",svg:`<polygon points='65,78 91,78 78,97' fill='#1a0800'/><polygon points='109,78 135,78 122,97' fill='#1a0800'/>`},{id:"moon",label:"Moons",svg:`<path d='M67,78 A14,14 0 1,1 67,102 A10,10 0 1,0 67,78 Z' fill='#FFD700'/><path d='M111,78 A14,14 0 1,1 111,102 A10,10 0 1,0 111,78 Z' fill='#FFD700'/>`}],noses:[{id:"dot",label:"Round",svg:`<circle cx='100' cy='113' r='8' fill='#1a0800'/>`},{id:"tri",label:"Triangle",svg:`<polygon points='96,106 104,106 100,120' fill='#1a0800'/>`}],mouths:[{id:"smile",label:"Happy Smile",svg:`<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>`},{id:"wide",label:"Big Grin",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`},{id:"jag",label:"Carved",svg:`<path d='M70,128 L80,142 L90,128 L100,142 L110,128 L120,142 L130,128 L130,142 L70,142 Z' fill='#1a0800'/>`}]},
    {id:"ocean",label:"Ocean",emoji:"🌊",bg:"#f0f8ff",accent:"#0088cc",eyes:[{id:"alien",label:"Wave Eyes",svg:`<ellipse cx='78' cy='90' rx='18' ry='13' fill='#00cc55'/><ellipse cx='78' cy='88' rx='7' ry='5' fill='#001a00'/><circle cx='80' cy='87' r='2' fill='white' opacity='0.6'/><ellipse cx='122' cy='90' rx='18' ry='13' fill='#00cc55'/><ellipse cx='122' cy='88' rx='7' ry='5' fill='#001a00'/><circle cx='124' cy='87' r='2' fill='white' opacity='0.6'/>`},{id:"round",label:"Bubble Eyes",svg:`<circle cx='78' cy='90' r='12' fill='#1a0800'/><circle cx='122' cy='90' r='12' fill='#1a0800'/><circle cx='74' cy='86' r='4' fill='white' opacity='0.5'/><circle cx='118' cy='86' r='4' fill='white' opacity='0.5'/>`},{id:"moon",label:"Crescent",svg:`<path d='M67,78 A14,14 0 1,1 67,102 A10,10 0 1,0 67,78 Z' fill='#FFD700'/><path d='M111,78 A14,14 0 1,1 111,102 A10,10 0 1,0 111,78 Z' fill='#FFD700'/>`}],noses:[{id:"dot",label:"Bubble Nose",svg:`<circle cx='100' cy='113' r='8' fill='#1a0800'/>`},{id:"heart",label:"Heart",svg:`<path d='M100,120 C100,113 91,107 91,114 C91,121 100,128 100,128 C100,128 109,121 109,114 C109,107 100,113 100,120 Z' fill='#FF69B4'/>`}],mouths:[{id:"smile",label:"Gentle Smile",svg:`<path d='M74,134 Q100,156 126,134' stroke='#1a0800' stroke-width='5' fill='none' stroke-linecap='round'/>`},{id:"o",label:"Bubble O",svg:`<ellipse cx='100' cy='142' rx='17' ry='13' fill='#1a0800'/>`},{id:"wide",label:"Splash Grin",svg:`<path d='M66,130 Q100,162 134,130' stroke='#1a0800' stroke-width='6' fill='none' stroke-linecap='round'/>`}]},
  ];

  const [pumpkinIdx, setPumpkinIdx] = useState(0);
  const [themeIdx,   setThemeIdx]   = useState(0);
  const [faceTab,    setFaceTab]    = useState<'eyes'|'nose'|'mouth'>('eyes');
  const [selEye,     setSelEye]     = useState<string|null>(null);
  const [selNose,    setSelNose]    = useState<string|null>(null);
  const [selMouth,   setSelMouth]   = useState<string|null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => { setSelEye(null); setSelNose(null); setSelMouth(null); }, [themeIdx]);

  const pump  = PUMPKINS[pumpkinIdx];
  const theme = THEMES[themeIdx];
  const ac    = accentColor;

  const faceHtml = [
    selEye   ? (theme.eyes.find(e => e.id === selEye)?.svg   ?? '') : '',
    selNose  ? (theme.noses.find(e => e.id === selNose)?.svg  ?? '') : '',
    selMouth ? (theme.mouths.find(e => e.id === selMouth)?.svg ?? '') : '',
  ].join('');

  const tabParts = faceTab === 'eyes' ? theme.eyes : faceTab === 'nose' ? theme.noses : theme.mouths;
  const tabSel   = faceTab === 'eyes' ? selEye : faceTab === 'nose' ? selNose : selMouth;
  const tabSet   = faceTab === 'eyes' ? setSelEye : faceTab === 'nose' ? setSelNose : setSelMouth;

  const renderCanvas = (size: number) => (
    <div style={{position:'relative', width:size, height:size*1.05, flexShrink:0}}>
      <svg viewBox='0 0 200 200' width={size} height={size} style={{display:'block',overflow:'visible'}}>
        <g dangerouslySetInnerHTML={{__html: pump.body}}/>
        {faceHtml && <g dangerouslySetInnerHTML={{__html: faceHtml}}/>}
      </svg>
    </div>
  );

  const inner = (
    <div style={{display:'flex',flexDirection:'column',gap:16}}>

      {/* Title */}
      <div style={{textAlign:'center',fontFamily:hf,fontSize:'clamp(15px,2.3vw,18px)',color:ac}}>
        🎃 Pumpkin Studio — Build Your Face!
      </div>

      {/* Pumpkin type picker */}
      <div>
        <p style={{fontFamily:hf,fontSize:12,color:'#888',margin:'0 0 6px 0',textAlign:'center'}}>Choose Your Pumpkin</p>
        <div style={{display:'flex',gap:6,overflowX:'auto',paddingBottom:4}}>
          {PUMPKINS.map((p,i) => (
            <button key={p.id} onClick={() => setPumpkinIdx(i)}
              style={{flexShrink:0,padding:'6px 10px',borderRadius:12,border:`2px solid ${i===pumpkinIdx?ac:'#ddd'}`,
                background:i===pumpkinIdx?`${ac}18`:'#fff',fontFamily:bf,fontSize:11,fontWeight:700,
                color:i===pumpkinIdx?ac:'#555',cursor:'pointer',whiteSpace:'nowrap'}}>
              {p.emoji} {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main area: pumpkin + face picker side by side */}
      <div style={{display:'flex',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}>

        {/* Pumpkin canvas */}
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,flex:'0 0 auto'}}>
          {renderCanvas(200)}
          <button onClick={() => setFullscreen(true)}
            style={{padding:'6px 16px',borderRadius:20,border:`1px solid ${ac}`,background:'#fff',
              color:ac,fontFamily:bf,fontSize:12,fontWeight:700,cursor:'pointer'}}>
            ⛶ Expand
          </button>
        </div>

        {/* Face builder panel */}
        <div style={{flex:1,minWidth:200,display:'flex',flexDirection:'column',gap:10}}>

          {/* Theme picker */}
          <div>
            <p style={{fontFamily:hf,fontSize:12,color:'#888',margin:'0 0 6px 0'}}>Choose Theme</p>
            <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
              {THEMES.map((t,i) => (
                <button key={t.id} onClick={() => setThemeIdx(i)}
                  style={{padding:'5px 10px',borderRadius:20,border:`2px solid ${i===themeIdx?t.accent:'#ddd'}`,
                    background:i===themeIdx?t.bg:'#fff',fontFamily:bf,fontSize:11,fontWeight:700,
                    color:i===themeIdx?t.accent:'#555',cursor:'pointer'}}>
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Face part tabs */}
          <div style={{background:theme.bg,borderRadius:16,padding:12,border:`2px solid ${theme.accent}44`}}>
            <div style={{display:'flex',gap:6,marginBottom:10}}>
              {(['eyes','nose','mouth'] as const).map(tab => (
                <button key={tab} onClick={() => setFaceTab(tab)}
                  style={{flex:1,padding:'7px 4px',borderRadius:10,border:`2px solid ${faceTab===tab?theme.accent:'#ddd'}`,
                    background:faceTab===tab?theme.accent:'#fff',color:faceTab===tab?'#fff':'#666',
                    fontFamily:hf,fontSize:12,fontWeight:700,cursor:'pointer',textTransform:'capitalize',
                    transition:'all 0.15s'}}>
                  {tab==='eyes'?'👁 Eyes':tab==='nose'?'👃 Nose':'👄 Mouth'}
                </button>
              ))}
            </div>

            {/* Face part thumbnails */}
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {tabParts.map(part => {
                const isSel = tabSel === part.id;
                return (
                  <button key={part.id} onClick={() => tabSet(isSel ? null : part.id)}
                    style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,
                      padding:'8px 6px',borderRadius:12,border:`2px solid ${isSel?theme.accent:'#ddd'}`,
                      background:isSel?`${theme.accent}22`:'#fff',cursor:'pointer',
                      boxShadow:isSel?`0 2px 8px ${theme.accent}55`:'none',transition:'all 0.15s'}}>
                    <svg viewBox='0 0 200 200' width={56} height={56} style={{display:'block'}}>
                      <rect width='200' height='200' fill='#ff8c0022' rx='20'/>
                      <g dangerouslySetInnerHTML={{__html: part.svg}}/>
                    </svg>
                    <span style={{fontFamily:bf,fontSize:10,color:isSel?theme.accent:'#666',fontWeight:700}}>
                      {part.label}
                    </span>
                  </button>
                );
              })}
              <button onClick={() => tabSet(null)}
                style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,
                  padding:'8px 6px',borderRadius:12,border:'2px dashed #ccc',
                  background:tabSel===null?'#f0f0f0':'#fff',cursor:'pointer'}}>
                <div style={{width:56,height:56,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>✕</div>
                <span style={{fontFamily:bf,fontSize:10,color:'#888',fontWeight:700}}>None</span>
              </button>
            </div>
          </div>

          {/* Reset button */}
          <button onClick={() => { setSelEye(null); setSelNose(null); setSelMouth(null); }}
            style={{alignSelf:'flex-start',padding:'8px 18px',borderRadius:20,border:'2px solid #ddd',
              background:'#fff',color:'#888',fontFamily:bf,fontSize:12,fontWeight:700,cursor:'pointer'}}>
            🔄 Clear Face
          </button>
        </div>
      </div>
    </div>
  );

  if (fullscreen) return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:9999,
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,padding:20}}>
      {renderCanvas(Math.min(window.innerWidth - 40, 400))}
      <button onClick={() => setFullscreen(false)}
        style={{padding:'12px 32px',borderRadius:30,background:ac,color:'#fff',border:'none',
          fontSize:16,fontWeight:700,fontFamily:hf,cursor:'pointer'}}>
        ✕ Close
      </button>
    </div>
  );

  return inner;
}

function ODBtnShape({ style, color, size, cx, cy }: { style:string; color:string; size:number; cx:number; cy:number }) {
  const s = size, h = color, d = "#00000030";
  if (style === "square")  return <><rect x={cx-s*0.5} y={cy-s*0.5} width={s} height={s} rx={s*0.15} fill={h}/><rect x={cx-s*0.5} y={cy-s*0.5} width={s} height={s} rx={s*0.15} fill="none" stroke={d} strokeWidth={1.5}/><circle cx={cx-s*0.2} cy={cy-s*0.2} r={s*0.12} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx+s*0.2} cy={cy-s*0.2} r={s*0.12} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx-s*0.2} cy={cy+s*0.2} r={s*0.12} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx+s*0.2} cy={cy+s*0.2} r={s*0.12} fill="none" stroke={d} strokeWidth={1}/></>;
  if (style === "star")    return <><polygon points={starD(s*0.5, s*0.22, 5).replace(/M/,"").replace(/ L/g,",").replace(" Z","")} transform={`translate(${cx},${cy})`} fill={h}/><polygon points={starD(s*0.5, s*0.22, 5).replace(/M/,"").replace(/ L/g,",").replace(" Z","")} transform={`translate(${cx},${cy})`} fill="none" stroke={d} strokeWidth={1}/></>;
  if (style === "heart")   return <><path d={`M${cx},${cy+s*0.35} C${cx-s*0.65},${cy} ${cx-s*0.65},${cy-s*0.45} ${cx-s*0.32},${cy-s*0.45} C${cx-s*0.1},${cy-s*0.45} ${cx},${cy-s*0.2} ${cx},${cy-s*0.2} C${cx},${cy-s*0.2} ${cx+s*0.1},${cy-s*0.45} ${cx+s*0.32},${cy-s*0.45} C${cx+s*0.65},${cy-s*0.45} ${cx+s*0.65},${cy} ${cx},${cy+s*0.35} Z`} fill={h}/></>;
  if (style === "flower")  return <>{[0,60,120,180,240,300].map(a=><ellipse key={a} cx={cx+Math.cos(a*Math.PI/180)*s*0.3} cy={cy+Math.sin(a*Math.PI/180)*s*0.3} rx={s*0.25} ry={s*0.18} transform={`rotate(${a},${cx+Math.cos(a*Math.PI/180)*s*0.3},${cy+Math.sin(a*Math.PI/180)*s*0.3})`} fill={h}/>)}<circle cx={cx} cy={cy} r={s*0.22} fill="#FFD700"/></>;
  if (style === "bolt")    return <><polygon points={`${cx+s*0.1},${cy-s*0.5} ${cx-s*0.15},${cy} ${cx+s*0.05},${cy} ${cx-s*0.1},${cy+s*0.5} ${cx+s*0.2},${cy-s*0.05} ${cx+s*0.05},${cy-s*0.05}`} fill={h}/></>;
  if (style === "smiley")  return <><circle cx={cx} cy={cy} r={s*0.5} fill={h}/><circle cx={cx-s*0.16} cy={cy-s*0.1} r={s*0.09} fill="#00000060"/><circle cx={cx+s*0.16} cy={cy-s*0.1} r={s*0.09} fill="#00000060"/><path d={`M${cx-s*0.22},${cy+s*0.08} Q${cx},${cy+s*0.3} ${cx+s*0.22},${cy+s*0.08}`} stroke="#00000060" strokeWidth={s*0.06} fill="none" strokeLinecap="round"/></>;
  // round (default)
  return <><circle cx={cx} cy={cy} r={s*0.5} fill={h}/><circle cx={cx} cy={cy} r={s*0.5} fill="none" stroke={d} strokeWidth={1.5}/><circle cx={cx-s*0.14} cy={cy-s*0.14} r={s*0.1} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx+s*0.14} cy={cy-s*0.14} r={s*0.1} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx-s*0.14} cy={cy+s*0.14} r={s*0.1} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx+s*0.14} cy={cy+s*0.14} r={s*0.1} fill="none" stroke={d} strokeWidth={1}/><circle cx={cx} cy={cy} r={s*0.15} fill="rgba(255,255,255,0.4)"/></>;
}

function OutfitDesigner({ accentColor }: { accentColor: string }) {
  interface PlacedBtn { id:string; x:number; y:number; style:string; color:string; size:number }
  const OUTFITS = ["👕 T-Shirt","👗 Dress","🧥 Jacket","👖 Overalls"];
  const COLORS  = ["#E55","#E85","#EE5","#5C5","#5BE","#55E","#E5A","#FFF","#888","#222"];
  const BSTYLES = ["round","square","star","heart","flower","bolt","smiley"];
  const BCOLORS = ["#E53535","#FF8C00","#FFD700","#28C840","#007AFF","#AF52DE","#FF2D55","#FFFFFF","#888888","#1A1A2E"];
  const BSIZES  = [12,17,22];

  const [outfitIdx, setOutfitIdx] = useState(0);
  const [outfitColor, setOutfitColor] = useState("#3A5FA8");
  const [bStyle,  setBStyle]  = useState("round");
  const [bColor,  setBColor]  = useState("#FFD700");
  const [bSize,   setBSize]   = useState(17);
  const [placed,  setPlaced]  = useState<PlacedBtn[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  const bf = "var(--font-catamaran),'Catamaran',sans-serif";
  const hf = "var(--font-concert-one),'Concert One',cursive";

  const OUTFIT_PATHS = [
    // T-shirt
    "M60,40 L30,60 L40,110 L70,110 L70,160 L130,160 L130,110 L160,110 L170,60 L140,40 L120,30 Q100,20 80,30 Z",
    // Dress
    "M70,30 Q100,18 130,30 L145,80 Q160,100 165,160 L35,160 Q40,100 55,80 Z",
    // Jacket
    "M55,40 L25,65 L35,115 L70,110 L70,160 L130,160 L130,110 L165,115 L175,65 L145,40 L125,30 L115,50 L100,55 L85,50 L75,30 Z",
    // Overalls
    "M65,20 L65,50 L45,50 L35,60 L35,160 L165,160 L165,60 L155,50 L135,50 L135,20 L115,20 L115,40 L85,40 L85,20 Z",
  ];

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (placed.length >= 50) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const vw = 200, vh = 200;
    const x = ((e.clientX - rect.left) / rect.width) * vw;
    const y = ((e.clientY - rect.top) / rect.height) * vh;
    setPlaced(p => [...p, { id: Math.random().toString(36).slice(2), x, y, style: bStyle, color: bColor, size: bSize }]);
  };

  const removeBtn = (id: string) => setPlaced(p => p.filter(b => b.id !== id));

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
      {/* SVG Canvas */}
      <div style={{ flex: "0 0 auto" }}>
        <svg ref={svgRef} viewBox="0 0 200 200" onClick={handleSvgClick}
          style={{ width: "clamp(180px,40vw,260px)", height: "clamp(180px,40vw,260px)", cursor: "crosshair", borderRadius: 16, background: "#F8F8FF", border: `2px solid ${accentColor}44` }}>
          <defs>
            <pattern id="fabricPat" patternUnits="userSpaceOnUse" width={6} height={6}>
              <rect width={6} height={6} fill={outfitColor}/>
              <line x1={0} y1={3} x2={6} y2={3} stroke="rgba(255,255,255,0.15)" strokeWidth={1}/>
            </pattern>
          </defs>
          <path d={OUTFIT_PATHS[outfitIdx]} fill="url(#fabricPat)" stroke={outfitColor} strokeWidth={2}/>
          <path d={OUTFIT_PATHS[outfitIdx]} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={1.5}/>
          {placed.map(btn => (
            <g key={btn.id} onClick={e => { e.stopPropagation(); removeBtn(btn.id); }} style={{ cursor: "pointer" }}>
              <ODBtnShape style={btn.style} color={btn.color} size={btn.size} cx={btn.x} cy={btn.y}/>
            </g>
          ))}
        </svg>
      </div>

      {/* Controls */}
      <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <p style={{ fontFamily: hf, fontSize: 12, color: accentColor, margin: "0 0 6px", textTransform: "uppercase" }}>Outfit</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {OUTFITS.map((o, i) => (
              <button key={i} onClick={() => { setOutfitIdx(i); setPlaced([]); }}
                style={{ padding: "6px 10px", borderRadius: 50, border: `2px solid ${i===outfitIdx?accentColor:"#ddd"}`, background: i===outfitIdx?accentColor:"#fff", color: i===outfitIdx?"#fff":"#444", fontWeight: 700, fontSize: 11, fontFamily: bf, cursor: "pointer" }}>
                {o}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: hf, fontSize: 12, color: accentColor, margin: "0 0 6px", textTransform: "uppercase" }}>Outfit Color</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {COLORS.map(c => (
              <div key={c} onClick={() => setOutfitColor(c)}
                style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: `2px solid ${c===outfitColor?accentColor:"#ccc"}`, cursor: "pointer", transition: "transform 0.1s", transform: c===outfitColor?"scale(1.2)":"scale(1)" }}/>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: hf, fontSize: 12, color: accentColor, margin: "0 0 6px", textTransform: "uppercase" }}>Button Style</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {BSTYLES.map(st => (
              <button key={st} onClick={() => setBStyle(st)}
                style={{ padding: "6px 10px", borderRadius: 50, border: `2px solid ${st===bStyle?accentColor:"#ddd"}`, background: st===bStyle?accentColor:"#fff", color: st===bStyle?"#fff":"#444", fontWeight: 700, fontSize: 11, fontFamily: bf, cursor: "pointer", textTransform: "capitalize" }}>
                {st}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: hf, fontSize: 12, color: accentColor, margin: "0 0 6px", textTransform: "uppercase" }}>Button Color</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {BCOLORS.map(c => (
              <div key={c} onClick={() => setBColor(c)}
                style={{ width: 24, height: 24, borderRadius: "50%", background: c, border: `2px solid ${c===bColor?accentColor:"#ccc"}`, cursor: "pointer", transform: c===bColor?"scale(1.2)":"scale(1)", transition: "transform 0.1s" }}/>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: hf, fontSize: 12, color: accentColor, margin: "0 0 6px", textTransform: "uppercase" }}>Size</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[["S",12],["M",17],["L",22]].map(([l,v]) => (
              <button key={l} onClick={() => setBSize(Number(v))}
                style={{ width: 36, height: 36, borderRadius: "50%", border: `2px solid ${Number(v)===bSize?accentColor:"#ddd"}`, background: Number(v)===bSize?accentColor:"#fff", color: Number(v)===bSize?"#fff":"#444", fontWeight: 700, fontSize: 13, fontFamily: bf, cursor: "pointer" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        {placed.length > 0 && (
          <button onClick={() => setPlaced([])}
            style={{ padding: "6px 14px", borderRadius: 50, border: "2px solid #FF3B30", background: "#fff", color: "#FF3B30", fontWeight: 700, fontSize: 12, fontFamily: bf, cursor: "pointer", alignSelf: "flex-start" }}>
            🗑 Clear All
          </button>
        )}
        <p style={{ fontSize: 11, color: "#999", fontFamily: bf, margin: 0 }}>Click outfit to place buttons · Click a button to remove it</p>
      </div>
    </div>
  );
}


function PumpkinQuiz({ accentColor, textLight }: { accentColor: string; textLight?: boolean }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const qs = ["Smooth & perfect", "A little wobbly but shiny", "Totally lumpy but loveable"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 16, color: textLight ? "rgba(255,255,255,0.9)" : "#3e1a00", fontWeight: 600 }}>Which pumpkin are you? 🎃</p>
      {answer === null ? (
        qs.map((q, i) => (
          <button
            key={i}
            onClick={() => setAnswer(i)}
            style={{
              padding: "12px 20px",
              borderRadius: 12,
              border: `2px solid ${accentColor}`,
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#3e1a00",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              textAlign: "left",
              transition: "background-color 0.2s",
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            {q}
          </button>
        ))
      ) : (
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 16,
            background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
            border: `2px solid ${accentColor}`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48 }}>{PUMPKIN_RESULTS[answer].emoji}</div>
          <p style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: 22, color: "#3e1a00", marginBottom: 8 }}>
            You&apos;re {PUMPKIN_RESULTS[answer].label}!
          </p>
          <p style={{ fontSize: 15, color: "#6a3a10", lineHeight: 1.5 }}>{PUMPKIN_RESULTS[answer].desc}</p>
          <button
            onClick={() => setAnswer(null)}
            style={{
              marginTop: 12,
              padding: "8px 20px",
              borderRadius: 50,
              backgroundColor: accentColor,
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Try again 🎃
          </button>
        </div>
      )}
    </div>
  );
}

function ShutInButtonActivity({ accentColor, textLight }: { accentColor: string; textLight?: boolean }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const getResult = () => {
    if (!input.trim()) return;
    const responses = [
      `A button that does "${input}" would be the most popular button in history. Absolutely legendary.`,
      `"${input}"?! Oh wow. That button would never need to pop off. It would be too busy being amazing.`,
      `If "${input}" were a button, kids everywhere would push it 47 times a day. Possibly 48.`,
    ];
    setResult(responses[Math.floor(Math.random() * responses.length)]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 16, color: textLight ? "rgba(255,255,255,0.9)" : "#0a2d61" }}>
        If you had a magical button, what would it do? 👆
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getResult()}
          placeholder="My button would..."
          style={{
            flex: "1 1 200px",
            padding: "10px 16px",
            borderRadius: 12,
            border: `2px solid ${accentColor}`,
            fontSize: 15,
            outline: "none",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
          }}
        />
        <button
          onClick={getResult}
          disabled={!input.trim()}
          style={{
            padding: "10px 20px",
            borderRadius: 12,
            backgroundColor: input.trim() ? accentColor : "#ccc",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            border: "none",
            cursor: input.trim() ? "pointer" : "not-allowed",
            fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
          }}
        >
          Push it! 👆
        </button>
      </div>
      {result && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}33)`,
            border: `2px solid ${accentColor}`,
            fontSize: 15,
            color: "#0a2d61",
            lineHeight: 1.5,
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}

// ── Doodle-Do: Rhyme Game data ───────────────────────────────────────────────
interface RhymeItem { w:string; e:string; r:string; d:[string,string,string] }
const RHYME_SETS: RhymeItem[] = [
  {w:"cat",  e:"🐱",r:"hat",   d:["dog","bird","tree"]},  {w:"bat",  e:"🦇",r:"mat",   d:["cup","fish","star"]},
  {w:"rat",  e:"🐀",r:"flat",  d:["bus","moon","shoe"]},  {w:"dog",  e:"🐶",r:"log",   d:["cat","bird","fish"]},
  {w:"frog", e:"🐸",r:"hog",   d:["duck","hen","ant"]},   {w:"fog",  e:"🌫",r:"jog",   d:["sun","moon","sky"]},
  {w:"rock", e:"🪨",r:"sock",  d:["tree","car","ship"]},  {w:"bell", e:"🔔",r:"shell", d:["hat","tree","sun"]},
  {w:"cake", e:"🎂",r:"lake",  d:["car","dog","sun"]},    {w:"snake",e:"🐍",r:"rake",  d:["hen","bus","pot"]},
  {w:"tree", e:"🌳",r:"bee",   d:["cat","dog","hat"]},    {w:"sea",  e:"🌊",r:"tea",   d:["cat","dog","hat"]},
  {w:"night",e:"🌙",r:"light", d:["day","sun","cat"]},    {w:"kite", e:"🪁",r:"bite",  d:["hat","dog","cup"]},
  {w:"ball", e:"\u26BD",   r:"tall",  d:["cat","dog","hen"]},    {w:"wall", e:"🧱",r:"fall",  d:["car","sun","hat"]},
  {w:"ring", e:"💍",r:"sing",  d:["dog","cat","bus"]},    {w:"king", e:"👑",r:"wing",  d:["car","sun","leg"]},
  {w:"moon", e:"🌝",r:"spoon", d:["hat","car","dog"]},    {w:"mouse",e:"🐭",r:"house", d:["dog","cat","sun"]},
  {w:"car",  e:"🚗",r:"star",  d:["dog","cat","hat"]},    {w:"ship", e:"🚢",r:"drip",  d:["cat","dog","ham"]},
  {w:"top",  e:"🪀",r:"hop",   d:["cat","dog","sun"]},    {w:"mop",  e:"🧹",r:"drop",  d:["hat","car","dog"]},
  {w:"sun",  e:"\u2600\uFE0F",r:"run",  d:["cat","dog","hat"]}, {w:"hen",  e:"🐔",r:"ten",   d:["dog","cat","sun"]},
  {w:"pig",  e:"🐷",r:"big",   d:["cat","duck","hat"]},   {w:"fly",  e:"🪰",r:"sky",   d:["cat","dog","hat"]},
  {w:"duck", e:"🦆",r:"truck", d:["cat","dog","hen"]},    {w:"cow",  e:"🐄",r:"wow",   d:["cat","dog","hat"]},
  {w:"fish", e:"🐟",r:"dish",  d:["cat","dog","sun"]},    {w:"rain", e:"🌧\uFE0F",r:"train",d:["cat","dog","sun"]},
  {w:"boat", e:"\u26F5",   r:"coat",  d:["cat","dog","hat"]},    {w:"bear", e:"🐻",r:"chair", d:["cat","dog","hat"]},
  {w:"rose", e:"🌹",r:"nose",  d:["cat","dog","hat"]},    {w:"drum", e:"🥁",r:"yum",   d:["cat","dog","hat"]},
  {w:"goat", e:"🐐",r:"float", d:["cat","dog","sun"]},    {w:"fire", e:"🔥",r:"wire",  d:["cat","dog","hat"]},
  {w:"ant",  e:"🐜",r:"plant", d:["dog","cat","hat"]},    {w:"door", e:"🚪",r:"floor", d:["cat","dog","hat"]},
  {w:"bread",e:"🍞",r:"head",  d:["cat","dog","sun"]},    {w:"clown",e:"🤡",r:"crown", d:["cat","dog","hat"]},
  {w:"jet",  e:"\u2708\uFE0F",r:"wet",d:["cat","dog","hat"]},   {w:"fox",  e:"🦊",r:"box",   d:["cat","dog","hen"]},
  {w:"star", e:"\u2B50",   r:"jar",   d:["cat","duck","hat"]},   {w:"bee",  e:"🐝",r:"free",  d:["cat","dog","sun"]},
  {w:"map",  e:"🗺\uFE0F",r:"cap",d:["dog","cat","sun"]},{w:"owl",  e:"🦉",r:"howl",  d:["cat","dog","hen"]},
];

// ── Doodle-Do: Mad Lib data ───────────────────────────────────────────────────
interface MLBlank { id:string; label:string; color:string; hints:string[] }
interface MLStory  { id:string; title:string; tmpl:string; blanks:MLBlank[] }
const MAD_LIB_STORIES: MLStory[] = [
  {
    id:"farm", title:"Doodle's Big Morning",
    tmpl:"One {ADJECTIVE} morning, Doodle the rooster crowed so loud that a {ANIMAL} fell right off the {NOUN}! Everybody started to {VERB} and shout \"{SOUND}!\" It was the most {ADJECTIVE2} thing that ever happened on Doodle-Do Farm.",
    blanks:[
      {id:"ADJECTIVE", label:"Describing Word",color:"#FF9500",hints:["silly","loud","wiggly","fluffy","giant"]},
      {id:"ANIMAL",    label:"Animal",         color:"#34C759",hints:["pig","duck","cow","horse","goat"]},
      {id:"NOUN",      label:"Thing",          color:"#007AFF",hints:["fence","tractor","haystack","bucket","tree"]},
      {id:"VERB",      label:"Action Word",    color:"#FF2D55",hints:["jump","spin","wiggle","dance","honk"]},
      {id:"SOUND",     label:"Silly Sound",    color:"#AF52DE",hints:["WAAH","WOOHOO","OINK","CLUCK","BOING"]},
      {id:"ADJECTIVE2",label:"Describing Word",color:"#FF9500",hints:["funniest","craziest","loudest","smelliest","weirdest"]},
    ]
  },
  {
    id:"adventure", title:"Doodle's Big Adventure",
    tmpl:"One day, Doodle put on his {CLOTHING} and walked to {PLACE}. He met a {ADJECTIVE} {ANIMAL} who handed him a {FOOD}. It tasted like {ADJECTIVE2} {FOOD2}! Together they {VERB}ed happily all the way home.",
    blanks:[
      {id:"CLOTHING",  label:"Clothing",       color:"#007AFF",hints:["boots","hat","cape","scarf","goggles"]},
      {id:"PLACE",     label:"Silly Place",    color:"#34C759",hints:["the moon","a pizza factory","Grandma's house","the jungle","outer space"]},
      {id:"ADJECTIVE", label:"Describing Word",color:"#FF9500",hints:["wobbly","sneezy","bouncy","purple","invisible"]},
      {id:"ANIMAL",    label:"Animal",         color:"#FF2D55",hints:["elephant","penguin","flamingo","walrus","platypus"]},
      {id:"FOOD",      label:"Food",           color:"#FF6B00",hints:["pizza","banana","pickle","cupcake","spaghetti"]},
      {id:"ADJECTIVE2",label:"Describing Word",color:"#FF9500",hints:["bubbly","salty","crunchy","wobbly","sparkly"]},
      {id:"FOOD2",     label:"Another Food",   color:"#FF6B00",hints:["cotton candy","mustard","ice cream","hot sauce","cheese"]},
      {id:"VERB",      label:"Action Word",    color:"#AF52DE",hints:["skipped","floated","waddled","zoomed","bounced"]},
    ]
  },
  {
    id:"talent", title:"The Farm Talent Show",
    tmpl:"The whole farm gathered for the big talent show! Doodle had practiced his {NOUN} for {NUMBER} whole days. When he stepped on stage, he {VERB}ed so {ADJECTIVE}ly that {NUMBER2} {ANIMAL}s fainted! The judge — a very {ADJECTIVE2} {ANIMAL2} — awarded him a golden {NOUN2}. The crowd cheered \"{SOUND}!\"",
    blanks:[
      {id:"NOUN",      label:"Talent/Trick",   color:"#007AFF",hints:["juggling","yodeling","hula hooping","karate","tap dancing"]},
      {id:"NUMBER",    label:"Number",         color:"#FF2D55",hints:["3","7","12","100","1000"]},
      {id:"VERB",      label:"Action Word",    color:"#AF52DE",hints:["sang","danced","juggled","yelled","spun"]},
      {id:"ADJECTIVE", label:"Describing Word",color:"#FF9500",hints:["wiggly","loud","fast","sparkly","stinky"]},
      {id:"NUMBER2",   label:"Number",         color:"#FF2D55",hints:["2","5","17","50","all the"]},
      {id:"ANIMAL",    label:"Animal",         color:"#34C759",hints:["pigs","cows","sheep","goats","ducks"]},
      {id:"ADJECTIVE2",label:"Describing Word",color:"#FF9500",hints:["fancy","grumpy","giant","tiny","sparkly"]},
      {id:"ANIMAL2",   label:"Animal",         color:"#34C759",hints:["owl","horse","goat","dog","turkey"]},
      {id:"NOUN2",     label:"Prize",          color:"#007AFF",hints:["trophy","pizza","crown","disco ball","rubber chicken"]},
      {id:"SOUND",     label:"Cheer",          color:"#AF52DE",hints:["HOORAY","CLUCK YEAH","BAWK BAWK","WOO WOO","YAAAAS"]},
    ]
  }
];

// ── Doodle-Do: Rhyme Time game ────────────────────────────────────────────────
function DoodleRhymeGame({ accentColor }: { accentColor: string }) {
  const [deck,     setDeck]     = useState<RhymeItem[]>(() => shuffle(RHYME_SETS).slice(0,10));
  const [idx,      setIdx]      = useState(0);
  const [score,    setScore]    = useState(0);
  const [chosen,   setChosen]   = useState<string|null>(null);
  const [done,     setDone]     = useState(false);
  const [shuffled, setShuffled] = useState<string[]>(() => {
    const s = shuffle(RHYME_SETS).slice(0,10);
    return shuffle([s[0].r, ...s[0].d]);
  });

  const reset = () => {
    const nd = shuffle(RHYME_SETS).slice(0,10);
    setDeck(nd); setIdx(0); setScore(0); setChosen(null); setDone(false);
    setShuffled(shuffle([nd[0].r, ...nd[0].d]));
  };

  const pick = (w: string) => {
    if (chosen) return;
    const ok = w === deck[idx].r;
    setChosen(w);
    if (ok) setScore(s => s+1);
    setTimeout(() => {
      const next = idx+1;
      if (next >= deck.length) { setDone(true); }
      else { setIdx(next); setShuffled(shuffle([deck[next].r, ...deck[next].d])); setChosen(null); }
    }, 1300);
  };

  const hf = "var(--font-concert-one),'Concert One',cursive";
  const bf = "var(--font-catamaran),'Catamaran',sans-serif";
  const ac = accentColor;

  if (done) return (
    <div style={{textAlign:"center",padding:"32px 16px"}}>
      <div style={{fontSize:72}}>{score>=8?"🏆":score>=5?"🥳":"🐓"}</div>
      <h3 style={{fontFamily:hf,fontSize:"clamp(22px,4vw,32px)",margin:"12px 0 6px",color:ac}}>
        {score>=8?"Amazing!":score>=5?"Great job!":"Keep trying!"}
      </h3>
      <p style={{fontFamily:bf,fontSize:18,color:"#444",marginBottom:24}}>
        You got <strong>{score} out of {deck.length}</strong> right! 🎉
      </p>
      <button onClick={reset} style={{padding:"12px 32px",borderRadius:50,background:ac,color:"#fff",border:"none",fontSize:17,fontWeight:700,fontFamily:bf,cursor:"pointer"}}>
        Play Again! 🎵
      </button>
    </div>
  );

  const current = deck[idx];
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,padding:"8px 0"}}>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
        {deck.map((_,i) => (
          <div key={i} style={{width:12,height:12,borderRadius:"50%",background:i<idx?"#34C759":i===idx?ac:"#ddd",transition:"background 0.3s"}}/>
        ))}
      </div>
      <p style={{fontFamily:bf,fontSize:14,color:"#888",margin:0}}>Question {idx+1} of {deck.length} · Score: {score}</p>
      <div style={{textAlign:"center",padding:"20px 32px",background:`${ac}11`,borderRadius:20,border:`2px solid ${ac}44`,minWidth:200}}>
        <div style={{fontSize:72,lineHeight:1.2}}>{current.e}</div>
        <div style={{fontFamily:hf,fontSize:"clamp(28px,5vw,44px)",color:ac,marginTop:4}}>{current.w.toUpperCase()}</div>
      </div>
      <p style={{fontFamily:hf,fontSize:"clamp(16px,2.5vw,20px)",color:"#333",margin:0,textAlign:"center"}}>
        Which word rhymes with <strong style={{color:ac}}>{current.w}</strong>?
      </p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,width:"100%",maxWidth:400}}>
        {shuffled.map(w => {
          const isCorrect = w === current.r;
          const isChosen  = w === chosen;
          let bg = "#fff", border = "2px solid #ddd", col = "#333";
          if (chosen) {
            if (isCorrect)     { bg="#d4f7d4"; border="2px solid #34C759"; col="#1a6a1a"; }
            else if (isChosen) { bg="#fdd";    border="2px solid #FF3B30"; col="#6a1a1a"; }
          }
          return (
            <button key={w} onClick={() => pick(w)}
              style={{padding:"16px 12px",borderRadius:14,background:bg,border,color:col,fontSize:"clamp(16px,2.5vw,20px)",fontFamily:hf,fontWeight:700,cursor:chosen?"default":"pointer",transition:"all 0.2s",boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
              {chosen && isCorrect ? "\u2713 "+w : w}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Doodle-Do: Mad Lib story maker ────────────────────────────────────────────
function DoodleMadLib({ accentColor }: { accentColor: string }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [fills,    setFills]    = useState<Record<string,string>>({});
  const [activeId, setActiveId] = useState<string>(MAD_LIB_STORIES[0].blanks[0].id);
  const [custom,   setCustom]   = useState("");
  const [reading,  setReading]  = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const story = MAD_LIB_STORIES[storyIdx];

  useEffect(() => {
    setFills({}); setCustom(""); setReading(false);
    setActiveId(story.blanks[0].id);
  }, [storyIdx]);

  const allFilled = story.blanks.every(b => fills[b.id]?.trim());
  const hf = "var(--font-concert-one),'Concert One',cursive";
  const bf = "var(--font-catamaran),'Catamaran',sans-serif";
  const ac = accentColor;

  const fillWord = (blankId: string, word: string) => {
    const clean = filterBadWords(word);
    if (!clean) return;
    setFills(f => ({ ...f, [blankId]: clean }));
    const ni = story.blanks.findIndex(b => b.id === blankId) + 1;
    if (ni < story.blanks.length) setActiveId(story.blanks[ni].id);
    setCustom("");
  };

  const activeBlank = story.blanks.find(b => b.id === activeId);

  // Build story with inline colored chips
  const buildStory = () => {
    const nodes: React.ReactNode[] = [];
    let rest = story.tmpl;
    story.blanks.forEach((b, i) => {
      const split = rest.indexOf("{"+b.id+"}");
      if (split === -1) return;
      nodes.push(<span key={"t"+i}>{rest.slice(0,split)}</span>);
      const val = fills[b.id];
      const isActive = !reading && b.id === activeId;
      nodes.push(
        <span key={"b"+i} onClick={() => !reading && setActiveId(b.id)}
          style={{display:"inline-block",padding:"2px 10px",borderRadius:8,
            background:val?`${b.color}22`:`${b.color}11`,
            border:`2px solid ${isActive?b.color:val?b.color+"88":"#ddd"}`,
            color:val?b.color:"#aaa",fontWeight:700,
            cursor:reading?"default":"pointer",minWidth:60,textAlign:"center",
            margin:"0 2px",transition:"all 0.2s",fontSize:"0.95em"}}>
          {val || b.label}
        </span>
      );
      rest = rest.slice(split + b.id.length + 2);
    });
    nodes.push(<span key="end">{rest}</span>);
    return nodes;
  };

  const fullText = story.blanks.reduce((t,b) => t.replace("{"+b.id+"}", fills[b.id]||"_____"), story.tmpl).replace(/\\"/g,'"');

  const readAloud = async () => {
    if (ttsLoading || speaking) return;
    setTtsLoading(true);
    try {
      const res = await fetch("/api/tts-what-a-doodle-do", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullText }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => { setSpeaking(false); };
      setSpeaking(true);
      audio.play();
    } catch { setSpeaking(false); }
    finally { setTtsLoading(false); }
  };

  const stopSpeaking = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setSpeaking(false);
  };

  useEffect(() => () => { if (audioRef.current) audioRef.current.pause(); }, []);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {MAD_LIB_STORIES.map((s,i) => (
          <button key={s.id} onClick={()=>setStoryIdx(i)}
            style={{padding:"8px 16px",borderRadius:50,border:`2px solid ${i===storyIdx?ac:"#ddd"}`,
              background:i===storyIdx?ac:"#fff",color:i===storyIdx?"#fff":"#555",
              fontWeight:700,fontSize:13,fontFamily:bf,cursor:"pointer"}}>
            {s.title}
          </button>
        ))}
      </div>
      <div style={{padding:"16px 20px",borderRadius:16,background:`${ac}0d`,border:`2px solid ${ac}33`,
        fontSize:"clamp(15px,2.2vw,18px)",fontFamily:bf,lineHeight:1.9,color:"#222"}}>
        {buildStory()}
      </div>
      {!reading ? (
        <>
          {activeBlank && (
            <div style={{padding:"16px",borderRadius:16,border:`2px solid ${activeBlank.color}`,background:`${activeBlank.color}0d`}}>
              <p style={{fontFamily:hf,fontSize:"clamp(14px,2vw,17px)",color:activeBlank.color,margin:"0 0 10px",fontWeight:700}}>
                Pick a {activeBlank.label.toUpperCase()}:
              </p>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:12}}>
                {activeBlank.hints.map(h => (
                  <button key={h} onClick={()=>fillWord(activeId,h)}
                    style={{padding:"8px 14px",borderRadius:50,border:`2px solid ${activeBlank.color}`,
                      background:fills[activeId]===h?activeBlank.color:"#fff",
                      color:fills[activeId]===h?"#fff":activeBlank.color,
                      fontWeight:700,fontSize:14,fontFamily:bf,cursor:"pointer"}}>
                    {h}
                  </button>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <input value={custom} onChange={e=>setCustom(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&custom.trim()&&fillWord(activeId,custom)}
                  placeholder="Or type your own..."
                  style={{flex:1,padding:"8px 14px",borderRadius:50,border:`2px solid ${activeBlank.color}88`,
                    fontSize:14,fontFamily:bf,outline:"none",color:"#333"}}/>
                <button onClick={()=>custom.trim()&&fillWord(activeId,custom)} disabled={!custom.trim()}
                  style={{padding:"8px 18px",borderRadius:50,background:activeBlank.color,color:"#fff",
                    border:"none",fontWeight:700,fontSize:14,fontFamily:bf,cursor:"pointer",
                    opacity:custom.trim()?1:0.4}}>
                  Use it!
                </button>
              </div>
            </div>
          )}
          {allFilled && (
            <button onClick={()=>setReading(true)}
              style={{padding:"14px 32px",borderRadius:50,background:ac,color:"#fff",border:"none",
                fontSize:"clamp(16px,2.5vw,20px)",fontWeight:700,fontFamily:hf,cursor:"pointer",
                alignSelf:"center",boxShadow:`0 4px 16px ${ac}66`}}>
              📖 Read the Story!
            </button>
          )}
        </>
      ) : (
        <div style={{display:"flex",flexDirection:"column",gap:12,alignItems:"center",padding:"16px",borderRadius:16,background:`${ac}11`,border:`2px solid ${ac}44`}}>
          <p style={{fontFamily:hf,fontSize:"clamp(18px,3vw,24px)",color:ac,margin:0}}>🎉 Your story is ready!</p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
            <button onClick={speaking?stopSpeaking:readAloud} disabled={ttsLoading}
              style={{padding:"10px 24px",borderRadius:50,background:speaking?"#FF3B30":ac,color:"#fff",
                border:"none",fontSize:15,fontWeight:700,fontFamily:bf,cursor:ttsLoading?"wait":"pointer",opacity:ttsLoading?0.7:1}}>
              {ttsLoading ? "⏳ Loading…" : speaking ? "⏹ Stop" : "🔊 Read to Me!"}
            </button>
            <button onClick={()=>{setReading(false);stopSpeaking();}}
              style={{padding:"10px 24px",borderRadius:50,background:"#fff",color:ac,border:`2px solid ${ac}`,fontSize:15,fontWeight:700,fontFamily:bf,cursor:"pointer"}}>
              \u270F\uFE0F Change Words
            </button>
            <button onClick={()=>{setFills({});setReading(false);stopSpeaking();setActiveId(story.blanks[0].id);}}
              style={{padding:"10px 24px",borderRadius:50,background:"#fff",color:"#888",border:"2px solid #ddd",fontSize:15,fontWeight:700,fontFamily:bf,cursor:"pointer"}}>
              🔄 Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DoodleDoActivity({ accentColor }: { accentColor: string }) {
  const [tab, setTab] = useState<"cheer"|"rhyme"|"story">("cheer");
  const [cheerIdx, setCheerIdx] = useState(0);
  const hf = "var(--font-concert-one),'Concert One',cursive";
  const bf = "var(--font-catamaran),'Catamaran',sans-serif";
  const tabs: {id:"cheer"|"rhyme"|"story"; label:string}[] = [
    {id:"cheer",label:"🐓 Morning Cheer"},
    {id:"rhyme",label:"🎵 Rhyme Time"},
    {id:"story",label:"📖 Story Maker"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{padding:"10px 18px",borderRadius:50,border:`2px solid ${t.id===tab?accentColor:"#ddd"}`,
              background:t.id===tab?accentColor:"#fff",color:t.id===tab?"#fff":"#555",
              fontWeight:700,fontSize:"clamp(13px,1.8vw,15px)",fontFamily:bf,cursor:"pointer",transition:"all 0.2s"}}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === "cheer" && (
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{padding:"20px 24px",borderRadius:16,background:`linear-gradient(135deg,${accentColor}22,${accentColor}44)`,border:`2px solid ${accentColor}`,textAlign:"center"}}>
            <p style={{fontSize:"clamp(16px,2.5vw,20px)",fontFamily:hf,color:"#3a1a00",lineHeight:1.4}}>{CHEERS[cheerIdx]}</p>
          </div>
          <button onClick={() => setCheerIdx(i => (i+1)%CHEERS.length)}
            style={{alignSelf:"flex-start",padding:"10px 24px",borderRadius:50,backgroundColor:accentColor,color:"#fff",fontWeight:700,fontSize:15,border:"none",cursor:"pointer",fontFamily:bf}}>
            Another cheer! 🐓
          </button>
        </div>
      )}
      {tab === "rhyme" && <DoodleRhymeGame accentColor={accentColor} />}
      {tab === "story" && <DoodleMadLib accentColor={accentColor} />}
    </div>
  );
}


// ── Tom Turkey Sing-Along (Wheels on the Bus) ─────────────────────────────────
function TomTurkeySingAlong({ accentColor }: { accentColor: string }) {
  const PAGES = [
    {e:"🦃",words:["One","Tom","Turkey","goes","gobble","gobble","gobble,","gobble","gobble","gobble,","gobble","gobble","gobble.","One","Tom","Turkey","goes","gobble","gobble","gobble,","on","Thanksgiving","day!"]},
    {e:"🥧",words:["Two","pumpkin","pies","go","mix,","bake,","bake!","Mix,","bake,","bake!","Mix,","bake,","bake!","Two","pumpkin","pies","go","mix,","bake,","bake,","on","Thanksgiving","day."]},
    {e:"🍒",words:["Three","cranberry","tasters","go","ooo,","that's","sour!","Ooo,","that's","sour!","Ooo,","that's","sour!","Three","cranberry","tasters","go","ooo,","that's","sour,","on","Thanksgiving","day."]},
    {e:"🥔",words:["Four","boiled","potatoes","go","mash,","mash,","stir!","Mash,","mash,","stir!","Mash,","mash,","stir!","Four","boiled","potatoes","go","mash,","mash,","stir,","on","Thanksgiving","day."]},
    {e:"🏈",words:["Five","flying","footballs","go","spinning","in","the","air,","spinning","in","the","air,","spinning","in","the","air!","Five","flying","footballs","go","spinning","in","the","air,","on","Thanksgiving","day."]},
    {e:"🙏",words:["Six","things","we","are","thankful","for,","thankful","for,","thankful","for.","Six","things","we","are","thankful","for,","on","Thanksgiving","day."]},
    {e:"🔘",words:["Seven","shirt","buttons","go","stretch,","stretch,","POP!","Stretch,","stretch,","POP!","Stretch,","stretch,","POP!","Seven","shirt","buttons","go","stretch,","stretch,","POP!","On","Thanksgiving","day."]},
    {e:"😋",words:["Eight","full","tummies","go","mmm,","that","was","good!","Mmm,","that","was","good!","Mmm,","that","was","good!","Eight","full","tummies","go","mmm,","that","was","good,","on","Thanksgiving","day."]},
    {e:"🍽️",words:["Nine","dirty","dishes","go","clink,","clank,","clink!","Clink,","clank,","clink!","Clink,","clank,","clink!","Nine","dirty","dishes","go","clink,","clank,","clink,","on","Thanksgiving","day."]},
    {e:"😴",words:["Ten","tired","folks","go","yawn,","yawn,","yawn!","Yawn,","yawn,","yawn!","Yawn,","yawn,","yawn!","Ten","tired","folks","go","yawn,","yawn,","yawn,","on","Thanksgiving","day."]},
    {e:"🦃",words:["One","Tom","Turkey","goes","gobble","gobble","gobble,","gobble","gobble","gobble,","gobble","gobble","gobble.","One","Tom","Turkey","goes","gobble","gobble","...","PARDON!!!","On","Thanksgiving","day!"]},
  ];

  const [pageIdx,  setPageIdx]  = useState(0);
  const [wordIdx,  setWordIdx]  = useState(-1);
  const [playing,  setPlaying]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const audioRef    = useRef<HTMLAudioElement|null>(null);
  const audioCtxRef = useRef<AudioContext|null>(null);
  const playingRef  = useRef(false);
  const urlRef      = useRef<string|null>(null);

  const hf = "var(--font-concert-one),'Concert One',cursive";
  const bf = "var(--font-catamaran),'Catamaran',sans-serif";
  const ac = accentColor;

  // Wheels on the Bus background melody (soft ambience under the voice)
  const playMelody = (ctx: AudioContext) => {
    const G4=392,A4=440,E4=330,D4=294,G3=196;
    const beat = 0.42;
    const seq:[number,number][] = [
      [G4,1],[G4,1],[A4,1],[G4,1],[E4,1],[D4,1],
      [G4,1],[G4,1],[G4,1],[G4,1],[G4,2],
      [G4,1],[G4,1],[G4,1],[G4,1],[G4,2],
      [G4,1],[G4,1],[A4,1],[G4,1],[E4,1],[D4,1],
      [A4,1],[G4,1],[E4,1],[G4,2],[G3,0.5],
    ];
    let t = ctx.currentTime + 0.1;
    seq.forEach(([f,b]) => {
      if (f > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "triangle"; osc.frequency.value = f;
        const dur = beat * b * 0.8;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
        osc.start(t); osc.stop(t + dur);
      }
      t += beat * b;
    });
  };

  const stopAll = () => {
    playingRef.current = false;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; audioRef.current = null; }
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = null; }
    setPlaying(false); setWordIdx(-1);
  };

  const startPlayback = async (pIdx: number) => {
    stopAll();
    setLoading(true);
    setPageIdx(pIdx);
    playingRef.current = true;

    try {
      const verse = PAGES[pIdx].words.join(" ");
      const res = await fetch("/api/tts-one-tom-turkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: verse }),
      });
      if (!res.ok || !playingRef.current) { setLoading(false); setPlaying(false); return; }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      urlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      const words = PAGES[pIdx].words;

      // Proportional word sync: currentTime/duration * wordCount
      audio.ontimeupdate = () => {
        if (!audio.duration || !playingRef.current) return;
        const wi = Math.min(words.length - 1, Math.floor((audio.currentTime / audio.duration) * words.length));
        setWordIdx(wi);
      };

      audio.onended = () => {
        URL.revokeObjectURL(url); urlRef.current = null;
        const np = pIdx + 1;
        if (np < PAGES.length && playingRef.current) {
          startPlayback(np);
        } else {
          setWordIdx(-1); setPlaying(false); playingRef.current = false;
        }
      };
      audio.onerror = () => { setLoading(false); setPlaying(false); setWordIdx(-1); };

      // Soft background melody
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") await ctx.resume();
      playMelody(ctx);

      setLoading(false); setPlaying(true); setWordIdx(0);
      audio.play().catch(() => { setPlaying(false); setWordIdx(-1); });

    } catch { setLoading(false); setPlaying(false); playingRef.current = false; }
  };

  const handlePlay = () => {
    if (playing || loading) { stopAll(); return; }
    startPlayback(pageIdx);
  };

  const goToPage = (idx: number) => { stopAll(); setPageIdx(idx); };

  useEffect(() => () => stopAll(), []);

  const page = PAGES[pageIdx];

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{textAlign:"center",fontFamily:hf,fontSize:"clamp(15px,2.3vw,18px)",color:ac}}>
        🎵 Sing Along! — Sung to "Wheels on the Bus" 🦃
      </div>

      {/* Page dots */}
      <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
        {PAGES.map((_,i) => (
          <button key={i} onClick={()=>goToPage(i)}
            style={{width:30,height:30,borderRadius:"50%",border:`2px solid ${i===pageIdx?ac:"#ddd"}`,
              background:i===pageIdx?ac:"#fff",color:i===pageIdx?"#fff":"#666",
              fontWeight:700,fontSize:11,fontFamily:bf,cursor:"pointer",padding:0}}>
            {i+1}
          </button>
        ))}
      </div>

      {/* Lyrics display */}
      <div style={{padding:"20px 16px",borderRadius:20,background:`${ac}0d`,border:`2px solid ${ac}33`,
        minHeight:140,display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
        <div style={{fontSize:48}}>{page.e}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px 10px",alignItems:"center",justifyContent:"center",lineHeight:1.7}}>
          {page.words.map((w,i) => {
            const active = i === wordIdx;
            return (
              <span key={i} style={{
                fontFamily:hf,
                fontSize:active?"clamp(22px,4vw,30px)":"clamp(17px,2.8vw,22px)",
                color:active?ac:"#333",
                fontWeight:700,
                display:"inline-block",
                transition:"all 0.1s ease-out",
                transform:active?"scale(1.3) translateY(-5px)":"scale(1) translateY(0)",
                textShadow:active?`0 3px 12px ${ac}55`:"none",
                background:active?`${ac}20`:"transparent",
                borderRadius:active?8:0,
                padding:active?"3px 8px":"0",
              }}>
                {w}
              </span>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div style={{display:"flex",gap:12,justifyContent:"center",alignItems:"center"}}>
        <button onClick={()=>goToPage(Math.max(0,pageIdx-1))} disabled={pageIdx===0}
          style={{width:44,height:44,borderRadius:"50%",border:`2px solid ${ac}`,background:"#fff",color:ac,
            fontWeight:700,fontSize:22,cursor:pageIdx===0?"not-allowed":"pointer",opacity:pageIdx===0?0.3:1}}>
          ‹
        </button>
        <button onClick={handlePlay}
          style={{padding:"14px 40px",borderRadius:50,background:loading?"#888":(playing?"#FF3B30":ac),color:"#fff",border:"none",
            fontSize:"clamp(16px,2.5vw,20px)",fontWeight:700,fontFamily:hf,cursor:loading?"wait":"pointer",
            boxShadow:`0 4px 16px ${loading?"#88888855":(playing?"#FF3B3055":ac+"55")}`,minWidth:150,transition:"background 0.2s"}}>
          {loading ? "⏳ Loading..." : playing ? "⏸ Pause" : "▶ Sing!"}
        </button>
        <button onClick={()=>goToPage(Math.min(PAGES.length-1,pageIdx+1))} disabled={pageIdx===PAGES.length-1}
          style={{width:44,height:44,borderRadius:"50%",border:`2px solid ${ac}`,background:"#fff",color:ac,
            fontWeight:700,fontSize:22,cursor:pageIdx===PAGES.length-1?"not-allowed":"pointer",opacity:pageIdx===PAGES.length-1?0.3:1}}>
          ›
        </button>
      </div>
      <p style={{textAlign:"center",fontFamily:bf,fontSize:12,color:"#999",margin:0}}>
        Verse {pageIdx+1} of {PAGES.length}{loading?" · Loading voice...":playing?" · 🎵 Playing...":" · Tap ▶ to start!"}
      </p>
    </div>
  );
}

function ThanksgivingCountdown({ accentColor }: { accentColor: string }) {
  const now = new Date();
  const year = now.getFullYear();
  let thanksgiving = new Date(year, 10, 1);
  const dayOfWeek = thanksgiving.getDay();
  const thursdayOffset = (4 - dayOfWeek + 7) % 7;
  thanksgiving = new Date(year, 10, 1 + thursdayOffset + 21);
  if (thanksgiving < now) {
    thanksgiving = new Date(year + 1, 10, 1);
    const d = thanksgiving.getDay();
    const off = (4 - d + 7) % 7;
    thanksgiving = new Date(year + 1, 10, 1 + off + 21);
  }
  const diffMs = thanksgiving.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const isToday = diffDays === 0;

  return (
    <div
      style={{
        padding: "20px 24px",
        borderRadius: 16,
        background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
        border: `2px solid ${accentColor}`,
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: 14, color: accentColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
        🦃 Tom&apos;s Thanksgiving Countdown
      </p>
      {isToday ? (
        <p style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: 28, color: "#3e1a00" }}>
          It&apos;s TODAY! 🎉🦃🥧
        </p>
      ) : (
        <>
          <p style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: 48, color: "#c0560a", lineHeight: 1 }}>
            {diffDays}
          </p>
          <p style={{ fontSize: 16, color: "#3e1a00", fontWeight: 600 }}>
            days until Thanksgiving! 🍂
          </p>
        </>
      )}
      <p style={{ fontSize: 13, color: "#a05020", marginTop: 8 }}>
        {isToday ? "Time to eat some pie!" : "Better start practicing that Wheels on the Bus song..."}
      </p>
    </div>
  );
}

function TextInputActivity({
  prompt,
  placeholder,
  buttonLabel,
  responseTemplate,
  accentColor,
  textColor = "#333",
}: {
  prompt: string;
  placeholder: string;
  buttonLabel: string;
  responseTemplate: (input: string) => string;
  accentColor: string;
  textColor?: string;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 16, color: textColor }}>{prompt}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && input.trim() && setResult(responseTemplate(input))}
          placeholder={placeholder}
          style={{
            flex: "1 1 200px",
            padding: "10px 16px",
            borderRadius: 12,
            border: `2px solid ${accentColor}`,
            fontSize: 15,
            outline: "none",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
          }}
        />
        <button
          onClick={() => input.trim() && setResult(responseTemplate(input))}
          disabled={!input.trim()}
          style={{
            padding: "10px 20px",
            borderRadius: 12,
            backgroundColor: input.trim() ? accentColor : "#ccc",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            border: "none",
            cursor: input.trim() ? "pointer" : "not-allowed",
            fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
          }}
        >
          {buttonLabel}
        </button>
      </div>
      {result && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 12,
            background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}33)`,
            border: `2px solid ${accentColor}`,
            fontSize: 15,
            color: textColor,
            lineHeight: 1.5,
          }}
        >
          {result}
          <br />
          <button
            onClick={() => { setInput(""); setResult(""); }}
            style={{
              marginTop: 10,
              padding: "6px 16px",
              borderRadius: 50,
              backgroundColor: "transparent",
              color: accentColor,
              fontWeight: 700,
              fontSize: 13,
              border: `2px solid ${accentColor}`,
              cursor: "pointer",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Try again ↩
          </button>
        </div>
      )}
    </div>
  );
}

// ── Amber: Catch Cinnamon's Diamonds (canvas game) ──────────────────────────
interface DiamondObj { x: number; y: number; speed: number; size: number; color: string; }
const AMBER_GAME_DURATION = 300; // 5 minutes
const MAX_LIVES = 5;

function AmberDiamondCatch({ accentColor, textLight }: { accentColor: string; textLight?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"idle" | "playing" | "over">("idle");
  const [finalScore, setFinalScore] = useState(0);
  const [livesDisplay, setLivesDisplay] = useState(MAX_LIVES);
  const gameRef = useRef({
    diamonds: [] as DiamondObj[],
    playerX: 200,
    score: 0,
    lives: MAX_LIVES,
    frame: 0,
    running: false,
    startTime: 0,
  });
  const keysRef = useRef({ left: false, right: false });
  const animRef = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgLoadedRef = useRef(false);
  // Store natural aspect ratio so character renders proportionately
  const imgRatioRef = useRef(1.0); // height / width

  const W = 400, H = 320;
  const PW = 72; // fixed width; height computed from aspect ratio
  const PSPEED = 5;
  const DCOLORS = ["#E86BB5", "#C8A4FF", "#FFD700", "#FF6B9D", "#7CF5FF"];

  // Load dragon image once — store natural aspect ratio
  useEffect(() => {
    const img = new Image();
    img.src = "/images/characters/amber-no-background.png";
    img.onload = () => {
      if (img.naturalWidth > 0) {
        imgRatioRef.current = img.naturalHeight / img.naturalWidth;
      }
      imgLoadedRef.current = true;
    };
    imgRef.current = img;
  }, []);

  function startGame() {
    const g = gameRef.current;
    g.diamonds = []; g.playerX = W / 2; g.score = 0; g.lives = MAX_LIVES;
    g.frame = 0; g.running = true; g.startTime = performance.now();
    setFinalScore(0); setLivesDisplay(MAX_LIVES); setPhase("playing");
  }

  // Keyboard support for desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = e.type === "keydown";
      if (e.key === "ArrowLeft"  || e.key === "a" || e.key === "A") keysRef.current.left  = d;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keysRef.current.right = d;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKey); };
  }, []);

  // Drag / touch — convert screen X → canvas X and update playerX directly
  function handlePointer(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!gameRef.current.running || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const canvasX = (e.clientX - rect.left) * (W / rect.width);
    gameRef.current.playerX = Math.max(PW / 2, Math.min(W - PW / 2, canvasX));
  }

  // Game loop
  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const loop = () => {
      const g = gameRef.current;
      if (!g.running) return;
      g.frame++;

      // Proportionate character height from loaded image ratio
      const PH = Math.round(PW * imgRatioRef.current) || 108;

      // Timer
      const elapsed = (performance.now() - g.startTime) / 1000;
      const timeLeft = Math.max(0, AMBER_GAME_DURATION - elapsed);
      if (timeLeft <= 0) { g.running = false; setFinalScore(g.score); setPhase("over"); return; }

      // Keyboard movement
      if (keysRef.current.left)  g.playerX = Math.max(PW / 2,     g.playerX - PSPEED);
      if (keysRef.current.right) g.playerX = Math.min(W - PW / 2, g.playerX + PSPEED);

      // Spawn diamonds — speed ramps over the 5 minutes
      const speedMult = 1 + (elapsed / AMBER_GAME_DURATION) * 1.8;
      const spawnEvery = Math.max(18, 72 - Math.floor(elapsed / 30) * 7);
      if (g.frame % spawnEvery === 0) {
        g.diamonds.push({
          x: 14 + Math.random() * (W - 28),
          y: -20,
          speed: (1.6 + g.score * 0.015) * speedMult,
          size: 13,
          color: DCOLORS[Math.floor(Math.random() * DCOLORS.length)],
        });
      }

      // Dragon position
      const dragonLeft = g.playerX - PW / 2;
      const dragonTop  = H - PH - 4;
      // Catch zone = upper 55% of dragon sprite (arms/hands area)
      const catchTop  = dragonTop;
      const catchBot  = dragonTop + PH * 0.55;

      let livesChanged = false;
      g.diamonds = g.diamonds.filter(d => {
        d.y += d.speed;
        // Caught
        if (d.y + d.size > catchTop && d.y < catchBot &&
            d.x + d.size > dragonLeft && d.x < dragonLeft + PW) {
          g.score++; return false;
        }
        // Missed — fell past bottom
        if (d.y > H + 10) {
          g.lives = Math.max(0, g.lives - 1);
          livesChanged = true;
          return false;
        }
        return true;
      });

      // Update lives display in React state (triggers re-render for hearts)
      if (livesChanged) {
        setLivesDisplay(g.lives);
        if (g.lives <= 0) {
          g.running = false;
          setFinalScore(g.score);
          setPhase("over");
          return;
        }
      }

      // ── Draw ───────────────────────────────────────────────────────────────
      ctx.fillStyle = "#1a0533"; ctx.fillRect(0, 0, W, H);

      // Stars
      for (let i = 0; i < 32; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.12 + (i % 5) * 0.1})`;
        ctx.beginPath();
        ctx.arc((i * 61 + 17) % W, (i * 43 + 11) % Math.floor(H * 0.82), 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Diamonds
      g.diamonds.forEach(d => {
        ctx.save();
        ctx.translate(d.x + d.size / 2, d.y + d.size / 2);
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.moveTo(0, -d.size * 0.6); ctx.lineTo(d.size * 0.5, 0);
        ctx.lineTo(0, d.size * 0.6);  ctx.lineTo(-d.size * 0.5, 0);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 1; ctx.stroke();
        ctx.restore();
      });

      // Amber character (proportionate)
      if (imgLoadedRef.current && imgRef.current) {
        ctx.drawImage(imgRef.current, dragonLeft, dragonTop, PW, PH);
      } else {
        ctx.font = `${PH * 0.85}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("🐉", g.playerX, dragonTop + PH - 4);
      }

      // HUD — score
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`💎 ${g.score}`, 10, 22);

      // HUD — lives (hearts)
      ctx.textAlign = "center";
      ctx.font = "13px sans-serif";
      const hearts = "❤️".repeat(g.lives) + "🖤".repeat(MAX_LIVES - g.lives);
      ctx.fillText(hearts, W / 2, 22);

      // HUD — timer (MM:SS), turns red in last 30 s
      const mins = Math.floor(timeLeft / 60);
      const secs = Math.floor(timeLeft % 60);
      ctx.fillStyle = timeLeft < 30 ? "#ff6b6b" : "rgba(255,255,255,0.95)";
      ctx.textAlign = "right";
      ctx.fillText(`⏱ ${mins}:${secs.toString().padStart(2, "0")}`, W - 10, 22);

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, accentColor]); // eslint-disable-line

  // Figure out if game over was lives or time
  const gameOverByLives = phase === "over" && gameRef.current.lives <= 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
      <p style={{ fontSize: 15, color: textLight ? "rgba(255,255,255,0.9)" : "#2d0a3a", lineHeight: 1.5, maxWidth: 400, textAlign: "center", margin: 0 }}>
        Cinnamon scattered his magic diamonds! Drag Amber to catch them. 💎<br />
        <span style={{ fontSize: 13, opacity: 0.75 }}>Slide your finger left &amp; right — don&apos;t let 5 fall!</span>
      </p>
      <div
        style={{ position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", width: "100%", maxWidth: 400 }}
      >
        <canvas
          ref={canvasRef}
          width={W} height={H}
          style={{ display: "block", width: "100%", height: "auto", touchAction: "none", cursor: "grab" }}
          onPointerDown={handlePointer}
          onPointerMove={handlePointer}
        />
        {phase === "idle" && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,5,51,0.93)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
            <span style={{ fontSize: 52 }}>🐉</span>
            <p style={{ color: "#fff", fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 22, textAlign: "center", padding: "0 16px", margin: 0 }}>Catch Cinnamon&apos;s Diamonds!</p>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, textAlign: "center", margin: 0, padding: "0 20px" }}>Drag Amber left &amp; right with your finger 🐉<br />Catch as many as you can in 5 minutes!</p>
            <button onClick={startGame} style={{ padding: "12px 28px", borderRadius: 50, backgroundColor: accentColor, color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
              Start Game! 💎
            </button>
          </div>
        )}
        {phase === "over" && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,5,51,0.93)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <span style={{ fontSize: 44 }}>{gameOverByLives ? "💔" : finalScore >= 60 ? "🐉" : "💎"}</span>
            <p style={{ color: "#fff", fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 22, margin: 0 }}>
              {gameOverByLives ? "Oh no! 5 diamonds got away!" : finalScore >= 100 ? "Dragon Master!" : finalScore >= 60 ? "Dragon Keeper!" : finalScore >= 30 ? "Great catch!" : finalScore >= 15 ? "Nice try!" : "Keep practicing!"}
            </p>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, margin: 0 }}>💎 {finalScore} diamonds caught</p>
            <button onClick={startGame} style={{ padding: "10px 22px", borderRadius: 50, backgroundColor: accentColor, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
              Play Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Amber: Create Your Own Dragon ─────────────────────────────────────────────
const DRAGON_COLORS = [
  { label: "Royal Purple", hex: "#9B30FF" },
  { label: "Golden", hex: "#FFD700" },
  { label: "Crimson", hex: "#DC143C" },
  { label: "Emerald", hex: "#2ECC71" },
  { label: "Sapphire", hex: "#2980FF" },
  { label: "Midnight", hex: "#4B0082" },
];
const DRAGON_POWERS = [
  { label: "Fire", emoji: "🔥", desc: "breathes roaring magical flames" },
  { label: "Ice", emoji: "❄️", desc: "exhales magical frost and snow" },
  { label: "Lightning", emoji: "⚡", desc: "crackles with electric power" },
  { label: "Healing", emoji: "✨", desc: "glows with warm healing light" },
  { label: "Invisibility", emoji: "👻", desc: "vanishes in the blink of an eye" },
  { label: "Telepathy", emoji: "🌀", desc: "speaks directly to your thoughts" },
];
const DRAGON_SIZES = [
  { label: "Tiny", desc: "fits in your pocket!", emoji: "🤏" },
  { label: "Medium", desc: "rides like a horse!", emoji: "🏇" },
  { label: "Enormous", desc: "covers the whole sky!", emoji: "🏔️" },
];

function AmberDragonCreator({ accentColor, textLight }: { accentColor: string; textLight?: boolean }) {
  const [step, setStep] = useState(0);
  const [chosenColor, setChosenColor] = useState<typeof DRAGON_COLORS[0] | null>(null);
  const [chosenPower, setChosenPower] = useState<typeof DRAGON_POWERS[0] | null>(null);
  const [chosenSize, setChosenSize] = useState<typeof DRAGON_SIZES[0] | null>(null);
  const [dragonName, setDragonName] = useState("");
  const [created, setCreated] = useState(false);
  const [aiStory, setAiStory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const tc = textLight ? "rgba(255,255,255,0.9)" : "#2d0a3a";

  function reset() { setStep(0); setChosenColor(null); setChosenPower(null); setChosenSize(null); setDragonName(""); setCreated(false); setAiStory(null); setLoading(false); }

  async function handleCreate() {
    if (!chosenColor || !chosenPower || !chosenSize) return;
    setCreated(true);
    setLoading(true);
    try {
      const res = await fetch('/api/amber-dragon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dragonName.trim() || "your dragon",
          color: chosenColor.label,
          size: chosenSize.label,
          power: chosenPower.label,
          powerEmoji: chosenPower.emoji,
        }),
      });
      const data = await res.json();
      setAiStory(data.story ?? null);
    } catch {
      setAiStory(null);
    } finally {
      setLoading(false);
    }
  }

  if (created && chosenColor && chosenPower && chosenSize) {
    const name = dragonName.trim() || "your dragon";
    const fallback = `Deep in the Dragon Mountains of Sydar lives ${name} — a ${chosenSize.emoji} ${chosenSize.label.toLowerCase()} dragon with gleaming ${chosenColor.label.toLowerCase()} scales who ${chosenPower.desc} ${chosenPower.emoji}.\n\nAmber herself has heard whispers of this dragon. *"${name} is extraordinary,"* she smiled. *"With ${chosenPower.label.toLowerCase()} powers like that, I think we're going to be the greatest dragon team in all of Sydar."*\n\nEvery creature in the land knows ${name}'s name. And now — so does the Dragon Keeper. 🌟`;
    const storyText = aiStory ?? fallback;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
        <div style={{ fontSize: 60 }}>🐉</div>
        <h3 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 30, color: chosenColor.hex, margin: 0, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {dragonName.trim() || "Your Dragon"}
        </h3>
        <div style={{ background: `linear-gradient(135deg, ${chosenColor.hex}22, ${chosenColor.hex}44)`, border: `2px solid ${chosenColor.hex}88`, borderRadius: 16, padding: "20px 24px", maxWidth: 480, textAlign: "left", minHeight: 120 }}>
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "16px 0" }}>
              <div style={{ fontSize: 32, animation: "adventureFloat 1.2s ease-in-out infinite" }}>🐉</div>
              <p style={{ fontSize: 14, color: textLight ? "rgba(255,255,255,0.7)" : "#7b5ea7", margin: 0, fontStyle: "italic" }}>Weaving your dragon&apos;s story…</p>
            </div>
          ) : (
            <p style={{ fontSize: 15, color: textLight ? "rgba(255,255,255,0.92)" : "#2d0a3a", lineHeight: 1.75, margin: 0, whiteSpace: "pre-line" }}>
              {storyText}
            </p>
          )}
        </div>
        <button onClick={reset} style={{ padding: "10px 24px", borderRadius: 50, backgroundColor: accentColor, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
          Create another dragon 🐉
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480, margin: "0 auto", alignItems: "center", width: "100%" }}>
      <div style={{ display: "flex", gap: 6, width: "100%" }}>
        {["Color", "Power", "Size", "Name"].map((s, i) => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i <= step ? accentColor : "rgba(255,255,255,0.2)", transition: "background-color 0.3s" }} />
        ))}
      </div>

      {step === 0 && (
        <>
          <p style={{ fontSize: 15, color: tc, fontWeight: 600, margin: 0 }}>What color are your dragon&apos;s scales? ✨</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {DRAGON_COLORS.map(c => (
              <button key={c.label} onClick={() => { setChosenColor(c); setStep(1); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 12, border: `2px solid ${c.hex}88`, backgroundColor: `${c.hex}22`, color: textLight ? "#fff" : "#2d0a3a", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: c.hex, display: "inline-block", flexShrink: 0 }} />
                {c.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <p style={{ fontSize: 15, color: tc, fontWeight: 600, margin: 0 }}>What&apos;s your dragon&apos;s special power? 🐉</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {DRAGON_POWERS.map(p => (
              <button key={p.label} onClick={() => { setChosenPower(p); setStep(2); }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 12, border: `2px solid ${accentColor}66`, backgroundColor: "rgba(255,255,255,0.1)", color: textLight ? "#fff" : "#2d0a3a", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
                {p.emoji} {p.label}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p style={{ fontSize: 15, color: tc, fontWeight: 600, margin: 0 }}>How big is your dragon? {chosenPower?.emoji}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {DRAGON_SIZES.map(s => (
              <button key={s.label} onClick={() => { setChosenSize(s); setStep(3); }}
                style={{ padding: "12px 18px", borderRadius: 12, border: `2px solid ${accentColor}66`, backgroundColor: "rgba(255,255,255,0.1)", color: textLight ? "#fff" : "#2d0a3a", fontWeight: 600, fontSize: 14, cursor: "pointer", textAlign: "left", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
                {s.emoji} {s.label} — {s.desc}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p style={{ fontSize: 15, color: tc, fontWeight: 600, margin: 0 }}>Give your dragon a name! 🐉</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input value={dragonName} onChange={e => setDragonName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreate()}
              placeholder="My dragon's name is..."
              style={{ flex: "1 1 180px", padding: "12px 16px", borderRadius: 12, border: `2px solid ${accentColor}`, fontSize: 15, outline: "none", backgroundColor: "rgba(255,255,255,0.9)", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", color: "#2d0a3a" }}
            />
            <button onClick={handleCreate}
              style={{ padding: "12px 20px", borderRadius: 12, backgroundColor: accentColor, color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
              Create! 🐉
            </button>
          </div>
          <button onClick={() => setStep(2)} style={{ alignSelf: "flex-start", padding: "6px 14px", borderRadius: 50, backgroundColor: "transparent", color: textLight ? "rgba(255,255,255,0.7)" : accentColor, fontWeight: 600, fontSize: 13, border: `1px solid ${accentColor}66`, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
            ← Back
          </button>
        </>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

interface BookActivityProps {
  slug: string;
  accentColor: string;
  transparent?: boolean;
  textLight?: boolean;
}

// ── Poo Poo Face Game ─────────────────────────────────────────────────────────
const ANIMALS = [
  { name: "Astronaut",    emoji: "🧑‍🚀", image: "/images/poo-faces/characters/astronaut.png",   caption: "Zero gravity. Maximum face. Houston, we have a problem." },
  { name: "Dad",          emoji: "👨",   image: "/images/poo-faces/characters/dad.png",          caption: "The classic Dad Poo Poo Face. It runs in the family." },
  { name: "Dragon",       emoji: "🐉",   image: "/images/poo-faces/characters/dragon.png",       caption: "Breathes fire AND makes THIS face. Respect." },
  { name: "Firefighter",  emoji: "🧑‍🚒", image: "/images/poo-faces/characters/firefighter.png", caption: "Brave enough to fight fires. Not this. Never this." },
  { name: "Football",     emoji: "🏈",   image: "/images/poo-faces/characters/football.png",     caption: "Even the whole team makes it together. Teamwork!" },
  { name: "Mermaid",      emoji: "🧜",   image: "/images/poo-faces/characters/mermaid.png",      caption: "Under the sea… still makes the face. Every time." },
  { name: "Monkey",       emoji: "🐒",   image: "/images/poo-faces/characters/monkey.png",       caption: "Monkeys invented the Poo Poo Face. Fact." },
  { name: "Teacher",      emoji: "👩‍🏫", image: "/images/poo-faces/characters/teacher.png",     caption: "A+ in Poo Poo Faces. Extra credit awarded." },
  { name: "Unicorn",      emoji: "🦄",   image: "/images/poo-faces/characters/unicorn.png",      caption: "Still magical. Still majestic. Somehow." },
];

const SHARE_MSG = `😂 Just made my Poo Poo Face and it's a MASTERPIECE 🤣 Check out "What's Your Poo Poo Face?" at familyfables.com — everybody makes it 💩 @familyfables #PooPooFace #FamilyFables`;
const BOOK_URL = "https://familyfables.com/books/whats-your-poo-poo-face";

function YouPooPooFace({ accentColor, onBack }: { accentColor: string; onBack: () => void }) {
  const [phase, setPhase] = useState<"capture" | "processing" | "result" | "error">("capture");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => { setPhase("capture"); setPreviewUrl(null); setResultUrl(null); setErrMsg(""); };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;

      // Compress to max 800px / quality 0.75 before sending — phone selfies are 3-8MB raw
      const compressedDataUrl = await new Promise<string>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          const MAX = 800;
          const scale = Math.min(1, MAX / Math.max(img.width, img.height));
          const w = Math.round(img.width * scale);
          const h = Math.round(img.height * scale);
          const canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
        img.src = dataUrl;
      });

      setPreviewUrl(compressedDataUrl);
      setPhase("processing");

      // Submit to existing poo-face pipeline
      try {
        const res = await fetch("/api/poo-face", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: compressedDataUrl }),
        });
        const { requestId, error: err } = await res.json();
        if (err || !requestId) { setErrMsg(err || "Failed to start"); setPhase("error"); return; }

        // Poll
        let attempts = 0;
        const poll = async () => {
          if (attempts++ > 40) { setErrMsg("Took too long — try again!"); setPhase("error"); return; }
          const r = await fetch(`/api/poo-face?id=${requestId}`);
          const d = await r.json();
          if (d.status === "COMPLETED") { setResultUrl(d.imageUrl); setPhase("result"); }
          else if (d.status === "FAILED") { setErrMsg("Generation failed — try again!"); setPhase("error"); }
          else setTimeout(poll, 2000);
        };
        poll();
      } catch { setErrMsg("Connection error — try again!"); setPhase("error"); }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!resultUrl) return;
    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const file = new File([blob], "my-poo-poo-face.jpg", { type: "image/jpeg" });
      if (typeof navigator !== "undefined" && navigator.share && (navigator as { canShare?: (d: object) => boolean }).canShare?.({ files: [file] })) {
        await navigator.share({ title: "My Poo Poo Face!", text: SHARE_MSG, files: [file] });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "my-poo-poo-face.jpg"; a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    } catch { /* user cancelled */ }
  };

  const handleShare = async () => {
    if (!resultUrl) return;
    try {
      const res = await fetch(resultUrl);
      const blob = await res.blob();
      const file = new File([blob], "my-poo-poo-face.jpg", { type: "image/jpeg" });
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "My Poo Poo Face!", text: SHARE_MSG, files: (navigator as { canShare?: (d: object) => boolean }).canShare?.({ files: [file] }) ? [file] : undefined, url: BOOK_URL });
        return;
      }
    } catch { /* fall through to link sharing */ }
    // Fallback: open native share sheet via web share link
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_MSG)}&url=${encodeURIComponent(BOOK_URL)}`, "_blank");
  };

  if (phase === "capture") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center", padding: "8px 0" }}>
      <div style={{ fontSize: 56 }}>📸</div>
      <p style={{ fontSize: 18, fontWeight: 800, color: "#5a2d82", margin: 0, fontFamily: "var(--font-concert-one),'Concert One',cursive" }}>Make YOUR Poo Poo Face!</p>
      <p style={{ fontSize: 14, color: "#9b80c0", margin: 0, lineHeight: 1.5 }}>Take a photo and we&apos;ll turn it into<br />your very own Poo Poo Face artwork! 🎨</p>
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{ padding: "14px 32px", borderRadius: 50, backgroundColor: accentColor, color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif", boxShadow: `0 4px 20px ${accentColor}66` }}
      >
        📷 Take My Photo
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" capture="user" onChange={handleFile} style={{ display: "none" }} />
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#bba8d4", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>← Pick a character instead</button>
    </div>
  );

  if (phase === "processing") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
      {previewUrl && <img src={previewUrl} alt="Your photo" style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", border: `3px solid ${accentColor}`, opacity: 0.7 }} />}
      <div style={{ fontSize: 40, animation: "adventureFloat 1s ease-in-out infinite" }}>🎨</div>
      <p style={{ fontSize: 16, fontWeight: 700, color: "#5a2d82", margin: 0, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Creating your Poo Poo Face artwork…</p>
      <p style={{ fontSize: 13, color: "#bba8d4", margin: 0 }}>This takes about 15–20 seconds ✨</p>
    </div>
  );

  if (phase === "error") return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
      <div style={{ fontSize: 48 }}>😬</div>
      <p style={{ fontSize: 15, color: "#c0392b", margin: 0 }}>{errMsg}</p>
      <button onClick={reset} style={{ padding: "10px 24px", borderRadius: 50, backgroundColor: accentColor, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Try Again</button>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#bba8d4", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>← Pick a character instead</button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
      {resultUrl && <img src={resultUrl} alt="Your Poo Poo Face artwork" style={{ width: "100%", maxWidth: 320, borderRadius: 20, border: `3px solid ${accentColor}66`, boxShadow: `0 8px 32px ${accentColor}44` }} />}
      <p style={{ fontSize: 18, fontWeight: 800, color: "#5a2d82", margin: 0, fontFamily: "var(--font-concert-one),'Concert One',cursive" }}>🧒 YOUR Poo Poo Face!</p>
      <p style={{ fontSize: 14, color: "#9b80c0", margin: 0 }}>Everybody makes it. Even you. 😂</p>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={handleSave} style={{ padding: "11px 22px", borderRadius: 50, backgroundColor: accentColor, color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
          💾 Save to Photos
        </button>
        <button onClick={handleShare} style={{ padding: "11px 22px", borderRadius: 50, backgroundColor: "transparent", color: accentColor, fontWeight: 700, fontSize: 14, border: `2px solid ${accentColor}`, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
          📤 Share
        </button>
      </div>

      {/* Fallback platform links (shown if no native share) */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 2 }}>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_MSG)}&url=${encodeURIComponent(BOOK_URL)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#9b80c0", textDecoration: "underline", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Share on X</a>
        <span style={{ color: "#ddd" }}>·</span>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(BOOK_URL)}&quote=${encodeURIComponent(SHARE_MSG)}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#9b80c0", textDecoration: "underline", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Facebook</a>
      </div>

      <button onClick={reset} style={{ background: "none", border: "none", color: "#bba8d4", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif", marginTop: 4 }}>Try again →</button>
    </div>
  );
}

function PooPooFaceGame({ accentColor }: { accentColor: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [youMode, setYouMode] = useState(false);

  const handlePick = (i: number) => {
    setSelected(i);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 400);
  };

  const animal = selected !== null ? ANIMALS[selected] : null;

  if (youMode) return <YouPooPooFace accentColor={accentColor} onBack={() => setYouMode(false)} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      {/* Inspiration gallery — 12 individual mirror faces from the book */}
      <div style={{ width: "100%", textAlign: "center" }}>
        <p style={{
          fontSize: "clamp(13px, 2vw, 15px)",
          color: "#7b3fa0",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          margin: "0 0 10px 0",
          fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
        }}>✨ Swipe for Inspiration — Faces from the Book</p>
        <div style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          padding: "4px 8px 16px 8px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          flexWrap: "nowrap",
          msOverflowStyle: "none",
        }}>
          {Array.from({ length: 12 }, (_, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <div key={n} style={{ flex: "0 0 auto" }}>
                <img
                  src={`/images/poo-faces/face-${n}.png`}
                  alt={`Poo poo face ${n}`}
                  style={{ height: 160, width: "auto", display: "block" }}
                />
              </div>
            );
          })}
        </div>
        {/* Thin divider below gallery */}
        <div style={{ height: 2, background: "linear-gradient(90deg, transparent 0%, #b97ee0 30%, #fff 50%, #b97ee0 70%, transparent 100%)", margin: "4px auto 4px auto", width: "80%", borderRadius: 2 }} />
      </div>

      {/* Animal picker grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        {ANIMALS.map((a, i) => (
          <button
            key={a.name}
            onClick={() => handlePick(i)}
            style={{
              padding: "10px 18px",
              borderRadius: 50,
              border: `2px solid ${selected === i ? accentColor : accentColor + "55"}`,
              backgroundColor: selected === i ? accentColor + "22" : "transparent",
              color: "#5a2d82",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
              transition: "all 0.2s ease",
            }}
          >
            {a.emoji} {a.name}
          </button>
        ))}
        {/* YOU button — special camera flow */}
        <button
          onClick={() => setYouMode(true)}
          style={{
            padding: "10px 18px",
            borderRadius: 50,
            border: `2px solid ${accentColor}`,
            backgroundColor: accentColor + "22",
            color: "#5a2d82",
            fontWeight: 800,
            fontSize: 15,
            cursor: "pointer",
            fontFamily: "var(--font-catamaran),'Catamaran',sans-serif",
            transition: "all 0.2s ease",
            boxShadow: `0 2px 12px ${accentColor}44`,
          }}
        >
          📸 YOU
        </button>
      </div>

      {/* Result reveal */}
      {animal && (
        <div
          style={{
            marginTop: 8,
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(0.85)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <img
            src={animal.image}
            alt={`${animal.name}'s Poo Poo Face`}
            style={{ height: 200, width: "auto", maxWidth: "100%", objectFit: "contain", marginBottom: 12, display: "block", margin: "0 auto 12px auto" }}
          />
          <p style={{ fontSize: 18, fontWeight: 800, color: "#5a2d82", marginBottom: 8, fontFamily: "var(--font-concert-one),'Concert One',cursive" }}>
            {animal.emoji} {animal.name}&apos;s Poo Poo Face!
          </p>
          <p style={{ fontSize: 15, color: "#7B6898", lineHeight: 1.5, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
            {animal.caption}
          </p>
          <button
            onClick={() => { setSelected(null); setRevealed(false); }}
            style={{ marginTop: 16, background: "none", border: "none", color: accentColor, fontWeight: 700, fontSize: 13, cursor: "pointer", textDecoration: "underline", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}
          >
            Try another →
          </button>
        </div>
      )}

      {!animal && (
        <p style={{ color: "#bba8d4", fontSize: 14, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
          👆 Pick a character — or tap 📸 YOU for your own!
        </p>
      )}
    </div>
  );
}

export default function BookActivity({ slug, accentColor, transparent, textLight }: BookActivityProps) {
  const wrap = (title: string, emoji: string, child: React.ReactNode) => (
    <section
      style={{ padding: "72px 24px" }}
      className={transparent ? undefined : "section-activity"}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060",
            marginBottom: 10,
            fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
          }}
        >
          {emoji} Fun Activity
        </p>
        <h2
          style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(28px, 5vw, 48px)",
            color: textLight ? "#ffffff" : "#1a1060",
            marginBottom: 28,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {child}
      </div>
    </section>
  );

  if (slug === "dream-ideas")
    return (
      <section className="dream-activities-section" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 0, flexWrap: "wrap" }}>

          {/* ── Left: Counting Sheep ── */}
          <div className="amber-activity-left" style={{ flex: "1 1 320px", padding: "0 40px 0 0", minWidth: 280 }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", textAlign: "center" }}>
              🐑 Fun Activity
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 24, lineHeight: 1.2, textAlign: "center" }}>
              Counting Sheep!
            </h2>
            <CountingSheep accentColor={accentColor} />
          </div>

          {/* ── Divider ── */}
          <div style={{
            width: 1,
            alignSelf: "stretch",
            background: `linear-gradient(to bottom, transparent, ${accentColor}55 18%, ${accentColor}55 82%, transparent)`,
            margin: "0 8px",
            flexShrink: 0,
          }} className="amber-activity-divider" />

          {/* ── Right: Dream Idea ── */}
          <div className="amber-activity-right" style={{ flex: "1 1 320px", padding: "0 0 0 40px", minWidth: 280, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left" }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", textAlign: "center", width: "100%" }}>
              💡 Fun Activity
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 24, lineHeight: 1.2, textAlign: "center", width: "100%" }}>
              What&apos;s YOUR Dream Idea?
            </h2>
            <DreamIdeasActivity accentColor={accentColor} textLight={textLight} />
          </div>

        </div>
      </section>
    );

  if (slug === "gilroys-gobble")
    return wrap("Your confidence chant!", "🦃", <GilroyAffirmation accentColor={accentColor} />);

  if (slug === "the-lumpiest-pumpkin")
    return wrap("Pumpkin Studio!", "🎃", <PumpkinStudio accentColor={accentColor} />);

  if (slug === "the-shut-in-button")
    return wrap("Design Your Outfit!", "✨", <OutfitDesigner accentColor={accentColor} />);

  if (slug === "what-a-doodle-do")
    return wrap("Your morning cheer!", "🐓", <DoodleDoActivity accentColor={accentColor} />);

  if (slug === "one-tom-turkey")
    return wrap("Sing Along! \u2014 Tom Turkey\u2019s Song", "\U0001F983", <TomTurkeySingAlong accentColor={accentColor} />);

  if (slug === "finding-hampton")
    return wrap("Where would YOU look for Hampton?", "🎈", (
      <TextInputActivity
        prompt="Hampton is lost somewhere magical. If you were going to find him, where would you look first?"
        placeholder="I would look in..."
        buttonLabel="Search! 🔍"
        responseTemplate={(i) =>
          `"${i}" — brilliant choice! Hampton would DEFINITELY hide there. He loves cozy, surprising spots. Go check right away! 🎈`
        }
        accentColor={accentColor}
        textColor={textLight ? "rgba(255,255,255,0.9)" : "#1b3a1e"}
      />
    ));

  if (slug === "ollie-come-home")
    return wrap("Help Ollie find his way home!", "🐱", (
      <TextInputActivity
        prompt="Ollie is lost outside for the very first time! What's the first thing you'd do to help him find his way back?"
        placeholder="I would..."
        buttonLabel="Help Ollie! 🐱"
        responseTemplate={(i) =>
          `"${i}" — Ollie would love that! He's a little scared but mostly just wants his warm cozy bed back. You're a great adventure buddy. 🏡`
        }
        accentColor={accentColor}
        textColor={textLight ? "rgba(255,255,255,0.9)" : "#1a2a1a"}
      />
    ));

  if (slug === "frog-a-dog")
    return wrap("If YOU were a frog-dog, what would you do?", "🐸", (
      <TextInputActivity
        prompt="You wake up and discover you're half frog, half dog. What's the very first thing you do?"
        placeholder="The first thing I'd do is..."
        buttonLabel="RIBBIT! 🐸"
        responseTemplate={(i) =>
          `"${i}"! Classic frog-dog behavior. Bailey would be so proud. You've really got that amphibian-canine energy down perfectly. 🐸🐶`
        }
        accentColor={accentColor}
        textColor={textLight ? "rgba(255,255,255,0.9)" : "#1a3a2a"}
      />
    ));

// ── Brian: AI-powered haunt reply ────────────────────────────────────────────
function BrianHauntActivity({ accentColor, textColor }: { accentColor: string; textColor?: string }) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const fallback = (i: string) =>
    `Ooooh, ${i}! Brian says that's the friendliest haunting he's ever heard of — he'd float right in and wave at everyone. 👻✨`;

  async function submit() {
    const val = input.trim();
    if (!val) return;
    setLoading(true);
    setReply("");
    try {
      const res = await fetch("/api/brian-haunt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: val }),
      });
      const data = await res.json();
      setReply(data.reply || fallback(val));
    } catch {
      setReply(fallback(val));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
      <p style={{ fontSize: 16, color: textColor ?? "rgba(255,255,255,0.9)", lineHeight: 1.55, margin: 0 }}>
        Brian the Ghost haunts with kindness — just lots of friendly waving. If you were a ghost, what would YOU haunt?
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && submit()}
          placeholder="I would haunt..."
          disabled={loading}
          style={{
            flex: "1 1 200px",
            padding: "10px 16px",
            borderRadius: 12,
            border: `2px solid ${accentColor}`,
            fontSize: 15,
            outline: "none",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            background: "rgba(255,255,255,0.07)",
            color: "#fff",
          }}
        />
        <button
          onClick={submit}
          disabled={!input.trim() || loading}
          style={{
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            backgroundColor: loading ? `${accentColor}88` : accentColor,
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            cursor: input.trim() && !loading ? "pointer" : "not-allowed",
            fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "👻 Thinking…" : "BOO! (nicely) 👻"}
        </button>
      </div>
      {reply && (
        <div style={{
          padding: "14px 18px",
          borderRadius: 14,
          background: "rgba(155,111,208,0.18)",
          border: `1.5px solid ${accentColor}66`,
          fontSize: 15,
          color: "rgba(255,255,255,0.92)",
          lineHeight: 1.6,
          fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
          animation: "bookFadeIn 0.4s ease forwards",
        }}>
          {reply}
        </div>
      )}

      {/* Thin separator */}
      <div className="brian-haunt-divider" style={{
        height: 1,
        background: "linear-gradient(to right, transparent, rgba(155,111,208,0.5) 20%, rgba(155,111,208,0.5) 80%, transparent)",
        margin: "24px 0",
      }} />

      {/* Halloween countdown — bare style, matches section heading size */}
      <div>
        <HalloweenCountdown bare />
      </div>
    </div>
  );
}

  if (slug === "brian-the-ghost")
    return (
      <section className="amber-activities-section" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 0, flexWrap: "wrap" }}>
          <div className="amber-activity-left" style={{ flex: "1 1 320px", padding: "0 40px 0 0", minWidth: 280, textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif" }}>
              👻 Fun Activity
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 24, lineHeight: 1.2 }}>
              What would YOU haunt?
            </h2>
            <BrianHauntActivity
              accentColor={accentColor}
              textColor={textLight ? "rgba(255,255,255,0.9)" : "#2d1260"}
            />
          </div>

          {/* ── Divider ── */}
          <div style={{
            width: 1,
            alignSelf: "stretch",
            background: `linear-gradient(to bottom, transparent, ${accentColor}55 18%, ${accentColor}55 82%, transparent)`,
            margin: "0 8px",
            flexShrink: 0,
          }} className="amber-activity-divider" />

          {/* ── Right: How We Created Brian video ── */}
          <div className="amber-activity-right" style={{ flex: "1 1 320px", padding: "0 0 0 40px", minWidth: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", textAlign: "center" }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif" }}>
              🎬 Behind the Scenes
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 16, lineHeight: 1.2 }}>
              How We Created Brian
            </h2>
            <p style={{ fontSize: 15, color: textLight ? "rgba(255,255,255,0.75)" : "#5a4a7a", lineHeight: 1.65, marginBottom: 20, fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
              Watch the magic happen — from the very first pencil strokes to the friendly little ghost who stole every kid&apos;s heart. 🖊️✨
            </p>
            <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: `0 8px 32px ${accentColor}44, 0 0 0 2px ${accentColor}33`, width: "100%" }}>
              <video
                controls
                playsInline
                style={{ width: "100%", display: "block" }}
                poster="/images/books/brian-the-ghost.jpg"
              >
                <source src="/videos/brian.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

        </div>
      </section>
    );

  if (slug === "amber-the-dragon-keeper")
    return (
      <section className="amber-activities-section" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 0, flexWrap: "wrap" }}>

          {/* ── Left: Diamond Catch ── */}
          <div className="amber-activity-left" style={{ flex: "1 1 320px", padding: "0 40px 0 0", minWidth: 280 }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", textAlign: "center" }}>
              💎 Fun Activity
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 24, lineHeight: 1.2, textAlign: "center" }}>
              Catch Cinnamon&apos;s Diamonds!
            </h2>
            <AmberDiamondCatch accentColor={accentColor} textLight={textLight} />
          </div>

          {/* ── Divider — fades in/out so it doesn't run full height ── */}
          <div style={{
            width: 1,
            alignSelf: "stretch",
            background: `linear-gradient(to bottom, transparent, ${accentColor}55 18%, ${accentColor}55 82%, transparent)`,
            margin: "0 8px",
            flexShrink: 0,
          }} className="amber-activity-divider" />

          {/* ── Right: Dragon Creator ── */}
          <div className="amber-activity-right" style={{ flex: "1 1 320px", padding: "0 0 0 40px", minWidth: 280, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left" }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", textAlign: "center", width: "100%" }}>
              🐉 Fun Activity
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 24, lineHeight: 1.2, textAlign: "center", width: "100%" }}>
              Create Your Own Dragon!
            </h2>
            <AmberDragonCreator accentColor={accentColor} textLight={textLight} />
          </div>

        </div>
      </section>
    );

  if (slug === "whats-your-poo-poo-face")
    return (
      <section className="poo-activities-section" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9B6FD0", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif", textAlign: "center" }}>
            😂 Fun Activity
          </p>
          <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: "#5a2d82", marginBottom: 8, lineHeight: 1.2, textAlign: "center" }}>
            What&apos;s YOUR Poo Poo Face?
          </h2>
          <p style={{ fontSize: 14, color: "#7B6898", textAlign: "center", marginBottom: 28, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
            Pick a character and find out what face they make! 🎭
          </p>
          <PooPooFaceGame accentColor={accentColor} />
        </div>
      </section>
    );

  // Poo Poo Face has full BookReader — no activity needed
  return null;
}
