import Image from "next/image";
import Link from "next/link";
import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";
// NewsletterSection removed per product direction

export default function HomePage() {
  // Show 4 featured/highlight books on homepage
  const featuredBooks = books.filter((b) => b.image).slice(0, 4);

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #FFF8F0 0%, #F5ECE0 30%, #F0EBF8 60%, #E8DCF5 100%)",
          minHeight: "90vh",
        }}
      >
        {/* Decorative floating elements */}
        <div
          className="absolute top-12 left-8 text-5xl float-slow opacity-60 pointer-events-none"
          aria-hidden
        >
          ⭐
        </div>
        <div
          className="absolute top-24 right-12 text-4xl float-mid opacity-50 pointer-events-none"
          aria-hidden
        >
          🌙
        </div>
        <div
          className="absolute bottom-24 left-16 text-3xl float-fast opacity-40 pointer-events-none"
          aria-hidden
        >
          🌟
        </div>
        <div
          className="absolute bottom-32 right-20 text-4xl float-slow opacity-50 pointer-events-none"
          aria-hidden
        >
          🦋
        </div>
        <div
          className="absolute top-1/2 left-1/4 text-2xl float-mid opacity-30 pointer-events-none hidden lg:block"
          aria-hidden
        >
          ✨
        </div>

        {/* Hero Content */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 min-h-[90vh]">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6"
              style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
            >
              📚 Children&apos;s Books for Every Family
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                color: "#2D1B69",
              }}
            >
              Stories That{" "}
              <span style={{ color: "#6B3FA0" }}>Warm</span>
              <br />
              Little Hearts 🌟
            </h1>

            <p
              className="text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ color: "#7B6898" }}
            >
              Joyful, whimsical children&apos;s books that spark imagination,
              build character, and create lasting family memories — one story at
              a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="btn-shine px-8 py-4 rounded-2xl font-bold text-white text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#6B3FA0" }}
              >
                Explore Our Books 📖
              </Link>
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine px-8 py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border-2"
                style={{
                  backgroundColor: "#F4A839",
                  color: "#2D1B69",
                  borderColor: "#F4A839",
                }}
              >
                Shop on Amazon ✨
              </a>
            </div>

            <div
              className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start text-sm font-semibold"
              style={{ color: "#9B8AC4" }}
            >
              <span>📚 11 Books Published</span>
              <span>⭐ For Ages 2–8</span>
              <span>🌍 Ships Worldwide</span>
            </div>
          </div>

          {/* Hero Book Showcase */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Background glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ backgroundColor: "#9B6FD0" }}
              />
              {/* Book stack visual */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Back books */}
                {books.filter((b) => b.image).slice(1, 3).map((book, i) => (
                  <div
                    key={book.id}
                    className="absolute w-48 h-56 rounded-xl overflow-hidden shadow-xl"
                    style={{
                      transform: `rotate(${i === 0 ? -12 : 12}deg) translate(${
                        i === 0 ? "-70px" : "70px"
                      }, 10px)`,
                      zIndex: i,
                    }}
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                ))}
                {/* Front book */}
                <div
                  className="relative w-52 h-64 rounded-2xl overflow-hidden shadow-2xl float-slow"
                  style={{ zIndex: 10 }}
                >
                  {books[0].image && (
                    <Image
                      src={books[0].image}
                      alt={books[0].title}
                      fill
                      className="object-cover"
                      sizes="250px"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20V60Z" fill="#FFF8F0" />
          </svg>
        </div>
      </section>

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="py-8 px-4" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { emoji: "📚", value: "11", label: "Books Published" },
              { emoji: "👨‍👩‍👧‍👦", value: "1000s", label: "Happy Families" },
              { emoji: "⭐", value: "4.8★", label: "Avg. Rating" },
              { emoji: "🌍", value: "50+", label: "States Reached" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="py-4 px-3 rounded-2xl"
                style={{ backgroundColor: "#F0EBF8" }}
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-fredoka), cursive",
                    color: "#6B3FA0",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs font-semibold" style={{ color: "#7B6898" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED BOOKS ───────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
              style={{ backgroundColor: "#E8DCF5", color: "#6B3FA0" }}
            >
              ✨ Our Beloved Stories
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                color: "#2D1B69",
              }}
            >
              Books Kids Can&apos;t Put Down
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#7B6898" }}>
              From giggle-out-loud potty humor to heartwarming tales of
              confidence and friendship — there&apos;s a Family Fables book for every
              little reader.
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
              className="inline-block px-8 py-3.5 rounded-xl font-bold border-2 transition-all hover:bg-purple-50"
              style={{ borderColor: "#6B3FA0", color: "#6B3FA0" }}
            >
              View All Books →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: "#F0EBF8" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#E8DCF5", color: "#6B3FA0" }}
          >
            🌿 About Family Fables
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#2D1B69",
            }}
          >
            Stories Built on a Family Legacy
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#4A3570" }}>
            Family Fables was inspired by Z.P. Phillips&apos; grandfather — a creative
            soul who spent his life writing poems and stories. That legacy of imagination
            and love is woven into every book we publish.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3.5 rounded-xl font-bold border-2 transition-all hover:bg-purple-50"
            style={{ borderColor: "#6B3FA0", color: "#6B3FA0" }}
          >
            Our Story →
          </Link>
        </div>
      </section>

      {/* ─── TESTIMONIAL / PULL QUOTE ─────────────────────────── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">💜</div>
          <blockquote
            className="text-2xl sm:text-3xl font-bold leading-relaxed mb-6"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#6B3FA0",
            }}
          >
            &ldquo;My kids ask for Gilroy&apos;s Gobble every single night.
            It&apos;s become our bedtime ritual!&rdquo;
          </blockquote>
          <p className="font-semibold" style={{ color: "#7B6898" }}>
            — Happy Parent, Amazon Review ⭐⭐⭐⭐⭐
          </p>
        </div>
      </section>

      {/* ─── SHOP CTA ─────────────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#2D1B69",
            }}
          >
            Ready to Start Reading? 🚀
          </h2>
          <p className="text-base mb-8" style={{ color: "#7B6898" }}>
            All Family Fables books are available on Amazon with fast shipping.
            Perfect for birthdays, holidays, or just because!
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-white text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
          >
            Shop All Books on Amazon 📚
          </a>
        </div>
      </section>
    </div>
  );
}
