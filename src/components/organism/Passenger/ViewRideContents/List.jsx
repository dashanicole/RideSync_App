import Circle from '../../../../assets/Circle.png';
import Dots from '../../../../assets/Dots.png';
import Location from '../../../../assets/Location.png';
import { LongMenu } from '../../../atoms/LongMenu';
import { Card } from '../../../molecules/Card';

export const RecentList = ({ startLocation, endLocation, status, recentRides, handleRecentRide }) => {

    return (
        <div className="p-2  border bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out flex  md:flex-nowrap items-center justify-between gap-4 cursor-pointer md:mr-4 "
            onClick={() => handleRecentRide(recentRides?.driverId,recentRides.startLocation, recentRides.endLocation, recentRides.totalAmount, recentRides.estimatedDuration,
                recentRides.distance, { lat: recentRides.startLatitude, lon: recentRides.startLongitude }, {
                lat: recentRides.endLatitude,
                lon: recentRides.endLongitude
            }, recentRides.userFn, recentRides.userLn, recentRides.userRating, recentRides.status,recentRides.vehicleColor,recentRides.vehiclePlateNo)}
        >
            {/* Left Section: Icons and Text */}
            <div className="flex items-start gap-4 ">
                {/* Icon Column */}
                <div className="flex flex-col justify-center items-center space-y-2">
                    <img src={Circle} alt="circle" className="w-4 h-4 sm:w-6 sm:h-6 md:max-w-6 md:max-h-6 lg:w-5 lg:h-5" />
                    <img src={Dots} alt="dots" className="max-w-6 max-h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-5 lg:h-5" />
                    <img src={Location} alt="location" className="w-8 h-6 sm:w-7 sm:h-7 md:max-w-9 md:max-h-9 lg:max-w-9 lg:max-h-9" />
                </div>
                {/* Text Column */}
                <div >
                    <h2 className="font-bold text-gray-700 text-sm md:text-[15px] md:mb-1">{startLocation}</h2>
                    <p className="text-sm text-gray-500 md:text-[14px]">{endLocation}</p>
                    <p className="text-xs text-gray-400 md:mt-1">
                        <span className='text-[15px]'> </span><span className="text-green-600 text-[15px] font-semibold">{status}</span>
                    </p>
                </div>
            </div>
            {/* Button */}
            {/* <button className="text-gray-500 text-xl md:text-2xl lg:text-3xl self-start md:self-center">
                <img src={Dots} alt="dots" className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 lg:w-10 lg:h-10" />
            </button> */}
        </div>


    )
}



export const UpComingList = ({ anchorEl, setAnchorEl, options, upcomingRides, handleBookingRide }) => {
    return (
        <Card className="bg-gradient-to-b from-white to-gray-50  h-auto w-full md:w-[620px]   p-2 mb-2 rounded-lg  cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out">
            
            <div className="flex flex-col h-full text-gray-800"
                onClick={() => handleBookingRide(upcomingRides.driverId,upcomingRides.routeId,{ lat: upcomingRides.startLatitude, lon: upcomingRides.startLongitude }, { lat: upcomingRides.endLatitude, lon: upcomingRides.endLongitude },
                    upcomingRides.startLocation, upcomingRides.endLocation, upcomingRides.estimatedDuration, upcomingRides.distance, upcomingRides.totalAmount,
                    upcomingRides.travelDate, upcomingRides.userFn, upcomingRides.userLn, upcomingRides.userEmail, upcomingRides.userPhone, upcomingRides.userRating)}
            >

                {/* Trip Date and Amount */}
                <div className="flex justify-between items-center ">
                    <div className="text-sm font-semibold text-gray-600">
                        <span className="text-gray-400 mr-[8px]">Trip Date:</span>
                        <span className="text-red-500 text-[16px]">
                            {upcomingRides ?
                                new Date(upcomingRides.travelDate).toLocaleString("en-US", { timeZone: "Asia/Manila" })
                                :
                                'none'
                            }
                        </span>
                    </div>
                    <div className="flex text-lg items-center font-bold text-green-600 gap-3">
                        ₱{upcomingRides?.totalAmount || "25.00"}
                        <div></div>
                        {/* <LongMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} options={options} /> */}
                    </div>
                </div>

                {/* Locations and Icons */}
                <div className="flex items-center space-x-4">

                    {/* Icons */}
                    <div className="flex flex-col items-center space-y-1">
                        <img src={Circle} alt="start" className="w-[16px] h-[16px]" />
                        <img src={Dots} alt="dots" className="max-w-[18px] h-[18px]" />
                        <img src={Location} alt="end" className="w-[18px] h-[18px]" />
                    </div>

                    {/* Location Details */}
                    <div className="flex flex-col">
                        <p className="text-md font-medium text-gray-700">
                            {upcomingRides?.startLocation || "Giporlos, Eastern Samar, Eastern Visayas, 6811, Pilipinas"}
                        </p>
                        <p className="text-md text-gray-500">
                            {upcomingRides?.endLocation || "Balangiga, Eastern Samar, Eastern Visayas, 6812, Pilipinas"}
                        </p>
                    </div>
                </div>
            </div>
        </Card>

    )
}



export const CancenlledList = ({ startLocation, endLocation, status }) => {
    return (
        <div className="p-5 border bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
                <h2 className="font-semibold text-gray-800 text-lg">{endLocation}</h2>
                <p className="text-sm text-gray-600">{startLocation}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                    {/* 12 October 2024, 2:30 pm */}
                    <span className="ml-1 text-red-500 font-medium">{status}</span>
                </p>
            </div>

        </div>

    )
}
