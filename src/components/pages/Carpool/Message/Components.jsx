import React from 'react'
import { Message } from '../../../templates/Carpool/Message'
import { MessageCarpoolContextProvider } from '../../../../context/Carpool/MessageCarpool/MessageCarpool'
 
const Components = () => {
    return (
            <MessageCarpoolContextProvider>
            <Message />
            </MessageCarpoolContextProvider>
        
    )
}

export default Components