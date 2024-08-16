import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as Yup from 'yup';
import * as contactsService from "@/services/contactsService";
import { Contact } from "@/types/Contact";
import { forwardRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { createNewContact, selectContactsError, selectContactsStatus, setContacts, setStatus } from "@/app/GlobalRedux/Features/contactsSlice";

interface Props {
    contact?: Contact;
    schema: Yup.ObjectSchema<ContactValue>
    create: boolean;
    onClose?: () => void;
    setMessage: (message: string) => void
    onSuccess?: (contact?: Contact) => void
}

export interface ContactValue {
    name?: string;
    surname?: string;
    address?: string;
    title?: string;
    email?: string;
    phone?: string;
    file?: File | null;
}

const ContactForm = forwardRef<FormikProps<ContactValue> | null, Props>( ({ contact, schema, create, onClose, setMessage, onSuccess }, ref) => {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectContactsStatus);
    const error = useAppSelector(selectContactsError);

    useEffect(() => {
        if (status === 'failed') {
            setMessage(error!);
        } else if (status === 'added') {
            if (onClose) onClose();
            if (onSuccess) onSuccess();
            dispatch(setStatus('succeeded'))
        }
    }, [status, error])

    const createContact = async (formData: FormData, helper: FormikHelpers<ContactValue>) =>{
        dispatch(createNewContact(formData))
        if (status === 'added') helper.resetForm();    
    } 

    const updateContact = async (values: ContactValue, formData: FormData, helper: FormikHelpers<ContactValue>) =>{
        try {
            const path = await contactsService.updateContact(formData, contact!.id);
            const updatedContact = { id: contact!.id, 
                name: (values.name) ? values.name : contact!.name,
                surname: (values.surname) ? values.surname : contact!.surname,
                address: (values.address) ? values.address : contact!.address,
                title: (values.title) ? values.title : contact!.title,
                email: (values.email) ? values.email : contact!.email,
                phone: (values.phone) ? values.phone : contact!.phone,
                imagePath: (path) ? path : contact!.imagePath}
            dispatch(setContacts(await contactsService.getContacts()));
            console.log(updatedContact)
            if (onSuccess) onSuccess(updatedContact);
            helper.resetForm();
        } catch (error: any){
            setMessage(error.message)
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
                        <label className="text-black text-base font-medium">Name</label>
                        <Field id="name" name="name" type="name" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.name}/>
                        {errors.name && touched.name ? (
                            <label className="text-red-500 text-sm w-fit">{errors.name}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <label className="text-black text-base font-medium">Surname</label>
                        <Field id="surname" name="surname" type="surname" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.surname}/>
                        {errors.surname && touched.surname ? (
                            <label className="text-red-500 text-sm w-fit">{errors.surname}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <label className="text-black text-base font-medium">Title</label>
                        <Field id="title" name="title" type="title" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.title}/>
                        {errors.title && touched.title ? (
                            <label className="text-red-500 text-sm w-fit">{errors.title}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <label className="text-black text-base font-medium">Email</label>
                        <Field id="email" name="email" type="email" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.email}/>
                        {errors.email && touched.email ? (
                            <label className="text-red-500 text-sm w-fit">{errors.email}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <label className="text-black text-base font-medium">Address</label>
                        <Field id="address" name="address" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.address}/>
                        {errors.address && touched.address ? (
                            <label className="text-red-500 text-sm w-fit">{errors.address}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-[49%]">
                        <label className="text-black text-base font-medium">Phone</label>
                        <Field id="phone" name="phone" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm" placeholder={contact?.phone}/>
                        {errors.phone && touched.phone ? (
                            <label className="text-red-500 text-sm w-fit">{errors.phone}</label>
                        ) : null}
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
