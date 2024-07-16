import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    console.log('Middleware executed for', request.nextUrl.pathname);
    if (request.nextUrl.pathname.startsWith('/contacts')) {
        const token = request.headers.get('Cookie')?.split("=")[1];
        console.log('Token:', token)
        if (!token || token === '') {
            console.log('Redirecting to login page');
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }

        return NextResponse.next();
    } else {
        return NextResponse.next();
    }

}