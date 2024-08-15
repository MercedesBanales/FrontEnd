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
        return Response.json({
            success: false,
            message: error.message
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
        return Response.json({
            success: false,
            message: error.message
        }) 
    }
}