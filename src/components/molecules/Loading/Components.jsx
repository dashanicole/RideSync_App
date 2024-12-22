import React, { useEffect, useState } from 'react';
 
 const Components = ({loading}) => {

   return (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="loader animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
   )
 }
 
 export default Components
 