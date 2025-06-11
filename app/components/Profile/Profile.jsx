'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoBagOutline } from "react-icons/io5";
import { FaHeart, FaIdCard } from "react-icons/fa";
import { MdLockOutline, MdOutlinePayment } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import Info from './Info/Info'
import './Profile.scss'

const Profile = () => {

    const { isAuthenticated, user } = useSelector((state) => state.showForm);
    const [LoginUser, setLoginUser] = useState(null)

    useEffect(() => {
        const getInfo = async () => {
            const response = await axios.get("api/auth/myinfo")
            const USER = response.data.Data
            setLoginUser(USER)
        }
        if (isAuthenticated) {
            getInfo();
        } else {
            setLoginUser("");
        }

    }, [isAuthenticated])

    return (
        <div className='myprofile'>
            <h1>My Account</h1>
            <div className="myinfo">
                <div className="left">
                    <div className="profilebox">
                        <div className='profileIcon'>{LoginUser?.Username?.slice(0, 2)}</div>
                        <div className="info">
                            <span>Hi,</span>
                            <h2>{LoginUser?.Username}</h2>
                        </div>
                    </div>
                    <div className="box">
                        <span><IoBagOutline /></span>
                        <span>My Orders</span>
                    </div>
                    <div className="box">
                        <span><FaHeart /></span>
                        <span>My Wishlist</span>
                    </div>
                    <div className="box">
                        <span><MdLockOutline /></span>
                        <span>Change Password</span>
                    </div>
                    <div className="box">
                        <span><FaIdCard /></span>
                        <span>My Details</span>
                    </div>
                    <div className="box">
                        <span><MdOutlinePayment /></span>
                        <span>Payment Methods</span>
                    </div>
                    <div className="box">
                        <span><GoSignOut /></span>
                        <span>SignOut</span>
                    </div>
                    <div className="box">
                        <span><IoBagOutline /></span>
                        <span>My Orders</span>
                    </div>
                    <div className="box">
                        <span><FaHeart /></span>
                        <span>My Wishlist</span>
                    </div>
                    <div className="box">
                        <span><MdLockOutline /></span>
                        <span>Change Password</span>
                    </div>
                    <div className="box">
                        <span><FaIdCard /></span>
                        <span>My Details</span>
                    </div>
                    <div className="box">
                        <span><MdOutlinePayment /></span>
                        <span>Payment Methods</span>
                    </div>
                    <div className="box">
                        <span><GoSignOut /></span>
                        <span>SignOut</span>
                    </div>
                </div>
                <div className="right">
                    {LoginUser && <Info user={LoginUser} />}
                </div>

            </div>
        </div>
    )
}

export default Profile