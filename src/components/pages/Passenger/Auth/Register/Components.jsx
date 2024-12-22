import React from 'react'
import { Register } from '../../../../templates/Passenger/Auth/Register'
import { RegisterContextProvider } from '../../../../../context/PassengerContext/Auth/RegisterContext'

const Components = () => {
  return (
    <RegisterContextProvider>
      <Register />
    </RegisterContextProvider>
  )
}

export default Components
