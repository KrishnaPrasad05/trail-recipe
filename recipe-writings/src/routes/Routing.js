import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import RecipeDetailsComp from '../components/RecipeDetailsComp'
import ViewAllRecipes from '../pages/ViewAllRecipes';
import HomePage from '../pages/HomePage';
import AddRecipeForm from '../pages/AddRecipeForm';
import RegisterUser from '../pages/RegisterUser';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import YourRecipeComp from '../components/YourRecipeComp';
import Footer from '../layout/Footer';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};


function Routing() {
  return (
    <Router>
  <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route
          path="/add-recipe"
          element={
            <ProtectedRoute>
              <AddRecipeForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/view-all-recipe" element={<ViewAllRecipes/>}/>
        <Route path="/recipe-details/:id" element={<RecipeDetailsComp/>}/>
        <Route path="/your-recipe/:id" element={<YourRecipeComp/>}/>
        {/* <Route path="/add-recipe" element={<AddRecipeForm/>}/> */}
        <Route path="/register-user" element={<RegisterUser/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        
    </Routes>
    </Router>
  
  )
}

export default Routing