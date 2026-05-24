import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: One Tom Turkey | Family Fables',
  description: 'Sing along with One Tom Turkey — a Thanksgiving counting sing-along by Family Fables!',
};

// NOTE: Audio files in /audio/reader/one-tom-turkey/ may need regeneration with OpenAI nova voice.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/one-tom-turkey/page-004.jpg', text: `One Tom Turkey goes gobble gobble gobble, gobble gobble gobble, gobble gobble gobble. One Tom Turkey goes gobble gobble gobble, on Thanksgiving day!`, audioUrl: '/audio/reader/one-tom-turkey/page-004.mp3' },
  { img: '/images/reader/one-tom-turkey/page-005.jpg', text: `Two pumpkin pies go mix, bake, bake! Mix, bake, bake! Mix, bake, bake! Two pumpkin pies go mix, bake, bake, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-005.mp3' },
  { img: '/images/reader/one-tom-turkey/page-006.jpg', text: `Three cranberry tasters go — ooo, that's sour! Ooo, that's sour! Ooo, that's sour! Three cranberry tasters go ooo, that's sour, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-006.mp3' },
  { img: '/images/reader/one-tom-turkey/page-007.jpg', text: `Four boiled potatoes go mash, mash, stir! Mash, mash, stir! Mash, mash, stir! Four boiled potatoes go mash, mash, stir, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-007.mp3' },
  { img: '/images/reader/one-tom-turkey/page-008.jpg', text: `Five flying footballs go spinning in the air, spinning in the air, spinning in the air! Five flying footballs go spinning in the air, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-008.mp3' },
  { img: '/images/reader/one-tom-turkey/page-009.jpg', text: `Six things we are thankful for, thankful for, thankful for. Six things we are thankful for, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-009.mp3' },
  { img: '/images/reader/one-tom-turkey/page-010.jpg', text: `Seven shirt buttons go stretch, stretch, POP! Stretch, stretch, POP! Stretch, stretch, POP! Seven shirt buttons go stretch, stretch, POP! On Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-010.mp3' },
  { img: '/images/reader/one-tom-turkey/page-011.jpg', text: `Eight full tummies go mmm, that was good! Mmm, that was good! Mmm, that was good! Eight full tummies go mmm, that was good, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-011.mp3' },
  { img: '/images/reader/one-tom-turkey/page-012.jpg', text: `Nine dirty dishes go clink, clank, clink! Clink, clank, clink! Clink, clank, clink! Nine dirty dishes go clink, clank, clink, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-012.mp3' },
  { img: '/images/reader/one-tom-turkey/page-013.jpg', text: `Ten tired folks go yawn, yawn, yawn! Yawn, yawn, yawn! Yawn, yawn, yawn! Ten tired folks go yawn, yawn, yawn, on Thanksgiving day.`, audioUrl: '/audio/reader/one-tom-turkey/page-013.mp3' },
  { img: '/images/reader/one-tom-turkey/page-014.jpg', text: `One Tom Turkey goes gobble gobble gobble, gobble gobble gobble, gobble gobble gobble. One Tom Turkey goes gobble gobble… PARDON!!! On Thanksgiving day!`, audioUrl: '/audio/reader/one-tom-turkey/page-014.mp3' },
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
