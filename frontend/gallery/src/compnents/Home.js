import React from 'react';
import Footer from './Footer';
import Gallery from './Gallery';
import "bootstrap/dist/css/bootstrap.css";
import SlideShow from './SlideShow';
import "./styles/Home.css"


import { check_logged_in } from './redux/reducers/userReducer';
import { useSelector } from 'react-redux';


const Home = () => {
 
  return <>
  
  
    <div className="parent">
    
    <SlideShow/>
    <Gallery/>    
    
    
    </div>
  
      </>
    {/* <div className = "navbar">Navbar<Navbar/></div>
      
      <div className = "slide">SlideShow<SlideShow/></div>
      
      <div className = "side">Sidebar<Sidebar/></div>
      
      <div className = "footer">Footer<Footer/></div>
      
      <div className = "gallery">Gallery<Gallery/></div> */}
      
  
};

export default Home;
