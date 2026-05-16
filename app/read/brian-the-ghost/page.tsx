import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: Brian the Ghost | Family Fables",
  description: "Read along with Brian the Ghost — a heartwarming Halloween story about the friendliest ghost in St. Germaine, by Family Fables!",
};

const PAGES: ReaderPage[] = [
  {
    text: "At night, in the quiet town of St. Germaine… MONSTERS roamed the streets.",
  },
  {
    text: "There was Roman, a WEREWOLF. There was Cleo, a MUMMY. There was Sir Gregor, a GHOUL. And then, there was BRIAN.",
  },
  {
    text: "BRIAN was a perfectly normal, regular, everyday GHOST. Yet, he was very different in one way.",
  },
  {
    text: "While all the other MONSTERS loved to SPOOK! And BOO! And SCARE! Brian did not.",
  },
  {
    text: "Brian just wanted to read BOOKS, and play GAMES, and watch MOVIES. But more than anything, BRIAN wanted a real-life FRIEND.",
  },
  {
    text: "FRIENDS?! You want to be friends with one of them?! Monsters don't make friends — we make friends! While the other monsters teased him, it occurred to Brian that maybe they were onto something…",
  },
  {
    text: "So, he made plans. Instead of HOWLING, HISSING, or HAUNTING… maybe he could try haunting… NICELY.",
  },
  {
    text: "The first night, Brian went to the Bleecker house. Children love clowns… and surprises! So, he turned into a clown and hid in the toy box. Until…",
  },
  {
    text: "It did not go like he thought.",
  },
  {
    text: "Ok, Brian. Haunt nicely. The next night, he went to the Peterson house, where he noticed the children brushing their teeth.",
  },
  {
    text: "\"Ummm...\" It did not go like he thought. \"MAKE SURE TO FLOSS?!\"",
  },
  {
    text: "Brian had one last plan. His BEST plan! So, on the third night, he went to the Smith's, where the family was cozied up in front of the television. \"I just KNOW this will work!\"",
  },
  {
    text: "It did NOT go like he thought.",
  },
  {
    text: "After three long nights, Brian was out of ideas. So, he went back to the place where he reads BOOKS, plays GAMES, and watches MOVIES… ALONE.",
  },
  {
    text: "\"I LOVE your stuff!\"",
  },
  {
    text: "\"Scare me?! I'm sorry! I didn't mean to scare you. You popped up out of nowhere… What did you expec—\"",
  },
  {
    text: "Oh, now I get it… That's when Brian realized: all the haunting nicely wasn't so nice after all. The shouting. The surprising. The loud noises. HE WAS BEING SCARY! And Brian did not want to be scary. He just wanted to be Brian. Perfectly normal, regular, everyday Brian. And he still very much wanted a friend.",
  },
  {
    text: "And just like that, Brian knew he'd finally found what he wanted most — a real-life friend. And he did it just by BEING HIMSELF.\n\n\"I'm Brian by the way. I'm a ghost.\"\n\"I'm Lucy. I'm a human.\"",
  },
  {
    text: "So, the two new friends laughed and played late into the night in the quiet — well, maybe not so quiet — town of St. Germaine.",
  },
];

export default function BrianTheGhostReaderPage() {
  return (
    <AmberReader
      title="Brian the Ghost"
      emoji="👻"
      coverImg="/images/books/brian-the-ghost.jpg"
      pages={PAGES}
      accentColor="#C9A0FF"
      buttonColor="#6B3FA0"
      bgColor="#0d0120"
    />
  );
}
