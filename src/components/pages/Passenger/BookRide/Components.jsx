import React from 'react'
import { BookRide } from '../../../templates/Passenger/BookRide'
import { BookRideContextProvider } from '../../../../context/PassengerContext/BookRide/BookRideContext'

const Components = () => {
    return (
        <BookRideContextProvider>
            <BookRide />
        </BookRideContextProvider>


    )
}

export default Components
