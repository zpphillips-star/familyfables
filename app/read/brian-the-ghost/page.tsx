import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: Brian the Ghost | Family Fables",
  description:
    "Read along with Brian the Ghost — the friendliest ghost in St. Germaine, by Family Fables!",
};

// Brian the Ghost — 44-page paperback interior
// Front matter: pages 1–4 (null) | Story: pages 5–37 | Back matter: pages 38–44 (null)
// Voice: fable (whimsical/spooky-friendly British storyteller)

const narration: (string | null)[] = [
  null, // 001 — half-title / blank
  null, // 002 — title page
  null, // 003 — copyright
  null, // 004 — dedication
  "At night, in the quiet town of St. Germaine… MONSTERS roam the streets.", // 005
  "There was Cleo, a MATERIALISTIC MUMMY.", // 006
  "And there was Roman, a WISTFUL WEREWOLF.", // 007
  "There was Sir Gregor, a GHOULISH… well… GHOUL.", // 008
  "…and then there was Brian.", // 009
  "Brian was a perfectly normal, everyday, regular GHOST.", // 010
  "Yet, Brian was different in one VERY BIG way.", // 011
  "While all the other monsters of St. Germaine loved to SPOOK! And BOO! And SCARE! Brian did not.", // 012
  "Brian just wanted to read BOOKS and play GAMES and watch MOVIES.", // 013
  "But, more than anything, Brian wanted a friend.", // 014
  '"You want to be friends? With one of them?" laughed the others. "Monsters don\'t make friends."', // 015
  '"We HAUNT them. We HOWL at them. We HISS at them. We never make friends." But Brian wasn\'t listening…', // 016
  "Something the ghosts said gave him an idea. What if he haunted nicely? Then someone would surely be his friend.", // 017
  "So, he made plans to begin the next night.", // 018
  null, // 019 — illustration spread
  'The first night, Brian went to the Bleecker house. "Children love clowns," he thought. "And surprises!" So, he turned into a clown and hid in the toy box.', // 020
  null, // 021 — illustration spread right page
  "It did not go like he thought.", // 022
  null, // 023 — full spread right page
  'The second night, he went to the Peterson house where he spied children washing their faces before bed. "Maybe I can be helpful?" thought Brian.', // 024
  null, // 025 — illustration right page
  "It did not go like he thought.", // 026
  null, // 027 — full spread right page
  'The third night, Brian had an even better idea. He went to the Smith\'s, where the family was gathered in front of the television. "I just know this will work," he reassured himself.', // 028
  null, // 029 — illustration right page
  "It did not go like he thought.", // 030
  null, // 031 — full spread right page
  'After three long nights, Brian was out of ideas. So, he went back to the place where he read his books and played his games and watched his movies… and he began to cry. "I just wish I had someone to play with…"', // 032
  null, // 033 — illustration right page
  '"I like your stuff!" A little girl named Lucy springs up from behind a pile of books. Brian screams in terror.', // 034
  null, // 035 — full spread right page
  '"You scared me! Oh, now I get it." Sheepishly, Brian asked, "What are you doing here?" "I\'m kind of… an explorer!" said the girl. And suddenly, Brian had his best idea yet.', // 036
  '"I have some books about famous explorers. Do you want to see?" The girl beamed, "I\'m Lucy." "I\'m Brian. I\'m a ghost."', // 037
  "And so, the two friends played and laughed late into the night in the quiet — well, maybe not so quiet — town of St. Germaine.", // 038
  null, // 039 — back matter
  null, // 040 — back matter
  null, // 041 — back matter
  null, // 042 — back matter
  null, // 043 — back matter
  null, // 044 — back matter
];

export default function BrianTheGhostReaderPage() {
  return (
    <BookReader
      bookSlug="brian-the-ghost"
      title="Brian the Ghost"
      totalPages={44}
      storyPages={[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 37, 38]}
      narration={narration}
    />
  );
}
