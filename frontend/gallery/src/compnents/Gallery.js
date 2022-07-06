import React, { useEffect, useState } from 'react';
import img1 from "../images/pavbhaji.jpeg";
import "./styles/gallery.css";
import mountain from "../images/mountain.jpg"
import treck from "../images/treck.jpg"
import mountain2 from "../images/mountain2.jfif"
import valley from "../images/valley.jpg"
import valley2 from "../images/valley2.jpg"
import Image from './Image';
import { imageInfo } from './redux/reducers/imageReducer';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase';
import axios from "axios"
import Loading from './Loading';



const Gallery = () => {

  const [images,setImages] = useState({})  
  const image_info = useSelector(imageInfo)
  const [loading,setLoad] = useState(true)
  

  const fetchImages =()=>{
    fetch('api/v1/images')
    .then((res)=>{
      res.json()
      .then((data)=>{
        setImages(data.image)
        setLoad(false)
      })
      .catch(e=>console.log(e))
    })
    .catch(e=>console.log(e))
  }
  useEffect(()=>{
    fetchImages()
  },[])

  if(loading) return <><Loading/></>
  if(!images[0]) return <div className='no-image'>No images to display!</div>
  return <div className="gallery_main">
      
      {
        images?images.map(pic=>{
          return <>
            <div className='column' key={pic.category}>
            
            <Image image={pic.image_url[pic.image_url.length - 1]} caption={pic.caption} category={pic.category} id={pic._id}/>
            </div>
          </>
        }):
         <div classname="image-dis">NO IMAGES TO DISPLAY!</div>
      }
      
  </div>;
};

export default Gallery;
