'use client';
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, loginSucess } from '@/app/Redux/auth';
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.scss';
import axios from 'axios';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.showForm);
    const [showSearch, setShowSearch] = useState(false)

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

    return (
        <nav>
            <div className="logo">
                <img src="./shopinglogo.png" alt="Logo" />
            </div>
            <div className="navlinks">
                <a href="/">Home</a>
                <a href="/products">Products</a>
                <a href="">Contact</a>
                <a href="">Reviews</a>
            </div>
            <div className="auth">
                {isAuthenticated ? (
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
                        <img src="/user.png" alt="" />
                    </div>
                ) : (
                    <button onClick={() => dispatch(openLogin())}>Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
