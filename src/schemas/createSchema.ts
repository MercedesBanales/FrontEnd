import * as Yup from 'yup';

export const CreateSchema = Yup.object().shape({
    name: Yup.string().required('Name cannot be empty'),
    surname: Yup.string().required('Surname cannot be empty'),
    email: Yup.string().email('Invalid email address').required('Email address cannot be empty'),
    address: Yup.string().required('Address cannot be empty'),
    title: Yup.string().required('Title cannot be empty'),
    phone: Yup.string().required('Phone cannot be empty'),
    file: Yup.mixed<File>().required('Image cannot be empty').test("fileFormat", "Unsupported Format", value => {
        return !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type));
        }
    )
})
