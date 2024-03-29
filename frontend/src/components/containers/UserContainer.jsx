import React from 'react'
import '../../stylesheets/containers/UserContainer.css'

const UserContainer = ({ children}) => {
  return (
    <div className='outerU-container'>
      <div className='innerU-container'>
        { children}
      </div>
    </div>
  )
}

export default UserContainer