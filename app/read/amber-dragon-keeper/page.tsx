import AmberReader, { ReaderPage } from '@/components/AmberReader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read: Amber the Dragon Keeper | Family Fables',
  description: 'Read along with Amber the Dragon Keeper — a magical adventure story by Family Fables!',
};

// Audio generated with OpenAI TTS nova voice ✓
const PAGES: ReaderPage[] = [
  {
    img: '/images/reader/amber-dragon-keeper/page-01.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-04.mp3',
    text: "Amber was a little girl who lived a normal happy life. She went to school, played with her toys, laughed with her parents, and dreamed her wonderful dreams. But Amber had a secret.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-02.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-05.mp3',
    text: "Amber had a magical closet that took her to a far-off place. A place where fairies flew free and mermaids swam the deepest seas. But, the most amazing of all the creatures that roamed this land were the dragons that took to the skies.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-03.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-06.mp3',
    text: "This land was called Sydar. And in Sydar, Amber was the famous dragon keeper.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-04.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-07.mp3',
    text: "To know that you must first know the dragons. What is a dragon keeper?",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-05.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-08.mp3',
    text: "The dragons of Sydar weren't nasty or scary or mean. They were the most gentle creatures that roamed the land.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-06.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-09.mp3',
    text: "There were tall ones. Short ones. Skinny ones. Fat ones. Old ones. And baby ones.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-07.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-10.mp3',
    text: "And Amber was friends with them all.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-08.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-11.mp3',
    text: "She taught them to fly and to walk and to swim. She kept them clean from their scaly nose to their scaly toes. And she trained them to control their magical breath of fire and ice!",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-09.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-12.mp3',
    text: "But her most favorite thing of all the things to do with the dragons was to ride them. Amber and the dragons would spend hours in the skies. Diving, swirling, twirling, and scoobatoobing...",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-10.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-13.mp3',
    text: "...scoobatoobing was a special move you could only do with the dragons of Sydar.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-11.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-14.mp3',
    text: "All the dragons of Sydar were amazing in their own special way, but Amber did have a favorite. She considered this dragon her best friend in all of Sydar. A majestic dragon with soft blue scales and a golden mane. A dragon named Cinnamon.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-12.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-15.mp3',
    text: "Cinnamon and Amber went on amazing adventures together. They fought off dangerous witches and warlocks, helped villagers build their cottages, and watched over all the creatures of Sydar.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-13.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-16.mp3',
    text: "But it wasn't always work for Amber and Cinnamon — they also found a way to have fun. They flew high up above the clouds. They went camping and roasted as many marshmallows as they could fit in their mouths. They created ice lakes for the villagers to skate on and made many, many friends along the way.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-14.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-17.mp3',
    text: "This was everyday life in Sydar. But days are still days, and all days come to an end.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-15.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-18.mp3',
    text: "Then, Amber would enter the magical cave and come out of the closet into her bedroom on the other side. For Amber and Cinnamon, the ends were always happy. Cinnamon would fly Amber to the Glowing Mountains where Amber would give her friend a biiiigggg hug goodbye, and they would smile knowing they were that much closer to seeing each other again.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-16.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-19.mp3',
    text: "She would go to sleep and dream her wonderful dreams, excited to tell her parents about her adventures in the morning.",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-17.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-20.mp3',
    text: "Whether her parents thought her adventures were dreams or not, Amber always knew the truth. Every night when she walked through the magical closet to visit Cinnamon and the other dragons of Sydar she became...",
  },
  {
    img: '/images/reader/amber-dragon-keeper/page-18.jpg',
    audioUrl: '/audio/amber-dragon-keeper/page-21.mp3',
    text: "Amber, the Dragon Keeper!",
  },
];

export default function AmberDragonKeeperPage() {
  return (
    <AmberReader
      title="Amber the Dragon Keeper"
      emoji="🐉"
      coverImg="/images/books/amber-dragon-keeper.jpg"
      pages={PAGES}
      accentColor="#FFD700"
      buttonColor="#9B6FD0"
      bgColor="#0a0018"
    />
  );
}