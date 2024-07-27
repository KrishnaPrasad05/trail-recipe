import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Image, Modal, CardHeader, CardBody } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../assets/css/style.css';
import hyder2 from '../assets/image/biriyani2.webp';
import HeaderLogged from '../layout/HeaderLogged';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

function RecipeDetailsComp() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({
        ingredients: [],
        directions: []
    });
    const [nav,setNav] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setNav(true)
    }
  }, []);
    const [comments, setComments] = useState([]);
    const [showBlock, setShowBlock] = useState('block');
    const [newComment, setNewComment] = useState({ userName: '', comment: '' });
    const [showModal, setShowModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    useEffect(() => {
        fetchRecipe();
        fetchComments();
    }, [id]);

    const fetchRecipe = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
            if (response.ok) {
                const data = await response.json();
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
            const response = await fetch(`http://localhost:5000/api/recipe/${id}/comment`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
                setShowBlock('none');
            } else {
                console.error('Failed to fetch comments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment({ ...newComment, [e.target.name]: e.target.value });
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            });
            if (response.ok) {
                fetchComments();
                setShowBlock('none')
                setNewComment({ userName: '', comment: '' });
            } else {
                console.error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCommentClick = (comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div style={{backgroundColor:'#F5E6A7'}}>
             {nav ? <HeaderLogged/> : <Header/>}
<Container className='pb-5'>
            <Row><h1 style={{textAlign:'center',color:'#390F0F',paddingTop:'5rem'}}>{recipe.recipeName}</h1></Row>
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
                <Col  xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h3 style={{color:'#390F0F'}}>Drop your comment</h3>
                    <Form onSubmit={handleCommentSubmit} className='w-75 mt-3' >
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                            id='formBg'
                                type="text"
                                name="userName"
                                value={newComment.userName}
                                onChange={handleCommentChange}
                                required
                                
                            />
                        </Form.Group>
                        <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                            id='formBg'
                                as="textarea"
                                rows={3}
                                name="comment"
                                value={newComment.comment}
                                onChange={handleCommentChange}
                                required
                                
                            />
                        </Form.Group>
                        <Button className='mt-2' type="submit" style={{backgroundColor:'#390F0F',color:'white',border:0}}>Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row className='mt-4'>
            
            <Container className="scrollable-container mb-3" >
            <h3>Comments</h3>
            <p style={{display:`${comments.length > 0 ? 'none' : 'block'}`}}>No comments found</p>
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
                    </Container>
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
        </Container>
        <Footer/>
        </div>
        
    );
}

export default RecipeDetailsComp;
