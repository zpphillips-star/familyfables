import type { Metadata } from "next";
import AmberReader, { ReaderPage } from "@/components/AmberReader";

export const metadata: Metadata = {
  title: "Read: One Tom Turkey | Family Fables",
  description: "Sing along with One Tom Turkey — a Thanksgiving singalong sung to the tune of Wheels on the Bus, by Family Fables!",
};

const PAGES: ReaderPage[] = [
  {
    text: "One Tom Turkey goes\ngobble gobble gobble,\ngobble gobble gobble,\ngobble gobble gobble.\nOne Tom Turkey goes gobble gobble gobble\non Thanksgiving day! 🦃",
  },
  {
    text: "Two pumpkin pies go\nmix bake bake,\nmix bake bake,\nmix bake bake.\nTwo pumpkin pies go mix bake bake\non Thanksgiving day. 🥧",
  },
  {
    text: "Three cranberry tasters go\nooo, that's sour,\nooo, that's sour,\nooo, that's sour.\nThree cranberry tasters go ooo, that's sour\non Thanksgiving day. 🍒",
  },
  {
    text: "Four boiled potatoes go\nmash mash stir,\nmash mash stir,\nmash mash stir.\nFour boiled potatoes go mash mash stir\non Thanksgiving day. 🥔",
  },
  {
    text: "Five flying footballs go\nspinning in the air,\nspinning in the air,\nspinning in the air.\nFive flying footballs go spinning in the air\non Thanksgiving day. 🏈",
  },
  {
    text: "Six things we are\nthankful for,\nthankful for,\nthankful for.\nSix things we are thankful for\non Thanksgiving day. 🙏",
  },
  {
    text: "Seven shirt buttons go\nstretch stretch pop!\nstretch stretch pop!\nstretch stretch pop!\nSeven shirt buttons go stretch stretch pop!\non Thanksgiving day. 🪡",
  },
  {
    text: "Eight full tummies go\nmmm, that was good,\nmmm, that was good,\nmmm, that was good.\nEight full tummies go mmm, that was good\non Thanksgiving day. 😋",
  },
  {
    text: "Nine dirty dishes go\nclink clank clink,\nclink clank clink,\nclink clank clink.\nNine dirty dishes go clink clank clink\non Thanksgiving day. 🍽️",
  },
  {
    text: "Ten tired folks go\nyawn yawn yawn,\nyawn yawn yawn,\nyawn yawn yawn.\nTen tired folks go yawn yawn yawn\non Thanksgiving day. 😴",
  },
  {
    text: "One Tom Turkey goes\ngobble gobble gobble,\ngobble gobble gobble,\ngobble gobble gobble.\nOne Tom Turkey goes gobble gobble…\nPARDON!!!\non Thanksgiving day! 🦃",
  },
];

export default function OneTomTurkeyReaderPage() {
  return (
    <AmberReader
      title="One Tom Turkey"
      emoji="🦃"
      coverImg="/images/books/one-tom-turkey.png"
      pages={PAGES}
      accentColor="#F4A839"
      buttonColor="#A05015"
      bgColor="#130800"
      isSingalong={true}
      startNote="🎵 Sung to the tune of Wheels on the Bus! Try singing along!"
    />
  );
}
