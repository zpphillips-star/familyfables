import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BookStore",
  description:
    "Browse all Family Fables children's books — from laugh-out-loud potty humor to heartwarming tales of confidence, friendship, and imagination.",
};

export default function BooksPage() {
  const booksWithImages = books.filter((b) => b.image);

  return (
    <div>
      {/* ─── HEADER — matches WP bookstore hero ─────────────── */}
      <section
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background: "#dcf9f3",
          minHeight: "30vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-3xl mx-auto w-full">
          <h2
            className="font-display"
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#009380",
              marginBottom: "12px",
              lineHeight: 1.1,
            }}
          >
            BookStore
          </h2>
          <h1
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              color: "#78087c",
              marginBottom: "32px",
              fontWeight: "bold",
              lineHeight: 1.2,
            }}
          >
            Shop Our Books And Free Videos!
          </h1>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-block px-10 py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            style={{
              backgroundColor: "#ff9c1a",
              color: "#ffffff",
              borderRadius: "4px",
              textDecoration: "none",
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              letterSpacing: "0.04em",
            }}
          >
            Shop on Amazon
          </a>
        </div>
      </section>

      {/* ─── BOOK GRID — matches WP book grid layout ────────── */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: "#d9b7e5" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {booksWithImages.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FIND OUT MORE / ABOUT ──────────────────────────── */}
      <section
        className="py-16 px-4 text-center"
        style={{ backgroundColor: "#dcf9f3" }}
      >
        <div className="max-w-xl mx-auto">
          <h2
            className="font-display"
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              color: "#78087c",
              marginBottom: "12px",
              lineHeight: 1.1,
            }}
          >
            Find Out More About Us
          </h2>
          <h2
            className="font-display"
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              color: "#006e59",
              marginBottom: "32px",
              lineHeight: 1.1,
            }}
          >
            Or Get Published Now
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/about"
              className="btn-shine inline-block px-8 py-3.5 font-bold text-lg shadow transition-all"
              style={{
                backgroundColor: "#ff9c1a",
                color: "#ffffff",
                borderRadius: "4px",
                textDecoration: "none",
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              }}
            >
              About Us
            </a>
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-block px-8 py-3.5 font-bold text-lg shadow transition-all"
              style={{
                backgroundColor: "#009380",
                color: "#ffffff",
                borderRadius: "4px",
                textDecoration: "none",
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              }}
            >
              Amazon Store
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
