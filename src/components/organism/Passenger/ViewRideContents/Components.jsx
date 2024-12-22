import React, { useContext } from 'react';
import { Navbar } from '../../../molecules/Passenger/Navbar'
import { ViewRidesContext } from '../../../../context/PassengerContext/VieRides/ViewRides';
import RecentRides from './RecentRides';
import UpComingRides from './UpComingRides';
import CancelledRides from './CancelledRides';
import Carpools from './Carpools';

const Components = () => {
  const {
    mapRef,
    currentRoute,
    cancelledRoutes,
    isInUpComingRides,
    isInInCancelledRides,
    isInCarpool,
    upcomingRides,
    anchorEl,
    setAnchorEl,
    options,
    handleBookingRide,
    upComingRidesInfo,
    customIcon, pickUp, destination,
    setIsInCarpools,
    handleCancelBooking,
    handleChats

  } = useContext(ViewRidesContext)


  return (
    <div className=" flex flex-col items-center pl-5 pr-5 w-full animate-fadeIn">
      <Navbar />
    
      {
      isInCarpool ? 
        <Carpools/>
      :
      isInUpComingRides ? (
        <UpComingRides upcomingRides={upcomingRides} anchorEl={anchorEl} setAnchorEl={setAnchorEl}
          options={options} handleBookingRide={handleBookingRide} upComingRidesInfo={upComingRidesInfo}
          customIcon={customIcon} pickUp={pickUp} destination={destination} mapRef={mapRef} setIsInCarpools={setIsInCarpools}
          handleCancelBooking={handleCancelBooking} handleChats={handleChats}
          />
      ) : isInInCancelledRides ? (
        <CancelledRides cancelledRoutes={cancelledRoutes} />
      ) : (
        <RecentRides currentRoute={currentRoute} mapRef={mapRef} />
      )
      }


    </div>
  );
};

export default Components;