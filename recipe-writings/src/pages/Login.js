import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form, Image } from 'react-bootstrap';
import pic from '../assets/image/login.png';
import { Link } from 'react-router-dom';
import AppContext, { useAuth, useGlobalState } from '../GlobalStateContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState('');
  const [type, SetType] = useState('password');

  
 
  const { globalState, setGlobalState } = useGlobalState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/login?email=${formData.email}&password=${formData.password}`);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data[1]);
        localStorage.setItem('identity', data[0]);
        console.log("ok")
        //setIsLoggedIn(true)
        setGlobalState(() => ({isLoggedIn: true }));
        console.log(globalState)
        setMessage('Login Successful');
        setPage('/');
        setShowModal(true);
        setFormData({
          email: '',
          password: '',
        });
      } else {
        setMessage(data.text);
        setPage('/login');
        setShowModal(true);
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleSignIn = () => {
    setShowModal(false);
    window.location.href = `${page}`;
  };

  const handleShowPassword = (e) => {
    SetType(e.target.checked ? 'text' : 'password');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#F5E6A7', minHeight: '100vh' }}>
      <h1 style={{ paddingTop: '4rem', textAlign: 'center', paddingBottom: '4rem' }}>Recipe Writings</h1>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row className="w-75">
          <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={pic} fluid style={{ width: '350px', height: '350px', padding: '20px', objectFit: 'fill' }} />
          </Col>
          <Col xxl={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control id="formBg" type="text" value={formData.email} name="email" onChange={handleChange} placeholder="Enter your email" />
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Password</Form.Label>
                <Form.Control id="formBg" type={type} value={formData.password} name="password" onChange={handleChange} placeholder="Enter your password" />
              </Form.Group>
              <Form.Group className="mb-3 custom-switch">
                <Form.Check id="formBg" type="switch" label="Show Password" onChange={handleShowPassword} />
              </Form.Group>
              <Button style={{ backgroundColor: '#390F0F', color: '#F0DE97', border: 0 }} type="submit">
                Submit
              </Button>
              <p>No account? Create one <Link to="/register-user" style={{ color: 'brown' }}>Register Now</Link></p>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: '7rem' }}>
        <Row style={{ borderTop: '1px solid black', paddingBottom: '20px' }}>
          <Col className="mt-3">
            <p>&copy;2025 RecipeWritings.com | All Rights Reserved</p>
          </Col>
          <Col className="mt-3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p>About us</p>
              <p>Blogs</p>
              <p>Resources</p>
              <p>Site map</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#F0DE97', borderBottomColor: 'black', borderWidth: '1px' }}>
          <Modal.Title>Login Status</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F5E6A7', borderBottomLeftRadius: '7px', borderBottomRightRadius: '7px' }}>
          {message}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F0DE97' }}>
          <Button style={{ backgroundColor: '#390F0F', color: '#F0DE97', border: 0 }} onClick={handleSignIn}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
