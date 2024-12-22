import { createContext, useEffect, useRef, useState } from "react";
import { BASEURL, postRequest } from "../../../utils/Service";
import { json } from "react-router-dom";
 
export const BookRideContext = createContext()


export const BookRideContextProvider = ({ children }) => {

    const mapRef = useRef();
    const routingControlRef = useRef();
    const [trip, setTrip] = useState('One way');
    const [rideType, setRideType] = useState('Motorcylce');
    const [passenger, setPassenger] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchInputDest, setSearchInputDest] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsDest, setSuggestionsDest] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionDest, setSelectedPositionDest] = useState(null);
    const [listOfSuggestionDrivers, setListOfSuggestionDrivers] = useState([])
    const [estDuration, setEstDuration] = useState(0)
    const [totalDistance, setTotalDistance] = useState(0)
    const [amt, setAmout] = useState(0)
    const [driverId, setDriverId] = useState()
    const [userInfo, setUserInfo] = useState()
    const [isBooking, setIsBooking] = useState(false);
    const [warning,setWarning]= useState(false)
    const [isBookingConfirmed,setIsBookingConfirmed] = useState(false)
    const hostname = window.location.hostname;



    const handleChangeTrip = (event) => {
        setTrip(event.target.value);
    };

    const handleChangeRideTypes = (event) => {
        setRideType(event.target.value);
    };

    const handleChangePassenger = (event) => {
        setPassenger(event.target.value);
    };

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
    };

    const handleBooking = (value) => {
        if (!trip || !rideType || !passenger || !selectedPosition || !selectedPositionDest || !selectedDate) {
            console.error("Please complete all required fields.");
            alert("Please complete all required fields.");
            return;
        }
        setIsBooking(value)
        fetchDrivers()
    }
    const handleSelectedDriver = (id) => {
        setDriverId(id)
    }
    const handleExploreDestinations = () => {
        setIsBooking(true)
    }

    useEffect(() => {
        const storedInfo = localStorage.getItem("User");
        if (storedInfo) {
            try {
                const parsedInfo = JSON.parse(storedInfo)
                setUserInfo(parsedInfo)
                console.log("booking  User info set:", parsedInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.log("No user info found in localStorage");
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
            console.log("Fetched Data destination: ", data);
            setSuggestionsDest(data);
        } else {
            setSuggestionsDest([]);
        }

    };


    const handleSelectSuggestion = (lat, lon, display_name) => {
        console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);

        setSelectedPosition({ lat, lon, display_name });
        //const map = mapRef.current;
        //map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })

        setSearchInput(display_name);
        setSuggestions([]);

    };
    const handleSelectSuggestionDest = (lat, lon, display_name) => {
        console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);
        setSelectedPositionDest({ lat, lon, display_name });
        // const map = mapRef.current;
        //  map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })
        setSearchInputDest(display_name);
        setSuggestionsDest([]);

    };

    const customIcon = (src) => L.icon({
        iconUrl: src, // Provide the path to your custom icon image
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [19, 38], // Anchor point of the icon [horizontal offset, vertical offset]
        popupAnchor: [0, -38], // Offset for popups relative to the icon
    });


    const handleRouteDirection = async () => {
        if (!selectedPosition || !selectedPositionDest) {
            alert("Please ensure both your location and the selected location are set.");
            return;
        }

        const map = mapRef.current;

        // Remove the existing routing control if it exists
        if (routingControlRef.current) {
            map.removeControl(routingControlRef.current);
        }

        // Initialize routing control
        routingControlRef.current = L.Routing.control({
            waypoints: [
                L.latLng(selectedPosition.lat, selectedPosition.lon),
                L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
            ],
            createMarker: function () {
                return null; // Hide markers for the waypoints
            },
            routeWhileDragging: true,
            lineOptions: {
                styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }] // Styling the route line
            }
        }).addTo(map);

        // Listen for routes found event
        routingControlRef.current.on('routesfound', (e) => {
            const routes = e.routes[0]; // First route found

            console.log("Routes found:", routes); // Debug: Log the route data

            // Check if routes and summary are available
            if (routes && routes.summary) {
                const distance = (routes.summary.totalDistance / 1000).toFixed(2); // Convert to kilometers
                const duration = Math.ceil(routes.summary.totalTime / 60); // Convert to minutes

                console.log("Route distance:", distance, "Duration:", duration); // Debug: Log distance and duration

                if (routes.summary.totalDistance > 0 && routes.summary.totalTime > 0) {
                    setEstDuration(duration); // Set the estimated duration
                    setTotalDistance(distance); // Set the total distance
                } else {
                    console.error("Invalid route data received. Total distance or time is 0.");
                }

                // Calculate the total amount based on the distance
                const flagdown = 5; // Base fare
                const AmtPerKPH = 12; // Fare per kilometer
                const numericKm = parseFloat(distance);

                if (!isNaN(numericKm)) {
                    const totalAmt = (flagdown + (numericKm * AmtPerKPH)).toFixed(2);
                    setAmout(totalAmt); // Set the calculated amount
                } else {
                    console.error("Invalid distance:", distance);
                }
            } else {
                console.error("Route summary not found.");
            }

            // Fit the map view to the bounds of the route
            const bounds = L.latLngBounds([
                L.latLng(selectedPosition.lat, selectedPosition.lon),
                L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
            ]);
            map.fitBounds(bounds); // Adjust map view to fit route
        });
    };


    const handleSubmitBooking = async () => {
        // Validate required fields
        if (!trip || !passenger || !rideType || !selectedDate || !driverId) {
            console.error("Please complete all required fields.");
            setWarning(true)
           // alert("Please complete all required fields.");
            return;
        }

        // Prepare booking information
        const bookingInfo = {
            userId: userInfo.id,
            startLocation: searchInput,
            startLatitude: selectedPosition.lat,
            startLongitude: selectedPosition.lon,
            endLocation: searchInputDest,
            endLatitude: selectedPositionDest.lat,
            endLongitude: selectedPositionDest.lon,
            estimatedDuration: estDuration,
            distance: totalDistance,
            totalAmount: amt,
            driverId: driverId, // Example driver ID
            trip: trip, // Trip ID (if applicable)
            numPassengers: passenger, // Number of passengers
            rideType: rideType, // Type of ride (e.g., economy, luxury)
            travelDate: convertToSQLDateTime(selectedDate), // Convert date to SQL format
            status: "booking" // Initial status
        };

        console.log("Booking Info:", bookingInfo); // Debug: Log the booking information

        try {
            const response = await postRequest(`${BASEURL}/booking`, JSON.stringify(bookingInfo));

          //  setIsBooking(false)
            setIsBookingConfirmed(true)
            setTrip('')
            setRideType('')
            setPassenger('')
            setSearchInput('')
            setSearchInputDest('')
            setDriverId(null)
            setSelectedDate(null)
            setSelectedPosition(null)
            setSelectedPositionDest(null)
        } catch (error) {
            console.error("An error occurred while submitting the booking:", error); // Debug: Log error
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const convertToSQLDateTime = (isoDate) => {
        const date = new Date(isoDate);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };


    const fetchDrivers = async () => {
        try {
            const response = await fetch(BASEURL)
            const data = await response.json()
            console.log("drivers",data);
            
            setListOfSuggestionDrivers(data)
        } catch (error) {
            console.error("Error fetching request data:", error);
        }
    }


    useEffect(() => {
        fetchDrivers();
    }, []);






    return (
        <BookRideContext.Provider
            value={{
                mapRef,
                routingControlRef,
                trip,
                rideType,
                passenger,
                selectedDate,
                isBooking,
                amt,
                totalDistance,
                estDuration,
                handleChangeTrip,
                handleChangeRideTypes,
                handleChangePassenger,
                handleDateChange,
                handleBooking,
                searchInput,
                suggestions,
                setSearchInput,
                searchInputDest,
                suggestionsDest,
                setSearchInputDest,
                handleSearchInput,
                handleSearchInputDest,
                handleSelectSuggestion,
                handleSelectSuggestionDest,
                selectedPosition,
                selectedPositionDest,
                customIcon,
                handleRouteDirection,
                handleSubmitBooking,
                fetchDrivers,
                listOfSuggestionDrivers,
                handleSelectedDriver,
                driverId,
                handleExploreDestinations,
                setIsBooking,
                setWarning,
                warning,
                isBookingConfirmed,
                setIsBookingConfirmed,
            }}
        >
            {children}
        </BookRideContext.Provider>
    )
}