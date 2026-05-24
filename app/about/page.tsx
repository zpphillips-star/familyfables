import Link from "next/link";
import { AMAZON_STORE_URL } from "@/lib/books";
import type { Metadata } from "next";
import HiddenAboutSecret from "@/components/HiddenAboutSecret";

export const metadata: Metadata = {
  title: "About Us — Family Fables",
  description:
    "The story behind Family Fables — how Z.P. Phillips honored his grandfather Victor Plotkin's creative legacy by founding a children's book company.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#050212" }}>
      <style>{`
        @keyframes adventureFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%       { opacity: 0.9; transform: scale(1.3); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .about-float { animation: adventureFloat 5s ease-in-out infinite; }
        .about-twinkle { animation: twinkle 2.8s ease-in-out infinite; }
        .about-fade-up { animation: fadeUp 0.8s ease-out both; }
        .about-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          backdrop-filter: blur(8px);
        }
        .about-timeline-step {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          transition: background 0.2s;
        }
        .about-timeline-step:hover {
          background: rgba(255,255,255,0.07);
        }
        .about-mission-item {
          background: rgba(255,255,255,0.04);
          border-radius: 14px;
          border-left: 3px solid;
        }
        .about-btn-primary {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 50px;
          background: #ff9c1a;
          color: #fff;
          font-weight: 900;
          font-size: 16px;
          text-decoration: none;
          box-shadow: 0 6px 24px rgba(255,156,26,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .about-btn-primary:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 10px 32px rgba(255,156,26,0.5);
        }
        .about-btn-secondary {
          display: inline-block;
          padding: 14px 32px;
          border-radius: 50px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.25);
          transition: background 0.2s, transform 0.2s;
        }
        .about-btn-secondary:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-2px);
        }
        .wave-about {
          display: block;
          width: 100%;
          height: 64px;
          margin-bottom: -2px;
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "70vh",
          background: "linear-gradient(170deg, #050212 0%, #0d0440 35%, #1a0a5a 65%, #2d1280 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 120px",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Stars */}
        {[
          { top: "8%",  left: "7%",  size: 10, delay: "0s" },
          { top: "15%", left: "82%", size: 6,  delay: "0.8s" },
          { top: "35%", left: "4%",  size: 8,  delay: "1.4s" },
          { top: "55%", left: "91%", size: 7,  delay: "0.4s" },
          { top: "70%", left: "15%", size: 5,  delay: "2s"   },
          { top: "22%", left: "48%", size: 6,  delay: "1.1s" },
          { top: "80%", left: "68%", size: 9,  delay: "0.6s" },
          { top: "45%", left: "75%", size: 5,  delay: "1.7s" },
        ].map((s, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute",
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.6,
            animationDelay: s.delay,
            pointerEvents: "none",
          }} className="about-twinkle" />
        ))}

        {/* Floating emojis */}
        {[
          { e: "📖", top: "12%", left: "10%",  size: 36, delay: "0s",   dur: "5s"   },
          { e: "✨", top: "18%", left: "85%",  size: 28, delay: "1.2s", dur: "4.2s" },
          { e: "🪲", top: "62%", left: "6%",   size: 30, delay: "0.6s", dur: "6s"   },
          { e: "🌟", top: "70%", left: "88%",  size: 26, delay: "1.8s", dur: "4.8s" },
          { e: "💜", top: "40%", left: "93%",  size: 22, delay: "0.3s", dur: "5.5s" },
          { e: "📚", top: "82%", left: "22%",  size: 28, delay: "1s",   dur: "4.5s" },
        ].map((item, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute",
            top: item.top, left: item.left,
            fontSize: item.size,
            opacity: 0.35,
            animation: `adventureFloat ${item.dur} ease-in-out infinite ${item.delay}`,
            pointerEvents: "none",
          }} />
        ))}
        {[
          { e: "📖", top: "12%", left: "10%",  size: 36, delay: "0s",   dur: "5s"   },
          { e: "✨", top: "18%", left: "85%",  size: 28, delay: "1.2s", dur: "4.2s" },
          { e: "🪲", top: "62%", left: "6%",   size: 30, delay: "0.6s", dur: "6s"   },
          { e: "🌟", top: "70%", left: "88%",  size: 26, delay: "1.8s", dur: "4.8s" },
          { e: "💜", top: "40%", left: "93%",  size: 22, delay: "0.3s", dur: "5.5s" },
          { e: "📚", top: "82%", left: "22%",  size: 28, delay: "1s",   dur: "4.5s" },
        ].map((item, i) => (
          <span key={`e-${i}`} aria-hidden="true" style={{
            position: "absolute",
            top: item.top, left: item.left,
            fontSize: item.size,
            opacity: 0.35,
            animation: `adventureFloat ${item.dur} ease-in-out infinite ${item.delay}`,
            pointerEvents: "none",
          }}>{item.e}</span>
        ))}

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }} className="about-fade-up">
          <p style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: "#b388ff",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}>
            Chapter One
          </p>
          <h1 style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(38px, 8vw, 80px)",
            lineHeight: 1.05,
            margin: "0 0 20px",
            textShadow: "0 4px 24px rgba(100,50,200,0.7)",
          }}>
            <span style={{
              background: "linear-gradient(90deg, #b388ff, #ff8fab, #ffd740, #69f0ae)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Every Story
            </span>
            <br />
            <span style={{ color: "#ffffff" }}>Starts Somewhere</span>
          </h1>
          <p style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "rgba(210,190,255,0.85)",
            fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            lineHeight: 1.6,
            maxWidth: 480,
            margin: "0 auto",
          }}>
            Ours started with a boy from Brooklyn, a notebook full of poems,
            and a family that refused to let his stories go untold.
          </p>
        </div>

        {/* Bottom wave */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="wave-about" aria-hidden="true">
            <path d="M0,32 C180,8 360,56 540,32 C720,8 900,56 1080,32 C1260,8 1380,48 1440,32 L1440,64 L0,64 Z"
              fill="#0d0835" />
          </svg>
        </div>
      </section>

      {/* ── VICTOR'S STORY ────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #0d0835 0%, #120848 100%)",
        padding: "80px 24px",
        position: "relative",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Section label */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{
              display: "inline-block",
              background: "rgba(179,136,255,0.12)",
              border: "1px solid rgba(179,136,255,0.3)",
              borderRadius: 999,
              padding: "6px 20px",
              fontSize: 12,
              fontWeight: 700,
              color: "#b388ff",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              The Origin Story
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "start",
          }}>

            {/* Victor card */}
            <div className="about-card" style={{ padding: 36, textAlign: "center" }}>
              <div style={{
                fontSize: 72,
                marginBottom: 16,
                filter: "drop-shadow(0 0 16px rgba(244,168,57,0.6))",
                animation: "adventureFloat 5.5s ease-in-out infinite",
              }}>🪲</div>
              <h2 style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: 28,
                color: "#ffffff",
                marginBottom: 6,
              }}>Victor Plotkin</h2>
              <p style={{ fontSize: 13, color: "#b388ff", fontWeight: 600, marginBottom: 16, letterSpacing: "0.05em" }}>
                Brooklyn, NY &nbsp;·&nbsp; Poet &nbsp;·&nbsp; Songwriter &nbsp;·&nbsp; Storyteller
              </p>
              <div style={{
                background: "rgba(244,168,57,0.08)",
                border: "1px solid rgba(244,168,57,0.25)",
                borderRadius: 14,
                padding: "14px 18px",
              }}>
                <p style={{ fontSize: 13, color: "#c8b4e8", margin: 0, lineHeight: 1.6 }}>
                  <strong style={{ color: "#F4A839" }}>The Immortal Firefly</strong>
                  <br />
                  <span style={{ fontSize: 11, opacity: 0.7 }}>Published posthumously — the book that started it all.</span>
                </p>
              </div>
              <p style={{
                marginTop: 20,
                fontSize: 13,
                color: "rgba(200,180,232,0.6)",
                fontStyle: "italic",
                lineHeight: 1.5,
              }}>
                Forever our inspiration.
              </p>
            </div>

            {/* Story text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(26px, 4vw, 36px)",
                color: "#ffffff",
                lineHeight: 1.2,
                margin: 0,
              }}>
                It Started With a Boy From Brooklyn
              </h2>
              <p style={{ color: "rgba(210,190,255,0.8)", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
                Long before Family Fables existed, there was a boy growing up in Brooklyn,
                New York. His name was <strong style={{ color: "#ffffff" }}>Victor Plotkin</strong> —
                a creative, imaginative soul with a gift for words. Throughout his entire life, Victor
                wrote poems, composed songs, and crafted stories that delighted everyone around him.
              </p>
              <p style={{ color: "rgba(210,190,255,0.8)", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
                But despite his remarkable talent, Victor never published his work. His words lived
                in notebooks, in memories, and in the hearts of his family — never reaching the
                wider world that would have loved them.
              </p>

              {/* Pullquote */}
              <div style={{
                borderLeft: "3px solid #b388ff",
                paddingLeft: 20,
                margin: "8px 0",
              }}>
                <p style={{
                  fontSize: 18,
                  fontStyle: "italic",
                  color: "#e0d0ff",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  &ldquo;A lifetime of creativity deserved to be shared with the world.
                  That&apos;s why Family Fables exists.&rdquo;
                </p>
                <p style={{ fontSize: 13, color: "#7b6898", marginTop: 8, fontWeight: 700 }}>
                  — Z.P. Phillips, Founder
                </p>
              </div>

              <p style={{ color: "rgba(210,190,255,0.8)", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
                After Victor passed away, his son <strong style={{ color: "#ffffff" }}>Warren</strong> made
                sure his father&apos;s stories would finally be heard — he published Victor&apos;s first
                children&apos;s book,{" "}
                <em style={{ color: "#b388ff" }}>The Immortal Firefly</em>. That was the spark.
              </p>
            </div>
          </div>
        </div>

        {/* Wave down */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="wave-about" aria-hidden="true">
            <path d="M0,20 C240,52 480,4 720,36 C960,64 1200,10 1440,40 L1440,64 L0,64 Z"
              fill="#0a0628" />
          </svg>
        </div>
      </section>

      {/* ── Z.P. PHILLIPS ─────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #0a0628 0%, #150e40 100%)",
        padding: "80px 24px",
        position: "relative",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{
              display: "inline-block",
              background: "rgba(255,139,171,0.1)",
              border: "1px solid rgba(255,139,171,0.3)",
              borderRadius: 999,
              padding: "6px 20px",
              fontSize: 12,
              fontWeight: 700,
              color: "#ff8fab",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Carrying the Torch
            </span>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 32,
            alignItems: "start",
          }}>

            {/* Story text */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <h2 style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(26px, 4vw, 36px)",
                color: "#ffffff",
                lineHeight: 1.2,
                margin: 0,
              }}>
                A Grandson With a Mission
              </h2>
              <p style={{ color: "rgba(210,190,255,0.8)", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
                <strong style={{ color: "#ffffff" }}>Z.P. Phillips</strong>, Victor&apos;s grandson,
                saw an opportunity to honor his grandfather&apos;s memory in the most meaningful way
                possible — by founding <strong style={{ color: "#ff8fab" }}>Family Fables</strong>.
              </p>
              <p style={{ color: "rgba(210,190,255,0.8)", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
                The mission: bring genuine joy to children through wonderful storytelling, create
                books that families would treasure for generations, and provide a platform for
                illustrators, writers, and creative souls to share their gifts with the world.
              </p>
              <p style={{ color: "rgba(210,190,255,0.8)", lineHeight: 1.8, fontSize: 16, margin: 0 }}>
                Every Family Fables book carries a piece of that original spirit — whether it&apos;s
                the goofy joy of{" "}
                <em style={{ color: "#ffd740" }}>What&apos;s Your Poo Poo Face</em>, the
                whimsical adventure of{" "}
                <em style={{ color: "#ff8fab" }}>Amber The Dragon Keeper</em>, or the
                warm heart of <em style={{ color: "#69f0ae" }}>Finding Hampton</em>.
              </p>
            </div>

            {/* ZP card + mission */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="about-card" style={{ padding: 32, textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 12 }}>✍️</div>
                <h3 style={{
                  fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                  fontSize: 24,
                  color: "#ffffff",
                  marginBottom: 4,
                }}>Z.P. Phillips</h3>
                <p style={{ fontSize: 13, color: "#ff8fab", marginBottom: 0 }}>Founder, Family Fables</p>
                <p style={{ fontSize: 13, color: "rgba(200,180,232,0.6)", marginTop: 12, fontStyle: "italic", lineHeight: 1.5 }}>
                  Author, storyteller, and proud grandson carrying on a beautiful creative legacy.
                </p>
              </div>

              {/* Mission */}
              <div className="about-card" style={{ padding: 28 }}>
                <h3 style={{
                  fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                  fontSize: 18,
                  color: "#b388ff",
                  marginBottom: 16,
                }}>Our Mission</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "🌟", text: "Bring joy to children through imaginative storytelling", color: "#ffd740" },
                    { icon: "💜", text: "Create meaningful books families return to again and again", color: "#b388ff" },
                    { icon: "🚀", text: "Provide a platform for creators to share their dreams", color: "#69f0ae" },
                    { icon: "📖", text: "Honor Victor Plotkin's creative legacy every single day", color: "#ff8fab" },
                  ].map((item, i) => (
                    <div key={i} className="about-mission-item" style={{
                      padding: "12px 16px",
                      borderLeftColor: item.color,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}>
                      <span style={{ fontSize: 18 }}>{item.icon}</span>
                      <span style={{ fontSize: 13, color: "rgba(210,190,255,0.85)", lineHeight: 1.4 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave down */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="wave-about" aria-hidden="true">
            <path d="M0,44 C200,16 440,60 700,28 C960,0 1200,52 1440,24 L1440,64 L0,64 Z"
              fill="#0c0730" />
          </svg>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #0c0730 0%, #100940 100%)",
        padding: "80px 24px",
        position: "relative",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(28px, 5vw, 44px)",
              color: "#ffffff",
              marginBottom: 12,
              lineHeight: 1.1,
            }}>
              The Family Fables Story
            </h2>
            <p style={{ color: "rgba(200,180,232,0.7)", fontSize: 16, margin: 0 }}>
              From one posthumous poem to a 12-book catalog.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { emoji: "🌿", title: "The Beginning",          color: "#69f0ae", desc: "Victor Plotkin spends a lifetime writing poems, songs, and stories — a creative treasury that never reached the public." },
              { emoji: "🪲", title: "The Immortal Firefly",   color: "#F4A839", desc: "Warren publishes Victor's first children's book posthumously. The spark that would ignite Family Fables." },
              { emoji: "📚", title: "Family Fables Founded",  color: "#b388ff", desc: "Z.P. Phillips steps in to continue the legacy — founding Family Fables with a mission of joy, creativity, and opportunity." },
              { emoji: "🚀", title: "12 Books and Counting",  color: "#ff8fab", desc: "Twelve beloved books across Adventure Land — each one crafted to bring smiles to children and families everywhere." },
            ].map((step, i) => (
              <div key={i} className="about-timeline-step" style={{ display: "flex", gap: 20, padding: "20px 24px", alignItems: "flex-start" }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: `${step.color}18`,
                  border: `2px solid ${step.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}>
                  {step.emoji}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                    fontSize: 18,
                    color: step.color,
                    margin: "0 0 6px",
                  }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: "rgba(200,180,232,0.75)", margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave down */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="wave-about" aria-hidden="true">
            <path d="M0,32 C300,64 600,8 900,40 C1100,60 1280,20 1440,36 L1440,64 L0,64 Z"
              fill="#0d0835" />
          </svg>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(180deg, #0d0835 0%, #050212 100%)",
        padding: "80px 24px 100px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ fontSize: 52, marginBottom: 16, animation: "adventureFloat 4s ease-in-out infinite" }}>📖</div>
          <h2 style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            fontSize: "clamp(28px, 5vw, 42px)",
            color: "#ffffff",
            marginBottom: 12,
            lineHeight: 1.15,
          }}>
            Stop reading <em style={{ color: "#b388ff" }}>about</em> the books.
            <br />Start reading the books.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(200,180,232,0.65)", marginBottom: 36, lineHeight: 1.5 }}>
            Victor would&apos;ve wanted it that way. (He was a very wise man.)
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/books" className="about-btn-primary"
              style={{ fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif" }}>
              Explore the Lands ✨
            </Link>
            <a href={AMAZON_STORE_URL} target="_blank" rel="noopener noreferrer"
              className="about-btn-secondary"
              style={{ fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif" }}>
              Shop on Amazon →
            </a>
          </div>
        </div>
      </section>

      {/* ── HIDDEN EASTER EGG ─────────────────────────────────────── */}
      <HiddenAboutSecret />
    </div>
  );
}

