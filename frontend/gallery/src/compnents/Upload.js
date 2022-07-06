import React, { useState } from 'react';
import "./styles/upload.css"
import "bootstrap/dist/css/bootstrap.css"
import ImageUploader from "react-images-upload"
import { category } from './general';
import Footer from "./Footer";
import default_pic from "../images/default_pic.png"
import { imageInfo, IMAGE_UPLOAD } from './redux/reducers/imageReducer';
import {useDispatch,useSelector} from 'react-redux'
import { check_logged_in,selectUserName } from './redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';

import { app } from '../firebase/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'
import CustomModal from './CustomModal';
import Loading from './Loading';

const Upload = () => {

  const loggedIn = useSelector(check_logged_in)
  const username = useSelector(selectUserName)
  const history = useNavigate()
  const [picture,setPic] = useState(default_pic)
  const [image_inform,setImageInfo] = useState({
    caption:"",
    category:"",
    actualUrl:[],
    imageUrl:"",
    name:""
  })
  const dispatch = useDispatch()
  const image_content = useSelector(imageInfo)
  const [loading,setLoad] = useState(false)
  // setPic({default_pic})

  const removePic = ()=>{
    setImageInfo({...image_inform,imageUrl:""})
  }

  const onCreate = async (e)=>{
    setLoad(true)
    const file = e.target.files[0]
    const storageRef = app.storage().ref()
    const fileRef = storageRef.child(file.name)
    await fileRef.put(file)

  //  getting the url of the file:
    const fileUrl = await fileRef.getDownloadURL()
    
    setImageInfo({...image_inform,imageUrl:URL.createObjectURL(file),actualUrl:[...image_inform.actualUrl,fileUrl]})
    setLoad(false)
  }

  const handleInputs = (e)=>{
    
    setImageInfo({...image_inform,[e.target.name]:e.target.value})
    
  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    
    // adding to database:
    if(loggedIn){
      try{
        const response = await fetch('api/v1/upload',{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            image_url: image_inform.actualUrl,
            caption: image_inform.caption,
            category:image_inform.category,
            created_by:username,
            name:image_inform.name
          })
        })
        if(response)
        {
          alert("IMAGE UPLOADED!")
          history('/')
      }}catch(e){console.log(e);}
    }
    // let actual_image = blobToString(image_inform.imageUrl) 
    // console.log(actual_image);
    // redux:
    dispatch(IMAGE_UPLOAD({
      caption:image_inform.caption,
      category:image_inform.category,
      actualUrl: [...image_inform.actualUrl],
      name:image_inform.name
    }))

    
  }

  if(loading) return <><Loading/></>
  if(loggedIn)
  {
    return<><div className='upload'>
   <div className='container_1'>
    <div className='upload_image'>
        <label htmlFor='upload-image' id='plus-image'>
            <FontAwesomeIcon icon={faPlus}/>  
        </label>
        <input type="file" name="imageUrl" id='upload-image' onChange={onCreate}/>
        <div className='upload_pic'>
          <div className='insert'>
            {
              image_inform.imageUrl?<img className='image-upload'src={image_inform.imageUrl} alt="image not printed"/>:<img src={default_pic}/>
            } 
          </div> 
        </div>
       
    </div>
    
            <div className='pic_info'>
              <form onSubmit = {handleSubmit}>
                <div className="image_name">
                  <label htmlFor='name' className='label-for-upload'>Name:</label>
                  <input type="text" name="name" className="upload-name" onChange={handleInputs} value={image_inform.name}/>
                </div>
                  <div className='caption'>
                    <label htmlFor='caption' className='label-for-upload'>Caption:</label><br/>
                    <textarea cols={40} rows={4} value={image_inform.caption} name="caption" onChange = {handleInputs}/>
                  </div>
                  <div className='category'>
                    <label htmlFor='category' className='label-for-upload'>Category:</label><br/>
                    <select name="category" className='category' value={image_inform.category} onChange={handleInputs}>
                      <option>Select Category</option>
                    {
                      category.map((ele)=>{
                        return <option className='cat-opt' value={ele}>{ele}</option>
                      })
                    }
                    </select>              
                  </div>
                  
                 
                  <div className='upload_button '> 
                    <button className='upload-btn-btn'>Upload</button>
                  </div>
                  
              </form>  
              <div className='remove_pic'>
                <button onClick={removePic} className='remove-btn-btn'>Remove pic</button>
              </div>
            </div>
           
  </div>
  <Footer/></div>
  </>
  }
  else return<><CustomModal/></>;
};

export default Upload;
