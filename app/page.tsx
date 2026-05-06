import Image from "next/image";
import Link from "next/link";
import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";
import NewsletterSection from "@/components/NewsletterSection";

export default function HomePage() {
  const featuredBooks = books.filter((b) => b.image).slice(0, 4);

  return (
    <div style={{ backgroundColor: "#0f0e17" }}>

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          background: "linear-gradient(180deg, #1a1927 0%, #0f0e17 70%)",
          minHeight: "100vh",
        }}
      >
        {/* Subtle dot-grid atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(201,168,76,0.06) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* Floating feathers */}
        <div className="absolute top-16 left-10 text-3xl float-slow opacity-20 pointer-events-none" aria-hidden>🪶</div>
        <div className="absolute top-28 right-14 text-2xl float-mid opacity-15 pointer-events-none" aria-hidden>🪶</div>
        <div className="absolute bottom-32 left-20 text-2xl float-fast opacity-15 pointer-events-none" aria-hidden>🪶</div>
        <div className="absolute bottom-44 right-24 text-3xl float-slow opacity-20 pointer-events-none" aria-hidden>🪶</div>

        {/* Gold ambient glow */}
        <div
          className="absolute top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)" }}
        />

        {/* Hero content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center">
          {/* Raven */}
          <div className="text-8xl sm:text-9xl mb-6 glow-pulse" aria-label="Raven">
            🐦‍⬛
          </div>

          {/* Eyebrow */}
          <div className="eyebrow mb-5 tracking-[0.28em]">A Family Legacy</div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
              textShadow: "0 2px 50px rgba(201,168,76,0.12)",
            }}
          >
            Stories That{" "}
            <span style={{ color: "#c9a84c" }}>Live</span>
            <br />
            Forever
          </h1>

          <p
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-lg"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), 'Lora', serif" }}
          >
            Victor Plotkin spent a lifetime writing stories the world never
            heard. Now his legacy reaches children everywhere — one book at a
            time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/books"
              className="btn-shine px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f0e17",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              Explore the Collection
            </Link>
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5 border"
              style={{
                borderColor: "#2e2a42",
                color: "#8a8299",
                backgroundColor: "transparent",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              Shop on Amazon →
            </a>
          </div>

          <div
            className="mt-12 flex flex-wrap gap-8 justify-center text-xs"
            style={{
              color: "#2e2a42",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span>8 Books Published</span>
            <span>Ages 2–8</span>
            <span>Ships Worldwide</span>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          aria-hidden
          style={{ background: "linear-gradient(to bottom, transparent, #0f0e17)" }}
        />
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="py-10 px-4" style={{ backgroundColor: "#0f0e17" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { emoji: "📚", value: "8", label: "Books Published" },
              { emoji: "👨‍👩‍👧‍👦", value: "1000s", label: "Happy Families" },
              { emoji: "⭐", value: "4.8★", label: "Avg. Rating" },
              { emoji: "🌍", value: "50+", label: "States Reached" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="py-5 px-3 rounded-xl border"
                style={{ backgroundColor: "#1e1c2e", borderColor: "#2e2a42" }}
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-fredoka), cursive",
                    color: "#c9a84c",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-semibold uppercase tracking-widest mt-1"
                  style={{ color: "#8a8299" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED BOOKS ───────────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{ backgroundColor: "#0f0e17", borderTop: "1px solid #2e2a42" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="eyebrow mb-4">Best Sellers</div>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                color: "#f0ece4",
              }}
            >
              Books Worth Discovering
            </h2>
            <p
              className="text-base max-w-xl mx-auto"
              style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
            >
              From laugh-out-loud adventures to quiet, wonder-filled tales —
              every Family Fables story is made to be remembered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/books"
              className="inline-block px-8 py-3.5 rounded-xl font-bold border transition-all hover:border-amber-400 hover:text-amber-400"
              style={{
                borderColor: "#2e2a42",
                color: "#8a8299",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              View All 8 Books →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATHER DIVIDER ──────────────────────────────────── */}
      <div
        className="text-center py-6 opacity-25"
        aria-hidden
        style={{ color: "#c9a84c", letterSpacing: "1rem" }}
      >
        🪶 🪶 🪶
      </div>

      {/* ─── ORIGIN STORY TEASER ──────────────────────────────── */}
      <section
        className="py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #12111a 0%, #1a1927 60%, #1e1c2e 100%)",
          borderTop: "1px solid #2e2a42",
          borderBottom: "1px solid #2e2a42",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual orb */}
            <div className="flex items-center justify-center order-2 lg:order-1">
              <div
                className="relative w-72 h-72 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle, rgba(201,168,76,0.07) 0%, rgba(30,28,46,0.6) 60%, transparent 80%)",
                  border: "1px solid #2e2a42",
                }}
              >
                <div className="text-center">
                  <div className="text-8xl glow-pulse mb-4">🐦‍⬛</div>
                  <div
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-fredoka), cursive",
                      color: "#c9a84c",
                    }}
                  >
                    The Immortal Firefly
                  </div>
                  <div className="text-sm mt-1" style={{ color: "#8a8299" }}>
                    by Victor Plotkin
                  </div>
                </div>
              </div>
            </div>

            {/* Story content */}
            <div className="order-1 lg:order-2">
              <div className="eyebrow mb-5">The Origin</div>
              <h2
                className="text-4xl sm:text-5xl font-bold mb-6 leading-tight"
                style={{
                  fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                  color: "#f0ece4",
                }}
              >
                A Legacy Born From Love
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                Family Fables began with a boy from 1900s Brooklyn named{" "}
                <strong style={{ color: "#f0ece4" }}>Victor Plotkin</strong> — a
                creative soul who spent his whole life writing poems, songs, and
                stories that he never published.
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                After Victor passed, his son Warren published his first
                children&apos;s book. Z.P. Phillips stepped in to carry on that
                legacy — bringing joy to children and honoring a life full of
                untold stories.
              </p>
              <Link
                href="/about"
                className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold border transition-all"
                style={{
                  borderColor: "#c9a84c",
                  color: "#c9a84c",
                  backgroundColor: "transparent",
                  fontFamily: "var(--font-fredoka), cursive",
                }}
              >
                Uncover the Full Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PULL QUOTE ───────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#0f0e17" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-6">Reader Stories</div>
          <blockquote
            className="text-2xl sm:text-3xl leading-relaxed mb-6 italic"
            style={{
              fontFamily: "var(--font-lora), 'Lora', serif",
              color: "#f0ece4",
            }}
          >
            &ldquo;My kids ask for Gilroy&apos;s Gobble every single night.
            It&apos;s become our bedtime ritual!&rdquo;
          </blockquote>
          <p
            style={{
              color: "#8a8299",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            — Happy Parent · Amazon Review ⭐⭐⭐⭐⭐
          </p>
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────── */}
      <NewsletterSection />

      {/* ─── SHOP CTA ─────────────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "#0f0e17", borderTop: "1px solid #2e2a42" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="eyebrow mb-4">Begin the Journey</div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
            }}
          >
            Ready to Start Reading?
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
          >
            All Family Fables books are available on Amazon with fast shipping.
            Perfect for birthdays, holidays, or just because.
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-block px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            style={{
              backgroundColor: "#c9a84c",
              color: "#0f0e17",
              fontFamily: "var(--font-fredoka), cursive",
            }}
          >
            Shop All Books on Amazon
          </a>
        </div>
      </section>
    </div>
  );
}
