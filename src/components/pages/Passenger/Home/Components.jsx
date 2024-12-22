import React from 'react'
import { Home } from '../../../templates/Passenger/Home'
import { FindRouteContextProvider } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'

const Components = () => {
  return (
      <FindRouteContextProvider>
        <Home/>
      </FindRouteContextProvider>
  )
}

export default Components
