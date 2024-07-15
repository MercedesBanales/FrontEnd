
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email, password } = req.body
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
        sameSite: 'strict',
        path: '/'
    });
    res.setHeader('Set-Cookie', cookie)
    res.status(200).json({ success: true })
  } catch (error: any) {
      res.status(500).json({ error: 'Something went wrong.' })
  }
}