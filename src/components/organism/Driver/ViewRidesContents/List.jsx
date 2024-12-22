import { Card } from "../../../molecules/Card"
import { LongMenu } from "../../../atoms/LongMenu"
import Circle from '../../../..//assets/Circle.png';
import Dots from '../../../../assets/Dots.png';
import Location from '../../../../assets/Location.png';



export const RecentList = ({ startLocation, endLocation, status, startLatitude, startLongitude, endLatitude, endLongitude, handleRecentRideInfo, routes }) => {

    return (
        <div className=" border from-white   p-4 mb-4 hover:shadow-xl cursor-pointer transition-shadow duration-300 bg-gradient-to-b  to-gray-50   rounded-lg shadow-md flex md:flex-nowrap items-center gap-4"
            onClick={() => handleRecentRideInfo(routes.userId,{ lat: startLatitude, lon: startLongitude }, { lat: endLatitude, lon: endLongitude }, routes.userFn, routes.userLn, routes.userPhone, routes.userRating, startLocation, endLocation, routes.totalAmount, routes.estimatedDuration, routes.distance)}
        >
            
            <div className="flex items-start gap-4">

                <div className="flex flex-col justify-center items-center space-y-1">
                    <img src={Circle} alt="circle" className="w-4 h-4 sm:w-6 sm:h-6 md:max-w-6 md:max-h-6 lg:w-5 lg:h-5" />
                    <img src={Dots} alt="dots" className="max-w-6 max-h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-5 lg:h-5" />
                    <img src={Location} alt="location" className="w-8 h-6 sm:w-7 sm:h-7 md:max-w-9 md:max-h-9 lg:max-w-9 lg:max-h-9" />
                </div>


                <div>
                    <h2 className="font-bold text-gray-700 text-sm md:text-[15px] md:mb-1">{startLocation}</h2>
                    <p className="text-sm text-gray-500 md:text-[16px]">{endLocation}</p>
                    <p className="text-xs text-gray-400 md:mt-2">
                        <span className="text-green-600 text-[15px] font-semibold">{status}</span>
                    </p>
                </div>
            </div>

            {/* Button */}
            <button className="text-gray-500 text-xl md:text-2xl lg:text-3xl self-start md:self-center">
                {/* <img src={Dots} alt="dots" className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10" /> */}
            </button>
        </div>
    )
}


export const BookingList = ({ travelDate, totalAmount, startLocation, endLocation, bookings, handleBookingRideInfo }) => {
    return (
        <Card className=" bg-gradient-to-b border from-white to-gray-50  h-auto w-full md:w-auto p-4 mb-4 rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer">
            <div className="flex flex-col  text-gray-800"
                onClick={() => handleBookingRideInfo(bookings.userId,bookings.routeId,{ lat: bookings.startLatitude, lon: bookings.startLongitude }, { lat: bookings.endLatitude, lon: bookings.endLongitude }, bookings.startLocation,
                    bookings.endLocation, bookings.estimatedDuration, bookings.distance, bookings.totalAmount, bookings.travelDate, bookings.userFn, bookings.userLn, bookings.userEmail, bookings.userRating
                )}
            >
                
                <div className="flex justify-between items-center  ">
                    <div className="text-sm font-semibold text-gray-600">
                        <span className="text-gray-400 mr-2">Trip Date:</span>
                        <span className="text-blue-500 text-sm font-small">
                            {travelDate ? new Date(travelDate).toLocaleString("en-US", { timeZone: "Asia/Manila" }) : 'N/A'}
                        </span>
                    </div>
                    <div className="flex text-xl font-bold text-green-600 gap-2">
                        ₱ {totalAmount ? totalAmount : "25.00"}
                    </div>
                </div>

                {/* Locations and Icons */}
                <div className="flex items-center space-x-5  ">
                    {/* Icons */}
                    <div className="flex flex-col items-center space-y-2">
                        <img src={Circle} alt="start" className="w-4 h-4" />
                        <img src={Dots} alt="dots" className="max-w-5 h-5" />
                        <img src={Location} alt="end" className="w-5 h-5" />
                    </div>

                    {/* Location Details */}
                    <div className="flex flex-col">
                        <p className="text-lg font-medium text-gray-700">
                            {startLocation ? startLocation : "Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"}
                        </p>
                        <p className="text-md text-gray-500">
                            {endLocation ? endLocation : "Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"}
                        </p>
                    </div>
                </div>


            </div>
        </Card>


    )
}

export const CancenlledList = ({ startLocation, endLocation, status }) => {
    return (
        <div className="p-4 mb-4   bg-gradient-to-b border from-white to-gray-50  rounded-lg shadow flex items-center justify-between">
            <div>
                <h2 className="font-medium text-gray-700">{endLocation}</h2>
                <p className="text-sm text-gray-500">{startLocation}</p>
                <p className="text-xs text-gray-400"><span className="text-red-600">{status}</span></p>
            </div>
            {/* <button className="text-gray-500">
                •••
            </button> */}
        </div>
    )
}