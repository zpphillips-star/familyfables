import Link from "next/link";
import { AMAZON_STORE_URL, INSTAGRAM_URL } from "@/lib/books";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0a0912", color: "#8a8299", borderTop: "1px solid #2e2a42" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🐦‍⬛</span>
              <span
                className="text-xl"
                style={{
                  fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                  color: "#c9a84c",
                }}
              >
                Family Fables
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}>
              Stories that hold secrets worth discovering. Every book carries a
              piece of Victor Plotkin&apos;s unfinished world.
            </p>
            <p className="text-xs mt-4" style={{ color: "#2e2a42", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Founded by Z.P. Phillips
              <br />
              In honor of Victor Plotkin
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="eyebrow mb-5">Explore</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/books", label: "The Collection" },
                { href: "/about", label: "Our Origin" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-amber-400"
                    style={{ color: "#8a8299", fontFamily: "var(--font-lora), serif" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Shop */}
          <div>
            <h3 className="eyebrow mb-5">Connect</h3>
            <div className="space-y-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-amber-400 group"
                style={{ color: "#8a8299" }}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🪶</span>
                <span style={{ fontFamily: "var(--font-lora), serif" }}>@familyfables</span>
              </a>
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-amber-400 group"
                style={{ color: "#8a8299" }}
              >
                <span className="text-lg group-hover:scale-110 transition-transform">🐦‍⬛</span>
                <span style={{ fontFamily: "var(--font-lora), serif" }}>Shop on Amazon</span>
              </a>
            </div>

            <div className="mt-6">
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
                style={{
                  backgroundColor: "#c9a84c",
                  color: "#0a0912",
                  fontFamily: "var(--font-fredoka), cursive",
                }}
              >
                Browse All Books →
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid #2e2a42", color: "#2e2a42", letterSpacing: "0.06em" }}
        >
          <p>© {new Date().getFullYear()} Family Fables. All rights reserved.</p>
          <p>🪶 Made with love for little readers everywhere</p>
        </div>
      </div>
    </footer>
  );
}
