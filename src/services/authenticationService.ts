export const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    const data = await response.json();
    localStorage.setItem('token', data.token);
}