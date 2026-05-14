import { NextRequest, NextResponse } from 'next/server';

const FAL_MODEL = 'fal-ai/qwen-image-edit-plus';
const POO_PROMPT = "Transform this face photo into a hilarious cartoon emoji character in a colorful children's book illustration style. Make it look like a funny 'poo poo face' emoji — exaggerated expression, big eyes, bright colors, cartoon style. Keep the same facial expression and emotion but make it a fun illustrated cartoon character. No text, no background, just the cartoon face.";

// POST /api/poo-face — submit job, return requestId immediately (stays under Vercel 10s timeout)
export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  const FAL_KEY = process.env.FAL_API_KEY!;

  const submitRes = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: POO_PROMPT,
      image_url: `data:image/jpeg;base64,${imageBase64}`,
    }),
  });

  if (!submitRes.ok) {
    const txt = await submitRes.text().catch(() => '');
    console.error('[poo-face submit]', submitRes.status, txt);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }

  const data = await submitRes.json();
  const requestId = data.request_id;
  if (!requestId) {
    console.error('[poo-face submit] no request_id in response:', JSON.stringify(data));
    return NextResponse.json({ error: 'No request ID' }, { status: 500 });
  }

  return NextResponse.json({ requestId });
}

// GET /api/poo-face?id=xxx — lightweight status check, called by client every 2s
export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get('id');
  if (!requestId) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const FAL_KEY = process.env.FAL_API_KEY!;

  const statusRes = await fetch(
    `https://queue.fal.run/${FAL_MODEL}/requests/${requestId}`,
    { headers: { 'Authorization': `Key ${FAL_KEY}` } }
  );

  if (!statusRes.ok) {
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }

  const data = await statusRes.json();

  // Completed — extract image URL from various response shapes
  if (data.status === 'COMPLETED') {
    const url =
      data.output?.images?.[0]?.url ||
      data.output?.image?.url ||
      data.images?.[0]?.url ||
      null;
    return NextResponse.json({ status: 'COMPLETED', imageUrl: url });
  }

  // Still in progress
  return NextResponse.json({ status: data.status || 'IN_PROGRESS' });
}
