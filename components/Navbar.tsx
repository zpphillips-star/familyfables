"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { books, AMAZON_STORE_URL } from "@/lib/books";

// Book slugs with dark hero gradients → need light (white) text in navbar
const darkGradientSlugs = [
  "amber-the-dragon-keeper",
  "dream-ideas",
  "ollie-come-home",
  "frog-a-dog",
  "brian-the-ghost",
  "the-lumpiest-pumpkin",
];

// Extract first hex color from a CSS gradient string
function gradientFirstColor(gradient: string): string {
  return gradient.match(/#[0-9a-fA-F]{6}/)?.[0] ?? "#dcf9f3";
}

// Build navbar palette from current path
function useNavTheme() {
  const pathname = usePathname();
  const slug = pathname?.startsWith("/books/") ? pathname.split("/")[2] : null;
  const book = slug ? books.find((b) => b.slug === slug) : null;

  if (book) {
    const isDark = darkGradientSlugs.includes(book.slug);
    const bgColor = isDark
      ? gradientFirstColor(book.gradient)         // e.g. #0a0422 for dream-ideas
      : `${book.accentColor}22`;                  // faint tint of accent on light books
    const borderColor = isDark
      ? `${book.accentColor}55`
      : `${book.accentColor}66`;
    const textColor   = isDark ? "rgba(255,255,255,0.88)" : "#1a1a1a";
    const logoColor   = isDark ? "#ffffff" : "#1a1a1a";
    const shopBg      = book.accentColor;
    const shopText    = isDark ? "#0a0422" : "#ffffff";
    return { bgColor, borderColor, textColor, logoColor, shopBg, shopText, mobileMenuBg: bgColor };
  }

  // Default teal theme for home / books list / about
  return {
    bgColor: "#dcf9f3",
    borderColor: "#b0e8dc",
    textColor: "#009380",
    logoColor: "#009380",
    shopBg: "#ff9c1a",
    shopText: "#ffffff",
    mobileMenuBg: "#dcf9f3",
  };
}

const navLinks = [
  { href: "/", label: "home" },
  { href: "/books", label: "bookstore" },
  { href: "/about", label: "about us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useNavTheme();

  return (
    <nav
      className="sticky top-0 z-50 shadow-sm"
      style={{ backgroundColor: theme.bgColor, borderBottom: `2px solid ${theme.borderColor}`, transition: "background-color 0.3s, border-color 0.3s" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo-detail-860.png"
              alt="Family Fables"
              width={52}
              height={52}
              className="group-hover:scale-110 transition-transform duration-200"
            />
            <span
              className="text-xl font-display tracking-wide"
              style={{ color: theme.logoColor, fontFamily: "var(--font-concert-one), 'Concert One', cursive", transition: "color 0.3s" }}
            >
              Family Fables
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="nav-desktop-links items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold text-sm transition-colors duration-200 hover:opacity-70"
                style={{ color: theme.textColor }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-5 py-2 rounded font-bold text-sm shadow-md transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: theme.shopBg, color: theme.shopText }}
            >
              Shop
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-hamburger p-2 rounded-lg transition-colors"
            style={{ color: theme.textColor }}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="py-3 space-y-1 border-t"
            style={{ borderColor: theme.borderColor, backgroundColor: theme.mobileMenuBg }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="nav-mobile-item block hover:opacity-70"
                style={{ color: theme.textColor }}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2 pb-2">
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-mobile-shop-btn btn-shine shadow"
                style={{ backgroundColor: theme.shopBg, color: theme.shopText, display: "flex", textDecoration: "none" }}
              >
                Shop on Amazon
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
