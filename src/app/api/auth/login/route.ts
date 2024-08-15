import { serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const response = await fetch(`${process.env.URL}/login`, {
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
    const newRes = Response.json({
      success:true, 
      status: 200, 
      body: { token: data.token }})
    newRes.headers.set('Set-Cookie', cookie);
    return newRes;
  } catch (error: any) {
      return Response.json({
        success: false,
        message: error.message
      })
  }
}