import React from 'react'
import { PBookCarpool } from '../../../templates/Carpool/PBookCarpool'
import { PBookCarpoolContextProvider } from '../../../../context/Carpool/PBookCarpool/PBookCarpool'

const Components = () => {
  return (
    <PBookCarpoolContextProvider>
      <PBookCarpool />
      </PBookCarpoolContextProvider>
  )
}

export default Components