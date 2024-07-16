import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    console.log('Middleware executed for', request.url);
    if (request.url === 'http://localhost:3001/contacts') {
        const token = request.headers.get('Cookie')?.split("=")[1];
        if (!token || token === '') {
            console.log('Redirecting to login page');
            return NextResponse.redirect('http://localhost:3001/login');
        }

        return NextResponse.next();
    } else {
        return NextResponse.next();
    }

}