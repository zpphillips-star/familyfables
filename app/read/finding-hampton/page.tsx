import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: Finding Hampton | Family Fables",
  description:
    "Join Hampton on a birthday treasure hunt in Finding Hampton — a Family Fables adventure!",
};

// Finding Hampton — 28-page paperback interior
// Front matter: pages 1–3 (null) | Story: pages 4–27 | Back matter: page 28 (null)
// Voice: nova (warm, friendly)

const narration: (string | null)[] = [
  null, // 001 — half-title / blank
  null, // 002 — title page
  null, // 003 — copyright / dedication
  "It was Rosie's birthday, and Hampton was in search of a gift for her. A last minute gift. He was very stressed.", // 004
  "What could Rosie want?! Some worms? A fan? A bubble bath?", // 005
  "Hampton took a seat on a nearby rock so he could really focus. He needed one hundred percent of his brain power dedicated to birthday present thinking.", // 006
  "So, he thought. And, he thought. And, he thought. Until he realized that the rock was moving!", // 007
  "Hampton, you're a genius! That's it! A walking rock! Rhinos love rocks. But a WALKING rock?! It's perfect.", // 008
  "Hampton reached to pick it up, but the rock took off! And again. And again.", // 009
  "Hampton spent hours tracking this elusive rock. In fact, he had walked so far and so long that he couldn't even hear his friends searching for him.", // 010
  "Using Hampton's special call, his friends yelled out at the top of their lungs: OINK! OINK! Piggy! Piggy! Up trees. In the water. In the sky. In the grass. In bananas. Under Rosie. In anthills.", // 011
  null, // 012 — illustration spread
  "Nothing.", // 013
  "Just then, he got a pig-of-a-genius idea! Hampton was too far and too focused on tracking that rock.", // 014
  null, // 015 — illustration spread
  "BOUNCE!", // 016
  "Who said that? Me. Get off me. Rock? Is that you?! A walking AND talking rock? Super rare… I'm just a turtle. A turtle running away from a hungry piggy.", // 017
  "There's no such thing as a walking rock! Or a talking rock! I've been tracking you all morning so I could give you as a gift to my friend. She's a rhino. Today's her birthday. But I thought you were a rock.", // 018
  "Your friend's birthday, huh? Which, by the way — still a turtle. Why not spend it WITH your friend instead? And maybe receive a gift? Not a rock gift, please.", // 019
  "Oh no! You're right! I need to get back to them!", // 020
  "Well, pig, you're in luck. Turtles are actual expert trackers. Follow my directions exactly and you'll reach your friends in time.", // 021
  "There. They're right there. Through the leaves. We didn't travel very far.", // 022
  "Overjoyed, Hampton thanked the turtle and leapt through the leaves.", // 023
  "I'm sorry I don't have a gift, Rosie. Don't be silly, Hampton. Having my friends with me on my birthday is the best gift I could have wished for.", // 024
  "Hampton then told his friends the whole story about the magical rock that walked and talked and had legs and a head. Everyone totally believed him.", // 025
  "It turned out to be Rosie's best birthday yet! With that, they spent the rest of the day together celebrating: eating worms, splashing around, and staying cool.", // 026
  "Not a rock.", // 027
  null, // 028 — back matter
];

export default function FindingHamptonReaderPage() {
  return (
    <BookReader
      bookSlug="finding-hampton"
      title="Finding Hampton"
      totalPages={28}
      storyPages={[4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]}
      narration={narration}
    />
  );
}
