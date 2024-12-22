import React from 'react'
import { ViewRides } from '../../../templates/Driver/ViewRides'
import { ViewRidesContextProvider } from '../../../../context/DriverContext/ViewRides/ViewRidesContext'

const Components = () => {
    return (
        <ViewRidesContextProvider>
            <ViewRides />
        </ViewRidesContextProvider>
    )
}

export default Components