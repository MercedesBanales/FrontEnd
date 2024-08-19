import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/contacts')) {
        const token = request.headers.get('Cookie')?.split("=")[1];
        if (!token || token === '') {
            console.log('entre')
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        } 
        return NextResponse.next();
    } 
    return NextResponse.next();
}