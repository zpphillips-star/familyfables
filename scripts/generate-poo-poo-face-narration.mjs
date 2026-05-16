#!/usr/bin/env node
// One-time script: generate Poo Poo Face narration via Vercel TTS endpoint
// Voice: fable (OpenAI's whimsical British storyteller), tts-1-hd model, speed 1.0
// Run: node scripts/generate-poo-poo-face-narration.mjs
// Outputs: public/audio/reader/poo-poo-face/page-005.mp3 ... page-020.mp3

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE_URL = process.argv[2] || 'https://familyfables.vercel.app';
const OUT_DIR = join(process.cwd(), 'public', 'audio', 'reader', 'poo-poo-face');

mkdirSync(OUT_DIR, { recursive: true });

// Pages 005–020 are the story pages (004 = title/copyright, 021 = back matter)
const STORY_PAGES = [
  { num: '005', text: "I was sitting on the potty, but I just couldn't do it. Then my daddy let me in on a little poo poo secret!" },
  { num: '006', text: "The key to make a poo poo is to make a poo poo face. After that is done, all the rest will fall in place!" },
  { num: '007', text: "Not sure if he was kidding, so I asked him just in case. Does everybody have one? Do they have a poo poo face?" },
  { num: '008', text: "He said with a smile, every one in every place. Go ahead and ask them if they have a poo poo face." },
  { num: '009', text: "So I started at my school, where I love to learn and play, and I asked my favorite teacher if she'd show me hers today!" },
  { num: '010', text: "Our local firefighters are the bravest ones I know, but do they make a poo poo face when it's time to go?" },
  { num: '011', text: "My favorite football players are so big and strong, so if they make a poo poo face then my daddy can't be wrong!" },
  { num: '012', text: "Even at the zoo, oh I see what monkeys do. So you'd better get to running if they make their poo poo face at you!" },
  { num: '013', text: "I even asked an astronaut who works in outer space. When you're up there floating, do you make a poo poo face?" },
  { num: '014', text: "I swam up to a mermaid, the princess of the sea. We saw her make a poo poo face as she made a sea doody!" },
  { num: '015', text: "Even a rainbow unicorn flying so way up high, can make a funny poo poo face up up in the sky!" },
  { num: '016', text: "I asked a world famous chef who cooks the greatest meals. Do you make a poo poo face — is that just how it feels?" },
  { num: '017', text: "Even superheroes saving the day need to take a break sometimes — to make their poo poo face!" },
  { num: '018', text: "So I went back home and sat upon my throne... and I made my poo poo face all on my own!" },
  { num: '019', text: "My face looked so silly, it made my poo poo fall in place." },
  { num: '020', text: "And it was all because I learned that day to make my poo poo face!" },
];

async function generatePage({ num, text }) {
  const filename = `page-${num}.mp3`;
  const url = `${BASE_URL}/api/tts`;
  console.log(`[${num}] Generating ${filename}...`);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const buf = await res.arrayBuffer();
  const outPath = join(OUT_DIR, filename);
  writeFileSync(outPath, Buffer.from(buf));
  console.log(`  ✅ ${filename} (${Math.round(buf.byteLength / 1024)}KB)`);
}

console.log(`💩 Generating Poo Poo Face narration — fable voice (whimsical British storyteller), speed 1.0`);
console.log(`📡 Endpoint: ${BASE_URL}/api/tts`);
console.log('');

for (const page of STORY_PAGES) {
  await generatePage(page);
  await new Promise(r => setTimeout(r, 400)); // rate limit buffer
}

console.log('\n✨ All done! Commit public/audio/reader/poo-poo-face/ to the repo.');
