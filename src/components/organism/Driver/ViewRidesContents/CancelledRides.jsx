import React from 'react'
import { Card } from '../../../molecules/Card'
import { CancenlledList } from './List'


const CancelledRides = ({cancelledRoutes}) => {
    return (
        <div className='flex flex-col gap-5 p-3 h-[75vh] md:flex md:flex-row bg-gradient-to-b border from-white to-gray-50 rounded-lg'>
            <Card className='w-[630px] p-2  overflow-y-auto h-[400xp]'>
                <h2 className='p-2'>Cancelled Rides:</h2>

                {cancelledRoutes && (
                    cancelledRoutes.slice().reverse().map((item,index)=>(
                        <CancenlledList
                        key={index}
                        startLocation={item?.startLocation}
                        endLocation={item?.endLocation}
                        status="Cancelled"
                    />
                    ))
                        

                )}
               
                 

            </Card>
            <Card className='w-[500px] '>


            </Card>

        </div>
    )
}

export default CancelledRides