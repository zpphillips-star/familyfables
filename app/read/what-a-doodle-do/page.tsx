import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: What-a-Doodle-Do! | Family Fables",
  description:
    "Cock-a-doodle-doo! Spin up your silliest words in What-a-Doodle-Do — the word-play adventure from Family Fables!",
};

// What-a-Doodle-Do — 35-page paperback interior
// Front matter: pages 1–3 (null) | Story: pages 4–34 | Back matter: page 35 (null)
// Each page features one "-a-doodle-do" word combo
// Voice: fable (playful, punchy — perfect for silly word fun)

const narration: (string | null)[] = [
  null, // 001 — blank / half-title
  null, // 002 — copyright
  null, // 003 — dedication: "...to you too!!!"
  "beanstalk-a-doodle-do!", // 004
  "sleepwalk-a-doodle-do!", // 005
  "chalk-a-doodle-do!", // 006
  null, // 007 — illustration (word in image)
  "bedrock-a-doodle-do!", // 008
  null, // 009 — illustration spread
  null, // 010 — illustration spread
  "lock-a-doodle-do!", // 011
  "talk-a-doodle-do!", // 012
  "bach-a-doodle-do!", // 013
  "wok-a-doodle-do!", // 014
  null, // 015 — illustration spread
  "sherlock-a-doodle-do!", // 016
  "block-a-doodle-do!", // 017
  null, // 018 — illustration spread
  null, // 019 — illustration spread
  null, // 020 — illustration spread
  null, // 021 — illustration spread
  "boardwalk-a-doodle-do!", // 022
  "shamrock-a-doodle-do!", // 023
  "walk-a-doodle-do!", // 024
  "croc-a-doodle-do!", // 025
  "jock-a-doodle-do!", // 026
  "doc-a-doodle-do!", // 027
  "clock-a-doodle-do!", // 028
  null, // 029 — illustration spread
  "sock-a-doodle-do!", // 030
  null, // 031 — illustration spread
  "catwalk-a-doodle-do!", // 032
  "mohawk-a-doodle-do!", // 033
  "COCK-A-DOODLE-DO!!!", // 034
  null, // 035 — back matter: "...to you too!!!"
];

export default function WhatADoodleDoReaderPage() {
  return (
    <BookReader
      bookSlug="what-a-doodle-do"
      title="What-a-Doodle-Do!"
      totalPages={35}
      storyPages={[4, 5, 6, 8, 11, 12, 13, 14, 16, 17, 22, 23, 24, 25, 26, 27, 28, 30, 32, 33, 34]}
      narration={narration}
    />
  );
}
