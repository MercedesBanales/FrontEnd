import { Contact } from "@/types/Contact";

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