'use client'
import React, { useEffect, useState } from 'react'
import './Product.scss'
import Products from '@/app/Data/Products.json'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/app/Redux/cart'
import { openLogin } from '@/app/Redux/auth';
import axios from 'axios'

const Product = () => {

    const dispatch = useDispatch()
    const { cartList, cartCount } = useSelector((state) => state.cart)
    const { isAuthenticated } = useSelector((state) => state.showForm);
    const [user, setUser] = useState("")

    useEffect(() => {
        const getInfo = async () => {
            const response = await axios.get("api/auth/myinfo")
            const USER = response.data.Data
            setUser(USER)
        }
        if (isAuthenticated) {
            getInfo();
        } else {
            setUser("");
        }

    }, [isAuthenticated])


    const onAddtocart = async (item) => {
        if (isAuthenticated) {
            dispatch(addToCart(item));

            try {
                await axios.post('/api/cart/addToCart', {
                    userId: user._id,
                    cartItems: [item],
                    cartCount: 1
                });
            } catch (err) {
                console.error("Failed to sync new item to DB", err);
            }
        } else {
            dispatch(openLogin());
        }
    }


    return (
        <div className='Product'>
            <div className="left">

            </div>
            <div className="right">

                {Products.map(Product => (
                    <div className="item" key={Product.Id}>
                        <img src={Product.Image} alt="" className='productImg' />
                        <h2>{Product.Name}</h2>
                        <p>₹{Product.Price}</p>
                        <div className="rating">
                            <img src="star.png" alt="" />
                            <p>{Product.ratings}</p>
                            <img src="verified.png" alt="" />
                            <p>{Product.ratedBy}reviews</p>
                        </div>
                        <button
                            onClick={() => onAddtocart(Product)}
                        >Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product