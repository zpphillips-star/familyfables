import Image from "next/image";
import Link from "next/link";
import { books, AMAZON_STORE_URL } from "@/lib/books";
import BookCard from "@/components/BookCard";

export default function HomePage() {
  const featuredBooks = books.filter((b) => b.image).slice(0, 4);

  return (
    <div style={{ overflowX: "hidden" }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative"
        style={{
          background: "linear-gradient(160deg, #7B2FBE 0%, #4A1A8C 40%, #2D1B69 100%)",
          minHeight: "92vh",
          paddingBottom: "140px",
        }}
      >
        {/* Stars scattered */}
        {[
          { top: "8%",  left: "6%",  size: "2.5rem", anim: "float-slow",  op: 0.7 },
          { top: "15%", right: "8%", size: "2rem",   anim: "float-mid",   op: 0.5 },
          { top: "55%", left: "3%",  size: "1.5rem", anim: "float-fast",  op: 0.4 },
          { top: "70%", right: "5%", size: "3rem",   anim: "float-slow",  op: 0.35 },
          { top: "30%", left: "45%", size: "1.2rem", anim: "float-mid",   op: 0.3 },
          { top: "80%", left: "25%", size: "1.8rem", anim: "float-slow",  op: 0.45 },
        ].map((s, i) => (
          <div
            key={i}
            className={`absolute ${s.anim} pointer-events-none select-none`}
            style={{ top: s.top, left: s.left, right: s.right as string | undefined, fontSize: s.size, opacity: s.op }}
            aria-hidden
          >✨</div>
        ))}

        {/* Moon */}
        <div className="absolute top-10 right-16 text-5xl float-mid opacity-60 pointer-events-none select-none" aria-hidden>🌙</div>

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
              Imagination ✨
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
          <div className="flex-1 flex justify-center items-end relative z-10" style={{ minHeight: "400px" }}>
            {/* Back-left book */}
            <div
              className="absolute w-44 h-56 rounded-2xl overflow-hidden shadow-2xl float-slow"
              style={{ transform: "rotate(-14deg) translate(-110px, 30px)", zIndex: 1, opacity: 0.9 }}
            >
              {books[2]?.image && (
                <Image src={books[2].image} alt={books[2].title} fill className="object-cover" sizes="180px" />
              )}
            </div>
            {/* Back-right book */}
            <div
              className="absolute w-44 h-56 rounded-2xl overflow-hidden shadow-2xl float-mid"
              style={{ transform: "rotate(12deg) translate(110px, 25px)", zIndex: 1, opacity: 0.9 }}
            >
              {books[3]?.image && (
                <Image src={books[3].image} alt={books[3].title} fill className="object-cover" sizes="180px" />
              )}
            </div>
            {/* Front center book — overlaps the cloud divider below */}
            <div
              className="relative w-56 h-72 rounded-2xl overflow-hidden float-slow z-20"
              style={{
                boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(244,168,57,0.3)",
                marginBottom: "-80px",
              }}
            >
              {books[0]?.image && (
                <Image src={books[0].image} alt={books[0].title} fill className="object-cover" sizes="240px" priority />
              )}
            </div>
          </div>
        </div>

        {/* ── Cloud divider ── bleeds into next section */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden style={{ zIndex: 5 }}>
          <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <path d="
              M0,160 L0,110
              C40,95 60,75 100,78 C120,79 135,90 155,92 C175,94 190,82 215,76
              C240,70 260,72 285,80 C305,86 320,98 345,100 C370,102 390,90 415,84
              C440,78 465,80 490,88 C510,94 528,104 555,106 C580,108 600,96 625,90
              C650,84 675,86 700,94 C722,101 738,112 762,114 C786,116 806,104 830,98
              C854,92 878,93 902,100 C922,106 938,116 962,118 C986,120 1006,108 1030,102
              C1054,96 1078,97 1102,104 C1122,110 1138,120 1162,122 C1186,124 1210,114 1234,108
              C1258,102 1282,102 1306,108 C1326,113 1342,122 1366,124 C1396,127 1420,118 1440,112
              L1440,160 Z
            " fill="#FDF8F2"/>
          </svg>
        </div>
      </section>

      {/* ─── BOOKS SECTION ──────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-10 px-4"
        style={{ backgroundColor: "#FDF8F2", zIndex: 4 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-fredoka), cursive", color: "#2D1B69" }}
            >
              Books Kids Love 💜
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#7B6898" }}>
              From giggle-out-loud potty humor to heartwarming tales of confidence and friendship.
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
              See All 11 Books →
            </Link>
          </div>
        </div>

        {/* ── Cloud divider into purple section below ── */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden>
          <svg viewBox="0 0 1440 130" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <path d="
              M0,130 L0,90
              C30,78 55,62 85,65 C108,67 125,80 152,83 C178,86 198,72 225,66
              C252,60 275,63 298,72 C318,80 335,93 362,95 C388,97 408,85 433,79
              C458,73 482,75 506,83 C528,90 545,102 572,104 C598,106 620,94 645,88
              C670,82 695,84 720,93 C742,101 758,112 783,113 C808,114 828,103 853,97
              C878,91 903,93 928,101 C950,108 967,118 993,119 C1018,120 1040,109 1065,103
              C1090,97 1115,98 1140,106 C1162,113 1178,122 1204,123 C1230,124 1255,114 1280,108
              C1305,102 1330,103 1355,110 C1376,116 1395,124 1420,125 L1440,126 L1440,130 Z
            " fill="#4A1A8C"/>
          </svg>
        </div>
      </section>

      {/* ─── ABOUT BAND ─────────────────────────────────────────────────────── */}
      <section
        className="relative pt-24 pb-28 px-4 text-center"
        style={{ backgroundColor: "#4A1A8C" }}
      >
        {/* Floating stars */}
        <div className="absolute top-12 left-10 text-3xl float-slow opacity-40 pointer-events-none" aria-hidden>⭐</div>
        <div className="absolute bottom-20 right-12 text-2xl float-mid opacity-30 pointer-events-none" aria-hidden>✨</div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div
            className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
            style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
          >
            🌿 About Family Fables
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-5"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "#FFFFFF" }}
          >
            Stories Built on a Family Legacy
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#C4B3E8" }}>
            Family Fables was inspired by Z.P. Phillips&apos; grandfather — a creative soul
            who spent his life writing poems and stories that the world never got to read.
            That legacy of imagination and love is woven into every book we publish.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3.5 rounded-xl font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
          >
            Our Story →
          </Link>
        </div>

        {/* ── Cloud divider into cream below ── */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" aria-hidden>
          <svg viewBox="0 0 1440 110" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <path d="
              M0,110 L0,75
              C35,62 58,46 90,50 C115,53 132,67 160,70 C188,73 208,59 238,53
              C268,47 292,51 316,60 C338,68 355,80 384,82 C412,84 432,72 458,67
              C484,62 508,64 533,72 C556,79 573,91 600,93 C626,95 648,84 673,78
              C698,72 724,74 750,83 C772,91 789,102 816,103 C842,104 862,93 888,87
              C914,81 940,83 966,92 C988,100 1005,110 1031,110
              C1057,110 1079,99 1104,93 C1130,87 1155,88 1180,97 C1202,104 1218,110 1244,110
              C1270,110 1295,100 1320,94 C1345,88 1370,89 1395,97 L1440,105 L1440,110 Z
            " fill="#FDF8F2"/>
          </svg>
        </div>
      </section>

      {/* ─── PULL QUOTE ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4" style={{ backgroundColor: "#FDF8F2" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6 float-slow inline-block">💜</div>
          <blockquote
            className="text-2xl sm:text-3xl font-bold leading-relaxed mb-6"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "#6B3FA0" }}
          >
            &ldquo;My kids ask for Gilroy&apos;s Gobble every single night.
            It&apos;s become our bedtime ritual!&rdquo;
          </blockquote>
          <p className="font-semibold" style={{ color: "#7B6898" }}>
            — Happy Parent, Amazon Review ⭐⭐⭐⭐⭐
          </p>
        </div>
      </section>

      {/* ─── SHOP CTA ───────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #F4A839 0%, #E8932A 100%)",
        }}
      >
        {/* Cloud top edge */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden style={{ transform: "rotate(180deg)" }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
            <path d="
              M0,80 L0,50
              C30,38 55,24 85,28 C108,31 125,44 152,47 C178,50 198,36 225,31
              C252,26 275,29 298,38 C318,46 335,58 362,60 C388,62 408,50 433,45
              C458,40 482,42 506,50 C528,57 545,68 572,70 C598,72 620,60 645,55
              C670,50 695,52 720,61 C742,69 758,78 783,79 L1440,80 Z
            " fill="#FDF8F2"/>
          </svg>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 pt-8">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-fredoka), cursive", color: "#2D1B69" }}
          >
            Ready to Start Reading? 🚀
          </h2>
          <p className="text-base mb-8" style={{ color: "#5C3A00" }}>
            All Family Fables books are available on Amazon with fast shipping.
            Perfect for birthdays, holidays, or just because!
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-block px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:-translate-y-1"
            style={{ backgroundColor: "#2D1B69", color: "#FFFFFF" }}
          >
            Shop All Books on Amazon 📚
          </a>
        </div>
      </section>

    </div>
  );
}
