import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: What's Your Poo Poo Face? | Family Fables",
  description: "Read along with What's Your Poo Poo Face — the hilarious potty training book by Family Fables!",
};

function pad3(n: number) { return String(n).padStart(3, "0"); }
function pageImg(n: number) { return `/images/reader/poo-poo-face/page-${pad3(n)}.jpg`; }
function audioUrl(n: number) { return `/audio/reader/poo-poo-face/page-${pad3(n)}.mp3`; }

const narration: (string | null)[] = [
  null, // 001 — cover
  null, // 002 — endpaper
  null, // 003 — endpaper + narwhal
  null, // 004 — title / copyright
  "I was sitting on the potty, but I just couldn't do it. Then my daddy let me in on a little poo poo secret!",
  "The key to make a poo poo is to make a poo poo face. After that is done, all the rest will fall in place!",
  "Not sure if he was kidding, so I asked him just in case. Does everybody have one? Do they have a poo poo face?",
  "He said with a smile, every one in every place. Go ahead and ask them if they have a poo poo face.",
  "So I started at my school, where I love to learn and play, and I asked my favorite teacher if she'd show me hers today!",
  "Our local firefighters are the bravest ones I know, but do they make a poo poo face when it's time to go?",
  "My favorite football players are so big and strong, so if they make a poo poo face then my daddy can't be wrong!",
  "Even at the zoo, oh I see what monkeys do. So you'd better get to running if they make their poo poo face at you!",
  "I even asked an astronaut who works in outer space. When you're up there floating, do you make a poo poo face?",
  "I swam up to a mermaid, the princess of the sea. We saw her make a poo poo face as she made a sea doody!",
  "Even a rainbow unicorn flying so way up high, can make a funny poo poo face up up in the sky!",
  "I asked a world famous chef who cooks the greatest meals. Do you make a poo poo face — is that just how it feels?",
  "Even superheroes saving the day need to take a break sometimes — to make their poo poo face!",
  "So I went back home and sat upon my throne... and I made my poo poo face all on my own!",
  "My face looked so silly, it made my poo poo fall in place.",
  "And it was all because I learned that day to make my poo poo face!",
  null, // 021 — back matter
];

// Build pages array: 21 images + audio for pages 5-20
const PAGES: ReaderPage[] = Array.from({ length: 21 }, (_, i) => {
  const pageNum = i + 1; // 1-based
  const text = narration[i] ?? null;
  const hasAudio = pageNum >= 5 && pageNum <= 20;
  return {
    img: pageImg(pageNum),
    text,
    audioUrl: hasAudio ? audioUrl(pageNum) : undefined,
  };
});

export default function PooPooFaceReaderPage() {
  return (
    <AmberReader
      title="What's Your Poo Poo Face?"
      emoji="😂"
      coverImg="/images/books/poo-poo-face.png"
      pages={PAGES}
      accentColor="#FFD700"
      buttonColor="#9B6FD0"
      bgColor="#1a0030"
    />
  );
}
