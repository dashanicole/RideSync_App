import React from 'react'
import NookRideLight from '../../../../assets/bookRideLight.png';
import BookBG from '../../../../assets/bookingBg.png';
import { Card } from '../../../molecules/Card';
import { SelectTrip } from '../../../atoms/Select';
import { Button } from '../../../atoms/Button';
import { Map } from '../../../molecules/Map';
import { TextInput } from '../../../atoms/TextInput';
import { DatePicker } from '../../../atoms/DatePicker'; // Assuming you are using CustomDatePicker



const Booking = ({
    searchInput,
    searchInputDest,
    handleSearchInput,
    handleSearchInputDest,
    trip, rideType, passenger, selectedDate,
    handleChangeTrip, handleChangeRideTypes, handleChangePassenger,
    handleDateChange, handleBooking,
    suggestions,
    suggestionsDest, handleSelectSuggestion, handleSelectSuggestionDest,
    handleExploreDestinations,

}) => {
    return (
        <div className='w-full'>
            <div className='flex justify-center'>
                <img src={BookBG} className='h-[150px] md:h-[250px] w-[1000px]' />
            </div>
            <div className='flex justify-center'>
                <Card className=' m-9 w-[1000px] h-auto md:h-[105px] rounded-lg p-3 relative'>
                    {/* <div  >

                        <SelectTrip
                            label="Select Trip"
                            value={trip}
                            onChange={handleChangeTrip}
                            options={[
                                { value: 'One way', label: 'One way' },
                                // { value: 'Round Trip', label: 'Round Trip' },
                            ]}
                            sx={{ minWidth: 120, backgroundColor: 'white' }}
                        />
                        <SelectTrip
                            label="1"
                            value={passenger}
                            onChange={handleChangePassenger}
                            options={[
                                { value: 1, label: '1' },
                                // { value: 2, label: '2' },
                                // { value: 3, label: '3' },
                                // { value: 4, label: '4' },
                                // { value: 5, label: '5' },
                            ]}
                            sx={{ minWidth: 70, backgroundColor: 'white' }}
                        />
                        <SelectTrip
                            label="Type Ride"
                            value={rideType}
                            onChange={handleChangeRideTypes}
                            options={[
                                { value: 'Motorcylce', label: 'Motorcylce' },
                                // { value: 'Car', label: 'Car' },
                            ]}
                            sx={{ minWidth: 120, backgroundColor: 'white' }}
                        />
                    </div> */}
                    <div className="flex flex-col md:flex md:flex-row gap-2 p-2">
                        {/* "Where from?" Input and Suggestions */}
                        <div className="relative">
                            <TextInput
                                label="Where from?"
                                variant="outlined"
                                width="350px"
                                value={searchInput}
                                onChange={handleSearchInput}
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
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
                        </div>

                        {/* "Where to?" Input and Suggestions */}
                        <div className="relative">
                            <TextInput
                                label="Where to?"
                                variant="outlined"
                                width="350px"
                                value={searchInputDest}
                                onChange={handleSearchInputDest}
                            />
                            {suggestionsDest.length > 0 && (
                                <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
                                    {suggestionsDest.map((suggestion) => (
                                        <li
                                            key={suggestion.place_id}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-colors"
                                            onClick={() => handleSelectSuggestionDest(suggestion.lat, suggestion.lon, suggestion.display_name)}
                                        >
                                            {suggestion.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Date Picker */}
                        <DatePicker
                            label="Travel Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            sx={{ width: '500px' }}
                            minDate={new Date()}
                        />
                    </div>

                    <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
                        <Button name="Book Now" variant="contained" size="large" borderRadius="20px" onClick={() => handleBooking(true)} />
                    </div>
                </Card>
            </div>

            <div className='p-5'>

                <div className="flex justify-center relative">
                    {/* Map component with a fixed height */}
                    <div className=" w-[1000px] relative z-0 rounded-2xl">
                        <div>
                            <h1>Book a ride now from Cebu City to anywhere</h1>
                        </div>
                        <Map height="300px" borderRadius="20px" />
                    </div>

                    {/* Button centered over the map */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <Button name="Explore destinations" variant="contained" size="small" borderRadius="20px" bgColor="white" fontColor="blue" onClick={handleExploreDestinations} />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Booking