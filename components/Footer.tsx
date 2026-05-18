"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { books } from "@/lib/books";

// Books with dark hero gradients
const darkGradientSlugs = [
  "amber-the-dragon-keeper",
  "dream-ideas",
  "ollie-come-home",
  "frog-a-dog",
  "brian-the-ghost",
  "the-lumpiest-pumpkin",
];

// Extract last hex color stop from a CSS gradient (the darkest end)
function gradientLastColor(gradient: string): string {
  const matches = gradient.match(/#[0-9a-fA-F]{6}/g);
  return matches?.[0] ?? "#0d0b1e";
}

function useFooterTheme() {
  const pathname = usePathname();
  const slug = pathname?.startsWith("/books/") ? pathname.split("/")[2] : null;
  const book = slug ? books.find((b) => b.slug === slug) : null;

  if (book && darkGradientSlugs.includes(book.slug)) {
    const bg = gradientLastColor(book.gradient);
    return {
      mainBg: bg,
      bottomBg: bg,
      linkColor: book.accentColor,
      textColor: "rgba(255,255,255,0.75)",
      copyrightColor: "rgba(255,255,255,0.4)",
      socialColor: "rgba(255,255,255,0.6)",
    };
  }

  // Default dark theme for all other pages
  return {
    mainBg: "#0d0b1e",
    bottomBg: "#060415",
    linkColor: "#c9b0ff",
    textColor: "rgba(255,255,255,0.75)",
    copyrightColor: "#6b6080",
    socialColor: "#a89ec9",
  };
}

export default function Footer() {
  const theme = useFooterTheme();

  return (
    <footer>
      {/* Main footer area */}
      <div style={{ backgroundColor: theme.mainBg, color: theme.textColor }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/images/logo-detail-860.png" alt="Family Fables" width={44} height={44} />
                <span
                  className="text-xl"
                  style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", color: "#ffffff" }}
                >
                  Family Fables
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.textColor, fontFamily: "var(--font-open-sans), 'Open Sans', sans-serif" }}>
                Stories that warm little hearts and spark big imaginations.
              </p>
            </div>

            {/* Explore */}
            <div>
              <Link
                href="/"
                className="hover:opacity-75 transition-opacity"
                style={{ color: theme.linkColor, display: "inline-block", fontWeight: 700, fontSize: "26px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
              >
                Explore
              </Link>
            </div>

            {/* Shop */}
            <div>
              <a
                href="https://www.amazon.com/familyfables"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition-opacity"
                style={{ color: theme.linkColor, display: "inline-block", fontWeight: 700, fontSize: "26px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
              >
                Shop
              </a>
            </div>

            {/* About Us */}
            <div>
              <Link
                href="/about"
                className="hover:opacity-75 transition-opacity"
                style={{ color: theme.linkColor, display: "inline-block", fontWeight: 700, fontSize: "26px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
              >
                About Us
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div style={{ backgroundColor: theme.bottomBg }}>
        <div
          className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs footer-bottom-row"
          style={{ color: theme.copyrightColor }}
        >
          <p>Copyright {new Date().getFullYear()} | Family Fables LLC</p>
          <div className="flex gap-3">
            {[
              { label: "Facebook", url: "https://www.facebook.com/familyfables/" },
              { label: "Instagram", url: "https://www.instagram.com/familyfables/" },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: theme.socialColor, fontSize: "13px" }}
                className="hover:opacity-75 transition-opacity"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
