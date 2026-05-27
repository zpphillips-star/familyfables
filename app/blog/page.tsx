import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Children's Books Tips & Ideas",
  description:
    "The Family Fables blog: tips for reading aloud to kids, best bedtime books, interactive storybooks, and more. Spark imagination with every page.",
  alternates: {
    canonical: "https://familyfables.org/blog",
  },
  openGraph: {
    title: "Family Fables Blog — Children\u2019s Books Tips & Ideas",
    description:
      "Tips for reading aloud, best bedtime books, interactive storybooks, and more from the authors of Family Fables.",
    url: "https://familyfables.org/blog",
    type: "website",
    images: [
      {
        url: "/images/logo-detail-860.png",
        width: 860,
        height: 860,
        alt: "Family Fables Blog",
      },
    ],
  },
};

const posts = [
  {
    slug: "funny-kids-read-aloud-books",
    title: "The 5 Funniest Read-Aloud Books for Kids (That Parents Will Actually Love Too)",
    excerpt:
      "Great read-aloud books should make the whole family giggle. We rounded up the funniest picture books — and why humor is one of the best tools for building early literacy.",
    date: "2025-05-01",
    emoji: "😂",
    readTime: "5 min read",
  },
  {
    slug: "best-childrens-books-for-bedtime",
    title: "Best Children's Books for Bedtime: Calm, Cozy Reads for Every Age",
    excerpt:
      "The right bedtime book can transform the wind-down routine from a battle into a bonding moment. Here are the books our families reach for night after night.",
    date: "2025-05-08",
    emoji: "🌙",
    readTime: "6 min read",
  },
  {
    slug: "interactive-kids-books-online",
    title: "Interactive Kids Books Online: How Digital Storybooks Are Changing Story Time",
    excerpt:
      "Interactive digital storybooks let kids tap, listen, and play inside the story. We explore what makes a great online kids book — and share our favorites.",
    date: "2025-05-15",
    emoji: "📱",
    readTime: "5 min read",
  },
  {
    slug: "picture-books-about-animals",
    title: "10 Irresistible Picture Books About Animals Kids Will Want Read Again and Again",
    excerpt:
      "From curious cats to dancing roosters to frogs with big dreams — animal picture books never go out of style. Here are our top picks for every age.",
    date: "2025-05-22",
    emoji: "🐾",
    readTime: "4 min read",
  },
  {
    slug: "kids-books-about-imagination",
    title: "Why Imaginative Children's Books Matter (And 5 That Spark Big Ideas)",
    excerpt:
      "Books that celebrate imagination teach kids that their ideas have value. Here's why it matters — and which titles we think do it best.",
    date: "2025-05-29",
    emoji: "💫",
    readTime: "5 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Header */}
      <section
        style={{
          background: "linear-gradient(135deg, #1e0a4e 0%, #3b0d6b 60%, #5c1a8a 100%)",
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
              color: "#a78bfa",
              marginBottom: 12,
              fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
            }}
          >
            Stories, Tips & Ideas
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
            The Family Fables Blog
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.7,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
            }}
          >
            Tips for reading aloud, the best books for bedtime, and ideas for making story time unforgettable — for every family.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section style={{ background: "#f9f5ff", padding: "72px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "32px",
                boxShadow: "0 4px 24px rgba(45,27,105,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 40 }}>{post.emoji}</span>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#009380",
                  fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                }}
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                · {post.readTime}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-concert-one), 'Concert One', cursive",
                  fontSize: "clamp(17px, 2vw, 22px)",
                  color: "#2D1B69",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {post.title}
                </Link>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#4a3a6e",
                  lineHeight: 1.65,
                  fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
                  flexGrow: 1,
                }}
              >
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: "#78087c",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  fontFamily: "var(--font-catamaran), 'Catamaran', sans-serif",
                }}
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "#dcf9f3",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-concert-one), 'Concert One', cursive",
              fontSize: "clamp(22px, 3.5vw, 36px)",
              color: "#2D1B69",
              marginBottom: 16,
            }}
          >
            Ready to Start Reading?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#4a3a6e",
              marginBottom: 28,
              fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Browse all 12 Family Fables books and read them free online — with sound, animations, and activities built right in.
          </p>
          <Link
            href="/"
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
              boxShadow: "0 6px 24px rgba(120,8,124,0.35)",
            }}
          >
            Explore All Books →
          </Link>
        </div>
      </section>
    </div>
  );
}
