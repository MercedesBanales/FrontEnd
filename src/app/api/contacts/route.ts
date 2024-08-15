import Fetch from '../../../helpers/fetch';

export async function POST(req: Request) {
    try {
        const token = req.headers.get('Cookie')?.split("=")[1];
        const formData = await req.formData();
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
            status: 500, 
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
            body: { contacts: response.response.contacts }
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