import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { firstName, email } = body as { firstName?: string; email?: string };
  console.log('[subscribe] New signup:', { firstName, email });
  return NextResponse.json({ ok: true });
}
