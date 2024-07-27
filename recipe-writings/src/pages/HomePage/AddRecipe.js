import React from 'react'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import recipebook from '../../assets/image/Recipe-Book-2.png'
import { Link } from 'react-router-dom'
function AddRecipe() {
  return (
    <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Container>
            <Row>
            <h2 className='text-center'>Add your Recipe</h2>
            <Col sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div >
                <Image src={recipebook} fluid width="500px" height="500px" style={{padding:'20px'}}/>
                </div>
                
                </Col>
                <Col sm={12} md={12} lg={6} xl={6} xxl={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <div>
                
                <p>Showcase your cooking talents to the world by adding your recipe to RecipeWritings! Share your unique creations, inspire fellow food enthusiasts, and be part of our vibrant community. Your recipe could become someone's new favorite dish.</p>
                <p>Adding a recipe is simple: start with a catchy title, list all ingredients with precise measurements, and provide clear, step-by-step instructions. Don't forget to include the preparation and cooking time, and the number of servings. Upload high-quality photos of your dish to visually guide others, and add any helpful tips or notes to ensure success.</p>
                <p>Join us in celebrating the joy of cooking and make a delicious impact on our community. By sharing your recipes, you contribute to a diverse and dynamic collection of culinary delights, helping others discover new flavors and techniques. Let's cook, create, and connect together!</p>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Button as={Link} to="/add-recipe" style={{backgroundColor:'#390F0F',color:'#F0DE97',border:0}} >
                    Add Recipe
                </Button>
                </div>
                
                </div>
                
                </Col>
                
            </Row>
        </Container>
    </div>
  )
}

export default AddRecipe