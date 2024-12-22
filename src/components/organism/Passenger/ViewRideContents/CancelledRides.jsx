import React from 'react'
import { Card } from '../../../molecules/Card';
import { CancenlledList } from './List';


const CancelledRides = ({ cancelledRoutes }) => {
    return (
        <Card className="bg-gradient-to-b border from-white to-gray-50 mt-5 p-4 flex flex-col md:flex-col  gap-6  items-start w-full     shadow-lg rounded-lg md:justify-center">
            <div className='flex flex-col w-full md:flex-row md:justify-center gap-5 '>
                <Card className="h-[70vh] w-full md:w-[700px] p-5 rounded-lg shadow-md bg-gradient-to-b border from-white to-gray-50 overflow-hidden">
                    <h1 className="text-lg font-semibold text-gray-700 mb-4">Cancelled Rides  </h1>
                    <div className="overflow-y-auto max-h-[90%] space-y-3 pr-2 custom-scrollbar">
                        {/* Check if there are routes */}

                        {cancelledRoutes?.length > 0 ? (
                            cancelledRoutes.slice().reverse().map((ride, index) => (
                                <CancenlledList
                                    key={index}
                                    startLocation={ride.startLocation}
                                    endLocation={ride.endLocation}
                                    status={ride.status}
                                />
                            ))
                        ) : (
                            <p>No current rides available</p>
                        )}



                    </div>
                </Card>
                <Card className="h-[65vh] w-full md:w-[500px] p-5 rounded-lg shadow-md bg-white">

                </Card>
            </div>
        </Card>
    )
}

export default CancelledRides