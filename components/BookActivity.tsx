"use client";

import { useState, useRef, useEffect } from "react";
import CountingSheep from "@/components/games/CountingSheep";

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
  const tc = textLight ? "rgba(255,255,255,0.9)" : "#2d0a3a";

  function reset() { setStep(0); setChosenColor(null); setChosenPower(null); setChosenSize(null); setDragonName(""); setCreated(false); }

  if (created && chosenColor && chosenPower && chosenSize) {
    const name = dragonName.trim() || "your dragon";
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
        <div style={{ fontSize: 60 }}>🐉</div>
        <h3 style={{ fontFamily: "var(--font-concert-one),'Concert One',cursive", fontSize: 30, color: chosenColor.hex, margin: 0, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          {dragonName.trim() || "Your Dragon"}
        </h3>
        <div style={{ background: `linear-gradient(135deg, ${chosenColor.hex}22, ${chosenColor.hex}44)`, border: `2px solid ${chosenColor.hex}88`, borderRadius: 16, padding: "20px 24px", maxWidth: 480, textAlign: "left" }}>
          <p style={{ fontSize: 15, color: textLight ? "rgba(255,255,255,0.92)" : "#2d0a3a", lineHeight: 1.75, margin: 0 }}>
            Deep in the Dragon Mountains of Sydar lives <strong>{name}</strong> — a {chosenSize.emoji} {chosenSize.label.toLowerCase()} dragon with gleaming {chosenColor.label.toLowerCase()} scales who {chosenPower.desc} {chosenPower.emoji}.<br /><br />
            Amber herself has heard whispers of this dragon. <em>&ldquo;{name} is extraordinary,&rdquo;</em> she smiled. <em>&ldquo;With {chosenPower.label.toLowerCase()} powers like that, I think we&apos;re going to be the greatest dragon team in all of Sydar.&rdquo;</em><br /><br />
            Every creature in the land knows {name}&apos;s name. And now — so does the Dragon Keeper. 🌟
          </p>
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
              onKeyDown={e => e.key === "Enter" && setCreated(true)}
              placeholder="My dragon's name is..."
              style={{ flex: "1 1 180px", padding: "12px 16px", borderRadius: 12, border: `2px solid ${accentColor}`, fontSize: 15, outline: "none", backgroundColor: "rgba(255,255,255,0.9)", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", color: "#2d0a3a" }}
            />
            <button onClick={() => setCreated(true)}
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
  { name: "Dragon",    emoji: "🐉", face: "😤", caption: "Steam comes out the nose. Every. Single. Time." },
  { name: "Unicorn",   emoji: "🦄", face: "😬", caption: "Tries to look majestic. Fails spectacularly." },
  { name: "T-Rex",     emoji: "🦖", face: "😳", caption: "Tiny arms. Can't reach. Maximum struggle face." },
  { name: "Elephant",  emoji: "🐘", face: "😮", caption: "The trunk does NOT help in this situation." },
  { name: "Cat",       emoji: "🐱", face: "😒", caption: "Deeply judging everyone within a 3-mile radius." },
  { name: "Dog",       emoji: "🐶", face: "🥴", caption: "Spins around 47 times first. Then the face." },
  { name: "Penguin",   emoji: "🐧", face: "😦", caption: "Stands very still. Eyes go very wide. Very wide." },
  { name: "Sloth",     emoji: "🦥", face: "😪", caption: "Takes so long. The face lasts 20 minutes." },
  { name: "YOU",       emoji: "🧒", face: "😖", caption: "You know the face. We ALL know the face. 😂" },
];

function PooPooFaceGame({ accentColor }: { accentColor: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handlePick = (i: number) => {
    setSelected(i);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 400);
  };

  const animal = selected !== null ? ANIMALS[selected] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
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
      </div>

      {/* Result reveal */}
      {animal && (
        <div
          style={{
            marginTop: 8,
            padding: "28px 32px",
            borderRadius: 24,
            background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
            border: `2px solid ${accentColor}44`,
            textAlign: "center",
            maxWidth: 420,
            width: "100%",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "scale(1)" : "scale(0.85)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 8 }}>{animal.face}</div>
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
            Try another animal →
          </button>
        </div>
      )}

      {!animal && (
        <p style={{ color: "#bba8d4", fontSize: 14, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
          👆 Pick an animal above to see their face!
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
    return wrap("Which pumpkin are you?", "🎃", <PumpkinQuiz accentColor={accentColor} textLight={textLight} />);

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

  if (slug === "brian-the-ghost")
    return (
      <section className="amber-activities-section" style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 0, flexWrap: "wrap" }}>

          {/* ── Left: What would YOU haunt? ── */}
          <div className="amber-activity-left" style={{ flex: "1 1 320px", padding: "0 40px 0 0", minWidth: 280 }}>
            <p style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: textLight ? "rgba(255,255,255,0.8)" : "#1a1060", marginBottom: 10, fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif" }}>
              👻 Fun Activity
            </p>
            <h2 style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", fontSize: "clamp(22px, 3.5vw, 36px)", color: textLight ? "#ffffff" : "#1a1060", marginBottom: 24, lineHeight: 1.2 }}>
              What would YOU haunt?
            </h2>
            <TextInputActivity
              prompt="Brian the Ghost haunts with kindness — just lots of friendly waving. If you were a ghost, what would YOU haunt?"
              placeholder="I would haunt..."
              buttonLabel="BOO! (nicely) 👻"
              responseTemplate={(i) =>
                `"${i}"! Brian approves. He'd probably float by and wave at everyone there too. The friendliest haunting in St. Germaine history. 👻✨`
              }
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
          <div className="amber-activity-right" style={{ flex: "1 1 320px", padding: "0 0 0 40px", minWidth: 280, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
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
