import React, { useContext, useEffect, useRef, useState } from 'react';
import { Card } from '../../../molecules/Card';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';
// import { Map } from '../../../molecules/Map';
import { TextInput } from '../../../atoms/TextInput';
import { Button } from '../../../atoms/Button';
import CircleBlue from '../../../../assets/CircleBlue.png';
import Dots from '../../../../assets/Dots.png';
import CircleRed from '../../../../assets/CircleRed.png';
import DefaultProfile from '../../../../assets/DefaultProfile.png';
import Location from '../../../../assets/location.png';
import { Skeleton } from '../../../atoms/Skeleton';
import { Ratings } from '../../../atoms/Ratings';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DestMarker from '../../../../assets/location.png'
import Driver from '../../../../assets/driver2.png'
import otwIcon from '../../../../assets/MotorCycle.png'
import StartLocation from '../../../../assets/startLocation.png'
import Payment from './Payment';
import { BASEURL, updateRequest } from '../../../../utils/Service';


const PassengerApproval = ({ }) => {
    const { driverInfo, socket, isRideCancelled, currentRide, passengerInfo, passengerApproval, driverMap, selectedPosition, selectedPositionDest,
        setSelectedPosition, setStep2, setStep1, customIcon, routingControlRef, request,handleChats } = useContext(RequestContext);

    const [driverToPassenger, setDriverToPassenger] = useState(false)
    const [initialPosition, setInitialPosition] = useState(selectedPosition);
    const [hasRendered, setHasRendered] = useState(false); // To track if it has already rendered
    const [startLocaiton, setStartLocation] = useState(null)
    const [pickUpLoc, setPickUpLoc] = useState({ lat: selectedPosition?.lat, lon: selectedPosition?.lon })
    const [destLoc, setDestLoc] = useState({ lat: selectedPositionDest?.lat, lon: selectedPositionDest?.lon })
    const [passenger, setPassenger] = useState(passengerInfo)
    const [routeRequest, setRouteRequest] = useState(request)
    const [isGoingTodestination, setIsGoingToDestination] = useState(false)
    const [isGoingToPickLoc, setIsGoingToPickUpLoc] = useState(false)
    const [paymentModal, setPaymentModal] = useState(false);

    // Update passenger and routeRequest when passengerInfo and request become available
    useEffect(() => {
        if (passengerInfo) {
            setPassenger(passengerInfo);
            console.log("Updated passenger info:", passengerInfo);
        }
    }, [passengerInfo]);

    useEffect(() => {
        if (request) {
            setRouteRequest(request);
            console.log("Updated route request:", request);
        }


    }, [request]);

    useEffect(() => {
        if (selectedPosition && selectedPositionDest && !hasRendered && currentRide) {
            const timeoutId = setTimeout(() => {
                handleRouteDirection();
                setHasRendered(true);
            }, 1000);

            // Clean up the timeout when selectedPosition or selectedPositionDest changes
            return () => clearTimeout(timeoutId);
        }

        console.log("Pick up location:", pickUpLoc);
        console.log("Destination location:", destLoc);
        console.log("Selected position:", selectedPosition);
        console.log("Passenger info:", passenger);
        console.log("Route request:", routeRequest);

        console.log("Current Ride:", currentRide);



    }, [selectedPosition, selectedPositionDest, hasRendered]);




    const handleRouteDirection = async () => {
        const map = driverMap.current;

        setStartLocation(null)
        setSelectedPosition({ lat: selectedPosition?.lat, lon: selectedPosition?.lon });
        // Ensure map and positions are ready
        if (map && selectedPosition && selectedPositionDest) {
            // Remove any existing route control
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }

            try {
                // Create new route control
                routingControlRef.current = L.Routing.control({
                    waypoints: [
                        L.latLng(selectedPosition?.lat, selectedPosition?.lon),
                        L.latLng(selectedPositionDest?.lat, selectedPositionDest?.lon),
                    ],
                    createMarker: () => null, // Prevent default marker creation
                    show: false,
                    routeWhileDragging: true,
                    lineOptions: {
                        styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }],
                    },
                }).addTo(map);

            } catch (error) {
                console.error("Routing error:", error);
                alert("Failed to calculate route. Please try again later.");
            }
        } else {
            console.log("Waiting for map and positions to be ready");
        }


        if (map) {
            if (selectedPositionDest) {
                map.flyTo([selectedPosition?.lat, selectedPosition?.lon], 17, { animate: true, duration: 1.5 });
            }
        }
    };

    const handleFindMyLocation = () => {

        const map = driverMap.current;

        // Ensure map and positions are ready
        if (map && selectedPosition && selectedPositionDest) {
            // Remove any existing route control
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log("My location:", latitude, longitude);
                    setStartLocation({ lat: latitude, lon: longitude });
                    setDriverToPassenger(true)
                    const map = driverMap.current;


                    // Ensure map and positions are ready
                    if (map && selectedPosition && selectedPositionDest) {
                        // Remove any existing route control
                        if (routingControlRef.current) {
                            map.removeControl(routingControlRef.current);
                        }

                        try {
                            // Create new route control
                            routingControlRef.current = L.Routing.control({
                                waypoints: [
                                    L.latLng(latitude, longitude),
                                    L.latLng(selectedPosition?.lat, selectedPosition?.lon)
                                ],
                                createMarker: () => null, // Prevent default marker creation
                                show: false,
                                routeWhileDragging: true,
                                lineOptions: {
                                    styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
                                }
                            }).addTo(map);
                            setIsGoingToPickUpLoc(false)
                            socket.emit("driverIsOtw", passenger.userId, latitude, longitude)
                            setIsGoingToDestination(false)
                        } catch (error) {
                            console.error("Routing error:", error);
                            alert("Failed to calculate route. Please try again later.");
                        }
                    } else {
                        console.log("Waiting for map and positions to be ready");
                    }


                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("Unable to retrieve your location. Please ensure location services are enabled.");
                },
                  {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // real time tracking
    useEffect(() => {
        if (!isGoingToPickLoc)
            if (navigator.geolocation) {
                const watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        console.log("Updated location:", latitude, longitude);

                        // Update location and reroute
                        setStartLocation({ lat: latitude, lon: longitude });
                        if (driverMap.current && selectedPosition && selectedPositionDest && latitude && longitude) {
                            // Remove any existing route control
                            if (routingControlRef.current) {
                                driverMap.current.removeControl(routingControlRef.current);
                            }

                            try {
                                routingControlRef.current = L.Routing.control({
                                    waypoints: [
                                        L.latLng(latitude, longitude),
                                        L.latLng(selectedPosition?.lat, selectedPosition?.lon)
                                    ],
                                    createMarker: () => null,
                                    show: false,
                                    routeWhileDragging: true,
                                    lineOptions: {
                                        styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
                                    }
                                }).addTo(driverMap.current);

                                // Emit updated location to socket
                                socket.emit("driverIsOtw", passenger?.userId, latitude, longitude);
                            } catch (error) {
                                console.error("Routing error:", error);
                                alert("Failed to calculate route. Please try again later.");
                            }
                        }
                    },
                    (error) => {
                        console.error("Error watching location:", error);
                        alert("Unable to retrieve your location. Please ensure location services are enabled.");
                    },
                    { enableHighAccuracy: true }
                );

                // Cleanup function to stop watching location
                return () => {
                    navigator.geolocation.clearWatch(watchId);
                };
            }
    }, [selectedPosition, selectedPositionDest, passenger?.userId, isGoingToPickLoc]);





    const flyToDriverPosition = () => {
        const map = driverMap.current;
        if (map) {
            if (startLocaiton) {
                map.flyTo([startLocaiton?.lat, startLocaiton?.lon], 18, { animate: true, duration: 1.5 });
            }
        }
    }
    console.log("passengerInfo: ", passenger);

    const handleDriverHasArrived = () => {
        socket.emit("driverArrivedAtPickUpLoc", passenger.userId)
        handleRouteDirection()
        setIsGoingToPickUpLoc(true)
        setIsGoingToDestination(true)
    }

    const handleDriveToDestination = () => {
        handleRouteDirection()
        setIsGoingToPickUpLoc(true)
        setIsGoingToDestination(true)
    }

    const handlePayment = async () => {
        if (driverInfo && driverInfo.id) {
            console.log("idDriver", driverInfo?.id);
            try {
                const driverId = driverInfo?.id;
                const response = await updateRequest(`${BASEURL}/updateRidesToCompleted`, JSON.stringify({ driverId }))
                socket.emit("transactionCompleted", passenger?.userId)
            } catch (error) {
                console.error("Error occurred while updating ride status:", error.message);
            }
        } else {
            console.log("driver id is not defined");

        }

    }



     const [profileImage,setProfileImage]= useState()
     useEffect(() => {
        if (passenger && passenger?.userId) { 
            
                const interval = setTimeout(async() => {
                const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${passenger?.userId}?${new Date().getTime()}`;
                const response = await fetch(cloudinaryUrl)
                if(response.ok){
                setProfileImage(cloudinaryUrl);
                }else{
                setProfileImage(DefaultProfile) 
                }
                },1); 
                return () => clearInterval(interval);
            
        }
        }, [passenger]);



    return (
        <div className="flex flex-col  md:flex-row justify-around p-4 md:w-full  gap-5 bg-white ">
            <Card className="md:max-w-[750px] w-full rounded-lg shadow-lg ">
                <div className="px-3 py-2 border-b border-gray-200">
                    <h1 className="text-base font-semibold text-gray-800">
                        {selectedPosition ? "Passenger Approved!" : "Waiting for the passenger confirmation...."}
                    </h1>
                    <p className="text-xs text-gray-500">
                        {selectedPosition && " Your passenger is ready for pickup."}
                    </p>
                </div>

                <div className="flex items-center p-3 gap-2">
                    {/* Route Icons */}
                    <div className="flex flex-col items-center gap-1">
                        <img src={CircleRed} className='w-[16px] h-[16px]' />
                        <img src={Dots} className='w-[18px] h-[18px]' />
                        <img src={CircleBlue} className='w-[16px] h-[16px]' />
                        <img src={Dots} className='w-[18px] h-[18px]' />
                        <img src={Location} className='w-[30px] h-[25px]' />
                    </div>

                    {/* Route Text Inputs */}
                    <div className="flex flex-col gap-3 w-full">
                        {
                            selectedPosition ? <TextInput isReadOnly={true} value="your current location" height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }
                        {
                            selectedPosition ? <TextInput isReadOnly={true} value={routeRequest[0]?.startLocation} height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }
                        {
                            selectedPositionDest ? <TextInput isReadOnly={true} value={routeRequest[0]?.endLocation} height="30px" /> :
                                <Skeleton variant="rounded" width="100%" height="30px" animation="wave" />
                        }



                    </div>

                    {/* Go Buttons */}
                    <div className="flex flex-col gap-2 items-center">
                        <Button name="Go" variant="contained" size="small" fontColor="#fff" onClick={handleFindMyLocation} />
                        <Button name="Go" variant="contained" size="small" fontColor="#fff" onClick={handleDriveToDestination} />
                    </div>
                </div>

                {/* Route and ETA Information */}
                <div className="flex justify-between items-center px-3 py-1 bg-gray-100 rounded-b-lg border-t border-gray-200">
                    <div className="flex  gap-3 text-gray-700 text-sm font-medium">
                        <h2> Route:</h2>

                    </div>
                    <h2 onClick={flyToDriverPosition}>Center</h2>
                    <div className="text-gray-500 text-xs">
                        <span className="mr-2">Est: 45 mins</span>
                        <span>4.4 km</span>


                    </div>
                </div>

                {/* Map */}
                <div className='relative z-0 '>
                    <Map startLocaiton={startLocaiton} pickUpLoc={pickUpLoc} destLoc={destLoc} mapRef={driverMap} isGoingTodestination={isGoingTodestination} height="55vh" selectedPosition={driverToPassenger ? startLocaiton : selectedPosition} selectedPositionDest={selectedPositionDest} customIcon={customIcon} />
                </div>
            </Card>
            <div className='h-[500px] '>
                <Card className="flex flex-col p-8 rounded-2xl  shadow-md   bg-gradient-to-b from-white to-gray-50 border border-gray-200  w-full max-w-md mx-auto">

                    <div className="flex items-center gap-6 mb-4">
                        {
                            passengerApproval ? <img
                                src={profileImage}
                                alt="Passenger Profile"
                                className="w-[90px] h-[90px] rounded-full object-cover border-4 border-white shadow-lg"
                            /> :

                                <Skeleton variant="rounded" width="90px" height="90px" animation="wave" raduis='50%' />
                        }
                        <div className="flex flex-col"> 

                            <h2 className="text-xl font-semibold text-gray-900">{passenger?.userFn} {passenger?.userLn} </h2>



                            <p className="text-gray-500 text-sm">Minglanilla, Cebu</p>



                            <p className="text-xs text-gray-400">Joined: January 2022 • Gold Member</p>

                        </div>
                    </div>

                    <hr className="border-gray-200 mb-4" />

                    {/* Passenger Details */}
                    <div className="space-y-4 mb-6 ">
                        {passengerApproval ? (
                            <>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Rides Completed:</span>
                                    <span className="font-semibold text-sm text-gray-800">56 </span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Preferred Pickup:</span>
                                    <span className="font-semibold text-right text-sm text-gray-800">{routeRequest[0]?.startLocation}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Contact:</span>
                                    <span className="font-semibold text-sm text-gray-800">{passenger?.userPhone}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Rating by Drivers:</span>
                                    <div className="flex items-center gap-2">
                                        <Ratings value={passenger ? passenger.userRating : 5} />
                                        <span className="font-semibold text-sm text-gray-800">{passenger?.userRating}/5</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-gray-700">
                                    <span className="text-sm">Preferred Payment:</span>
                                    <span className="font-semibold text-sm text-gray-800">Cash on Hand</span>
                                </div>
                            </>
                        ) : (
                            Array(5).fill().map((_, index) => (
                                <Skeleton key={index} variant="text" width="100%" height="20px" animation="wave" />
                            ))
                        )}
                    </div>

                    {/* Arrival Status Toggles */}
                    <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Arrived at Pickup Location</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center  transition-colors"
                                    onClick={handleDriverHasArrived}
                                >
                                    <span className="text-white text-xl mb-2 font-bold peer-checked:block">✔</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Arrived at Destination </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center  transition-colors"
                                    onClick={() => setPaymentModal(true)}
                                >
                                    <span className="text-white text-xl font-bold peer-checked:block">✔</span>
                                </div>
                            </label>
                        </div>
                        {
                            paymentModal && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                    style={{ margin: 0, padding: 0 }}
                                >
                                    <Payment  routeRequest={routeRequest} setPaymentModal={setPaymentModal} handlePayment={handlePayment} />
                                </div>
                            )
                        }
                    </div>

                    {/* Icon Actions */}
                    <div className="flex justify-around mt-[50px]">
                        <div className="text-center">
                            <Button
                                name="Message"
                                variant="contained"
                                size="large"
                                fontColor="#fff"
                                width="130px"
                                className="bg-blue-600 hover:bg-blue-700 transition-all rounded-lg px-4 py-2"
                               onClick={()=>handleChats(passengerInfo?.userId)}
                            />
                        </div>
                        <div className="text-center">
                            <Button
                                name="Call"
                                variant="outlined"
                                size="large"
                                fontColor="#4a4a4a"
                                width="130px"
                                className="border-gray-400 hover:border-gray-500 transition-all rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};



const Map = ({
    selectedPositionDest,
    mapRef,
    selectedPosition,
    startLocaiton,
    pickUpLoc,
    destLoc,
    customIcon,
    height,
    isGoingTodestination
}) => {
    return (
        <div className='flex flex-col  w-full    '>

            <div className='ml-3 mr-3 mt-3'>
                <MapContainer
                    center={selectedPosition ? [selectedPosition?.lat, selectedPosition?.lon] : [51.505, -0.09]} // Default center
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height }}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                    />

                    {pickUpLoc && (
                        <Marker
                            position={[pickUpLoc?.lat, pickUpLoc?.lon]}
                            icon={isGoingTodestination ? customIcon(otwIcon) : customIcon(StartLocation)}
                        >


                        </Marker>
                    )}

                    {startLocaiton && (
                        <Marker
                            position={[startLocaiton?.lat, startLocaiton?.lon]}
                            icon={customIcon(Driver)}
                        >
                        </Marker>
                    )}
                    {selectedPositionDest && (
                        <Marker
                            position={[destLoc?.lat, destLoc?.lon]}
                            icon={customIcon(DestMarker)}
                        >
                            <Popup>Your Location</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>
        </div>
    )
}


export default PassengerApproval;
