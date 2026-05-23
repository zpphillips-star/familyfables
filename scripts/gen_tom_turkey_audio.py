"""
Generate One Tom Turkey sung audio for all 11 verses using fal-ai/ace-step.
Saves WAV files to public/audio/tom-turkey/verse-1.wav ... verse-11.wav
"""
import json, urllib.request, urllib.error, time, os, sys

FAL_KEY = 'ad7875c7-51ef-40ab-a760-6363ce38a850:c04c7d353048e834f1bd5fbb32477df5'
MODEL   = 'fal-ai/ace-step'
OUTDIR  = r'C:\Users\zaphilli\projects\familyfables\public\audio\tom-turkey'
os.makedirs(OUTDIR, exist_ok=True)

STYLE = (
    "children's sing along, wheels on the bus melody style, "
    "upbeat joyful, female solo singer, simple repetitive chorus, "
    "acoustic guitar, xylophone bells, G major, 90 bpm, kids music"
)

# Lyrics for each verse formatted for the Wheels on the Bus 3-repetition structure
VERSES = [
    # 1
    """[verse]
One Tom Turkey goes gobble gobble gobble
gobble gobble gobble, gobble gobble gobble
One Tom Turkey goes gobble gobble gobble
on Thanksgiving day!""",
    # 2
    """[verse]
Two pumpkin pies go mix bake bake
mix bake bake, mix bake bake
Two pumpkin pies go mix bake bake
on Thanksgiving day!""",
    # 3
    """[verse]
Three cranberry tasters go ooo that's sour
ooo that's sour, ooo that's sour
Three cranberry tasters go ooo that's sour
on Thanksgiving day!""",
    # 4
    """[verse]
Four boiled potatoes go mash mash stir
mash mash stir, mash mash stir
Four boiled potatoes go mash mash stir
on Thanksgiving day!""",
    # 5
    """[verse]
Five flying footballs go spinning in the air
spinning in the air, spinning in the air
Five flying footballs go spinning in the air
on Thanksgiving day!""",
    # 6
    """[verse]
Six things we are thankful for
thankful for, thankful for
Six things we are thankful for
on Thanksgiving day!""",
    # 7
    """[verse]
Seven shirt buttons go stretch stretch pop
stretch stretch pop, stretch stretch pop
Seven shirt buttons go stretch stretch pop
on Thanksgiving day!""",
    # 8
    """[verse]
Eight full tummies go mmm that was good
mmm that was good, mmm that was good
Eight full tummies go mmm that was good
on Thanksgiving day!""",
    # 9
    """[verse]
Nine dirty dishes go clink clank clink
clink clank clink, clink clank clink
Nine dirty dishes go clink clank clink
on Thanksgiving day!""",
    # 10
    """[verse]
Ten tired folks go yawn yawn yawn
yawn yawn yawn, yawn yawn yawn
Ten tired folks go yawn yawn yawn
on Thanksgiving day!""",
    # 11
    """[verse]
One Tom Turkey goes gobble gobble gobble
gobble gobble gobble, gobble gobble gobble
One Tom Turkey says gobble gobble... PARDON!
on Thanksgiving day!""",
]

def submit(lyrics, verse_num):
    payload = json.dumps({
        'lyrics': lyrics,
        'tags': STYLE,
        'duration': 20,
    }).encode()
    req = urllib.request.Request(
        f'https://queue.fal.run/{MODEL}',
        data=payload,
        headers={'Authorization': f'Key {FAL_KEY}', 'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as r:
        data = json.loads(r.read())
    rid = data['request_id']
    print(f'  Verse {verse_num}: submitted → {rid}')
    return rid

def poll(request_id, verse_num, timeout=180):
    status_url = f'https://queue.fal.run/{MODEL}/requests/{request_id}/status'
    result_url = f'https://queue.fal.run/{MODEL}/requests/{request_id}'
    deadline = time.time() + timeout
    while time.time() < deadline:
        time.sleep(5)
        req = urllib.request.Request(status_url, headers={'Authorization': f'Key {FAL_KEY}'}, method='GET')
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read())
        status = data.get('status')
        if status == 'COMPLETED':
            req2 = urllib.request.Request(result_url, headers={'Authorization': f'Key {FAL_KEY}'}, method='GET')
            with urllib.request.urlopen(req2) as r2:
                result = json.loads(r2.read())
            url = result['audio']['url']
            print(f'  Verse {verse_num}: DONE → {url}')
            return url
        elif status == 'FAILED':
            print(f'  Verse {verse_num}: FAILED', json.dumps(data)[:200])
            return None
        else:
            elapsed = int(time.time() - (deadline - timeout))
            sys.stdout.write(f'\r  Verse {verse_num}: {status or "processing"} ({elapsed}s)')
            sys.stdout.flush()
    print(f'\n  Verse {verse_num}: TIMEOUT')
    return None

def download(url, verse_num):
    out = os.path.join(OUTDIR, f'verse-{verse_num}.wav')
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as r, open(out, 'wb') as f:
        f.write(r.read())
    size_kb = os.path.getsize(out) // 1024
    print(f'  Verse {verse_num}: saved → {out} ({size_kb}KB)')
    return out

# ── Main: submit all, then poll sequentially ──────────────────────────────────
print('=== Submitting all 11 verses to ace-step ===')
request_ids = []
for i, lyrics in enumerate(VERSES, 1):
    outfile = os.path.join(OUTDIR, f'verse-{i}.wav')
    if os.path.exists(outfile) and os.path.getsize(outfile) > 50000:
        print(f'  Verse {i}: already exists, skipping')
        request_ids.append(None)
    else:
        try:
            rid = submit(lyrics, i)
            request_ids.append(rid)
            time.sleep(1)  # small delay between submits
        except Exception as e:
            print(f'  Verse {i}: submit error → {e}')
            request_ids.append(None)

print('\n=== Polling for results ===')
for i, rid in enumerate(request_ids, 1):
    if rid is None:
        continue
    print(f'\nPolling verse {i}...')
    audio_url = poll(rid, i)
    if audio_url:
        download(audio_url, i)
    print()

print('\n=== Done! Files in:', OUTDIR, '===')
for f in sorted(os.listdir(OUTDIR)):
    size = os.path.getsize(os.path.join(OUTDIR, f)) // 1024
    print(f'  {f} ({size}KB)')
