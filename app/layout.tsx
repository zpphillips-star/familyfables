import type { Metadata } from "next";
import { Concert_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const concertOne = Concert_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-concert-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Family Fables \u2014 Children\u2019s Books",
    template: "%s | Family Fables",
  },
  description:
    "Family Fables publishes joyful, whimsical children\u2019s books that bring families together. Founded by Z.P. Phillips to honor the creative legacy of Victor Plotkin.",
  keywords: [
    "children\u2019s books",
    "family books",
    "picture books",
    "family fables",
    "Z.P. Phillips",
    "Victor Plotkin",
  ],
  openGraph: {
    title: "Family Fables \u2014 Children\u2019s Books",
    description:
      "Joyful children\u2019s books that spark imagination and create lasting family memories.",
    url: "https://familyfables.org",
    siteName: "Family Fables",
    type: "website",
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
    <html lang="en" className={concertOne.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bedtimeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 page-enter">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}

