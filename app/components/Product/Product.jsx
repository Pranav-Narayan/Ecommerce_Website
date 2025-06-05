import React from 'react'
import './Product.scss'

const Product = ({ style, image, Heading, Description }) => {
    return (
        <div className={`product ${style}`}>
            <div className="left">
                <img src={image} alt="" className='prod' />
            </div>
            <div className='right'>
                <h1>{Heading}</h1>
                <p>{Description}</p>
                <button>Buy Now</button>
            </div>
        </div>
    )
}

export default Product