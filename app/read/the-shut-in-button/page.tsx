import type { Metadata } from "next";
import BookReader from "@/components/BookReader";

export const metadata: Metadata = {
  title: "Read: The Shut-In Button | Family Fables",
  description:
    "A button with exactly one job — and a serious aversion to doing it. Read The Shut-In Button, a Family Fables story about tiny bravery!",
};

// The Shut-In Button — 49-page paperback interior
// Front matter: pages 1–4 (null) | Story: pages 5–48 (22 text beats × 2 pages) | Back matter: page 49 (null)
// Voice: fable (dry, slightly dramatic — perfect for a very particular button)

const narration: (string | null)[] = [
  null, // 001 — blank
  null, // 002 — title page
  null, // 003 — copyright / dedication
  null, // 004 — dedication spread
  "This is a button. A very particular button — round, shiny, and perfectly content to stay right where it is.", // 005
  null, // 006 — illustration
  "Most buttons pop off by accident. This button popped off on purpose. There is a difference. And this button knows it.", // 007
  null, // 008 — illustration
  "You see, the little girl who owned the coat liked adventures. Muddy ones. Rainy ones. The kind where your buttons get absolutely no say.", // 009
  null, // 010 — illustration
  "The other buttons were fine with all of this. \"Going out? Wonderful!\" they said. They were, frankly, a bit much.", // 011
  null, // 012 — illustration
  "But this button had a system. A lifestyle, really. Button up. Button down. Repeat. No surprises. No mud.", // 013
  null, // 014 — illustration
  "One morning the little girl got very excited. \"We're going to the park!\" she announced. The other buttons cheered.", // 015
  null, // 016 — illustration
  "The Shut-In Button did not cheer. The Shut-In Button had concerns about the park. Specifically: everything about the park.", // 017
  null, // 018 — illustration
  "And so, very deliberately, the Shut-In Button did the thing it did best. It popped off. Plink. And rolled under the radiator.", // 019
  null, // 020 — illustration
  "\"Where did my button go?\" asked the little girl. She looked and looked, but couldn't find it. Off they went without it.", // 021
  null, // 022 — illustration
  "The Shut-In Button sat under the radiator. It was very quiet. And very safe. And very warm. And very... alone.", // 023
  null, // 024 — illustration
  "Through the window, it could just barely see the little girl laughing in the park. The other buttons were catching leaves.", // 025
  null, // 026 — illustration
  "Hmm. Catching leaves did look sort of fun. Not that the button would ever admit this.", // 027
  null, // 028 — illustration
  "When the little girl came home, she looked tired and happy and a little bit muddy. The other buttons did look worse for wear.", // 029
  null, // 030 — illustration
  "\"I really need ALL my buttons for the recital tomorrow,\" the little girl said quietly. \"I hope I can find the missing one.\"", // 031
  null, // 032 — illustration
  "The Shut-In Button thought about this for a long time. A recital. That was important. That was different from mud.", // 033
  null, // 034 — illustration
  "Perhaps… just for the recital… it could make an exception.", // 035
  null, // 036 — illustration
  "The next morning, the little girl found the button behind the radiator. \"There you are!\" She hugged the coat tight.", // 037
  null, // 038 — illustration
  "At the recital, the button was buttoned up perfectly. The little girl stood tall. The audience clapped. The button glowed.", // 039
  null, // 040 — illustration
  "It was not muddy. It was not rainy. There were no fallen leaves. It was, the button had to admit, actually quite nice.", // 041
  null, // 042 — illustration
  "The other buttons nodded wisely. They had known all along. But they were kind enough not to say so.", // 043
  null, // 044 — illustration
  "The Shut-In Button still prefers to stay in. But now, every once in a while — for something truly important — it buttons up bravely.", // 045
  null, // 046 — illustration
  "Because sometimes, the smallest act of courage is just deciding to show up.", // 047
  null, // 048 — illustration
  null, // 049 — back matter
];

export default function TheShutInButtonReaderPage() {
  return (
    <BookReader
      bookSlug="the-shut-in-button"
      title="The Shut-In Button"
      totalPages={49}
      storyPages={[5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47]}
      narration={narration}
    />
  );
}
