import React from 'react'
import home from '../../assets/image/home1.png'
import { Image } from 'react-bootstrap'
function Welcome() {
  return (
    <div>
        <Image src={home} fluid style={{width:'100%',maxHeight:'100vh',position:'relative',marginTop:'2rem'}}/>
        
    </div>
  )
}

export default Welcome