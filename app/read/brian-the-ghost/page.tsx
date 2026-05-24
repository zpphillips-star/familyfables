import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Brian the Ghost | Family Fables',
  description: 'Read along with Brian the Ghost — a spooky-sweet friendship story by Family Fables!',
};

// NOTE: Audio files in /audio/reader/brian-the-ghost/ may need regeneration with OpenAI nova voice.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/brian-the-ghost/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/brian-the-ghost/spreads/spread-002.jpg', text: null },
  { img: '/images/reader/brian-the-ghost/spreads/spread-003.jpg', text: `At night, in the quiet town of St. Germaine… MONSTERS roam the streets.`, audioUrl: '/audio/reader/brian-the-ghost/spread-003.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-004.jpg', text: `There was Cleo, a MATERIALISTIC MUMMY. And there was Roman, a WISTFUL WEREWOLF.`, audioUrl: '/audio/reader/brian-the-ghost/spread-004.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-005.jpg', text: `There was Sir Gregor, a GHOULISH… well… GHOUL. …and then there was Brian.`, audioUrl: '/audio/reader/brian-the-ghost/spread-005.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-006.jpg', text: `Brian was a perfectly normal, everyday, regular GHOST. Yet, Brian was different in one VERY BIG way.`, audioUrl: '/audio/reader/brian-the-ghost/spread-006.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-007.jpg', text: `While all the other monsters of St. Germaine loved to SPOOK! And BOO! And SCARE! Brian did not. Brian just wanted to read BOOKS and play GAMES and watch MOVIES.`, audioUrl: '/audio/reader/brian-the-ghost/spread-007.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-008.jpg', text: `But, more than anything, Brian wanted a friend. "You want to be friends? With one of them?" laughed the others. "Monsters don't make friends.`, audioUrl: '/audio/reader/brian-the-ghost/spread-008.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-009.jpg', text: `"We HAUNT them. We HOWL at them. We HISS at them. We never make friends." But Brian wasn't listening… Something the ghosts said gave him an idea. What if he haunted nicely? Then someone would surely be his friend.`, audioUrl: '/audio/reader/brian-the-ghost/spread-009.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-010.jpg', text: `So, he made plans to begin the next night.`, audioUrl: '/audio/reader/brian-the-ghost/spread-010.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-011.jpg', text: `The first night, Brian went to the Bleecker house. "Children love clowns," he thought. "And surprises!" So, he turned into a clown and hid in the toy box.`, audioUrl: '/audio/reader/brian-the-ghost/spread-011.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-012.jpg', text: `It did not go like he thought.`, audioUrl: '/audio/reader/brian-the-ghost/spread-012.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-013.jpg', text: `The second night, he went to the Peterson house where he spied children washing their faces before bed. "Maybe I can be helpful?" thought Brian.`, audioUrl: '/audio/reader/brian-the-ghost/spread-013.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-014.jpg', text: `It did not go like he thought.`, audioUrl: '/audio/reader/brian-the-ghost/spread-014.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-015.jpg', text: `The third night, Brian had an even better idea. He went to the Smith's, where the family was gathered in front of the television. "I just know this will work," he reassured himself.`, audioUrl: '/audio/reader/brian-the-ghost/spread-015.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-016.jpg', text: `It did not go like he thought.`, audioUrl: '/audio/reader/brian-the-ghost/spread-016.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-017.jpg', text: `After three long nights, Brian was out of ideas. So, he went back to the place where he read his books and played his games and watched his movies… and he began to cry. "I just wish I had someone to play with…"`, audioUrl: '/audio/reader/brian-the-ghost/spread-017.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-018.jpg', text: `"I like your stuff!" A little girl named Lucy springs up from behind a pile of books. Brian screams in terror.`, audioUrl: '/audio/reader/brian-the-ghost/spread-018.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-019.jpg', text: `"You scared me! Oh, now I get it." Sheepishly, Brian asked, "What are you doing here?" "I'm kind of… an explorer!" said the girl. And suddenly, Brian had his best idea yet. "I have some books about famous explorers. Do you want to see?" The girl beamed, "I'm Lucy." "I'm Brian. I'm a ghost."`, audioUrl: '/audio/reader/brian-the-ghost/spread-019.mp3' },
  { img: '/images/reader/brian-the-ghost/spreads/spread-020.jpg', text: `And so, the two friends played and laughed late into the night in the quiet — well, maybe not so quiet — town of St. Germaine.`, audioUrl: '/audio/reader/brian-the-ghost/spread-020.mp3' },
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
