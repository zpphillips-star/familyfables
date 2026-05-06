import Image from "next/image";
import { Book, AMAZON_STORE_URL } from "@/lib/books";

interface BookCardProps {
  book: Book;
  size?: "normal" | "large";
}

export default function BookCard({ book, size = "normal" }: BookCardProps) {
  const isLarge = size === "large";

  return (
    <div
      className="book-card group rounded-xl overflow-hidden flex flex-col border"
      style={{
        backgroundColor: "#1e1c2e",
        borderColor: "#2e2a42",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden flex items-center justify-center ${
          isLarge ? "h-80" : "h-60"
        }`}
        style={{ backgroundColor: "#12111a" }}
      >
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes={isLarge ? "400px" : "300px"}
          />
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-3 w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${book.accentColor}14, ${book.accentColor}28)`,
            }}
          >
            <span className="text-6xl float-slow">🪶</span>
            <span
              className="text-sm font-bold text-center px-4"
              style={{ color: book.accentColor }}
            >
              {book.title}
            </span>
          </div>
        )}

        {/* Tag badge */}
        {book.tag && (
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-md text-xs font-bold shadow"
            style={{
              backgroundColor: "#0f0e17",
              color: "#c9a84c",
              border: "1px solid #c9a84c",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.6rem",
            }}
          >
            {book.tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-lg leading-snug mb-2"
          style={{
            color: "#f0ece4",
            fontFamily: "var(--font-fredoka), cursive",
          }}
        >
          {book.title}
        </h3>
        <p
          className={`text-sm leading-relaxed flex-1 ${isLarge ? "" : "line-clamp-3"}`}
          style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
        >
          {book.description}
        </p>

        <a
          href={AMAZON_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine mt-4 inline-block text-center py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{
            backgroundColor: "#c9a84c",
            color: "#0f0e17",
            fontFamily: "var(--font-fredoka), cursive",
          }}
        >
          Get This Book →
        </a>
      </div>
    </div>
  );
}
