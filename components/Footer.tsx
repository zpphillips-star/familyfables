import Link from "next/link";
import Image from "next/image";
import { AMAZON_STORE_URL } from "@/lib/books";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2D1B69", color: "#E8DCF5" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image
                src="/images/logo-teal.png"
                alt="Family Fables"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span
                className="text-xl"
                style={{
                  fontFamily: "var(--font-fredoka), 'Fredoka One', cursive",
                  color: "#F4A839",
                }}
              >
                Family Fables
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#B8A8D8" }}>
              Stories that warm little hearts and spark big imaginations. Every
              book is a new adventure waiting to begin.
            </p>
            <p className="text-xs mt-4" style={{ color: "#9B8AC4" }}>
              Founded by Z.P. Phillips
              <br />
              In honor of Victor Plotkin
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F4A839" }}
            >
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/books", label: "Our Books" },
                { href: "/about", label: "Our Story" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "#B8A8D8" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F4A839" }}
            >
              Shop
            </h3>
            <div className="space-y-3">
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm transition-colors hover:text-white group"
                style={{ color: "#B8A8D8" }}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  🛒
                </span>
                <span>Shop on Amazon</span>
              </a>
            </div>

            <div className="mt-6">
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105"
                style={{ backgroundColor: "#F4A839", color: "#2D1B69" }}
              >
                Browse All Books →
              </a>
            </div>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid #4A2875", color: "#9B8AC4" }}
        >
          <p>© {new Date().getFullYear()} Family Fables. All rights reserved.</p>
          <p>
            Made with{" "}
            <span className="text-red-400">♥</span> for little readers
            everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
