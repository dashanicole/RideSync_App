import React, { useContext, useRef, useState,useEffect } from "react";
import { ViewRidesContext } from "../../../../context/PassengerContext/VieRides/ViewRides";
import { Map } from "../../../molecules/Map";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { Card } from '../../../molecules/Card';

const Carpools = () => {
  const { bookedCarpools,customIcon } = useContext(ViewRidesContext);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const mapRef = useRef(null);
  const routingControlRef = useRef(null)
  const [pickUp, setPickUp] = useState()
  const [destination, setDestination] = useState()

   
 

  const handleMapRoute = (item) => {
    const map = mapRef.current;

    // Ensure map exists and routingControlRef doesn't already exist
    if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
    }

    console.log('Start Latitude:', item?.startLatitude);
    console.log('End Latitude:', item?.endLatitude);

    // Create route control with direct coordinates from item
    routingControlRef.current = L.Routing.control({
        waypoints: [
            L.latLng(item?.startLatitude, item?.startLongitude),
            L.latLng(item?.endLatitude, item?.endLongitude),
        ],
        createMarker: function () {
            return null; // Prevent marker creation
        },
        show: false,
        routeWhileDragging: true,
        lineOptions: {
            styles: [{ color: "#00A6CE", opacity: 1, weight: 5 }],
        },
    }).addTo(map);
};


  const handleSelectedBooking = (item,index)=>{
     
   
}
  return (
    <Card className="flex border flex-col md:flex-row p-6 mt-5 rounded-lg min-h-screen gap-4 bg-gradient-to-b  from-white to-gray-50">
      {/* Left Section: Booking List */}
      <div className="flex-1 h-[100vh] w-[900px] bg-gradient-to-b  from-white to-gray-50 shadow-lg rounded-lg p-6 border overflow-y-auto transition-all duration-500 ease-in-out transform hover:shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Your Carpools</h2>
        <div className="space-y-4">
          {
          bookedCarpools ?  
          bookedCarpools
          // .filter((b)=> b.status === 'pending')
          ?.map((item, index) => (
            <BookingCard
              key={index}
              booking={item}
              isSelected={selectedBooking === index}
              handleMapRoute={handleMapRoute}
              carpoolIndex = {index}
              onSelect={() => setSelectedBooking(index)}
            />
          ))

          :
          <p>No current carpools available</p>
          
          }
        </div>
      </div>

      {/* Right Section: Booking Details */}
      <div className="border flex-1 h-[100vh] overflow-y-auto bg-white shadow-xl rounded-lg p-6 transition-all duration-500 ease-in-out transform hover:shadow-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Carpool Details</h2>
        {selectedBooking !== null ? (
          <BookingDetails mapRef={mapRef}   booking={bookedCarpools[selectedBooking]}  customIcon={customIcon} />
        ) : (
          <p className="text-gray-500">Select a booking to view details.</p>
        )}
      </div>
    </Card>
  );
};


 const BookingCard = ({ handleMapRoute, booking, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => handleMapRoute(booking)}
      className="focus:outline-none " // Removes the blue glow when clicked
    >
      <div
        className={`bg-gradient-to-b  from-white to-gray-50 p-6 rounded-lg border cursor-pointer shadow-md transition duration-300 ease-in-out transform ${
          isSelected
            ? "border-blue-500   scale-105 shadow-xl"
            : "border-gray-200 bg-white hover:bg-gray-50"
        } hover:shadow-2xl hover:scale-105`}
        onClick={onSelect}
      >
        <div className="flex justify-between items-center ">
          <p className="text-gray-700 font-semibold">
            <span role="img" aria-label="calendar">📅</span>
            <strong>Date:</strong>{" "}
            <span className="text-red-500">
              {new Date(booking?.travelDateTime).toLocaleString()}
            </span>
          </p>
          <p className="text-green-600 font-semibold">
            <span role="img" aria-label="currency">💵</span>
            ₱{booking?.pricePerPerson.toFixed(2)}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-700">
            <span role="img" aria-label="location">📍</span>
            <strong>From:</strong> {booking?.startLocation}
          </p>
          <p className="text-gray-700">
            <span role="img" aria-label="location">🎯</span>
            <strong>To:</strong> {booking?.endLocation}
          </p>
        </div>
        <div>
          <span role="img" aria-label="status">🔖</span>
          <span>Status: </span>
          <span
            className={`${
              booking?.status === 'Completed'
                ? 'text-green-500'
                : booking?.status === 'Pending'
                ? 'text-yellow-500'
                : 'text-gray-500'
            }`}
          >
            {booking?.status}
          </span>
        </div>
      </div>
    </div>
  );
};


const BookingDetails = ({ mapRef, booking, customIcon }) => (
  <div className="space-y-6">

    {/* Trip Information Section */}
   <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">

      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span role="img" aria-label="travel">🚗</span> Trip Information
      </h3>
      <div className="flex flex-col gap-3">
        <p className="text-gray-700">
          <span role="img" aria-label="start-location">📍</span> <strong>Start Location:</strong> {booking?.startLongitude}, {booking?.startLatitude}
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="end-location">📍</span> <strong>End Location:</strong> {booking?.endLocation}
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="vehicle">🚘</span> <strong>Vehicle:</strong> {booking?.modelName}
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="clock">⏱️</span> <strong>Estimated Duration:</strong> {booking?.duration} mins
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="distance">📏</span> <strong>Distance:</strong> {booking?.distance} km
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="amount">💰</span> <strong>Total Amount:</strong>{" "}
          <span className="text-green-600 font-bold">₱{booking?.totalAmount.toFixed(2)}</span>
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="calendar">📅</span> <strong>Travel Date:</strong>{" "}
          {new Date(booking?.travelDateTime).toLocaleString()}
        </p>
      </div>
    </div>

    {/* Driver Details Section */}
    <div className="bg-gradient-to-b from-white to-gray-50 border border-gray-200  p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span role="img" aria-label="driver">👨‍✈️</span> Driver Information
      </h3>
      <div className="flex flex-col gap-3">
        <p className="text-gray-700">
          <span role="img" aria-label="person">👤</span> <strong>Name:</strong> {booking?.userLn} {booking?.userFn}
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="email">📧</span> <strong>Email:</strong> {booking?.userEmail}
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="phone">📞</span> <strong>Phone Number:</strong> {booking?.userPhone}
        </p>
        <p className="text-gray-700">
          <span role="img" aria-label="star">⭐</span> <strong>Rating:</strong>{" "}
          <span className="text-yellow-500 font-semibold">{booking?.userRating}</span>
        </p>
      </div>
    </div>

    {/* Map Section */}
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span role="img" aria-label="map">🗺️</span> Trip Map
      </h3>
      <Map
        height="500px"
        mapRef={mapRef}
        selectedPosition={{ lat: booking?.startLatitude, lon: booking?.startLongitude }}
        selectedPositionDest={{ lat: booking?.endLatitude, lon: booking?.endLongitude }}
        customIcon={customIcon}
      />
    </div>
    
  </div>
);



export default Carpools;
