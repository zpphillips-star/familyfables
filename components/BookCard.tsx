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
      className="book-card group rounded-2xl overflow-hidden flex flex-col bg-white"
      style={{ boxShadow: "0 4px 20px rgba(107, 63, 160, 0.08)" }}
    >
      {/* Image area */}
      <div
        className={`relative overflow-hidden flex items-center justify-center ${
          isLarge ? "h-80" : "h-60"
        }`}
        style={{ backgroundColor: `${book.accentColor}18` }}
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
          /* Decorative placeholder for books without images */
          <div
            className="flex flex-col items-center justify-center gap-3 w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${book.accentColor}22, ${book.accentColor}44)`,
            }}
          >
            <span className="text-7xl float-slow">✨</span>
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
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow"
            style={{ backgroundColor: book.accentColor }}
          >
            {book.tag}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="font-bold text-lg leading-snug mb-2"
          style={{ color: "#2D1B69" }}
        >
          {book.title}
        </h3>
        <p
          className={`text-sm leading-relaxed flex-1 ${
            isLarge ? "" : "line-clamp-3"
          }`}
          style={{ color: "#7B6898" }}
        >
          {book.description}
        </p>

        <a
          href={AMAZON_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shine mt-4 inline-block text-center py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: book.accentColor, color: "white" }}
        >
          Get This Book →
        </a>
      </div>
    </div>
  );
}
