import React from 'react'
import { Carousel } from 'antd';
import img1 from '../../images/img1.png'
import img2 from '../../images/img2.png'
import img3 from '../../images/img3.png'


export default function Carousel1() {
    
  return (
    <div>
      <Carousel autoplay>
            <div>
              <h3><img src={img1} style={{
                maxHeight:"20vw",
                width:"100vw",
                objectFit:"cover"
              }}alt="ecommerce" /></h3>
            </div>
            <div>
              <h3><img src={img2} style={{
                maxHeight:"20vw",
                objectFit:"cover",
                width:"100vw",

              }} alt="ecommerce" /></h3>
            </div>
            <div>
              <h3><img src={img3} style={{
                maxHeight:"20vw",
                objectFit:"cover",
                width:"100vw",

              }} alt="ecommerce" /></h3>
            </div>
            
          </Carousel>
    </div>
  )
}
