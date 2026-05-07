import Image from "next/image";
import Link from "next/link";
import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";

// Narwhal SVG mascot
function Narwhal({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg" className={className} style={style} aria-hidden>
      {/* Horn */}
      <path d="M60,62 L10,18" stroke="#F4A839" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="none" fill="none"/>
      <path d="M62,60 L15,14" stroke="#E8932A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <ellipse cx="145" cy="88" rx="98" ry="45" fill="#4CC9C9"/>
      {/* Belly */}
      <ellipse cx="148" cy="102" rx="72" ry="25" fill="#A8ECEC" opacity="0.7"/>
      {/* Head bump */}
      <ellipse cx="62" cy="77" rx="40" ry="36" fill="#4CC9C9"/>
      {/* Eye */}
      <circle cx="55" cy="68" r="8" fill="white"/>
      <circle cx="57" cy="68" r="5" fill="#2D1B69"/>
      <circle cx="59" cy="66" r="1.5" fill="white"/>
      {/* Smile */}
      <path d="M45,82 Q55,90 66,82" stroke="#2D1B69" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Cheek blush */}
      <ellipse cx="48" cy="79" rx="7" ry="4" fill="#F9A8D4" opacity="0.5"/>
      {/* Spots */}
      <circle cx="120" cy="72" r="5" fill="#38B2B2" opacity="0.4"/>
      <circle cx="150" cy="64" r="4" fill="#38B2B2" opacity="0.3"/>
      <circle cx="175" cy="75" r="6" fill="#38B2B2" opacity="0.3"/>
      {/* Dorsal fin */}
      <path d="M160,45 Q170,25 185,43 L160,50 Z" fill="#38B2B2"/>
      {/* Tail */}
      <path d="M238,73 Q260,50 265,88 Q260,125 238,103 Z" fill="#38B2B2"/>
      <path d="M238,73 Q248,88 238,103" stroke="#2BA0A0" strokeWidth="2" fill="none"/>
      {/* Flippers */}
      <path d="M100,118 Q90,140 115,135 Q108,122 100,118 Z" fill="#38B2B2"/>
      <path d="M160,118 Q155,140 178,133 Q168,120 160,118 Z" fill="#38B2B2"/>
      {/* Little stars around */}
      <text x="210" y="40" fontSize="14" fill="#F4A839" opacity="0.8">✦</text>
      <text x="30" y="30" fontSize="10" fill="#F4A839" opacity="0.6">✦</text>
      <text x="230" y="130" fontSize="10" fill="#C084FC" opacity="0.7">✦</text>
    </svg>
  );
}

// Cloud divider SVG
function CloudDivider({ fill, fromFill, flip = false }: { fill: string; fromFill?: string; flip?: boolean }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden
      style={{ transform: flip ? "scaleY(-1)" : "none", zIndex: 5 }}>
      <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
        {fromFill && <rect width="1440" height="160" fill={fromFill}/>}
        <path d="
          M0,160 L0,105
          C25,88 50,70 80,73 C105,76 122,92 150,95 C178,98 200,82 228,75
          C256,68 280,71 305,81 C326,90 343,104 372,107 C400,110 422,96 450,89
          C478,82 504,84 530,94 C553,102 570,115 598,117 C625,119 648,106 675,99
          C702,92 728,94 754,104 C778,113 795,124 822,126 C850,128 872,115 900,108
          C928,101 955,103 982,113 C1005,121 1022,132 1050,134
          C1078,136 1102,123 1130,116 C1158,109 1185,111 1212,120 C1235,128 1252,138 1280,140
          C1308,142 1335,132 1362,125 C1388,118 1414,120 1440,128
          L1440,160 Z
        " fill={fill}/>
      </svg>
    </div>
  );
}

export default function HomePage() {
  const featuredBooks = books.filter((b) => b.image).slice(0, 6);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative"
        style={{
          background: "linear-gradient(160deg, #9B3FCF 0%, #5A1FA0 35%, #2D0D6B 70%, #1C0A4F 100%)",
          minHeight: "92vh",
          paddingBottom: "160px",
        }}
      >
        {/* ── Scattered magic: stars, sparkles, moon ── */}
        <div className="absolute top-8 left-8 text-4xl float-slow opacity-70 pointer-events-none select-none" aria-hidden>⭐</div>
        <div className="absolute top-16 right-20 text-5xl float-mid opacity-50 pointer-events-none select-none" aria-hidden>🌙</div>
        <div className="absolute top-1/3 left-4 text-2xl float-fast opacity-40 pointer-events-none select-none" aria-hidden>✨</div>
        <div className="absolute top-1/2 right-6 text-3xl float-slow opacity-35 pointer-events-none select-none" aria-hidden>⭐</div>
        <div className="absolute top-3/4 left-20 text-xl float-mid opacity-45 pointer-events-none select-none" aria-hidden>✦</div>
        <div className="absolute top-1/4 left-1/2 text-lg float-slow opacity-30 pointer-events-none select-none" aria-hidden>✨</div>
        <div className="absolute top-2/3 right-16 text-2xl float-fast opacity-40 pointer-events-none select-none" aria-hidden>🌟</div>
        {/* Rainbow arc decoration */}
        <div className="absolute top-6 left-1/3 pointer-events-none opacity-20" aria-hidden>
          <svg width="200" height="80" viewBox="0 0 200 80">
            <path d="M10,70 Q100,-10 190,70" stroke="#F4A839" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M20,75 Q100,5 180,75" stroke="#E86BB5" strokeWidth="5" fill="none" strokeLinecap="round"/>
            <path d="M30,78 Q100,15 170,78" stroke="#4CC9C9" strokeWidth="4" fill="none" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-8 flex flex-col lg:flex-row items-center gap-10 min-h-[80vh]">

          {/* Left: text */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-6"
              style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
            >
              📚 Children&apos;s Books for Every Family
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: "var(--font-fredoka), cursive", color: "#FFFFFF" }}
            >
              Stories That<br />
              <span style={{ color: "#F4A839" }}>Spark</span> Every<br />
              <span style={{ color: "#4CC9C9" }}>Imagination</span> ✨
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0" style={{ color: "#D4C5F0" }}>
              Joyful, whimsical children&apos;s books that warm little hearts
              and create lasting family memories — one story at a time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/books"
                className="btn-shine px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:-translate-y-1"
                style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
              >
                Explore Our Books 📖
              </Link>
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all hover:-translate-y-1"
                style={{ borderColor: "rgba(255,255,255,0.5)", color: "#FFFFFF" }}
              >
                Shop on Amazon →
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 justify-center lg:justify-start text-sm font-semibold" style={{ color: "#C4B3E8" }}>
              <span>📚 11 Books Published</span>
              <span>⭐ Ages 2–8</span>
              <span>🌍 Ships Worldwide</span>
            </div>
          </div>

          {/* Right: floating book stack */}
          <div className="flex-1 flex justify-center items-end relative z-10" style={{ minHeight: "420px" }}>
            {/* Back-left book */}
            <div
              className="absolute w-40 h-52 rounded-2xl overflow-hidden shadow-2xl float-slow"
              style={{ transform: "rotate(-16deg) translate(-120px, 20px)", zIndex: 1, opacity: 0.85 }}
            >
              {books[2]?.image && (
                <Image src={books[2].image} alt={books[2].title} fill className="object-cover" sizes="170px" />
              )}
            </div>
            {/* Back-right book */}
            <div
              className="absolute w-40 h-52 rounded-2xl overflow-hidden shadow-2xl float-mid"
              style={{ transform: "rotate(15deg) translate(120px, 15px)", zIndex: 1, opacity: 0.85 }}
            >
              {books[4]?.image && (
                <Image src={books[4].image} alt={books[4].title} fill className="object-cover" sizes="170px" />
              )}
            </div>
            {/* Far back book */}
            <div
              className="absolute w-36 h-48 rounded-2xl overflow-hidden shadow-xl float-fast"
              style={{ transform: "rotate(-5deg) translate(60px, -80px)", zIndex: 0, opacity: 0.6 }}
            >
              {books[5]?.image && (
                <Image src={books[5].image} alt={books[5].title} fill className="object-cover" sizes="150px" />
              )}
            </div>
            {/* Front center book — overlaps the cloud divider below */}
            <div
              className="relative w-56 h-72 rounded-2xl overflow-hidden float-slow z-20"
              style={{
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(244,168,57,0.35)",
                marginBottom: "-100px",
              }}
            >
              {books[0]?.image && (
                <Image src={books[0].image} alt={books[0].title} fill className="object-cover" sizes="240px" priority />
              )}
            </div>
          </div>
        </div>

        {/* ── Cloud divider — bleeds into warm cream ── */}
        <CloudDivider fill="#FDF6EE" />
      </section>

      {/* ─── BOOKS SECTION (warm cream) ────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-16 px-4"
        style={{ backgroundColor: "#FDF6EE", zIndex: 4 }}
      >
        {/* Decorative floating elements */}
        <div className="absolute top-10 right-10 text-3xl float-slow opacity-30 pointer-events-none" aria-hidden>🌸</div>
        <div className="absolute top-20 left-8 text-2xl float-mid opacity-25 pointer-events-none" aria-hidden>🌈</div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-fredoka), cursive", color: "#3B1A8C" }}
            >
              Books Kids Love 💜
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#7B6898" }}>
              From giggle-out-loud potty humor to heartwarming tales of confidence and friendship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/books"
              className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#7B2FBE", color: "#FFFFFF" }}
            >
              See All 11 Books ✨
            </Link>
          </div>
        </div>

        {/* ── Cloud into teal narwhal section ── */}
        <CloudDivider fill="#0E7C8A" />
      </section>

      {/* ─── NARWHAL MAGIC SECTION (deep teal) ─────────────────────────────── */}
      <section
        className="relative pt-32 pb-32 px-4 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #0E7C8A 0%, #0A5C70 50%, #073D52 100%)",
        }}
      >
        {/* Bubbles */}
        {[
          { left: "8%", top: "20%", size: "1rem", op: 0.25 },
          { left: "15%", top: "65%", size: "1.5rem", op: 0.2 },
          { right: "12%", top: "30%", size: "1.2rem", op: 0.3 },
          { right: "5%", top: "70%", size: "0.9rem", op: 0.2 },
          { left: "45%", top: "15%", size: "0.8rem", op: 0.25 },
          { left: "70%", top: "75%", size: "1.3rem", op: 0.2 },
        ].map((b, i) => (
          <div key={i} className={`absolute rounded-full border-2 float-${["slow","mid","fast"][i%3]} pointer-events-none`}
            style={{ left: b.left, right: (b as {right?: string}).right, top: b.top, width: b.size, height: b.size,
              borderColor: "rgba(76,201,201,0.5)", opacity: b.op }} aria-hidden />
        ))}

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          {/* Narwhal mascot — floats and swims */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="float-slow" style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}>
              <Narwhal style={{ width: "340px", maxWidth: "90vw" }} />
            </div>
          </div>
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
              style={{ backgroundColor: "#F4A839", color: "#073D52" }}
            >
              🌊 Welcome to the Magic
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-5"
              style={{ fontFamily: "var(--font-fredoka), cursive", color: "#FFFFFF" }}
            >
              Where Stories Come<br />
              <span style={{ color: "#4CC9C9" }}>Alive</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#A8E8EC" }}>
              Every Family Fables book is a little world waiting to be discovered.
              Funny, heartwarming, and full of the kind of magic that only happens
              when you open a book together.
            </p>
            <Link
              href="/books"
              className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:-translate-y-1"
              style={{ backgroundColor: "#F4A839", color: "#073D52" }}
            >
              Dive In 🐠
            </Link>
          </div>
        </div>

        {/* ── Cloud into light lavender ── */}
        <CloudDivider fill="#F0E8FF" />
      </section>

      {/* ─── ABOUT BAND (light lavender → medium purple) ────────────────────── */}
      <section
        className="relative pt-28 pb-32 px-4 text-center"
        style={{
          background: "linear-gradient(160deg, #F0E8FF 0%, #D4B8F5 30%, #9B5FD4 65%, #5A1FA0 100%)",
        }}
      >
        {/* Floating stars */}
        <div className="absolute top-16 left-12 text-4xl float-slow opacity-30 pointer-events-none" aria-hidden>⭐</div>
        <div className="absolute top-24 right-16 text-2xl float-mid opacity-25 pointer-events-none" aria-hidden>✨</div>
        <div className="absolute bottom-24 left-16 text-3xl float-fast opacity-20 pointer-events-none" aria-hidden>🌟</div>

        {/* A book floating up from the teal section */}
        <div
          className="absolute -top-14 left-1/2 float-slow z-10 pointer-events-none"
          style={{ transform: "translateX(-50%) rotate(5deg)" }}
          aria-hidden
        >
          <div className="w-28 h-36 rounded-xl overflow-hidden shadow-2xl opacity-70">
            {books[1]?.image && (
              <Image src={books[1].image} alt="" fill className="object-cover" sizes="112px" />
            )}
          </div>
        </div>

        <div className="max-w-3xl mx-auto relative z-10 pt-8">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#2D0D6B", border: "1.5px solid rgba(255,255,255,0.4)" }}
          >
            🌿 About Family Fables
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "#2D0D6B" }}
          >
            Stories Built on a Family Legacy
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#4A2080" }}>
            Family Fables was inspired by Z.P. Phillips&apos; grandfather — a creative soul
            who spent his life writing poems and stories that the world never got to read.
            That legacy of imagination and love is woven into every book we publish.
          </p>
          <Link
            href="/about"
            className="btn-shine inline-block px-8 py-3.5 rounded-xl font-bold text-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#F4A839", color: "#2D0D6B" }}
          >
            Our Story →
          </Link>
        </div>

        {/* ── Cloud into gold CTA ── */}
        <CloudDivider fill="#F4A839" />
      </section>

      {/* ─── SHOP CTA (warm sunny gold) ─────────────────────────────────────── */}
      <section
        className="relative pt-28 pb-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #F4A839 0%, #F0842A 60%, #E06A1A 100%)",
        }}
      >
        {/* Decorative sparkles */}
        <div className="absolute top-10 left-12 text-3xl float-mid opacity-40 pointer-events-none" aria-hidden>✨</div>
        <div className="absolute top-16 right-10 text-2xl float-slow opacity-35 pointer-events-none" aria-hidden>⭐</div>
        <div className="absolute bottom-10 left-1/4 text-xl float-fast opacity-30 pointer-events-none" aria-hidden>🌟</div>

        <div className="max-w-2xl mx-auto relative z-10">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "#2D0D6B" }}
          >
            Ready to Start Reading? 🚀
          </h2>
          <p className="text-lg mb-8" style={{ color: "#5C2A00" }}>
            All Family Fables books are available on Amazon.
            Perfect for birthdays, holidays, or just because!
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all hover:-translate-y-1"
            style={{ backgroundColor: "#2D0D6B", color: "#FFFFFF" }}
          >
            Shop All Books on Amazon 📚
          </a>
        </div>
      </section>

    </div>
  );
}
