import { serialize } from 'cookie';
import Fetch from '@/helpers/fetch';
import { LoginSchema } from '@/schemas/loginSchema'

export async function POST(req: Request) {
  try {

    const formData = await req.formData();
    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });
    await LoginSchema.validate(body, { abortEarly: false });

    const response = await Fetch.post(`${process.env.URL}/login`, formData);
    const cookie = serialize('token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
    });
    const newRes = Response.json({
      success: true, 
      status: 200, 
      body: { token: response.token }})
    newRes.headers.set('Set-Cookie', cookie);
    return newRes;
  } catch (error: any) {
      const body = {
        success: false,
        message: error.message
      }
      return new Response(JSON.stringify(body),
      {
          status: 500, 
          headers: { 'Content-Type': 'application/json' }
      })
  }
}