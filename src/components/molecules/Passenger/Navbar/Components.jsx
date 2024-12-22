import React, { useContext } from 'react';
import { Card } from '../../Card';
import { ViewRidesContext } from '../../../../context/PassengerContext/VieRides/ViewRides';

const Components = () => {

    const { handleNav } = useContext(ViewRidesContext)

    const onRecentRideClick = () => {
        handleNav('recent');
    };

    const onUpcomingRideClick = () => {
        handleNav('upcoming');
    };
    const onCarpoolClick = () => {
        handleNav('carpools');
    };
    const onCancelledRideClick = () => {
        handleNav('cancelled');
    };

    return (
        <div className="w-full">
            <Card className="flex flex-col md:flex-row items-center p-4 rounded-xl shadow-lg bg-white gap-4 md:gap-6">
                {/* Title */}
                <div className="text-xl font-semibold text-gray-800">
                    <h1 className="text-[13px] md:text-[18px]">Rides:</h1>
                </div>

                {/* Cards for ride options */}
                <div className="flex flex-wrap gap-4 w-full justify-center md:justify-start">

                    <div className="flex justify-center items-center rounded-lg cursor-pointer p-3 h-[35px] bg-gradient-to-b from-white   border-gray-200 hover:bg-gray-200 transition duration-200 ease-in-out shadow-md w-full sm:w-auto"
                        onClick={onRecentRideClick}
                    >

                        <h1 className="text-xs md:text-sm font-medium text-gray-700"

                        >Recent Ride</h1>

                    </div>


                    <div className="flex justify-center items-center rounded-lg cursor-pointer p-3 h-[35px] bg-gradient-to-b from-white   border-gray-200 hover:bg-gray-200 transition duration-200 ease-in-out shadow-md w-full sm:w-auto"
                        onClick={onUpcomingRideClick}
                    >
                        <h1 className="text-xs md:text-sm font-medium text-gray-700"

                        >Booking</h1>
                    </div>
                    <div className="flex justify-center items-center rounded-lg cursor-pointer p-3 h-[35px] bg-gradient-to-b from-white   border-gray-200 hover:bg-gray-200 transition duration-200 ease-in-out shadow-md w-full sm:w-auto"
                        onClick={onCarpoolClick}
                    >
                        <h1 className="text-xs md:text-sm font-medium text-gray-700"

                        >Carpools</h1>
                    </div>

                    <div className="flex justify-center items-center rounded-lg cursor-pointer p-3 h-[35px] bg-gradient-to-b from-white   border-gray-200 hover:bg-gray-200 transition duration-200 ease-in-out shadow-md w-full sm:w-auto"
                        onClick={onCancelledRideClick}
                    >
                        <h1 className="text-xs md:text-sm font-medium text-gray-700">Cancelled Rides</h1>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Components;
