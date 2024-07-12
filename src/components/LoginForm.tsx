'use client';

import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';

interface Values {
    email: string;
    password: string;
  }

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
    return (<Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
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
