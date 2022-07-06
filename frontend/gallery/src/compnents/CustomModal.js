import React from 'react'
import "./styles/customModal.css"
import { NavLink,useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const CustomModal = () => {
  const history = useNavigate()
  const goToHome = ()=>{history('/')}
  return (
    <div className='custom-m'>
      <div className='custom-modal'>
        <div className='custom-content'>
          
          <div className='custom-text'>
          Login Required!
          </div>
          <div className='custom-btn'>
          <NavLink to='/login'><button id='login-btn'> Go to Login Page</button></NavLink>
          <NavLink to='/'>
            <FontAwesomeIcon id='cross-btn' icon={faHome} size='2x'/>
          </NavLink>
          <NavLink to='/signin'><button id='register-btn'>Go to Sign up Page</button></NavLink>
          
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default CustomModal