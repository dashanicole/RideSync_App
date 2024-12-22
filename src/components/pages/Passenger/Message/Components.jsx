import React from 'react'
import { Message } from '../../../templates/Passenger/Message'
import { MessageContextProvider } from '../../../../context/PassengerContext/Messages/MessagesContext'

const Components = () => {
    return (
        <MessageContextProvider>
            <Message />
        </MessageContextProvider>
    )
}

export default Components