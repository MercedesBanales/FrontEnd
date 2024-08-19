import Fetch from '@/helpers/fetch';
import { UpdateSchema } from '@/schemas/updateSchema';

export async function PUT(req: Request, { params } : { params: { contact_id: string}}) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const formData = await req.formData();
        const body: Record<string, any> = {};
        formData.forEach((value, key) => {
        body[key] = value;
        });
        await UpdateSchema.validate(body, { abortEarly: false });

        const headers = new Headers({'Authorization': `Bearer ${token}`});
        const response = await Fetch.put(`${process.env.URL}/contacts/${params.contact_id}`, headers, formData);
        return Response.json({
            imagePath: response.imagePath,
            success: true,
            status: 200
        });
    } catch (err: any) {
        const body = {
            success: false,
            message: err.message
        }
        return new Response(JSON.stringify(body),
        {
            status: 500, 
            headers: { 'Content-Type': 'application/json' }
        })
    }
    
}