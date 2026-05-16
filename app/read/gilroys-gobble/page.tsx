import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: Gilroy's Gobble | Family Fables",
  description: "Read along with Gilroy's Gobble — a fun Thanksgiving story about finding your own voice, by Family Fables!",
};

const PAGES: ReaderPage[] = [
  {
    text: "Overjoyed to see the red fall leaves fall, Gilroy belted out quite an odd turkey call. \"Wee Loo Lee Loo!\"",
  },
  {
    text: "Olivia the owl was watching from above, then asked a question with her owly love: \"What was that, my dear? That was no Hoo.\"",
  },
  {
    text: "\"That's my turkey call. It's what turkeys do.\"",
  },
  {
    text: "\"Here, let me help. Do what I do. Let me hear your turkey — Hooooo!\" Trying to fit in and without further ado, Gilroy let out a \"Wee Loo Lee Loo!\"",
  },
  {
    text: "Overheard by Corey, the cow on the farm, Gilroy wobbled to him, charmed by his charm.",
  },
  {
    text: "\"You've got charisma, kid. I'll give you that much. What you've really got to do is add a cow's touch.\"",
  },
  {
    text: "\"Now, watch me closely. This may be new. Balance on four legs, and moo your turkey — Moooooo!\" Taking his advice and without further ado, Gilroy dropped to his wings and let out a \"Wee Loo Lee Loo!\"",
  },
  {
    text: "\"That sounds so close,\" snapped the rooster on the roof, \"to what a bird should sound like, instead of that goof. That thing on your face, we call it a beak. Use it like mine, and speak bird speak.\"",
  },
  {
    text: "\"First, puff out your chest, and feather your do. Then let us hear your turkey — Cock-a-doodle-Doo!\" Taking his advice and without further ado, Gilroy mirrored his moves and let out a \"Wee Loo Lee Loo!\"",
  },
  {
    text: "\"Hey, Gilroy the turkey! You look a little tense. Don't mind the others. They haven't a clue. The remedy you seek is in the form of a Coo.\"",
  },
  {
    text: "\"Jump up here with me and follow my moves. Then let us hear your turkey — Coo Coo Ka Choo.\" Taking his advice and without further ado, Gilroy popped on the post and let out a \"Wee Loo Lee Loo.\"",
  },
  {
    text: "At the pond nearby swam a spotted looney loon. \"Come here, young turkey. You've got to sing my tune.\" Right then she yelled out: \"Loo Loo Loo! Loo Dee Loo Dee Loo!\"",
  },
  {
    text: "\"All your calls are different! I don't know which one to choose. They all sound great, but they all sound like you!\"",
  },
  {
    text: "Gilroy wandered off thinking, \"I'm doing this all wrong. How am I going to find the right turkey song?\"",
  },
  {
    text: "Then off in the distance, he heard \"Tut Tut Too Doo.\" It came from a turkey but wasn't something he knew.",
  },
  {
    text: "\"What was that sound? Did that come from you?? Please teach it to me so I can sound like I'm supposed to.\"",
  },
  {
    text: "\"You're not a loon, cow, rooster, or owl. You are who you are, Gilroy the fowl. So no matter your call, make sure it's your own, from the time you're a baby until you're fully grown.\"",
  },
  {
    text: "The advice sank in, as he looked all around. Gilroy saw each animal sounding their sound. They all looked happy, for they were who they were, no matter what they wore: feathers or fur.",
  },
  {
    text: "Gilroy smiled a big smile. He finally knew. He was himself, a turkey, through and through. With that he joined the rest of the crew, and let out his own Gilroy \"Wee Loo Lee Loo!\"",
  },
];

export default function GilroysGobbleReaderPage() {
  return (
    <AmberReader
      title="Gilroy's Gobble"
      emoji="🦃"
      coverImg="/images/books/gilroys-gobble.png"
      pages={PAGES}
      accentColor="#F5B942"
      buttonColor="#C07020"
      bgColor="#120800"
    />
  );
}
