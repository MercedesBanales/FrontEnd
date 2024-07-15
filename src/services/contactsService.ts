export async function createContact (formData: FormData) : Promise<{ id: string, path: string }> {
    const response = await fetch('/api/contacts/create', {
        method: 'POST',
        body: formData
    })
    const res = await response.json()
    if (!response.ok) throw new Error(res.message);
    return { id: res.body.id, path: res.body.path }
}


export async function getContacts() {
    const res = await fetch('api/contacts/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const response = await res.json();
    if (!res.ok) throw new Error(response.message);
    return response.body.contacts;
}

export const updateContact = async (formData: FormData, contact_id: string) : Promise<void> => {
    const response = await fetch(`http://localhost:3000/api/contacts/${contact_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
    });
    const res = await response.json();
    if (!response.ok) throw new Error(res.message);
}