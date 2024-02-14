import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast';

export default function Layout(props) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <p className='gap'></p>

      <Toaster/>
      <main className='maxheight'>{props.children}</main>
      <p className='gap'></p>
      <Footer />
    </>
  )
}

Layout.defaultProps={
  title:"RajKart"
}
