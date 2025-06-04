'use client'
import React, { useEffect, useState } from 'react'
import { FaGoogle, FaApple, FaFacebookF, FaEyeSlash, FaEye } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { closeSignup, openLogin } from '@/app/Redux/auth'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import './Signup.scss'

const Signup = () => {

    const router = useRouter()

    const { showSignup } = useSelector((state) => state.showForm)
    const dispatch = useDispatch()

    const [user, setUser] = useState({ Username: "", Email: "", Password: "" })

    const [enableSignup, setEnableSignup] = useState(false);
    useEffect(() => {
        if (user.Username.length > 1 & user.Email.length > 0 && user.Password.length > 1) {
            setEnableSignup(false)
        }
        else {
            setEnableSignup(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            const response = await axios.post("api/auth/signup", user)
            console.log("Signup Success")
            setUser({ Username: "", Email: "", Password: "" });
            alert('Signup Successfull..')
            dispatch(openLogin())
        } catch (error) {
            console.log("Signup Failed", error.message)
        }
    }

    const [passwordVisible, setPasswordVisible] = useState(false);
    const showPassword = () => {
        setPasswordVisible(!passwordVisible)
    }



    return (
        <AnimatePresence>
            {showSignup && (
                <motion.div className='Signup'
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="form">
                        <div className="closeicon" onClick={() => dispatch(closeSignup())}>
                            <RiCloseLargeLine className='text-2xl' />
                        </div>
                        <h1>Signup</h1>
                        <div className="Username">
                            <label htmlFor="username">Username</label>
                            <input type="text" id='username' name='username'
                                value={user.Username}
                                onChange={(e) => setUser({ ...user, Username: e.target.value })}
                            />
                        </div>
                        <div className="Email">
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' name='email'
                                value={user.Email}
                                onChange={(e) => setUser({ ...user, Email: e.target.value })}
                            />
                        </div>
                        <div className="Password">
                            <label htmlFor="passwordbox">Password</label>
                            <div className="passwordBox" id='passwordbox'>
                                <input type={passwordVisible ? "text" : "password"} name='password'
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
                        <button className={`${enableSignup ? "disabled" : ""}`} onClick={onSignup}
                        >Signup</button>
                        <div className='verify'>
                            <p onClick={() => dispatch(openLogin())}
                            >Already have Account</p>
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

export default Signup