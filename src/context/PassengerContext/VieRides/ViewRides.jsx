import { createContext, useEffect, useRef, useState } from "react";
import { BASEURL, postRequest, SocketUrl } from "../../../utils/Service";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { useNavigate } from 'react-router-dom';  
import { io } from 'socket.io-client'


export const ViewRidesContext = createContext();
export const ViewRidesContextProvider = ({ children }) => {

    const mapRef = useRef(null);
    const navigate = useNavigate();  
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const routingControlRef = useRef(null);
    const [isInRecentRide, setIsInRecentRides] = useState(true);
    const [isInUpComingRides, setIsInUpComingRides] = useState(false);
    const [isInInCancelledRides, setIsInCancelledRides] = useState(false);
    const [isInCarpool,setIsInCarpools] =useState(false)
    const [userInfo, setUserInfo] = useState();
    const [currentRoute, setCurrentRoute] = useState();
    const [upcomingRides, setUpComingRides] = useState()
    const [cancelledRoutes, setCancelledRoutes] = useState();
    const [bookedCarpools,setBookCarpools]=useState()
    const [anchorEl, setAnchorEl] = useState(null);
    const options = ['Cancel'];
    const [rateModal,setRateModal] = useState(false)

    const [pickUp, setPickUp] = useState()
    const [destination, setDestination] = useState()
    const [recentRides, setRecentRides] = useState({
        userId:null,
        startLocation: null,
        endLocation: null,
        totalAmount: null,
        duration: null,
        distance: null,
        pickUp: null,
        destination: null,
        userFn: null,
        userLn: null,
        userRatings: null,
        status: null,
        vehicleColor:null
    })
    const [upComingRidesInfo, setUpComingRidesInfo] = useState({
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
        userPhone: null,
        userRatings: null,
        vPlateNum:null,
    })
    const hostname = window.location.hostname;



    useEffect(() => {
        const storedInfo = localStorage.getItem("User");
        if (storedInfo) {
            try {
                const parsedInfo = JSON.parse(storedInfo);
                setUserInfo(parsedInfo);
                console.log("VIEwRIDES User info set:", parsedInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.log("No user info found in localStorage");
        }
    }, []);

    const fetchCurrentRide = async () => {
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const routeRequest = await postRequest(`${BASEURL}/getRecentRide`, JSON.stringify({ userId }));
            console.log("recentRides",routeRequest);
            
            if (routeRequest && routeRequest.length > 0) {
                setCurrentRoute(routeRequest);
            }
        }
    };
    useEffect(() => {
      
        fetchCurrentRide();

    }, [userInfo]);

    
    useEffect(() => {
        const newSokcet = io(SocketUrl)
        setSocket(newSokcet)
        newSokcet.on("connect", () => {
            console.log("from frontend message page", newSokcet.id);
            if (userInfo && userInfo.id) {
                newSokcet.emit("addNewUser", userInfo.id, newSokcet.id)
            }
        })

        newSokcet.on('refreshRides',(routeId)=>{
            console.log('refreshRides recieved');
            
            setUpComingRides((prevRides) =>
                prevRides.filter((ride) => ride.routeId !== routeId)
            );
            fetchCurrentRide()
            fetchUpComingRides()
            fetchCancelledRoutes()
            fetchBookedCarpools()
        })

        newSokcet.on("getOnlineUsers", (users) => {
            setOnlineUsers(users)
        })
       
    }, [userInfo])

    const fetchUpComingRides = async () => {
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const upComingRideRequest = await postRequest(`${BASEURL}/getBookings`, JSON.stringify({ userId }))
            if (upComingRideRequest && upComingRideRequest.length > 0) {
                setUpComingRides(upComingRideRequest)
            }
        }
    }
    useEffect(() => {
      

        fetchUpComingRides()
    }, [userInfo])

    const [refreshBookings,setRefreshBookings]= useState(false)
    useEffect(()=>{
        fetchUpComingRides()
    },[refreshBookings])

    const fetchCancelledRoutes = async () => {
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const cancelledRoutes = await postRequest(`${BASEURL}/getCancelledRoutes`, JSON.stringify({ userId }));
            if (cancelledRoutes && cancelledRoutes.length > 0) {
                setCancelledRoutes(cancelledRoutes);
            }
        }
    };
    useEffect(() => {
      
        fetchCancelledRoutes();
    }, [userInfo]);

    const fetchBookedCarpools = async()=>{
        if (userInfo && userInfo.id) {
            const userId = userInfo.id;
            const cancelledRoutes = await postRequest(`${BASEURL}/fetchBookedCarpools`, JSON.stringify({ userId }));
            if (cancelledRoutes && cancelledRoutes.length > 0) {
                setBookCarpools(cancelledRoutes);
            }
        }
    }
    useEffect(()=>{
       
        fetchBookedCarpools()
    },[userInfo])


    useEffect(()=>{
        console.log("Bookes Carpools", bookedCarpools);
        
    },[bookedCarpools])



    const selectedPosition = currentRoute?.[0] ? { lat: currentRoute[0].startLatitude, lon: currentRoute[0].startLongitude } : null;
    const selectedPositionDest = currentRoute?.[0] ? { lat: currentRoute[0].endLatitude, lon: currentRoute[0].endLongitude } : null;



    const handleRecentRide = (userId,startLocation, endLocation, totalAmount, duration, distance, pickUp, destination, userFn, userLn, userRatings, status,vehicleColor,vPlateNum) => {
        setRecentRides({
            userId:userId,
            startLocation: startLocation,
            endLocation: endLocation,
            totalAmount: totalAmount,
            duration: duration,
            distance: distance,
            userFn: userFn,
            userLn: userLn,
            userRatings: userRatings,
            status: status,
            vehicleColor:vehicleColor,
            vPlateNum:vPlateNum
        })

        setPickUp(pickUp);
        setDestination(destination);


        const map = mapRef.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp?.lat, pickUp?.lon),
                L.latLng(destination?.lat, destination?.lon),
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

    const handleBookingRide = (userId,routeId,pickUp, destination, startLocation, endLocation, duration, distance, totalAmount, travelDate, userFn, userLn, userEmail, userPhone, userRatings) => {
        setPickUp(pickUp);
        setDestination(destination);
        setUpComingRidesInfo({
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
            userPhone: userPhone,
            userRatings: userRatings,
        })

    

        const map = mapRef.current;
        if (routingControlRef.current)
            map.removeControl(routingControlRef.current);

        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(pickUp?.lat, pickUp?.lon),
                L.latLng(destination?.lat, destination?.lon),
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
    const handleCancelBooking = async(routeId,userId)=>{
        console.log("route userId",routeId,userId);
        
        try {
           const response = await postRequest(`${BASEURL}/cancelBooking`,JSON.stringify({routeId}))
           setRefreshBookings(!refreshBookings)
           socket.emit('refresh',userId,routeId)
           navigate('/passenger/loading?route=/passenger/viewRideContents&active=viewRides');
           console.log(response);
          
        } catch (error) {
           console.log("Error updating routes and booking");
        }
  }


    const handleNav = (nav) => {
        if (nav === 'recent') {
            setIsInRecentRides(true);
            setIsInUpComingRides(false);
            setIsInCancelledRides(false);
            setIsInCarpools(false)
        } else if (nav === 'upcoming') {
            setIsInRecentRides(false);
            setIsInUpComingRides(true);
            setIsInCancelledRides(false);
            setIsInCarpools(false)
        } else if (nav === 'cancelled') {
            setIsInRecentRides(false);
            setIsInUpComingRides(false);
            setIsInCancelledRides(true);
            setIsInCarpools(false)
        }else if(nav === 'carpools'){
            setIsInRecentRides(false);
            setIsInUpComingRides(false);
            setIsInCancelledRides(false);
            setIsInCarpools(true)
        }
    };

    const customIcon = (src) => L.icon({
        iconUrl: src,
        iconSize: [50, 50],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
    });


    
    const handleChats = async (dId) => {
        const user1_Id = userInfo?.id;
        const user2_Id = dId;
        try {
          const response = await postRequest(`${BASEURL}/createChat`, JSON.stringify({ user1_Id, user2_Id }))
          console.log("handle chat response", response);
          navigate('/passenger/messageContents');
        } catch (error) {
          console.error(error);
        }
      }

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

                routingControlRef,
                currentRoute,
                cancelledRoutes,
                isInRecentRide,
                isInUpComingRides,
                isInInCancelledRides,
                isInCarpool,
                setIsInRecentRides,
                setIsInUpComingRides,
                setIsInCancelledRides,
                setIsInCarpools,
                customIcon,
                handleNav,
                selectedPosition,
                selectedPositionDest,
                upcomingRides,
                anchorEl,
                setAnchorEl,
                options,
                handleRecentRide,
                recentRides,
                pickUp,
                destination,
                handleBookingRide,
                upComingRidesInfo,
                bookedCarpools,
                handleCancelBooking,
                handleChats,
                rateModal, 
                setRateModal,
                handleRateUser
            }}
        >
            {children}
        </ViewRidesContext.Provider>
    );
};
