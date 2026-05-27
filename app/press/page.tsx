import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Press & Media Kit",
  description:
    "Family Fables press kit — author bio, book list with cover images, brand assets, and contact information for media inquiries, reviews, and blog features.",
  alternates: {
    canonical: "https://familyfables.org/press",
  },
  openGraph: {
    title: "Family Fables Press & Media Kit",
    description:
      "Everything bloggers, reviewers, and media contacts need: author bio, book covers, brand assets, and press contact information.",
    url: "https://familyfables.org/press",
    type: "website",
    images: [
      {
        url: "/images/logo-detail-860.png",
        width: 860,
        height: 860,
        alt: "Family Fables logo",
      },
    ],
  },
};

const books = [
  {
    title: "Amber the Dragon Keeper",
    slug: "amber-the-dragon-keeper",
    cover: "/images/books/amber-cover-square.jpg",
    ageRange: "Ages 4–9",
    description: "A young keeper must earn the trust of a magnificent dragon through patience and courage.",
    themes: ["Adventure", "Friendship", "Responsibility"],
  },
  {
    title: "Brian the Ghost",
    slug: "brian-the-ghost",
    cover: "/images/books/brian-the-ghost.png",
    ageRange: "Ages 3–8",
    description: "A lovably confused ghost trying to figure out what ghosts are actually supposed to do.",
    themes: ["Humor", "Identity", "Belonging"],
  },
  {
    title: "Dream Ideas",
    slug: "dream-ideas",
    cover: "/images/books/dream-ideas.png",
    ageRange: "Ages 3–7",
    description: "An invitation to dream and imagine — perfect for bedtime and creative children everywhere.",
    themes: ["Imagination", "Bedtime", "Creativity"],
  },
  {
    title: "Frog a Dog",
    slug: "frog-a-dog",
    cover: "/images/books/frog-a-dog.png",
    ageRange: "Ages 3–8",
    description: "A dog who is absolutely certain he is a frog — and lives his best amphibian life.",
    themes: ["Identity", "Humor", "Self-acceptance"],
  },
  {
    title: "Gilroy's Gobble",
    slug: "gilroys-gobble",
    cover: "/images/books/gilroys-gobble.png",
    ageRange: "Ages 3–7",
    description: "Gilroy the turkey takes gobbling very seriously. A seasonal favorite with timeless humor.",
    themes: ["Humor", "Determination", "Holidays"],
  },
  {
    title: "Finding Hampton",
    slug: "finding-hampton",
    cover: "/images/books/finding-hampton.png",
    ageRange: "Ages 3–7",
    description: "A search for something missing becomes a discovery of something much more important.",
    themes: ["Adventure", "Family", "Discovery"],
  },
  {
    title: "The Lumpiest Pumpkin",
    slug: "the-lumpiest-pumpkin",
    cover: "/images/books/lumpiest-pumpkin.png",
    ageRange: "Ages 3–7",
    description: "A wonderfully lumpy pumpkin finds out that different is its own kind of perfect.",
    themes: ["Self-acceptance", "Halloween", "Kindness"],
  },
  {
    title: "Ollie Come Home",
    slug: "ollie-come-home",
    cover: "/images/books/ollie-come-home.png",
    ageRange: "Ages 3–7",
    description: "A beloved cat's journey home — warm, reassuring, and perfect for anxious or homesick children.",
    themes: ["Comfort", "Family", "Home"],
  },
  {
    title: "One Tom Turkey",
    slug: "one-tom-turkey",
    cover: "/images/books/one-tom-turkey.png",
    ageRange: "Ages 3–6",
    description: "A counting adventure with the most important turkey of the season.",
    themes: ["Counting", "Humor", "Holidays"],
  },
  {
    title: "The Shut-In Button",
    slug: "the-shut-in-button",
    cover: "/images/books/shut-in-button.png",
    ageRange: "Ages 4–8",
    description: "What does the button do? A playful story about curiosity, imagination, and what happens when you press it.",
    themes: ["Imagination", "Curiosity", "Adventure"],
  },
  {
    title: "What-a-Doodle-Do",
    slug: "what-a-doodle-do",
    cover: "/images/books/what-a-doodle-do.jpg",
    ageRange: "Ages 2–6",
    description: "The barnyard's most enthusiastic rooster is ready for his big moment. A read-aloud crowd-pleaser.",
    themes: ["Humor", "Music", "Animals"],
  },
  {
    title: "What's Your Poo Poo Face?",
    slug: "whats-your-poo-poo-face",
    cover: "/images/books/poo-poo-face.png",
    ageRange: "Ages 2–6",
    description: "An interactive face-making book that turns read-aloud time into a performance. Toilet humor guaranteed.",
    themes: ["Humor", "Interactive", "Faces"],
  },
];

export default function PressPage() {
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #009380 0%, #00b8a2 50%, #4dd0bb 100%)",
          padding: "80px 24px 100px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.8)",
              marginBottom: 12,
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Media & Bloggers
          </p>
          <h1
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Press & Media Kit
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.7,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              maxWidth: 580,
              margin: "0 auto",
            }}
          >
            Everything you need to write about, feature, or review Family Fables books — author bio, book descriptions, cover images, and contact information.
          </p>
        </div>
      </section>

      <div style={{ background: "#f9f5ff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Contact first */}
          <section style={{ marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 8,
              }}
            >
              📬 Press Contact
            </h2>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#009380", marginBottom: 24, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
              For review copies, interview requests, or blog collaborations
            </p>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "32px 40px",
                boxShadow: "0 4px 24px rgba(45,27,105,0.08)",
                display: "flex",
                flexWrap: "wrap",
                gap: 32,
              }}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#2D1B69", marginBottom: 4, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Author & Publisher</p>
                <p style={{ fontSize: 16, color: "#4a3a6e", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>Z.P. Phillips · Family Fables</p>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#2D1B69", marginBottom: 4, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Email</p>
                <p style={{ fontSize: 16, color: "#009380", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
                  <a href="mailto:press@familyfables.org" style={{ color: "#009380", fontWeight: 700 }}>press@familyfables.org</a>
                </p>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#2D1B69", marginBottom: 4, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Website</p>
                <p style={{ fontSize: 16, color: "#009380", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
                  <a href="https://familyfables.org" style={{ color: "#009380", fontWeight: 700 }}>familyfables.org</a>
                </p>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#2D1B69", marginBottom: 4, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>Response Time</p>
                <p style={{ fontSize: 16, color: "#4a3a6e", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>Within 48 hours</p>
              </div>
            </div>
          </section>

          {/* Author bio */}
          <section style={{ marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 24,
              }}
            >
              ✍️ Author Bio
            </h2>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px",
                boxShadow: "0 4px 24px rgba(45,27,105,0.08)",
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: "0 0 auto" }}>
                <Image
                  src="/images/logo-teal.png"
                  alt="Family Fables logo — Z.P. Phillips children's books"
                  width={120}
                  height={120}
                  loading="lazy"
                  style={{ borderRadius: 16, display: "block" }}
                />
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                    fontSize: "clamp(20px, 3vw, 26px)",
                    color: "#2D1B69",
                    marginBottom: 12,
                  }}
                >
                  Z.P. Phillips
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#4a3a6e",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    marginBottom: 16,
                  }}
                >
                  Z.P. Phillips is the author and publisher of Family Fables, a children's book company he founded to honor the creative legacy of his grandfather, artist and illustrator Victor Plotkin. Growing up surrounded by Victor's imaginative illustrations, Zach developed a deep love for stories that bring families together — books that are joyful for children and engaging enough that parents actually enjoy reading them too.
                </p>
                <p
                  style={{
                    fontSize: 16,
                    color: "#4a3a6e",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                    marginBottom: 16,
                  }}
                >
                  Family Fables publishes whimsical, humor-forward picture books for children ages 2–10, with a focus on interactive read-aloud experiences. All 12 books are freely readable online at familyfables.org, with narration, animations, and built-in games and activities. Physical editions are available on Amazon.
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "#009380",
                    fontWeight: 700,
                    fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                  }}
                >
                  <Link href="/about" style={{ color: "#009380" }}>Read the full story →</Link>
                </p>
              </div>
            </div>

            {/* Short bio for copy-paste */}
            <div
              style={{
                background: "#ede9ff",
                borderRadius: 16,
                padding: "24px 32px",
                marginTop: 20,
                border: "1.5px dashed #a78bfa",
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#78087c", marginBottom: 8, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                Short Bio (for copy/paste):
              </p>
              <p style={{ fontSize: 15, color: "#2D1B69", lineHeight: 1.65, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", fontStyle: "italic" }}>
                Z.P. Phillips is the author of Family Fables, a series of whimsical, humor-forward children's picture books for ages 2–10. His books are freely readable online at familyfables.org, with narration and interactive activities built in. Physical editions are available on Amazon. Phillips founded Family Fables to honor his grandfather, artist Victor Plotkin.
              </p>
            </div>
          </section>

          {/* About Family Fables */}
          <section style={{ marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 24,
              }}
            >
              📖 About Family Fables
            </h2>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px",
                boxShadow: "0 4px 24px rgba(45,27,105,0.08)",
                fontSize: 16,
                color: "#4a3a6e",
                lineHeight: 1.75,
                fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              }}
            >
              <p style={{ marginBottom: 16 }}>
                Family Fables is a children's book publisher dedicated to joyful, whimsical stories that bring families together. Founded by Z.P. Phillips, the company publishes humor-forward picture books featuring memorable animal characters, imaginative worlds, and read-aloud rhythms that make every bedtime or car ride more fun.
              </p>
              <p style={{ marginBottom: 16 }}>
                The Family Fables catalog currently includes 12 titles spanning Halloween, Thanksgiving, bedtime, adventure, and everyday silliness — all freely readable online with narration and interactive activities. Physical editions are available on Amazon.
              </p>
              <p>
                <strong>Key facts:</strong> 12 books · Ages 2–10 · Free online reading · Interactive read-aloud with narration · Activities and games per book · Physical editions on Amazon · Founded 2024
              </p>
            </div>
          </section>

          {/* Books with cover images */}
          <section style={{ marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 8,
              }}
            >
              📚 Book Catalog
            </h2>
            <p style={{ fontSize: 15, color: "#4a3a6e", marginBottom: 32, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif" }}>
              Cover images are available for press use. Right-click any cover to save, or{" "}
              <a href="mailto:press@familyfables.org" style={{ color: "#009380", fontWeight: 700 }}>email us</a>{" "}
              for hi-res files.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {books.map((book) => (
                <div
                  key={book.slug}
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    padding: "24px",
                    boxShadow: "0 4px 20px rgba(45,27,105,0.07)",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <Image
                      src={book.cover}
                      alt={`${book.title} book cover`}
                      width={80}
                      height={80}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                        fontSize: 16,
                        color: "#2D1B69",
                        marginBottom: 4,
                        lineHeight: 1.2,
                      }}
                    >
                      <Link href={`/books/${book.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                        {book.title}
                      </Link>
                    </h3>
                    <p style={{ fontSize: 12, color: "#009380", fontWeight: 700, marginBottom: 6, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                      {book.ageRange}
                    </p>
                    <p style={{ fontSize: 13, color: "#4a3a6e", lineHeight: 1.5, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", marginBottom: 6 }}>
                      {book.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {book.themes.map((t) => (
                        <span key={t} style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: "#f3e8ff", color: "#78087c", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand assets */}
          <section style={{ marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 24,
              }}
            >
              🎨 Brand Assets
            </h2>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px",
                boxShadow: "0 4px 24px rgba(45,27,105,0.08)",
                display: "flex",
                flexWrap: "wrap",
                gap: 32,
                alignItems: "center",
              }}
            >
              {[
                { src: "/images/logo-teal.png", label: "Logo — Teal", bg: "#ffffff" },
                { src: "/images/logo-purple.png", label: "Logo — Purple", bg: "#f9f5ff" },
                { src: "/images/logo-final-teal.png", label: "Logo — Full Color", bg: "#ffffff" },
                { src: "/images/logo-detail-860.png", label: "Logo — Detail (860px)", bg: "#f0f0f0" },
              ].map((asset) => (
                <div key={asset.label} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 16,
                      background: asset.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 8,
                      overflow: "hidden",
                      border: "1.5px solid #e8e0f0",
                    }}
                  >
                    <Image
                      src={asset.src}
                      alt={asset.label}
                      width={100}
                      height={100}
                      loading="lazy"
                      style={{ objectFit: "contain", maxWidth: "90%", maxHeight: "90%" }}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: "#4a3a6e", fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                    {asset.label}
                  </p>
                </div>
              ))}
              <p style={{ width: "100%", fontSize: 14, color: "#4a3a6e", fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", marginTop: 8 }}>
                Hi-res versions and additional assets available on request:{" "}
                <a href="mailto:press@familyfables.org" style={{ color: "#009380", fontWeight: 700 }}>press@familyfables.org</a>
              </p>
            </div>
          </section>

          {/* Quick facts */}
          <section style={{ marginBottom: 72 }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(22px, 3.5vw, 36px)",
                color: "#2D1B69",
                marginBottom: 24,
              }}
            >
              📊 Key Facts for Journalists
            </h2>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px",
                boxShadow: "0 4px 24px rgba(45,27,105,0.08)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 24,
              }}
            >
              {[
                { label: "Books in catalog", value: "12 titles" },
                { label: "Target audience", value: "Ages 2–10" },
                { label: "Online reading", value: "Free, no login" },
                { label: "Devices", value: "All browsers & mobile" },
                { label: "Read-aloud narration", value: "All 12 books" },
                { label: "Interactive activities", value: "Per book" },
                { label: "Physical editions", value: "Available on Amazon" },
                { label: "Founded", value: "2024" },
                { label: "Author", value: "Z.P. Phillips" },
                { label: "Inspired by", value: "Victor Plotkin" },
              ].map((fact) => (
                <div key={fact.label}>
                  <p style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#009380", marginBottom: 4, fontFamily: "var(--font-catamaran),'Catamaran',sans-serif" }}>
                    {fact.label}
                  </p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#2D1B69", fontFamily: "var(--font-concert-one),'Concert One',cursive" }}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", background: "#dcf9f3", borderRadius: 24, padding: "48px" }}>
            <h2
              style={{
                fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                fontSize: "clamp(20px, 3.5vw, 32px)",
                color: "#2D1B69",
                marginBottom: 12,
              }}
            >
              Ready to Feature Family Fables?
            </h2>
            <p style={{ fontSize: 16, color: "#4a3a6e", marginBottom: 24, fontFamily: "var(--font-open-sans),'Open Sans',sans-serif", lineHeight: 1.6 }}>
              We respond to all press inquiries within 48 hours. Review copies, author interviews, and exclusive content are available on request.
            </p>
            <a
              href="mailto:press@familyfables.org"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                borderRadius: 50,
                background: "#78087c",
                color: "#fff",
                fontWeight: 900,
                fontSize: 16,
                textDecoration: "none",
                fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                boxShadow: "0 6px 24px rgba(120,8,124,0.3)",
              }}
            >
              📬 Email the Press Team
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
