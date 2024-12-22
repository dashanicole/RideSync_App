 import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../molecules/Card';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { ViewRideCarpoolContext } from '../../../../context/Carpool/ViewRideCarpool/ViewRideCarpool';
import DefaultProfile from '../../../../assets/DefaultProfile.png';



const Components = () => {

  const {
  carpoolPassengers,
  users,
  completedCarpools,
  getPassengerByCarpool,
  passengersByCarpool,
  }=useContext(ViewRideCarpoolContext)

  const[carpoolRide,setCarpoolRide]= useState()

  const [profileImages, setProfileImages] = useState({}); // Store user profiles
  const fetchProfileImage = (userId) => {
        if (!userId) return DefaultProfile;

        // Check if the image is already cached
        if (profileImages[userId]) {
            return profileImages[userId];
        }

        // Generate Cloudinary URL
        const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${userId}?${new Date().getTime()}`;

        // Use setTimeout to simulate async update and delay setting the image
        setTimeout(async () => {
            try {
                const response = await fetch(cloudinaryUrl, { method: "HEAD" });
                if (response.ok) {
                    setProfileImages((prev) => ({ ...prev, [userId]: cloudinaryUrl }));
                } else {
                    throw new Error("Image not found");
                }
            } catch (error) {
                // Fallback to default if the image does not exist
                setProfileImages((prev) => ({ ...prev, [userId]: DefaultProfile }));
            }
        }, 1);

        return DefaultProfile; // Show default image while loading
    };

  return (
    <div className="flex bg-gradient-to-b from-white to-gray-50 flex-col items-center px-5 w-full">
      <Card className="m-5 md:h-[85vh] rounded-xl w-full shadow-lg ">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 p-4 border-b border-gray-300">Completed Carpools</h1>

        <Card className='flex bg-gradient-to-b from-white to-gray-50 flex-col md:flex-row gap-5 m-5 h-[85%]'>
          <div className="h-full w-full md:w-[600px] overflow-y-auto overflow-x-hidden border rounded p-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3"></h2>
            </div>
            {
              completedCarpools.length > 0 ? 
                completedCarpools.filter(ride => ride.status === 'completed').length > 0  ?
                completedCarpools 
                  .filter(ride => ride.status === 'completed') // Filter only completed carpools
                  .slice().reverse().map((ride, index) => (
                    <CarpoolList
                      key={index}
                      fetchProfileImage={fetchProfileImage}
                      carpoolPassengers={carpoolPassengers}
                      users={users}
                      ride={ride}
                      setCarpoolRide={setCarpoolRide}
                      getPassengerByCarpool={getPassengerByCarpool}
                      passengersByCarpool={passengersByCarpool}
                    />
                  ))
              : <div className='flex justify-center items-center h-[65vh]'>You have no completed carpool</div> 
              : <div className='flex justify-center items-center h-full'>You have no completed carpool</div> 
            }

          </div>
          <div className="flex w-[50%] flex-col items-center border overflow-y-auto mt-5 md:mt-0">
            {/* other details are here */}
            {
              carpoolRide?.routeId ?
                <OtherDetails fetchProfileImage={fetchProfileImage} carpoolRide={carpoolRide} passengersByCarpool={passengersByCarpool}/>
              :
            <div className='flex justify-center items-center h-full'>Select a ride</div>
            }
          </div>
        </Card>
      </Card>
    </div>
  );
};

const CarpoolList = ({ fetchProfileImage,carpoolPassengers, users, ride, setCarpoolRide, getPassengerByCarpool, passengersByCarpool }) => {
  const [filteredPassengers, setFilteredPassengers] = useState([]);

  useEffect(() => {
    console.log("carpoolPassengers", carpoolPassengers, "users", users);

    if (ride?.routeId) {
      const filteredPassengersList = carpoolPassengers.filter(u => u.carpoolRouteId === ride?.routeId);
      console.log("Filtered passengers for routeId:", ride?.routeId, filteredPassengersList);

      const passengers = users.map(u => {
        const passenger = filteredPassengersList.find(f => f.passengerId === u.userId);
        return passenger ? { ...u, numPassengersBooked: passenger.numPassengersBooked } : null;
      }).filter(u => u !== null);

      console.log("Final passengers list:", passengers);

      setFilteredPassengers(passengers);
      setCarpoolRide(passengers) // Store the filtered passengers in state
    }
  }, [ride, carpoolPassengers, users]); // Added carpoolPassengers and users as dependencies

  const handleRideDetails = () => {
    setCarpoolRide(ride); 
    getPassengerByCarpool(ride?.routeId) // Set the selected ride details
  };

  return (
    <Card className="mb-5 w-full  cursor-pointer h-auto rounded-lg p-4 shadow-lg bg-gradient-to-b from-white to-gray-50 border border-gray-200 transition-all ease-in-out transform hover:scale-105">
      <div className="space-y-4" onClick={handleRideDetails}>
        {/* Status Indicator */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Ride Details</h2>
          <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            Completed
          </span>
        </div>

        {/* Start Location */}
        <div className="flex items-center border p-3 rounded-lg">
          <span className="text-green-500 text-xl">📍</span>
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">
              {ride?.startLocation}
            </h3>
          </div>
        </div>


        {/* Destination */}
        <div className="flex items-center border p-3 rounded-lg">
          <span className="text-blue-500 text-xl">🎯</span>
          <div className="ml-3">
            <h3 className="font-medium text-gray-800">
              {ride?.endLocation}
            </h3>
          </div>
        </div>

        {/* Ride Details (Driver, Fare, Seats) */}
        <div className="flex justify-between items-center mt-4">
          <AvatarGroup max={4}>
            {/* Example avatars, replace with dynamic data */}
            {
              filteredPassengers?.map((u)=>(
                <Avatar alt={u.userFn.charAt(0).toUpperCase()} src={fetchProfileImage(u?.userId)} />
              ))
            }
         
          
          </AvatarGroup>
          <div className="text-right">
            <h4 className="text-lg font-bold text-gray-800">₱{ride?.totalAmount}</h4>
          </div>
        </div>
      </div>
    </Card>
  );
};




const OtherDetails = ({fetchProfileImage,carpoolRide,passengersByCarpool}) => {
  return (
    <div className="flex  flex-col w-full p-5 gap-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        🚘 Other Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {/* Route Information */}
        <DetailRow label="📍 Start Location" value={carpoolRide.startLocation}  />
        <DetailRow label="🎯 End Location" value={carpoolRide.endLocation} />
        <DetailRow
          label="🕒 Travel Date & Time"
          value={new Date(carpoolRide.travelDateTime).toLocaleString()}
        />
        <DetailRow label="⏱ Duration" value={`${carpoolRide.duration} mins`} />
        <DetailRow label="🛣 Distance" value={`${carpoolRide.distance} km`} />

        {/* Vehicle and Pricing */}
        <DetailRow label="🚗 Vehicle" value={carpoolRide.vehicle} />
        <DetailRow
          label="💵 Price per Person"
          value={`₱${carpoolRide.pricePerPerson}`}
        />
        <DetailRow
          label="💰 Total Amount"
          value={`₱${carpoolRide.totalAmount}`}
        />
        <DetailRow
          label="💳 Payment Method"
          value={carpoolRide.paymentMethod}
        />
        <DetailRow label="🪑 Seats" value={carpoolRide.NumSets} />
      </div>

      {/* Passenger Section */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">👥 Passengers</h3>
        <div className="flex gap-4 overflow-x-auto">
          {passengersByCarpool?.map((passenger,index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md border border-gray-200 transition-transform duration-200 hover:scale-105"
            >
              <img
                src={fetchProfileImage(passenger?.userId)}
                alt={passenger?.userFn.charAt(0)}
                className="w-12 h-12 rounded-full mb-2"
              />
              
              <span className="text-sm font-medium text-gray-800">{passenger.userFn}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center p-4 mt-3 bg-gray-100 rounded-lg">
        <span className="font-medium text-gray-700">Status:</span>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            carpoolRide.status === "completed"
              ? "text-green-700 bg-green-100"
              : "text-yellow-700 bg-yellow-100"
          }`}
        >
          {carpoolRide.status === "completed" ? "✅ Completed" : "⌛ Pending"}
        </span>
      </div>
    </div>
  );
};

// Utility Component for Consistent Display
const DetailRow = ({ label, value }) => {
    const truncatedValue = value.length > 20 ? value.substring(0, 50) + "..." : value;

  return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-all ease-in-out hover:bg-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span 
        className="font-medium text-gray-800" 
        title={value}  // Tooltip showing the full value
      >
        {truncatedValue}
      </span>
    </div>
  );

}

export default Components;
