import './App.css';
import Home from "./compnents/Home"

import {Routes,Route} from "react-router-dom"
import About from './compnents/About';
import Contact from './compnents/Contact';
import Register from './compnents/Register';
import Login, { runLogoutTimer } from './compnents/Login';
import Upload from './compnents/Upload';
import Navbar from './compnents/Navbar';
import Logout from './compnents/Logout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGIN, USER_LOGOUT } from './compnents/redux/reducers/userReducer';
import ImageDetails from './compnents/ImageDetails';
import Profile from './compnents/Profile';
import LikedImages from './compnents/LikedImages';
import MyUploads from './compnents/MyUploads';
import {currentImage} from './compnents/redux/reducers/imageReducer'
import CategoryImages from './compnents/CategoryImages';
import Remove from './compnents/Remove';
function App() {
  const dispatch = useDispatch()
  const current_id = useSelector(currentImage)
  const checkAutoLogin = ()=>{
  
    const tokenDetailsString = localStorage.getItem('userDetails')
    let tokenDetails = ''
    if(!tokenDetailsString){
      dispatch(USER_LOGOUT({}))
      return
    }
    
    tokenDetails = JSON.parse(tokenDetailsString)
    let expDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date()

    if(todaysDate>expDate){
      dispatch(USER_LOGOUT({}))
      localStorage.removeItem('userDetails')
      localStorage.removeItem('Uploads')
      return;
    }
    dispatch(USER_LOGIN({
      username : tokenDetails.username,
      loggedIn : true
    }))

    const timer = expDate.getTime() - todaysDate.getTime()
    runLogoutTimer(dispatch,timer)
  }

  useEffect(()=>{
    checkAutoLogin()
  },[])

  return (
    <div className="App">
      <Navbar/>
      
      {/* <Home/> */}
      <Routes>
        <Route exact path = "/" element = {<Home/>}/>
        <Route exact path = "/about" element = {<About/>}/>
        <Route exact path = "/contact" element = {<Contact/>}/>
        <Route exact path = "/signin" element = {<Register/>}/>
        <Route exact path = "/login" element = {<Login/>}/>
        <Route exact path = "/upload" element = {<Upload/>}/>
        <Route exact path = "/logout" element = {<Logout/>}/>
        <Route exact path = "/image" element = {<ImageDetails/>}/>
        <Route exact path = '/profile' element = {<Profile/>}/>
        <Route exact path = '/liked' element = {<LikedImages/>}/>
        <Route exact path = '/myUploads' element={<MyUploads/>}/>
        <Route exact path = '/image/category' element={<CategoryImages/>}/>
        <Route exact path = '/remove' element = {<Remove/>}/>
      </Routes>
    </div>
  );
}

export default App;
