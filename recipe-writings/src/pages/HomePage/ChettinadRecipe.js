import React, { useEffect, useState } from 'react';
import RecipeCardComp from '../../components/RecipeCardComp';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useNavigation } from 'react-router-dom';

function ChettinadRecipe() {
    const [recipes, setRecipes] = useState([]);
    const [recipeType, setRecipeType] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        fetchRecipe();
    }, []); // Dependency array to ensure it runs only once

    const fetchRecipe = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/recipe?recipeType=Chettinad+Recipe');
            if (response.ok) {
                const data = await response.json();
                const limitedData = data.slice(0, 8);
                setRecipes(limitedData);
                // Set the recipeType of the first recipe as the heading
                if (limitedData.length > 0) {
                    setRecipeType(limitedData[0].recipeType);
                }
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.log("Internal server error", error);
        }
    };

    const handleNavigate=(recipeType)=>{
        navigate('/view-all-recipe',{state:{recipeType:recipeType}})

    }

    
    return (
        <div style={{backgroundColor:'#F5E6A7',minHeight:'100vh'}}>
           
                <h2 style={{textAlign:'center',paddingTop:'2rem'}}>{recipeType}</h2>
           
            <Container>
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
            </Container>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'10px'}}>
        <Button style={{outline:0,border:0,backgroundColor:'#390F0F'}} onClick={()=>handleNavigate(recipeType)}>View all</Button>
    </div>
          
         
        </div>
    );
}

export default ChettinadRecipe;
