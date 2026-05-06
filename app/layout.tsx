import type { Metadata } from "next";
import { Lora, Fredoka } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["400", "600"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${fredoka.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

