import React from 'react'
import Link from 'next/link'
import './Navbar.scss'

const ProdNavbar = () => {
    return (
        <nav>
            <Link className='links' href="">For You</Link>
            <Link className='links' href="">Men</Link>
            <Link className='links' href="">Women</Link>
            <Link className='links' href="">Kids</Link>
            <Link className='links' href="">Collections</Link>
            <Link className='links' href="">Gifting</Link>
        </nav>
    )
}

export default ProdNavbar