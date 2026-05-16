"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AMAZON_STORE_URL } from "@/lib/books";

const navLinks = [
  { href: "/", label: "home" },
  { href: "/books", label: "bookstore" },
  { href: "/read", label: "read a story" },
  { href: "/about", label: "about us" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 shadow-sm"
      style={{ backgroundColor: "#dcf9f3", borderBottom: "2px solid #b0e8dc" }}
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
              style={{ color: "#009380", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
            >
              Family Fables
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold text-sm transition-colors duration-200 hover:opacity-70"
                style={{ color: "#009380" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={AMAZON_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-5 py-2 rounded font-bold text-sm shadow-md transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: "#ff9c1a", color: "#ffffff" }}
            >
              Shop
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#6B3FA0" }}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="md:hidden py-4 space-y-1 border-t"
            style={{ borderColor: "#b0e8dc" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg font-semibold transition-colors hover:bg-teal-50"
                style={{ color: "#009380" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded font-bold text-sm shadow"
                style={{ backgroundColor: "#ff9c1a", color: "#ffffff" }}
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
