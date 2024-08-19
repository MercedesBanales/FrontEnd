export const getUser = async () =>{
    const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const res = await response.json()
    if (!res.success) throw new Error(res.message);
    return { email: res.body.email, name: res.body.name };
}