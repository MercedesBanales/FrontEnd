'use client';

import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import ErrorDialog from './ErrorDialog';
import { useDispatch } from "react-redux";
import { setContacts } from "@/app/GlobalRedux/Features/contactsSlice";
import { getContacts } from "@/services/contactsService";
import { setActiveUser } from "@/app/GlobalRedux/Features/activeUserSlice";
import * as usersService from "@/services/usersService";
import * as authenticationService from "@/services/authenticationService";
import * as Yup from 'yup';

const InputPasswordComponent = ({ field, form, ...props }: { field: any, form: any, props: any }) => (
    <input
        {...field}
        {...props}
        type="password"
        className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"
        placeholder='*******'
    />
);

const InputEmailComponent = ({ field, form, ...props }: { field: any, form: any, props: any }) => (
    <input
        {...field}
        {...props}
        type="email"
        className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"
        placeholder="johndoe@hotmail.com"
    />
);

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email address cannot be empty'),
    password: Yup.string()
      .required('Password cannot be empty'),
  });

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    const closeDialog = () =>{
        setError(null);
    }
    
    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            await authenticationService.login(formData);         
            const contacts = await getContacts();
            const user = await usersService.getUser();
            setError(null);
            dispatch(setContacts(contacts));
            dispatch(setActiveUser(user));
            router.push('/contacts');
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <>
        {error && <ErrorDialog message={error} onClose={closeDialog}/>}
        <Formik
            initialValues={{
            email: '',
            password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(
            values: { email: string, password: string }) => {
            handleSubmit(values as { email: string, password: string });
            }}
        >
            {({errors, touched}) => (
                <Form className="flex flex-col items-center w-2/4 gap-8">
                <div className="flex flex-col w-full gap-4">
                    <Field id="email" name="email" component={InputEmailComponent} />
                    {errors.email && touched.email ? (
                        <label className="text-red-500 text-sm">{errors.email}</label>
                    ) : null}
                    <Field id="password" name="password" component={InputPasswordComponent} />
                    {errors.password && touched.password ? (
                        <label className="text-red-500 text-sm">{errors.password}</label>
                    ) : null}
                </div>
                <button className="text-white bg-violet-400 rounded-3xl px-12 py-2 w-fit shadow-md hover:font-semibold hover:shadow-lg" type="submit">Login</button>
            </Form>
            )}
        </Formik>
        </>
    )
}
