import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: What-a-Doodle-Do! | Family Fables',
  description: 'Read along with What-a-Doodle-Do! — a silly rooster rhyme book by Family Fables!',
};

// NOTE: Audio files in /audio/reader/what-a-doodle-do/ may need regeneration with OpenAI nova voice.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/what-a-doodle-do/spreads/spread-001.jpg', text: null },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-002.jpg', text: `beanstalk-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-002.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-003.jpg', text: `sleepwalk-a-doodle-do! chalk-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-003.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-004.jpg', text: `bedrock-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-004.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-005.jpg', text: null },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-006.jpg', text: `lock-a-doodle-do! talk-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-006.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-007.jpg', text: `bach-a-doodle-do! wok-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-007.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-008.jpg', text: `sherlock-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-008.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-009.jpg', text: `block-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-009.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-010.jpg', text: null },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-011.jpg', text: `boardwalk-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-011.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-012.jpg', text: `shamrock-a-doodle-do! walk-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-012.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-013.jpg', text: `croc-a-doodle-do! jock-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-013.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-014.jpg', text: `doc-a-doodle-do! clock-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-014.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-015.jpg', text: `sock-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-015.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-016.jpg', text: `catwalk-a-doodle-do!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-016.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-017.jpg', text: `mohawk-a-doodle-do! COCK-A-DOODLE-DO!!!`, audioUrl: '/audio/reader/what-a-doodle-do/spread-017.mp3' },
  { img: '/images/reader/what-a-doodle-do/spreads/spread-018.jpg', text: null },
];

export default function WhatADoodleDoPage() {
  return (
    <AmberReader
      title="What-a-Doodle-Do!"
      emoji="🐓"
      coverImg="/images/books/what-a-doodle-do.jpg"
      pages={PAGES}
      accentColor="#FFE45E"
      buttonColor="#D09A10"
      bgColor="#0a0700"
    />
  );
}
