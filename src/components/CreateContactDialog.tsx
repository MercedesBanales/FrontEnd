import { useRef, useState } from "react";
import ContactForm from "./ContactForm";
import { FormikProps } from "formik";
import ErrorDialog from "./ErrorDialog";
import { CreateSchema } from "@/schemas/createSchema";
import { ContactValue } from "@/types/ContactValue";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateContactDialog( { onClose, onSuccess } : Props) {
    const formikRef = useRef<FormikProps<ContactValue> | null>(null);
    const [error, setError] = useState<string | null>(null);

    const setMessage = (message: string) => {
        setError(message);
    }

    const handleSubmit = () => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    };
    return (
        <>
        {error && <ErrorDialog message={error} onClose={() => setError(null)}/>}
        <div className="flex flex-col flex-wrap bg-gray-100 px-4 rounded-3xl w-3/4 items-end">
            <button className="pr-4 pt-6" onClick={onClose}>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
            </button>
            <h1 className="text-3xl font-bold pl-6 pb-4 w-full">NEW CONTACT</h1>
            <ContactForm schema={CreateSchema} ref={formikRef} create={true} onClose={onClose} setMessage={setMessage} onSuccess={onSuccess}/>
        </div>
        <button className="text-white bg-violet-400 rounded-3xl px-12 py-2 w-fit shadow-md hover:font-semibold hover:shadow-lg" type="submit" onClick={handleSubmit}>Create</button>
        </>
      

    )
    
}