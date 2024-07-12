'use client'
import { useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import { RootState } from '@/app/GlobalRedux/store';

export default function ContactsList() {
    const contacts = useSelector((state: RootState) => state.contacts.value);
    console.log(contacts);

    if (!Array.isArray(contacts)) {
        console.error('Contacts is not an array:', contacts);
        return <p>Error: Contacts data is invalid</p>;
    }

    return (
        <>
        <p>Contacts</p>
            { contacts.length === 0 && <p>No contacts found</p> }
            { contacts.map((contact) => (
                <ContactCard key={contact.id} />
            ))} 
        </>
       
    );
}