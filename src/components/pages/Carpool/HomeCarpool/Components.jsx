import React from 'react'
import { HomeCarpool } from '../../../templates/Carpool/HomeCarpool'
import { HomeCarpoolContextProvider } from '../../../../context/Carpool/HomeCarpool/HomeCarpool'

const Components = () => {
  return (
      <HomeCarpoolContextProvider>
        <HomeCarpool />
      </HomeCarpoolContextProvider>
     
  )
}

export default Components