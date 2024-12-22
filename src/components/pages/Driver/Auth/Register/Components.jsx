import React from 'react'
import { Register } from '../../../../templates/Driver/Auth/Register'
import { RegisterContextProvider } from '../../../../../context/DriverContext/Auth/RegisterContext'

const Components = () => {
    return (
        <RegisterContextProvider>
            <Register />
        </RegisterContextProvider>

    )
}

export default Components
