import React ,{useContext, useState}from "react";
import { Button } from "../../../atoms/Button";
import { useNavigate } from "react-router-dom";
import { HomeCarpoolContext } from "../../../../context/Carpool/HomeCarpool/HomeCarpool";
import StartCarpoolLoc from '../../../../assets/startCarpoolLoc.png'
import DropCarpoolLoc from '../../../../assets/dropCarpoolLoc.png'
import NoRides from '../../../../assets/noRides.gif'
import DefaultProfile from '../../../../assets/DefaultProfile.png';



const Rides = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("/driver/createRide");
  };

  const {driverInfo,carpoolRides,rideInfo,handleSetRideInfo,
  totalPassenger,carpoolPassengers,filteredCarpoolPassengers,
  handleChats,handleMarkCarpoolCompleted} = useContext(HomeCarpoolContext)

 
  const [isModalOpen, setModalOpen] =  useState(false);

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
    <>
      {/* Header Button */}
      <div className="m-5 flex justify-start">
        <Button name="Create a Ride" variant="contained" onClick={handleNavigation} />
      </div>
      <div className="border ">
        
      </div>
      <CarpoolRideModal fetchProfileImage={fetchProfileImage} handleMarkCarpoolCompleted={handleMarkCarpoolCompleted} handleChats={handleChats} totalPassenger={totalPassenger} filteredCarpoolPassengers={filteredCarpoolPassengers} carpoolPassengers={carpoolPassengers} isOpen={isModalOpen} onClose={() => setModalOpen(false)} rideDetails={rideInfo}/>

      {/* Rides Grid */}
       <div className="w-full h-[75vh] overflow-y-auto">
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 ">
            {/* Example rides */}
           {
              carpoolRides.length &&
                carpoolRides.filter(ride => ride.status === 'pending'  &&  ride.userId == driverInfo?.id).length > 0 ? (
                  carpoolRides
                    .filter(ride => ride.status === 'pending' &&  ride.userId == driverInfo?.id)
                    .slice()
                    .reverse()
                    .map((rideDetails, index) => (
                      <CarpoolCardRide
                      driverInfo={driverInfo}
                        key={index}
                        rideDetails={rideDetails}
                        setModalOpen={setModalOpen}
                        handleSetRideInfo={handleSetRideInfo}
                      />
                    ))
                ) : (
                  <div className="absolute flex-col left-[450px] top-[200px] flex items-center space-x-4">
                    <img
                      src={NoRides}
                      alt="No rides available"
                      className="w-[150px] h-[120px]"
                    />
                    <h1 className="text-xl font-bold text-gray-700 text-start">
                      No pending rides available
                    </h1>
                  </div>
                )
            }
         


          
          </div>
       </div>
    </>
  );
};

const CarpoolCardRide = ({driverInfo,rideDetails,setModalOpen ,handleSetRideInfo}) => {
  return (
    <div className="mt-3 max-w-[500px] w-full h-auto cursor-pointer bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    onClick={()=>handleSetRideInfo(rideDetails)}
    >
    {/* Card Header */}
    <div className="flex justify-between items-center border-b pb-3 mb-4">
      <span className="text-sm text-gray-600">
        {rideDetails?.travelDateTime ? new Date(rideDetails.travelDateTime).toLocaleString() : "No Date"}
      </span>
    </div> 
  
    {/* Card Content */}
    <div className="space-y-4">
      {/* Pickup Section */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {/* Car Icon for Pickup (Carpooling related) */}
          <img src ={StartCarpoolLoc} className="max-w-5 h-5"/>
          <span className="font-medium text-gray-600">Pickup: </span>
        </div>
        <span className="text-gray-800 break-words max-w-[200px]">{rideDetails?.startLocation || "Unknown"}</span>
      </div>
  
      {/* Dropoff Section */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          {/* Car Icon for Dropoff (Carpooling related) */}
          <img src ={DropCarpoolLoc} className="max-w-5 h-5"/>
          <span className="font-medium text-gray-600">Dropoff:</span>
        </div>
        <span className="text-gray-800 break-words max-w-[200px]">{rideDetails?.endLocation || "Unknown"}</span>
      </div>
    </div>
  
    {/* Card Footer */}
    <div className="mt-5 flex justify-between items-center">
      <div className="text-sm text-gray-500 flex items-center space-x-2">
        {/* Passenger Icon (Carpooling related) */}
        <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="6" r="4" />
          <circle cx="6" cy="14" r="4" />
          <circle cx="18" cy="14" r="4" />
        </svg>
        <p>No. of passengers: {rideDetails?.totalPassengersBooked}</p>
      </div>
      <button
        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-200 focus:outline-none transition duration-200"
        onClick={() => setModalOpen(true)}
      >
        View Details
      </button>
    </div>
  </div>
  
  
  );
};


const CarpoolRideModal = ({fetchProfileImage,handleMarkCarpoolCompleted,handleChats,totalPassenger, filteredCarpoolPassengers, carpoolPassengers,isOpen, onClose, rideDetails})=>{
  if (!isOpen) return null; 
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50  ">
    {/* Modal Content */}
    <div className="bg-white animate-slideRight w-full sm:w-3/4 md:w-1/2 h-full shadow-2xl p-8 overflow-y-auto transition-transform transform translate-x-0 rounded-l-xl">
      {/* Close Button */}
      <button
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 text-2xl"
        onClick={onClose}
        aria-label="Close Modal"
      >
        ✕
      </button>
  
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Ride Details  </h1>
        {/* {
          (rideDetails?.numSeats-totalPassenger  == 0) &&
       

        } */}
         <Button 
        name='Mark as Completed' 
        variant='contained' 
        size='small'
        onClick={()=>handleMarkCarpoolCompleted(rideDetails.routeId)}
        />
        <p className="text-gray-500 mt-2">Review the details of your carpool ride below.</p>
      </div>
  
      {/* Ride Details */}
      <div className="mb-8">
        <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Information</h2>
       {
          (rideDetails?.numSeats-totalPassenger  == 0) &&
           <h2 className="text-xl font-semibold text-red-500 mb-4">Fully Booked!</h2>
       }
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md text-gray-700">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-400 uppercase">Pickup Location</p>
          <p className="text-sm ">{rideDetails?.pickupLocation || "Unknown"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase">Dropoff Location</p>
          <p className="text-sm ">{rideDetails?.dropoffLocation || "Unknown"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase">Travel Date</p>
          <p className="text-sm ">{rideDetails?.travelDate || "No Date"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase">Seats Available</p>
          <p className="text-sm  ">{rideDetails?.numSeats-totalPassenger || "0"} out of {rideDetails?.numSeats}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase">Price per Person</p>
          <p className="text-sm">₱{rideDetails?.pricePerPerson || "0"}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase">Vehicle</p>
          <p className="text-sm">{rideDetails?.vehicle || "Unknown Vehicle"}</p>
        </div>
      </div>

      </div>
  
      {/* Passengers Section */}
      <div className="mb-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Passengers</h2>
  {filteredCarpoolPassengers && filteredCarpoolPassengers.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {filteredCarpoolPassengers.map((passenger, index) => (
        <li
          key={index}
          className="relative bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200"
        >
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold">
              {/* {passenger.userFn.charAt(0).toUpperCase()} */}
              <img
                 src={fetchProfileImage(passenger.userId)}
                 alt="Avatar"
                  className="w-12 h-12 rounded-full shadow-md"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">{passenger.userFn}</p>
              {/* <p className="text-sm text-gray-500">Seat {index + 1}</p> */}
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-blue-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition"
          onClick={()=>handleChats(passenger.userId)}
          >
            Chat
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <div className="text-center py-8 bg-gray-50 rounded-lg shadow">
      <p className="text-gray-600 text-base">No passengers have booked this ride yet.</p>
    </div>
  )}
</div>

  
      {/* Footer */}
      <div className="pt-6 border-t">
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default Rides;
