import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentImage } from './redux/reducers/imageReducer'
import "./styles/imageDetail.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp,faSave,faEdit } from '@fortawesome/free-solid-svg-icons'
import "bootstrap/dist/css/bootstrap.css";
import { UploadModal } from './MyUploads'
import Loading from './Loading'
import Message from './Message'
import { selectUserName } from './redux/reducers/userReducer'
import { NavLink } from 'react-router-dom'

const ImageDetails = () => {
  const [image_det,setImage] = useState()
  const [loading,setLoad] = useState(true)
  const current_id = useSelector(currentImage)
  
  const [customStyleLikes,setStyleLikes] = useState('icon_choice1')
  const [customStyleDislikes,setStyleDislikes] = useState("icon_choice1")
  const [customSaveStyle,setSaveIcon] = useState('msg-save-icon-2')
  const [customEditStyle,setEditIcon] = useState('msg-edit-icon-2')
  const [choice,setChoice] = useState('none')
  const [showImage,setShowImage] = useState(false)
  const [condition,setCondition] = useState('none')
  const [showMsg,setShowMsg] = useState(false)

  const [checkSave,setCheckSave] = useState(false)
  const username = useSelector(selectUserName)

  const fetchImage = async()=>{
    const res = await fetch(`api/v1/image/${current_id}`)
    const image = await res.json()
    setImage(image)
    setLoad(false)
    
  }
  useEffect(()=>{
    fetchImage()
  },[])

 

  const handleLikes = ()=>{
    
    if(!checkSave)
    {
      setStyleDislikes("icon_choice1")
      setStyleLikes("icon_choice2")
      setChoice('like')
  
    }
  }
  const handleDislikes =()=>{
    
    if(!checkSave)
    {
      setStyleLikes("icon_choice1")
      setStyleDislikes("icon_choice2")
      setChoice('dislike')
    }
  }

  const handleDownload = ()=>{
    
  }

  const handleEdit = (item)=>{
    setEditIcon('msg-edit-icon-1')
    setSaveIcon('msg-save-icon-2')
    setCheckSave(false)
  }


  const handleSave =(item)=>{
    if(choice === 'like') setCondition('like')
    else if(choice==='dislike') setCondition('dislike')
    setSaveIcon('msg-save-icon-1')
    setEditIcon('msg-edit-icon-2')
    setCheckSave(true)
    if(!showMsg)setTimeout(()=>{
      setShowMsg(true)
    },10)

    handleSaveToDatabase(item)
  }

  const handleSaveToDatabase = async(image)=>{
    
    try{
      const curImage = await fetch(`/api/v1/image/${choice}/${image._id}/${username}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
      })
      
    }catch(e){console.log(e)}
    // fetch(`/api/v1/image/${condition}/${image._id}`)
    // .then((res)=>{
    //   res.json()
    //   .then(data=>console.log(data))
    //   .catch(e=>console.log(e))
    // })
    // .catch((e)=>{console.log(e)})
  }
  
  if(showMsg) setTimeout(()=>{
      setShowMsg(!showMsg)
  },2000)

  if(loading)return <h1><Loading/></h1>
  return (<>
    <div className='image_details'>
      <div className='image_information'>
        <div className='picture_value'><img className="img_value"src = {image_det.image.image_url[image_det.image.image_url.length-1]} onClick={()=>setShowImage(true)}/></div>
        <div className='image_value'>
          <div className='image_info_value'><label className="detail_label" htmlFor='i_name'>Name : </label>{image_det.image.name}</div>
          <div className='image_info_value'><label className="detail_label" htmlFor='i_category'>Category : </label>{image_det.image.category}</div>
          <div className='image_info_value'><label className="detail_label" htmlFor='i_caption'>Caption : </label>{image_det.image.caption}</div>
          <div className='image_info_value'><label className="detail_label" htmlFor='i_caption'>Creator : </label>
          <NavLink to='/profile'><label id='created'>{image_det.image.created_by}</label></NavLink>
          </div>
          <div className='image_info_value'>
            <FontAwesomeIcon className={customStyleLikes} icon={faThumbsUp} size="2x" onClick = {handleLikes}/>
            <FontAwesomeIcon className={customStyleDislikes} icon={faThumbsDown} size="2x" onClick = {handleDislikes}/>  
          {/* {
            showInfoLike?
            <div className='show_info'>
              You liked this picture
            </div>:
            !showInfoLike && showInfoDislike?<div className="show_info">
              You Disliked this picture
            </div>:<></>
          } */}
            <FontAwesomeIcon className={customSaveStyle}icon={faSave} size='2x' onClick = {()=>handleSave(image_det.image)}/>

            <FontAwesomeIcon className={customEditStyle}icon={faEdit} size='2x' onClick = {()=>handleEdit(image_det.image)}/>
          </div>
          <div className='image_info_value'>
              <button className='download_button btn-primary' onClick={handleDownload}>Download Image</button>
            </div>
        </div>
      </div>
    </div>
    {
      showMsg?condition==='like'?<Message condition ="like"/>:condition==='dislike'?<Message condition= "dislike"/>
      :<Message condition="none"/>
      :<></>
    }
    </>
  )
}

export default ImageDetails