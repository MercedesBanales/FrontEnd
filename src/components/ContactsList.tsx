'use client'
import { useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import { RootState } from '@/app/GlobalRedux/store';
import { Contact } from '@/types/Contact';
import { useState } from 'react';


export default function ContactsList() {
    const contacts = useSelector((state: RootState) => state.contacts.value);

    return (
        <>
            { contacts.length === 0 && <p>No contacts found</p> }
            <div className="flex flex-wrap w-full gap-4 justify-evenly">
                { contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact}/>
                ))} 
            </div>
           
        </>
       
    );
}