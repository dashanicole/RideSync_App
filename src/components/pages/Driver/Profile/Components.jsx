import React from 'react'
import { Profile } from '../../../templates/Driver/Profile'
import { ProfileContextProvider } from '../../../../context/DriverContext/Profile/ProfileContext'
 
const Components = () => {
    return (
         <ProfileContextProvider>
            <Profile />
         </ProfileContextProvider>
    )
}

export default Components