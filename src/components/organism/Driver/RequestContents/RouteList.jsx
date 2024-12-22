import React, { useContext, useState } from 'react';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';

const RouteList = ({ userId, routeName, location, price, distance, duration, startLatitude, startLongitude, endLatitude, endLongitude }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const { handleRouteDirection, handleRequestInfo, getPassengerInfo } = useContext(RequestContext)

    return (
        <div className='w-full rounded-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg'>
            <div className='flex items-center justify-between p-4'>
                <div className='flex-1'>
                    <h3 className='text-sm font-semibold text-gray-800'>{routeName}</h3>
                    <p className='text-sm text-gray-600'>{location}</p>
                    <p className='text-lg font-bold text-green-600'>Price: ₱{price}</p>
                </div>
                <div className='flex items-center'>
                    <span
                        className='text-blue-600 font-bold'
                        onClick={() => {
                            handleRouteDirection(startLatitude, startLongitude, endLatitude, endLongitude)
                            handleRequestInfo(routeName, location, price, userId, distance, duration)
                            getPassengerInfo(userId)
                        }}>View</span>
                    <div onClick={() => setIsExpanded(!isExpanded)} className='ml-2'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-270' : 'rotate-90'}`} // Adjust rotation classes
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m0 0l3 3m-3-3l3-3" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[200px] p-4 bg-gray-100 rounded-b-xl' : 'max-h-0'}`}>
                {isExpanded && (
                    <>
                        <p className='text-sm text-gray-700'>Estimated Distance: <span className='font-semibold'>{distance}</span></p>
                        <p className='text-sm text-gray-700'>Duration: <span className='font-semibold'>{duration} mins</span></p>
                    </>
                )}
            </div>
        </div>
    );
};

export default RouteList;
