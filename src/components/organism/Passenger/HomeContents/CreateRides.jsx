import React, { useContext,useState } from 'react'
import { Card } from '../../../molecules/Card';
import Circle from '../../../../assets/circle.png'
import Dots from '../../../../assets/dots.png'
import Location from '../../../../assets/location.png'
import MotorIcon from '../../../../assets/motorIcon.png'
import CarIcon from '../../../../assets/CarIcon.png'
import { TextInput } from '../../../atoms/TextInput'
import { Button } from '../../../atoms/Button'
import { FindRouteContext } from '../../../../context/PassengerContext/FindRoute/FindRouteContext';
import {useNavigate} from 'react-router-dom'
import { WarningModal } from '../../../atoms/WarningModal';
import CarpoolAnimation from '../../../../assets/carpool.gif'
import ScheduleAnimation from '../../../../assets/calendar.gif'
import { FaCarSide, FaCalendarAlt } from 'react-icons/fa';

const CreateRides = () => {
    const navigate = useNavigate();
    const {
        searchInput,
        suggestions,
        handleSearchInput,
        handleSelectSuggestion,
        searchInputDest,
        suggestionsDest,
        handleSearchInputDest,
        handleSelectSuggestionDest,
        handleRouteDirection,
        setWarning,
        warning,
        setStep1,
        setStep2,
        handleProceed,
    } = useContext(FindRouteContext)

    const handleCarpoolClick = ()=>{
        navigate('/passenger/bookCarpoolContents')
    }

    const handleBookRideClick = ()=>{
        navigate('/passenger/bookRideContents')
    }

    return (
        <div className="flex backdrop-blur-2xl   flex-col  bg md:w-[430px]"> 
            <div className="flex flex-row gap-6 items-center justify-start w-full max-w-md ml-5 mb-3">
                    {/* Carpool Section */}
                    <div 
                        className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={handleCarpoolClick}
                    >
                        <div className="flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full shadow-lg">
                            <FaCarSide size={28} /> {/* Carpool Icon */}
                        </div>
                        <h1 className="mt-2 text-lg font-bold text-gray-800 hover:text-blue-600">
                            Carpool
                        </h1>
                    </div>

                    {/* Divider */}
                    <div className="w-1 h-12 bg-gray-300"></div>

                    {/* Schedule Ride Section */}
                    <div 
                        className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={handleBookRideClick}
                    >
                        <div className="flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-full shadow-lg">
                            <FaCalendarAlt size={28} /> {/* Schedule Icon */}
                        </div>
                        <h1 className="mt-2 text-lg font-bold text-gray-800 hover:text-green-600">
                            Schedule a Ride
                        </h1>
                    </div>
                </div>

            <div className="flex  flex-col gap-5 border-2 shadow-lg bg-gray-50 items-start w-full md:w-[450px] h-[300px] md:h-[300px] rounded-2xl p-5">

                <div className="flex items-center mb-5 space-x-4">

                    <div className="hover:shadow-2xl p-2 rounded-full cursor-pointer">
                    </div>
                    <div className="hover:shadow-2xl p-2 rounded-full cursor-pointer">
                    </div>
                </div>
               

                <div className='flex  justify-center w-full'>
                    <div>
                        <img src={Circle} alt="Motorbike" className="ml-1.5 mt-3 w-5 h-5" />
                        <img src={Dots} alt="Motorbike" className="w-8 h-8" />
                        <img src={Location} alt="Motorbike" className="w-8 h-8" />
                    </div>
                    <div className="grid grid-cols-1 w-[90%] gap-5 ">

                        <TextInput
                            label="Pickup location*"
                            variant="outlined"
                            size="small"
                            value={searchInput}
                            onChange={handleSearchInput}
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute mt-[40px] bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-[70%] md:w-[325px] z-10">
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.place_id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                        onClick={() => handleSelectSuggestion(suggestion.lat, suggestion.lon, suggestion.display_name)}
                                    >
                                        {suggestion.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <TextInput
                            label="Destination*"
                            variant="outlined"
                            size="small"
                            value={searchInputDest}
                            onChange={handleSearchInputDest}
                        />
                        {suggestionsDest.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto mt-[100px] w-[70%] md:w-[325px] z-10">
                                {suggestionsDest.map((suggestion) => (
                                    <li
                                        key={suggestion.place_id}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                        onClick={() => {
                                            handleSelectSuggestionDest(suggestion.lat, suggestion.lon, suggestion.display_name);
                                        }}
                                    >
                                        {suggestion.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className='flex justify-between'>
                            <Button name="Find Route" variant="contained" size="large" onClick={handleRouteDirection} />
                            <Button name="Procced" variant="contained" size="large" onClick={() => handleProceed(true)} />
                        </div>
                       
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateRides