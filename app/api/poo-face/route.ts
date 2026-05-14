import { NextRequest, NextResponse } from 'next/server';

const FAL_KEY = process.env.FAL_API_KEY || 'ad7875c7-51ef-40ab-a760-6363ce38a850:c04c7d353048e834f1bd5fbb32477df5';

// flux/dev/image-to-image — robust, no content filter, accepts uploaded CDN URLs
const FAL_MODEL = 'fal-ai/flux/dev/image-to-image';

const PROMPT = "children's book cartoon character, funny silly exaggerated expression, big round eyes, colorful illustration, whimsical sticker art style, soft outlines";
const NEG_PROMPT = "realistic, photograph, nsfw, text, watermark, blurry, dark";

async function uploadImageToFal(base64: string): Promise<string | null> {
  try {
    const buffer = Buffer.from(base64, 'base64');

    // Step 1: initiate upload to get presigned URL
    const initRes = await fetch('https://rest.alpha.fal.ai/storage/upload/initiate', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content_type: 'image/jpeg', file_name: 'face.jpg' }),
    });

    if (!initRes.ok) {
      console.warn('[poo-face] storage initiate failed:', initRes.status);
      return null;
    }

    const { file_url, upload_url } = await initRes.json();

    // Step 2: PUT the image — use Uint8Array (Node.js 18 native fetch doesn't accept Buffer)
    const uploadRes = await fetch(upload_url, {
      method: 'PUT',
      headers: { 'Content-Type': 'image/jpeg' },
      body: new Uint8Array(buffer),
    });

    if (!uploadRes.ok) {
      console.warn('[poo-face] storage PUT failed:', uploadRes.status);
      return null;
    }

    console.log('[poo-face] uploaded to fal CDN:', file_url.slice(0, 60));
    return file_url as string;
  } catch (e) {
    console.warn('[poo-face] storage upload error:', e);
    return null;
  }
}

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
    // Upload to fal CDN — required, model can't accept inline base64
    const imageUrl = await uploadImageToFal(cleanBase64);
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image upload failed — please try again' }, { status: 500 });
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
        strength: 0.78,
        num_inference_steps: 28,
        guidance_scale: 3.5,
        enable_safety_checker: false,
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
      const detail = data.error?.message || data.detail || JSON.stringify(data).slice(0, 200);
      console.error('[poo-face] job FAILED:', detail);
      return NextResponse.json({ status: 'FAILED', errorDetail: detail });
    }

    return NextResponse.json({ status: data.status || 'IN_PROGRESS' });
  } catch {
    return NextResponse.json({ status: 'ERROR' }, { status: 500 });
  }
}
