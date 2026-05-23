import json, urllib.request, time

FAL_KEY = 'ad7875c7-51ef-40ab-a760-6363ce38a850:c04c7d353048e834f1bd5fbb32477df5'

payload = json.dumps({
    'lyrics': (
        "[verse]\n"
        "One Tom Turkey goes gobble gobble gobble\n"
        "gobble gobble gobble, gobble gobble gobble\n"
        "One Tom Turkey goes gobble gobble gobble\n"
        "on Thanksgiving day!\n\n"
        "[chorus]\n"
        "On Thanksgiving day!\n"
        "On Thanksgiving day!\n"
        "One Tom Turkey goes gobble gobble gobble\n"
        "on Thanksgiving day!"
    ),
    'tags': (
        'sweet young woman solo singing, pure clear soprano voice, '
        'simple childrens nursery rhyme melody, wheels on the bus style, '
        'upbeat cheerful, soft acoustic guitar, G major, 85 bpm, '
        'warm gentle vocals, kindergarten singalong, clean vocal performance, '
        'no heavy drums, light airy production'
    ),
    'duration': 22,
}).encode()

req = urllib.request.Request(
    'https://queue.fal.run/fal-ai/ace-step',
    data=payload,
    headers={'Authorization': 'Key ' + FAL_KEY, 'Content-Type': 'application/json'},
    method='POST'
)
with urllib.request.urlopen(req) as r:
    result = json.loads(r.read())
rid = result['request_id']
print('Submitted:', rid)

for i in range(40):
    time.sleep(5)
    req2 = urllib.request.Request(
        'https://queue.fal.run/fal-ai/ace-step/requests/' + rid + '/status',
        headers={'Authorization': 'Key ' + FAL_KEY}
    )
    with urllib.request.urlopen(req2) as r:
        data = json.loads(r.read())
    status = data.get('status', 'processing')
    if status == 'COMPLETED':
        req3 = urllib.request.Request(
            'https://queue.fal.run/fal-ai/ace-step/requests/' + rid,
            headers={'Authorization': 'Key ' + FAL_KEY}
        )
        with urllib.request.urlopen(req3) as r:
            result = json.loads(r.read())
        url = result['audio']['url']
        print('Audio URL:', url)
        out = r'C:\Users\zaphilli\Desktop\tom-turkey-verse1-test.wav'
        with urllib.request.urlopen(url) as r2, open(out, 'wb') as f:
            f.write(r2.read())
        print('Saved:', out)
        break
    print('[' + str(i*5) + 's] ' + status)
