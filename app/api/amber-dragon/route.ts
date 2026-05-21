// Amber the Dragon Keeper — AI Dragon Creator
// Takes the child's chosen dragon name, color, size, and power
// Returns a unique, imaginative story set in the world of Sydar

export const maxDuration = 30;

export async function POST(request: Request) {
  const { name, color, size, power, powerEmoji } = await request.json();

  if (!name || !color || !size || !power) {
    return Response.json({ story: null }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json({ story: null }, { status: 500 });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 220,
      messages: [
        {
          role: 'system',
          content: `You are a whimsical children's book narrator writing in the style of Amber the Dragon Keeper — a picture book set in the magical Dragon Mountains of Sydar. 

Write a short, enchanting 3-paragraph origin story (4-5 sentences total) about the child's dragon. 

Rules:
- Write in past/present tense, like a storybook
- Use the dragon's name, color, size, and power naturally throughout — don't just list them
- Reference Amber the Dragon Keeper in paragraph 2 (have her say something specific and delightful about this dragon in dialogue, in italics using *quotes*)
- End with a magical closing line that ends with a single relevant emoji
- Keep it age-appropriate (ages 3-7), warm, adventurous, and imaginative
- DO NOT use quotation marks for Amber's dialogue — use *italics with curly quotes* like: *"Wow!"* she said
- Total length: ~120 words max
- Output plain text only — use line breaks between paragraphs (no HTML, no markdown headers)`,
        },
        {
          role: 'user',
          content: `Dragon name: ${name}
Scale color: ${color}
Size: ${size}
Special power: ${power} ${powerEmoji}`,
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error('[amber-dragon] OpenAI error:', res.status, await res.text());
    return Response.json({ story: null }, { status: 502 });
  }

  const data = await res.json();
  const story = data.choices?.[0]?.message?.content?.trim() ?? null;

  return Response.json({ story });
}
