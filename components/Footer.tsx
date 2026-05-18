import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      {/* Main footer area */}
      <div style={{ backgroundColor: "#0d0b1e", color: "#a89ec9" }}>
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
              <p className="text-sm leading-relaxed" style={{ color: "#a89ec9" }}>
                Stories that warm little hearts and spark big imaginations.
              </p>
            </div>

            {/* Explore */}
            <div>
              <Link
                href="/"
                className="hover:opacity-75 transition-opacity"
                style={{ color: "#ff9c1a", display: "inline-block", fontWeight: 700, fontSize: "26px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
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
                style={{ color: "#ff9c1a", display: "inline-block", fontWeight: 700, fontSize: "26px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
              >
                Shop
              </a>
            </div>

            {/* About Us */}
            <div>
              <Link
                href="/about"
                className="hover:opacity-75 transition-opacity"
                style={{ color: "#ff9c1a", display: "inline-block", fontWeight: 700, fontSize: "26px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--font-concert-one), 'Concert One', cursive" }}
              >
                About Us
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div style={{ backgroundColor: "#060415" }}>
        <div
          className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs footer-bottom-row"
          style={{ color: "#6b6080" }}
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
                style={{ color: "#a89ec9", fontSize: "13px" }}
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
