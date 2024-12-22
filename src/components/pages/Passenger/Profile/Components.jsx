import React from 'react'
import { Profile } from '../../../templates/Passenger/Profile'
import { ProfileContextProvider } from '../../../../context/PassengerContext/Profile/ProfileContext'

const Components = () => {
    return (
        <ProfileContextProvider>
            <Profile />
        </ProfileContextProvider>
    )
}

export default Components