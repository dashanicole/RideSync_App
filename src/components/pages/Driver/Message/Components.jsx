import React from 'react'
import { Message } from '../../../templates/Driver/Message'
import { MessageContextProvider } from '../../../../context/DriverContext/Message/MessageContext'

const Components = () => {
    return (
        <MessageContextProvider>
            <Message />
        </MessageContextProvider>
    )
}

export default Components