import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Image, Modal, CardHeader, CardBody,Nav,Tab } from 'react-bootstrap';

import '../assets/css/style.css';
import hyder2 from '../assets/image/biriyani2.webp';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';

function YourRecipeComp() {
    const {id} = useParams() // Store the id in state to keep it constant
    const [recipe, setRecipe] = useState({
        ingredients: [],
        directions: []
    });
    const [formData, setFormData] = useState({
        recipeName: '',
        recipePicture1: '',
        recipePicture2: '',
        postedBy: '',
        recipeDescription: '',
        preparationTime: '',
        cookingTime: '',
        servings: '',
        ingredients: '',
        directions: '',
        youtubeLink: '',
        recipeType: '',
        email: ''
    });
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ userName: '', comment: '' });
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        console.log("URL ",id)
        fetchRecipe();
        fetchComments();
      }, []); // Removed id from dependency array

    const fetchRecipe = async () => {
        try {
            console.log("recipe1:", id);
            const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
            if (response.ok) {
                const data = await response.json();
                setFormData(data);
                setRecipe(data);
            } else {
                console.error('Failed to fetch recipe');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchComments = async () => {
        try {
            console.log("comments1:", id);
            const response = await fetch(`http://localhost:5000/api/recipe/${id}/comment`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.href = "/profile";
            } else {
                console.log("Error deleting recipe");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [activeTab, setActiveTab] = useState('tab1');

    const handleSelect = (eventKey) => {
        setActiveTab(eventKey);
    };

     const handleSubmit = async (id) => {
        console.log(typeof formData.ingredients, formData.ingredients); // Log the type and value

        // Check if ingredients and directions are strings before splitting
        const ingredientsArray = Array.isArray(formData.ingredients)
            ? formData.ingredients
            : formData.ingredients.split(',').map((ing) => ing.trim());

        const directionsArray = Array.isArray(formData.directions)
            ? formData.directions
            : formData.directions.split(',').map((dir) => dir.trim());

        const updatedFormData = { ...formData, ingredients: ingredientsArray, directions: directionsArray };
        console.log(updatedFormData);

        try {
            const response = await fetch(`http://localhost:5000/api/recipe/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                setFormData({
                    recipeName: '',
                    recipePicture1: '',
                    recipePicture2: '',
                    postedBy: '',
                    recipeDescription: '',
                    preparationTime: '',
                    cookingTime: '',
                    servings: '',
                    ingredients: '',
                    directions: '',
                    youtubeLink: '',
                    recipeType: '',
                    email: '',
                });
                setShowUpdateModal(false);
                navigate('/profile')

            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }; 

    const handleUpdate = () => {
        setShowUpdateModal(true);
    };

    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);
    const handleUpdateCloseModal = () => setShowUpdateModal(false);

    return (
        <div style={{backgroundColor:'#F5E6A7'}}>
<Container>
            <Row><h1 style={{textAlign:'center',color:'#390F0F'}}>{recipe.recipeName}</h1></Row>
            <Row className='mt-2'>
                <Col xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Image src={recipe.recipePicture2} fluid style={{ width: '600px', height: '280px', padding: '10px',borderRadius:'1.5rem' }} />
                </Col>
                <Col xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'flex-start',flexDirection:'column',padding:'10px'}}>
                    <p style={{textAlign:'justify'}}>{recipe.recipeDescription}</p>
                    <p><strong>Posted By:</strong> {recipe.postedBy}</p>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col xxl={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='p-1'>
                <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Preparation Time</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{recipe.preparationTime}</CardBody>
                </Card>
                </Col>
                <Col xxl={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='p-1'>
                <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Cooking Time</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{recipe.cookingTime}</CardBody>
                </Card>
                </Col>
                <Col xxl={4} style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='p-1'>
                <Card style={{width:'18rem',borderColor:'black',borderWidth:'1px'}}>
                    <CardHeader style={{backgroundColor:'#390F0F',color:'white',textAlign:'center'}}>Servings</CardHeader>
                    <CardBody style={{backgroundColor:'#F0DE97',borderBottomRightRadius:'5px',borderBottomLeftRadius:'5px',textAlign:'center',height:'40px',display:'flex',justifyContent:'center',alignItems:'center'}}>{recipe.servings}</CardBody>
                </Card>
                </Col>
                
            </Row>
            <Row className='mt-4'>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6}>
                <h3 style={{color:'#390F0F',textAlign:'center'}}>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ing, index) => (
                            <li key={index}>{ing}</li>
                        ))}
                    </ul>
                </Col>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6}>
                <h3 style={{color:'#390F0F',textAlign:'center'}}>Directions</h3>
                    <ol>
                        {recipe.directions.map((dir, index) => (
                            <li key={index} style={{textAlign:'justify'}}>{dir}</li>
                        ))}
                    </ol>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col xxl={6}>
                <h3 style={{color:'#390F0F',textAlign:'center'}}>Video Guidance</h3>
                <div className="video-responsive" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <iframe width="90%"
                    height="250" src={recipe.youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
                </Col>
                {/* <Col  xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h3 style={{color:'#390F0F'}}>Drop your comment</h3>
                    <Form onSubmit={handleCommentSubmit} className='w-75 mt-3' >
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="userName"
                                value={newComment.userName}
                                onChange={handleCommentChange}
                                required
                                style={{backgroundColor:'#F0DE97',borderColor:'black',borderWidth:'1px'}}
                            />
                        </Form.Group>
                        <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="comment"
                                value={newComment.comment}
                                onChange={handleCommentChange}
                                required
                                style={{backgroundColor:'#F0DE97',borderColor:'black',borderWidth:'1px'}}
                            />
                        </Form.Group>
                        <Button className='mt-2' type="submit" style={{backgroundColor:'#390F0F',color:'white',border:0}}>Submit</Button>
                    </Form>
                </Col> */}
                <Col>
                <Container className="scrollable-container mb-3" >
            <h3>Comments</h3>
                        <div className="scrollable-card-group">
                            {comments.map(comment => (
                                <Card key={comment.id} className="card-item">
                                    <Card.Body>
                                        <Card.Title className='card-title'>{comment.userName}</Card.Title>
                                        <Card.Text>
                                            {comment.comment}
                                        </Card.Text>
                                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                                        <Button variant="primary" style={{backgroundColor:'transparent',border:0,textDecoration:'underline',color:'#390F0F'}} onClick={() => handleCommentClick(comment)}>View Comment</Button>
                                        </div>
                                       
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                        <div style={{marginTop:'1rem',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                        <Button style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} onClick={()=>handleUpdate()}>Update Recipe</Button>
                        <Button style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} onClick={()=>handleDelete(recipe._id)}>Delete Recipe</Button>
                        
                        </div>
                        
                    </Container>
                   
                </Col>
            </Row>
            <Row className='mt-4'>
            
           
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton style={{backgroundColor:'#F0DE97',borderBottomColor:'black',borderWidth:'1px'}}>
                <Modal.Title>Comment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body closeButton style={{backgroundColor:'#F5E6A7',borderBottomLeftRadius:'7px',borderBottomRightRadius:'7px'}}>
                {selectedComment && (
                    <div>
                        <p><strong>User:</strong> {selectedComment.userName}</p>
                        <p>{selectedComment.comment}</p>
                    </div>
                )}
            </Modal.Body>
           {/*  <Modal.Footer style={{backgroundColor:'#F0DE97'}}>
                <Button variant="secondary" onClick={handleCloseModal} >
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal>



         <Modal show={showUpdateModal} onHide={handleUpdateCloseModal} centered>
            <Modal.Header closeButton style={{backgroundColor:'#F0DE97',borderBottomColor:'black',borderWidth:'1px'}}>
                <Modal.Title>Comment Details</Modal.Title>
            </Modal.Header>
             <Modal.Body closeButton style={{backgroundColor:'#F5E6A7',borderBottomLeftRadius:'7px',borderBottomRightRadius:'7px'}}>
            <Form  autoComplete='off'>
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
     
     <Button style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} onClick={()=>handleSubmit(recipe._id)} >
        Submit
      </Button>
              </Container>
            </Tab.Pane>
          </Tab.Content>
          </Tab.Container>
      </Container>
    </Form>
            </Modal.Body> 
           {/*  <Modal.Footer style={{backgroundColor:'#F0DE97'}}>
                <Button variant="secondary" onClick={handleCloseModal} >
                    Close
                </Button>
            </Modal.Footer> */}
        </Modal> 
        </Container>
        </div>
        
    );
}

export default YourRecipeComp;
