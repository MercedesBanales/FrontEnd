'use client'

import { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';

export default function ContactID() {
    const contact = useSelector((state: RootState) => state.selectedContact.value);
    return (
        <div className="flex flex-col bg-gray-100 gap-4 rounded-3xl p-4">
            <div className="flex justify-end">
                <button>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
                    </svg>
                </button>
            </div>
            <div className="flex flex-col items-center p-6 gap-8">
                <img src={contact?.imagePath} alt={contact?.name} />
                <h1 className="font-bold text-2xl">{contact?.name}</h1>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-black">Address</h1>
                    <p className="text-gray-400 text-sm">{ contact?.address }</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-black">Phone</h1>
                    <p className="text-gray-400 text-sm">{ contact?.phone }</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="font-bold text-black">Email</h1>
                    <p className="text-gray-400 text-sm">{ contact?.email }</p>
                </div>  
            </div>

        </div>
        
    );
};