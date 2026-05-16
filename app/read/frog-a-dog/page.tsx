import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: Frog a Dog | Family Fables",
  description:
    "Meet Bailey — the dog who just wants to be a frog. Dive into Frog a Dog, a Family Fables story about belonging!",
};

// Frog a Dog — 33-page paperback interior
// Front matter: pages 1–3 (null) | Story: pages 4–33 (15 text beats × 2-page spreads)
// Text falls on the first page of each spread; second page is illustration only
// Voice: fable (warm, folktale-ish — perfect for Bailey's underdog journey)

const narration: (string | null)[] = [
  null, // 001 — blank / half-title
  null, // 002 — title page
  null, // 003 — copyright / dedication
  "All dusk and all dawn, Bailey hung by the pond, with hopes to become the frog that she longed.", // 004
  null, // 005 — illustration
  `But when she'd appear, they'd snicker and sneer. \u201CA dog is no frog! You don't belong here.\u201D`, // 006
  null, // 007 — illustration
  `\u201CThat nose. And those ears. And your eyes, how they peer. What's that over there? A tail? Oh, dear!\u201D`, // 008
  null, // 009 — illustration
  "Still Bailey had pride for who was inside, but could not fit in, no matter how much she tried.", // 010
  null, // 011 — illustration
  "So, to trick the whole crew, Bailey tried something new. On Halloween day, she slipped on a costume.", // 012
  null, // 013 — illustration
  "Bailey returned to the spot. The frogs gave it no thought. She blended in with them all, and was taught quite a lot.", // 014
  null, // 015 — illustration
  "How to swim, how to eat, how to even belly flop. She learned how to hop, how to croak, how to plop.", // 016
  null, // 017 — illustration
  "By the end of the day it was quite easy to say that this army of frogs had a new protégé.", // 018
  null, // 019 — illustration
  "Then to their surprise, she shed her disguise. They saw her paws, her fur, and her puppy dog eyes.", // 020
  null, // 021 — illustration
  `"You tricked us, you dog. Get out of our bog! Like we've said all along \u2014 a dog is no frog."`, // 022
  null, // 023 — illustration
  `"I may have big ears, but I've known it for years. In my heart I'm like you \u2014 a frog tried and true."`, // 024
  null, // 025 — illustration
  "She swam, and she ate, and even belly flopped. With that, Bailey hopped. She croaked, and she plopped.", // 026
  null, // 027 — illustration
  "The frogs looked amazed. Even awarded her praise. For despite how she looked, she was them in all ways.", // 028
  null, // 029 — illustration
  "So the frogs learned their lesson — that it's not what you're dressed in. It's who's inside that defines you. Of that, there's no question.", // 030
  null, // 031 — illustration
  "Now all dusk and all dawn, Bailey hangs by the pond, with a smile on her face — for she truly belongs.", // 032
  null, // 033 — back matter
];

export default function FrogADogReaderPage() {
  return (
    <BookReader
      bookSlug="frog-a-dog"
      title="Frog a Dog"
      totalPages={33}
      storyPages={[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]}
      narration={narration}
    />
  );
}
