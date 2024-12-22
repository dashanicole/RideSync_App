import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../molecules/Card';
import { Map } from '../../../molecules/Map';
import RouteList from './RouteList';
import { Button } from '../../../atoms/Button';
import { Ratings } from '../../../atoms/Ratings'
import Circle from '../../../../assets/circle.png';
import Dots from '../../../../assets/dots.png';
import Location from '../../../../assets/location.png';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';
import { Skeleton } from '../../../atoms/Skeleton';
import { FaMoneyBillAlt, FaMapMarkerAlt, FaStar, FaRoute, FaCreditCard } from 'react-icons/fa'


const RequestRides = () => {
    const {profileImage,setProfileImage, passengerInfo, driverMap, request, setOpenInfoModal, openInfoModal, selectedPosition, isOfferingRide,
        setIsOfferingRide, selectedPositionDest, requestInfo, customIcon, handleOfferRide, setStep1, passengerApproval } = useContext(RequestContext);
    console.log("Request Data:", request);



    const handleCancelRequest = () => {
        setOpenInfoModal(false)
        setIsOfferingRide(true)
        setProfileImage()
    }
    const handleCancelClose = () => {
        setOpenInfoModal(false)
        setProfileImage()
        
    }

    useEffect(() => {
        if (passengerApproval) {
            // Set a delay of 4 seconds before updating step1
            //  const timer = setTimeout(() => {
            setStep1(true);
            //   }, 2000); // 4000ms = 4 seconds

            // Cleanup timeout if the component unmounts or passengerApproval changes before the timeout finishes
            //   return () => clearTimeout(timer);
        }
    }, [passengerApproval]);




    
  


    return (
        <div className="m-5">

            <div className="md:flex gap-1  md:justify-center grid grid-cols-1">
                {/* Left Card */}
                <div className="w-full md:max-w-[370px] h-[400px]">
                    <Card className="h-full rounded-2xl shadow-lg overflow-y-auto p-5 bg-gradient-to-b border from-white to-gray-50">
                        <h1 className="text-xl font-semibold mb-3">Requests Rides</h1>
                        <div className="flex flex-col space-y-4">
                            {
                            request.length > 0 ?
                            request.map((req, index) => (
                                <RouteList
                                    key={index}
                                    userId={req.userId}
                                    routeName={req.startLocation || "Default Route"}
                                    location={req.endLocation || "Default Location"}
                                    price={req.totalAmount || "0.00"}
                                    distance={req.distance || "0.00"}
                                    duration={req.estimatedDuration || "0.00"}
                                    startLatitude={req.startLatitude}
                                    startLongitude={req.startLongitude}
                                    endLatitude={req.endLatitude}
                                    endLongitude={req.endLongitude}
                                />
                            ))
                            :
                            <div className="flex flex-col items-center justify-center mt-[90px] ">
                                {/* Spinner */}
                                <div className="relative w-16 h-16 border-4 border-gray-300 border-t-colorBlue rounded-full animate-spin"></div>
                                {/* Waiting Text */}
                                <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
                                Looking for available rides. Stay tuned!
                            </p>
                      </div>
                        
                        }
                        </div>
                    </Card>
                </div>

                {/* Map Card */}
                <div className="w-full  z-0  border rounded-md">
                    <div className="h-full rounded-2xl   overflow-hidden">
                        <div className="h-full">
                            <Map mapRef={driverMap} height="85vh" selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                        </div>
                    </div>
                </div>

                {/* Info Drawer */}
                {
                    openInfoModal && (
                        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50 ">
                            <div
                                className={`relative w-full md:w-[500px] h-screen bg-dRouteBG animate-slideRight transform ${openInfoModal ? 'translate-x-0' : 'translate-x-full'
                                    } transition-transform duration-300 ease-in-out`}
                            >
                                <Card className="flex flex-col h-full rounded-xl gap-4 p-4 relative">
                                    {/* Close Button */}

                                    <div className="flex  ">
                                        {
                                            isOfferingRide ?
                                            <button

                                            onClick={handleCancelRequest}
                                            className="absolute top-4 right-4 text-white text-xl font-bold bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                                        >
                                            &times;
                                        </button>
                                        :
                                        <button

                                        onClick={handleCancelClose}
                                        className="absolute top-4 right-4 text-white text-xl font-bold bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                        }
                                       
                                    </div>
                                    {
                                        !isOfferingRide ?

                                            <div className="flex flex-col gap-6 bg-gradient-to-b from-white to-gray-50 border border-gray-200 p-4 rounded-lg shadow-lg">
                                                {/* Price Section */}
                                                 <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                                                    <h1 className="text-xl font-semibold text-gray-800 flex items-center">
                                                        <FaMoneyBillAlt className="w-5 h-5 mr-2" />
                                                        Fare
                                                    </h1>
                                                    <span className="text-xl font-bold text-green-600">₱ {requestInfo.price}</span>
                                                </div>

                                                {/* Start and End Location Section */}
                                                <div className="flex items-center p-4 shadow rounded-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                                                    <div className="flex flex-col items-center mr-4">
                                                        <img src={Circle} className="w-5 h-5 mb-2" alt="Circle Icon" />
                                                        <img src={Dots} className="w-4 h-4 mb-2" alt="Dots Icon" />
                                                        <img src={Location} className="max-w-8 h-8" alt="Location Icon" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-[15px] font-semibold text-gray-800">{requestInfo?.startLocation}</h1>
                                                        <h2 className="text-[17px] text-gray-500">{requestInfo?.endLocation}</h2>
                                                    </div>
                                                </div>

                                                {/* Passenger Information Section */}
                                                <div className="flex items-center p-4 shadow rounded-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                                                    <img
                                                        src={profileImage}
                                                        alt="Default Profile"
                                                        className="w-12 h-12 rounded-full border-2 border-gray-300 mr-4"
                                                    />
                                                    <div>
                                                        <h1 className="text-lg font-semibold text-gray-800">{passengerInfo?.userFn + " " + passengerInfo?.userLn}</h1>
                                                        <h2 className="text-sm text-gray-500">{passengerInfo?.userPhone}</h2>
                                                        <h3 className="flex   items-center  justify-center text-sm text-yellow-500">Rating: <Ratings value={passengerInfo?.userRating ? passengerInfo?.userRating : 5} /> {passengerInfo?.userRating}/5</h3>
                                                    </div>
                                                </div>

                                                {/* Distance and Duration Section */}
                                                <div className="flex justify-between items-center p-4 shadow rounded-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                                                    <h1 className="text-lg font-semibold text-gray-800 flex items-center">
                                                        <FaRoute className="w-5 h-5 mr-2" />
                                                        Distance
                                                    </h1>
                                                    <span className="text-xl font-bold text-gray-800">
                                                        {requestInfo?.distance} km <span className="text-sm text-gray-500">({requestInfo?.duration} mins)</span>
                                                    </span>
                                                </div>

                                                {/* Payment Method Section */}
                                                <div className="p-4 shadow rounded-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200">
                                                    <h1 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                                                        <FaCreditCard className="w-5 h-5 mr-2" />
                                                        Payment Method
                                                    </h1>
                                                    <span className="text-base font-bold text-blue-600">{requestInfo?.paymentMethod || 'CASH'}</span>
                                                </div>
                                            </div>

                                            :
                                            <div className="flex justify-center items-center w-full h-screen bg-gray-100 p-4">
                                                <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md flex flex-col justify-center items-center">
                                                    {/* Title and Status */}
                                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Waiting for Passenger Approval</h2>

                                                    {/* Loading Spinner */}
                                                    <div className="flex justify-center items-center gap-3 mb-6">
                                                        <div className="animate-spin rounded-full border-t-4 border-blue-500 w-[40px] h-[40px]"></div>
                                                        <span className="text-gray-600 text-lg font-medium">Waiting...</span>
                                                        <span>{passengerApproval && passengerApproval}</span>
                                                    </div>

                                                    {/* Ride Information */}
                                                    <div className="flex flex-col w-full bg-gray-50 p-4 rounded-lg mb-4 shadow-md">
                                                        <h3 className="text-md font-semibold text-gray-800">Ride Offer Details:</h3>
                                                        <div className="flex flex-col  items-start mt-2">
                                                            <span className="text-sm text-gray-600">Start Location:</span>
                                                            <span className="text-sm text-gray-700 font-medium">{requestInfo?.startLocation}</span>
                                                        </div>
                                                        <div className="flex flex-col items-start mt-2">
                                                            <span className="text-sm text-gray-600">End Location:</span>
                                                            <span className="text-sm text-gray-700 font-medium">{requestInfo?.endLocation}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <span className="text-sm text-gray-600">Estimated Price:</span>
                                                            <span className="text-sm text-gray-700 font-medium">₱{requestInfo.price}</span>
                                                        </div>
                                                    </div>

                                                    {/* Additional Info */}
                                                    <div className="text-center text-sm text-gray-500 mt-4">
                                                        <p>We are waiting for the passenger to approve your ride offer. You will be notified once it's confirmed.</p>
                                                    </div>
                                                </div>
                                            </div>

                                    }
                                    <div className="flex justify-center gap-4 mt-auto p-3">
                                        {
                                            !isOfferingRide ?
                                                <>
                                                    <div className="bg-colorBlue rounded-lg">
                                                        <Button name="Offer Ride" variant="contained" size="large" onClick={handleOfferRide} />
                                                    </div>
                                                    <div className="rounded-lg">
                                                        {/* <Button name="Reject" variant="contained" size="large" onClick={handleCancelRequest} /> */}
                                                    </div>
                                                </>
                                                :
                                                isOfferingRide ?

                                                    <div className="w-[130px] h-[45px] bg-gray-300 flex justify-center items-center rounded-lg shadow-lg">
                                                        {/* Loading Spinner and Text */}
                                                        <div className="flex items-center gap-2">
                                                            <div className="animate-spin rounded-full border-t-4 border-blue-500 w-[20px] h-[20px]"></div>
                                                            <span className="text-gray-800 font-medium text-sm">waiting...</span>
                                                        </div>
                                                    </div>

                                                    :
                                                    <div className="bg-colorBlue rounded-lg">
                                                        <Button name="Continue" variant="contained" size="large" onClick={() => setStep1(true)} />
                                                    </div>
                                        }
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default RequestRides;
