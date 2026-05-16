import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: Finding Hampton | Family Fables",
  description: "Read along with Finding Hampton — a funny and heartwarming story about the best birthday gift ever, by Family Fables!",
};

const PAGES: ReaderPage[] = [
  {
    text: "It was Rosie's birthday, and Hampton was in search of a gift for her. A last minute gift. He was very stressed.",
  },
  {
    text: "What could Rosie want?! Some worms? A fan? A bubble bath?",
  },
  {
    text: "Hampton took a seat on a nearby rock so he could really focus. He needed 100% of his brain power dedicated to birthday present thinking.",
  },
  {
    text: "So, he thought. And, he thought. And, he thought. Until he realized… the rock could walk!",
  },
  {
    text: "\"Hampton, you're a genius! That's it!!! A walking rock! Rhinos love rocks. But a walking rock?! It's perfect.\"",
  },
  {
    text: "Hampton reached to pick it up, but the rock took off! And again. And again. And again.",
  },
  {
    text: "Hampton spent hours tracking this elusive rock. In fact, he walked so far and so long that he couldn't even hear his friends searching for him.",
  },
  {
    text: "Using Hampton's special call, his friends yelled out at the top of their lungs: \"OINK! PIGGY! SNORT!\"",
  },
  {
    text: "Up trees. In the water. In the sky. In the grass. In bananas. Under Rosie. In anthills.",
  },
  {
    text: "Nothing.",
  },
  {
    text: "Hampton was too far and too focused on tracking this rock. Just then, he got a pig-of-a-genius idea!",
  },
  {
    text: "\"POUNCE!\"\n\"Who said that?\"\n\"Me! Get off me!\"\n\"Rock?! Is that you? A walking and talking rock? Super rare.\"",
  },
  {
    text: "\"I am a turtle. There's no such thing as a walking rock. Or a talking rock. Or a WALKING, TALKING rock. I am just a turtle… a turtle running away from a hungry piggy.\"",
  },
  {
    text: "\"WAIT! I'm not trying to eat you! I've been tracking you all morning so I could give you as a gift to my friend. She's a rhino. Today's her birthday. But I thought you were a rock.\"",
  },
  {
    text: "\"Your friend's birthday, huh? Don't you think she'd rather spend it with her friends instead of just receive a gift? A rock gift, no less?\"\n\"Oh no! You're right! I need to get back to them, piggety-split!\"",
  },
  {
    text: "\"Well, pig, you're in luck. Turtles are actual expert trackers. If you follow my directions exactly, you will reach your friends… piggety-split.\"\n\"Yes! Tell me! Tell me!\"",
  },
  {
    text: "\"There. They're right there. Through the leaves. You didn't actually track me very far. I'm a turtle, remember?\"",
  },
  {
    text: "Just then, Hampton's ears perked up, and he heard: \"OINK! PIGGY! SNORT!\" Overjoyed, he thanked the rock and leapt through the leaves.",
  },
  {
    text: "\"I'm sorry I don't have a gift, Rosie.\"\n\"Don't be silly, Hampton. Having my friends with me on my birthday is the best gift I could have wished for!\"",
  },
  {
    text: "Hampton told his friends the whole story about the magical rock that walked and talked and had legs and a head. Everyone \"totally\" believed him.",
  },
  {
    text: "With that, they spent the rest of the day together celebrating Rosie's birthday: eating worms, splashing around, and staying cool. It turned out to be Rosie's best birthday yet!",
  },
];

export default function FindingHamptonReaderPage() {
  return (
    <AmberReader
      title="Finding Hampton"
      emoji="🎈"
      coverImg="/images/books/finding-hampton.png"
      pages={PAGES}
      accentColor="#7ED96E"
      buttonColor="#3A8A2E"
      bgColor="#050f05"
    />
  );
}
