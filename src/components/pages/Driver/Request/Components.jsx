import React from 'react'
import { Request } from '../../../templates/Driver/Request'
import { RequestContextProvider } from '../../../../context/DriverContext/Request/Request'

const Components = () => {
    return (

        <RequestContextProvider>
            <Request />
        </RequestContextProvider>

    )
}

export default Components