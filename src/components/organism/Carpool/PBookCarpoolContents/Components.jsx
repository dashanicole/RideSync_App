import React, { useContext, useState } from 'react';
import { TextInput } from '../../../atoms/TextInput';
import { DatePicker } from '../../../atoms/DatEPicker';
import { Button } from '../../../atoms/Button';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import { PBookCarpoolContext } from '../../../../context/Carpool/PBookCarpool/PBookCarpool';
import { SelectTrip as SelectPayment} from '../../../atoms/Select';
import carpoolBg from '../../../../assets/carpoolBg.jpg'


const Components = () => {
  
  const {handleConfirmBooking, users,passengerInfo,carpoolRides,handleClickCarpool,
    rideInfo,numberOfPassengers,setNumberOfPassengers,totalAmount,setTotalAmount,isBooked,bookedBa,
    handleSearch,
    filteredRides,
    leavingFrom,
    goingTo,
    selectedDate,
    handleSearchInput,
    handleSearchInputDest,
    setSelectedDate,
    suggestions,
    suggestionsDest,
    handleSelectSuggestion,
    handleSelectSuggestionDest,
    profileImage,
    handleChats
  } = useContext(PBookCarpoolContext)
  const [isOpen,setIsOpen]= useState(false)
  const handleOpenModal =()=>{
    setIsOpen(true)
    
  
  }
  return (
    <div className="flex w-auto flex-col items-center justify-center p-5 animate-fadeIn">
        {/* Main Card with Inputs */}
          {/* <img src={carpoolBg} className='md:h-[450px] md:w-[1100px]' /> */}
     
        <div className="mb-3 border  flex flex-col md:flex-row md:w-[1000px] w-full rounded-xl shadow-lg p-5 gap-4 md:items-center">
          <div className='md:w-[90%]'>
          <TextInput
          label="Leaving from"
          size="large"
          value={leavingFrom}
          onChange={handleSearchInput}
        />
        {suggestions.length > 0 && (
            <ul className="absolute   bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto z-10">
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
          <span className="hidden md:block text-gray-400">|</span>
      <div className='md:w-[90%]'>
      <TextInput
          label="Going to"
          size="large"
          value={goingTo}
          onChange={handleSearchInputDest}
        />
         {suggestionsDest.length > 0 && (
                 <ul className="absolute  bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto w-full z-10">
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
          <span className="hidden md:block text-gray-400">|</span>

          <div className="w-full md:w-[700px]">
          <DatePicker
            onChange={(date) => setSelectedDate(date)}
          />
          </div>
          <Button name="Search" variant="contained" size="large" onClick={handleSearch} />
        </div>
      {/* Available Carpool Section */}
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        {/* Carpool List */}
        <div className="w-full lg:w-3/5 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Carpools:</h2>
          <div className="overflow-y-auto max-h-[600px] p-4 overflow-x-hidden custom-scrollbar space-y-5">
            {
              filteredRides  && 
              filteredRides.filter((rides)=>{
                const today = new Date();
                today.setHours(0,0,0,0)
                const rideDateTime = new Date(rides.travelDateTime)
                return rides.status !== 'completed' && rideDateTime >= today;
              }).length > 0 ?
              filteredRides.filter((rides)=>{
                const today = new Date();
                today.setHours(0,0,0,0)
                const rideDateTime = new Date(rides.travelDateTime)
                return rides.status !== 'completed' && rideDateTime >= today;
              }).slice().reverse().map((rides,index)=>(
                <CarpoolCardRides
                isBooked={isBooked}
                key={index}
                rides={rides}
                handleClickCarpool={handleClickCarpool}
                startLocation={rides?.startLocation}
                endLocation={rides?.endLocation}
                pricePerPerson={rides?.pricePerPerson}
                availableSeats={rides?.NumSets}
                dateTime={rides?.travelDateTime && new Date(rides.travelDateTime).toLocaleString() }
              />
              ))
              :
                <div className="flex ">
                    <h2 className="text-xl font-semibold text-gray-500">No carpool available</h2>
                
                  </div>
            }
           
          </div>
        </div>
        {/* Carpool Details */}
        <div className="w-full lg:w-2/5">
        {
          rideInfo?.startLocation && (
            <CarpoolCardDetails handleChats={handleChats} profileImage={profileImage} bookedBa={bookedBa} isBooked={isBooked} handleOpenModal={handleOpenModal} rideInfo={rideInfo} setNumberOfPassengers={setNumberOfPassengers} totalAmount={totalAmount} setTotalAmount={setTotalAmount}/>
          )
        }
        </div>
        <ConfirmationModal   handleConfirmBooking={handleConfirmBooking} isOpen={isOpen} onClose={()=>setIsOpen(false)} rideInfo={rideInfo} totalAmount={totalAmount} numberOfPassengers={numberOfPassengers}/>
      </div>
    </div>
  );
};

const CarpoolCardRides = ({isBooked,rides,handleClickCarpool, startLocation, endLocation, pricePerPerson, availableSeats, dateTime }) => {
  const shortenLocation = (location) => (location.length > 30 ? `${location.substring(0, 30)}...` : location);

  return (
    <div className="cursor-pointer p-5 bg-white rounded-lg shadow-xl border border-gray-200 hover:scale-105 transform transition duration-300 ease-in-out"
    onClick={()=>handleClickCarpool(rides)}
 
    >
      <span className="font-medium text-blue-500">Travel DateTime:</span>
      <span className="ml-2 text-gray-700">{dateTime}</span>
    

 


      <div className="flex justify-between items-center text-lg font-semibold text-gray-800 my-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-yellow-500">🚗</span>
          <span className="text-sm text-gray-700">{shortenLocation(startLocation)}</span>
        </div>
        <span className="text-2xl text-gray-400">→</span>
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-green-500">📍</span>
          <span className="text-sm text-gray-700">{shortenLocation(endLocation)}</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-blue-500">Price:</span>
          <span className="text-xl font-bold text-green-600">₱{pricePerPerson}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-blue-500">Seats:</span>
          <span className="text-xl font-bold text-red-600">{availableSeats}</span>
        </div>
      </div>
    </div>
  );
};
const CarpoolCardDetails = ({handleChats,bookedBa,profileImage,isBooked,handleOpenModal,rideInfo,setNumberOfPassengers,totalAmount,setTotalAmount}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 animate-fadeIn">
      <div className="flex items-center space-x-2">
        <span className="text-lg font-medium text-blue-500">📅</span>
        <span className="text-sm text-gray-700">Travel Date:{rideInfo?.travelDate}</span>
      
      </div>

      <div className="text-gray-900 space-y-3">
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-indigo-600">🚗</span>
          <span className="text-sm font-medium">{rideInfo?.startLocation}</span>
        </div>
        {/* <span className="text-2xl text-gray-400">→</span> */}
        <div className="flex items-center space-x-3">
          <span className="text-3xl text-green-500">📍</span>
          <span className="text-sm font-medium">{rideInfo?.endLocation}</span>
        </div>
      </div>

      <div className="flex gap-5 items-center text-center">
        <img
          src={profileImage}
          alt="Driver"
          className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-xl"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{rideInfo?.driverName}</h2>
          <span className="text-sm text-gray-500">Ratings: ⭐(5/5)</span>
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={()=>handleChats(rideInfo?.userId)}
        >
          <span className="text-xl">💬</span>
        </div>
      </div>

      <div className="space-y-3 text-gray-800">
        <p className="text-lg font-medium">Vehicle <span className="text-green-600">{rideInfo?.vehicle}</span></p>
        <p className="text-lg font-medium">Total Seats Available: <span className="text-green-600">{rideInfo?.seats}</span></p>
        <p className="text-lg font-medium">Price per Person: <span className="text-orange-500">₱{rideInfo?.pircePerPerson}</span></p>
      </div>

      <div className="flex items-center justify-between space-x-4">
        {
              (bookedBa)  ? 
              <></>
            :
           <>
            <Counter  totalAmount={totalAmount} pricePerPerson={rideInfo?.pircePerPerson} maxValue={rideInfo?.seats} setNumberOfPassengers={setNumberOfPassengers} setTotalAmount={setTotalAmount}/>
            <div className="text-lg font-semibold text-gray-800">X</div>
            <div className="text-lg font-semibold text-indigo-600">₱{totalAmount}</div>
              </>
        }
      
      </div>
      <div>
          <div className="text-lg font-semibold text-gray-800">Payment Method: <span className='text-gray-700'>{rideInfo?.paymentMethod}</span></div>
         
      </div>

      <div className="mt-4">
        {
          (bookedBa) ?
            <Button name="Booked" variant="contained" className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-200" />
            :
            rideInfo?.seats > 0 ?
            <Button name="Book now" variant="contained" className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-200" onClick={handleOpenModal}/>
            :
            <Button name="Fully Booked" variant="contained" className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-200"  bgColor='red'/>

        }

        {

        }
      </div>
    </div>
  );
};
const Counter = ({totalAmount,pricePerPerson, initialValue = 1, minValue = 0, maxValue,setNumberOfPassengers,setTotalAmount }) => {
  const [value, setValue] = useState(initialValue);
 
  const increase = () => {
    if (value <= maxValue){
    const newValue = value + 1;  
    setValue(newValue);  
    setTotalAmount(newValue * pricePerPerson); 
    setNumberOfPassengers(newValue)
    }
  };

  const decrease = () => {
    if (value >= minValue){
      const newValue = value - 1; 
      setValue(newValue);
      setTotalAmount(totalAmount-pricePerPerson); 
      setNumberOfPassengers(newValue)
    }
  };

  return (
    <div className="flex items-center space-x-4 border border-gray-300 p-2 rounded-md">
      <button
        className="bg-gray-200 px-4 py-2 rounded-md"
        onClick={decrease}
        disabled={value <= minValue}
      >
        -
      </button>
      <span className="text-xl font-semibold">{value}</span>
      <button
        className="bg-gray-200 px-4 py-2 rounded-md"
        onClick={increase}
        disabled={value >= maxValue}
      >
        +
      </button>
    </div>
  );
};
const ConfirmationModal = ({handleConfirmBooking, isOpen, onClose, rideInfo, totalAmount, numberOfPassengers, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
  <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg space-y-6 animate-fadeIn border-t-8">
    
    <div className="text-center">
      <h2 className="text-3xl font-bold text-colorBlue">🚗 Confirm Your Booking</h2>
      <p className="text-lg text-blue-500">Please review your booking details</p>
    </div>

    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4 rounded-lg shadow-lg">
      <div className="space-y-4">
      <p className="text-sm flex items-center">
      <span className="font-medium">📅 Travel Date:</span>
      <span className="ml-2">{rideInfo?.travelDate}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">🗺 From:</span>
      <span className="ml-2 text-gray-700">{rideInfo?.startLocation}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">📍 To:</span>
      <span className="ml-2 text-gray-700">{rideInfo?.endLocation}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">👤 Driver:</span>
      <span className="ml-2 text-gray-700">{rideInfo?.driverName}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">🚘 Vehicle:</span>
      <span className="ml-2 text-gray-700">{rideInfo?.vehicle}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">👥 Passengers:</span>
      <span className="ml-2 text-gray-700">{numberOfPassengers}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">💸 Total Amount:</span>
      <span className="ml-2 text-gray-700 font-semibold">₱{totalAmount}</span>
    </p>
    <p className="text-sm flex items-center">
      <span className="font-medium text-gray-800">💸 Payment Method:</span>
      <span className="ml-2 text-gray-700 font-semibold">{rideInfo?.paymentMethod}</span>
    </p>

      </div>
    </div>

    <div className="flex items-center justify-between mt-6 space-x-4">
      <button
        onClick={onClose}
        className="bg-gradient-to-r from-blue-300 to-blue-400 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-400 hover:to-blue-500 transition-all duration-200"
      >
        ❌ Cancel
      </button>
      <button
        onClick={handleConfirmBooking}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
      >
        ✅ Confirm
      </button>
    </div>

    <div className="text-center text-blue-500 text-xs">
      <p>Your booking is subject to our terms and conditions.</p>
    </div>
  </div>
</div>

  );
};


export default Components;
