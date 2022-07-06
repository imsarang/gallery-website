import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import "./styles/logout.css"
import Footer from './Footer';
import Gallery from './Gallery';
import SlideShow from './SlideShow';
import "./styles/Home.css"
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from './redux/reducers/userReducer';
import axios from "axios"
const Logout = () => {
  
  const history = useNavigate()
  
  const dispatch = useDispatch()

  const handleYes = async()=>{
    dispatch(USER_LOGOUT({}))
    const res = await fetch('/api/v1/logout')
    localStorage.removeItem('userDetails')
    localStorage.removeItem('loggedIn')
    history("/")
  }

  const handleNo = ()=>{
    history("/")
  }
  
  return (<div className='logout'>
    
      <div className='modal_logout'>
        <div className='modal_logout_layer'>
          <div className='modal_logout_form'>
            <div className='modal_actual'>
              <div className='logout_text'>
                Are you sure you want to Logout?
              </div>
              <div className='logout_buttons'>
                <button className='yes' onClick={handleYes}>Yes</button>
                <button className='no' onClick={handleNo}>No</button> 
              </div>
            </div>
            
          </div>
          
        </div>
        <div className="modal_background" style={{overflow:"hidden"}}>
        
        <SlideShow/>
        <Gallery/>    
        <Footer/>
        
        </div>
      </div>
  </div>)
}

export default Logout