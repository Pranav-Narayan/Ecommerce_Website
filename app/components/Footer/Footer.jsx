import React from 'react'
import './Footer.scss'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='content one'>
                <h3>AR - SHAKIR</h3>
                <p>arshakir@gmail.com</p>
                <p>+458 843 5849</p>
                <div className='icons'>
                    <img src="instagram.png" alt="" />
                    <img src="linkedin.png" alt="" />
                    <img src="facebook.png" alt="" />
                    <img src="twitter.png" alt="" />
                </div>
            </div>
            <div className='content'>
                <h3>Blog</h3>
                <p>Company</p>
                <p>Career</p>
                <p>Mobile</p>
                <p>How it works</p>
            </div>
            <div className='content'>
                <h3>About</h3>
                <p>Contact</p>
                <p>About us</p>
                <p>FAQ</p>
                <p>Our Team</p>
                <p>Terms Of Service</p>
            </div>
            <div className='content'>
                <h3>Product</h3>
                <p>Terms Of Use</p>
                <p>Privacy Policy</p>
                <p>Login</p>
            </div>
            <img src="Footer_product.png" alt="" />
        </div>
    )
}

export default Footer