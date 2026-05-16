import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: Gilroy's Gobble | Family Fables",
  description:
    "Listen to Gilroy's Gobble — the story of a turkey who found his own special sound, by Family Fables!",
};

// Gilroy's Gobble — 36-page paperback interior
// Front matter: pages 1–3 (null) | Story: pages 4–35 | Back matter: page 36 (null)
// Voice: onyx (warm, confident — matches Gilroy's self-discovery theme)

const narration: (string | null)[] = [
  null, // 001 — half-title / blank
  null, // 002 — copyright / dedication
  null, // 003 — title page
  `Overjoyed to see the red fall leaves fall, Gilroy belted out quite an odd turkey call. "Wee Loo Lee Loo!"`, // 004
  null, // 005 — illustration spread
  `Olivia the owl was watching from above, then asked a question with her owly love: "What was that, my dear? That was no 'Hoo.'"`, // 006
  `"That's my turkey call. It's what turkeys do."`, // 007
  `"Here, let me help. Do what I do. Let me hear your turkey... Hooooo!"`, // 008
  `Trying to fit in, and without further ado, Gilroy let out a "Wee Loo Lee Loo!"`, // 009
  "Overheard by Corey, the cow on the farm, Gilroy wobbled to him, charmed by his charm.", // 010
  `"You've got charisma, kid. I'll give you that much. What you've really got to do is add a cow's touch."`, // 011
  `"Now, watch me closely. Balance on four legs, and moo your turkey... Mooooo!" Taking his advice, Gilroy dropped to his wings and let out a "Wee Loo Lee Loo!"`, // 012
  '"Wee Loo Lee Loo!"', // 013
  `"That sounds so close," snapped the rooster on the roof, "to what a bird should sound like. That thing on your face — we call it a beak. Use it like mine and speak bird speak."`, // 014
  null, // 015 — illustration spread
  `"First, puff out your chest and feather your do. Then let us hear your turkey... Cock-a-doodle-Doo!" Taking his advice, Gilroy mirrored his moves and let out a "Wee Loo Lee Loo!"`, // 016
  `"Wee Loo Lee Loo!"`, // 017
  `"Hey, Gilroy the turkey! You look a little tense. Don't mind the others. They haven't a clue. The remedy you seek is in the form of a 'Coo.'"`, // 018
  null, // 019 — illustration spread
  `"Jump up here with me and follow my moves. Then let us hear your turkey... Coo Coo Ka Choo." Taking his advice, Gilroy popped on the post and let out a "Wee Loo Lee Loo."`, // 020
  `"Wee Loo Lee Loo."`, // 021
  "At the pond nearby swam a spotted looney loon.", // 022
  `"Come here, young turkey. You've got to sing my tune." Right then she yelled out, "Loo Loo Loo! Loo Dee Loo Dee Loo!"`, // 023
  `"All your calls are different! I don't know which one to choose. They all sound great, but they all sound like you!"`, // 024
  `"All your calls are different! I don't know which one to choose. They all sound great, but they all sound like you!"`, // 025
  null, // 026 — illustration spread
  `Gilroy wandered off thinking, "I'm doing this all wrong. How am I going to find the right turkey song?"`, // 027
  `Then off in the distance, he heard a "Tut Tut Too Doo." It came from a turkey, but wasn't something he knew.`, // 028
  `"Tut Tut Too Doo."`, // 029
  `"What is that sound? Did that come from you? Please teach it to me so I can sound like I'm supposed to."`, // 030
  null, // 031 — illustration spread
  `"You're not a loon, cow, rooster, or owl. You are who you are, Gilroy the fowl. So no matter your call, make sure it's your own — from the time you're a baby until your full grown."`, // 032
  null, // 033 — illustration spread
  "The advice sank in, as he looked all around. Gilroy saw each animal sounding their sound. They all looked happy, for they were who they were, no matter what they wore: feathers or fur.", // 034
  `Gilroy smiled a big smile. He finally knew. He was himself — a turkey — through and through. With that he joined the rest of the crew, and let out his own Gilroy "Wee Loo Lee Loo!"`, // 035
  null, // 036 — back matter
];

export default function GilroysGobbleReaderPage() {
  return (
    <BookReader
      bookSlug="gilroys-gobble"
      title="Gilroy's Gobble"
      totalPages={36}
      storyPages={[4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22, 23, 24, 27, 28, 29, 30, 32, 34, 35]}
      narration={narration}
    />
  );
}
