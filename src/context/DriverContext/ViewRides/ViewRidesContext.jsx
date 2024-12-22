import { Children, createContext, useEffect, useRef, useState } from "react";
import { BASEURL, BASEURLDrivers, postRequest, SocketUrl } from "../../../utils/Service";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { useNavigate } from 'react-router-dom';  
import { io } from 'socket.io-client';



export const ViewRidesContext = createContext();
export const ViewRidesContextProvider = ({ children }) => {
    const navigate = useNavigate();  
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])

    const [userInfo, setUserInfo] = useState();
    const mapRef = useRef(null);
    const mapRefBooking = useRef(null);
    const routingControlRef = useRef(null);
    const [isInRecentRide, setIsInRecentRides] = useState(true);
    const [isInBooking, setIsInBooking] = useState(false);
    const [isInInCancelledRides, setIsInCancelledRides] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState({
        userId:null,
        userFn: 'John Doe',
        userLn: null,
        phoneNum: null,
        userRatings: null,
        pickup: null,
        dropOff: null,
        fare: null,
        duration: null,
        distance: null,
    });
    const [bookingInfo, setBookingInfo] = useState({
        userId:null,
        routeId:null,
        startLocation: null,
        endLocation: null,
        duration: null,
        distance: null,
        totalAmount: null,
        travelDate: null,
        userFn: null,
        userLn: null,
        userEmail: null,
        userRatings: null,
    })
    const [userFn, setUserFn] = useState()

    const [currentRoute, setCurrentRoute] = useState();
    const [bookings, setBookings] = useState()
    const [cancelledRoutes, setCancelledRoutes] = useState();

    const [pickUp, setPickUp] = useState()
    const [destination, setDestination] = useState()
    const [rateModal,setRateModal] = useState(false)
    const hostname = window.location.hostname;




    useEffect(() => {
        const storedInfo = localStorage.getItem("User");
        if (storedInfo) {
            try {
                const parsedInfo = JSON.parse(storedInfo);
                setUserInfo(parsedInfo);
                console.log("VIEwRIDES driver User info set:", parsedInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.log("No user info found in localStorage");
        }
    }, [])

    useEffect(() => {
       const newSocket = io(SocketUrl)

        // const newSocket = io(`https://ridesync-backend.onrender.com`);
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("from frontend driver: " + newSocket.id);

            if (userInfo?.id) {
                newSocket.emit("addNewUser", userInfo.id, newSocket.id);
            }
        });

        newSocket.on('refreshMyRides',(routeId)=>{
            console.log("refreshMyRides recieved");
            
            setBookings((prevRides) =>
                prevRides.filter((ride) => ride.routeId !== routeId)
            )
            fetchRecentRides()
            fetchBookingRides()
            fetchCancelledRides()
        })

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        // Cleanup socket on component unmount
        return () => {
            newSocket.disconnect();
        };
    }, [userInfo]);


    const fetchRecentRides = async () => {
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const routeRequest = await postRequest(`${BASEURLDrivers}/recentRides`, JSON.stringify({ userId }));
            if (routeRequest && routeRequest.length > 0) {
                setCurrentRoute(routeRequest);
                console.log(routeRequest);

            }
        }
    }
    useEffect(() => {
     
        fetchRecentRides()
    }, [userInfo])

    const fetchBookingRides = async () => {
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const routeRequest = await postRequest(`${BASEURLDrivers}/bookingRides`, JSON.stringify({ userId }));
            if (routeRequest && routeRequest.length > 0) {
                setBookings(routeRequest);
                console.log("booking", routeRequest);
            }
        }
    }

    const fetchCancelledRides = async()=>{
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const routeRequest = await postRequest(`${BASEURLDrivers}/fetchCancelledRides`, JSON.stringify({ userId }));
            if (routeRequest && routeRequest.length > 0) {
                setCancelledRoutes(routeRequest);
                console.log("booking", routeRequest);
            }
        }
    }

    useEffect(() => {
        fetchBookingRides()
        fetchCancelledRides()
    }, [userInfo])

    const [refreshBookings,setRefreshBookings]= useState(false)

    useEffect(()=>{
        fetchBookingRides()
    },[refreshBookings])

    const markBookingAsDone = async(routeId,userId)=>{
        try {
           const response = await postRequest(`${BASEURL}/markBookingAsDone`,JSON.stringify({routeId}))
           setRefreshBookings(!refreshBookings)
           socket.emit('refreshViewRides',userId,routeId)
           navigate('/driver/loading?route=/driver/viewRidesContents&active=viewRides');
        } catch (error) {
           console.log("Error updating routes and booking");
           
        }
    }


    const handleCancelBooking = async(routeId,userId)=>{
        console.log("routeId", routeId,"userId",userId);
       
        try {
           const response = await postRequest(`${BASEURL}/cancelBooking`,JSON.stringify({routeId}))
           setRefreshBookings(!refreshBookings)
           socket.emit('refreshViewRides',userId,routeId)
           navigate('/driver/loading?route=/driver/viewRidesContents&active=viewRides');
        } catch (error) {
           console.log("Error updating routes and booking");
           
        }
  }



    const handleRecentRideInfo = (userId,pickUp, destination, userFn, userLn, phoneNum, userRatings, pickup, dropOff, fare, duration, distance) => {
        // Update passenger info
        setPassengerInfo({
            userId:userId,
            userFn: userFn,
            userLn: userLn,
            phoneNum: phoneNum,
            userRatings: userRatings,
            pickup: pickup,
            dropOff: dropOff,
            fare: fare,
            duration: duration,
            distance: distance,
        });
        setPickUp(pickUp);
        setDestination(destination);
        const map = mapRef.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp.lat, pickUp.lon),
                L.latLng(destination.lat, destination.lon),
            ],
            createMarker: function () {
                return null; // Prevent the creation of default markers
            },
            show: false,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "#00A6CE", opacity: 1, weight: 5 }],
            },
        }).addTo(map);
    };

    const handleBookingRideInfo = (userId,routeId,pickUp, destination, startLocation, endLocation, duration, distance, totalAmount, travelDate,
        userFn, userLn, userEmail, userRatings
    ) => {
        setPickUp(pickUp);
        setDestination(destination);
        setBookingInfo({
            userId:userId,
            routeId:routeId,
            startLocation: startLocation,
            endLocation: endLocation,
            duration: duration,
            distance: distance,
            totalAmount: totalAmount,
            travelDate: travelDate,
            userFn: userFn,
            userLn: userLn,
            userEmail: userEmail,
            userRatings: userRatings,
        })

        const map = mapRefBooking.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp.lat, pickUp.lon),
                L.latLng(destination.lat, destination.lon),
            ],
            createMarker: function () {
                return null; // Prevent the creation of default markers
            },
            show: false,
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: "#00A6CE", opacity: 1, weight: 5 }],
            },
        }).addTo(map);
    }




    const handleNav = (nav) => {
        if (nav === 'recent') {
            setIsInRecentRides(true);
            setIsInBooking(false);
            setIsInCancelledRides(false);
        } else if (nav === 'booking') {
            setIsInRecentRides(false);
            setIsInBooking(true);
            setIsInCancelledRides(false);
        } else if (nav === 'cancelled') {
            setIsInRecentRides(false);
            setIsInBooking(false);
            setIsInCancelledRides(true);
        }
    };

    const handleRateUser= async(user_id,rating)=>{
            try {
                await postRequest(`${BASEURL}/rateUser`,JSON.stringify({user_id,rating}))
            } catch (error) {
                console.log("Error rating user");
                
            }
      }

    return (
        <ViewRidesContext.Provider
            value={{
                mapRef,
                mapRefBooking,
                handleNav,
                isInRecentRide,
                isInBooking,
                isInInCancelledRides,
                currentRoute,
                pickUp,
                destination,
                handleRecentRideInfo,
                passengerInfo,
                userFn,
                bookings,
                handleBookingRideInfo,
                bookingInfo,
                cancelledRoutes,
                handleCancelBooking,
                markBookingAsDone,
                rateModal, 
                setRateModal,
                handleRateUser
            }}
        >
            {children}
        </ViewRidesContext.Provider>
    )
}