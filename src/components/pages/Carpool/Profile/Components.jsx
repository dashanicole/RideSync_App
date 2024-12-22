import React from 'react'
import { Profile } from '../../../templates/Carpool/Profile'
import { ProfileContextProvider } from '../../../../context/Carpool/Profile/ProfileContext'
  
const Components = () => {
    return (
         <ProfileContextProvider>
            <Profile />
         </ProfileContextProvider>
    )
}

export default Components