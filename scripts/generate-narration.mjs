#!/usr/bin/env node
// Universal narration generator for all Family Fables read-aloud books
// Usage: node scripts/generate-narration.mjs [slug] [base-url]
// Example: node scripts/generate-narration.mjs brian-the-ghost
// Example: node scripts/generate-narration.mjs brian-the-ghost http://localhost:3000
//
// Reads narration from the source-of-truth in each page.tsx file.
// Calls /api/tts-[slug] on the live Vercel endpoint (or local if provided).
// Outputs to: public/audio/reader/[slug]/page-NNN.mp3

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const SLUG = process.argv[2];
const BASE_URL = process.argv[3] || 'https://familyfables.vercel.app';
const FORCE = process.argv.includes('--force');

if (!SLUG) {
  console.error('Usage: node scripts/generate-narration.mjs <slug> [base-url] [--force]');
  console.error('');
  console.error('Available slugs:');
  console.error('  brian-the-ghost');
  console.error('  dream-ideas');
  console.error('  finding-hampton');
  console.error('  frog-a-dog');
  console.error('  gilroys-gobble');
  console.error('  ollie-come-home');
  console.error('  one-tom-turkey');
  console.error('  the-shut-in-button');
  console.error('  what-a-doodle-do');
  process.exit(1);
}

// ─── Narration data per book ─────────────────────────────────────────────────

const BOOKS = {
  'brian-the-ghost': {
    voice: 'fable',
    pages: [
      { num: '005', text: "Brian was a friendly ghost. Ghostly white. Floppy arms. Forever smiling. He lived in the town of St. Germaine, where every Halloween, the monsters came out to play." },
      { num: '006', text: "Cleo the mummy was wound up tight and ready to spook. Roman the werewolf had been practicing his howl for weeks." },
      { num: '007', text: "But Brian? Brian loved waving. To everyone. All the time. He waved to the mailman. He waved to the mailman's dog. He waved to the mailman's dog's reflection." },
      { num: '008', text: "On Halloween night, while Cleo moaned and Roman howled, Brian floated down Main Street — waving." },
      { num: '009', text: '"WOOOOO," said Cleo. "AWOOOO," said Roman. "Hi there!" said Brian.' },
      { num: '010', text: "The children looked at Brian. Brian waved. The children waved back. No one screamed. This happened fourteen times." },
      { num: '011', text: '"Brian," said Cleo, "you are the WORST monster." Brian considered this. "I am a very good waver," he said.' },
      { num: '012', text: '"Monsters don\'t wave," said Roman. "Monsters haunt." Brian nodded thoughtfully. Then he waved at a passing butterfly.' },
      { num: '013', text: "Brian decided to try haunting. He floated up behind old Mrs. Thistleton and said — very quietly — boo." },
      { num: '014', text: '"Oh hello, dear," said Mrs. Thistleton. "Would you like a cookie?" Brian would very much like a cookie.' },
      { num: '015', text: "By nine o\'clock, Brian had three cookies, two high-fives, and an invitation to a birthday party in March." },
      { num: '016', text: '"I don\'t understand," said Cleo, watching a child give Brian a hug. "We are the scariest monsters in town."' },
      { num: '017', text: '"Maybe," said Roman slowly, "the scariest thing... is how happy he is?" They thought about this for a long time.' },
      { num: '018', text: "That night, Cleo tried waving at one child. The child waved back. Cleo felt a strange and unexpected feeling in her wrappings. It was warmth." },
      { num: '019', text: "Roman waved at a family. The whole family waved back. He sat down on the curb and stared at his paw for a while." },
      { num: '020', text: "Brian didn't set out to change Halloween. He just really, really liked waving." },
      { num: '022', text: "From that year on, the monsters of St. Germaine were known for two things: very good scares, and even better waves." },
      { num: '024', text: "And if you ever find yourself trick-or-treating in a town that feels just a little too friendly — check for a small white ghost near the lamppost. He will be waving. Wave back." },
    ],
  },

  'dream-ideas': {
    voice: 'shimmer',
    pages: [
      { num: '004', text: "All these dream ideas stirring in your head will make you go to sleep inside your super comfy bed, with your pillow." },
      { num: '005', text: "You could dream of all the things you wish to be and want and know. But in case you need ideas, here's a list to help you go." },
      { num: '006', text: "You could dream of a treehouse built with branches and green leaves, and many tiny flowers that have many tiny bees." },
      { num: '007', text: "You could fly up in the sky or dive down deep into the sea, and swim with all the fishies, narwhals, even manatees." },
      { num: '008', text: "You could be a country music star from Nashville, Tennessee, and sing to a huge sold-out crowd at the Grand Ol' Opry." },
      { num: '009', text: "You could shop around on Main Street in the Land of Free Candy, or race down Ice Cream Mountain on a chocolate strawberry." },
      { num: '010', text: "You could travel back in time and paint with Leo DaVinci, or ride a pterodactyl next to Cera and Petrie." },
      { num: '011', text: "You could live in a great castle that has one great golden key, and be the princess who can't sleep because of one small pea." },
      { num: '012', text: "You could bike around on Mars on one wheel, or two, or three, or drive a giant big rig with as many as eighteen." },
      { num: '013', text: "You could be a famous actor starring in a comedy, and walk down the red carpet as an Oscar nominee." },
      { num: '014', text: "You could teach a herd of elephants to sing their ABCs, or shrink down super-duper small to see if bees have knees." },
      { num: '015', text: "You could ask the King of England if he'd pour a spot of tea, or take a train to Hogwarts and meet Hermione." },
      { num: '016', text: "You could walk a winter wonderland in search of a Yeti, then throw him a surprise party that's filled with confetti." },
      { num: '017', text: "But whatever you want to be tonight is yours to make it be. So drift away to dreamland and sleep so happily." },
    ],
  },

  'finding-hampton': {
    voice: 'nova',
    pages: [
      { num: '004', text: "It was Rosie's birthday, and Hampton was in search of a gift for her. A last minute gift. He was very stressed." },
      { num: '005', text: "What could Rosie want?! Some worms? A fan? A bubble bath?" },
      { num: '006', text: "Hampton took a seat on a nearby rock so he could really focus. He needed one hundred percent of his brain power dedicated to birthday present thinking." },
      { num: '007', text: "So, he thought. And, he thought. And, he thought. Until he realized that the rock was moving!" },
      { num: '008', text: "Hampton, you're a genius! That's it! A walking rock! Rhinos love rocks. But a WALKING rock?! It's perfect." },
      { num: '009', text: "Hampton reached to pick it up, but the rock took off! And again. And again." },
      { num: '010', text: "Hampton spent hours tracking this elusive rock. In fact, he had walked so far and so long that he couldn't even hear his friends searching for him." },
      { num: '011', text: "Using Hampton's special call, his friends yelled out at the top of their lungs: OINK! OINK! Piggy! Piggy! Up trees. In the water. In the sky. In the grass. In bananas. Under Rosie. In anthills." },
      { num: '013', text: "Nothing." },
      { num: '014', text: "Just then, he got a pig-of-a-genius idea! Hampton was too far and too focused on tracking that rock." },
      { num: '016', text: "BOUNCE!" },
      { num: '017', text: "Who said that? Me. Get off me. Rock? Is that you?! A walking AND talking rock? Super rare… I'm just a turtle. A turtle running away from a hungry piggy." },
      { num: '018', text: "There's no such thing as a walking rock! Or a talking rock! I've been tracking you all morning so I could give you as a gift to my friend. She's a rhino. Today's her birthday. But I thought you were a rock." },
      { num: '019', text: "Your friend's birthday, huh? Which, by the way — still a turtle. Why not spend it WITH your friend instead? And maybe receive a gift? Not a rock gift, please." },
      { num: '020', text: "Oh no! You're right! I need to get back to them!" },
      { num: '021', text: "Well, pig, you're in luck. Turtles are actual expert trackers. Follow my directions exactly and you'll reach your friends in time." },
      { num: '022', text: "There. They're right there. Through the leaves. We didn't travel very far." },
      { num: '023', text: "Overjoyed, Hampton thanked the turtle and leapt through the leaves." },
      { num: '024', text: "I'm sorry I don't have a gift, Rosie. Don't be silly, Hampton. Having my friends with me on my birthday is the best gift I could have wished for." },
      { num: '025', text: "Hampton then told his friends the whole story about the magical rock that walked and talked and had legs and a head. Everyone totally believed him." },
      { num: '026', text: "It turned out to be Rosie's best birthday yet! With that, they spent the rest of the day together celebrating: eating worms, splashing around, and staying cool." },
      { num: '027', text: "Not a rock." },
    ],
  },

  'frog-a-dog': {
    voice: 'fable',
    pages: [
      { num: '004', text: "All dusk and all dawn, Bailey hung by the pond, with hopes to become the frog that she longed." },
      { num: '006', text: "But when she'd appear, they'd snicker and sneer. \"A dog is no frog! You don't belong here.\"" },
      { num: '008', text: "\"That nose. And those ears. And your eyes, how they peer. What's that over there? A tail? Oh, dear!\"" },
      { num: '010', text: "Still Bailey had pride for who was inside, but could not fit in, no matter how much she tried." },
      { num: '012', text: "So, to trick the whole crew, Bailey tried something new. On Halloween day, she slipped on a costume." },
      { num: '014', text: "Bailey returned to the spot. The frogs gave it no thought. She blended in with them all, and was taught quite a lot." },
      { num: '016', text: "How to swim, how to eat, how to even belly flop. She learned how to hop, how to croak, how to plop." },
      { num: '018', text: "By the end of the day it was quite easy to say that this army of frogs had a new protégé." },
      { num: '020', text: "Then to their surprise, she shed her disguise. They saw her paws, her fur, and her puppy dog eyes." },
      { num: '022', text: "\"You tricked us, you dog. Get out of our bog! Like we've said all along — a dog is no frog.\"" },
      { num: '024', text: "\"I may have big ears, but I've known it for years. In my heart I'm like you — a frog tried and true.\"" },
      { num: '026', text: "She swam, and she ate, and even belly flopped. With that, Bailey hopped. She croaked, and she plopped." },
      { num: '028', text: "The frogs looked amazed. Even awarded her praise. For despite how she looked, she was them in all ways." },
      { num: '030', text: "So the frogs learned their lesson — that it's not what you're dressed in. It's who's inside that defines you. Of that, there's no question." },
      { num: '032', text: "Now all dusk and all dawn, Bailey hangs by the pond, with a smile on her face — for she truly belongs." },
    ],
  },

  'gilroys-gobble': {
    voice: 'onyx',
    pages: [
      { num: '004', text: "Overjoyed to see the red fall leaves fall, Gilroy belted out quite an odd turkey call. \"Wee Loo Lee Loo!\"" },
      { num: '006', text: "Olivia the owl was watching from above, then asked a question with her owly love: \"What was that, my dear? That was no 'Hoo.'\"" },
      { num: '007', text: "\"That's my turkey call. It's what turkeys do.\"" },
      { num: '008', text: "\"Here, let me help. Do what I do. Let me hear your turkey… Hooooo!\"" },
      { num: '009', text: "Trying to fit in, and without further ado, Gilroy let out a \"Wee Loo Lee Loo!\"" },
      { num: '010', text: "Overheard by Corey, the cow on the farm, Gilroy wobbled to him, charmed by his charm." },
      { num: '011', text: "\"You've got charisma, kid. I'll give you that much. What you've really got to do is add a cow's touch.\"" },
      { num: '012', text: "\"Now, watch me closely. Balance on four legs, and moo your turkey… Mooooo!\" Taking his advice, Gilroy dropped to his wings and let out a \"Wee Loo Lee Loo!\"" },
      { num: '013', text: "\"Wee Loo Lee Loo!\"" },
      { num: '014', text: "\"That sounds so close,\" snapped the rooster on the roof, \"to what a bird should sound like. That thing on your face — we call it a beak. Use it like mine and speak bird speak.\"" },
      { num: '016', text: "\"First, puff out your chest and feather your do. Then let us hear your turkey… Cock-a-doodle-Doo!\" Taking his advice, Gilroy mirrored his moves and let out a \"Wee Loo Lee Loo!\"" },
      { num: '017', text: "\"Wee Loo Lee Loo!\"" },
      { num: '018', text: "\"Hey, Gilroy the turkey! You look a little tense. Don't mind the others. They haven't a clue. The remedy you seek is in the form of a 'Coo.'\"" },
      { num: '020', text: "\"Jump up here with me and follow my moves. Then let us hear your turkey… Coo Coo Ka Choo.\" Taking his advice, Gilroy popped on the post and let out a \"Wee Loo Lee Loo.\"" },
      { num: '021', text: "\"Wee Loo Lee Loo.\"" },
      { num: '022', text: "At the pond nearby swam a spotted looney loon." },
      { num: '023', text: "\"Come here, young turkey. You've got to sing my tune.\" Right then she yelled out, \"Loo Loo Loo! Loo Dee Loo Dee Loo!\"" },
      { num: '024', text: "\"All your calls are different! I don't know which one to choose. They all sound great, but they all sound like you!\"" },
      { num: '027', text: "Gilroy wandered off thinking, \"I'm doing this all wrong. How am I going to find the right turkey song?\"" },
      { num: '028', text: "Then off in the distance, he heard a \"Tut Tut Too Doo.\" It came from a turkey, but wasn't something he knew." },
      { num: '029', text: "\"Tut Tut Too Doo.\"" },
      { num: '030', text: "\"What is that sound? Did that come from you? Please teach it to me so I can sound like I'm supposed to.\"" },
      { num: '032', text: "\"You're not a loon, cow, rooster, or owl. You are who you are, Gilroy the fowl. So no matter your call, make sure it's your own — from the time you're a baby until your full grown.\"" },
      { num: '034', text: "The advice sank in, as he looked all around. Gilroy saw each animal sounding their sound. They all looked happy, for they were who they were, no matter what they wore: feathers or fur." },
      { num: '035', text: "Gilroy smiled a big smile. He finally knew. He was himself — a turkey — through and through. With that he joined the rest of the crew, and let out his own Gilroy \"Wee Loo Lee Loo!\"" },
    ],
  },

  'ollie-come-home': {
    voice: 'nova',
    pages: [
      { num: '004', text: "Ollie is a small cat, long haired and with stripes. He smiles and he snuggles. And is always well liked." },
      { num: '005', text: "The bed or the sofa are where he resides. He naps on the window sill while looking outside." },
      { num: '006', text: "One day Ollie found, as curious cats do, a gap in the window he just could squeeze through." },
      { num: '007', text: "So he crawled to the ledge, and beaming with pride, he smiled and he purred — his first time outside." },
      { num: '009', text: "He took it all in, using each one of his senses, through the flowers and trees and over some fences." },
      { num: '010', text: "His family came home. No purring. No kissing. And soon they discovered that their Ollie was missing." },
      { num: '011', text: "\"Ollie where are you? Ollie come home! It's not safe out there all on your own.\"" },
      { num: '012', text: "Soon it was nightfall, with Ollie less bold. Ollie was lost now, and hungry and cold." },
      { num: '013', text: "I sure miss my mom and her snuggling and petting. I sure miss my dad. I hope they're not fretting." },
      { num: '014', text: "Ollie's family grew nervous and started to worry. With flashlights and flyers, they were off in a hurry." },
      { num: '016', text: "\"Ollie where are you? Ollie come home! It's not safe out there all on your own.\"" },
      { num: '017', text: "But Ollie didn't answer his family's calls. He kept all alone, tucked in a ball." },
      { num: '018', text: "When the sun finally rose, he waved bye to the gnome. Ollie was now determined to find his way home." },
      { num: '019', text: "He ran and he climbed through yards and thick woods, until he started to recognize his own neighborhood." },
      { num: '020', text: "And that's when he heard, after miles he'd roamed: \"Ollie where are you? Ollie come home!\"" },
      { num: '021', text: "He ran towards the voices — his family's for sure. And found himself home, at his own front door." },
      { num: '022', text: "\"There you are Ollie! You're back in one piece. You had us so worried. Now we're so relieved.\"" },
      { num: '023', text: "It was fun but then scary, outside on my own. I missed you guys too. And I'm glad to be home." },
    ],
  },

  'one-tom-turkey': {
    voice: 'fable',
    pages: [
      { num: '004', text: "One Tom Turkey goes gobble gobble gobble, gobble gobble gobble, gobble gobble gobble. One Tom Turkey goes gobble gobble gobble, on Thanksgiving day!" },
      { num: '005', text: "Two pumpkin pies go mix, bake, bake! Mix, bake, bake! Mix, bake, bake! Two pumpkin pies go mix, bake, bake, on Thanksgiving day." },
      { num: '006', text: "Three cranberry tasters go — ooo, that's sour! Ooo, that's sour! Ooo, that's sour! Three cranberry tasters go ooo, that's sour, on Thanksgiving day." },
      { num: '007', text: "Four boiled potatoes go mash, mash, stir! Mash, mash, stir! Mash, mash, stir! Four boiled potatoes go mash, mash, stir, on Thanksgiving day." },
      { num: '008', text: "Five flying footballs go spinning in the air, spinning in the air, spinning in the air! Five flying footballs go spinning in the air, on Thanksgiving day." },
      { num: '009', text: "Six things we are thankful for, thankful for, thankful for. Six things we are thankful for, on Thanksgiving day." },
      { num: '010', text: "Seven shirt buttons go stretch, stretch, POP! Stretch, stretch, POP! Stretch, stretch, POP! Seven shirt buttons go stretch, stretch, POP! On Thanksgiving day." },
      { num: '011', text: "Eight full tummies go mmm, that was good! Mmm, that was good! Mmm, that was good! Eight full tummies go mmm, that was good, on Thanksgiving day." },
      { num: '012', text: "Nine dirty dishes go clink, clank, clink! Clink, clank, clink! Clink, clank, clink! Nine dirty dishes go clink, clank, clink, on Thanksgiving day." },
      { num: '013', text: "Ten tired folks go yawn, yawn, yawn! Yawn, yawn, yawn! Yawn, yawn, yawn! Ten tired folks go yawn, yawn, yawn, on Thanksgiving day." },
      { num: '014', text: "One Tom Turkey goes gobble gobble gobble, gobble gobble gobble, gobble gobble gobble. One Tom Turkey goes gobble gobble… PARDON!!! On Thanksgiving day!" },
    ],
  },

  'the-shut-in-button': {
    voice: 'fable',
    pages: [
      { num: '005', text: "This is a button. A very particular button — round, shiny, and perfectly content to stay right where it is." },
      { num: '007', text: "Most buttons pop off by accident. This button popped off on purpose. There is a difference. And this button knows it." },
      { num: '009', text: "You see, the little girl who owned the coat liked adventures. Muddy ones. Rainy ones. The kind where your buttons get absolutely no say." },
      { num: '011', text: "The other buttons were fine with all of this. \"Going out? Wonderful!\" they said. They were, frankly, a bit much." },
      { num: '013', text: "But this button had a system. A lifestyle, really. Button up. Button down. Repeat. No surprises. No mud." },
      { num: '015', text: "One morning the little girl got very excited. \"We're going to the park!\" she announced. The other buttons cheered." },
      { num: '017', text: "The Shut-In Button did not cheer. The Shut-In Button had concerns about the park. Specifically: everything about the park." },
      { num: '019', text: "And so, very deliberately, the Shut-In Button did the thing it did best. It popped off. Plink. And rolled under the radiator." },
      { num: '021', text: "\"Where did my button go?\" asked the little girl. She looked and looked, but couldn't find it. Off they went without it." },
      { num: '023', text: "The Shut-In Button sat under the radiator. It was very quiet. And very safe. And very warm. And very... alone." },
      { num: '025', text: "Through the window, it could just barely see the little girl laughing in the park. The other buttons were catching leaves." },
      { num: '027', text: "Hmm. Catching leaves did look sort of fun. Not that the button would ever admit this." },
      { num: '029', text: "When the little girl came home, she looked tired and happy and a little bit muddy. The other buttons did look worse for wear." },
      { num: '031', text: "\"I really need ALL my buttons for the recital tomorrow,\" the little girl said quietly. \"I hope I can find the missing one.\"" },
      { num: '033', text: "The Shut-In Button thought about this for a long time. A recital. That was important. That was different from mud." },
      { num: '035', text: "Perhaps… just for the recital… it could make an exception." },
      { num: '037', text: "The next morning, the little girl found the button behind the radiator. \"There you are!\" She hugged the coat tight." },
      { num: '039', text: "At the recital, the button was buttoned up perfectly. The little girl stood tall. The audience clapped. The button glowed." },
      { num: '041', text: "It was not muddy. It was not rainy. There were no fallen leaves. It was, the button had to admit, actually quite nice." },
      { num: '043', text: "The other buttons nodded wisely. They had known all along. But they were kind enough not to say so." },
      { num: '045', text: "The Shut-In Button still prefers to stay in. But now, every once in a while — for something truly important — it buttons up bravely." },
      { num: '047', text: "Because sometimes, the smallest act of courage is just deciding to show up." },
    ],
  },

  'what-a-doodle-do': {
    voice: 'fable',
    pages: [
      { num: '004', text: "beanstalk-a-doodle-do!" },
      { num: '005', text: "sleepwalk-a-doodle-do!" },
      { num: '006', text: "chalk-a-doodle-do!" },
      { num: '008', text: "bedrock-a-doodle-do!" },
      { num: '011', text: "lock-a-doodle-do!" },
      { num: '012', text: "talk-a-doodle-do!" },
      { num: '013', text: "bach-a-doodle-do!" },
      { num: '014', text: "wok-a-doodle-do!" },
      { num: '016', text: "sherlock-a-doodle-do!" },
      { num: '017', text: "block-a-doodle-do!" },
      { num: '022', text: "boardwalk-a-doodle-do!" },
      { num: '023', text: "shamrock-a-doodle-do!" },
      { num: '024', text: "walk-a-doodle-do!" },
      { num: '025', text: "croc-a-doodle-do!" },
      { num: '026', text: "jock-a-doodle-do!" },
      { num: '027', text: "doc-a-doodle-do!" },
      { num: '028', text: "clock-a-doodle-do!" },
      { num: '030', text: "sock-a-doodle-do!" },
      { num: '032', text: "catwalk-a-doodle-do!" },
      { num: '033', text: "mohawk-a-doodle-do!" },
      { num: '034', text: "COCK-A-DOODLE-DO!!!" },
    ],
  },
};

// ─── Generator ────────────────────────────────────────────────────────────────

const book = BOOKS[SLUG];
if (!book) {
  console.error(`Unknown slug: "${SLUG}"`);
  console.error('Available:', Object.keys(BOOKS).join(', '));
  process.exit(1);
}

const OUT_DIR = join(process.cwd(), 'public', 'audio', 'reader', SLUG);
mkdirSync(OUT_DIR, { recursive: true });

const API_SLUG = SLUG;
const API_URL = `${BASE_URL}/api/tts-${API_SLUG}`;

console.log(`📖 Generating narration for: ${SLUG}`);
console.log(`🎙️  Voice: ${book.voice}`);
console.log(`📡 Endpoint: ${API_URL}`);
console.log(`📁 Output: ${OUT_DIR}`);
console.log('');

async function generatePage({ num, text }, retries = 3) {
  const filename = `page-${num}.mp3`;
  const outPath = join(OUT_DIR, filename);

  if (!FORCE && existsSync(outPath)) {
    console.log(`[${num}] ⏭️  ${filename} already exists — skipping (use --force to regenerate)`);
    return;
  }

  console.log(`[${num}] Generating ${filename}...`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const err = await res.text();
        if (attempt < retries) {
          console.log(`  ⚠️  Attempt ${attempt} failed (${res.status}), retrying in 5s...`);
          await new Promise(r => setTimeout(r, 5000));
          continue;
        }
        throw new Error(`API error ${res.status}: ${err}`);
      }

      const buf = await res.arrayBuffer();
      writeFileSync(outPath, Buffer.from(buf));
      console.log(`  ✅ ${filename} (${Math.round(buf.byteLength / 1024)}KB)`);
      return;
    } catch (e) {
      if (attempt < retries) {
        console.log(`  ⚠️  Attempt ${attempt} error: ${e.message}, retrying in 5s...`);
        await new Promise(r => setTimeout(r, 5000));
      } else {
        throw e;
      }
    }
  }
}

for (const page of book.pages) {
  await generatePage(page);
  await new Promise(r => setTimeout(r, 600)); // rate-limit buffer
}

console.log(`\n✨ Done! Generated ${book.pages.length} pages for ${SLUG}.`);
console.log(`   Commit public/audio/reader/${SLUG}/ to the repo.`);
