import Link from "next/link";
import { AMAZON_STORE_URL } from "@/lib/books";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Family Fables — how Z.P. Phillips honored his grandfather Victor Plotkin's creative legacy by founding a children's book company.",
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#0f0e17" }}>

      {/* ─── HEADER ─────────────────────────────────────────── */}
      <section
        className="py-24 px-4 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1a1927 0%, #0f0e17 100%)",
          minHeight: "42vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Feathers */}
        <div className="absolute top-10 right-14 text-3xl opacity-20 float-slow pointer-events-none" aria-hidden>🪶</div>
        <div className="absolute bottom-10 left-14 text-2xl opacity-15 float-mid pointer-events-none" aria-hidden>🪶</div>

        {/* Gold glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)" }}
        />

        <div className="max-w-3xl mx-auto w-full">
          <div className="eyebrow mb-6">Our Story</div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
            }}
          >
            A Legacy of Love &amp; Stories
          </h1>
          <p
            className="text-lg"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
          >
            How one boy from Brooklyn inspired a children&apos;s book company that
            brings joy to families everywhere.
          </p>
        </div>
      </section>

      {/* ─── VICTOR PLOTKIN STORY ───────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "#0f0e17", borderTop: "1px solid #2e2a42" }}
      >
        <div className="max-w-4xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-16">
            {/* Sidebar card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-2xl p-8 text-center sticky top-24 border"
                style={{
                  backgroundColor: "#1e1c2e",
                  borderColor: "#2e2a42",
                }}
              >
                <div className="text-8xl mb-4 glow-pulse">🐦‍⬛</div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-fredoka), cursive",
                    color: "#f0ece4",
                  }}
                >
                  Victor Plotkin
                </h2>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "#8a8299", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: "0.7rem" }}
                >
                  1900s Brooklyn, NY
                </p>
                <div
                  className="mt-4 pt-4 text-sm leading-relaxed"
                  style={{
                    borderTop: "1px solid #2e2a42",
                    color: "#8a8299",
                    fontFamily: "var(--font-lora), serif",
                    fontStyle: "italic",
                  }}
                >
                  Poet. Songwriter. Storyteller.
                  <br />
                  Forever our inspiration.
                </div>

                <div
                  className="mt-6 rounded-xl p-4 text-sm border"
                  style={{ borderColor: "#c9a84c", backgroundColor: "rgba(201,168,76,0.05)" }}
                >
                  <p
                    className="font-bold"
                    style={{
                      color: "#c9a84c",
                      fontFamily: "var(--font-fredoka), cursive",
                    }}
                  >
                    The Immortal Firefly
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
                  >
                    Published posthumously — the book that started it all.
                  </p>
                </div>
              </div>
            </div>

            {/* Story text */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <div className="eyebrow mb-4">The Origin</div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                    color: "#f0ece4",
                  }}
                >
                  It Started With a Boy From Brooklyn
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
                >
                  Long before Family Fables existed, there was a boy growing up
                  in 1900s Brooklyn, New York. His name was{" "}
                  <strong style={{ color: "#f0ece4" }}>Victor Plotkin</strong> — a
                  creative, imaginative soul with a gift for words. Throughout his
                  entire life, Victor wrote poems, composed songs, and crafted
                  stories that delighted everyone around him.
                </p>
              </div>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                But despite his remarkable talent, Victor never published his
                work. His words lived in notebooks, in memories, and in the
                hearts of his family — never reaching the wider world that would
                have loved them dearly.
              </p>

              <div
                className="rounded-xl p-6 border-l-4"
                style={{
                  backgroundColor: "#1e1c2e",
                  borderColor: "#c9a84c",
                }}
              >
                <p
                  className="text-lg font-semibold italic"
                  style={{ color: "#f0ece4", fontFamily: "var(--font-lora), serif" }}
                >
                  &ldquo;A lifetime of creativity deserved to be shared with
                  the world. That&apos;s why Family Fables exists.&rdquo;
                </p>
                <p
                  className="text-sm mt-3 font-bold"
                  style={{
                    color: "#c9a84c",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontSize: "0.7rem",
                  }}
                >
                  — Z.P. Phillips, Founder
                </p>
              </div>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                After Victor passed away, his son{" "}
                <strong style={{ color: "#f0ece4" }}>Warren</strong> made sure
                his father&apos;s stories would finally be heard — he published
                Victor&apos;s first children&apos;s book,{" "}
                <em style={{ color: "#c9a84c" }}>The Immortal Firefly</em>. It
                was the spark that lit everything.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="text-center py-6 opacity-25"
            aria-hidden
            style={{ color: "#c9a84c", letterSpacing: "1rem" }}
          >
            🪶 🪶 🪶
          </div>

          {/* Z.P. Phillips section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start py-12">
            <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
              <div className="eyebrow mb-4">Carrying the Torch</div>
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                  color: "#f0ece4",
                }}
              >
                Carrying the Torch
              </h2>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                <strong style={{ color: "#f0ece4" }}>Z.P. Phillips</strong>,
                Victor&apos;s grandson, saw an opportunity to honor his grandfather&apos;s
                memory in the most meaningful way possible — by founding{" "}
                <strong style={{ color: "#c9a84c" }}>Family Fables</strong>.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                The mission was threefold: to bring genuine joy to children
                through wonderful storytelling, to create books that families
                would treasure for generations, and to provide a platform for
                other dreamers — illustrators, writers, and creative souls — to
                share their gifts with the world.
              </p>

              <p
                className="text-base leading-relaxed"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                Every Family Fables book carries a piece of that original
                spirit. Whether it&apos;s the goofy joy of{" "}
                <em style={{ color: "#f0ece4" }}>What&apos;s Your Poo Poo Face</em>,
                the whimsical adventure of{" "}
                <em style={{ color: "#f0ece4" }}>Amber The Dragon Keeper</em>,
                or the confidence-boosting heart of{" "}
                <em style={{ color: "#f0ece4" }}>Gilroy&apos;s Gobble</em> — every
                page is made with love.
              </p>

              <div
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "#1e1c2e", borderColor: "#2e2a42" }}
              >
                <div className="eyebrow mb-4">Our Mission</div>
                <ul className="space-y-3">
                  {[
                    { glyph: "🪶", text: "Bring joy to children through imaginative storytelling" },
                    { glyph: "🐦‍⬛", text: "Create meaningful books that families return to again and again" },
                    { glyph: "��", text: "Provide opportunities for creators to share their dreams" },
                    { glyph: "🐦‍⬛", text: "Honor Victor Plotkin's creative legacy every single day" },
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-sm flex items-start gap-3"
                      style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
                    >
                      <span className="mt-0.5 flex-shrink-0">{item.glyph}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2">
              <div
                className="rounded-2xl p-8 text-center border"
                style={{
                  backgroundColor: "#1e1c2e",
                  borderColor: "#2e2a42",
                }}
              >
                <div className="text-8xl mb-4">✍️</div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-fredoka), cursive",
                    color: "#f0ece4",
                  }}
                >
                  Z.P. Phillips
                </h3>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#c9a84c", letterSpacing: "0.14em" }}
                >
                  Founder, Family Fables
                </p>
                <div
                  className="mt-4 pt-4 text-sm leading-relaxed italic"
                  style={{
                    borderTop: "1px solid #2e2a42",
                    color: "#8a8299",
                    fontFamily: "var(--font-lora), serif",
                  }}
                >
                  Author, storyteller, and proud grandson carrying on a
                  beautiful creative legacy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ───────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{
          backgroundColor: "#12111a",
          borderTop: "1px solid #2e2a42",
          borderBottom: "1px solid #2e2a42",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-4">The Chronicle</div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
            }}
          >
            The Family Fables Story
          </h2>
          <p
            className="text-base mb-12"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
          >
            From one posthumous poem to a full children&apos;s book catalog.
          </p>

          <div className="space-y-5 text-left">
            {[
              {
                glyph: "🪶",
                title: "The Beginning",
                desc: "Victor Plotkin spends a lifetime writing poems, songs, and stories — a creative treasury never shared with the public.",
                accent: "#9b6b8a",
              },
              {
                glyph: "🐦‍⬛",
                title: "The Immortal Firefly",
                desc: "Warren publishes Victor\u2019s first children\u2019s book posthumously. The spark that would ignite Family Fables.",
                accent: "#c9a84c",
              },
              {
                glyph: "📚",
                title: "Family Fables Is Founded",
                desc: "Z.P. Phillips steps in to continue the legacy, founding Family Fables with a mission of joy, creativity, and opportunity.",
                accent: "#c9a84c",
              },
              {
                glyph: "🪶",
                title: "Growing the Catalog",
                desc: "Eight beloved books and counting — each one crafted to bring smiles to children and families everywhere.",
                accent: "#9b6b8a",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-5 rounded-xl p-5 border"
                style={{ backgroundColor: "#1e1c2e", borderColor: "#2e2a42" }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: `${step.accent}18`, border: `1px solid ${step.accent}44` }}
                >
                  {step.glyph}
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{
                      color: "#f0ece4",
                      fontFamily: "var(--font-fredoka), cursive",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "#0f0e17" }}
      >
        <div className="max-w-xl mx-auto">
          <div className="eyebrow mb-4">Begin the Journey</div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
            }}
          >
            Start Your Family Fables Journey
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
          >
            Explore our full collection of children&apos;s books and find the
            perfect story for your little one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f0e17",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              Browse Our Books →
            </Link>
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-xl font-bold border transition-all hover:border-amber-400 hover:text-amber-400"
              style={{
                borderColor: "#2e2a42",
                color: "#8a8299",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              Shop on Amazon →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
