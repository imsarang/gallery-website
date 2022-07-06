import React from 'react';
import "./styles/slideshow.css"
import "bootstrap/dist/css/bootstrap.css";
import Carousel from 'react-bootstrap/Carousel'
import { NavLink } from 'react-router-dom';
import nature from "../images/nature.jpg"

import { quotes,author,images } from './general';

const SlideShow = () => {
  
  return<>
 
  <div className="picmain">
        <Carousel>
          {
            images.map((ele,index)=>{
              return <Carousel.Item>
              <div className='slide'>
                <div className="layer"></div>
                <img
                  className="pic"
                  src={ele}
                  alt="First slide"
                />
              </div>
              
              <Carousel.Caption>
                <p>{quotes[index]}</p>
                <h3>{author[index]}</h3>
              </Carousel.Caption>
            </Carousel.Item>
            })
          }
        
      </Carousel>
  </div>
  </> ;
};

export default SlideShow;
