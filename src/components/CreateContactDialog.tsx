import { useRef } from "react";
import ContactForm, { ContactValue } from "./ContactForm";
import * as Yup from 'yup';
import { FormikProps } from "formik";

interface Props {
    onClose: () => void;
    onSuccess: () => void;
}

const CreateSchema = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    email: Yup.string().email('Invalid email address').required('Email address cannot be empty'),
    address: Yup.string().required('Address cannot be empty'),
    phone: Yup.string().required('Phone cannot be empty'),
    file: Yup.mixed<File>().required('Image cannot be empty').test("fileFormat", "Unsupported Format", value => {
        return !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type));
        }
    )
})

export default function CreateContactDialog( { onClose, onSuccess } : Props) {
    const formikRef = useRef<FormikProps<ContactValue> | null>(null);
    const handleSubmit = () => {
        if (formikRef.current) {
            formikRef.current.handleSubmit();
            onSuccess();
        }
    };
    return (
        <>
        <div className="flex flex-col flex-wrap bg-gray-100 px-4 rounded-3xl w-3/4 items-end">
            <button className="pr-4 pt-6" onClick={onClose}>
                    <svg className="w-6 h-6 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
            </button>
            <h1 className="text-3xl font-bold p-6 w-full">NEW CONTACT</h1>
            <ContactForm schema={CreateSchema} ref={formikRef} create={true}/>
        </div>
        <button className="text-white bg-violet-400 rounded-lg px-12 py-2 w-fit" type="submit" onClick={handleSubmit}>Create</button>
        </>
      

    )
    
}