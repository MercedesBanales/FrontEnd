import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const formData = await req.formData();

        const response = await fetch('http://localhost:3000/api/contacts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return NextResponse.json({
            status: 200,
            body: { id: data.id, path: data.imagePath}
        });
    } catch (error: any) {
        console.error(error.message); 
        return NextResponse.json({
            status: 500,
            body: { message: error.message }
        });
    }
}