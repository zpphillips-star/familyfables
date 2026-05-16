import Link from "next/link";
import Image from "next/image";
import { AMAZON_STORE_URL } from "@/lib/books";

export default function Footer() {
  return (
    <footer>
      {/* Main footer area — mint bg, teal text (matches WP #main-footer) */}
      <div style={{ backgroundColor: "#dcf9f3", color: "#009380" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image src="/images/logo-teal.png" alt="Family Fables" width={36} height={36} />
                <span
                  className="text-xl"
                  style={{ fontFamily: "var(--font-concert-one), 'Concert One', cursive", color: "#009380" }}
                >
                  Family Fables
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#009380" }}>
                Stories that warm little hearts and spark big imaginations.
              </p>

            </div>

            {/* Quick Links */}
            <div>
              <h3
                className="font-bold text-sm uppercase tracking-widest mb-4"
                style={{ color: "#ff9c1a" }}
              >
                Explore
              </h3>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "home" },
                  { href: "/books", label: "bookstore" },
                  { href: "/about", label: "about us" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-teal-700"
                      style={{ color: "#77137a" }}
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
                style={{ color: "#ff9c1a" }}
              >
                Shop
              </h3>
              <p className="text-sm mb-2" style={{ color: "#009380" }}>All books available on Amazon.</p>
              <a
                href={AMAZON_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:opacity-75"
                style={{ color: "#006e59", textDecoration: "underline" }}
              >
                Shop on Amazon →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer nav bar — purple bg (matches WP #et-footer-nav: #a935a6) */}
      <div style={{ backgroundColor: "#a935a6" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-6 justify-center">
          {[
            { href: "/", label: "home" },
            { href: "/books", label: "bookstore" },
            { href: "/about", label: "about us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors hover:opacity-75"
              style={{ color: "#daf8f2", fontSize: "17px" }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer bottom bar — deep purple (matches WP #footer-bottom: #78087c) */}
      <div style={{ backgroundColor: "#78087c" }}>
        <div
          className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: "#ffffff" }}
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
                style={{ color: "#dcf9f3", fontSize: "13px" }}
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
