import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: Ollie Come Home | Family Fables",
  description:
    "Join Ollie the cat on his first big adventure outside — and the heartwarming journey back home — by Family Fables!",
};

// Ollie Come Home — 39-page paperback interior
// Front matter: pages 1–3 (null) | Story: pages 4–23 | Back matter: pages 24–39 (null)
// Story pages 5-6 and 13-14 are spreads (text on second page of each spread)
// Voice: nova (warm, cozy cat story voice)

const narration: (string | null)[] = [
  null, // 001 — blank / half-title
  null, // 002 — title page
  null, // 003 — copyright / dedication
  "Ollie is a small cat, long haired and with stripes. He smiles and he snuggles. And is always well liked.", // 004
  "The bed or the sofa are where he resides. He naps on the window sill while looking outside.", // 005
  "One day Ollie found, as curious cats do, a gap in the window he just could squeeze through.", // 006
  "So he crawled to the ledge, and beaming with pride, he smiled and he purred — his first time outside.", // 007
  null, // 008 — spread left (story pages 5–6)
  "He took it all in, using each one of his senses, through the flowers and trees and over some fences.", // 009
  "His family came home. No purring. No kissing. And soon they discovered that their Ollie was missing.", // 010
  "\"Ollie where are you? Ollie come home! It's not safe out there all on your own.\"", // 011
  "Soon it was nightfall, with Ollie less bold. Ollie was lost now, and hungry and cold.", // 012
  "I sure miss my mom and her snuggling and petting. I sure miss my dad. I hope they're not fretting.", // 013
  "Ollie's family grew nervous and started to worry. With flashlights and flyers, they were off in a hurry.", // 014
  null, // 015 — spread left (story pages 13–14)
  "\"Ollie where are you? Ollie come home! It's not safe out there all on your own.\"", // 016
  "But Ollie didn't answer his family's calls. He kept all alone, tucked in a ball.", // 017
  "When the sun finally rose, he waved bye to the gnome. Ollie was now determined to find his way home.", // 018
  "He ran and he climbed through yards and thick woods, until he started to recognize his own neighborhood.", // 019
  "And that's when he heard, after miles he'd roamed: \"Ollie where are you? Ollie come home!\"", // 020
  "He ran towards the voices — his family's for sure. And found himself home, at his own front door.", // 021
  "\"There you are Ollie! You're back in one piece. You had us so worried. Now we're so relieved.\"", // 022
  "It was fun but then scary, outside on my own. I missed you guys too. And I'm glad to be home.", // 023
  null, // 024 — back matter
  null, // 025 — back matter
  null, // 026 — back matter
  null, // 027 — back matter
  null, // 028 — back matter
  null, // 029 — back matter
  null, // 030 — back matter
  null, // 031 — back matter
  null, // 032 — back matter
  null, // 033 — back matter
  null, // 034 — back matter
  null, // 035 — back matter
  null, // 036 — back matter
  null, // 037 — back matter
  null, // 038 — back matter
  null, // 039 — back matter
];

export default function OllieComeHomeReaderPage() {
  return (
    <BookReader
      bookSlug="ollie-come-home"
      title="Ollie Come Home"
      totalPages={39}
      storyPages={[4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23]}
      narration={narration}
    />
  );
}
