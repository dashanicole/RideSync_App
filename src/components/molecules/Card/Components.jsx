import React from 'react'

const Components = ({ children, className }) => {
  return (
    <div className={`shadow-customShadow ${className}`}>
      {children}
    </div>
  )
}



export default Components
