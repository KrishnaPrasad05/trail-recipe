import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../assets/css/style.css'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
function Header() {
  const navigate = useNavigate()
  const handleNavigate=(recipeType)=>{
    navigate('/view-all-recipe',{state:{recipeType:recipeType}})

}
  return (
    <div style={{position:'fixed',width:'100%',zIndex:10000}}>
 <Navbar expand="lg"  className='custom-header'>
      <Container fluid>
        <Navbar.Brand className='custom-text' href="#home">Recipe Writings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-light' />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto" >
            <Nav.Link className='custom-text' href="/" >Home</Nav.Link>
            <Nav.Link className='custom-text' href="/#about-us">About Us</Nav.Link>
            <Nav.Link className='custom-text' href="/#add-recipe">Add recipe</Nav.Link>
            <NavDropdown  title={<span className='custom-text'>Recipes</span>} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>handleNavigate("Indian Curries")}>Indian Curries</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleNavigate("South Indian Meals")}>
                South Indian Meals
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleNavigate("Biriyani Recipe")}>Popular Biriyani</NavDropdown.Item>
             
              <NavDropdown.Item onClick={()=>handleNavigate("Chettinad Recipe")}>
                Chettinadu Recipes
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleNavigate("Indo-Chinese Recipe")}>
                Indo-Chinese Recipes
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className='custom-text' href="/#contact-us">Contact Us</Nav.Link>
          </Nav>
          <Button as={Link} to="/login" style={{backgroundColor:'#F5E6A7',border:0,color:'#390F0F',fontWeight:600}}>Log in</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
   
  );
}

export default Header;