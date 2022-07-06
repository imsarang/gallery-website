import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import "./styles/message.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons'

const Message = ({condition}) => {
  const myStyle = {
    'transition' : 0.5
  }
  return (
    <div className='message' style = {{'transition':'0.5s'}}>
        <div className='message-body'>
            {
            condition=='like'?<>
            <div className='msg-text'>You liked this picture! Response Saved!</div>
            <FontAwesomeIcon className = 'msg-icon'icon = {faThumbsUp}/>
            </>
            :condition=='dislike'?<>
            <div className='msg-text'>You disliked this picture! Response Saved!</div>
            <FontAwesomeIcon className = 'msg-icon'icon = {faThumbsDown}/>
            </>:<>
            <div className='msg-text'>No response saved!</div>
            </>
            }
        </div>
    </div>
  )
}

export default Message