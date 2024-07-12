import { Contact } from "@/types/Contact";

interface Props {
    contact: Contact;
}

export default function ContactDetails({ contact } : Props) {
    return (
        <div>
            <h1>{contact.name}</h1>
        </div>
    )
}