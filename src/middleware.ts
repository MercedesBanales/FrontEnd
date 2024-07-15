import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as contactsService from "@/services/contactsService";
 
export async function middleware(request: NextRequest) {
    return NextResponse.next();
    // try {

    //     const contacts = await contactsService.getContacts();
    //     return NextResponse.next();
    // } catch (error: any) {
    //     console.error(error)
    //     return NextResponse.redirect('http://localhost:3001/login')
    // }
}
 
export const config = {
  matcher: '/contacts',
}