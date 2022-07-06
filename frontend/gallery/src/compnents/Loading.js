import React from 'react'
import "bootstrap/dist/css/bootstrap.css";

const Loading = () => {
  const mystyle = {
    'height':'100vh',
    // 'background':'rgba(0,0,0,0.9)',
    
  }
  const load = {
    // 'color':'white',
    'position':'relative',
    'top':'100px',
    'height':'5rem',
    'width':'5rem'
  }
  return (
    // <div><h1>Loading...</h1></div>
    <div className='loading-bg' style={mystyle}>
<div className="d-flex justify-content-center">
  <div className="spinner-border" role="status" style={load}>
    <span className="sr-only">Loading...</span>
  </div>
</div>
    </div>
  )
}

export default Loading