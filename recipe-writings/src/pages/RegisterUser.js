import React, { useState } from 'react'
import { Button, Col, Container, Form, Row,Modal, Image } from 'react-bootstrap'
import '../assets/css/style.css'
import pic from '../assets/image/register.png'
import { Link } from 'react-router-dom';
function RegisterUser() {
    const [formData,setFormData]= useState({
        name:'',
        profilePic:'',
        dob:'',
        email:'',
        phoneNumber:'',
        password:'',
        confirmPassword:''
    })
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState('');
    const [type,SetType]=useState('password')
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData)
        try{
            const response = await fetch('http://localhost:5000/api/users/user',{
                method:'POST',
                headers:{'content-type': 'application/json'},
                body:JSON.stringify(formData)
            })

            const data = await response.json()
            if(response.ok){
                setMessage(data.message)
                setPage('/login')
                setShowModal(true)
                
                setFormData({
                    name:'',
                    profilePic:'',
                    dob:'',
                    email:'',
                    phoneNumber:'',
                    password:'',
                    confirmPassword:''
                })
            }
            else{
                setMessage(data.message)
                setPage('/register-user')
                setShowModal(true)
            }
        }
        catch(error){
            console.log("Error",error)
        }
    }

    const handleCloseModal = () => setShowModal(false);
    const handleSignIn = () =>{
         setShowModal(false);
         window.location.href=`${page}`
    }

    const handleShowPassword = (e)=>{
        SetType(e.target.checked ? 'text' : 'password')
    }
  return (
    <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh'}}>
        <h1 style={{paddingTop:'3rem',textAlign:'center',paddingBottom:'3rem'}}>Recipe Writings</h1>
        <Container >

            <Row style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Col>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control id='formBg' type="text" value={formData.name} name='name'  onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
                <Row>
                    <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control id='formBg' type="text" value={formData.profilePic} name='profilePic'  onChange={handleChange} placeholder="Enter profile picture url" />
                </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label>DOB</Form.Label>
                    <Form.Control id='formBg' type="date" value={formData.dob} name='dob'  onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control id='formBg' type="text" value={formData.email} name='email'  onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3" >
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control id='formBg' type="text" value={formData.phoneNumber} name='phoneNumber'  onChange={handleChange} placeholder="Enter phone number" />
                </Form.Group>
                    </Col>
                </Row>
                
               <Row>
                <Col>
                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control id='formBg' type={`${type}`} value={formData.password} name='password'  onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control id='formBg' type={`${type}`} value={formData.confirmPassword} name='confirmPassword'  onChange={handleChange} placeholder="Enter name" />
                </Form.Group>
                </Col>
               </Row>
               <Form.Group className="mb-3 custom-switch" >
                    <Form.Check id='formBg' type="switch"  label="Show Password" onChange={handleShowPassword}/>
                </Form.Group>
                
                
                <Button style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} type="submit" >
                    Submit
                </Button>
                </Form>
                </Col>
                <Col style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Image src={pic} style={{width:'300px',height:'300px'}}/>
                </Col>
            </Row>
        </Container>

        <Container style={{marginTop:'7rem'}}>
                <Row style={{borderTop:'1px solid black',paddingBottom:'20px'}}>
                    <Col className='mt-3'>
                    <p>&copy;2025 RecipeWritings.com | All Rights Reserverd</p>
                    </Col>
                    <Col className='mt-3'>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <p>About us</p>
                        <p>Blogs</p>
                        <p>Resources</p>
                        <p>Site map</p>
                    </div>
                    </Col>
                </Row>
            </Container>



        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton style={{backgroundColor:'#F0DE97',borderBottomColor:'black',borderWidth:'1px'}}>
                <Modal.Title>Comment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body closeButton style={{backgroundColor:'#F5E6A7',borderBottomLeftRadius:'7px',borderBottomRightRadius:'7px'}}>
                {message}
            </Modal.Body>
            <Modal.Footer style={{backgroundColor:'#F0DE97'}}>
                <Button style={{ backgroundColor: '#390F0F', color: '#F0DE97', border: 0 }} onClick={handleSignIn} >
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default RegisterUser