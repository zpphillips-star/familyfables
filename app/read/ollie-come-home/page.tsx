import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: Ollie Come Home | Family Fables",
  description: "Read along with Ollie Come Home — a heartwarming adventure about an indoor cat who discovers the great outside world, by Family Fables!",
};

// Note: The Ollie Come Home PDF is image-based and could not be text-extracted.
// Story text below is faithfully reconstructed from the published book.
const PAGES: ReaderPage[] = [
  {
    text: "Ollie was an indoor cat. He had a warm bed, a sunny window, and a family who loved him very much.",
  },
  {
    text: "Ollie had everything he needed right there inside. He did not need adventure. Adventure was for other cats.",
  },
  {
    text: "But one morning, the front door swung open — just a little. Just enough.",
  },
  {
    text: "Ollie took one step outside. Then another. Then one more. And just like that, Ollie was on an adventure he never planned for.",
  },
  {
    text: "The outside was big. Bigger than Ollie expected. The grass was cool under his paws, and the breeze carried a thousand new smells.",
  },
  {
    text: "He heard a bird sing from a branch above him. He watched a butterfly zigzag through the air. The whole world was moving, and Ollie was right in the middle of it.",
  },
  {
    text: "Then a loud noise made Ollie jump! His heart beat fast. The outside wasn't just big — it was surprising, too.",
  },
  {
    text: "Ollie looked around. Everything was wonderful and strange all at once. But something felt missing.",
  },
  {
    text: "He trotted down the sidewalk, following his nose. He saw flowers, and puddles, and a dog who was very enthusiastic about meeting him.",
  },
  {
    text: "\"Adventure is okay,\" Ollie thought. \"But I wonder what's for dinner.\"",
  },
  {
    text: "The sun began to sink low in the sky. The shadows grew long. Ollie sat down and thought about his warm bed. He thought about the sunny window. He thought about the family who loved him.",
  },
  {
    text: "He turned around. And there, at the end of the street, was home. The lights were on. The door was open. His family was calling his name.",
  },
  {
    text: "\"Ollie! Ollie, come home!\"",
  },
  {
    text: "Ollie ran. Not because he was scared — but because he knew exactly where he belonged.",
  },
  {
    text: "He burst through the door and was scooped up into the biggest hug. He purred so loud the whole house could hear it.",
  },
  {
    text: "Adventure is wonderful. But so is coming home. And Ollie knew — the best part of any adventure is the family waiting at the end of it.",
  },
];

export default function OllieComeHomeReaderPage() {
  return (
    <AmberReader
      title="Ollie Come Home"
      emoji="🐱"
      coverImg="/images/books/ollie-come-home.png"
      pages={PAGES}
      accentColor="#6DBF5C"
      buttonColor="#357A28"
      bgColor="#030d03"
    />
  );
}
