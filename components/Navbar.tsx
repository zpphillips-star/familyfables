"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { books, AMAZON_STORE_URL } from "@/lib/books";

// Per-book dark background for navbar (books with light-start gradients get a custom dark bg)
const bookDarkBg: Record<string, string> = {
  "whats-your-poo-poo-face":   "#1a0814",
  "gilroys-gobble":             "#3d1500",
  "finding-hampton":            "#0e2210",
  "the-lumpiest-pumpkin":       "#3e1a00",
  "one-tom-turkey":             "#2a0e00",
  "what-a-doodle-do":           "#1a0800",
  "the-shut-in-button":         "#04122a",
  "amber-the-dragon-keeper":    "#2d0a3a",
  "dream-ideas":                "#0a0422",
  "ollie-come-home":            "#1a2a1a",
  "frog-a-dog":                 "#1a1a3a",
  "brian-the-ghost":            "#1a0a2a",
};

// Build navbar palette from current path
function useNavTheme() {
  const pathname = usePathname();
  const slug = pathname?.startsWith("/books/") ? pathname.split("/")[2] : null;
  const book = slug ? books.find((b) => b.slug === slug) : null;

  if (book) {
    const bgColor     = bookDarkBg[book.slug] ?? "#0d0b1e";
    const borderColor = `${book.accentColor}55`;
    const textColor   = "rgba(255,255,255,0.88)";
    const logoColor   = "#ffffff";
    const shopBg      = book.accentColor;
    const shopText    = "#ffffff";
    return { bgColor, borderColor, textColor, logoColor, shopBg, shopText, mobileMenuBg: bgColor };
  }

  // Default dark theme for home / books list / about
  return {
    bgColor: "#050212",
    borderColor: "rgba(124,58,237,0.3)",
    textColor: "rgba(255,255,255,0.82)",
    logoColor: "#ffffff",
    shopBg: "#7c3aed",
    shopText: "#ffffff",
    mobileMenuBg: "#0d0b1e",
  };
}

const navLinks = [
  { href: "/", label: "home" },
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
