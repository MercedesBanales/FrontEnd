export async function GET (request: Request) {
    try {
        const token = request.headers.get('Cookie')?.split("=")[1];
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message);
        return Response.json({
            success: true,
            body: {email: data.email, name: data.name}
        });
    } catch (err: any) {
        return Response.json({
            success: false,
            message: err.message
        })

    }

}