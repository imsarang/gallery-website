import React from 'react'
import './styles/remove.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserName, USER_LOGOUT } from './redux/reducers/userReducer'
const Remove = () => {

    const history = useNavigate()
    const curUser = useSelector(selectUserName)
    const userDetails = localStorage.getItem('userDetails')
    const dispatch = useDispatch()
    const userDet = JSON.parse(userDetails)
    const handleDelete = async()=>{
        await fetch(`/api/v1/delete-user/${userDet._id}`,{
            method:"DELETE"
        })
        dispatch(USER_LOGOUT({}))
        history('/')
    }

    const goToHome = ()=>{
        history('/')
    }

    return (
    <div className='remove'>
        {/* remove */}
        <div className='remove-form'>
            <div className='remove-text'>
                <div className='remove-content'>
                    Are you sure you want to delete your account?
                </div>
                <div className='remove-condition'>
                    All the images you have uploaded will be permanently deleted
                </div>
                <div className='remove-btns'>
                    <button type='button' id = "choice-yes" onClick = {handleDelete}>YES</button>
                    <button type='button' id = "choice-no" onClick={goToHome}>NO</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Remove