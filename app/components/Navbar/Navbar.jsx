'use client';
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, loginSucess } from '@/app/Redux/auth';
import './Navbar.scss';
import axios from 'axios';

const Navbar = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.showForm);
    console.log(isAuthenticated)
    console.log(user)
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
                        <FiSearch className='text-3xl' />
                        <img src="/shopping-cart.png" alt="" />
                        {/* <FaRegHeart className='text-2xl' /> */}
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
