import { NextRequest, NextResponse } from 'next/server';

const FAL_KEY = process.env.FAL_API_KEY || 'ad7875c7-51ef-40ab-a760-6363ce38a850:c04c7d353048e834f1bd5fbb32477df5';

// face-to-sticker is purpose-built for this and has a disableable safety checker
const FAL_MODEL = 'fal-ai/face-to-sticker';

const PROMPT = "funny cartoon emoji character, children's book illustration style, big round eyes, silly goofy grin, colorful and whimsical, sticker art";
const NEG_PROMPT = "realistic, photograph, nsfw, text, watermark, blurry";

// Upload image to fal.ai CDN storage — better than sending base64 inline
async function uploadImageToFal(base64: string): Promise<string | null> {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const formData = new FormData();
    formData.append('file', new Blob([buffer], { type: 'image/jpeg' }), 'face.jpg');

    const res = await fetch('https://rest.alpha.fal.ai/storage/upload', {
      method: 'POST',
      headers: { 'Authorization': `Key ${FAL_KEY}` },
      body: formData,
    });

    if (!res.ok) {
      console.warn('[poo-face] storage upload failed:', res.status, await res.text().catch(() => ''));
      return null;
    }

    const data = await res.json();
    return (data.url || data.file_url || null) as string | null;
  } catch (e) {
    console.warn('[poo-face] storage upload error:', e);
    return null;
  }
}

// POST — submit job, return requestId immediately
export const maxDuration = 30;

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

  const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

  try {
    // Try uploading to fal.ai CDN first (more reliable than inline base64)
    let imageUrl = await uploadImageToFal(cleanBase64);
    if (!imageUrl) {
      // Fall back to inline data URL
      imageUrl = `data:image/jpeg;base64,${cleanBase64}`;
      console.log('[poo-face] using inline base64 fallback');
    } else {
      console.log('[poo-face] uploaded to fal CDN:', imageUrl.slice(0, 60));
    }

    const submitRes = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
        prompt: PROMPT,
        negative_prompt: NEG_PROMPT,
        add_safety_checker: false,
      }),
    });

    const responseText = await submitRes.text();

    if (!submitRes.ok) {
      console.error('[poo-face] submit failed:', submitRes.status, responseText.slice(0, 400));
      return NextResponse.json(
        { error: `Submit error ${submitRes.status}: ${responseText.slice(0, 200)}` },
        { status: 500 }
      );
    }

    let data: Record<string, unknown>;
    try { data = JSON.parse(responseText); } catch {
      return NextResponse.json({ error: 'Unexpected API response' }, { status: 500 });
    }

    const requestId = data.request_id as string | undefined;
    if (!requestId) {
      console.error('[poo-face] no request_id:', JSON.stringify(data).slice(0, 200));
      return NextResponse.json({ error: 'No request ID returned' }, { status: 500 });
    }

    return NextResponse.json({ requestId });
  } catch (err) {
    console.error('[poo-face] error:', err);
    return NextResponse.json({ error: 'Service error' }, { status: 500 });
  }
}

// GET — lightweight status poll, called every 2s by client
export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get('id');
  if (!requestId) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

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

    if (data.status === 'FAILED') {
      const detail = data.error?.message || data.detail || 'Unknown AI error';
      console.error('[poo-face] job FAILED:', detail);
      return NextResponse.json({ status: 'FAILED', errorDetail: detail });
    }

    return NextResponse.json({ status: data.status || 'IN_PROGRESS' });
  } catch {
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}
