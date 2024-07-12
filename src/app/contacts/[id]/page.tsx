'use client'

import { RootState } from '@/app/GlobalRedux/store';
import ContactDetails from '@/components/ContactDetails';
import UpdateContactInfo from '@/components/UpdateContactInfo';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ContactID() {
    const [updateDialog, setUpdateDialog] = useState(false);

    const handleClick = () => {
        setUpdateDialog(true);
    }

    const contact = useSelector((state: RootState) => state.selectedContact.value)!;
    return (
        <>
            {!updateDialog && <ContactDetails contact={contact} onClick={handleClick} />}
            {updateDialog && <UpdateContactInfo contact={contact} onClick={() => setUpdateDialog(false)} />}
        </>
    );
};