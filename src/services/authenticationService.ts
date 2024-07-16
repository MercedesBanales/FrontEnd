export async function login(email: string, password: string) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }) 
    const res = await response.json();
    if (!res.success) throw new Error(res.message);
}

export function logout() {
    fetch('/api/auth/logout', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
}

