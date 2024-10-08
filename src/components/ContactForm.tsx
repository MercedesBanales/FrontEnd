import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from 'yup';
import { Contact } from "@/types/Contact";
import { ContactValue } from "@/types/ContactValue"
import { forwardRef } from "react";
import { useAppDispatch,  } from "@/app/hooks";
import { createNewContact, updateOriginalContact } from "@/app/GlobalRedux/Features/contactsSlice";
import Input from "./commons/Input";

interface Props {
    contact?: Contact;
    schema: Yup.ObjectSchema<ContactValue>
    create: boolean;
    onClose?: () => void;
    setMessage: (message: string) => void
    onSuccess?: (contact?: Contact) => void
}

const ContactForm = forwardRef<FormikProps<ContactValue> | null, Props>( ({ contact, schema, create, onClose, setMessage, onSuccess }, ref) => {
    const dispatch = useAppDispatch();

    const createContact = async (formData: FormData, helper: FormikHelpers<ContactValue>) =>{
        try {
            await dispatch(createNewContact(formData)).unwrap()
            if (onClose) onClose();
            if (onSuccess) onSuccess();
            helper.resetForm();    
        } catch (err: any) {
            setMessage(err.message)
        }
    } 

    const updateContact = async (values: ContactValue, formData: FormData, helper: FormikHelpers<ContactValue> ) =>{
        try {
            const result = await dispatch(updateOriginalContact({ formData, contact: contact! })).unwrap();
            if (onSuccess) onSuccess(result);
            helper.resetForm();
        } catch (err: any) {
            setMessage(err.message)
        }

    }

    const handleSubmit = async (values: ContactValue, create: boolean, helper: FormikHelpers<ContactValue>) => {
        const formData = new FormData();
        if (values.name) formData.append('name', values.name);
        if (values.surname) formData.append('surname', values.surname);
        if (values.address) formData.append('address', values.address);
        if (values.title) formData.append('title', values.title);
        if (values.email) formData.append('email', values.email);
        if (values.phone) formData.append('phone', values.phone);
        if (values.file) formData.append('file', values.file);
        if (create) createContact(formData, helper)
        else updateContact(values, formData, helper)
    }

    return (
        <>
        <Formik
            initialValues={{
                name: '',
                surname: '',
                address: '',
                title: '',
                email: '',
                phone: '',
                file: null
            }}
            validationSchema={schema}
            onSubmit={(
                values: ContactValue, formikHelpers: FormikHelpers<ContactValue> ) => {
                handleSubmit(values as ContactValue, create, formikHelpers);
            }}
            innerRef={ref}
        >
            {({errors, touched, setFieldValue}) => (
                <Form className="flex flex-col items-center justify-evenly w-full gap-8 pb-8" encType="multipart/form-data">
                <div className="flex flex-wrap w-full justify-start h-80 gap-2 py-6 pl-6 overflow-scroll">
                    <div className="flex flex-col gap-1 w-[49%]">
                        <Input<ContactValue> name="name" label="Name" type="name" placeholder={contact?.name} />
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <Input<ContactValue> name="surname" label="Surname" type="surname" placeholder={contact?.surname} />
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <Input<ContactValue> name="title" label="Title" type="title" placeholder={contact?.title} />
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <Input<ContactValue> name="email" label="Email" type="email" placeholder={contact?.email} />
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <Input<ContactValue> name="address" label="Address" type="address" placeholder={contact?.address} />
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <Input<ContactValue> name="phone" label="Phone" type="phone" placeholder={contact?.phone} />
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <label className="text-black text-base font-medium">Profile Picture</label>
                        <input id="image" name="file" type="file" className="text-sm" 
                            onChange={(event: any) => {
                                setFieldValue('file', event.currentTarget.files?.[0]);
                        }}/>
                        {errors.file && touched.file ? (
                            <label className="text-red-500 text-sm w-fit">{errors.file}</label>
                        ) : null}
                    </div>
                </div>
            </Form>
            )}
        </Formik>
        </>
    )
});

export default ContactForm;
