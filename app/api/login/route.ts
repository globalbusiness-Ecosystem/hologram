import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { pi_auth_token, app_id } = await req.json();

    if (!pi_auth_token) {
      return NextResponse.json({ error: 'Missing pi_auth_token' }, { status: 400 });
    }

    const piRes = await fetch('https://api.minepi.com/v2/me', {
      headers: {
        Authorization: `Bearer ${pi_auth_token}`,
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

    const loginData = {
      id: piUser.uid,
      username: piUser.username,
      credits_balance: 0,
      terms_accepted: true,
      app_id: app_id ?? process.env.NEXT_PUBLIC_PI_APP_ID ?? 'hologram',
    };

    return NextResponse.json(loginData);
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error', details: String(err) },
      { status: 500 }
    );
  }
}
