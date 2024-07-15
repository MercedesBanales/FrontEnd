'use client'

import ContactsMainPage from "@/components/ContactsMainPage";
import CreateContactDialog from "@/components/CreateContactDialog";
import { useEffect, useState } from "react";
import SuccessAlert from "@/components/SuccessAlert";

export default function Page() {
    const [create, setCreate] = useState(false);
    const [alert, setAlert] = useState(false);

    const handleSuccess = () => {
        setCreate(false);
        setAlert(true);
    }

    const openCreateDialog = () => {
        setCreate(true);
        setAlert(false)
    }

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
            }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <>
        {!create && <ContactsMainPage onClose={openCreateDialog}/>}
        {create && <CreateContactDialog onClose={() => setCreate(false)} onSuccess={handleSuccess}/>}
        {alert && <SuccessAlert message={"Contact successfully created"} onClose={() => setAlert(false)}/>}
        </>
    );
}