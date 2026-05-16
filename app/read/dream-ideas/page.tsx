import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: Dream Ideas | Family Fables",
  description:
    "Drift off to dreamland with Dream Ideas — the bedtime singalong by Family Fables!",
};

// Dream Ideas — 19-page hardcover interior
// Front matter: pages 1–3 (null) | Story: pages 4–17 | Back matter: pages 18–19 (null)
// Voice: shimmer (soft, dreamy — perfect for bedtime singalongs)

const narration: (string | null)[] = [
  null, // 001 — half-title / blank
  null, // 002 — title page
  null, // 003 — copyright / dedication
  "All these dream ideas stirring in your head will make you go to sleep inside your super comfy bed, with your pillow.", // 004
  "You could dream of all the things you wish to be and want and know. But in case you need ideas, here's a list to help you go.", // 005
  "You could dream of a treehouse built with branches and green leaves, and many tiny flowers that have many tiny bees.", // 006
  "You could fly up in the sky or dive down deep into the sea, and swim with all the fishies, narwhals, even manatees.", // 007
  "You could be a country music star from Nashville, Tennessee, and sing to a huge sold-out crowd at the Grand Ol' Opry.", // 008
  "You could shop around on Main Street in the Land of Free Candy, or race down Ice Cream Mountain on a chocolate strawberry.", // 009
  "You could travel back in time and paint with Leo DaVinci, or ride a pterodactyl next to Cera and Petrie.", // 010
  "You could live in a great castle that has one great golden key, and be the princess who can't sleep because of one small pea.", // 011
  "You could bike around on Mars on one wheel, or two, or three, or drive a giant big rig with as many as eighteen.", // 012
  "You could be a famous actor starring in a comedy, and walk down the red carpet as an Oscar nominee.", // 013
  "You could teach a herd of elephants to sing their ABCs, or shrink down super-duper small to see if bees have knees.", // 014
  "You could ask the King of England if he'd pour a spot of tea, or take a train to Hogwarts and meet Hermione.", // 015
  "You could walk a winter wonderland in search of a Yeti, then throw him a surprise party that's filled with confetti.", // 016
  "But whatever you want to be tonight is yours to make it be. So drift away to dreamland and sleep so happily.", // 017
  null, // 018 — back matter
  null, // 019 — back matter
];

export default function DreamIdeasReaderPage() {
  return (
    <BookReader
      bookSlug="dream-ideas"
      title="Dream Ideas"
      totalPages={19}
      storyPages={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]}
      narration={narration}
    />
  );
}
