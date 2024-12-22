import React, { useContext,useEffect, useRef,useState } from 'react';
import { Card } from '../../../molecules/Card';
import { RecentList } from './List';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import CircleBlue from '../../../../assets/CircleBlue.png';
import CircleRed from '../../../../assets/CircleRed.png';
import { Ratings } from '../../../atoms/Ratings';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { TextInput } from '../../../atoms/TextInput';
import { Button } from '../../../atoms/Button';
import { Map } from '../../../molecules/Map';
import { ViewRidesContext } from '../../../../context/PassengerContext/VieRides/ViewRides';
import Mapa from './MAPA.JSX';
import HalfRating from '../../../atoms/Ratings/Components';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { BookingConfirmedModal as RateConfirmationModal} from '../../../atoms/ConfirmedModal';
import { useNavigate } from 'react-router-dom';  


const RecentRides = ({ mapRef, currentRoute }) => {
    const navigate = useNavigate();  
    const { 
        customIcon, 
        handleRecentRide,
        recentRides,
         pickUp,
        destination,
        rateModal, 
        setRateModal,
        handleRateUser
    } = useContext(ViewRidesContext);

    const firstRoute = currentRoute && currentRoute.length > 0 ? currentRoute[0] : null;
    const [ratings,setRatings] =useState(5)
    const handleRatingChange = (event, newValue) => {
        setRatings(newValue); 
    };
     const handleRateSubmit = (userId,rating)=>{
        console.log('user rating:',ratings);
        setRateModal(!rateModal)
        handleRateUser(userId,rating)
     } 
     const handleRefresh = ()=>{
        navigate('/passenger/loading?route=/passenger/viewRideContents&active=viewRides');
     }

    const [profileImage,setProfileImage]= useState()
    const [isTherProfile,setIsThereProfile] = useState(false)

    useEffect(() => {
            const interval = setTimeout(() => {
            try {
                if (recentRides?.userId) {
                const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${recentRides?.userId}?${new Date().getTime()}`;
                setProfileImage(cloudinaryUrl);
                fetch(cloudinaryUrl)
                    .then(response => {
                    if (!response.ok) {
                        setIsThereProfile(false);  
                    } else 
                        setIsThereProfile(true);  
                })}
            } catch (error) {
                setIsThereProfile(false);  
            }
            }, 1);  
        return () => clearInterval(interval);
    }, [recentRides?.userId]);



    return (
       
       <Card className="border bg-gradient-to-b from-white to-gray-50 mt-5 p-4 flex flex-col md:flex-col gap-6 items-start w-full shadow-xl rounded-lg md:justify-center ">
            <div className="flex flex-col w-full md:flex-row md:justify-center gap-5 ">
                <Card className="h-[70vh] border w-full md:w-[700px] p-2 md:p-5 rounded-lg shadow-2xl bg-gradient-to-b from-white to-gray-50 overflow-hidden">
                    <h1 className="text-lg font-semibold text-gray-700 mb-4">
                        Recent Rides
                    </h1>
                    <div className="overflow-y-auto   max-h-[90%] space-y-3 p-2 custom-scrollbar">
                        {currentRoute?.length > 0 ? (
                            currentRoute.slice().reverse().map((ride, index) => (
                                <RecentList
                                    key={index}
                                    startLocation={ride?.startLocation}
                                    endLocation={ride?.endLocation}
                                    status={ride?.status}
                                    recentRides={ride}
                                    handleRecentRide={handleRecentRide}
                                />
                            ))
                        ) : (
                            <p>No current rides available</p>
                        )}
                    </div>
                </Card>
                {
                    recentRides?.status == "onGoing" ?
                        <Card className="h-[70vh] w-full md:w-[500px] p-4 rounded-xl shadow-lg bg-white overflow-y-auto space-y-4 custom-scrollbar">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Route</h2>

                            {/* Route Information */}
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-center space-y-4">
                                    <img src={CircleBlue} alt="start" className="w-6 h-6 rounded-full border border-gray-300" />
                                    <img src={CircleRed} alt="end" className="w-6 h-6 rounded-full border border-gray-300" />
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <TextInput
                                        isReadOnly
                                        value={recentRides?.startLocation || ''}
                                        height="40px"
                                    />
                                    <TextInput
                                        isReadOnly
                                        value={recentRides?.endLocation || ''}
                                        height="40px"
                                    />
                                </div>
                            </div>

                            {/* Route Details */}
                            <div className="w-full border-t pt-4">
                                <div className="flex justify-between items-center text-gray-600 mb-4">
                                    <p className="text-lg font-bold text-green-600">₱{recentRides?.totalAmount || '0'}</p>
                                    <p className="text-sm">
                                        est {recentRides?.duration || '0'} mins
                                        <span className="text-red-600"> • {recentRides?.distance || '0'} km</span>
                                    </p>
                                </div>
                                {/* Map */}
                                <div className="w-full overflow-hidden rounded-lg shadow-inner ">
                                    <Map mapRef={mapRef} height="500px" selectedPosition={pickUp} selectedPositionDest={destination} customIcon={customIcon} />
                                </div>
                            </div>

                            {/* Driver Information */}
                            <div className="border-t pt-6 space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">Driver Information</h3>
                                <div className="flex flex-col items-center space-y-3 text-center">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">{recentRides?.userFn + " " + recentRides?.userLn}</span> on a {recentRides?.vehicleColor} Motorcycle,
                                        license plate <span className='font-bold'>{recentRides?.vPlateNum}</span>.
                                    </p>
                                    <img src={isTherProfile ? profileImage:DefaultProfile} alt="driver profile" className="w-20 h-20 rounded-full shadow-md" />
                                    <Ratings value={recentRides?.userRatings} />
                                    <span className="text-sm text-gray-600">{recentRides?.userRatings} /5</span>
                                </div>
                            </div>
                        </Card>
                        :
                         
                         <Card className="border h-[70vh]  w-full md:w-[500px] p-4 rounded-xl shadow-lg bg-gradient-to-b from-white to-gray-50   overflow-y-auto space-y-4 custom-scrollbar ">
                            {
                                recentRides?.userFn &&
                                <>
                                 <h1 className='mb-2'>Thank you for choosing rideSync</h1>
                                    <Card className='flex flex-col items-center p-2 bg-gradient-to-b from-white to-gray-50 border border-gray-200'>
                                        <h1>Your order was fulfilled by <span className='font-bold'>{(recentRides?.userFn || recentRides?.userLn) ? recentRides?.userFn + " " + recentRides?.userLn : "Kennetee James Doz"}</span>  on a  </h1>
                                        <h1>{recentRides?.vehicleColor} Motorcycle, license plate number <span className='font-bold'>{recentRides?.vPlateNum}</span>.</h1>
                                        <img src={isTherProfile ? profileImage:DefaultProfile}     className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg" />
                                        <HalfRating value={recentRides?.userRatings} />({recentRides?.userRatings}/5)
                                    </Card>
                                    <Card className="flex bg-gradient-to-b from-white to-gray-50 border border-gray-200  items-center justify-between p-4 shadow-lg rounded-lg">
                                        <div className="flex items-center">

                                            <div className="flex flex-col items-center mr-4">
                                                <span className="w-3 h-3 rounded-full bg-blue-500  mb-3"></span>
                                                <span className="w-3 h-3 rounded-full bg-red-500"></span>

                                            </div>

                                            <div>
                                                <h1 className="text-sm font-medium text-gray-800 mb-1">
                                                    {recentRides?.startLocation || '   Sanciangko Street, Pailob, Pahina Central, Cebu City'}
                                                </h1>
                                                <h1 className="text-sm text-gray-600">
                                                    {recentRides?.endLocation || '    USJR Coliseum, Mountain View Village, Cebu City,'}
                                                </h1>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center bg-blue-100 max-h-[70px]  w-[90px] p-2 rounded-lg">
                                            <h2 className="text-lg font-semibold text-blue-600">₱{recentRides?.totalAmount || '0'}</h2>
                                            <span className="text-xs text-gray-500">in cash</span>
                                        </div>
                                    </Card>
                                    <div className='relative z-0' >
                                        <Map mapRef={mapRef} height="500px" selectedPosition={pickUp} selectedPositionDest={destination} customIcon={customIcon} />
                                    </div>
                                    <Card className="w-full max-w-md bg-blue-50 shadow-lg rounded-lg p-6 space-y-6">
                                        {/* Header */}
                                        <h2 className="text-lg font-semibold text-gray-800">Rate your ride:</h2>

                                        {/* Rating Section */}
                                        <div className="bg-white rounded-lg p-4 shadow-md">
                                            <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">How was your ride?</h3>
                                            <div className="flex justify-center">
                                            <Rating
                                                name="ride-rating"
                                                value={ratings}
                                                size="large"
                                                onChange={handleRatingChange}
                                            />
                                            </div>
                                        </div>

                                        {/* Comment Box */}
                                        <div className="bg-white rounded-lg p-4 shadow-md">
                                            <TextField
                                                id="comment-box"
                                                label="Leave a message if you want"
                                                multiline
                                                rows={4}
                                                placeholder="Your feedback is valuable!"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex justify-between items-center mt-4">
                                            <Button
                                                name="Rate Now"
                                                variant="contained"
                                                size="meduim"
                                                className="mt-4"
                                            onClick={()=>handleRateSubmit(recentRides?.userId,ratings)}
                                            />
                                            <Button
                                                name="Maybe Later"
                                                size="meduim"
                                                className="mt-4"
                                            />
                                        </div>
                                        {
                                            rateModal &&
                                        
                                            <RateConfirmationModal 
                                            title='Thank You for Rating!' 
                                            message="Your feedback helps us improve our drivers' service. We appreciate your time!" 
                                            setIsBooking={setRateModal}
                                            handleEvent={handleRefresh}
                                            />
                                        
                                        
                                        
                                        }
                                    </Card>
                                </>
                            }
                        </Card>
                        
                       
                }
            </div>
        </Card>
       
    );
};

export default RecentRides;
