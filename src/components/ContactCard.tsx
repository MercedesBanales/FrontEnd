import { setContact } from "@/app/GlobalRedux/Features/selectedContactSlice";
import { Contact } from "@/types/Contact";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from 'next/image';

interface Prop {
    contact: Contact
}


export default function ContactCard( { contact }: Prop) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleClick = () => {
        router.push(`/contacts/${contact.id}`)
        dispatch(setContact(contact));
    }

    return (
        <div className="flex justify-between rounded-3xl p-4 items-center bg-fuchsia-100 w-1/2">
            <div className="flex justify-center gap-4 items-center">
            <Image
                className="rounded-full"
                src={`/${contact.imagePath}`}
                alt="Contact Image"
                width={56}
                height={56}
            />                <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-lg text-black">{contact.name}</h2>
                    <p className="text-xs text-black">{contact.email}</p>
                </div>
            </div>
            <div>
                <button onClick={handleClick} >
                    <svg className="w-3 h-3 text-black-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                    </svg>
                </button>
            </div>
        </div>
    );        
}