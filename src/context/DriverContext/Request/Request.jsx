import { createContext, useEffect, useRef, useState } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { io } from 'socket.io-client';
import { BASEURL, BASEURLDrivers, postRequest, SocketUrl } from "../../../utils/Service";
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '../../../assets/DefaultProfile.png';



export const RequestContext = createContext();
export const RequestContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [driverInfo, setDriverInfo] = useState(null);
    const [socket, setSocket] = useState(null);
    const driverMap = useRef();
    const routingControlRef = useRef();
    const [request, setRequest] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionDest, setSelectedPositionDest] = useState(null);
    const [requestInfo, setRequestInfo] = useState({
        startLocation: '',
        endLocation: '',
        price: 0.00,
        passengerId: null,
        distance: 0.00,
        duration: 0.00
    });
    const [onlineUsers, setOnlineUsers] = useState([])
    const [openInfoModal, setOpenInfoModal] = useState(false)
    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [passengerApproval, setPassengerApproval] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState([])
    const [isRideCancelled, setIsRideCancelled] = useState(false)
    const [isOfferingRide, setIsOfferingRide] = useState(false)
    const [offerRide, setOfferRide] = useState(false);
    const [routeId, setRouteId] = useState()
    const [currentRide, setCurrentRide] = useState()
    const [profileImage, setProfileImage] = useState(DefaultProfile);
    const hostname = window.location.hostname;



    const fetchRequest = async () => {
        if (driverInfo && driverInfo.id) {
            console.log("idDriver", driverInfo?.id);

            try {
                const driverId = driverInfo.id;
                const body = JSON.stringify({ driverId: Number(driverId), status: 'onGoing' });
                const routeRequest = await postRequest(`${BASEURLDrivers}/getRides`, body);

                if (routeRequest && routeRequest[0]?.routeId) {
                    setRouteId(routeRequest[0].routeId); // Set the routeId if it exists
                    console.log("Fetched Ride Info FROM REQUESTTTTTT:", routeRequest);
                } else {
                    console.log("No routeId found in the response.");
                }
            } catch (error) {
                console.error("Error fetching ride info:", error);
            }
        }
    };


    useEffect(() => {
        fetchRequest();
    }, [driverInfo]); // Trigger fetchRequest when driverInfo changes

    // Only call fetchOnGoingRoute when routeId has a value
    useEffect(() => {
        if (routeId) {
            fetchOnGoingRoute();
        }
    }, [routeId]); // Trigger fetchOnGoingRoute when routeId is updated

    const fetchOnGoingRoute = async () => {
        try {
            const body = JSON.stringify({ routeId });
            const routeRequest = await postRequest(`${BASEURLDrivers}/getOnGoingRoute`, body);

            if (routeRequest && routeRequest?.length > 0) {
                setCurrentRide(routeRequest);
                setRequest(routeRequest)
                // Only set selectedPosition and selectedPositionDest if the coordinates are present
                const startLatitude = routeRequest[0]?.startLatitude;
                const startLongitude = routeRequest[0]?.startLongitude;
                const endLatitude = routeRequest[0]?.endLatitude;
                const endLongitude = routeRequest[0]?.endLongitude;

                if (startLatitude && startLongitude && endLatitude && endLongitude) {
                    getPassengerInfo(routeRequest[0]?.userId)
                    setSelectedPosition({ lat: startLatitude, lon: startLongitude });
                    setSelectedPositionDest({ lat: endLatitude, lon: endLongitude });
                    setPassengerApproval(true)

                    console.log("selectedPosition:", { lat: startLatitude, lon: startLongitude });
                    console.log("selectedPositionDest:", { lat: endLatitude, lon: endLongitude });

                } else {
                    console.log("Coordinates missing in response.");
                }

                console.log("Request data from fetchOnGoingRoute:", routeRequest);
            } else {
                console.log("No data returned for current ride.");
            }
        } catch (error) {
            console.error("Error fetching ongoing route data:", error);
        }
    };


    useEffect(() => {
        const storedUserInfo = localStorage.getItem('User');
        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setDriverInfo(parsedUserInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        }
        clearPassengerInfo()

    }, [])

    useEffect(() => {
        const newSocket = io(SocketUrl)
        // const newSocket = io(`https://ridesync-backend.onrender.com`);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("from frontend driver: " + newSocket.id);

            if (driverInfo?.id) {
                newSocket.emit("addNewUser", driverInfo.id, newSocket.id);
            }
        });

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        // Cleanup socket on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [driverInfo]);

    const fetchRequestData = async () => {
        try {
            const response = await fetch(`${BASEURLDrivers}/passengerRequest`);
            const data = await response.json();
            setRequest(data);
            console.log("reeequest: ", data);
        } catch (error) {
            console.error("Error fetching request data:", error);
        }
    };

    useEffect(() => {
        fetchRequestData();
    }, []);

    useEffect(() => {
        if (socket === null) return
        socket.on("getNewRouteData", (newRoute) => {
            setRequest((prevRequests) => [...prevRequests, newRoute]);
            console.log("New route added:", newRoute);
            fetchRequestData();
        });


        socket.on("getCancelledRequest", (id) => {
            setRequest((prevRequests) => prevRequests.filter(req => req.userId !== id));
            setOpenInfoModal(false)
            setStep1(false)
            setStep2(false)
            setCurrentRide(null)
            setPassengerInfo(null)
            setPassengerApproval(false)
            setIsOfferingRide(false)

            const map = driverMap.current;
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
            }
            if (map) {
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker || layer instanceof L.LayerGroup) {
                        map.removeLayer(layer); // Remove each marker or layer group
                    }
                });
            }

        })


        socket.on("yourPassenger", (passengerId) => {
            setPassengerApproval(true)
            getPassengerInfo(passengerId)
            window.location.reload();

        })



        socket.on("cancelledRide", (userId) => {
            console.log("user: ", userId, "Cancelled the ride");
            setIsRideCancelled(true)
            setPassengerApproval(false)
            clearPassengerInfo()
            setStep1(false)
            setStep2(false)
            setSelectedPosition(null)
            setSelectedPositionDest(null)
            setIsOfferingRide(false)
        })



        // socket.on("message", (message) => {
        //     console.log("Receive Message", message);

        // })
        // Cleanup socket listener on component unmount
        return () => {
            if (socket) {
                socket.off("getNewRouteData"); // Clean up the listener
            }
        };
    }, [request])

    const getPassengerInfo = async (passengerId) => {
        try {
            const response = await fetch(BASEURL)
            const data = await response.json()
            const passenger = data.find((p) => p.userId == passengerId)
            setPassengerInfo(passenger)
        } catch (error) {
            console.error("Error fetching passenger information:", error);
        }
        fetchUserProfile(passengerId)
    }
    const clearPassengerInfo = () => {
        setPassengerInfo(null); // or setPassengerInfo([]) if it was initially an empty array
    };

    useEffect(() => {
        console.log("passengerInfouserFn: ", passengerInfo);
    }, [passengerInfo])



    const handleOfferRide = async () => {
        const userId = Number(requestInfo?.passengerId);
        const driverId = Number(driverInfo?.id);
        socket.emit("offerRide", userId, driverId)
        console.log("offering ", userId, driverId);

        const potentialDriversInfo = {
            "driverId": driverId,
            "passengerId": userId
        }

        let routeId
        if (Array.isArray(request) && request?.length > 0) {
            routeId = request[0].routeId
        } else if (request && request.routeId) {
            routeId = request.routeId
        } else {
            console.error("Request is undefined or has an unexpected structure:", request);
        }

        console.log("routeId:", routeId);

        const ridesInfo = {
            "driverId": driverId,
            "routeId": routeId
        }

        const response = await postRequest(`${BASEURLDrivers}/potentialRide`, JSON.stringify(potentialDriversInfo))
        const response2 = await postRequest(`${BASEURLDrivers}/rides`, JSON.stringify(ridesInfo))
        setOfferRide(false)

        if (response.status) {
            console.log("Success");
            setIsOfferingRide(true)


        } else {
            console.log("Failed @potentialRide ");
        }
    }

    const handleRouteDirection = (startLatitude, startLongitude, endLatitude, endLongitude) => {
        const map = driverMap.current;

        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

            routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(startLatitude, startLongitude),
                L.latLng(endLatitude, endLongitude)
            ],
            createMarker: function () {
                return null; // Prevent the creation of default markers
            },
            show: false,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
            }
        }).addTo(map);



        setSelectedPosition({ lat: startLatitude, lon: startLongitude });
        setSelectedPositionDest({ lat: endLatitude, lon: endLongitude });
    };

    const customIcon = (src) => L.icon({
        iconUrl: src,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });

    const handleRequestInfo = (startLocation, endLocation, price, passengerId, distance, duration) => {
        setRequestInfo({
            startLocation,
            endLocation,
            price,
            passengerId,
            distance,
            duration
        });
        setOpenInfoModal(true)


    };

    
const handleChats = async (passengerId) => {
        const user2_Id = driverInfo?.id;
        const user1_Id = passengerId;
        try {
        const response = await postRequest(`${BASEURL}/createChat`, JSON.stringify({ user1_Id, user2_Id }))
        console.log("handle chat response", response);
        navigate('/driver/messageContents');
        } catch (error) {
        console.error(error);
        }
}



 const fetchUserProfile = async(id)=>{
        const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${id}?${new Date().getTime()}`;
        const response = await fetch(cloudinaryUrl)
                if(response.ok){
                    setProfileImage(cloudinaryUrl) 
                }else{
                    setProfileImage(DefaultProfile)
                }
    }
    
   
  





    return (
        <RequestContext.Provider
            value={{
                socket,
                driverInfo,
                request,
                driverMap,
                routingControlRef,
                handleRouteDirection,
                selectedPosition,
                selectedPositionDest,
                customIcon,
                handleRequestInfo,
                requestInfo,
                handleOfferRide,
                openInfoModal,
                step1,
                step2,
                setStep2,
                passengerApproval,
                isRideCancelled,
                passengerInfo,
                offerRide,
                setSelectedPosition,
                setSelectedPositionDest,
                setOpenInfoModal,
                isOfferingRide,
                setIsOfferingRide,
                setStep1,
                currentRide,
                getPassengerInfo,
                setRequest,
                setCurrentRide,
                handleChats,
                profileImage,
                setProfileImage
            


            }}
        >
            {children}
        </RequestContext.Provider>
    );
};
