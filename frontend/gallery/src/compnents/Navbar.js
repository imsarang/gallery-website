import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/navbar.css"
import {NavLink} from "react-router-dom"
import { check_logged_in } from './redux/reducers/userReducer';
import { useSelector} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserAlt,faCaretLeft,faCaretRight,faGear,faBook} from "@fortawesome/free-solid-svg-icons";

import {CSSTransition} from 'react-transition-group'

import brand from "../images/brand.png"
// import Dropdown from 'react-bootstrap/Dropdown';
// import { IconName } from "react-icons/fa";
const Navbar = () => {
  const loggedIN = useSelector(check_logged_in)
  
  
  const [activeMenu,setActiveMenu] = useState('main')
  
  const mystyle = {
    backgroundColor : "black"
  }
  
  const handleMenu3 = (e)=>{
    e.stopPropagation()
    setActiveMenu('activity')
  }
  const handleMenu1 = (e) =>{
    e.stopPropagation()
    setActiveMenu('settings')
  }
  const handleMenu2 = (e)=>{
    e.stopPropagation()
    setActiveMenu('main')
  }

  return <>
  <nav className="navbar navbar-expand-lg  navbar_bg" id="navbar">
    <NavLink className="navbar-brand" to="/">
      <img id='nav-brand-pic' src={brand}/>
      {/* Navbar */}
    </NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      
      <i className="toggle-nav-btn fas fa-bars"></i>
      
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
      <li className="nav-item">
          <NavLink className="nav-link" to='/'>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/about'>About Us</NavLink>
        </li>
        
        <li className="nav-item">
          <NavLink className="nav-link" to='/upload'>Upload</NavLink>
        </li>
       
        
        {
          loggedIN?<>
          <li className='nav-item'>
          <div className="dropdown" >
            <div className='toggle-button' id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <button className="btn dropdown-toggle"  >
              <FontAwesomeIcon icon={faUserAlt} style={{color:'white'}} />
            </button>
            </div>
            <div className="dropdown-menu dropdown-menu-lg-left" aria-labelledby="dropdownMenuButton">
                <CSSTransition
                in = {activeMenu === 'main'}
                timeout={0}
                classNames="menu-primary"
                unmountOnExit
                >
                  <div className='menu'>
                    <div className='d-item' >
                      <FontAwesomeIcon className="d-left"icon={faCaretLeft} />
                      <NavLink className="nav-link" to="#" onClick={handleMenu1} >
                      <FontAwesomeIcon icon={faGear} />  <div className='d-text'>Settings</div>
                      </NavLink>
                    </div>
                    <div className='d-item'>
                    <FontAwesomeIcon className="d-left"icon={faCaretLeft} />
                    <NavLink className="nav-link" to="#" onClick={handleMenu3}><FontAwesomeIcon icon={faBook} />
                    <div className='d-text'>Activity</div>
                    </NavLink>
                    </div>
                    <div className='d-item'>
                    <NavLink className="nav-link" to='/image/category'>Category</NavLink>
                    </div>
                  </div>
                  
                </CSSTransition>

                <CSSTransition
                in = {activeMenu === 'settings'}
                timeout={0}
                classNames="menu-secondary"
                unmountOnExit
                >
                  <div className='menu'>
                  <div className='d-item' style={mystyle}>
                    <FontAwesomeIcon className="d-left"icon={faCaretRight} />
                    <NavLink className="nav-link" to="#" onClick={handleMenu2}>
                    <FontAwesomeIcon icon={faGear} />
                    </NavLink>
                    </div>
                    <div className='d-item'>
                    
                    <NavLink className="nav-link" to="/profile">My Profile</NavLink>
                    </div>
                    <div className='d-item'>
                    
                    <NavLink className="nav-link" to="/remove">
                      Remove Account</NavLink>
                    </div>
                  </div>
                  
                </CSSTransition>

                <CSSTransition
                in = {activeMenu === 'activity'}
                timeout={0}
                classNames="menu-secondary"
                unmountOnExit
                >
                  <div className='menu'>
                  <div className='d-item' style={mystyle}>
                    <FontAwesomeIcon className="d-left"icon={faCaretRight} />
                    <NavLink className="nav-link" to="#" onClick={handleMenu2}>
                    <FontAwesomeIcon icon={faBook} />
                    </NavLink>
                    </div>
                    <div className='d-item'>
                    
                    <NavLink className="nav-link" to="/myUploads">My Uploads</NavLink>
                    </div>
                    <div className='d-item'>
                    
                    <NavLink className="nav-link" to="/liked">Liked Images</NavLink>
                    </div>
                  </div>
                  
                </CSSTransition>
                
                
                <div className='d-item'>
                  <NavLink className="nav-link" to='/logout'>Logout</NavLink>
                </div>
                
            </div>
          </div>
          
           
        </li>
          
        </>:<>
        <li className="nav-item">
        <NavLink className="nav-link" to="/signin">Register</NavLink>
      </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li></>
        }
        
        
      </ul>
      
    </div>
</nav>
</>;
};

export default Navbar;
