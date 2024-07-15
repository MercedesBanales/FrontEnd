
import { serialize } from 'cookie';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    const cookie = serialize('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
    });
    const newRes = NextResponse.json({status: 200, body: { success: true }})
    newRes.headers.set('Set-Cookie', cookie);
    return newRes;
  } catch (error: any) {
      return NextResponse.json({
        success: false,
        message: error.message
      })
  }
}