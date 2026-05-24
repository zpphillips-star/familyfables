import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Dream Ideas | Family Fables',
  description: 'Read along with Dream Ideas — a dreamy bedtime story by Family Fables!',
};

// NOTE: Audio files in /audio/reader/dream-ideas/ may need regeneration with OpenAI nova voice.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/dream-ideas/page-04.jpg', text: `All these dream ideas stirring in your head will make you go to sleep inside your super comfy bed, with your pillow.`, audioUrl: '/audio/reader/dream-ideas/page-004.mp3' },
  { img: '/images/reader/dream-ideas/page-05.jpg', text: null, audioUrl: '/audio/reader/dream-ideas/page-005.mp3' },
  { img: '/images/reader/dream-ideas/page-06.jpg', text: `You could dream of a treehouse built with branches and green leaves, and many tiny flowers that have many tiny bees.`, audioUrl: '/audio/reader/dream-ideas/page-006.mp3' },
  { img: '/images/reader/dream-ideas/page-07.jpg', text: `You could fly up in the sky or dive down deep into the sea, and swim with all the fishies, narwhals, even manatees.`, audioUrl: '/audio/reader/dream-ideas/page-007.mp3' },
  { img: '/images/reader/dream-ideas/page-08.jpg', text: `You could be a country music star from Nashville, Tennessee, and sing to a huge sold-out crowd at the Grand Ol' Opry.`, audioUrl: '/audio/reader/dream-ideas/page-008.mp3' },
  { img: '/images/reader/dream-ideas/page-09.jpg', text: `You could shop around on Main Street in the Land of Free Candy, or race down Ice Cream Mountain on a chocolate strawberry.`, audioUrl: '/audio/reader/dream-ideas/page-009.mp3' },
  { img: '/images/reader/dream-ideas/page-10.jpg', text: `You could travel back in time and paint with Leo DaVinci, or ride a pterodactyl next to Cera and Petrie.`, audioUrl: '/audio/reader/dream-ideas/page-010.mp3' },
  { img: '/images/reader/dream-ideas/page-11.jpg', text: `You could live in a great castle that has one great golden key, and be the princess who can't sleep because of one small pea.`, audioUrl: '/audio/reader/dream-ideas/page-011.mp3' },
  { img: '/images/reader/dream-ideas/page-12.jpg', text: `You could bike around on Mars on one wheel, or two, or three, or drive a giant big rig with as many as eighteen.`, audioUrl: '/audio/reader/dream-ideas/page-012.mp3' },
  { img: '/images/reader/dream-ideas/page-13.jpg', text: null, audioUrl: '/audio/reader/dream-ideas/page-013.mp3' },
  { img: '/images/reader/dream-ideas/page-14.jpg', text: null, audioUrl: '/audio/reader/dream-ideas/page-014.mp3' },
  { img: '/images/reader/dream-ideas/page-15.jpg', text: `You could ask the King of England if he'd pour a spot of tea, or take a train to Hogwarts and meet Hermione.`, audioUrl: '/audio/reader/dream-ideas/page-015.mp3' },
  { img: '/images/reader/dream-ideas/page-16.jpg', text: `You could walk a winter wonderland in search of a Yeti, then throw him a surprise party that's filled with confetti.`, audioUrl: '/audio/reader/dream-ideas/page-016.mp3' },
  { img: '/images/reader/dream-ideas/page-17.jpg', text: `But whatever you want to be tonight is yours to make it be. So drift away to dreamland and sleep so happily.`, audioUrl: '/audio/reader/dream-ideas/page-017.mp3' },
];

export default function DreamIdeasPage() {
  return (
    <AmberReader
      title="Dream Ideas"
      emoji="🌙"
      coverImg="/images/books/dream-ideas.png"
      pages={PAGES}
      accentColor="#C8A4FF"
      buttonColor="#7B5FD0"
      bgColor="#080018"
      isSingalong
      startNote="A dreamy bedtime poem to drift you off to sleep!"
    />
  );
}
