import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Brian the Ghost | Family Fables',
  description: 'Read along with Brian the Ghost — a spooky-sweet friendship story by Family Fables!',
};

// Audio generated with OpenAI TTS nova voice ✓
const PAGES: ReaderPage[] = [
  { img: '/images/reader/brian-the-ghost/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/brian-the-ghost/spreads/spread-002.jpg', text: null },
  { img: '/images/reader/brian-the-ghost/spreads/spread-003.jpg', text: `At night, in the quiet town of St. Germaine, MONSTERS roam the streets.`, audioUrl: '/audio/reader/brian-the-ghost/spread-003.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-004.jpg', text: `There was Cleo, a MOODY MUMMY. There was Roman, a WEEPY WEREWOLF. There was Sir Gregor, a GHOULISH well... GHOUL. And then, there was BRIAN.`, audioUrl: '/audio/reader/brian-the-ghost/spread-004.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-005.jpg', text: `BRIAN was a perfectly normal, regular, everyday GHOST. Yet, he was different in one VERY BIG way.`, audioUrl: '/audio/reader/brian-the-ghost/spread-005.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-006.jpg', text: `While all the other MONSTERS loved to SPOOK! And BOO! And SCARE! BRIAN did not.`, audioUrl: '/audio/reader/brian-the-ghost/spread-006.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-007.jpg', text: `Brian just wanted to read BOOKS and play GAMES and watch MOVIES. But more than anything, BRIAN wanted a FRIEND.`, audioUrl: '/audio/reader/brian-the-ghost/spread-007.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-008.jpg', text: `"You want to be FRIENDS?! With one of them?" "Monsters don't make friends!" "We NEVER make friends!" "We HAUNT them. We HOWL at them. We HISS at them." While other monsters teased him, it occurred to Brian that maybe, just maybe, they were onto something...`, audioUrl: '/audio/reader/brian-the-ghost/spread-008.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-009.jpg', text: `Instead of SPOOKING, or HOWLING, or HISSING, maybe he could try haunting... NICELY. Then someone would surely be his friend! So, he made plans to begin the next night.`, audioUrl: '/audio/reader/brian-the-ghost/spread-009.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-010.jpg', text: `The first night Brian went to the BLEECKER house. "Children love clowns... ...and surprises!" So, he turned into a clown and hid in the toy box. Until...`, audioUrl: '/audio/reader/brian-the-ghost/spread-010.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-011.jpg', text: `It did not go like he thought.`, audioUrl: '/audio/reader/brian-the-ghost/spread-011.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-012.jpg', text: `The next night, he went to the PETERSON house, where he noticed the children brushing their teeth. "Ok, Brian, haunt nicely."`, audioUrl: '/audio/reader/brian-the-ghost/spread-012.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-013.jpg', text: `"Ummm, make sure to floss?!" It did not go like he thought.`, audioUrl: '/audio/reader/brian-the-ghost/spread-013.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-014.jpg', text: `On the third night, Brian had an even better idea. He went to the SMITH'S, where the family was cozied up in front of the television.`, audioUrl: '/audio/reader/brian-the-ghost/spread-014.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-015.jpg', text: `"I just KNOW this will work!"`, audioUrl: '/audio/reader/brian-the-ghost/spread-015.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-016.jpg', text: `DANCE PARTY!! It did NOT go like he thought.`, audioUrl: '/audio/reader/brian-the-ghost/spread-016.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-017.jpg', text: `After three long nights, Brian was out of ideas. So, he went back to the place where he reads BOOKS, plays GAMES, and watches MOVIES, ...ALONE. "I just wish I had SOMEONE to play with..."`, audioUrl: '/audio/reader/brian-the-ghost/spread-017.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-018.jpg', text: `"I LOVE your stuff!"`, audioUrl: '/audio/reader/brian-the-ghost/spread-018.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-019.jpg', text: `"I'm sorry! I didn't mean to scare you..." "Scare me?! You POPPED UP out of nowhere... SHOUTING!" "What did you expec -"`, audioUrl: '/audio/reader/brian-the-ghost/spread-019.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-020.jpg', text: `"Oh, now I get it..." That's when Brian realized: all the haunting NICELY wasn't so nice after all. The shouting. The surprising. The loud noises. Those are SCARY things. He didn't want to be scary. He just wanted to be Brian. Perfectly normal, regular, everyday Brian. And he still very much wanted a friend...`, audioUrl: '/audio/reader/brian-the-ghost/spread-020.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-021.jpg', text: null },
  { img: '/images/reader/brian-the-ghost/spreads/spread-022.jpg', text: null },
  { img: '/images/reader/brian-the-ghost/spreads/spread-023.jpg', text: null },
];

export default function BrianTheGhostPage() {
  return (
    <AmberReader
      title="Brian the Ghost"
      emoji="👻"
      coverImg="/images/books/brian-the-ghost.jpg"
      pages={PAGES}
      accentColor="#B0E0FF"
      buttonColor="#6B8FD0"
      bgColor="#06060f"
    />
  );
}
