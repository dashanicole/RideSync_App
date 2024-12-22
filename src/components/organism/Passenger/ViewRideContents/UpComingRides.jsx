import React, { useState } from 'react'
import { Card } from '../../../molecules/Card';
import { Map } from '../../../molecules/Map';

import { Button } from '../../../atoms/Button';
import Circle from '../../../../assets/circle.png';
import Dots from '../../../../assets/dots.png';
import Location from '../../../../assets/location.png';
import { UpComingList } from './List';


const UpComingRides = ({ upcomingRides, anchorEl, setAnchorEl, options, 
    bookingInfo, handleBookingRide, upComingRidesInfo, mapRef, customIcon,
     pickUp, destination,setIsInCarpools,handleCancelBooking,handleChats}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetails = () => {
        setIsExpanded(!isExpanded);
    };
    const isCancellable = (travelDate) => {
        const currentTime = new Date(); // Current time
        const travelDateTime = new Date(travelDate); // Travel date/time
        const cancelDeadline = new Date(travelDateTime);
        cancelDeadline.setHours(cancelDeadline.getHours() - 1); // Subtract 1 hour from travel time
        return currentTime < cancelDeadline;
    };
    return (
        <Card className="mt-5 border bg-gradient-to-b from-white to-gray-50  p-4 flex flex-col md:flex-col gap-6 items-start w-full shadow-lg rounded-lg md:justify-center">
            <div className="flex flex-col w-full md:flex-row md:justify-center gap-5">
                <Card className="h-[70vh] border w-full md:w-[700px] p-2 md:p-5 rounded-lg shadow-md bg-gradient-to-b from-white to-gray-50  overflow-hidden">
                   <div className='flex justify-between'>
                    <h1 className="text-lg font-semibold text-gray-700 mb-4">
                        Booking
                    </h1>
                     
                   </div>
                    <div className="overflow-y-auto max-h-[90%] overflow-x-hidden space-y-3 p-2 custom-scrollbar">
                   
                        {
                            upcomingRides ?
                            upcomingRides?.slice().reverse().map((upcomingRides) =>
                                <UpComingList
                                    key={upcomingRides.routeId}
                                    upcomingRides={upcomingRides}
                                    anchorEl={anchorEl}
                                    setAnchorEl={setAnchorEl}
                                    options={options}
                                    handleBookingRide={handleBookingRide}
                                />
                            )
                           :
                           <p>No current booking available</p> 
                        }
                    </div>

                </Card>
                <Card className="w-full hidden   md:block mt-[20px] md:mt-0 md:w-[500px] p-6 md:h-[70vh] overflow-auto custom-scrollbar rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                    {
                        upComingRidesInfo?.startLocation
                        &&
                        <div>
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-extrabold text-gray-800">Booking Details</h2>
                            <p className="text-sm text-gray-500">Overview of your trip</p>
                        </div>

                        {/* Trip Details */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">🛣️ Trip Information</h3>
                           
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Start Location:</span>
                                    <span className="text-gray-700 truncate" title={upComingRidesInfo?.startLocation && upComingRidesInfo.startLocation}>
                                        {upComingRidesInfo?.startLocation && upComingRidesInfo.startLocation}

                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">End Location:</span>
                                    <span className="text-gray-700 truncate" title={upComingRidesInfo?.endLocation && upComingRidesInfo.endLocation}>
                                        {upComingRidesInfo?.endLocation && upComingRidesInfo.endLocation}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Estimated Duration:</span>
                                    <span className="font-medium text-gray-800">{upComingRidesInfo?.duration && upComingRidesInfo.duration} mins</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Distance:</span>
                                    <span className="font-medium text-gray-800">{upComingRidesInfo?.distance && upComingRidesInfo.distance} km</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Total Amount:</span>
                                    <span className="font-bold text-green-600">₱{upComingRidesInfo?.totalAmount && upComingRidesInfo.totalAmount}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Travel Date:</span>
                                    <span className="font-medium text-gray-800">{upComingRidesInfo?.travelDate ? new Date(upComingRidesInfo.travelDate).toLocaleString("en-US", { timeZone: "Asia/Manila" }) : 'N/A'}</span>

                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">👤 Driver Details</h3>
                           
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Name:</span>
                                    <span className="font-medium text-gray-800">{(upComingRidesInfo?.userFn && upComingRidesInfo?.userLn) && upComingRidesInfo.userFn + " " + upComingRidesInfo.userLn}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Email:</span>
                                    <span className="text-gray-700 truncate" title={upComingRidesInfo?.userEmail && upComingRidesInfo.userEmail}>
                                        {upComingRidesInfo?.userEmail && upComingRidesInfo.userEmail}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-500">Phone Number:</span>
                                    <span className="text-gray-700 truncate" >
                                        {upComingRidesInfo?.userPhone && upComingRidesInfo.userPhone}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Rating:</span>
                                    <span className="font-medium text-gray-800"> {upComingRidesInfo?.userRatings && upComingRidesInfo.userRatings} ⭐</span>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className='w-full p-0 m-0'>
                            <Map mapRef={mapRef} height="500px" selectedPosition={pickUp} selectedPositionDest={destination} customIcon={customIcon} />

                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                            {/* Message Button */}
                            <Button
                                name="Contact"
                                variant="contained"
                                size="medium"
                                onClick={()=> handleChats(upComingRidesInfo?.userId)}
                            />

                            {/* Cancel Booking Button */}
                            {isCancellable(upComingRidesInfo?.travelDate) ? (
                                <Button
                                    name="Cancel"
                                    variant="contained"
                                    size="medium"
                                    bgColor="red"
                                    onClick={() => handleCancelBooking(upComingRidesInfo?.routeId,upComingRidesInfo?.userId)}
                                />
                            ) : (
                               <></>
                            )}
                        </div>
                    </div>
                    }
                 
                </Card>
            </div>
        </Card>

    )
}



export default UpComingRides