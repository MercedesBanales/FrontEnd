export async function POST(req: Request) {
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
        return Response.json({
            success: true,
            status: 200,
            body: { id: data.id, path: data.imagePath}
        });
    } catch (error: any) {
        return Response.json({
            success: false,
            message: error.message
        })

    }
}

export async function GET (req: Request, res: Response) {
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
        return Response.json({
            success: true,
            status: 200,
            body: { contacts: data.response.contacts }
        });
    } catch (error: any) {
        return Response.json({
            success: false,
            message: error.message
        })
        
    }
}