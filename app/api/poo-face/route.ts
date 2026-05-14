import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();

  const FAL_KEY = process.env.FAL_API_KEY!;

  // Submit job to fal.ai queue using qwen-image-edit-plus
  const submitRes = await fetch('https://queue.fal.run/fal-ai/qwen-image-edit-plus', {
    method: 'POST',
    headers: {
      'Authorization': `Key ${FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: "Transform this face photo into a hilarious cartoon emoji character in a colorful children's book illustration style. Make it look like a funny 'poo poo face' emoji — exaggerated expression, big eyes, bright colors, cartoon style. Keep the same facial expression and emotion but make it a fun illustrated cartoon character. No text, no background, just the cartoon face.",
      image_url: `data:image/jpeg;base64,${imageBase64}`,
    }),
  });

  if (!submitRes.ok) {
    return NextResponse.json({ error: 'Failed to submit job' }, { status: 500 });
  }

  const submitData = await submitRes.json();
  const requestId = submitData.request_id;

  // Poll for result (max 60s)
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 2000));

    const statusRes = await fetch(`https://queue.fal.run/fal-ai/qwen-image-edit-plus/requests/${requestId}`, {
      headers: { 'Authorization': `Key ${FAL_KEY}` },
    });

    const statusData = await statusRes.json();

    if (statusData.status === 'COMPLETED' && statusData.output?.images?.[0]?.url) {
      return NextResponse.json({ imageUrl: statusData.output.images[0].url });
    }

    if (statusData.status === 'FAILED') {
      return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Timeout' }, { status: 504 });
}
