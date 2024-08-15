import { serialize } from 'cookie';
import Fetch from '../../../../helpers/fetch';


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const headers = new Headers({'Content-Type': 'application/json'});
    const response = await Fetch.post(`${process.env.URL}/login`, headers, JSON.stringify({ email, password }));
    const cookie = serialize('token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
    });
    const newRes = Response.json({
      success:true, 
      status: 200, 
      body: { token: response.token }})
    newRes.headers.set('Set-Cookie', cookie);
    return newRes;
  } catch (error: any) {
      return Response.json({
        success: false,
        message: error.message
      })
  }
}