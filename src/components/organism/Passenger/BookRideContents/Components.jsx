import React, { useContext, useState } from 'react';
import Booking from './Booking';
import Booking2 from './Booking2';
import { BookRideContext } from '../../../../context/PassengerContext/BookRide/BookRideContext';


const Components = () => {

    const { mapRef, routingControlRef, isBooking, trip, rideType, passenger, selectedDate,
        handleChangeTrip, handleChangeRideTypes, handleChangePassenger, handleDateChange,
        handleBooking, searchInput, searchInputDest, handleSearchInput, suggestions,
        handleSearchInputDest, suggestionsDest, handleSelectSuggestion, handleSelectSuggestionDest,
        selectedPosition, selectedPositionDest, customIcon, handleRouteDirection, handleSubmitBooking,
        fetchDrivers, listOfSuggestionDrivers, handleSelectedDriver, handleExploreDestinations, setIsBooking,
        setWarning,warning, isBookingConfirmed, setIsBookingConfirmed,amt,   totalDistance, estDuration,
    } = useContext(BookRideContext)

    return (
        <div className='animate-fadeIn'>
            {
                isBooking ?

                    <Booking2 mapRef={mapRef} routingControlRef={routingControlRef} trip={trip} rideType={rideType} passenger={passenger} selectedDate={selectedDate}
                        handleChangeTrip={handleChangeTrip} handleChangeRideTypes={handleChangeRideTypes} handleChangePassenger={handleChangePassenger}
                        handleDateChange={handleDateChange} handleBooking={handleBooking}
                        searchInput={searchInput} searchInputDest={searchInputDest} handleSearchInput={handleSearchInput}
                        handleSearchInputDest={handleSearchInputDest} suggestions={suggestions} suggestionsDest={suggestionsDest}
                        handleSelectSuggestion={handleSelectSuggestion} handleSelectSuggestionDest={handleSelectSuggestionDest}
                        selectedPosition={selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon}
                        handleRouteDirection={handleRouteDirection} handleSubmitBooking={handleSubmitBooking} fetchDrivers={fetchDrivers}
                        listOfSuggestionDrivers={listOfSuggestionDrivers} handleSelectedDriver={handleSelectedDriver}
                        setIsBooking={setIsBooking}  warning={warning} setWarning={setWarning} isBookingConfirmed={isBookingConfirmed}
                        setIsBookingConfirmed={setIsBookingConfirmed} amt={amt}   totalDistance={totalDistance} estDuration={estDuration}
                    />


                    :
                    <Booking trip={trip} rideType={rideType} passenger={passenger} selectedDate={selectedDate}
                        handleChangeTrip={handleChangeTrip} handleChangeRideTypes={handleChangeRideTypes} handleChangePassenger={handleChangePassenger}
                        handleDateChange={handleDateChange}
                        handleBooking={() => handleBooking(true)}
                        searchInput={searchInput} searchInputDest={searchInputDest} handleSearchInput={handleSearchInput}
                        handleSearchInputDest={handleSearchInputDest} suggestions={suggestions} suggestionsDest={suggestionsDest}
                        handleSelectSuggestion={handleSelectSuggestion} handleSelectSuggestionDest={handleSelectSuggestionDest}
                        handleExploreDestinations={handleExploreDestinations}
                    />
            }

        </div>
    );
};

export default Components;