import { Contact } from "@/types/Contact";
import Image from 'next/image';

interface Props {
    contact: Contact;
    onClick: () => void;
}

export default function ContactDetailsDialog({ contact, onClick } : Props) {
    return (
        <div className="flex flex-col bg-gray-100 gap-4 rounded-3xl p-4 w-2/4">
            <div className="flex justify-end gap-2">
                <button onClick={onClick}>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                    </svg>
                </button>
                <button>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center p-6 gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 p-1 border-violet-400">
                <div className="relative w-full h-full overflow-hidden rounded-full bg-gray-100">
                    <Image
                        className="object-cover rounded-full"
                        src={`/${contact.imagePath}`}
                        alt="Contact Image"
                        layout="fill"
                    />
                </div>
            </div>
                <div className="flex flex-col items-center justify-center gap-3">
                    <h1 className="font-bold text-2xl">{contact.name} {contact.surname}</h1>
                    <p className="text-gray-600 text-base">{ contact.title }</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-black">Address</h1>
                    <p className="text-gray-500 text-sm">{ contact.address }</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-black">Phone</h1>
                    <p className="text-gray-500 text-sm">{ contact.phone }</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-black">Email</h1>
                    <p className="text-gray-500 text-sm">{ contact.email }</p>
                </div>  
            </div>
        </div>
    )
}