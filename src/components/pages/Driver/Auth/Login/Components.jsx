import React from 'react'
import { LoginDriverContextProvider } from '../../../../../context/DriverContext/Auth/LoginContext'
import { Login } from '../../../../templates/Driver/Auth/Login'

const Components = () => {
    return (

        <LoginDriverContextProvider>
            <Login />
        </LoginDriverContextProvider>

    )
}

export default Components
