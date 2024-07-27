import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Nav, Row, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import HeaderLogged from '../layout/HeaderLogged';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function AddRecipeForm() {
    const [formData, setFormData]=useState({
        recipeName:'',
        recipePicture1:'',
        recipePicture2:'',
        postedBy:'',
        recipeDescription:'',
        preparationTime:'',
        cookingTime:'',
        servings:'',
        ingredients:'',
        directions:'',
        youtubeLink:'',
        recipeType:'',
        email:''
    })
    const [message, setMessage] = useState('');
   
    const navigate = useNavigate()
    
    const [nav,setNav] = useState(false)
    useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        setNav(true)
      }
    }, []);


   
    useEffect(() => {
      const fetchProtected = async () => {
        try {
          const token = localStorage.getItem('token');
          
          const response = await fetch('/api/users/protected', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.text();
          if (response.ok) {
            setMessage(data);
          } else {
            setMessage('Failed to fetch protected data');
          }
        } catch (err) {
          setMessage('Something went wrong');
        }
      };
  
      fetchProtected();
    }, []);
  


    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const ingredientsArray = formData.ingredients.split(',').map(ing => ing.trim());
        const directionsArray = formData.directions.split(',').map(dir => dir.trim());
    const updatedFormData = { ...formData, ingredients: ingredientsArray,directions:directionsArray };
        console.log(updatedFormData)
        try{
            const response= await fetch('http://localhost:5000/api/recipes/recipe',{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(updatedFormData)
            })
            const data = await response.json()

            if(response.ok){
                console.log(data.message)
                setFormData({
                    recipeName:'',
        recipePicture1:'',
        recipePicture2:'',
        postedBy:'',
        recipeDescription:'',
        preparationTime:'',
        cookingTime:'',
        servings:'',
        ingredients:'',
        directions:'',
        youtubeLink:'',
        recipeType:'',
        email:''
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


    const [activeTab, setActiveTab] = useState('tab1');

    const handleSelect = (eventKey) => {
      setActiveTab(eventKey);
    };

    
  return (
    <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh'}}>
      
      {nav ? <HeaderLogged/> : <Header/>}
      <h1 style={{textAlign:'center',color:'#390F0F',paddingTop:'5rem',paddingBottom:'1rem'}}>Add your recipe</h1>
          
            <Form onSubmit={handleSubmit} autoComplete='off' className='pb-5'>
            <Container style={{backgroundColor:'#F0DE97',padding:'10px',borderRadius:'10px',border:'1px solid black',boxShadow:'3px 3px 5px grey'}}>
            
            <Tab.Container defaultActiveKey="tab1" >
      <Nav fill variant="pills" style={{color:'black',padding:'10px'}} onSelect={handleSelect}>
        <Nav.Item style={{color:'black'}}>
          <Nav.Link eventKey="tab1" style={{ backgroundColor: activeTab === 'tab1' ? '#390F0F' : '#F0DE97', color: activeTab === 'tab1' ? '#F0DE97' : '#390F0F' }}>Personal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tab2" style={{ backgroundColor: activeTab === 'tab2' ? '#390F0F' : '#F0DE97', color: activeTab === 'tab2' ? '#F0DE97' : '#390F0F' }}>Academic</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="tab1">
          <Container >
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Recipe type</Form.Label>
                <Form.Select value={formData.recipeType} name='recipeType' onChange={handleChange} aria-label="recipe type" id='formBg'>
      <option>Open this select menu</option>
      <option value="Indian Curries">Indian Curries</option>
      <option value="South Indian Meals">South Indian Meals</option>
      <option value="Chettinad Recipe">Chettinad Recipe</option>
      <option value="Biriyani Recipe">Biriyani Recipe</option>
      <option value="Indian-Chinese Recipe">Indian-Chinese Recipe</option>
    </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Recipe name</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.recipeName} name='recipeName'  onChange={handleChange} placeholder="Enter recipe name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Posted by</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.postedBy} name='postedBy' onChange={handleChange} placeholder="Enter your name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Email</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.email} name='email' onChange={handleChange} placeholder="Email must be same used in profile" />
      </Form.Group>
      
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Recipe picture</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.recipePicture1} name='recipePicture1' onChange={handleChange} placeholder="Enter recipe picture" />
      </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Preparation time</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.preparationTime} name='preparationTime' onChange={handleChange} placeholder="Enter preparation time" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Cooking time</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.cookingTime} name='cookingTime' onChange={handleChange} placeholder="Enter cooking time" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Servings</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.servings} name='servings' onChange={handleChange} placeholder="Enter no of servings" />
      </Form.Group>
            </Col>
               
                </Row>
                <Row>
                  <Col>
                  <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Youtube Video</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.youtubeLink} name='youtubeLink' onChange={handleChange} placeholder="Enter youtube video link" />
      </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Recipe picture</Form.Label>
        <Form.Control id='formBg' type="text" value={formData.recipePicture2} name='recipePicture2' onChange={handleChange} placeholder="Enter recipe picture" />
      </Form.Group>
                  </Col>
   
     </Row>
          </Container>
          </Tab.Pane>
            <Tab.Pane eventKey="tab2">
              <Container>
              <Row>
     <Form.Group className="mb-3" controlId="recipeDescription">
        <Form.Label>recipe Description</Form.Label>
        <Form.Control id='formBg' as="textarea" rows={3} value={formData.recipeDescription} name='recipeDescription' onChange={handleChange} placeholder="Enter recipe description"/>
      </Form.Group>
     </Row>
     <Row>
     <Form.Group className="mb-3" controlId="Ingredients">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control id='formBg' as="textarea" rows={3} value={formData.ingredients} name='ingredients' onChange={handleChange} placeholder="Enter ingredients"/>
      </Form.Group>
     </Row>
     <Row>
     <Form.Group className="mb-3" controlId="Directions">
        <Form.Label>Directions</Form.Label>
        <Form.Control id='formBg' as="textarea" rows={3} value={formData.directions} name='directions' onChange={handleChange} placeholder="Enter directions"/>
      </Form.Group>
     </Row>
     
     <Button style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} type="submit" >
        Submit
      </Button>
              </Container>
            </Tab.Pane>
          </Tab.Content>
          </Tab.Container>
      </Container>
    </Form>
            
    <Footer/>
         

    </div>
  )
}

export default AddRecipeForm