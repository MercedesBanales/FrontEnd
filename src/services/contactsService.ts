import { Contact } from "@/types/Contact";

export const createContact = async (formData: FormData) : Promise<{ id: string, path: string }>=> {
    const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData
    })
    const res = await response.json()
    if (!response.ok) throw new Error(res.message);
    return { id: res.id, path: res.imagePath }
}


export const getContacts = async () : Promise<Contact[]> => {
    const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    const res = await response.json();
    if (!response.ok) throw new Error(res.message);
    return res.response.contacts;
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