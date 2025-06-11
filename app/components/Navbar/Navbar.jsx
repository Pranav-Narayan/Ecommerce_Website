'use client';
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, loginSucess, openSignup, logout } from '@/app/Redux/auth';
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from "next/navigation";
import Link from "next/link";
import './Navbar.scss';
import axios from 'axios';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.showForm);
    const [showSearch, setShowSearch] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [user_name, setUsername] = useState("")
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('/api/auth/isAuthenticated');
                if (res.data.isAuthenticated) {
                    dispatch(loginSucess({ user: res.data.user }));
                }
            } catch (error) {
                console.log("Auth check failed");
            }
        };

        checkAuth();
    }, [dispatch]);

    const onLogout = async () => {
        try {
            await axios.get('api/auth/logout')
            console.log("Logout Successfull..")
            dispatch(logout())
            alert("Logout Successfull")
            router.push('/')
        } catch (error) {
            console.log("Error in Logout API call")
        }
    }

    useEffect(() => {
        const getInfo = async () => {
            const response = await axios.get("api/auth/myinfo")
            const USER = response.data.Data
            setUsername(USER.Username)
        }
        if (isAuthenticated) {
            getInfo();
        } else {
            setUsername("");
        }

    }, [isAuthenticated])

    return (
        <nav className="navbar">
            <div className="logo">
                <a href="/"><img src="./shopinglogo.png" alt="Logo" /></a>
            </div>
            <div className="navlinks">
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="">Contact</a>
                <a href="">Reviews</a>
            </div>
            <div className="auth">
                <div className='profile'>
                    <AnimatePresence>
                        {showSearch && (
                            <motion.div
                                key="searchbar"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="searchbar"
                            >
                                <input type="text" placeholder="Search Product name" />
                                <IoClose className="close" onClick={() => setShowSearch(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {!showSearch && <FiSearch className='text-3xl' onClick={() => setShowSearch(true)} />}
                    <img src="/shopping-cart.png" alt="" />
                    <div className="user"
                        onMouseEnter={() => setDropDown(true)}
                        onMouseLeave={() => setDropDown(false)}
                    >
                        <img src="/user.png" alt="" />
                        {dropDown && (
                            <div className="user-links">
                                {isAuthenticated ? (
                                    <>
                                        <div className="Namelink">
                                            <span>Hello,{user_name}</span>
                                        </div>
                                        <div className="link"
                                            onClick={() => router.push('/profile')}
                                        >
                                            <span>My Profile</span>
                                        </div>
                                        <div className="link">
                                            <span>Enquiries</span>
                                        </div>
                                        <div className="link">
                                            <span>Contactus</span>
                                        </div>
                                        <div className="link" onClick={onLogout}>
                                            <span>Logout</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="link">
                                            <span onClick={() => dispatch(openLogin())}>Login</span>
                                        </div>
                                        <div className="link">
                                            <span
                                                onClick={() => dispatch(openSignup())}
                                            >SignUp</span>
                                        </div>

                                    </>
                                )}

                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="responsive">
                <HiBars3BottomRight className="bar" />
            </div>
        </nav>
    );
};

export default Navbar;
