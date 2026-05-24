import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Read: Gilroy's Gobble | Family Fables",
  description: "Read along with Gilroy's Gobble — the story of a turkey finding his own voice, by Family Fables!",
};

// NOTE: Audio files in /audio/reader/gilroys-gobble/ may need regeneration with OpenAI nova voice.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/gilroys-gobble/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/gilroys-gobble/spreads/spread-002.jpg', text: `Overjoyed to see the red fall leaves fall, Gilroy belted out quite an odd turkey call.`, audioUrl: '/audio/reader/gilroys-gobble/spread-002.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-003.jpg', text: `"Wee Loo Lee Loo!" Olivia the owl was watching from above, then asked a question with her owly love:`, audioUrl: '/audio/reader/gilroys-gobble/spread-003.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-004.jpg', text: `"What was that, my dear? That was no 'Hoo.'" That's my turkey call. It's what turkeys do. Here, let me help. Do what I do.`, audioUrl: '/audio/reader/gilroys-gobble/spread-004.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-005.jpg', text: `"Let me hear your turkey... Hooooo!" Trying to fit in, and without further ado, Gilroy let out a "Wee Loo Lee Loo!"`, audioUrl: '/audio/reader/gilroys-gobble/spread-005.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-006.jpg', text: `Overheard by Corey, the cow on the farm, Gilroy wobbled to him, charmed by his charm. "You've got charisma, kid. I'll give you that much. What you've really got to do is add a cow's touch."`, audioUrl: '/audio/reader/gilroys-gobble/spread-006.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-007.jpg', text: `"Now, watch me closely. Balance on four legs, and moo your turkey... Mooooo!" Taking his advice, Gilroy dropped to his wings and let out a "Wee Loo Lee Loo! That sounds so close," snapped the rooster on the roof,`, audioUrl: '/audio/reader/gilroys-gobble/spread-007.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-008.jpg', text: `"to what a bird should sound like. That thing on your face — we call it a beak. Use it like mine and speak bird speak." First, puff out your chest and feather your do.`, audioUrl: '/audio/reader/gilroys-gobble/spread-008.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-009.jpg', text: `"Then let us hear your turkey... Cock-a-doodle-Doo!" Taking his advice, Gilroy mirrored his moves and let out a "Wee Loo Lee Loo! Hey, Gilroy the turkey! You look a little tense."`, audioUrl: '/audio/reader/gilroys-gobble/spread-009.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-010.jpg', text: `"Don't mind the others. They haven't a clue. The remedy you seek is in the form of a 'Coo.' Jump up here with me and follow my moves. Then let us hear your turkey... Coo Coo Ka Choo."`, audioUrl: '/audio/reader/gilroys-gobble/spread-010.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-011.jpg', text: `Taking his advice, Gilroy popped on the post and let out a "Wee Loo Lee Loo."`, audioUrl: '/audio/reader/gilroys-gobble/spread-011.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-012.jpg', text: `At the pond nearby swam a spotted looney loon. "Come here, young turkey. You've got to sing my tune."`, audioUrl: '/audio/reader/gilroys-gobble/spread-012.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-013.jpg', text: `Right then she yelled out, "Loo Loo Loo! Loo Dee Loo Dee Loo! All your calls are different! I don't know which one to choose. They all sound great, but they all sound like you!"`, audioUrl: '/audio/reader/gilroys-gobble/spread-013.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-014.jpg', text: `Gilroy wandered off thinking, "I'm doing this all wrong. How am I going to find the right turkey song?"`, audioUrl: '/audio/reader/gilroys-gobble/spread-014.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-015.jpg', text: `Then off in the distance, he heard a "Tut Tut Too Doo." It came from a turkey, but wasn't something he knew. "Tut Tut Too Doo. What is that sound? Did that come from you?"`, audioUrl: '/audio/reader/gilroys-gobble/spread-015.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-016.jpg', text: `"Please teach it to me so I can sound like I'm supposed to." "You're not a loon, cow, rooster, or owl. You are who you are, Gilroy the fowl."`, audioUrl: '/audio/reader/gilroys-gobble/spread-016.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-017.jpg', text: `"So no matter your call, make sure it's your own — from the time you're a baby until your full grown." The advice sank in, as he looked all around. Gilroy saw each animal sounding their sound.`, audioUrl: '/audio/reader/gilroys-gobble/spread-017.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-018.jpg', text: `They all looked happy, for they were who they were, no matter what they wore: feathers or fur. Gilroy smiled a big smile. He finally knew. He was himself — a turkey — through and through.`, audioUrl: '/audio/reader/gilroys-gobble/spread-018.mp3' },
  { img: '/images/reader/gilroys-gobble/spreads/spread-019.jpg', text: `With that he joined the rest of the crew, and let out his own Gilroy "Wee Loo Lee Loo!"`, audioUrl: '/audio/reader/gilroys-gobble/spread-019.mp3' },
];

export default function GilroysGobblePage() {
  return (
    <AmberReader
      title="Gilroy's Gobble"
      emoji="🦃"
      coverImg="/images/books/gilroys-gobble.png"
      pages={PAGES}
      accentColor="#FFB347"
      buttonColor="#D07A1A"
      bgColor="#0a0500"
    />
  );
}
