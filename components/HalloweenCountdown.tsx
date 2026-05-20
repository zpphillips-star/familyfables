"use client";

import { useEffect, useState } from "react";

function getNextHalloween(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const halloween = new Date(year, 9, 31, 0, 0, 0); // Oct 31
  if (now >= halloween) halloween.setFullYear(year + 1);
  return halloween;
}

function calcTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function HalloweenCountdown({
  theme = "dark",
  bare = false,
}: {
  theme?: "dark" | "light";
  bare?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(getNextHalloween()));

  useEffect(() => {
    const target = getNextHalloween();
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  const isLight = theme === "light";

  // bare = no box, large heading to match section title, fits flush in left column
  if (bare) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            color: "#ff9c1a",
            lineHeight: 1.2,
            marginBottom: 20,
          }}
        >
          🎃 Halloween Countdown
        </h2>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          {units.map(({ label, value }) => (
            <div
              key={label}
              style={{
                textAlign: "center",
                minWidth: 60,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                  fontSize: "clamp(28px, 5vw, 42px)",
                  color: "#ff9c1a",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {String(value).padStart(2, "0")}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.55)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginTop: 5,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: isLight ? 40 : 28,
        marginBottom: isLight ? 8 : 0,
        padding: isLight ? "24px 28px" : "18px 20px",
        borderRadius: 20,
        background: isLight ? "rgba(255,140,0,0.07)" : "rgba(0,0,0,0.35)",
        backdropFilter: isLight ? undefined : "blur(8px)",
        border: isLight ? "2px solid rgba(255,140,0,0.25)" : "1.5px solid rgba(255,165,0,0.4)",
        display: "inline-block",
        textAlign: "center" as const,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-concert-one), 'Concert One', cursive",
          fontSize: 13,
          color: isLight ? "#c05c00" : "rgba(255,200,80,0.9)",
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        🎃 Halloween Countdown
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {units.map(({ label, value }) => (
          <div
            key={label}
            style={{
              textAlign: "center",
              minWidth: 54,
              background: isLight ? "rgba(255,140,0,0.10)" : "rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: "8px 10px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 4vw, 32px)",
                color: isLight ? "#e07000" : "#ff9c1a",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {String(value).padStart(2, "0")}
            </div>
            <div
              style={{
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                fontSize: 11,
                color: isLight ? "rgba(100,40,0,0.65)" : "rgba(255,255,255,0.65)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: 4,
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
