import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import * as contactsService from "@/services/contactsService";

const UpdateSchema = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    email: Yup.string().email('Invalid email address').required('Email address cannot be empty'),
    address: Yup.string().required('Address cannot be empty'),
    phone: Yup.string().required('Phone cannot be empty'),
    imagePath: Yup.string().required('Image path cannot be empty'),
})

const handleSubmit = async (values: ContactValue) => {
    try {
        //
    } catch (error: any) {
        console.error(error.message);
    }
}

interface ContactValue {
    name: string;
    address: string;
    email: string;
    phone: string;
    imagePath: string;
}

export default function UpdateContactForm() {
    return (
        <>
        <Formik
            initialValues={{
                name: '',
                address: '',
                email: '',
                phone: '',
                imagePath: '',
            }}
            validationSchema={UpdateSchema}
            onSubmit={(
            values: ContactValue ) => {
                handleSubmit(values as ContactValue);
            }}
        >
            {({errors, touched}) => (
                <Form className="flex flex-col items-center justify-evenly w-full gap-8">
                <div className="flex flex-col flex-wrap w-full items-start h-80 gap-4 py-6 pl-6 pr-8 overflow-auto">
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-lg font-bold">Name</label>
                        <Field id="name" name="name" type="name" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"/>
                        {errors.name && touched.name ? (
                            <label className="text-red-500 text-sm w-fit">{errors.name}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-lg font-bold">Email</label>
                        <Field id="email" name="email" type="email" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"/>
                        {errors.email && touched.email ? (
                            <label className="text-red-500 text-sm w-fit">{errors.email}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-lg font-bold">Address</label>
                        <Field id="address" name="address" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"/>
                        {errors.address && touched.address ? (
                            <label className="text-red-500 text-sm w-fit">{errors.address}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-lg font-bold">Phone</label>
                        <Field id="phone" name="phone" className="bg-fuchsia-100 px-4 py-3 rounded-lg placeholder-gray-400 text-sm"/>
                        {errors.phone && touched.phone ? (
                            <label className="text-red-500 text-sm w-fit">{errors.phone}</label>
                        ) : null}
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-black text-lg font-bold">Profile Picture</label>
                        <Field id="image" name="image" type="file" className="text-sm"/>
                        {errors.imagePath && touched.imagePath ? (
                            <label className="text-red-500 text-sm w-fit">{errors.imagePath}</label>
                        ) : null}
                    </div>
                    
                </div>
            </Form>
            )}
        </Formik>
        </>
    )
}