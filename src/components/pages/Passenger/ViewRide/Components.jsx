import React from 'react'
import { ViewRide } from '../../../templates/Passenger/ViewRide'
import { ViewRidesContextProvider } from '../../../../context/PassengerContext/VieRides/ViewRides'

const Components = () => {
  return (
    <ViewRidesContextProvider>
      <ViewRide />
    </ViewRidesContextProvider>

  )
}

export default Components
