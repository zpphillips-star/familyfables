import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Finding Hampton | Family Fables',
  description: "Read along with Finding Hampton — Hampton the pig's birthday adventure by Family Fables!",
};

// NOTE: Audio files in /audio/reader/finding-hampton/ may need regeneration with OpenAI nova voice.
const PAGES: ReaderPage[] = [
  { img: '/images/reader/finding-hampton/page-04.jpg', text: `It was Rosie's birthday, and Hampton was in search of a gift for her. A last minute gift. He was very stressed.`, audioUrl: '/audio/reader/finding-hampton/page-004.mp3' },
  { img: '/images/reader/finding-hampton/page-05.jpg', text: `What could Rosie want?! Some worms? A fan? A bubble bath?`, audioUrl: '/audio/reader/finding-hampton/page-005.mp3' },
  { img: '/images/reader/finding-hampton/page-06.jpg', text: `Hampton took a seat on a nearby rock so he could really focus. He needed one hundred percent of his brain power dedicated to birthday present thinking.`, audioUrl: '/audio/reader/finding-hampton/page-006.mp3' },
  { img: '/images/reader/finding-hampton/page-07.jpg', text: `So, he thought. And, he thought. And, he thought. Until he realized that the rock was moving!`, audioUrl: '/audio/reader/finding-hampton/page-007.mp3' },
  { img: '/images/reader/finding-hampton/page-08.jpg', text: `Hampton, you're a genius! That's it! A walking rock! Rhinos love rocks. But a WALKING rock?! It's perfect.`, audioUrl: '/audio/reader/finding-hampton/page-008.mp3' },
  { img: '/images/reader/finding-hampton/page-09.jpg', text: `Hampton reached to pick it up, but the rock took off! And again. And again.`, audioUrl: '/audio/reader/finding-hampton/page-009.mp3' },
  { img: '/images/reader/finding-hampton/page-10.jpg', text: `Hampton spent hours tracking this elusive rock. In fact, he had walked so far and so long that he couldn't even hear his friends searching for him.`, audioUrl: '/audio/reader/finding-hampton/page-010.mp3' },
  { img: '/images/reader/finding-hampton/page-11.jpg', text: `Using Hampton's special call, his friends yelled out at the top of their lungs: OINK! OINK! Piggy! Piggy! Up trees. In the water. In the sky. In the grass. In bananas. Under Rosie. In anthills.`, audioUrl: '/audio/reader/finding-hampton/page-011.mp3' },
  { img: '/images/reader/finding-hampton/page-13.jpg', text: `Nothing.`, audioUrl: '/audio/reader/finding-hampton/page-013.mp3' },
  { img: '/images/reader/finding-hampton/page-14.jpg', text: `Just then, he got a pig-of-a-genius idea! Hampton was too far and too focused on tracking that rock.`, audioUrl: '/audio/reader/finding-hampton/page-014.mp3' },
  { img: '/images/reader/finding-hampton/page-16.jpg', text: `BOUNCE!`, audioUrl: '/audio/reader/finding-hampton/page-016.mp3' },
  { img: '/images/reader/finding-hampton/page-17.jpg', text: `Who said that? Me. Get off me. Rock? Is that you?! A walking AND talking rock? Super rare… I'm just a turtle. A turtle running away from a hungry piggy.`, audioUrl: '/audio/reader/finding-hampton/page-017.mp3' },
  { img: '/images/reader/finding-hampton/page-18.jpg', text: `There's no such thing as a walking rock! Or a talking rock! I've been tracking you all morning so I could give you as a gift to my friend. She's a rhino. Today's her birthday. But I thought you were a rock.`, audioUrl: '/audio/reader/finding-hampton/page-018.mp3' },
  { img: '/images/reader/finding-hampton/page-19.jpg', text: `Your friend's birthday, huh? Which, by the way — still a turtle. Why not spend it WITH your friend instead? And maybe receive a gift? Not a rock gift, please.`, audioUrl: '/audio/reader/finding-hampton/page-019.mp3' },
  { img: '/images/reader/finding-hampton/page-20.jpg', text: `Oh no! You're right! I need to get back to them!`, audioUrl: '/audio/reader/finding-hampton/page-020.mp3' },
  { img: '/images/reader/finding-hampton/page-21.jpg', text: `Well, pig, you're in luck. Turtles are actual expert trackers. Follow my directions exactly and you'll reach your friends in time.`, audioUrl: '/audio/reader/finding-hampton/page-021.mp3' },
  { img: '/images/reader/finding-hampton/page-22.jpg', text: `There. They're right there. Through the leaves. We didn't travel very far.`, audioUrl: '/audio/reader/finding-hampton/page-022.mp3' },
  { img: '/images/reader/finding-hampton/page-23.jpg', text: `Overjoyed, Hampton thanked the turtle and leapt through the leaves.`, audioUrl: '/audio/reader/finding-hampton/page-023.mp3' },
  { img: '/images/reader/finding-hampton/page-24.jpg', text: `I'm sorry I don't have a gift, Rosie. Don't be silly, Hampton. Having my friends with me on my birthday is the best gift I could have wished for.`, audioUrl: '/audio/reader/finding-hampton/page-024.mp3' },
  { img: '/images/reader/finding-hampton/page-25.jpg', text: `Hampton then told his friends the whole story about the magical rock that walked and talked and had legs and a head. Everyone totally believed him.`, audioUrl: '/audio/reader/finding-hampton/page-025.mp3' },
  { img: '/images/reader/finding-hampton/page-26.jpg', text: `It turned out to be Rosie's best birthday yet! With that, they spent the rest of the day together celebrating: eating worms, splashing around, and staying cool.`, audioUrl: '/audio/reader/finding-hampton/page-026.mp3' },
  { img: '/images/reader/finding-hampton/page-27.jpg', text: `Not a rock.`, audioUrl: '/audio/reader/finding-hampton/page-027.mp3' },
];

export default function FindingHamptonPage() {
  return (
    <AmberReader
      title="Finding Hampton"
      emoji="🎈"
      coverImg="/images/books/finding-hampton.jpg"
      pages={PAGES}
      accentColor="#FFD46E"
      buttonColor="#D0962A"
      bgColor="#0a0800"
    />
  );
}
