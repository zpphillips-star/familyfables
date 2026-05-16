import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: Dream Ideas | Family Fables",
  description: "Sing along with Dream Ideas — the magical bedtime singalong by Family Fables!",
};

const PAGES: ReaderPage[] = [
  {
    text: "All these dream ideas stirring in your head will make you go to sleep inside your super comfy bed with your pillow.",
  },
  {
    text: "You could dream of anything, and build ideas here — here's a list to help you go.",
  },
  {
    text: "You could dream of a tree house built with branches and green leaves and many tiny flowers that have many tiny bees.",
  },
  {
    text: "You could fly up in the sky, or dive down underwater into the sea, and swim with all the fishies, narwhals, even manatees.",
  },
  {
    text: "You could be a country music star from Nashville, Tennessee, and sing to a grand old crowd at the Grand Ole Opry.",
  },
  {
    text: "You could shop around on Main Street in the Land of Free Candy, or race down Ice Cream Mountain on a chocolate strawberry.",
  },
  {
    text: "You could travel back in time and paint with Leonardo DaVinci, or ride a pterodactyl next to Cera and Petrie.",
  },
  {
    text: "You could live in a great castle that has one great golden key, and be the princess who can't sleep because of one small pea.",
  },
  {
    text: "You could bike around on Mars on one wheel, or two, or three, or drive a giant big rig with as many as eighteen.",
  },
  {
    text: "You could dance and soar among the stars and find a comet racing free.",
  },
  {
    text: "You could teach a herd of elephants their A, B, C's, or shrink down super small if bumblebees have knees.",
  },
  {
    text: "You could ask the King of England if he'd pour a spot of tea, or take a train to Hogwarts and meet Hermione.",
  },
  {
    text: "You could walk a winter wonderland in search of a Yeti, then throw him a surprise party that's filled with confetti.",
  },
  {
    text: "So drift away to dreamland and sleep so happily. Whatever you want to be tonight — is yours to make it be. ♫",
  },
];

export default function DreamIdeasReaderPage() {
  return (
    <AmberReader
      title="Dream Ideas"
      emoji="🌙"
      coverImg="/images/books/dream-ideas.png"
      pages={PAGES}
      accentColor="#7EC8E3"
      buttonColor="#3A6EA5"
      bgColor="#030418"
      isSingalong={true}
      startNote="🎵 This is a singalong! Try singing along to the tune of a gentle lullaby."
    />
  );
}
