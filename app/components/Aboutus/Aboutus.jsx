import React from 'react'
import './Aboutus.scss'

const Aboutus = () => {
    return (
        <div className='Aboutus'>
            <div className="content">
                <div className='left'>
                    <h1>About Us</h1>
                    <p>Blended with warming notes of amber, cedar leaf, lemongrass, tonka bean and medjool date.</p>
                    <p>Made with moisturizing aloe, our 100% natural formula is organic, ultra-hydrating, and crafted for intimate comfort. The gentle, pH-balanced blend is free from glycerin and parabens, and carefully manufactured to match the body’s ideal osmolality—ensuring safety and comfort. Compatible with toys and condoms, it enhances intimacy while nourishing delicate skin with every use.Infused with nature’s finest ingredients, it supports your skin’s natural moisture barrier for lasting softness. Whether for solo moments or shared experiences, it brings comfort, care, and confidence every time. </p>
                    <div className='btn'>
                        <button>View More</button>
                    </div>
                </div>
                <div className='right'>
                    <img src="/Aboutus_image.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Aboutus