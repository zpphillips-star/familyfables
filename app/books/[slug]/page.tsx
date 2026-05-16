import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookActivity from "@/components/BookActivity";

// ── Static params for all 12 book slugs ──────────────────────────────────────
export async function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

// ── Metadata ─────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) return {};
  return {
    title: `${book.title} | Family Fables`,
    description: book.description,
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  const amazonUrl = book.amazonUrl || AMAZON_STORE_URL;
  const description = book.longDescription || book.description;

  // Determine if text should be light or dark based on gradient start
  const darkGradients = [
    "amber-the-dragon-keeper",
    "dream-ideas",
    "ollie-come-home",
    "frog-a-dog",
    "brian-the-ghost",
    "the-lumpiest-pumpkin",
  ];
  const heroTextLight = darkGradients.includes(slug);
  const heroTextColor = heroTextLight ? "#ffffff" : "#1a1a1a";
  const heroSubColor = heroTextLight ? "rgba(255,255,255,0.85)" : "rgba(30,30,30,0.75)";
  const heroBadgeBg = heroTextLight ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.12)";
  const heroBadgeBorder = heroTextLight ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.2)";
  const heroBadgeColor = heroTextLight ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)";

  return (
    <>
      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes bookFloat {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }
        @keyframes bookFadeIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .book-page-cover { animation: bookFloat 5s ease-in-out infinite; }
        .book-page-hero-content { animation: bookFadeIn 0.8s ease forwards; }
        .book-cta-btn:hover {
          transform: translateY(-3px) scale(1.04) !important;
          box-shadow: 0 10px 32px rgba(0,0,0,0.3) !important;
        }
        .book-back-link:hover { opacity: 0.75; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — themed gradient + cover + title
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: book.gradient,
          minHeight: "70vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 24px 120px",
        }}
      >
        {/* Floating stars */}
        {[...Array(18)].map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${(i * 47 + 11) % 100}%`,
              top: `${(i * 31 + 7) % 85}%`,
              fontSize: `${8 + (i % 4) * 4}px`,
              color: heroTextLight ? "rgba(255,255,255,0.5)" : `${book.accentColor}60`,
              opacity: 0.3 + (i % 5) * 0.1,
              pointerEvents: "none",
            }}
          >
            ★
          </span>
        ))}

        {/* Back button */}
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 3, marginBottom: 40 }}>
          <Link
            href="/"
            className="book-back-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: heroSubColor,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
              transition: "opacity 0.2s",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            ← Back to the Map
          </Link>
        </div>

        {/* Hero content */}
        <div
          className="book-page-hero-content"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "clamp(32px, 6vw, 80px)",
            flexWrap: "wrap",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Cover */}
          <div
            className="book-page-cover"
            style={{
              flex: "0 0 auto",
              width: "clamp(160px, 22vw, 260px)",
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 20px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <Image
              src={book.coverImage}
              alt={`${book.title} book cover`}
              width={260}
              height={260}
              style={{ width: "100%", height: "auto", display: "block" }}
              priority
            />
          </div>

          {/* Text block */}
          <div style={{ flex: "1 1 280px", minWidth: 240 }}>
            {/* Land name badge */}
            <span
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backgroundColor: heroBadgeBg,
                border: `1.5px solid ${heroBadgeBorder}`,
                color: heroBadgeColor,
                marginBottom: 16,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                backdropFilter: "blur(4px)",
              }}
            >
              {book.landName}
            </span>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(32px, 6vw, 64px)",
                color: heroTextColor,
                lineHeight: 1.05,
                marginBottom: 12,
                textShadow: heroTextLight
                  ? "0 3px 20px rgba(0,0,0,0.4)"
                  : "0 2px 8px rgba(255,255,255,0.3)",
              }}
            >
              {book.title}
            </h1>

            {/* Author */}
            <p
              style={{
                fontSize: "clamp(14px, 2vw, 18px)",
                color: heroSubColor,
                marginBottom: 20,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              By Zach &amp; Victoria Phillips
            </p>

            {/* Theme badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {book.themes.map((theme) => (
                <span
                  key={theme}
                  style={{
                    display: "inline-block",
                    padding: "5px 14px",
                    borderRadius: 50,
                    fontSize: 13,
                    fontWeight: 700,
                    backgroundColor: book.accentColor,
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                  }}
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* Age range */}
            <p
              style={{
                fontSize: 15,
                color: heroSubColor,
                fontWeight: 600,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              }}
            >
              📚 {book.ageRange}
            </p>
          </div>
        </div>

        {/* Bottom wave transition */}
        <div style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: 80, pointerEvents: "none", zIndex: 4 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }} aria-hidden="true">
            <path d="M0,40 C360,80 720,10 1080,50 C1260,70 1380,30 1440,45 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT THE BOOK
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff", padding: "72px 24px" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: book.accentColor,
              marginBottom: 12,
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            📖 About the Book
          </p>
          <h2
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(24px, 4vw, 40px)",
              color: "#2D1B69",
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            {book.hook}
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#4a3a6e",
              lineHeight: 1.75,
              marginBottom: 32,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            {description}
          </p>

          {/* Perfect For */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              backgroundColor: `${book.accentColor}12`,
              border: `2px solid ${book.accentColor}33`,
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 15,
                color: book.accentColor,
                fontWeight: 700,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              }}
            >
              {book.perfectFor}
            </p>
          </div>

          {/* Age badge */}
          <span
            style={{
              display: "inline-block",
              padding: "6px 18px",
              borderRadius: 50,
              fontSize: 14,
              fontWeight: 700,
              backgroundColor: book.accentColor,
              color: "#fff",
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Perfect for {book.ageRange}
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          READ ALOUD SECTION
      ══════════════════════════════════════════════════════════════════ */}
      {book.hasReadAloud ? (
        <section
          style={{
            backgroundColor: `${book.accentColor}10`,
            padding: "64px 24px",
            textAlign: "center",
            borderTop: `3px solid ${book.accentColor}33`,
          }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: book.accentColor,
                marginBottom: 12,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
              }}
            >
              🎧 Read Aloud
            </p>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(24px, 4vw, 40px)",
                color: "#2D1B69",
                marginBottom: 16,
              }}
            >
              Read It To Me!
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#4a3a6e",
                marginBottom: 32,
                lineHeight: 1.6,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              Snuggle up — the full story is ready to read aloud. Tap a page to hear it read to you, flip through at your own pace, or let it play automatically! 📖✨
            </p>
            <Link
              href={`/read/${book.id}`}
              className="book-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 50,
                backgroundColor: book.accentColor,
                color: "#fff",
                fontWeight: 900,
                fontSize: 17,
                textDecoration: "none",
                boxShadow: `0 6px 24px ${book.accentColor}55`,
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              📖 Start Reading Now →
            </Link>
          </div>
        </section>
      ) : (
        <section
          style={{
            backgroundColor: "#f9f5ff",
            padding: "64px 24px",
            textAlign: "center",
            borderTop: `3px solid ${book.accentColor}33`,
          }}
        >
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: `${book.accentColor}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                fontSize: 36,
              }}
            >
              📖
            </div>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 16,
              }}
            >
              Coming Soon — Read Aloud!
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#7B6898",
                lineHeight: 1.6,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              We&apos;re recording{" "}
              <strong style={{ color: book.accentColor }}>{book.title}</strong> right now!
              Check back soon — the full read-aloud experience is coming. 🎙️
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          ACTIVITY SECTION (client component)
      ══════════════════════════════════════════════════════════════════ */}
      <BookActivity slug={slug} accentColor={book.accentColor} />

      {/* ══════════════════════════════════════════════════════════════════
          GET THE BOOK — bottom CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: book.gradient,
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Stars */}
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${(i * 53 + 9) % 100}%`,
              top: `${(i * 37 + 5) % 90}%`,
              fontSize: `${8 + (i % 3) * 5}px`,
              color: heroTextLight ? "rgba(255,255,255,0.4)" : `${book.accentColor}50`,
              pointerEvents: "none",
            }}
          >
            ★
          </span>
        ))}

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Small cover */}
          {book.coverImage && (
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: 16,
                overflow: "hidden",
                margin: "0 auto 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src={book.coverImage}
                alt={book.title}
                width={100}
                height={100}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          <h2
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(24px, 4.5vw, 48px)",
              color: heroTextColor,
              marginBottom: 12,
              textShadow: heroTextLight ? "0 2px 16px rgba(0,0,0,0.4)" : "none",
            }}
          >
            Love {book.title}?
          </h2>
          <p
            style={{
              fontSize: "clamp(14px, 2vw, 18px)",
              color: heroSubColor,
              marginBottom: 32,
              maxWidth: 480,
              margin: "0 auto 32px",
              lineHeight: 1.5,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            Get your copy on Amazon and bring {book.landName} home with you. 🌟
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="book-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 50,
                backgroundColor: "#ff9c1a",
                color: "#fff",
                fontWeight: 900,
                fontSize: 17,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(255,156,26,0.5)",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              Get {book.title} on Amazon →
            </a>

            <Link
              href="/"
              className="book-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                borderRadius: 50,
                backgroundColor: "rgba(255,255,255,0.15)",
                color: heroTextLight ? "#fff" : "#333",
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                border: `2px solid ${heroTextLight ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.25)"}`,
                backdropFilter: "blur(4px)",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              ← Browse all books
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
