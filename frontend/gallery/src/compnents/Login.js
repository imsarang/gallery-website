import React, { useState,useEffect } from 'react';
import "./styles/login.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from './Footer';
import {USER_LOGIN,selectUserName, check_logged_in, USER_LOGOUT} from './redux/reducers/userReducer'

import {useDispatch, useSelector} from "react-redux"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import SlideShow from './SlideShow';
import Gallery from './Gallery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { GoogleLogin } from 'react-google-login';
import {GoogleButton} from 'react-google-button'

export const runLogoutTimer = (dispatch,timer)=>{
  setTimeout(()=>{
    dispatch(USER_LOGOUT({}))
    localStorage.removeItem('userDetails')
    // localStorage.removeItem('loggedIn')
    localStorage.removeItem('Uploads')
  },timer)
}

const Login = () => {

  const [username,setUser] = useState("")
  const [password,setPassword] = useState("")
  
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName)
  const loggedIn = useSelector(check_logged_in)
  const history = useNavigate();
  
  

  const saveTokenInLocalStorage = (tokenDetails)=>{
    tokenDetails.expireDate =new Date(new Date().getTime() + 600000)
    localStorage.setItem('userDetails',JSON.stringify(tokenDetails))
    // localStorage.setItem('loggedIn',JSON.stringify(loggedIn))
  }
  

  const check_login = async (e)=>{
    
    e.preventDefault()
    try{
      const response = await fetch(`api/v1/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,password
        })
      });
      const data = await response.json()
      
      if(data.success == false) 
        alert("INVALID USERNAME OR PASSWORD");
      else {
        alert("LOGIN SUCCESSFULL!");
        console.log(data.user);
        history('/')
        
        
        
        dispatch(USER_LOGIN({
          userName:username,
          loggedIn :true
        }))
        saveTokenInLocalStorage(data.user)
        
      }
    }catch(e){
      console.log(e);
    }
  }
  const goToHome = ()=>{
    history('/')
  }



  const responseSuccessGoogle = (response)=>{
    // console.log(response);
    axios({
      method: "POST",
      url:"api/v1/google-login",
      data:{
        tokenId:response.tokenId
      }
    }).then(response =>{
      const email = response.data.user.email
      console.log(email);
      if(email)
      {
        console.log(email);
        fetch("api/v1/email-login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email
        })
      }).then(ok=>{
        dispatch(USER_LOGIN({
          username:response.data.user.username,
          loggedIn:true
        }))
        saveTokenInLocalStorage(response.data.user)
        history('/')
      }).catch((e)=>{
        console.log(e)
      })
      }
    else{console.log('hello');}
    })
  }

  const responseErrorGoogle = (response)=>{
    if(!response) history('/')
  }
    

  
  return <div className='login'>
  <div className="modal_login">
    <div className='modal_login_layer'>
      <div className="login_form">
          <div className='login_cancel'>
          
            <i className="fas fa-plus fa-lg" onClick = {goToHome}></i>
          </div>
          <form onSubmit={check_login} method="POST">
            <div className='login_email'>
              <label htmlFor='username'>Username :</label><br/>
              <input type="text" value={username} onChange={(e)=>setUser(e.target.value)}/><br/>
            </div>
            <div className='login_password'>
              <label htmlFor='password'>Password :</label><br/>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
            </div>
              
            <div className='login_user'>
            <button id="login">Login</button>
            </div>
              
          </form>
          <hr/>
          <div className='social_login'>
              
              <GoogleLogin
                clientId="64048467833-nrmng9jn48qrpsa1g0nffvg7pf8r48mt.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
                style={{
                  width:'100px'
                }}
              />
              
          </div>
          <div>
            <NavLink to ='/signin'  className='link-link'>Click on this link to create an account</NavLink>
          </div>
          
      </div>
      
    </div>  
  </div>
  </div>;
}

export default Login;
