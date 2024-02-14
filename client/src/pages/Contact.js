import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiPhoneCall, BiMailSend, BiSupport } from 'react-icons/bi'

export default function Contact() {
  return (
    <>
      <Layout title="Contact Us - RajKart">
        <div className="container">
          <div className="row contactus">
            <div className="col-md-6">
              <img className="image" src='https://burst.shopifycdn.com/photos/contact-us-phone.jpg?width=1200&format=pjpg&exif=1&iptc=1' alt="Contact Us" style={{ width: "100%" }} />
            </div>
            <div className="col-md-4 contactus">
              <h1 className="bg-dark p-2 text-white text-center image">CONTACT US</h1>
              <p className="text-justify mt-2">
                Any query and info about product feel free to call anytime we are 24X7 available
              </p>
              <p className="mt-3">
                <BiMailSend /> : mail@Shopify.com
              </p>
              <p className="mt-3">
                <BiPhoneCall /> : 012-3456789
              </p>
              <p className="mt-3">
                <BiSupport /> : 1800-0000-0000 (toll free)
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
