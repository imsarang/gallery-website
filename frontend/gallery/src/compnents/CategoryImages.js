import React, { useEffect, useState } from 'react'
import "./styles/category.css"
import "bootstrap/dist/css/bootstrap.css";
import Image from './Image';

import { imageCategory, IMAGE_CATEGORY,image_category } from './redux/reducers/imageReducer'
import { useDispatch, useSelector } from 'react-redux';
import { check_logged_in } from './redux/reducers/userReducer';
import { category } from './general';
import Loading from './Loading';
import CustomModal from './CustomModal';
// import CategorySec from './CategorySec';

const CategoryImages = () => {
  
  const [images,setImages] = useState([])
  
  const [load,setLoad] = useState(false)
  const dispatch = useDispatch()
  const loggedIN = useSelector(check_logged_in)
  
  const [showImage,setShowImage] = useState(false)

  const handleCat= (e)=>{
    e.preventDefault()
    const category = e.target.value;
    handleFetch(category)
    // return res  
  }

  const handleFetch = async(category)=>{
    
    const res = await fetch(`/api/v1/images/category/${category}`)
    let image = await res.json()
    image = image.image
    
    setImages(image)
    setShowImage(true)
    setLoad(false)
  }


  if(load) return <><Loading/></>
  if(!loggedIN) return <><CustomModal/></>
  return (
    <div className='category_images'>
      <div className='container'>
        <div className='category_btns'> 
        {
          category.map((item)=>{
            return <>
            <div className='cat-btns-opt'>
              <button type='button' className='cat_btn' value={item} name={item} onClick={handleCat}>{item}</button>
            </div>
            </>
          })
        }
        </div>
        
        
        <div className='category_info'>
          
          { 
            showImage?
              images?images.map((item,index)=>{
              
                return <>
                    <div className='cat_img' key={index}>
                      <Image image={item.image_url[item.image_url.length-1]} caption={item.caption} likes={item.likes} category = {item.category} id = {item._id}/>
                    </div>
                    </>
                   
                    }) :<>Loading!</>
                    :<div className='cat-text'>
                      Click on the buttons to see the images!
                      </div>
          }
            
              
      </div>
      </div>
    </div>
  )
}

export default CategoryImages