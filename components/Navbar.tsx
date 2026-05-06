"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AMAZON_STORE_URL } from "@/lib/books";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Books" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled
          ? "rgba(15, 14, 23, 0.97)"
          : "rgba(15, 14, 23, 0.6)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? "#2e2a42" : "transparent"}`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl group-hover:scale-110 transition-transform duration-200">
              🐦‍⬛
            </span>
            <span
              className="text-xl tracking-wide"
              style={{
                fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                color: "#c9a84c",
              }}
            >
              Family Fables
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors duration-200 hover:text-amber-400"
                style={{
                  color: "#8a8299",
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-lora), serif",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-5 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f0e17",
                fontFamily: "var(--font-fredoka), cursive",
              }}
            >
              Shop →
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#c9a84c" }}
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
            className="md:hidden py-4 space-y-1 border-t"
            style={{ borderColor: "#2e2a42" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg font-semibold transition-colors"
                style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-lg font-bold text-sm"
                style={{
                  backgroundColor: "#c9a84c",
                  color: "#0f0e17",
                  fontFamily: "var(--font-fredoka), cursive",
                }}
              >
                Shop on Amazon →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
