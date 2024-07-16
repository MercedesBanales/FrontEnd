export async function PUT(req: Response, { params } : { params: { contact_id: string}}) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const formData = await req.formData();
        const response = await fetch(`http://localhost:3000/api/contacts/${params.contact_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return Response.json({
            success: true,
            status: 200
        });
    } catch (err: any) {
        return Response.json({
            success: false,
            message: err.message
        });
    }
    
}