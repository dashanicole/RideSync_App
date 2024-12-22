import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../molecules/Card';
import { Button } from '../../../atoms/Button';
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { Ratings } from '../../../atoms/Ratings';
import { BASEURL } from '../../../../utils/Service';

const DriverList = () => {
    const { handleCancel, drivers, handelSelectDriver } = useContext(FindRouteContext);
    const [driverImages, setDriverImages] = useState({});
    const hostname = window.location.hostname;

     
            
    useEffect(() => {
        const fetchDriverImages = async () => {
            const images = {};
            for (const driverId of drivers) {
                const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${driverId}?${new Date().getTime()}`;
                try {
                    const response = await fetch(cloudinaryUrl);
                    if (response.ok) {
                        images[driverId] = cloudinaryUrl;
                    } else {
                        images[driverId] = DefaultProfile;
                    }
                } catch (error) {
                    images[driverId] = DefaultProfile;
                }
            }
            setDriverImages(images); // Store all the images in state
        };

        if (drivers?.length > 0) {
            fetchDriverImages(); // Call fetch driver images only if there are drivers
        }
    }, [drivers]);   
     
    return (
        <div className="flex ml-4 flex-col items-center animate-slideInFromRight  md:w-[430px] ">
            <div className="flex flex-col gap-6 sm:w-full w-full max-w-3xl h-[500px]  rounded  p-4">
                <h1 className="text-2xl font-semibold text-gray-800">Select a Driver</h1>
                <div className="w-full  overflow-y-auto overflow-x-hidden flex flex-col gap-4  flex-grow">
                    {
                        drivers?.length > 0 ? (
                        drivers.map((driverId, index) => (
                           <DriverCard
                                    key={index}
                                    driverId={driverId}
                                    profileImage={driverImages[driverId]}
                                    handelSelectDriver={handelSelectDriver}
                                />
                        ))
                    )
                    :
                    <div className="flex flex-col items-center justify-center h-screen ">
                        {/* Spinner */}
                        <div className="relative w-16 h-16 border-4 border-gray-300 border-t-colorBlue rounded-full animate-spin"></div>
                        {/* Waiting Text */}
                        <p className="mt-4 text-lg font-semibold text-gray-700 animate-pulse">
                         Looking for available drivers. Stay tuned!
                        </p>
                  </div>
                    }
                </div>
                <div className="flex justify-end">
                    <Button name="Cancel" variant="contained" size="large" onClick={() => handleCancel(false)} className="bg-red-500 hover:bg-red-600 text-white" />
                </div>
            </div>
        </div>
    );
};

const DriverCard = ({ driverId,profileImage, handelSelectDriver }) => {
    const [driverData, setDriverData] = useState(null); // State to store driver data
    const [loading, setLoading] = useState(true); // State to manage loading status

    const [selectedDriver, setSelectedDriver] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = (driver) => {
        setSelectedDriver(driver);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedDriver(null);
    };
    const hostname = window.location.hostname;

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const response = await fetch(BASEURL); // Fetch all users
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const users = await response.json(); // Parse JSON response

                // Filter the user based on driverId
                const user = users.find(user => user.userId === driverId);
                setDriverData(user || null); // Set driver data in state, or null if not found
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchDriver(); // Call the function to fetch the driver
    }, [driverId]); // Run effect whenever driverId changes

    // Show loading state
    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    // Show error if user is not found
    if (!driverData) {
        return <div>User not found</div>; // Display error message if user not found
    }
    
    
    

    return (
        <>
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl shadow-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 animate-slideInFromRight ">
                <div className='flex gap-4 cursor-pointer ' onClick={() => handleOpenModal(driverData)}>
                    <div className="w-14 h-14 rounded-full overflow-hidden shadow-md">
                        <img src={profileImage || DefaultProfile} alt="Driver Profile" className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-medium text-gray-800">{driverData?.userLn.toUpperCase()+"  "} {driverData?.userFn.toUpperCase() || "Unknown Driver"}</h2>
                        <p className="text-sm text-gray-600">License Plate No: <span className="font-bold text-gray-800">{driverData.vehiclePlateNo || "Na/A"}</span></p>
                        <Ratings value={driverData.userRating} />
                    </div>
                </div>
                <Button
                    name="Ride"
                    variant="contained"
                    size="small"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 "
                    onClick={() => handelSelectDriver(false, driverId)}
                />

            </div>

            {selectedDriver && (
                <DriverModal driver={selectedDriver} isOpen={isModalOpen} onClose={handleCloseModal} />
            )}
        </>
    );
};

const DriverModal = ({ driver, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [profilePicture,setProfilePicture]= useState()
    
      useEffect(() => {
        if (driver && driver?.userId) { 
            
                const interval = setTimeout(async() => {
                const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${driver?.userId}?${new Date().getTime()}`;
                const response = await fetch(cloudinaryUrl)
                if(response.ok){
                setProfilePicture(cloudinaryUrl);
                }else{
                setProfilePicture(DefaultProfile) 
                }
                },1); 
                return () => clearInterval(interval);
            
        }
        }, [driver]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50  bg-opacity-50  z-50">
            <div className="bg-white animate-dropIn rounded-lg shadow-2xl w-full max-w-md mx-4">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-lg flex items-center justify-between">
                    <h2 className="text-xl font-bold">Driver Details</h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-blue-700 p-1 rounded transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Driver Info Section */}
                    <div className="flex items-center mb-6">
                        <img
                            src={profilePicture || DefaultProfile}
                            alt="Driver Profile"
                            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg"
                        />
                        <div className="ml-4">
                            <p className="text-lg font-semibold text-gray-800">{driver.userFn} {driver.userLn}</p>
                            <p className="text-sm text-gray-600">{driver.userEmail}</p>
                            <p className="text-sm text-gray-600">{driver.userPhone}</p>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Plate Number:</span>
                            <span className="text-gray-800">{driver?.vehiclePlateNo}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">Rating:</span>
                            <span className="flex items-center text-yellow-500">
                                <Ratings value={driver.userRating} /> {driver?.userRating ? driver.userRating : 5}/5
                            </span>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-gray-100 rounded-b-lg flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

    );
};

export default DriverList;
