import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: One Tom Turkey | Family Fables",
  description:
    "Sing along with One Tom Turkey — the Thanksgiving counting song by Family Fables!",
};

// One Tom Turkey — 17-page hardcover interior
// Front matter: pages 1–3 (null) | Story: pages 4–14 | Back matter: pages 15–17 (null)
// Voice: fable (fun, festive British storyteller — to the tune of Wheels on the Bus)

const narration: (string | null)[] = [
  null, // 001 — half-title / blank
  null, // 002 — title / copyright
  null, // 003 — dedication
  "One Tom Turkey goes gobble gobble gobble, gobble gobble gobble, gobble gobble gobble. One Tom Turkey goes gobble gobble gobble, on Thanksgiving day!", // 004
  "Two pumpkin pies go mix, bake, bake! Mix, bake, bake! Mix, bake, bake! Two pumpkin pies go mix, bake, bake, on Thanksgiving day.", // 005
  "Three cranberry tasters go — ooo, that's sour! Ooo, that's sour! Ooo, that's sour! Three cranberry tasters go ooo, that's sour, on Thanksgiving day.", // 006
  "Four boiled potatoes go mash, mash, stir! Mash, mash, stir! Mash, mash, stir! Four boiled potatoes go mash, mash, stir, on Thanksgiving day.", // 007
  "Five flying footballs go spinning in the air, spinning in the air, spinning in the air! Five flying footballs go spinning in the air, on Thanksgiving day.", // 008
  "Six things we are thankful for, thankful for, thankful for. Six things we are thankful for, on Thanksgiving day.", // 009
  "Seven shirt buttons go stretch, stretch, POP! Stretch, stretch, POP! Stretch, stretch, POP! Seven shirt buttons go stretch, stretch, POP! On Thanksgiving day.", // 010
  "Eight full tummies go mmm, that was good! Mmm, that was good! Mmm, that was good! Eight full tummies go mmm, that was good, on Thanksgiving day.", // 011
  "Nine dirty dishes go clink, clank, clink! Clink, clank, clink! Clink, clank, clink! Nine dirty dishes go clink, clank, clink, on Thanksgiving day.", // 012
  "Ten tired folks go yawn, yawn, yawn! Yawn, yawn, yawn! Yawn, yawn, yawn! Ten tired folks go yawn, yawn, yawn, on Thanksgiving day.", // 013
  "One Tom Turkey goes gobble gobble gobble, gobble gobble gobble, gobble gobble gobble. One Tom Turkey goes gobble gobble… PARDON!!! On Thanksgiving day!", // 014
  null, // 015 — back matter
  null, // 016 — back matter
  null, // 017 — back matter
];

export default function OneTomTurkeyReaderPage() {
  return (
    <BookReader
      bookSlug="one-tom-turkey"
      title="One Tom Turkey"
      totalPages={17}
      storyPages={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
      narration={narration}
    />
  );
}
