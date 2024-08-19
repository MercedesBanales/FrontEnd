import { CreateSchema } from '@/schemas/createSchema';
import Fetch from '@/helpers/fetch';

export async function POST(req: Request) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const formData = await req.formData();
        const body: Record<string, any> = {};
        formData.forEach((value, key) => {
            body[key] = value;
          });
        await CreateSchema.validate(body, { abortEarly: false });

        const headers = new Headers({'Authorization': `Bearer ${token}`});
        const response = await Fetch.post(`${process.env.URL}/contacts`, formData, headers);
        return Response.json({
            success: true,
            status: 200,
            body: { id: response.id, path: response.imagePath}
        });
    } catch (error: any) {
        const body = {
            success: false,
            message: error.message
        }
        return new Response(JSON.stringify(body), {
            status: error.status, 
            headers: { 'Content-Type': 'application/json' }
        })
    }
}

export async function GET (req: Request) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
        const response = await Fetch.get(`${process.env.URL}/contacts`, headers);
        return Response.json({
            success: true,
            status: 200,
            body: { contacts: response.contacts }
        });
    } catch (error: any) {
        const body = {
            success: false,
            message: error.message
        }
        return new Response(JSON.stringify(body), {
            status: 500, 
            headers: { 'Content-Type': 'application/json' }
        })
    }
}