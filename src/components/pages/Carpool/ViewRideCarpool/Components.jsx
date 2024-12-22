import React from 'react'
import { ViewRidesCarpool } from '../../../templates/Carpool/ViewRidesCarpool'
import { ViewRideCarpoolContextProvider } from '../../../../context/Carpool/ViewRideCarpool/ViewRideCarpool'
 
const Components = () => {
  return (
    <ViewRideCarpoolContextProvider>
      <ViewRidesCarpool />
      </ViewRideCarpoolContextProvider>
    
  )
}

export default Components