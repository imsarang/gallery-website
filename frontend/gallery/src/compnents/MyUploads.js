import React, { useEffect, useState } from 'react'
import "./styles/uploadImage.css"
import { check_logged_in, selectUserName } from './redux/reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.css";
import { Modal,Button } from 'bootstrap'
import { useNavigate } from 'react-router-dom'
import { imageUsername,IMAGE_USER } from './redux/reducers/imageReducer'
import Footer from './Footer'
import Loading from './Loading'
import CustomModal from './CustomModal'
// import "bootstrap/dist/css/bootstrap.min.css"
const MyUploads = () => {

  const username = useSelector(selectUserName)
  const loggedIN = useSelector(check_logged_in)
  // const [uploads,setUploads] = useState([])
  const uploads = useSelector(imageUsername)
  const [loading,setLoad] = useState(true)
  const [currentImage,setImage] = useState()
  const history = useNavigate()
  const [images,setImages] = useState()
  const dispatch = useDispatch()
  const [showModal,setShowModal] = useState(false)

  useEffect(()=>{
    handleUploads()  
  },[username])


  const handleDelete = async(curUrl)=>{
    console.log("in handleDelete")
    console.log(curUrl);
    try{
      await fetch(`api/v1/delete/${curUrl._id}`,{
        method:'DELETE'
      })
    }
    catch(e){console.log(e);}
    history('/myUploads')
  }
  const handleUploads = ()=>{
    
    console.log("in handleUploads");
    console.log(username); 
      fetch(`api/v1/images/${username}`)
      .then((res)=>{
        console.log(res)
        console.log("in first then");
        res.json()
        .then((data)=>{
          // setUploads(data.image)
          let image = data.image
          console.log("in second then");
          dispatch(IMAGE_USER({
            image
          }))
          setLoad(false)
          console.log("AFTER LOAD");
          // console.log(data.image)
        })
        .catch(e=>console.log(e.message))
      })
      .catch(e=>console.log(e.message))    
  }
  
  const handleModal = (current)=>{
    setShowModal(true)
    setImage(current)
  }

  
  

  if(loading)return<><Loading/></>
  if(!username) return<h1><CustomModal/></h1>
  if(!uploads.image[0]) return <h1 className='no-upload'>No images to display!!</h1>
  // console.log(uploads.image[0]);
  
  return (
    <>
    <div className='my_uploads'>
      { 
        uploads.image.map((item)=>{
          
          return <>
          <div className='image_card'>
          <div className='picture'>
            <img className="i_pic" src={item.image_url[item.image_url.length-1]}/>
          </div>
          <div className='image_content'>
            <div className='image_info'><label className="upload-label" htmlFor='name'>Name : </label><span className="upload-span">{item.name}</span> </div>
            <div className='image_info'><label className="upload-label" htmlFor='category'>Category : </label><span className='upload-span'>{item.category}</span></div>
            <div className='image_info'><label className="upload-label" htmlFor='caption'>Caption : </label><span className='upload-span'>{item.caption}</span></div>
            
            <div className='image_info'><label className="upload-label" htmlFor='likes'>Likes : </label><span className='upload-span'>{item.likes}</span></div>
            <div className='image_info'><label className="upload-label" htmlFor="dislikes">Dislikes : </label><span className='upload-span'>{item.dislikes}</span></div>
            
            <div className='buttons'>
              <button className='view btn-success'>Click to view image</button>
              <FontAwesomeIcon className="trash"icon={faTrash} data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>handleModal(item)}/>
            </div>
          </div>
        </div></>
        })
      }

      {/* Modal */}
      {
        showModal?
        <>
        <UploadModal currentImage={currentImage}/>
        </>:console.log(`Error in Modal render since showModal is ${showModal}`)
      } 
          
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default MyUploads

export const UploadModal = ({currentImage})=>{
  const history = useNavigate()
  const handleDelete = async(curUrl)=>{
    console.log("in handleDelete")
    try{
      await fetch(`api/v1/delete/${curUrl._id}`,{
        method:'DELETE'
      })
    }
    catch(e){console.log(e);}
    history('/')
  }
  
  return <>
  <div className="modal" id="myModal">
        <div className="modal-dialog modal-fullscreen-md-down">
          <div className="modal-content">
           
            <div className="modal-header">
              <h4 className="modal-title">Are you sure you want to delete this image?</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className='modal-body'>
              <div className="modal-image">
                <img className="modal-image-pic"src={currentImage.image_url}/>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className='btn btn-danger' data-bs-dismiss='modal' onClick = {()=>handleDelete(currentImage)}>YES</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">NO</button>
            </div>

          </div>
        </div>
      </div>
  </>
}