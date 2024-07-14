'use client'

import { useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import { RootState } from '@/app/GlobalRedux/store';

export default function ContactsList() {
    const contacts = useSelector((state: RootState) => state.contacts.value);

    return (
        <>
            { contacts.length === 0 && <p>No contacts found</p> }
            <div className="flex flex-wrap w-full justify-start gap-3 overflow-scroll pl-3">
                { contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact}/>
                ))} 
            </div>
           
        </>
       
    );
}