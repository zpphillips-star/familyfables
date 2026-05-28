#!/usr/bin/env python3
"""
Regenerate One Tom Turkey audio with expressive text for nova TTS.
Enhanced text uses caps, exclamation marks, ellipses for energy.
"""
import os
import sys
from pathlib import Path
from openai import OpenAI

API_KEY = os.environ.get("OPENAI_API_KEY", "")
if not API_KEY:
    print("ERROR: OPENAI_API_KEY not set")
    sys.exit(1)

client = OpenAI(api_key=API_KEY)

OUTPUT_DIR = Path(r"C:\Users\zaphilli\projects\familyfables\public\audio\one-tom-turkey")

# Enhanced expressive text for each page
PAGES = [
    {
        "file": "page-01.mp3",
        "text": "ONE Tom Turkey goes GOBBLE, gobble, gobble! Gobble, gobble, gobble! Gobble, gobble, gobble! ONE Tom Turkey goes gobble, gobble, gobble... on Thanksgiving DAY!"
    },
    {
        "file": "page-02.mp3",
        "text": "TWO pumpkin pies go mix, bake, BAKE! Mix, bake, BAKE! Mix, bake, BAKE! TWO pumpkin pies go mix, bake, bake... on Thanksgiving DAY!"
    },
    {
        "file": "page-03.mp3",
        "text": "THREE cranberry tasters go — oooo, that's SOUR! Oooo, that's SOUR! Oooo, that's SOUR! THREE cranberry tasters go oooo, that's sour... on Thanksgiving DAY!"
    },
    {
        "file": "page-04.mp3",
        "text": "FOUR boiled potatoes go MASH, mash, stir! MASH, mash, stir! MASH, mash, stir! FOUR boiled potatoes go mash, mash, stir... on Thanksgiving DAY!"
    },
    {
        "file": "page-05.mp3",
        "text": "FIVE flying footballs go SPINNING in the air! Spinning in the air! SPINNING in the air! FIVE flying footballs go spinning in the air... on Thanksgiving DAY!"
    },
    {
        "file": "page-06.mp3",
        "text": "SIX things we are THANKFUL for! Thankful for! THANKFUL for! SIX things we are thankful for... on Thanksgiving DAY!"
    },
    {
        "file": "page-07.mp3",
        "text": "SEVEN shirt buttons go stretch, stretch, POP! Stretch, stretch, POP! Stretch, stretch, POP! SEVEN shirt buttons go stretch, stretch, POP... on Thanksgiving DAY!"
    },
    {
        "file": "page-08.mp3",
        "text": "EIGHT full tummies go mmmm, that was GOOD! Mmmm, that was GOOD! Mmmm, that was GOOD! EIGHT full tummies go mmm, that was good... on Thanksgiving DAY!"
    },
    {
        "file": "page-09.mp3",
        "text": "NINE dirty dishes go CLINK, clank, clink! Clink, CLANK, clink! Clink, clank, CLINK! NINE dirty dishes go clink, clank, clink... on Thanksgiving DAY!"
    },
    {
        "file": "page-10.mp3",
        "text": "TEN tired folks go YAWN, yawn, yawn! Yawn, YAWN, yawn! Yawn, yawn, YAWN! TEN tired folks go yawn, yawn, yawn... on Thanksgiving DAY!"
    },
    {
        "file": "page-11.mp3",
        "text": "ONE Tom Turkey goes gobble, gobble, gobble! Gobble, gobble, gobble! Gobble, gobble, gobble! One Tom Turkey goes gobble gobble... PARDON!!! On Thanksgiving DAY!!!"
    },
]

def generate(page):
    out_path = OUTPUT_DIR / page["file"]
    print(f"  Generating {page['file']}...")
    print(f"  Text: {page['text'][:80]}...")
    
    response = client.audio.speech.create(
        model="tts-1-hd",
        voice="nova",
        input=page["text"],
        speed=1.05,
        response_format="mp3",
    )
    
    response.stream_to_file(out_path)
    size = out_path.stat().st_size
    print(f"  ✓ Saved {page['file']} ({size:,} bytes)")

if __name__ == "__main__":
    print(f"Generating {len(PAGES)} audio files...")
    print(f"Output dir: {OUTPUT_DIR}\n")
    
    for page in PAGES:
        generate(page)
    
    print(f"\n✅ All {len(PAGES)} files generated successfully!")
