import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../assets/css/style.css'

function RecipeCardComp(props) {
  return (
    <div>
        <Card className='recipe-card' style={{width:'18rem',textDecoration:'none'}} as={Link} to={props.dest}>
            <Card.Img src={props.image} style={{padding:'10px',borderRadius:'10px',height:'180px',objectFit:'cover',objectPosition:'center'}}></Card.Img>
            <Card.Body>
                <Card.Title style={{color:'#390F0F',textAlign:'center'}}>{props.recipeName}</Card.Title>
                <Card.Text>{props.recipeDescription}</Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default RecipeCardComp