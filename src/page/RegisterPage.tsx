import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircleSharp } from "react-icons/io5"
import { useState } from 'react';
import IconButton from "@mui/material/IconButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Button from '@mui/material/Button';
import { MdLock } from "react-icons/md";
import '../css/RegisterPage.css'
import { useFormik } from 'formik'
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import registerPageService from '../services/RegisterPageService';
import type { UserType } from '../types/Types';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const newUser/*: UserType */ = {
                id: String(Math.floor(Math.random() * 9999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await registerPageService.register(newUser);
            if (response) {
                toast.success("Kullanıcı kaydedildi");
                resetForm();
                navigate("/login")
            }

        } catch (error) {
            toast.error("Hata: Hesap oluşturulamadı")
        }
    }

    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });



    return (
        <div className='register'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='card'>
                    <div className='inputdiv'>
                        <TextField
                            value={values.username}
                            onChange={handleChange}
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                            className='textfield'
                            id="username"
                            placeholder='Email adresi'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IoPersonCircleSharp size={20} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                        />


                        <TextField
                            className='textfield'

                            value={values.password}
                            onChange={handleChange}
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                            id="password"
                            placeholder="Şifreniz"
                            variant="standard"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdLock size={20} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <AiOutlineEyeInvisible size={20} />
                                            ) : (
                                                <AiOutlineEye size={20} />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className='buttonsdiv'>
                        <Button type='submit' className='signbtn' variant='contained' >Kaydol</Button>
                    </div>
                    <span onClick={() => navigate("/login")} className='haveaccount'>Zaten hesabın var mı?</span>
                </div>

            </form>
        </div>
    )
}

export default RegisterPage
