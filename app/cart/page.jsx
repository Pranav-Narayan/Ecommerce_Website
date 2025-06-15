'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


const page = () => {

    const { LoginUser } = useSelector((state) => state.showForm)
    console.log("Login user ===", LoginUser)
    const [myCart, setMyCart] = useState([])
    useEffect(() => {
        const fetchCart = async () => {
            if (!LoginUser._id) return;
            console.log("Calling trycatch")
            try {
                const response = await axios.post('/api/cart/CartData', {
                    userId: LoginUser._id
                });
                const { cartCount } = response.data;
                console.log("Cart count====", cartCount)


            } catch (err) {
                console.error("Failed to Load cart from DB", err);
            }
        };
        fetchCart();
    }, [!LoginUser]);

    console.log("Mycart ===", myCart)

    return (
        <div>
            cart page
        </div>
    )
}

export default page