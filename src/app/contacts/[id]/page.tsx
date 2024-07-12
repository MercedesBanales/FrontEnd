'use client'

import { RootState } from '@/app/GlobalRedux/store';
import ContactDetailsCard from '@/components/ContactDetailsCard';
import UpdateContactCard from '@/components/UpdateContactCard';
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
            {!updateDialog && <ContactDetailsCard contact={contact} onClick={handleClick} />}
            {updateDialog && <UpdateContactCard contact={contact} onClick={() => setUpdateDialog(false)} />}
        </>
    );
};