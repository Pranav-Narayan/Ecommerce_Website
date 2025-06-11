import React from 'react'
import { ProdNavbar, Product } from '../components'

const page = () => {
    return (
        <div className='productPage'>
            <ProdNavbar />
            <Product />
        </div>
    )
}

export default page