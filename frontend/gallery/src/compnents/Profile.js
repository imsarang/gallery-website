import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { check_logged_in, profile_Pic, selectUserName, USER_LOGIN, USER_PROFILE_PIC } from './redux/reducers/userReducer'
import {faPlus, faUser,faEdit} from "@fortawesome/free-solid-svg-icons"
import "./styles/profile.css"
import Footer from "./Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from "./Loading"
import { app } from '../firebase/index';
import defaultuser from "../images/defaultuser.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import CustomModal from './CustomModal'

const Profile = () => {
  
    const [user,setUser] = useState({})
    const [profilePic,setProfilePic] = useState(false)
    const loggedIN = useSelector(check_logged_in)
    const user_name = useSelector(selectUserName)
    const profileImg = useSelector(profile_Pic)
    const [edits,setEdits] = useState(false)
    const dispatch = useDispatch()
    const [loading,setLoad] = useState(false)
    const history = useNavigate()
    const [showModal,setShowModal] = useState(false)
    const [editResponse,setEditResponse] = useState({
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        occupation:user.occupation,
        country:user.country,
        propic : profilePic
    })
    const handleUser = async()=>{
        
        const logged_in_user = localStorage.getItem('userDetails')
        const curUser = await fetch(`/api/v1/show/${user_name}`)
        const actualUser = await curUser.json()
        console.log(actualUser);
        setLoad(true)
        setUser(actualUser.user[0])
        setLoad(false)
        // setLoad(false)
        // setLoad(false)
        // setUser(JSON.parse(logged_in_user))
        
    }
    const handleEdits = ()=>{
        setEdits(!edits)
    }
    const onCreate = async(e)=>{
        const file = e.target.files[0]
        const storageRef = app.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)

  //  getting the url of the file:
    const fileUrl = await fileRef.getDownloadURL()
    setLoad(true)
    setProfilePic(fileUrl)
    
    dispatch(USER_PROFILE_PIC({
        profile_pic : fileUrl
    }))

    dispatch(USER_LOGIN({
        username:user.username,
        loggedIN:true
    }))
    editDatabase(fileUrl)
    setLoad(false)
    }

    const editDatabase = async(fileUrl)=>{
        console.log('in edit database');
        console.log(user_name);
        // setLoad(true)
        try
        {
            const pic = await fetch(`api/v1/user/profile/${user_name}`,{
            
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                  },
                body:JSON.stringify({
                    username:editResponse.username,
                    firstname:editResponse.firstname,
                    lastname:editResponse.lastname,
                    email:editResponse.email,
                    occupation:editResponse.occupation,
                    profile_pic : fileUrl,
                    country:editResponse.country
                })
               
        })
        setLoad(false)
    }catch(e){console.log(e)}
    }
    const handleEditInput = (e)=>{
        console.log(profilePic);
        setEditResponse({
            ...editResponse,propic:profilePic,[e.target.name]:e.target.value

        })
    }
    const handleSave =()=>{
        setShowModal(true)
        setEdits(!edits)
        
        // console.log(profilePic);
        // console.log(user.username);
        setEditResponse({
            username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        occupation:user.occupation,
        country:user.country,
        propic : profilePic
        })
        dispatch(USER_LOGIN({
            username:user.username,
            loggedIN:true
        }))
        editDatabase(profilePic)
        
        history('/')
    }

    useEffect(()=>{
        handleUser()
    },[])

    if(!loggedIN)return <><CustomModal/></>
    if(loading)return <><Loading/></>
  return (<>
    <div className='Profile'>
        <div className='profile_area'>
            <div className='profile_content'>
            <div className='profile_pic'>
                <div className='profileImage'> 
                    {  
                        user.profile_pic?<div className='profilePicArea'>
                        <img className="profileimg" src={user.profile_pic}/>
                        </div>
                        :<div className='profilePicArea'>
                        <FontAwesomeIcon className = 'profileImageIcon'icon={faUser} size='10x'/>
                        </div>
                    }
                </div>
                
                {   edits?
                    <><label htmlFor='upload-image' className='profile_icon'>
                    
                    
                        <FontAwesomeIcon className='profile_icon_plus' icon={faPlus} size='2x'/></label>
                        
                <input type="file" name="imageUrl" id='upload-image' onChange={onCreate}/>
                </>:<></>}
                {
                    edits?<label className='profile_icon' data-bs-toggle="Promodal" data-bs-target="#profileModal" >Save Changes</label>
                    :<FontAwesomeIcon className='profile_icon'icon = {faEdit} size = '2x' onClick = {handleEdits}/>
                }
                
                
                {/* <i class="fa-solid fa-user-cowboy icon-lg"></i> */}
            </div>
            <div className='profile_info'>
                
                {
                    edits?
                    <>
                    <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='firstname'>Firstname: </label></div>
                    <input className='info_input' name='firstname' placeholder ={user.firstname}value={editResponse.firstname} onChange={handleEditInput}/>
                    </div>
                    <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='firstname'>Lastname: </label></div>
                    <input className='info_input' name='lastname'placeholder={user.lastname} value={editResponse.lastname} onChange={handleEditInput}/>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='username'>Username: </label></div>
                    <input className='info_input' name='username'placeholder={user.username} value={editResponse.username} onChange={handleEditInput}/>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='email'>Email: </label></div>
                    <input className='info_input' name='email'placeholder={user.email} value={editResponse.email} onChange={handleEditInput}/>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='email'>Occupation: </label></div>
                    <input className='info_input' name='occupation'placeholder={user.occupation} value={editResponse.occupation} onChange={handleEditInput}/>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='country'>Country: </label></div>
                    <input className='info_input' name='country'placeholder={user.country} value={editResponse.country} onChange={handleEditInput}/>
                </div>
                </>:
                    <>
                    <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='firstname'>Firstname: </label></div>
                    <div className='info_output'>{user.firstname}</div>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='lastname'>lastname: </label></div>
                    <div className='info_output'>{user.lastname}</div>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='username'>Username: </label></div>
                    <div className='info_output'>{user.username}</div>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='email'>Email: </label></div>
                    <div className='info_output'>{user.email}</div>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='email'>Occupation: </label></div>
                    <div className='info_output'>{user.occupation}</div>
                </div>
                <div className='profile_user_info'>
                    <div className='label_output'><label htmlFor='country'>Country: </label></div>
                    <div className='info_output'>{user.country}</div>
                </div>
                
                </>
                }
            </div>
        </div>
        </div>
    </div>
    {
        showModal?
        // <ShowModal showModal = {setShowModal(true)}/>
        <div className="Promodal" id="profileModal">
        <div className="modal-dialog modal-fullscreen-md-down">
          <div className="modal-content">
           
            <div className="modal-header">
              <h4 className="modal-title">Are you sure you want to delete this image?</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className='modal-body'>
              <div className="modal-image">
                
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className='btn btn-danger' data-bs-dismiss='modal' onClick={handleSave}>YES</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">NO</button>
            </div>

          </div>
        </div>
      </div>
        :<></>
    }
    <Footer/>
    </>
  )
}

export const ShowModal = ({showModal})=>{
    return<>
    <div className="modal" id="myModal">
        <div className="modal-dialog modal-fullscreen-md-down">
          <div className="modal-content">
           
            <div className="modal-header">
              <h4 className="modal-title">Are you sure you want to delete this image?</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className='modal-body'>
              <div className="modal-image">
                
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className='btn btn-danger' data-bs-dismiss='modal' onClick = {()=>showModal(false)}>YES</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">NO</button>
            </div>

          </div>
        </div>
      </div>
      </>
}

export default Profile