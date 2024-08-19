import { useAppSelector, useAppDispatch } from '../app/hooks'
import ContactsList from "./ContactsList";
import { useState } from "react";
import { getContacts } from "@/app/GlobalRedux/Features/contactsSlice";

interface Props {
    onClose: () => void;
}

export default function ContactsMainPage( { onClose } : Props) {
    const contacts = useAppSelector(getContacts)
    const [filteredContacts, setFilteredContacts] = useState(contacts);

    const handleChange = (value: string) => {
        const fullName = value.toLowerCase()
        const changedContacts = contacts.filter((contact) => {
            const contactName = contact.name.toLowerCase() + " " + contact.surname.toLowerCase();
            return contactName.includes(fullName);
        });
        setFilteredContacts(changedContacts);
    }

    return (
        <div className="flex flex-col pt-20 w-full h-screen items-start gap-6">
            <div className="flex justify-between items-center w-full">  
                <h1 className="text-black text-3xl font-bold">Contacts</h1>
                <button onClick={onClose}>
                    <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#a78bfa" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
            <div className="flex justify-start w-full">
                    <input type="search" id="search-dropdown" className="p-2.5 w-full text-sm text-gray-900 rounded-l-lg bg-gray-200" onChange={(event) => handleChange(event.target.value)}/>
                    <div className="p-2.5 text-sm font-medium text-white bg-gray-200 rounded-e-l focus:ring-4 rounded-r-lg focus:outline-none dark:bg-gray-200 dark:hover:bg-gray-200 dark:focus:ring-gray-500">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="sr-only">Search</span>
                    </div>
            </div>
            <ContactsList contacts={filteredContacts}/>
        </div>
    )
}