import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Frog a Dog | Family Fables',
  description: 'Read along with Frog a Dog — a silly picture book by Family Fables!',
};

// Image-only book — no audio yet. Add audioUrl entries when nova-voice MP3s are generated.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/frog-a-dog/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-002.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-003.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-004.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-005.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-006.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-007.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-008.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-009.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-010.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-011.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-012.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-013.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-014.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-015.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-016.jpg', text: null },
  { img: '/images/reader/frog-a-dog/spreads/spread-017.jpg', text: null },
];

export default function FrogADogPage() {
  return (
    <AmberReader
      title="Frog a Dog"
      emoji="🐸"
      coverImg="/images/books/frog-a-dog.png"
      pages={PAGES}
      accentColor="#7FDD7F"
      buttonColor="#3DA83D"
      bgColor="#020e02"
    />
  );
}
