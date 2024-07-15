export async function createContact (formData: FormData) : Promise<{ id: string, path: string }> {
    const response = await fetch('/api/contacts', {
        method: 'POST',
        body: formData
    })
    const res = await response.json()
    if (!res.success) throw new Error(res.message);
    return { id: res.body.id, path: res.body.path }
}


export async function getContacts() {
    const res = await fetch('http://localhost:3001/api/contacts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const response = await res.json();
    if (!response.success) throw new Error(response.message);
    return response.body.contacts;
}

export const updateContact = async (formData: FormData, contact_id: string) : Promise<void> => {
    const response = await fetch(`/api/contacts/${contact_id}`, {
        method: 'PUT',
        body: formData
    });
    const res = await response.json();
    if (!res.success) throw new Error(res.message);
}