'use client'

import ContactsMainPage from "@/components/ContactsMainPage";
import CreateContactDialog from "@/components/CreateContactDialog";
import { RootState } from "@/app/GlobalRedux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
    const [create, setCreate] = useState(false);
    const contact = useSelector((state: RootState) => state.selectedContact.value)!;

    return (
        <>
        {!create && <ContactsMainPage onClose={() => setCreate(true)}/>}
        {create && <CreateContactDialog onClose={() => setCreate(false)}/>}
        </>
    );
}