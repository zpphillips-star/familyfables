import type { Metadata } from "next";
import { Concert_One, Open_Sans, Catamaran } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import GlobalMapDrawer from "@/components/GlobalMapDrawer";

// Concert One — the big puffy display font from familyfables.org (h1-h6, titles)
const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-concert-one",
  display: "swap",
});

// Open Sans — clean body / paragraph font used on familyfables.org
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

// Catamaran — nav / accent font used on familyfables.org header
const catamaran = Catamaran({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-catamaran",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://familyfables.org"),
  title: {
    default: "Family Fables \u2014 Children\u2019s Books",
    template: "%s | Family Fables",
  },
  description:
    "Family Fables publishes joyful, whimsical children\u2019s books that bring families together \u2014 funny read-aloud stories, bedtime books, and interactive adventures for kids ages 2\u201310.",
  keywords: [
    "children\u2019s books",
    "family books",
    "picture books",
    "family fables",
    "Z.P. Phillips",
    "Victor Plotkin",
    "funny kids books",
    "read aloud books for kids",
    "bedtime books for children",
    "interactive kids books online",
  ],
  alternates: {
    canonical: "https://familyfables.org",
  },
  openGraph: {
    title: "Family Fables \u2014 Children\u2019s Books",
    description:
      "Funny, joyful, interactive children\u2019s books for bedtime and beyond. Read aloud online or get your copy on Amazon.",
    url: "https://familyfables.org",
    siteName: "Family Fables",
    type: "website",
    images: [
      {
        url: "/images/logo-detail-860.png",
        width: 860,
        height: 860,
        alt: "Family Fables \u2014 Children\u2019s Books",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Family Fables \u2014 Children\u2019s Books",
    description:
      "Funny, joyful children\u2019s books. Read aloud online or get your copy on Amazon.",
    images: ["/images/logo-detail-860.png"],
  },
};

// Bedtime mode init — runs before hydration to avoid flash
const bedtimeInitScript = `
(function() {
  try {
    var mode = localStorage.getItem('ff-bedtime');
    if (mode === 'on') document.documentElement.setAttribute('data-mode', 'bedtime');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${concertOne.variable} ${openSans.variable} ${catamaran.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bedtimeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <GlobalMapDrawer />
        <main className="flex-1 page-enter">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

