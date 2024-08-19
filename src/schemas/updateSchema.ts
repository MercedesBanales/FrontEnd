import * as Yup from 'yup';

export const UpdateSchema = Yup.object().shape({
    name: Yup.string(),
    surname: Yup.string(),
    email: Yup.string().email('Invalid email address'),
    address: Yup.string(),
    title: Yup.string(),
    phone: Yup.string(),
    file: Yup.mixed<File>().nullable()
                .test("fileFormat", "Unsupported Format", value => {
                    return !value || (value && ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(value.type));
    })
  })