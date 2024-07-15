import { Contact } from "@/types/Contact";
import ContactForm, { ContactValue } from "./ContactForm";
import Image from 'next/image';
import * as Yup from 'yup';
import { FormikProps } from "formik";
import { useRef, useState } from "react";
import ErrorDialog from "./ErrorDialog";
import SuccessAlert from "./SuccessAlert";

interface Props {
    contact: Contact;
}

const UpdateSchema = Yup.object().shape({
    name: Yup.string(),
    surname: Yup.string(),
    email: Yup.string().email('Invalid email address'),
    address: Yup.string(),
    title: Yup.string(),
    phone: Yup.string(),
    file: Yup.mixed<File>().nullable()
                .test("fileFormat", "Unsupported Format", value => {
                    return !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type));
    })
})

export default function UpdateContactDialog({ contact }: Props) {
    const formikRef = useRef<FormikProps<ContactValue> | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [alert, setAlert] = useState<boolean>(false)
    const [contactData, setContactData] = useState<Contact | undefined>(contact)

    const onSuccess = (updatedContact?: Contact) => {
        setContactData(updatedContact)
        setAlert(true)
    }

    const handleSubmit = () => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
        }
    };

    const setMessage = (message: string) => {
        setError(message)
    }

    return (
        <>
        {error && <ErrorDialog message={error} onClose={() => setError(null)} />}
        {alert && <SuccessAlert message={"Contact successfully updated"} onClose={() => setAlert(false)}/>}
         <div className="flex flex-col flex-wrap bg-gray-100 p-4 rounded-3xl w-3/4">
            <div className="flex items-center p-6 gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 p-1 border-violet-400">
                <div className="relative w-full h-full overflow-hidden rounded-full bg-gray-100">
                    <Image
                        className="object-cover rounded-full"
                        src={`/${contactData!.imagePath}`}
                        alt="Contact Image"
                        layout="fill"
                    />
                </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-4">
                <h1 className="font-bold text-2xl">{contactData!.name} {contact.surname}</h1>
                <p className="text-base text-gray-500">{contact.title}</p>
                
            </div>
            </div>
            <ContactForm contact={contactData} schema={UpdateSchema} ref={formikRef} create={false} setMessage={setMessage} onSuccess={onSuccess}/>
        </div>
        <button className="text-white bg-violet-400 rounded-3xl px-12 py-2 w-fit shadow-md hover:font-semibold hover:shadow-lg" type="submit" onClick={handleSubmit}>Save</button>
        </>
       
    );
}