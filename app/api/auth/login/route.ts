import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'Missing accessToken' }, { status: 400 });
    }

    const piRes = await fetch('https://api.minepi.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!piRes.ok) {
      const errText = await piRes.text();
      return NextResponse.json(
        { error: 'Pi verification failed', details: errText },
        { status: piRes.status }
      );
    }

    const piUser = await piRes.json();
    return NextResponse.json({ user: piUser });
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error', details: String(err) },
      { status: 500 }
    );
  }
}
