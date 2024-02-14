import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <div className='footer'>
        <h5 className='text-center'>&copy; Copyright Shopify</h5>
        <p className='text-center mt-3 margin0' >
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
        </p>

      </div>
    </>
  )
}
