// Brian the Ghost — AI haunt reply
// Takes the user's "I would haunt..." input and returns a fun 1-2 sentence ghost-voiced reply

export const maxDuration = 30;

export async function POST(request: Request) {
  const { input } = await request.json();

  if (!input || typeof input !== 'string') {
    return Response.json({ reply: null }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ reply: null }, { status: 500 });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 100,
      messages: [
        {
          role: 'system',
          content:
            "You are Brian the Ghost from a children's picture book — a friendly, gentle ghost who haunts with kindness instead of scares. When a child tells you where they'd haunt, respond with exactly 1-2 short, fun, spooky-but-sweet sentences as Brian. Reference their specific answer directly. Keep it playful and kid-friendly (ages 3-7). End with a ghost emoji. No quotation marks around the reply.",
        },
        {
          role: 'user',
          content: `The child says they would haunt: "${input.trim()}"`,
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error('[brian-haunt] OpenAI error:', res.status, await res.text());
    return Response.json({ reply: null }, { status: 502 });
  }

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content?.trim() ?? null;

  return Response.json({ reply });
}
