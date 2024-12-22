import React from 'react'
import { CreateRides } from '../../../templates/Carpool/CreateRides'
import { HomeCarpoolContextProvider } from '../../../../context/Carpool/HomeCarpool/HomeCarpool'

const Components = () => {
  return (
      <HomeCarpoolContextProvider>
        <CreateRides />
      </HomeCarpoolContextProvider>
     
  )
}

export default Components