import React from 'react'
import './Product.scss'
import Products from '@/app/Data/Products.json'

const Product = () => {

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
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Product