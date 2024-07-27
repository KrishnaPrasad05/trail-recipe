import React, { useContext, useEffect, useState } from 'react'
import IndianCurries from './HomePage/IndianCurries'
import SouthIndianMeals from './HomePage/SouthIndianMeals'
import BiriyaniRecipe from './HomePage/BiriyaniRecipe'
import IndianChineseRecipe from './HomePage/IndianChineseRecipe'
import ChettinadRecipe from './HomePage/ChettinadRecipe'
import AboutUs from './HomePage/AboutUs'
import AddRecipe from './HomePage/AddRecipe'
import ContactUs from './HomePage/ContactUs'
import Header from '../layout/Header'
import { useLocation } from 'react-router-dom'

import { useAuth, useGlobalState } from '../GlobalStateContext'
import HeaderLogged from '../layout/HeaderLogged'
import Welcome from './HomePage/Welcome'
import Footer from '../layout/Footer'


function HomePage(props) {
  const [nav,setNav] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setNav(true)
    }
  }, []);
  const {hash} = useLocation()
  const { globalState } = useGlobalState();
 useEffect(()=>{
 
  console.log(globalState)
 },[])
 
  useEffect(()=>{
    if(hash){
      const element = document.getElementById(hash.substring(1));
      if(element){
        element.scrollIntoView({behavior:'smooth'})
      }
    }
  },[hash])
  return (
    <div>
     {nav ? <HeaderLogged/> : <Header/>}
      <Welcome/>
      <section id="about-us">
      <AboutUs/>
      </section>
      <section id="add-recipe">
      <AddRecipe/>
      </section>
     
      
        <IndianCurries/>
        <SouthIndianMeals/>
        <BiriyaniRecipe/>
        <ChettinadRecipe/>
        <IndianChineseRecipe/>
        <section id="contact-us">
        <ContactUs/>
        </section>
       <Footer/>
    </div>
  )
}

export default HomePage