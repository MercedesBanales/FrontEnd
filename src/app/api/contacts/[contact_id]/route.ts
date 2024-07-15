import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, context: any, res: NextResponse) {
    try {
        const { params } = context;
        const formData = await req.formData();
        const response = await fetch(`http://localhost:3000/api/contacts/${params.contact_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return NextResponse.json({
            success: true,
            status: 200
        });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err.message
        });
    }
    
}