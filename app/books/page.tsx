import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Books",
  description:
    "Browse all Family Fables children's books — from laugh-out-loud adventures to heartwarming tales of confidence, friendship, and imagination.",
};

export default function BooksPage() {
  const booksWithImages = books.filter((b) => b.image);
  const originBook = books.find((b) => b.id === "immortal-firefly");

  return (
    <div style={{ backgroundColor: "#0f0e17" }}>

      {/* ─── HEADER ─────────────────────────────────────────── */}
      <section
        className="py-24 px-4 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1a1927 0%, #0f0e17 100%)",
          minHeight: "38vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Feathers */}
        <div className="absolute top-10 left-10 text-3xl opacity-20 float-slow pointer-events-none" aria-hidden>🪶</div>
        <div className="absolute top-16 right-14 text-2xl opacity-15 float-mid pointer-events-none" aria-hidden>🪶</div>
        <div className="absolute bottom-10 right-20 text-2xl opacity-15 float-fast pointer-events-none" aria-hidden>🪶</div>

        <div className="max-w-3xl mx-auto w-full">
          <div className="eyebrow mb-6">The Collection</div>
          <h1
            className="text-5xl sm:text-6xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
            }}
          >
            All Our Books
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
          >
            From silly to sweet, brave to heartwarming — every Family Fables book
            is crafted to delight little readers and the grown-ups who love them.
          </p>
        </div>
      </section>

      {/* ─── BOOK GRID ──────────────────────────────────────── */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: "#0f0e17", borderTop: "1px solid #2e2a42" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {booksWithImages.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
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

      {/* ─── ORIGIN BOOK (The Immortal Firefly) ─────────────── */}
      {originBook && (
        <section
          className="py-16 px-4"
          style={{ backgroundColor: "#0f0e17", borderTop: "1px solid #2e2a42" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="eyebrow">The Book That Started It All</div>
            </div>

            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                background: "linear-gradient(135deg, #1e1c2e 0%, #12111a 100%)",
                borderColor: "#c9a84c",
                boxShadow: "0 0 50px rgba(201,168,76,0.08)",
              }}
            >
              <div className="p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                {/* Glow visual */}
                <div className="flex items-center justify-center">
                  <div
                    className="w-56 h-56 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
                    }}
                  >
                    <div className="text-8xl glow-pulse">🐦‍⬛</div>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <div className="eyebrow mb-3">
                    By Victor Plotkin · Published Posthumously
                  </div>
                  <h2
                    className="text-4xl font-bold mb-4"
                    style={{
                      fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                      color: "#f0ece4",
                    }}
                  >
                    The Immortal Firefly
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
                  >
                    {originBook.description}
                  </p>
                  <a
                    href={AMAZON_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-block px-7 py-3 rounded-xl font-bold transition-all hover:scale-105"
                    style={{
                      backgroundColor: "#c9a84c",
                      color: "#0f0e17",
                      fontFamily: "var(--font-fredoka), cursive",
                    }}
                  >
                    Find on Amazon →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── SHOP CTA ────────────────────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "#0f0e17", borderTop: "1px solid #2e2a42" }}
      >
        <div className="max-w-xl mx-auto">
          <div className="eyebrow mb-4">Our Story</div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
              color: "#f0ece4",
            }}
          >
            Find Your Next Favourite Story
          </h2>
          <p
            className="text-base mb-8"
            style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
          >
            All books available on Amazon with Prime shipping. Perfect gifts for
            every occasion.
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
            Visit Our Amazon Store →
          </a>
        </div>
      </section>
    </div>
  );
}
