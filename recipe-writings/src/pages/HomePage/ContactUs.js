import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import contactus from '../../assets/image/Contact us.png'
import { Link } from 'react-router-dom'
function ContactUs() {
    const [formData, setFormData]=useState({
        contactName:'',
        contactEmail:'',
        contactContent:''
    })

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response= await fetch('http://localhost:5000/api/contactus',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(formData)
            })
            const data = await response.json()

            if(response.ok){
                console.log(data.message)
                setFormData({
                    contactName:'',
                    contactEmail:'',
                    contactContent:''
                })
            }
            else{
                console.log(data.message)
            }

        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <section >
    <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',paddingTop:'2rem'}}>
        <Container>
            <Row>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6}>
                <div>
                <h2>Contact Us</h2>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Name</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.contactName} name='contactName' onChange={handleChange} placeholder="Enter youtube video link" />
      </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Email adress</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.contactEmail} name='contactEmail' onChange={handleChange} placeholder="Enter youtube video link" />
      </Form.Group>
                <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Message</Form.Label>
        <Form.Control id='formBg' as="textarea" rows={4}  value={formData.contactContent} name='contactContent' onChange={handleChange} placeholder="Enter youtube video link" />
      </Form.Group>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Button type='submit' style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} >
                    Add Recipe
                </Button>
                </div>
                </Form>
                </div>
                
                </Col>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div >
                <Image src={contactus} fluid style={{width:'450px',height:'450px',padding:'20px'}}/>
                </div>
                
                </Col>
            </Row>
        </Container>
    </div>
    </section>

  )
}

export default ContactUs