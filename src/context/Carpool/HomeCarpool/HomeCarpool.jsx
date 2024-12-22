import { createContext, useEffect,useState,useRef} from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder';
import dayjs from "dayjs";
import {  BASEURL, BASEURLDrivers, postRequest, SocketUrl } from "../../../utils/Service";
import { io } from 'socket.io-client'
import { useNavigate } from "react-router-dom";
// testing


export const HomeCarpoolContext = createContext()
export const HomeCarpoolContextProvider = ({children})=>{
  const navigate = useNavigate();

    const [driverInfo, setDriverInfo] = useState(null);
    const mapRef = useRef(); 
    const routingControlRef = useRef();
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchInputDest, setSearchInputDest] = useState('');
    const [suggestionsDest, setSuggestionsDest] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionDest, setSelectedPositionDest] = useState(null);
    const [totalDistance, setTotalDistance] = useState(0.0)
    const [totalDuration, setTotalDuration] = useState(0)
    const [travelDate,setTravelDate] = useState('')
    const [numSeats,setNumSeats]=useState(0)
    const [vehicle,setVehicle]= useState('')
    const [pricePerPerson,setPricePerPerson]= useState(0)
    const [paymentMethod,setPaymentMethod] =useState('')
    const [carpoolRides,setCarpoolRides]= useState([])
    const [carpoolPassengers,setCarpoolPassengers] = useState([])
    const [filteredCarpoolPassengers,setFilteredCarpoolPassengers]= useState([])
    const [totalPassenger,setTotalPassengers]= useState(0)
    const [socket, setSocket] = useState(null)
    const [socketID, setSocketID] = useState()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [registeredVehicle,setRegisterdVehicle] = useState()
    const hostname = window.location.hostname;

  

    useEffect(() => {
      const newSocket = io(SocketUrl)

      // const newSocket = io(`https://ridesync-backend.onrender.com`)
      setSocket(newSocket)
      newSocket.on("connect", () => {
        console.log("from frontend: " + newSocket.id);
        setSocketID(newSocket.id)
        if (driverInfo && driverInfo.id) {
          newSocket.emit("addNewUser", driverInfo.id, newSocket.id);
          console.log("new user added");
        }
        newSocket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });

        newSocket.on("getPassengerBooking",( routeId, passengerId, numberOfPassengers)=>{
          setCarpoolRides((prevRides) =>
            prevRides.map((item) =>
              item.routeId === routeId
              ? { ...item, NumSets: item.NumSets - numberOfPassengers,totalPassengersBooked: numberOfPassengers}
              : item
            )
          );
          fetchCarpoolRides()
          fetchCarpoolPassengers()
        })



        return () => {
        newSocket.disconnect();
      };
      });
    },[driverInfo])


      

    const getDriverVehicle =async()=>{
        try { 
            if(driverInfo && driverInfo.id){
                const result  = await fetch(BASEURL)
                const users = await result.json()
                const filtered = users.filter((u)=> u.userId == driverInfo?.id)
                setRegisterdVehicle(filtered[0].modelName)
            }
        } catch (error) {
            console.log("error fecthing users");
            
        }
    }

    useEffect(()=>{
      getDriverVehicle()
    },[driverInfo])



    
 
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
    }, [])
   
    const handleSearchInput = async (e) => {
        const query = e.target.value;
        setSearchInput(query);
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
        setSearchInputDest(query);
        if (query.length > 2) {
          const response = await fetch(`${BASEURL}/search?query=${encodeURIComponent(query)}`);
          if (!response.ok) {
            console.error('Failed to fetch suggestions');
            return;
          }
          const data = await response.json();
          setSuggestionsDest(data);
        } else {
          setSuggestionsDest([]);
        }
      };

      const handleSelectSuggestion = (lat, lon, display_name) => {
        console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);
        setSelectedPosition({ lat, lon, display_name });
        const map = mapRef.current;
       map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })
        setSearchInput(display_name);
        setSuggestions([]);
      };

      const handleSelectSuggestionDest = (lat, lon, display_name) => {
        console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);
        setSelectedPositionDest({ lat, lon, display_name });
        const map = mapRef.current;
       map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })
        setSearchInputDest(display_name);
        setSuggestionsDest([]);
       };

      const handleRouteDirection = () => {
        if (!selectedPosition || !selectedPositionDest) {
         // alert("Please ensure both your location and the selected location are set.");
          return;
        }
    
        const map = mapRef.current;
    
        if (routingControlRef.current) {
          map.removeControl(routingControlRef?.current);
        }
    
        routingControlRef.current = L.Routing.control({
          waypoints: [
            L.latLng(selectedPosition?.lat, selectedPosition?.lon),
            L.latLng(selectedPositionDest?.lat, selectedPositionDest?.lon)
          ],
          createMarker: function () {
            return null;
          },
          show: false,
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }]
          }
        }).addTo(map);
    
        // Add an event listener to get all the route details
        routingControlRef.current.on('routesfound', function (e) {
          const routes = e.routes[0]; // Get the first route
          const distance = (routes.summary.totalDistance / 1000).toFixed(2); // Distance in kilometers
          const duration = (routes.summary.totalTime / 60).toFixed(2); // Duration in minutes
          setTotalDistance(distance)
          setTotalDuration(duration)
          // Extract the step-by-step directions (instructions)
          const directions = routes.instructions?.map(step => ({
            text: step.text, // Instruction text
            distance: (step.distance / 1000).toFixed(2), // Distance for this step in kilometers
            time: (step.time / 60).toFixed(2) // Time for this step in minutes
          }));
    
          // Store the distance, duration, and directions in the array
        //   routeDetails.push({
        //     totalDistance: `${distance} km`,
        //     totalDuration: `${duration} min`,
        //     directions: directions
        //   });
    
         // console.log("routeDetails", routeDetails); // Log or use the route details as needed
        //   computeTotalAmt()
    
    
          const bounds = L.latLngBounds([
            L.latLng(selectedPosition?.lat, selectedPosition?.lon),
            L.latLng(selectedPositionDest?.lat, selectedPositionDest?.lon)
          ]);
          map.fitBounds(bounds);
    
        });
      };
  
      useEffect(()=>{
        handleRouteDirection()
      },[selectedPositionDest])

      const customIcon = (src) => L.icon({
        iconUrl: src, // Provide the path to your custom icon image
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [19, 38], // Anchor point of the icon [horizontal offset, vertical offset]
        popupAnchor: [0, -38], // Offset for popups relative to the icon
      });

      const handleSetTravelDate =(value)=>{
        setTravelDate( dayjs(value).format("YYYY-MM-DD HH:mm:ss"))    
        console.log( "datetime",dayjs(value).format("YYYY-MM-DD HH:mm:ss"));
        
      }
      const handleSetNumSeats =(e)=>{
        setNumSeats(e.target.value)
      }
      const handleSelectVehicle =(e)=>{
        setVehicle(e.target.value)
      }
      const handleSetPricePerPerson=(e)=>{
        setPricePerPerson(e.target.value);
      }
      const handlePaymentMethond=(e)=>{
        setPaymentMethod(e.target.value)
      }
      const handleCreateCarpoolRide = async()=>{
        const rideInfo = {
                "startLocation":selectedPosition.display_name,
                "endLocation":selectedPositionDest.display_name,
                "duration":totalDuration, 
                "distance":totalDistance,
                "startLatitude":selectedPosition.lat,
                "startLongitude":selectedPosition.lon,
                "endLatitude":selectedPositionDest.lat,
                "endLongitude":selectedPositionDest.lon,
                "travelDateTime":travelDate,
                "NumSets":Number(numSeats),
                "vehicle":vehicle,
                "pricePerPerson":Number(pricePerPerson),
                "paymentMethod":paymentMethod,
                "totalAmount":(pricePerPerson*numSeats)
        }
        if(driverInfo && driverInfo?.id){
         try {
          const userId = driverInfo?.id
          const response = await postRequest(`${BASEURLDrivers}/createCarpoolRide`,JSON.stringify({userId,rideInfo}))
         } catch (error) {
          console.log('failed toa add');
         }
        }
        console.log("ride info:",rideInfo);    
      }
      const fetchCarpoolRides = async()=>{
        if(driverInfo && driverInfo?.id){
          try {
            const userId = driverInfo?.id
            const result = await postRequest(`${BASEURLDrivers}/fetchCarpoolRides`,JSON.stringify({userId}))
            if(result && result?.length > 0 )
              setCarpoolRides(result)
            else
              console.log(result?.message);
            } catch (error) {
                console.log("failed to fetch carpool rides");
            }
        }
      }
      useEffect(()=>{
        fetchCarpoolRides()
      },[driverInfo])

      const [rideInfo,setRideInfo] = useState({
        userId:driverInfo?.id,
        routeId:null,
        pickupLocation: "Manila Quezon Cityijodsnvsd v  gsk rogs",
        dropoffLocation: "Quezon Cityijodsnvsd v kvnvjvdfvfvdfhvf v gvhregsk rogs",
        travelDate: "2024-12-01",
        numSeats: 3,
        pricePerPerson: 150,
        vehicle: "Toyota Vios",
      })
       
      const handleSetRideInfo = (rideInfo)=>{
        setRideInfo({
          userId:driverInfo?.id,
          routeId:rideInfo?.routeId,
          pickupLocation: rideInfo?.startLocation,
          dropoffLocation:rideInfo?.endLocation,
          travelDate: rideInfo?.travelDateTime,
          numSeats: rideInfo?.NumSets,
          pricePerPerson: rideInfo?.pricePerPerson,
          vehicle: rideInfo?.vehicle,
        })
        handleFilterPassengers(rideInfo?.routeId)
      }
      
    
      const handleFilterPassengers = (routeId)=>{
            const filtered = carpoolPassengers?.filter((item)=> item.carpoolRouteId == routeId)
            const numPasengers = filtered.map((item)=> item.numPassengersBooked).reduce((sum, num) => sum + num, 0)
            setTotalPassengers(numPasengers)
            setFilteredCarpoolPassengers(filtered)
      }
      const fetchCarpoolPassengers = async()=>{
      
           if(driverInfo && driverInfo?.id){
               const userId  = driverInfo?.id;
               try {
                  const response = await postRequest(`${BASEURLDrivers}/fetchPassengers`,JSON.stringify({userId}))
                  setCarpoolPassengers(response)
                  console.log("Passengers",response);
                  
               } catch (error) {
                  console.log("error fetching carpool passengers");
               }
           }
      }
      useEffect(()=>{
          fetchCarpoolPassengers()
      },[driverInfo])

      const handleChats = async (passengerId) => {
        const user1_Id = passengerId;
        const user2_Id = driverInfo?.id;
        try {
          const response = await postRequest(`${BASEURL}/createChat`, JSON.stringify({ user1_Id, user2_Id }))
          console.log("handle chat response", response);
          navigate('/driver/CarpoolMessage');
        } catch (error) {
          console.error(error);
        }
      }
    
     const handleMarkCarpoolCompleted = async(routeId)=>{
        try {
             const response = await postRequest(`${BASEURLDrivers}/markCarpoolCompleted`,JSON.stringify({routeId}))
             console.log(response);
           navigate('/driver/Carpoollooading?route=/driver/homeCarpool&active=request');

        } catch (error) {
            console.log("error updating carpool route");
            
        }
     }


 

 
   return(
    <HomeCarpoolContext.Provider
    value={{
      driverInfo,
        mapRef,
        routingControlRef,
        searchInput,
        handleSearchInput,
        searchInputDest,
        handleSearchInputDest,
        suggestions,
        suggestionsDest,
        handleSelectSuggestion,
        handleSelectSuggestionDest,
        travelDate,
        handleSetTravelDate,
        numSeats,
        handleSetNumSeats,
        vehicle,
        handleSelectVehicle,
        pricePerPerson,
        handleSetPricePerPerson,
        paymentMethod,
        handlePaymentMethond,
        handleCreateCarpoolRide,
        customIcon,
        handleRouteDirection,
        selectedPosition,
        selectedPositionDest,
        totalDuration, 
        totalDistance,
        carpoolRides,
        rideInfo,
        handleSetRideInfo,
        carpoolPassengers,
        filteredCarpoolPassengers,
        totalPassenger,
        handleChats,
        handleMarkCarpoolCompleted,
        registeredVehicle
    }}
    >
        {children}
    </HomeCarpoolContext.Provider>
   )
}
