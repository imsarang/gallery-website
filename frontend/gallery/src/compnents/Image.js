import React,{useState} from 'react'
import './styles/image.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import { CURRENT_IMAGE,currentImage } from './redux/reducers/imageReducer';
import { useDispatch, useSelector } from 'react-redux';


const Image = ({image,caption,category,id}) => {

  
  const dispatch = useDispatch()
  const handleImage = ()=>{
    dispatch(CURRENT_IMAGE({
      current_image_id : id
    }))
  }
  return (<NavLink to='/image'>
    <div className='image_main' onClick={handleImage}>
      
      <div className='image_pic' >
        <img src={image} className="img-pic-gallery" />
      </div>
      <div className='details-pic'>
          <div className='info-pic'>
            CLICK HERE TO VIEW THE IMAGE!
          </div>
    </div>
    </div>
    
    </NavLink>
  )
}

export default Image