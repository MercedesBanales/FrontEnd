'use client';

import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import ErrorDialog from './ErrorDialog';
import { useAppDispatch } from '@/app/hooks';
import { login } from "@/app/GlobalRedux/Features/activeUserSlice";
import { LoginSchema } from "../schemas/loginSchema";
import { LoginValue } from '@/types/LoginValue';
import Input from './commons/Input';

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

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const dispatch = useAppDispatch();
    
    const closeDialog = () =>{
        setError(null);
    }
    
    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('password', values.password);
            dispatch(login(formData));     
            setError(null);
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
                    <Input<LoginValue> name="email" label="email" type="email" placeholder="johndoe@hotmail.com" />
                    <Input<LoginValue> name="password" label="password" type="password" placeholder='*******' />
                </div>
                <button className="text-white bg-violet-400 rounded-3xl px-12 py-2 w-fit shadow-md hover:font-semibold hover:shadow-lg" type="submit">Login</button>
            </Form>
            )}
        </Formik>
        </>
    )
}
