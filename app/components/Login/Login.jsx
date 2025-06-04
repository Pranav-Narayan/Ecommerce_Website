'use client'
import React, { useState, useEffect } from 'react'
import { FaGoogle, FaApple, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { closeLogin, openSignup, isAuthenticated, loginSucess } from '@/app/Redux/auth';
import { motion, AnimatePresence } from "framer-motion";
import './Login.scss'
import axios from 'axios';

const Login = () => {

    const { showLogin } = useSelector((state) => state.showForm);
    const dispatch = useDispatch()

    const [passwordVisible, setPasswordVisible] = useState(false)
    const showPassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    const [user, setUser] = useState({ Username: "", Email: "", Password: "" })

    const [enableSignup, setEnableSignup] = useState(false);
    useEffect(() => {
        if (user.Email.length > 0 && user.Password.length > 0) {
            setEnableSignup(false)
        }
        else {
            setEnableSignup(true)
        }
    }, [user])

    const onLogin = async () => {
        try {
            const response = await axios.post('api/auth/login', user)
            console.log("Login Success")
            alert("Login Successfull")
            setUser({ Username: "", Email: "", Password: "" });
            dispatch(closeLogin())

            // Dispatch loginSucess with user data from response
            dispatch(loginSucess({ user: response.data.user }));
            setUser({ Username: "", Email: "", Password: "" });
            dispatch(closeLogin());

        } catch (error) {
            console.log("Login API error", error.message)
            alert("Login Failed..")
        }
    }

    return (
        <AnimatePresence>
            {showLogin && (
                <motion.div className='Login'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form">
                        <div className="closeicon" onClick={() => dispatch(closeLogin())}>
                            <RiCloseLargeLine className='text-2xl' />
                        </div>
                        <h1>Login</h1>
                        <div className="Email">
                            <label htmlFor="">Email</label>
                            <input type="email"
                                value={user.Email}
                                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                            />
                        </div>
                        <div className="Password">
                            <label htmlFor="">Password</label>
                            <div className="passwordBox">
                                <input type={passwordVisible ? "text" : "password"}
                                    value={user.Password}
                                    onChange={(e) => setUser({ ...user, Password: e.target.value })}
                                />
                                {passwordVisible ?
                                    (<FaEye className='showPassword' onClick={showPassword} />)
                                    :
                                    (<FaEyeSlash className='showPassword' onClick={showPassword} />)}
                            </div>
                            <p className={`debug ${!enableSignup ? "hidden" : ""}`}>*Please fill blank fields</p>
                        </div>

                        <button className={`${enableSignup ? "disabled" : ""}`} onClick={onLogin}>Login</button>
                        <div className='verify'>
                            <p
                                onClick={() => dispatch(openSignup())}
                            >Don't have Account</p>
                            <p>Forgot Password</p>
                        </div>
                        <div className='social'>
                            <FaGoogle className='text-2xl' />
                            <FaApple className='text-2xl' />
                            <FaFacebookF className='text-2xl' />
                        </div>
                    </div>
                </motion.div>
            )
            }
        </AnimatePresence >
    )
}

export default Login