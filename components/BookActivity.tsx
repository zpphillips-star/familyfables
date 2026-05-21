"use client";

import { useState, useRef, useEffect } from "react";
import CountingSheep from "@/components/games/CountingSheep";
import HalloweenCountdown from "@/components/HalloweenCountdown";

// ── Per-book activity definitions ─────────────────────────────────────────────

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

function PumpkinCarver({ accentColor }: { accentColor: string }) {
  const [sel, setSel] = useState<Record<FaceSlot, string>>({
    eyeL: "tri", eyeR: "tri", nose: "tri", mouth: "smile",
  });

  const pick = (slot: FaceSlot, id: string) => setSel(s => ({ ...s, [slot]: id }));

  const slots = Object.entries(SLOT_CONFIG) as [FaceSlot, typeof SLOT_CONFIG["eyeL"]][];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {/* SVG Pumpkin */}
      <svg viewBox="60 100 340 360" width={260} height={270} style={{ display: "block", filter: "drop-shadow(0 8px 24px rgba(180,80,0,0.35))" }}>
        <defs>
          <radialGradient id="pcGlow" cx="50%" cy="42%" r="52%">
            <stop offset="0%"   stopColor="#FFF176" />
            <stop offset="35%"  stopColor="#FFAA00" />
            <stop offset="75%"  stopColor="#E85000" />
            <stop offset="100%" stopColor="#7A1A00" />
          </radialGradient>
          <clipPath id="pcBody">
            <ellipse cx="230" cy="280" rx="78" ry="92" />
            <ellipse cx="163" cy="286" rx="63" ry="80" />
            <ellipse cx="297" cy="286" rx="63" ry="80" />
            <ellipse cx="110" cy="294" rx="46" ry="63" />
            <ellipse cx="350" cy="294" rx="46" ry="63" />
          </clipPath>
          <mask id="pcMask">
            <rect x="0" y="0" width="460" height="500" fill="white" />
            {slots.map(([slot, pos]) => {
              const opt = pos.opts.find(o => o.id === sel[slot]);
              if (!opt?.d) return null;
              return <path key={slot} d={opt.d} transform={`translate(${pos.x},${pos.y})`} fill="black" />;
            })}
          </mask>
        </defs>

        {/* Glow layer — always visible, clipped to pumpkin shape */}
        <g clipPath="url(#pcBody)">
          <rect x="0" y="0" width="460" height="500" fill="url(#pcGlow)" />
        </g>

        {/* Pumpkin body — carved holes reveal the glow */}
        <g clipPath="url(#pcBody)" mask="url(#pcMask)">
          <ellipse cx="230" cy="280" rx="78" ry="92" fill="#E8681A" />
          <ellipse cx="163" cy="286" rx="63" ry="80" fill="#D8600E" />
          <ellipse cx="297" cy="286" rx="63" ry="80" fill="#D8600E" />
          <ellipse cx="110" cy="294" rx="46" ry="63" fill="#C85510" />
          <ellipse cx="350" cy="294" rx="46" ry="63" fill="#C85510" />
          {/* Rib shadow lines */}
          <line x1="196" y1="194" x2="196" y2="366" stroke="#AA4408" strokeWidth="7" strokeLinecap="round" opacity="0.45" />
          <line x1="264" y1="194" x2="264" y2="366" stroke="#AA4408" strokeWidth="7" strokeLinecap="round" opacity="0.45" />
          <line x1="143" y1="228" x2="143" y2="355" stroke="#AA4408" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
          <line x1="317" y1="228" x2="317" y2="355" stroke="#AA4408" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
          {/* Highlight */}
          <ellipse cx="185" cy="220" rx="22" ry="32" fill="white" opacity="0.07" />
        </g>

        {/* Stem */}
        <rect x="222" y="168" width="16" height="36" rx="5" fill="#3b661c" />
        <path d="M229,172 Q246,152 260,160" stroke="#3b661c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M229,170 Q212,148 200,158" stroke="#4a7c25" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>

      {/* Shape pickers */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        {slots.map(([slot, pos]) => (
          <div key={slot} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#7b3fa0", textTransform: "uppercase", letterSpacing: "0.05em", width: 62, flexShrink: 0, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
              {pos.label}
            </span>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {pos.opts.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => pick(slot, opt.id)}
                  style={{
                    width: 34, height: 34, borderRadius: 7,
                    border: `2px solid ${sel[slot] === opt.id ? accentColor : "#ddd"}`,
                    backgroundColor: sel[slot] === opt.id ? accentColor + "22" : "rgba(255,255,255,0.8)",
                    cursor: "pointer", fontSize: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                    fontFamily: "system-ui",
                    boxShadow: sel[slot] === opt.id ? `0 2px 8px ${accentColor}44` : "none",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
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

function DoodleDoActivity({ accentColor }: { accentColor: string }) {
  const [idx, setIdx] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          padding: "20px 24px",
          borderRadius: 16,
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
          border: `2px solid ${accentColor}`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            color: "#3a1a00",
            lineHeight: 1.4,
          }}
        >
          {CHEERS[idx]}
        </p>
      </div>
      <button
        onClick={() => setIdx((i) => (i + 1) % CHEERS.length)}
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
        Another cheer! 🐓
      </button>
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
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#bba8d4", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>← Pick an animal instead</button>
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
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#bba8d4", fontSize: 13, cursor: "pointer", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>← Pick an animal instead</button>
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
          👆 Pick an animal — or tap 📸 YOU for your own!
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
    return wrap("Carve Your Pumpkin!", "🎃", (
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 260px", maxWidth: 320 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#7b3fa0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>🎨 Carve Your Own!</p>
          <PumpkinCarver accentColor={accentColor} />
        </div>
        <div style={{ flex: "1 1 240px", maxWidth: 320 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#7b3fa0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>🎃 Which pumpkin are you?</p>
          <PumpkinQuiz accentColor={accentColor} textLight={textLight} />
        </div>
      </div>
    ));

  if (slug === "the-shut-in-button")
    return wrap("What would YOUR magical button do?", "👆", <ShutInButtonActivity accentColor={accentColor} textLight={textLight} />);

  if (slug === "what-a-doodle-do")
    return wrap("Your morning cheer!", "🐓", <DoodleDoActivity accentColor={accentColor} />);

  if (slug === "one-tom-turkey")
    return wrap("Tom's Thanksgiving Countdown", "🦃", <ThanksgivingCountdown accentColor={accentColor} />);

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
            Pick an animal and find out what face they make! 🐾
          </p>
          <PooPooFaceGame accentColor={accentColor} />
        </div>
      </section>
    );

  // Poo Poo Face has full BookReader — no activity needed
  return null;
}
