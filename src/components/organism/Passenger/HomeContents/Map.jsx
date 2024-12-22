import React, { useContext } from 'react'
import { Card } from '../../../molecules/Card'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext'
import { Map } from '../../../molecules/Map'
import { FaRoute, FaMoneyBillWave } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md'


const MapView = () => {

    const {
        mapRef,
        selectedPosition,
        selectedPositionDest,
        setSelectedPosition,
        setSelectedPositionDest,
        customIcon,
        amount,
        totalDistance,
        totalDuration,
        driverCoordinates,
        setDriverCoordinates,
        isDriverHasArrive,
        isRidesCompleted,
        setIsRideCompleted,
        setStep1,
        setStep2,
        setStep3,
        setSearchInput,
        setSearchInputDest,
        setIsDriverHasArrive,
        setRouteInfo,
        routingControlRef,
        setAmout,
        setTotalDistance,
        setTotalDuration,
        setDrivers

    } = useContext(FindRouteContext)
    const handleRefreshPage = () => {
        const map = mapRef.current;
        map.removeControl(routingControlRef.current);
        setDriverCoordinates(null)
        setIsRideCompleted(false)
        setRouteInfo([])
        setStep1(false)
        setStep2(false)
        setStep3(false)
        setSearchInput("")
        setSearchInputDest("")
        setIsDriverHasArrive(false)
        setSelectedPosition(null)
        setSelectedPositionDest(null)
        setAmout()
        setTotalDistance()
        setTotalDuration()
        setDrivers([])
       
    }

    return (

        <div className="w-full">
            {
                isRidesCompleted && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Payment Confirmed!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Thank you for choosing
                                <span className="font-semibold text-blue-500">
                                    {" "}RideSync
                                </span>.
                            </p>
                            <button
                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                                onClick={handleRefreshPage}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Map Section with responsive height */}
            <div className="relative w-full h-[75vh]"> {/* Set height explicitly for the map container */}
                 
                <div className="hidden absolute md:flex items-center gap-1 top-[0px] right-[330px] p-4 bg-gray-10 z-10 text-center">
                    {
                        amount>0 && 
                <>
                  {/* <FaRoute className="text-blue-500 text-[22px]" />
                        <p className="text-[18px] font-bold text-black-500">Route</p> */}
                        {/* <FaMoneyBillWave className="text-green-500 text-[22px]" /> */}
                        <p className="text-[20px] font-bold text-black-500">Fare: </p>
                        <h1 className="text-[24px] font-bold text-green-500">
                          ₱{amount && amount }
                        </h1>
                         <MdLocationOn className="text-red-500 text-[22px]" />
                        <h1 className="text-[20px] font-bold text-kmColor">
                        {totalDistance && totalDistance } 
                        </h1>
                        <p className="text-[20px] text-gray-500">
                              <span className='text-orange-500 mr-2'>⏱️</span>
                        (est: {totalDuration && totalDuration })
                        </p>
                </>
                    }
                      
                </div>

                {/* Amount Information - Positioned at the top right corner */}
               


                {/* Map */}
                <div className="flex justify-center  max-w-screen" >
                    <div className="w-full z-0">
                        <Map
                            mapRef={mapRef}
                            selectedPosition={selectedPosition}
                            selectedPositionDest={selectedPositionDest}
                            customIcon={customIcon}
                            driverCoordinates={driverCoordinates}
                            isDriverHasArrive={isDriverHasArrive}
                            height="85vh"
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MapView