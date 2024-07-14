import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from 'yup';
import * as contactsService from "@/services/contactsService";
import { Contact } from "@/types/Contact";
import { forwardRef } from "react";

interface Props {
    contact?: Contact;
    schema: Yup.ObjectSchema<ContactValue>
    create: boolean;
}

export interface ContactValue {
    name?: string;
    address?: string;
    email?: string;
    phone?: string;
    file?: File | null;
}

const ContactForm = forwardRef<FormikProps<ContactValue> | null, Props>( ({ contact, schema, create }, ref) => {
    const handleSubmit = async (values: ContactValue, create: boolean) => {
        try {
            const formData = new FormData();
            if (values.name) formData.append('name', values.name);
            if (values.address) formData.append('address', values.address);
            if (values.email) formData.append('email', values.email);
            if (values.phone) formData.append('phone', values.phone);
            if (values.file) formData.append('file', values.file);
            if (create) await contactsService.createContact(formData);
            else await contactsService.updateContact(formData, contact!.id);
        } catch (error: any) {
            console.error(error.message);
        }
    }

    return (
        <>
        <Formik
            initialValues={{
                name: '',
                address: '',
                email: '',
                phone: '',
                file: null
            }}
            validationSchema={schema}
            onSubmit={(
            values: ContactValue ) => {
                handleSubmit(values as ContactValue, create);
            }}
            innerRef={ref}
        >
            {({errors, touched, setFieldValue}) => (
                <Form className="flex flex-col items-center justify-evenly w-full gap-8" encType="multipart/form-data">
                <div className="flex flex-col flex-wrap w-full items-start h-80 gap-4 py-6 pl-6 pr-8 overflow-auto">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-base font-medium">Name</label>
                        <Field id="name" name="name" type="name" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.name}/>
                        {errors.name && touched.name ? (
                            <label className="text-red-500 text-sm w-fit">{errors.name}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-base font-medium">Email</label>
                        <Field id="email" name="email" type="email" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.email}/>
                        {errors.email && touched.email ? (
                            <label className="text-red-500 text-sm w-fit">{errors.email}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-base font-medium">Address</label>
                        <Field id="address" name="address" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.address}/>
                        {errors.address && touched.address ? (
                            <label className="text-red-500 text-sm w-fit">{errors.address}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-base font-medium">Phone</label>
                        <Field id="phone" name="phone" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.phone}/>
                        {errors.phone && touched.phone ? (
                            <label className="text-red-500 text-sm w-fit">{errors.phone}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
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