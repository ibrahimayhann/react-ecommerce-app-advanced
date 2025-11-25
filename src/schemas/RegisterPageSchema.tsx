import * as yup from 'yup'

export const registerPageSchema = yup.object().shape({

    username: yup.string().email("Geçersiz email").required("Username boş olamaz"),
    password: yup.string().required("Şifre boş olamaz")
})