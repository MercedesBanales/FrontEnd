import Fetch from '../helpers/fetch';

export async function login(formData: FormData) {
    try {
        await Fetch.post('/api/auth/login', formData);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export function logout() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    Fetch.put('/api/auth/logout', headers);
}

