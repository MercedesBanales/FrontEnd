'use client';

import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import ErrorDialog from './ErrorDialog';
import * as Yup from 'yup';

const InputPasswordComponent = ({ field, form, ...props }: { field: any, form: any, props: any }) => (
    <input
        {...field}
        {...props}
        type="password"
        className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"
        placeholder="password"
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

    const closeDialog = () =>{
        setError(null);
    }
    
    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) throw new Error('Invalid credentials');

            const data = await response.json();
            localStorage.setItem('token', data.token);
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
                    <Field id="email" name="email" component={InputEmailComponent} />
                    {errors.email && touched.email ? (
                        <label className="text-red-500 text-sm">{errors.email}</label>
                    ) : null}
                    <Field id="password" name="password" component={InputPasswordComponent} />
                    {errors.password && touched.password ? (
                        <label className="text-red-500 text-sm">{errors.password}</label>
                    ) : null}
                </div>
                <button className="text-white bg-violet-400 rounded-lg px-12 py-2 w-fit" type="submit">Login</button>
            </Form>
            )}
        </Formik>
        </>
    )
}
