import Cookies from "js-cookie";

export const getUser = async (token?: string) =>{
    const response = await fetch('https://localhost3000/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    const res = await response.json()
    if (!response.ok) throw new Error(res.message);
    return { email: res.email, name: res.name };
}