 import React, { useContext, useState } from "react";
import { Button } from "../../../atoms/Button";
import { TextInput } from "../../../atoms/TextInput";
import { DatePicker } from "../../../atoms/DatePicker";
import { SelectTrip as Select } from "../../../atoms/Select";
import { Map } from "../../../molecules/Map";
import { HomeCarpoolContext } from "../../../../context/Carpool/HomeCarpool/HomeCarpool";
import CarpoolConfirmationModal from './CarpoolConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { FaCar, FaMoneyBillAlt, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const CreateRides = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rideDetails, setRideDetails] = useState({});
  const {
    mapRef,
    routingControlRef,
    customIcon,
    searchInput,
    handleSearchInput,
    searchInputDest,
    handleSearchInputDest,
    suggestions,
    suggestionsDest,
    handleSelectSuggestion,
    handleSelectSuggestionDest,
    travelDate,
    handleSetTravelDate,
    numSeats,
    handleSetNumSeats,
    vehicle,
    handleSelectVehicle,
    pricePerPerson,
    handleSetPricePerPerson,
    paymentMethod,
    handlePaymentMethond,
    handleCreateCarpoolRide,
    handleRouteDirection,
    selectedPosition,
    selectedPositionDest,
    totalDuration,
    totalDistance,
    registeredVehicle
  } = useContext(HomeCarpoolContext);

  const handleCreateClick = () => {
    if (!searchInput || !searchInputDest || !travelDate || !numSeats || !vehicle || !pricePerPerson || !paymentMethod) {
      alert("Please fill all the fields");
      return;
    }

    setRideDetails({
      pickupLocation: searchInput,
      dropoffLocation: searchInputDest,
      travelDate,
      numSeats,
      vehicle,
      pricePerPerson,
      paymentMethod,
    });
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    handleCreateCarpoolRide();
    setIsModalOpen(false);
    handleNavigation();
  };

  const handleNavigation = () => {
    navigate('/driver/homeCarpool');
  };

  const handleCancel = () => {
    navigate('/driver/homeCarpool');
  };

  return (
    <div className="pl-6 pr-6 pt-4 ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <Button name="Back" variant="outlined" onClick={handleNavigation} />
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center">
          <FaCar className="mr-2 text-3xl" /> Create a Ride
        </h1>
      </div>

      {/* Content Section */}
      <div className="flex flex-wrap b lg:flex-nowrap gap-6">
        {/* Ride Details Form */}
        <div className="flex border flex-col bg-gradient-to-b from-white to-gray-50 shadow-lg rounded-lg p-6 w-full lg:w-[50%] space-y-5">
          {/* Pickup Location */}
          <div className="w-full relative">
            <TextInput
              value={searchInput}
              onChange={handleSearchInput}
              label={<div className="flex"><FaMapMarkerAlt className="mr-2 text-xl text-green-500" /> Pickup Location</div>}
              size="small"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() =>
                      handleSelectSuggestion(
                        suggestion.lat,
                        suggestion.lon,
                        suggestion.display_name
                      )
                    }
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dropoff Location */}
          <div className="w-full relative">
            <TextInput
              value={searchInputDest}
              onChange={handleSearchInputDest}
              label={<div className="flex"><FaMapMarkerAlt className="mr-2 text-xl text-red-500" /> Dropoff Location</div>}
              size="small"
            />
            {suggestionsDest.length > 0 && (
              <ul className="absolute bg-white border rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                {suggestionsDest.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() =>
                      handleSelectSuggestionDest(
                        suggestion.lat,
                        suggestion.lon,
                        suggestion.display_name
                      )
                    }
                  >
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Travel Date */}
          <DatePicker
            value={travelDate}
            onChange={handleSetTravelDate}
            label={<div className="flex"><FaCalendarAlt className="mr-2 text-xl text-purple-500" /> Ride Date</div>}
          />

          {/* Vehicle and Seats */}
          <div className="flex flex-wrap gap-4">
            <TextInput
              label="Number of Seats"
              type="number"
              value={numSeats}
              onChange={handleSetNumSeats}
            />
            <TextInput
              label="Price Per Person"
              type="number"
              value={pricePerPerson}
              onChange={handleSetPricePerPerson}
            />
          </div>

          {/* Price and Payment */}
          <div className="flex gap-4 ">
           
             <Select
              value={vehicle}
              onChange={handleSelectVehicle}
              label="Select Vehicle"
              options={[{ value: registeredVehicle, label: registeredVehicle }]}
              sx={{width:'150px'}}
            />
         
            <Select
              value={paymentMethod}
              onChange={handlePaymentMethond}
              label="Payment Method"
              options={[
                { value: "cash", label: "Cash 💵" },
                { value: "paypal", label: "PayPal 💳" },
              ]}
              sx={{width:'170px'}}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <Button name="Cancel" variant="outlined" onClick={handleCancel} />
            <Button name="Create" variant="contained" onClick={handleCreateClick} />
          </div>
        </div>

        {/* Carpool Confirmation Modal */}
        <CarpoolConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
          rideDetails={rideDetails}
        />

        {/* Map Section */}
        <div className="relative   rounded-lg w-full overflow-hidden">
          {/* Text Above the Map */}
          <div className="flex gap-5 absolute top-4 left-[55px] right-0 z-10 px-4 mr-[55px]">
            <h1 className="text-sm md:text-2xl font-bold text-gray-800">
              {totalDuration ? `${totalDuration} mins` : "0 min"}
            </h1>
            <h1 className="text-sm md:text-2xl font-bold text-red-800">
              {totalDistance ? `${totalDistance} km` : "0 km"}
            </h1>
          </div>

          {/* Map Component */}
          <div className="relative z-0">
            <Map
              height="80vh"
              selectedPosition={selectedPosition}
              selectedPositionDest={selectedPositionDest}
              customIcon={customIcon}
              routingControlRef={routingControlRef}
              mapRef={mapRef}
              handleRouteDirection={handleRouteDirection}
             />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRides;
