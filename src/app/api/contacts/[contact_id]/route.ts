export async function PUT(req: Request, { params } : { params: { contact_id: string}}) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const formData = await req.formData();
        const response = await fetch(`${process.env.URL}/contacts/${params.contact_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return Response.json({
            imagePath: data.response.imagePath,
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