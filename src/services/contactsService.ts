import { Contact } from "@/types/Contact";

export const createContact = async (contact: Contact) : Promise<void> => {
    const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error('Failed to create contact');
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
    return res.response.contacts;
}

export const updateContact = async (contact: Contact) : Promise<void> => {
    const response = await fetch(`http://localhost:3000/api/contacts/${contact.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error('Failed to update contact');
}