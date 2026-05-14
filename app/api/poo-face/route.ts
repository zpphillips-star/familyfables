import { NextRequest, NextResponse } from 'next/server';

const FAL_MODEL = 'fal-ai/qwen-image-edit-plus';
const POO_PROMPT = "Transform this face photo into a hilarious cartoon emoji character in a colorful children's book illustration style. Make it look like a funny 'poo poo face' emoji — exaggerated expression, big eyes, bright colors, cartoon style. Keep the same facial expression and emotion but make it a fun illustrated cartoon character. No text, no background, just the cartoon face.";

// App Router body size config (replaces old pages config syntax)
export const maxDuration = 30;

// POST /api/poo-face — submit job, return requestId immediately (stays under Vercel 10s timeout)
export async function POST(req: NextRequest) {
  let imageBase64: string;
  try {
    const body = await req.json();
    imageBase64 = body.imageBase64;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!imageBase64 || imageBase64.length < 100) {
    return NextResponse.json({ error: 'No image data received' }, { status: 400 });
  }

  const FAL_KEY = process.env.FAL_API_KEY;
  if (!FAL_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  // Clean base64 — remove data URL prefix if present
  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

  try {
    const submitRes = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: POO_PROMPT,
        image_url: `data:image/jpeg;base64,${cleanBase64}`,
      }),
    });

    const responseText = await submitRes.text();

    if (!submitRes.ok) {
      console.error('[poo-face submit] fal.ai error:', submitRes.status, responseText.slice(0, 400));
      // Return the actual fal.ai error so we can debug
      return NextResponse.json(
        { error: `fal.ai error ${submitRes.status}: ${responseText.slice(0, 200)}` },
        { status: 500 }
      );
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('[poo-face submit] non-JSON response:', responseText.slice(0, 200));
      return NextResponse.json({ error: 'Unexpected API response' }, { status: 500 });
    }

    const requestId = data.request_id as string | undefined;
    if (!requestId) {
      console.error('[poo-face submit] no request_id:', JSON.stringify(data).slice(0, 200));
      return NextResponse.json({ error: 'No request ID returned' }, { status: 500 });
    }

    return NextResponse.json({ requestId });
  } catch (err) {
    console.error('[poo-face submit] fetch error:', err);
    return NextResponse.json({ error: 'Network error reaching AI service' }, { status: 500 });
  }
}

// GET /api/poo-face?id=xxx — lightweight status check, called by client every 2s
export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get('id');
  if (!requestId) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const FAL_KEY = process.env.FAL_API_KEY;
  if (!FAL_KEY) return NextResponse.json({ status: 'ERROR' }, { status: 500 });

  try {
    const statusRes = await fetch(
      `https://queue.fal.run/${FAL_MODEL}/requests/${requestId}`,
      { headers: { 'Authorization': `Key ${FAL_KEY}` } }
    );

    if (!statusRes.ok) {
      return NextResponse.json({ status: 'ERROR' }, { status: 500 });
    }

    const data = await statusRes.json();

    if (data.status === 'COMPLETED') {
      const url =
        data.output?.images?.[0]?.url ||
        data.output?.image?.url ||
        data.images?.[0]?.url ||
        null;
      return NextResponse.json({ status: 'COMPLETED', imageUrl: url });
    }

    return NextResponse.json({ status: data.status || 'IN_PROGRESS' });
  } catch {
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}

