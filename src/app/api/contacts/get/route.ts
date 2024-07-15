import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest, res: NextResponse) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const response = await fetch('http://localhost:3000/api/contacts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return NextResponse.json({
            status: 200,
            body: { contacts: data.response.contacts }
        });
    } catch (error: any) {
        console.log(error.message)   
    }
}