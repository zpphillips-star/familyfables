#!/usr/bin/env node
// One-time script: generate Amber the Dragon Keeper narration via Vercel TTS endpoint
// Voice: nova (OpenAI's adventurous, energetic female voice), tts-1-hd model
// Run: node scripts/generate-amber-narration.mjs
// Outputs: public/audio/amber-dragon-keeper/page-01.mp3 ... page-18.mp3

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.argv[2] || 'https://familyfables.vercel.app';
const OUT_DIR = join(process.cwd(), 'public', 'audio', 'amber-dragon-keeper');

mkdirSync(OUT_DIR, { recursive: true });

const PAGES = [
  'Amber was a little girl who lived a normal happy life. She went to school, played with her toys, laughed with her parents, and dreamed her wonderful dreams. But Amber had a secret.',
  'Amber had a magical closet that took her to a far-off place. A place where fairies flew free and mermaids swam the deepest seas. But the most amazing of all the creatures that roamed this land were the dragons that took to the skies.',
  'This land was called Sydar. And in Sydar, Amber was the famous dragon keeper.',
  'What is a dragon keeper? To know that, you must first know the dragons.',
  "The dragons of Sydar weren't nasty or scary or mean. They were the most gentle creatures that roamed the land.",
  'There were tall ones. Short ones. Skinny ones. Fat ones. Old ones. And baby ones.',
  'And Amber was friends with them all.',
  'She taught them to fly and to walk and to swim. She kept them clean from their scaly nose to their scaly toes. And she trained them to control their magical breath of fire and ice!',
  'But her most favorite thing of all the things to do with the dragons was to ride them. Amber and the dragons would spend hours in the skies. Diving, swirling, twirling, and scoobatoobing...',
  '...scoobatoobing was a special move you could only do with the dragons of Sydar.',
  'All the dragons of Sydar were amazing in their own special way, but Amber did have a favorite. She considered this dragon her best friend in all of Sydar. He was a majestic dragon with soft blue scales and a golden mane. His name was Cinnamon.',
  'Cinnamon and Amber went on amazing adventures together. They fought off dangerous witches and warlocks, helped villagers build their cottages, and watched over all the creatures of Sydar.',
  "But it wasn't always work for Amber and Cinnamon — they also found a way to have fun. They flew high up above the clouds. They went camping and roasted as many marshmallows as they could fit in their mouths. They created ice lakes for the villagers to skate on and made many, many friends along the way.",
  'This was everyday life in Sydar. But days are still days, and all days come to an end.',
  'Cinnamon would fly Amber to the Glowing Mountains where Amber would give her friend a biiiigggg hug goodbye, and they would smile knowing they were that much closer to seeing each other again. Then, Amber would enter the magical cave and come out of the closet into her bedroom on the other side.',
  'She would go to sleep and dream her wonderful dreams, excited to tell her parents about her adventures in the morning.',
  'Whether her parents thought her adventures were dreams or not, Amber always knew the truth. Every night when she walked through the magical closet to visit Cinnamon and the other dragons of Sydar, she became...',
  'Amber, the Dragon Keeper!',
];

async function generatePage(idx, text, retries = 3) {
  const filename = `page-${String(idx + 1).padStart(2, '0')}.mp3`;
  const url = `${BASE_URL}/api/tts-amber`;
  console.log(`[${idx + 1}/${PAGES.length}] Generating ${filename}...`);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
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
      const outPath = join(OUT_DIR, filename);
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

console.log(`🐉 Generating Amber narration — nova voice (adventurous female)`);
console.log(`📡 Endpoint: ${BASE_URL}/api/tts-amber`);
console.log('');

for (let i = 0; i < PAGES.length; i++) {
  await generatePage(i, PAGES[i]);
  await new Promise(r => setTimeout(r, 600)); // rate limit buffer
}

console.log('\n✨ All done! Commit public/audio/amber-dragon-keeper/ to the repo.');
