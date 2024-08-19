import { serialize } from "cookie";

export function PUT(request: Request) {
    const cookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        path: '/'
    });
    const newRes = Response.json({
      success:true, 
      status: 200, 
    });
    newRes.headers.set('Set-Cookie', cookie);
    return newRes;
}