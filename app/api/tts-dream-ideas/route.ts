// Dream Ideas TTS endpoint
// Voice: shimmer — OpenAI's soft, dreamy female voice; perfect for bedtime singalongs
// Model: tts-1-hd — highest quality

export const maxDuration = 60;

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text || typeof text !== 'string') {
    return new Response('Missing text', { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('OPENAI_API_KEY not configured', { status: 500 });
  }

  const openaiRes = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      voice: 'shimmer',
      input: text,
      speed: 1.0,
    }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    console.error('[tts-dream-ideas] OpenAI error:', openaiRes.status, err);
    return new Response('TTS generation failed', { status: 502 });
  }

  const audioBuffer = await openaiRes.arrayBuffer();

  return new Response(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  });
}
