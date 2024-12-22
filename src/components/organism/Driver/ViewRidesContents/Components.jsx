import React, { useContext } from 'react'
import { Navbar } from '../../../molecules/Driver/Navbar'
import RecentRides from './RecentRides'
import { Card } from '../../../molecules/Card'
import Booking from './Booking'
import CancelledRides from './CancelledRides'
import { ViewRidesContext } from '../../../../context/DriverContext/ViewRides/ViewRidesContext'

const Components = () => {

    const {
        mapRef,
        mapRefBooking,
        isInRecentRide,
        isInBooking,
        isInInCancelledRides,
        currentRoute,
        bookings,
        pickUp,
        destination,
        handleRecentRideInfo,
        passengerInfo,
        handleBookingRideInfo,
        handleCancelBooking,
        cancelledRoutes,
        markBookingAsDone,
        bookingInfo,
        rateModal, 
        setRateModal,
        handleRateUser
        } = useContext(ViewRidesContext)

    return (
        <div className="flex flex-col items-center pl-5 pr-5 w-full">
            <Navbar />

            <Card className='m-5  md:h-[75vh] rounded-xl w-full'>
                {
                    isInBooking ? (
                        <Booking mapRefBooking={mapRefBooking} pickUp={pickUp}
                            destination={destination} bookings={bookings} bookingInfo={bookingInfo} 
                            handleBookingRideInfo={handleBookingRideInfo} handleCancelBooking={handleCancelBooking}
                            markBookingAsDone={markBookingAsDone}
                            />
                    ) :
                        isInInCancelledRides ? (
                            <CancelledRides cancelledRoutes={cancelledRoutes} />
                        ) : (
                            <RecentRides
                                mapRef={mapRef}
                                currentRoute={currentRoute}
                                pickUp={pickUp}
                                destination={destination}
                                handleRecentRideInfo={handleRecentRideInfo}
                                passengerInfo={passengerInfo}
                                rateModal ={rateModal}
                                setRateModal={setRateModal}
                                handleRateUser={handleRateUser}
                            />
                        )
                }


            </Card >
        </div >
    )
}

export default Components