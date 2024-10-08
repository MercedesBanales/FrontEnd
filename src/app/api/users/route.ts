import Fetch from '@/helpers/fetch';

export async function GET (request: Request) {
    try {
        const token = request.headers.get('Cookie')?.split("=")[1];
        const headers = new Headers({'Content-Type': 'application', 'Authorization': `Bearer ${token}`});
        const response = await Fetch.get(`${process.env.URL}/users`, headers);
        return Response.json({
            success: true,
            body: {email: response.email, name: response.name}
        });
    } catch (err: any) {
        const body = {
            success: false,
            message: err.message
        }
        return new Response(JSON.stringify(body), {
            status: err.status, 
            headers: { 'Content-Type': 'application/json' }
        })
    }
}