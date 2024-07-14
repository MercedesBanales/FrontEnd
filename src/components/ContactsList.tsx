import ContactCard from './ContactCard';
import { Contact } from '@/types/Contact';

interface Props {
    contacts: Contact[];
}

export default function ContactsList({ contacts }: Props) {

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