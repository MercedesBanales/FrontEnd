import { NextRequest, NextResponse } from "next/server";
import * as usersService from "@/services/usersService";

export async function middleware(request: NextRequest) {
    // const token = request.cookies.get("token");

    // if (!token) {
    //     return NextResponse.redirect("/login");
    // }

    // try {
    //     await usersService.getUser(token);
    // } catch (error) {
    //     return NextResponse.redirect("/login");
    // }
    // return NextResponse.next();
    return NextResponse.next();
}
   

export const config = {
    matchers: '/contacts'
}