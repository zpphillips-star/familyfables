import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Books",
  description:
    "Browse all Family Fables children'\''s books — from laugh-out-loud potty humor to heartwarming tales of confidence, friendship, and imagination.",
};

export default function BooksPage() {
  const booksWithImages = books.filter((b) => b.image);
  const originBook = books.find((b) => b.id === "immortal-firefly");

  return (
    <div>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #F0EBF8 0%, #E8DCF5 50%, #DDD0F0 100%)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 text-4xl opacity-40 float-slow pointer-events-none" aria-hidden>
          📖
        </div>
        <div className="absolute top-12 right-12 text-3xl opacity-30 float-mid pointer-events-none" aria-hidden>
          ⭐
        </div>
        <div className="absolute bottom-8 left-20 text-3xl opacity-30 float-fast pointer-events-none" aria-hidden>
          🌙
        </div>

        <div
          className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6"
          style={{ backgroundColor: "#6B3FA0", color: "white" }}
        >
          📚 Full Catalog
        </div>
        <h1
          className="text-5xl sm:text-6xl font-bold mb-4"
          style={{
            fontFamily: "var(--font-concert-one), 'Concert One', cursive",
            color: "#2D1B69",
          }}
        >
          All Our Books
        </h1>
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "#7B6898" }}
        >
          From silly to sweet, brave to heartwarming — every Family Fables book
          is crafted to delight little readers and the grown-ups who love them.
        </p>
      </section>

      {/* ─── BOOK GRID ──────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {booksWithImages.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── ORIGIN BOOK (The Immortal Firefly) ─────────────── */}
      {originBook && (
        <section
          className="py-16 px-4"
          style={{ backgroundColor: "#F5ECE0" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div
                className="inline-block px-4 py-1.5 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
              >
                🌟 The Book That Started It All
              </div>
            </div>

            <div
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #2D1B69 0%, #4A2875 60%, #6B3FA0 100%)",
              }}
            >
              <div className="p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                {/* Glow visual */}
                <div className="flex items-center justify-center">
                  <div
                    className="w-56 h-56 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(244,168,57,0.25) 0%, rgba(107,63,160,0.15) 70%, transparent 100%)",
                    }}
                  >
                    <div className="text-center">
                      <div className="text-8xl sparkle">🪲</div>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <div
                    className="text-sm font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#F4A839" }}
                  >
                    By Victor Plotkin • Published Posthumously
                  </div>
                  <h2
                    className="text-4xl font-bold text-white mb-4"
                    style={{
                      fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                    }}
                  >
                    The Immortal Firefly
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "#C8B4E8" }}
                  >
                    {originBook.description}
                  </p>
                  <a
                    href={AMAZON_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine inline-block px-7 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                    style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
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
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div className="max-w-xl mx-auto">
          <div className="text-4xl mb-4">🛍️</div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              color: "#2D1B69",
            }}
          >
            Shop the Full Collection
          </h2>
          <p className="text-base mb-8" style={{ color: "#7B6898" }}>
            All books available on Amazon with Prime shipping. Perfect gifts for
            every occasion.
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 active:scale-95"
            style={{ backgroundColor: "#6B3FA0", color: "white" }}
          >
            Visit Our Amazon Store 📚
          </a>
        </div>
      </section>
    </div>
  );
}
