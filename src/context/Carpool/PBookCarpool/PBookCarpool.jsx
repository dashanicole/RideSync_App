import { createContext, useEffect, useState } from "react";
import { BASEURL, getRequest, postRequest, SocketUrl } from "../../../utils/Service";
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
import DefaultProfile from '../../../assets/DefaultProfile.png';


export const PBookCarpoolContext = createContext()
export const PBookCarpoolContextProvider = ({children})=>{
    const navigate = useNavigate();
    const [passengerInfo, setPassengerInfo] = useState(null);
    const [users,setUsers] = useState([])
    const [driverData,setDriverData]= useState()
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [totalAmount, setTotalAmount] = useState(0);
    const [socket, setSocket] = useState(null)
    const [socketID, setSocketID] = useState()
    const [onlineUsers, setOnlineUsers] = useState([])

    const [carpoolRides,setCarpoolRides]= useState([])
    const [filteredRides, setFilteredRides] = useState([]);
    const [leavingFrom, setLeavingFrom] = useState('');
    const [goingTo, setGoingTo] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsDest, setSuggestionsDest] = useState([]);
    const [profileImage,setProfileImage]= useState()
    const hostname = window.location.hostname;

   
    useEffect(() => {
        const newSocket = io(SocketUrl)
        
        // const newSocket = io(`https://ridesync-backend.onrender.com`)
        setSocket(newSocket)
        newSocket.on("connect", () => {
          console.log("from frontend: " + newSocket.id);
          setSocketID(newSocket.id)
          if (passengerInfo && passengerInfo.id) {
            newSocket.emit("addNewUser", passengerInfo.id, newSocket.id);
            console.log("new user added");
          }
          newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
          });
          return () => {
          newSocket.disconnect();
        };
        });
      },[passengerInfo])


    const [rideInfo,setRideInfo]= useState({
        routeId:null,
        userId:null,
        travelDate:null,
        startLocation:null,
        endLocation:null,
        driverName:null,
        driverRatings:null,
        vehicle:null,
        seats:null,
        pircePerPerson:null,
        paymentMethod:null,
        status:null
    })

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('User');
        if (storedUserInfo) {
            try {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setPassengerInfo(parsedUserInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        }
    }, [])
    const fetchAllCarpoolRides = async () => {
        try {
          const response = await fetch(`${BASEURL}/fetchAllCarpoolRides`);
          const data = await response.json();
          console.log("carpool",data);
          
          setCarpoolRides(data)
          setFilteredRides(data);
        } catch (error) {
          console.error("Error fetching carpool rides:", error);
        }
    };

    const handleSearchInput = async (e) => {
        const query = e.target.value;
        setLeavingFrom(query);

        if (query.length > 2) {
            const response = await fetch(`${BASEURL}/search?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                console.error('Failed to fetch suggestions');
                return;
            }
            const data = await response.json();
            console.log("Fetched Data: ", data);
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }

    };

    const handleSearchInputDest = async (e) => {
        const query = e.target.value;
        setGoingTo(query);

        if (query.length > 2) {
            const response = await fetch(`${BASEURL}/search?query=${encodeURIComponent(query)}`);

            if (!response.ok) {
                console.error('Failed to fetch suggestions');
                return;
            }
            const data = await response.json();
            console.log("Fetched Data destination: ", data);
            setSuggestionsDest(data);
        } else {
            setSuggestionsDest([]);
        }

    };
    

    const handleSelectSuggestion = (lat, lon, display_name) => {
        setLeavingFrom(display_name);
        setSuggestions([]);

    };
    const handleSelectSuggestionDest = (lat, lon, display_name) => {
        setGoingTo(display_name);
        setSuggestionsDest([]);

    };

    const handleSearch = () => {
        const filtered = carpoolRides.filter((ride) => {
          const matchesStartLocation = ride.startLocation
            ?.toLowerCase()
            .includes(leavingFrom.toLowerCase());
          const matchesEndLocation = ride.endLocation
            ?.toLowerCase()
            .includes(goingTo.toLowerCase());
          const matchesDate =
            selectedDate === '' ||
            (ride.travelDateTime &&
              new Date(ride.travelDateTime).toLocaleDateString() ===
                new Date(selectedDate).toLocaleDateString());
    
          return matchesStartLocation && matchesEndLocation && matchesDate;
        });
        setFilteredRides(filtered);
      };

    const fetchALlUsers = async()=>{
        try {
            const response = await fetch(`${BASEURL}/`)
            const data = await response.json()
            const drivers = data.filter(item => item.userType === 'D')
            setUsers(drivers)
        } catch (error) {
            console.log("Error fetch users");
        }
    }

  
    useEffect(()=>{
        fetchAllCarpoolRides()
        fetchALlUsers()
    },[passengerInfo])

  
    const getDriverData = (userId) => {
        const driverData = users.filter((item) => item.userId == userId);
        console.log("Driver data:", driverData[0]);
        return driverData[0];  
      };

    const handleClickCarpool = async (rideInfo) => {
          const driverData =  getDriverData(rideInfo?.userId);
          isCarpoolBooked(rideInfo?.routeId,passengerInfo?.id)
          fetchUserProfile(rideInfo?.userId)
          
          setRideInfo({
            routeId:rideInfo?.routeId,
            userId:rideInfo?.userId,
            travelDate:
              rideInfo?.travelDateTime &&
              new Date(rideInfo.travelDateTime).toLocaleString(),
            startLocation: rideInfo?.startLocation,
            endLocation: rideInfo?.endLocation,
            driverName: driverData?.userFn + " " + driverData?.userLn,
            driverRatings: driverData?.userRating,
            vehicle: rideInfo?.vehicle,
            seats: rideInfo?.NumSets-rideInfo?.totalPassengersBooked,
            pircePerPerson: rideInfo?.pricePerPerson,
            paymentMethod: rideInfo?.paymentMethod,
            status:false
          });
          setTotalAmount(rideInfo?.pricePerPerson)
      };

    
    const fetchUserProfile = async(id)=>{
        const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${id}?${new Date().getTime()}`;
        const response = await fetch(cloudinaryUrl)
                if(response.ok){
                    setProfileImage(cloudinaryUrl) 
                }else{
                    setProfileImage(DefaultProfile)
                }
    }
      
    const handleConfirmBooking = async()=>{
            const bookingInfo  = {
                passengerId: passengerInfo?.id,
                carpoolRouteId:rideInfo?.routeId,
                driverId:rideInfo?.userId,
                numPassengersBooked: numberOfPassengers ? numberOfPassengers :1,
            }
            try {
                  await postRequest(`${BASEURL}/CarpoolPassenger`,JSON.stringify(bookingInfo))
            } catch (error) {
                console.error("Error confirming booking:", error);
            }
           socket.emit("carpoolBooking",rideInfo?.routeId,passengerInfo?.id,bookingInfo?.driverId,numberOfPassengers)
           navigate('/passenger/bookCarpoolConfirmation');
        };
    const [isBooked,setIsBooked]= useState(false)
    const getBooked=async()=>{
        try{
            const response = await postRequest(`${BASEURL}/isBookedAlready`,JSON.stringify({userId:passengerInfo?.id}))
            setIsBooked(response.isBooked)
        }catch(error){
            console.log("error isBooking")
        }
       }
    useEffect(()=>{
      
        getBooked()
    },[passengerInfo])


    const [carpoolPassengers,setCarpoolPassengers] = useState([])
    const CarpoolPassengers= async(routeId)=>{
         try {
            const response = await postRequest(`${BASEURL}/isCarpoolBooked`,JSON.stringify({userId:passengerInfo?.id}))
            if(response.length > 0){
            setCarpoolPassengers(response)
            } 

            console.log("carpoolPassengerasss",response);
          
         } catch (error) {
            console.log("error isBooking")
         }
    } 
    useEffect(()=>{
        CarpoolPassengers()
    },[passengerInfo])
 
    const [bookedBa,setBookedBa]= useState(false)
    const isCarpoolBooked = (routeId,userId)=>{
        if (carpoolPassengers.length > 0) {
            const result = carpoolPassengers.some(
                (item) => item.carpoolRouteId == routeId && item.passengerId == userId
            );
            console.log("bookedBa", result);  
            setBookedBa(result); 
        }
    }

    const handleChats = async (driverId) => {
    const user1_Id = passengerInfo?.id;
    const user2_Id = driverId;
    try {
      const response = await postRequest(`${BASEURL}/createChat`, JSON.stringify({ user1_Id, user2_Id }))
      console.log("handle chat response", response);
      navigate('/passenger/messageContents');
    } catch (error) {
      console.error(error);
    }
  }
 

 
    return(
        <PBookCarpoolContext.Provider
        value={{
            passengerInfo,
            carpoolRides,
            users,
            handleClickCarpool,
            rideInfo,
            numberOfPassengers, 
            setNumberOfPassengers,
            totalAmount,
            setTotalAmount,
            handleConfirmBooking,
            isBooked,
            bookedBa,
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
        }}
        >
            {children}
        </PBookCarpoolContext.Provider>
    )
}