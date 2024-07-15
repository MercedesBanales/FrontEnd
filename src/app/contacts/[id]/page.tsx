'use client'

import { RootState } from '@/app/GlobalRedux/store';
import ContactDetailsDialog from '@/components/ContactDetailsDialog';
import UpdateContactDialog from '@/components/UpdateContactDialog';
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
            {!updateDialog && <ContactDetailsDialog contact={contact} onClick={handleClick} />}
            {updateDialog && <UpdateContactDialog contact={contact} />}
        </>
    );
};