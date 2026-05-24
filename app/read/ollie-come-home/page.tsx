import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Ollie Come Home | Family Fables',
  description: 'Read along with Ollie Come Home — a sweet cat adventure by Family Fables!',
};

// Image-only book — no audio yet. Add audioUrl entries when nova-voice MP3s are generated.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/ollie-come-home/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-002.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-003.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-004.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-005.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-006.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-007.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-008.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-009.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-010.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-011.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-012.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-013.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-014.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-015.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-016.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-017.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-018.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-019.jpg', text: null },
  { img: '/images/reader/ollie-come-home/spreads/spread-020.jpg', text: null },
];

export default function OllieComeHomePage() {
  return (
    <AmberReader
      title="Ollie Come Home"
      emoji="🐱"
      coverImg="/images/books/ollie-come-home.png"
      pages={PAGES}
      accentColor="#FF8FAB"
      buttonColor="#D05070"
      bgColor="#0a0006"
    />
  );
}
