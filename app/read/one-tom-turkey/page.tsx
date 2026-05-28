import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: One Tom Turkey | Family Fables',
  description: 'Sing along with One Tom Turkey — a Thanksgiving counting sing-along by Family Fables!',
};

// Audio generated with OpenAI TTS nova voice ✓ (expressive rewrite — tts-1-hd, speed 1.05)
const PAGES: ReaderPage[] = [
  { img: '/images/reader/one-tom-turkey/page-004.jpg', text: `ONE Tom Turkey goes GOBBLE, gobble, gobble! Gobble, gobble, gobble! Gobble, gobble, gobble! ONE Tom Turkey goes gobble, gobble, gobble... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-01.mp3' },
  { img: '/images/reader/one-tom-turkey/page-005.jpg', text: `TWO pumpkin pies go mix, bake, BAKE! Mix, bake, BAKE! Mix, bake, BAKE! TWO pumpkin pies go mix, bake, bake... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-02.mp3' },
  { img: '/images/reader/one-tom-turkey/page-006.jpg', text: `THREE cranberry tasters go — oooo, that's SOUR! Oooo, that's SOUR! Oooo, that's SOUR! THREE cranberry tasters go oooo, that's sour... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-03.mp3' },
  { img: '/images/reader/one-tom-turkey/page-007.jpg', text: `FOUR boiled potatoes go MASH, mash, stir! MASH, mash, stir! MASH, mash, stir! FOUR boiled potatoes go mash, mash, stir... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-04.mp3' },
  { img: '/images/reader/one-tom-turkey/page-008.jpg', text: `FIVE flying footballs go SPINNING in the air! Spinning in the air! SPINNING in the air! FIVE flying footballs go spinning in the air... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-05.mp3' },
  { img: '/images/reader/one-tom-turkey/page-009.jpg', text: `SIX things we are THANKFUL for! Thankful for! THANKFUL for! SIX things we are thankful for... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-06.mp3' },
  { img: '/images/reader/one-tom-turkey/page-010.jpg', text: `SEVEN shirt buttons go stretch, stretch, POP! Stretch, stretch, POP! Stretch, stretch, POP! SEVEN shirt buttons go stretch, stretch, POP... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-07.mp3' },
  { img: '/images/reader/one-tom-turkey/page-011.jpg', text: `EIGHT full tummies go mmmm, that was GOOD! Mmmm, that was GOOD! Mmmm, that was GOOD! EIGHT full tummies go mmm, that was good... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-08.mp3' },
  { img: '/images/reader/one-tom-turkey/page-012.jpg', text: `NINE dirty dishes go CLINK, clank, clink! Clink, CLANK, clink! Clink, clank, CLINK! NINE dirty dishes go clink, clank, clink... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-09.mp3' },
  { img: '/images/reader/one-tom-turkey/page-013.jpg', text: `TEN tired folks go YAWN, yawn, yawn! Yawn, YAWN, yawn! Yawn, yawn, YAWN! TEN tired folks go yawn, yawn, yawn... on Thanksgiving DAY!`, audioUrl: '/audio/one-tom-turkey/page-10.mp3' },
  { img: '/images/reader/one-tom-turkey/page-014.jpg', text: `ONE Tom Turkey goes gobble, gobble, gobble! Gobble, gobble, gobble! Gobble, gobble, gobble! One Tom Turkey goes gobble gobble... PARDON!!! On Thanksgiving DAY!!!`, audioUrl: '/audio/one-tom-turkey/page-11.mp3' },
];

export default function OneTomTurkeyPage() {
  return (
    <AmberReader
      title="One Tom Turkey"
      emoji="🦃"
      coverImg="/images/books/one-tom-turkey.png"
      pages={PAGES}
      accentColor="#FF9933"
      buttonColor="#C06B39"
      bgColor="#0a0400"
      isSingalong
      startNote="Sing along to the tune of Wheels on the Bus!"
    />
  );
}
