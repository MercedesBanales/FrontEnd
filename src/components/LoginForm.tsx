'use client';

import React from 'react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';

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


export default function LoginForm() {
    const router = useRouter();
    
    const handleSubmit = async (values: { email: string, password: string }) => {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log(localStorage.getItem('token'));

            router.push('/contacts');

        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (<Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(
          values: { email: string, password: string }) => {
          handleSubmit(values);
        }}
      >
        <Form className="flex flex-col items-center w-2/4 gap-8">
            <div className="flex flex-col w-full gap-4">
                <Field id="email" name="email" component={InputEmailComponent} />
                <Field id="password" name="password" component={InputPasswordComponent} />
            </div>
            <button className="text-white bg-violet-400 rounded-lg px-12 py-2 w-fit" type="submit">Login</button>
        </Form>
    </Formik>)
}
