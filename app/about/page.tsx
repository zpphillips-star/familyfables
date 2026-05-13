import Link from "next/link";
import { AMAZON_STORE_URL } from "@/lib/books";
import type { Metadata } from "next";
import HiddenAboutSecret from "@/components/HiddenAboutSecret";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the story behind Family Fables — how Z.P. Phillips honored his grandfather Victor Plotkin'\''s creative legacy by founding a children'\''s book company.",
};

export default function AboutPage() {
  return (
    <div>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #2D1B69 0%, #4A2875 40%, #6B3FA0 100%)",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-3xl mx-auto w-full">
          <div className="absolute top-8 right-12 text-4xl opacity-30 float-slow pointer-events-none" aria-hidden>
            🌟
          </div>
          <div className="absolute bottom-8 left-12 text-3xl opacity-30 float-mid pointer-events-none" aria-hidden>
            ✨
          </div>

          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6"
            style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
          >
            🌿 Our Story
          </div>
          <h1
            className="font-display text-white mb-4"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
            }}
          >
            A Legacy of Love &amp; Stories
          </h1>
          <p className="text-lg" style={{ color: "#C8B4E8" }}>
            How one boy from Brooklyn inspired a children&apos;s book company that
            brings joy to families everywhere.
          </p>
        </div>
      </section>

      {/* ─── VICTOR PLOTKIN STORY ───────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start mb-16">
            <div className="lg:col-span-2">
              <div
                className="rounded-3xl p-8 text-center sticky top-24"
                style={{
                  background:
                    "linear-gradient(135deg, #F0EBF8, #E8DCF5)",
                }}
              >
                <div className="text-8xl mb-4 sparkle">🪲</div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                    color: "#2D1B69",
                  }}
                >
                  Victor Plotkin
                </h2>
                <p className="text-sm font-semibold" style={{ color: "#7B6898" }}>
                  1900s Brooklyn, NY
                </p>
                <div
                  className="mt-4 pt-4 text-sm leading-relaxed"
                  style={{
                    borderTop: "1px solid #C8B4E8",
                    color: "#9B8AC4",
                  }}
                >
                  Poet. Songwriter. Storyteller.
                  <br />
                  Forever our inspiration.
                </div>

                <div
                  className="mt-6 rounded-2xl p-4 text-sm"
                  style={{ backgroundColor: "#F4A839" + "22", color: "#6B3FA0" }}
                >
                  <p className="font-bold">The Immortal Firefly</p>
                  <p className="text-xs mt-1" style={{ color: "#7B6898" }}>
                    Published posthumously — the book that started it all.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-catamaran), 'Catamaran', cursive",
                    color: "#2D1B69",
                  }}
                >
                  It Started With a Boy From Brooklyn
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "#4A3570" }}>
                  Long before Family Fables existed, there was a boy growing up
                  in 1900s Brooklyn, New York. His name was{" "}
                  <strong>Victor Plotkin</strong> — a creative, imaginative soul
                  with a gift for words. Throughout his entire life, Victor
                  wrote poems, composed songs, and crafted stories that delighted
                  everyone around him.
                </p>
              </div>

              <div>
                <p className="text-base leading-relaxed" style={{ color: "#4A3570" }}>
                  But despite his remarkable talent, Victor never published his
                  work. His words lived in notebooks, in memories, and in the
                  hearts of his family — never reaching the wider world that
                  would have loved them dearly.
                </p>
              </div>

              <div
                className="rounded-2xl p-6 border-l-4"
                style={{
                  backgroundColor: "#F0EBF8",
                  borderColor: "#6B3FA0",
                }}
              >
                <p
                  className="text-lg font-semibold italic"
                  style={{ color: "#6B3FA0" }}
                >
                  &ldquo;A lifetime of creativity deserved to be shared with
                  the world. That&apos;s why Family Fables exists.&rdquo;
                </p>
                <p className="text-sm mt-2 font-bold" style={{ color: "#9B8AC4" }}>
                  — Z.P. Phillips, Founder
                </p>
              </div>

              <div>
                <p className="text-base leading-relaxed" style={{ color: "#4A3570" }}>
                  After Victor passed away, his son{" "}
                  <strong>Warren</strong> made sure his father&apos;s stories would
                  finally be heard — he published Victor&apos;s first children&apos;s
                  book,{" "}
                  <em className="font-semibold" style={{ color: "#6B3FA0" }}>
                    The Immortal Firefly
                  </em>
                  . It was the spark that lit everything.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t my-4" style={{ borderColor: "#E8DCF5" }} />

          {/* Z.P. Phillips section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start py-12">
            <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
              <h2
                className="text-3xl sm:text-4xl font-bold"
                style={{
                  fontFamily: "var(--font-catamaran), 'Catamaran', cursive",
                  color: "#2D1B69",
                }}
              >
                Carrying the Torch
              </h2>

              <p className="text-base leading-relaxed" style={{ color: "#4A3570" }}>
                <strong>Z.P. Phillips</strong>, Victor&apos;s grandson, saw
                an opportunity to honor his grandfather&apos;s memory in the most
                meaningful way possible — by founding{" "}
                <strong style={{ color: "#6B3FA0" }}>Family Fables</strong>.
              </p>

              <p className="text-base leading-relaxed" style={{ color: "#4A3570" }}>
                The mission was threefold: to bring genuine joy to children
                through wonderful storytelling, to create books that families
                would treasure for generations, and to provide a platform for
                other dreamers — illustrators, writers, and creative souls — to
                share their gifts with the world.
              </p>

              <p className="text-base leading-relaxed" style={{ color: "#4A3570" }}>
                Every Family Fables book carries a piece of that original
                spirit. Whether it&apos;s the goofy joy of{" "}
                <em style={{ color: "#9B6FD0" }}>What&apos;s Your Poo Poo Face</em>,
                the whimsical adventure of{" "}
                <em style={{ color: "#E86BB5" }}>Amber The Dragon Keeper</em>,
                or the confidence-boosting heart of{" "}
                <em style={{ color: "#F4A839" }}>Gilroy&apos;s Gobble</em> — every
                page is made with love.
              </p>

              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#F5ECE0" }}
              >
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                    color: "#2D1B69",
                  }}
                >
                  Our Mission
                </h3>
                <ul className="space-y-2">
                  {[
                    "🌟 Bring joy to children through imaginative storytelling",
                    "💜 Create meaningful books that families return to again and again",
                    "🚀 Provide opportunities for creators to share their dreams",
                    "📚 Honor Victor Plotkin&apos;s creative legacy every single day",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="text-sm font-semibold"
                      style={{ color: "#4A3570" }}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2">
              <div
                className="rounded-3xl p-8 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, #2D1B69 0%, #4A2875 100%)",
                }}
              >
                <div className="text-8xl mb-4">✍️</div>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                  }}
                >
                  Z.P. Phillips
                </h3>
                <p className="text-sm" style={{ color: "#B8A8D8" }}>
                  Founder, Family Fables
                </p>
                <div
                  className="mt-4 pt-4 text-sm leading-relaxed"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                    color: "#C8B4E8",
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

      {/* ─── BOOK TIMELINE ──────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: "#F0EBF8" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-catamaran), 'Catamaran', cursive",
              color: "#2D1B69",
            }}
          >
            The Family Fables Story
          </h2>
          <p className="text-base mb-12" style={{ color: "#7B6898" }}>
            From one posthumous poem to a full children&apos;s book catalog.
          </p>

          <div className="space-y-6 text-left">
            {[
              {
                emoji: "🌿",
                title: "The Beginning",
                desc: "Victor Plotkin spends a lifetime writing poems, songs, and stories — a creative treasury never shared with the public.",
                color: "#9B6FD0",
              },
              {
                emoji: "🪲",
                title: "The Immortal Firefly",
                desc: "Warren publishes Victor\u2019s first children\u2019s book posthumously. The spark that would ignite Family Fables.",
                color: "#F4A839",
              },
              {
                emoji: "📚",
                title: "Family Fables Is Founded",
                desc: "Z.P. Phillips steps in to continue the legacy, founding Family Fables with a mission of joy, creativity, and opportunity.",
                color: "#6B3FA0",
              },
              {
                emoji: "🚀",
                title: "Growing the Catalog",
                desc: "Eight beloved books and counting — each one crafted to bring smiles to children and families everywhere.",
                color: "#E86BB5",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex gap-5 rounded-2xl p-5 bg-white shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: step.color + "22" }}
                >
                  {step.emoji}
                </div>
                <div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: "#2D1B69" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7B6898" }}>
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
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div className="max-w-xl mx-auto">
          <div className="text-4xl mb-4">📖</div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              color: "#2D1B69",
            }}
          >
            Stop reading about books. Start reading books.
          </h2>
          <p className="text-base mb-8" style={{ color: "#7B6898" }}>
            Victor would&apos;ve wanted it that way. (Probably. He was a very wise man.)
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl transition-all active:scale-95"
              style={{ backgroundColor: "#6B3FA0" }}
            >
              Browse Our Books →
            </Link>
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 rounded-xl font-bold border-2 transition-all hover:bg-yellow-50 active:scale-95"
              style={{ borderColor: "#F4A839", color: "#6B3FA0" }}
            >
              Shop on Amazon ✨
            </a>
          </div>
        </div>
      </section>

      {/* ─── HIDDEN ABOUT EASTER EGG ────────────────────────── */}
      {/* Fulfills the promise from the homepage HiddenStar:
          "✨ You're a true explorer! Check the About page for another secret." */}
      <HiddenAboutSecret />
    </div>
  );
}
