import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: The Shut-In Button | Family Fables',
  description: 'Read along with The Shut-In Button — a fun interactive picture book by Family Fables!',
};

// Image-only book — no audio yet. Add audioUrl entries when nova-voice MP3s are generated.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/shut-in-button/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-002.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-003.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-004.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-005.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-006.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-007.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-008.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-009.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-010.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-011.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-012.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-013.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-014.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-015.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-016.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-017.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-018.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-019.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-020.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-021.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-022.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-023.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-024.jpg', text: null },
  { img: '/images/reader/shut-in-button/spreads/spread-025.jpg', text: null },
];

export default function ShutInButtonPage() {
  return (
    <AmberReader
      title="The Shut-In Button"
      emoji="👆"
      coverImg="/images/books/shut-in-button.png"
      pages={PAGES}
      accentColor="#A8D8EA"
      buttonColor="#4A90C0"
      bgColor="#020810"
    />
  );
}
