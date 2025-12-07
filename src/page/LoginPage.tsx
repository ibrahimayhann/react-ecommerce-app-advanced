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
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import loginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';

interface CheckUserResponse {
    result: boolean,
    currentUser: UserType | null
}

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkUser = (userList: UserType[], username: string, password: string): CheckUserResponse => {
        const response: CheckUserResponse = { result: false, currentUser: null }
        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true
                response.currentUser = user;
            }
        })
        return response;
    }

    const submit = async () => {

        try {
            dispatch(setLoading(true))
            const response: UserType[] = await loginPageService.login();
            if (response) {
                const checkUserResponse: CheckUserResponse = checkUser(response, values.username, values.password)
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    //kullanıcı adı ve şifre doğru kullanıcıyı içeri al
                    dispatch(setCurrentUser(checkUserResponse.currentUser))
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
                    navigate("/")
                } else {
                    toast.error("Username or password invalid")
                }
            }

        } catch (error) {
            toast.error("Giriş yapılamadı:" + error)
        } finally {
            dispatch(setLoading(false))
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
                        <Button type='submit' className='signbtn' variant='contained' >Giriş Yap</Button>
                    </div>

                </div>

            </form>
        </div>
    )
}
import { setCurrentUser, setLoading } from '../redux/appSlice';
import type { UserType } from '../types/Types';
import { boolean } from 'yup';
import { current } from '@reduxjs/toolkit';

export default LoginPage