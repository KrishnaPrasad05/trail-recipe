import React, { useEffect, useState } from 'react';
import RecipeCardComp from '../components/RecipeCardComp';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import recipegif from '../assets/image/Recipe book (2).gif'
import Header from '../layout/Header';
import HeaderLogged from '../layout/HeaderLogged';
import Footer from '../layout/Footer';

function ViewAllRecipes() {
    const location= useLocation()
    const { recipeType } = location.state || {}
    console.log(recipeType)
    const [recipes, setRecipes] = useState([]);
    const [nav,setNav] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setNav(true)
    }
  }, []);

    useEffect(() => {
        fetchRecipe();
    }, [recipeType]); // Dependency array to ensure it runs only once

    const fetchRecipe = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipe?recipeType=${recipeType}`);
            if (response.ok) {
                const data = await response.json();
                
                setRecipes(data);
                // Set the recipeType of the first recipe as the heading
                
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.log("Internal server error", error);
        }
    };
  return (
    <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh'}}>
           {nav ? <HeaderLogged/> : <Header/>}
    <h2 style={{textAlign:'center',paddingTop:'4.5rem'}}>{recipeType}</h2>

<Container className='pb-5'>
    <Row>
      
    {recipes.map((recipe) => (
        <Col className='m-2'>
       
    <RecipeCardComp
        key={recipe._id}
        dest={`/recipe-details/${recipe._id}`}
        image={recipe.recipePicture1}
        recipeName={recipe.recipeName}
        recipeDescription={recipe.recipeDescription ? `${recipe.recipeDescription.substring(0, 200)} ...` : ''}
    />

        </Col>
          ))}
    </Row>
    {/* <Image src={recipegif} style={{width:'400px',height:'400px'}} fluid/> */}
</Container>
<Footer/>
</div>
  )
}

export default ViewAllRecipes