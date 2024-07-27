import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import recipebook from '../../assets/image/Recipe-Book-3.png'
function AboutUs() {
  return (
    <div style={{backgroundColor:'#F5E6A7',display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'4rem'}}>
        <Container>
            <Row >
            <h2 className='text-center'>About Us</h2>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div>
                <p>Welcome to RecipeWritings!</p>
                <p>At RecipeWritings, our mission is to inspire and empower home cooks of all levels. Whether you're a seasoned chef or a beginner, our diverse collection of recipes, tips, and guides is designed to help you create delicious and memorable meals.</p>
                <p>RecipeWritings was founded out of a love for cooking and a desire to share that passion. We believe cooking is an art form, a way to bring people together, and a means of expressing creativity. Our crew started this journey to make high-quality recipes accessible to everyone. Today, RecipeWritings is a vibrant community of food enthusiasts who share a common love for good food and great company.</p>
                <p>We offer a wide range of recipes, from traditional favorites to modern twists, all carefully crafted and tested. Our expert tips and guides cover everything from basic techniques to advanced culinary skills. Join our community, share your own recipes, and find inspiration from others who are just as passionate about cooking.</p>
                <p>At RecipeWritings, we prioritize quality and authenticity, using fresh, high-quality ingredients to provide delicious and nutritious recipes. Thank you for being a part of our community. Let's cook together!</p>
                </div>
                
                </Col>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div >
                <Image src={recipebook} fluid />
                </div>
                
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default AboutUs