import React from 'react'
import { Container, Row,Form,Col, Button, Image } from 'react-bootstrap'
import '../assets/css/style.css'
import insta from '../assets/image/social/instagram.png'
import face from '../assets/image/social/facebook.png'
import thread from '../assets/image/social/threads.png'
import reddit from '../assets/image/social/reddit.png'
function Footer() {
  return (
    <div>
        <Container fluid style={{backgroundColor:'#390F0F',paddingTop:'15px'}}>
            <Row>
                <Col sm={12} md={6} xl={6} xxl={3} >
                <div >
                    <h5 style={{color:'#F0DE97'}}>RecipeWritings</h5>
                <p style={{textAlign:'justify',color:'#F5E6A7'}}>At RecipeWritings, our mission is to inspire and empower home cooks of all levels. Whether you're a seasoned chef or a beginner, our diverse collection of recipes, tips, and guides is designed to help you create delicious and memorable meals.</p>
                </div>
                
                </Col>
                <Col sm={12} md={6} xl={6} xxl={3}>
                <div>
                <h5 style={{color:'#F0DE97'}}>Services</h5>
                    <ul style={{lineHeight:'35px',color:'#F5E6A7'}}>
                    <li>About Us - content to be made</li>
                <li>Contact Us- content to be made</li>
                <li>Blogs- content to be made</li>
                <li>Resources- content to be made</li>
                <li>Site Map- content to be made</li>
                    </ul>
                
                </div>
                
                </Col>
                <Col sm={12} md={6} xl={6} xxl={3}>
                <h5 style={{color:'#F0DE97'}}>Recipes</h5>
                <div style={{color:'#F5E6A7'}}>
                <p>Indian Curries</p>
                <p>Popular Biriyani</p>
                <p>South Indian Meals</p>
                <p>Chettinad Recipes</p>
                <p>Indo-Chinese</p>
                </div>
                
               
                </Col>
                <Col sm={12} md={6} xl={6} xxl={3}>
                <h5 style={{color:'#F0DE97'}}>Leave us a comment</h5>
                <div >
                <Form className='w-75'>
                    
               
        <Form.Control className='mb-2'  id='formBg' type="text"  name='name'  placeholder="Your name" />
        <Form.Control className='mb-2' id='formBg' as="textarea" rows={3}  name='name'  placeholder="Your name" />
     
      <Button style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} type="submit" >
        Submit
      </Button>
                </Form>
                </div>
               
                </Col>
            </Row>
            <Row>
                <Col>
                <p style={{wordSpacing:'10px',letterSpacing:'3px',textAlign:'center',color:'#F5E6A7'}}>&copy;2025 RecipeWritings.com | All rights reserved</p>
                </Col>
                <Col>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'75%'}}>
                <Container>
                    <Row>
                        <Col xxl={4} md={4}>
                        <p style={{color:'#F5E6A7'}}>Follow Us on </p>
                        </Col>
                        <Col xxl={8} md={8}>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                    
                    <Image src={insta} style={{width:'25px',height:'25px'}} />
                    <Image src={face} style={{width:'25px',height:'25px'}} />
                    <Image src={thread} style={{width:'25px',height:'25px'}} />
                    <Image src={reddit} style={{width:'25px',height:'25px'}} />
                </div>
                        </Col>
                    </Row>
                   
                </Container>
                </div>
                
                
                </Col>
                <Row className='text-center'>
              <p style={{textAlign:'center',color:'#cccccc'}}>Designed by <a target='_blank' href='https://www.linkedin.com/in/krishnaprasad-srinivasan' style={{color:'#F0DE97',fontWeight:600}}>KRISHNA PRASAD S</a></p>
            </Row>
            </Row>
        </Container>
    </div>
  )
}

export default Footer