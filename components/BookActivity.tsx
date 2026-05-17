"use client";

import { useState } from "react";

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

function DreamIdeasActivity({ accentColor }: { accentColor: string }) {
  const [dream, setDream] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {!submitted ? (
        <>
          <p style={{ fontSize: 16, lineHeight: 1.5, color: "#1a1060" }}>
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
              border: `2px solid ${accentColor}`,
              fontSize: 16,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={() => dream.trim() && setSubmitted(true)}
            disabled={!dream.trim()}
            style={{
              alignSelf: "flex-start",
              padding: "10px 24px",
              borderRadius: 50,
              backgroundColor: dream.trim() ? accentColor : "#ccc",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              border: "none",
              cursor: dream.trim() ? "pointer" : "not-allowed",
              transition: "background-color 0.2s",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
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
          padding: "20px 24px",
          borderRadius: 16,
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
          border: `2px solid ${accentColor}`,
          textAlign: "center",
          minHeight: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
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

function PumpkinQuiz({ accentColor }: { accentColor: string }) {
  const [answer, setAnswer] = useState<number | null>(null);
  const qs = ["Smooth & perfect", "A little wobbly but shiny", "Totally lumpy but loveable"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontSize: 16, color: "#3e1a00", fontWeight: 600 }}>Which pumpkin are you? 🎃</p>
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

function ShutInButtonActivity({ accentColor }: { accentColor: string }) {
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
      <p style={{ fontSize: 16, color: "#0a2d61" }}>
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

// ── Main export ───────────────────────────────────────────────────────────────

interface BookActivityProps {
  slug: string;
  accentColor: string;
}

export default function BookActivity({ slug, accentColor }: BookActivityProps) {
  const wrap = (title: string, emoji: string, child: React.ReactNode) => (
    <section
      style={{ padding: "64px 24px" }}
      className="section-activity"
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: accentColor,
            marginBottom: 8,
            fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
          }}
        >
          {emoji} Fun Activity
        </p>
        <h2
          style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(22px, 4vw, 36px)",
            color: "#1a1060",
            marginBottom: 24,
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
    return wrap("What's YOUR dream idea?", "💡", <DreamIdeasActivity accentColor={accentColor} />);

  if (slug === "gilroys-gobble")
    return wrap("Your confidence chant!", "🦃", <GilroyAffirmation accentColor={accentColor} />);

  if (slug === "the-lumpiest-pumpkin")
    return wrap("Which pumpkin are you?", "🎃", <PumpkinQuiz accentColor={accentColor} />);

  if (slug === "the-shut-in-button")
    return wrap("What would YOUR magical button do?", "👆", <ShutInButtonActivity accentColor={accentColor} />);

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
        textColor="#1b3a1e"
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
        textColor="#1a2a1a"
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
        textColor="#1a3a2a"
      />
    ));

  if (slug === "brian-the-ghost")
    return wrap("What would YOU haunt?", "👻", (
      <TextInputActivity
        prompt="Brian the Ghost haunts with kindness — just lots of friendly waving. If you were a ghost, what would YOU haunt?"
        placeholder="I would haunt..."
        buttonLabel="BOO! (nicely) 👻"
        responseTemplate={(i) =>
          `"${i}"! Brian approves. He'd probably float by and wave at everyone there too. The friendliest haunting in St. Germaine history. 👻✨`
        }
        accentColor={accentColor}
        textColor="#2d1260"
      />
    ));

  // Amber and Poo Poo Face have full BookReader — no activity needed
  return null;
}
