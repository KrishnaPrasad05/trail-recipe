import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, Modal, Form, Container, Row, Col, Card, CardHeader, CardBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../GlobalStateContext';
import RecipeCardComp from '../components/RecipeCardComp';
import HeaderLogged from '../layout/HeaderLogged';
import Header from '../layout/Header';
import Footer from '../layout/Footer';


function Profile() {
  const [id, setId] = useState('');
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    dob: '',
    profilePic: ''
  });
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { globalState, setGlobalState } = useGlobalState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nav,setNav] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setNav(true)
    }
  }, []);
 

  useEffect(() => {
    const storedId = localStorage.getItem('identity');
    setId(storedId);
    console.log("id", storedId);
  }, []);

  useEffect(() => {
    if (id) {
      fetchProtected();
      fetchUser();
    }
  }, [id]);

  const fetchProtected = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setFormData(data);
      } else {
        console.log('Failed to fetch protected data');
      }
    } catch (err) {
      console.log('Something went wrong in protected', err);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`);
      
      if (response.ok) {
          const data = await response.json();
        setUser(data);
        setFormData(data)
      } else {
        console.log('Failed to fetch protected data');
      }
    } catch (err) {
      console.log('Something went wrong in user',err);
    }
  };

  useEffect(()=>{
    fetchRecipe()
  },[user.email])

  const fetchRecipe = async () => {
    try {
      console.log(user.email)
      const response = await fetch(`http://localhost:5000/api/recipes?email=${user.email}`);
      
      if (response.ok) {
          const data = await response.json();
        setRecipes(data);
      } else {
        console.log('Failed to fetch protected data');
      }
    } catch (err) {
      console.log('Something went wrong in user',err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('User updated');
        handleClose();
        fetchUser();
      } else {
        console.log('Error updating user');
      }
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('identity');
    setGlobalState((prevState) => ({ ...prevState, isLoggedIn: false }));
    console.log(globalState)
    navigate('/login');
  };

  return (
    <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh'}}>
      {nav ? <HeaderLogged/> : <Header/>}
      <Container style={{paddingTop:'4rem'}}>
        <Row className='mt-2'>
          <Col sm={12} md={12} xl={4} xxl={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='p-1'>
          <Image src={user.profilePic} style={{width:'400px',height:'200px',padding:'10px'}} fluid/>
          </Col>
          <Col xxl={8} xl={8} md={12} sm={12}>
          <Row>
            <Col>
            <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px',marginBottom:'10px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Name</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{user.name}</CardBody>
                </Card>
            </Col>
            <Col>
            <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px',marginBottom:'10px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Phone number</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{user.phoneNumber}</CardBody>
                </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px',marginBottom:'10px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Name</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{user.email}</CardBody>
                </Card>
            </Col>
            <Col>
            <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px',marginBottom:'10px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Phone number</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{user.dob}</CardBody>
                </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px',marginBottom:'10px'}}>
                <Button style={{backgroundColor:'#390F0F',border:0,color:'#F0DE97'}} onClick={handleShow}>
        Update Profile
      </Button>
                </Card>
            </Col>
            <Col>
            <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px'}}>
                <Button style={{backgroundColor:'#390F0F',border:0,color:'#F0DE97'}} onClick={handleLogout}>
        Logout
      </Button>
                </Card>
            </Col>
          </Row>
          </Col>
        
        </Row>
      </Container>

      <h2 className='text-center mt-3'>Your recipes</h2>
      <Container className='pb-5'>
                <Row>
                  
                {recipes.map((recipe) => (
                    <Col className='m-2'>
                   
                <RecipeCardComp
                    key={recipe._id}
                    dest={`/your-recipe/${recipe._id}`}
                    image={recipe.recipePicture1}
                    recipeName={recipe.recipeName}
                    recipeDescription={recipe.recipeDescription ? `${recipe.recipeDescription.substring(0, 200)} ...` : ''}
                />
          
                    </Col>
                      )) }
                </Row>
            </Container>

      
<Footer/>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phoneNumber" placeholder="Enter phone number" value={formData.phoneNumber} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dob" placeholder="Enter date of birth" value={formData.dob} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicProfilePic">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control type="text" name="profilePic" placeholder="Enter profile picture URL" value={formData.profilePic} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate(user._id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
