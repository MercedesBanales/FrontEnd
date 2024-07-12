import { Contact } from "@/types/Contact";

interface Props {
    contact: Contact;
    onClick: () => void;
}

export default function UpdateContactInfo({ contact, onClick }: Props) {

    return (
        <div className="flex flex-col bg-gray-100 gap-4 rounded-3xl p-4 w-2/4">
            <div className="flex justify-end gap-2">
                <button onClick={onClick}>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center p-6 gap-8">
                <img className="rounded-full border-2 p-1 border-violet-400 w-32 h-32" src="../profile-pic.webp" alt={contact?.name} />
                <h1 className="font-bold text-2xl">{contact?.name}</h1>
            </div>

        </div>
        
    );
}