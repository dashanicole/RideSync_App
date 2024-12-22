import { createContext, useState, useRef, useEffect, useCallback, useContext } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import 'leaflet-control-geocoder'; // Geocoder JS
import { BASEURL, getRequest, postRequest, SocketUrl, updateRequest } from "../../../utils/Service";
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom';


export const FindRouteContext = createContext()
export const FindRouteContextProvider = ({ children }) => {


  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchInputDest, setSearchInputDest] = useState('');
  const [suggestionsDest, setSuggestionsDest] = useState([]);
  const mapRef = useRef();
  const routingControlRef = useRef();
  const routeDetails = [];// this is just the routeDirections
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedPositionDest, setSelectedPositionDest] = useState(null);
  const [amount, setAmout] = useState(0.00)
  const [totalDistance, setTotalDistance] = useState(0.0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [step1, setStep1] = useState(false)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const [hasRendered, setHasRendered] = useState(false); // To track if it has already rendered
  const [userInfo, setUserInfo] = useState(null);
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socketID, setSocketID] = useState()
  const [drivers, setDrivers] = useState([]);// list of potential drivers
  const [yourDriver, setYourDriver] = useState();// this is your selected driver
  const [driverCoordinates, setDriverCoordinates] = useState()
  const [routeInfo, setRouteInfo] = useState();

  const [isDriverComming, setIsDriverComming] = useState(false)
  const [isDriverHasArrive, setIsDriverHasArrive] = useState(() => {
    const storedValue = localStorage.getItem('isDriverHasArrive');
    return storedValue === 'true';
  });
  const [warning,setWarning]= useState(false);
  const [isRidesCompleted, setIsRideCompleted] = useState(false)
  const navigate = useNavigate();
  const hostname = window.location.hostname;






  const fetchRoute = async () => {
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      const status = 'pending'
      try {
        const data = await postRequest(`${BASEURL}/getRouteRequest`, JSON.stringify({ userId, status }));
        console.log("Fetched route data:", data); // Check the structure here
        if (data.error) {
          console.error('Error fetching route:', data.message);
          return;
        }
        if (data && data.length > 0) {
          setAmout(data[0].totalAmount);
          setTotalDistance(data[0].distance);
          setTotalDuration(data[0].estimatedDuration);
          const startPosition = { lat: data[0].startLatitude, lon: data[0].startLongitude };
          const endPosition = { lat: data[0].endLatitude, lon: data[0].endLongitude };
          setSelectedPosition(startPosition);
          setSelectedPositionDest(endPosition);
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    } else {
      console.warn('UserInfo is not available or invalid.');
    }
  };

  useEffect(() => {
    const fetchRequestRide = async () => {
      if (userInfo && userInfo.id) {
        const userId = userInfo.id;
        const body = JSON.stringify({ userId });
        const potentialDrivers2 = await postRequest(`${BASEURL}/getRequestRide`, body);
        if (potentialDrivers2 && potentialDrivers2.length > 0) {
          const startPosition = { lat: potentialDrivers2[0].startLatitude, lon: potentialDrivers2[0].startLongitude }
          const endPosition = { lat: potentialDrivers2[0].endLatitude, lon: potentialDrivers2[0].endLongitude }
          setSelectedPosition(startPosition)
          setSelectedPositionDest(endPosition)
        }
      }
    };
    fetchRequestRide();
  }, [userInfo]);



  useEffect(() => {
    if (selectedPosition && selectedPositionDest && !hasRendered) {
      const timeoutId = setTimeout(() => {
        handleRouteDirectionLoad();
        fetchRoute()

        setHasRendered(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }


  }, [selectedPosition, selectedPositionDest, hasRendered]);


  const handleRouteDirectionLoad = async () => {
    const map = mapRef.current;
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
          show: true,
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: '#00A6CE', opacity: 1, weight: 5 }],
          },
        }).addTo(map);

        // Add an event listener to get all the route details
        routingControlRef.current.on('routesfound', function (e) {
          const routes = e.routes[0]; // Get the first route
          const distance = (routes.summary.totalDistance / 1000).toFixed(2); // Distance in kilometers
          const duration = (routes.summary.totalTime / 60).toFixed(2); // Duration in minutes

          // Extract the step-by-step directions (instructions)
          const directions = routes.instructions.map(step => ({
            text: step.text, // Instruction text
            distance: (step.distance / 1000).toFixed(2), // Distance for this step in kilometers
            time: (step.time / 60).toFixed(2) // Time for this step in minutes
          }));

          // Store the distance, duration, and directions in the array
          routeDetails.push({
            totalDistance: `${distance} km`,
            totalDuration: `${duration} min`,
            directions: directions
          });
          console.log("routeDetails this?", routeDetails);
          computeTotalAmt()
          const bounds = L.latLngBounds([
            L.latLng(selectedPosition.lat, selectedPosition.lon),
            L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
          ]);
          map.fitBounds(bounds);

        });
      } catch (error) {
        console.error("Routing error:", error);
        alert("Failed to calculate route. Please try again later.");
      }
    } else {
      console.log("Waiting for map and positions to be ready");
    }
  };

  useEffect(() => {
    fetchRoute();
  }, [userInfo]);


  useEffect(() => {
    const newSocket = io(SocketUrl)
    //const newSocket= io(`https://ridesync-backend.onrender.com`)
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("from frontend: " + newSocket.id);
      setSocketID(newSocket.id)

      if (userInfo && userInfo.id) {
        newSocket.emit("addNewUser", userInfo.id, newSocket.id);
        console.log("new user added");

      }
    });

    newSocket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    newSocket.on("yourDriver", (driverId) => {
      console.log("Received driver ID:", driverId);
      setDrivers(prev => [...prev, driverId])
    });

    newSocket.on("driverIsComming", (latitude, longitude) => {
      setIsDriverComming(true)
      setIsDriverHasArrive(false)
      console.log("Driver is Coming from passenger side", latitude, longitude);
      setDriverCoordinates({ lat: latitude, lon: longitude })
    })

    newSocket.on("driverHasArrived", () => {
      setIsDriverComming(false)
      setIsDriverHasArrive(true)
      localStorage.setItem('isDriverHasArrive', true);
    })

    newSocket.on("rideIsCompleted", () => {
      setIsRideCompleted(true)
      localStorage.setItem('isDriverHasArrive', false);
    })

    return () => {
      newSocket.disconnect();
    };
  }, [userInfo])


  useEffect(() => {
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      const fetchDrivers = async () => {
        const body = JSON.stringify({ userId, status: 'waiting' });
        const response = await getRequest(`${BASEURL}/getPotentialRide`, body);

        if (response.error) {
          console.error('Error fetching drivers:', response.message);
        } else {
          const ids = response.map(driver => driver.driverId);
          console.log("Fetched driver IDs:", ids);
          setDrivers(ids);
        }
      };
      fetchDrivers();
    }
  }, [userInfo]);


  // useEffect(() => {
  //   console.log("Updated drivers: ", drivers);
  // }, [drivers]);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('User');
    if (storedUserInfo) {
      try {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
        console.log("User info set:", parsedUserInfo);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    } else {
      console.log("No user info found in localStorage");
    }
  }, []);



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
    setTotalDuration(0)
    setTotalDistance(0)
    setAmout(0)
  };


  const handleSelectSuggestion = (lat, lon, display_name) => {
    console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);

    setSelectedPosition({ lat, lon, display_name });
    const map = mapRef.current;
    map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })

    setSearchInput(display_name);
    setSuggestions([]);
    clearRoute()
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
    setTotalDuration(0)
    setTotalDistance(0)
    setAmout(0)
  };

  const handleSelectSuggestionDest = (lat, lon, display_name) => {
    console.log("Selecting suggestion with lat:", lat, "lon:", lon, "display_name:", display_name);
    setSelectedPositionDest({ lat, lon, display_name });
    const map = mapRef.current;
    map.flyTo([lat, lon], 17, { animate: true, duration: 1.5 })
    setSearchInputDest(display_name);
    setSuggestionsDest([]);
    clearRoute()
  };


  const handleRouteDirection = () => {
    if (!selectedPosition || !selectedPositionDest) {
      //alert("Please ensure both your location and the selected location are set.");
      setWarning(true)
      return;
    }

    const map = mapRef.current;

    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(selectedPosition.lat, selectedPosition.lon),
        L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
      ],
      createMarker: function () {
        return null;
      },
      show: true,
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

      // Extract the step-by-step directions (instructions)
      const directions = routes.instructions.map(step => ({
        text: step.text, // Instruction text
        distance: (step.distance / 1000).toFixed(2), // Distance for this step in kilometers
        time: (step.time / 60).toFixed(2) // Time for this step in minutes
      }));

      // Store the distance, duration, and directions in the array
      routeDetails.push({
        totalDistance: `${distance} km`,
        totalDuration: `${duration} min`,
        directions: directions
      });

      console.log("routeDetails", routeDetails); // Log or use the route details as needed
      computeTotalAmt()


      const bounds = L.latLngBounds([
        L.latLng(selectedPosition.lat, selectedPosition.lon),
        L.latLng(selectedPositionDest.lat, selectedPositionDest.lon)
      ]);
      map.fitBounds(bounds);

    });
  };

  const clearRoute = () => {
    const map = mapRef.current;
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }
  };

  const customIcon = (src) => L.icon({
    iconUrl: src, // Provide the path to your custom icon image
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [19, 38], // Anchor point of the icon [horizontal offset, vertical offset]
    popupAnchor: [0, -38], // Offset for popups relative to the icon
  });


  const computeTotalAmt = () => {
    let km = routeDetails[0].totalDistance
    let duration = routeDetails[0].totalDuration
    const flagdown = 5;
    const AmtPerKPH = 12;
    let numericKm = parseFloat(km);
    if (isNaN(numericKm)) {
      console.error("Invalid distance:", km);
      return;
    }
    let totalAmt = flagdown + (numericKm * AmtPerKPH);
    totalAmt = totalAmt.toFixed(2)
    console.log("km: " + km + "Total amount:" + totalAmt);
    setTotalDuration(duration)
    setTotalDistance(km)
    setAmout(totalAmt)
  }


  const handleProceed = useCallback(async (v) => {
    if (!userInfo || !searchInput || !searchInputDest || !totalDuration || !totalDistance || !amount) {
     // console.error("All fields must be filled out.");
     // alert("All fields must be filled out.");
    setWarning(true)
      return;
    }

    const routeInfo = {
      userId: userInfo.id,
      startLocation: searchInput,//location name
      startLatitude: selectedPosition.lat,
      startLongitude: selectedPosition.lon,
      endLocation: searchInputDest, // destination name
      endLatitude: selectedPositionDest.lat,
      endLongitude: selectedPositionDest.lon,
      estimatedDuration: parseFloat(totalDuration),
      distance: parseFloat(totalDistance),
      totalAmount: parseFloat(amount)
    };

    console.log("Route Info:", JSON.stringify(routeInfo));

    try {
      const response = await postRequest(`${BASEURL}/routeRequest`, JSON.stringify(routeInfo));
      console.log("Response from routeRequest:", response);

      setStep1(v)

      fetchRoute()
      socket.emit("newRouteData", routeInfo)
    } catch (error) {
      console.error("Error during post request:", error);
    }
  }, [userInfo, searchInput, searchInputDest, totalDuration, totalDistance, amount]);



  const handelSelectDriver = async (v, driverId) => {
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      try {
        const data = await updateRequest(`${BASEURL}/selectedDriver`, JSON.stringify({ userId, driverId,drivers }));

        console.log("Fetched route data:", data); // Check the structure here
        if (data.error) {
          console.error('Error fetching route:', data.message);
          return;
        }

        setStep3(v)
        setStep1(true)
        setStep2(true)
        console.log("steps1:", step1, "steps2:", step2, "steps3:", step3);

        //console.log("passenger", driverId, userInfo.id);
        setYourDriver(driverId)
        socket.emit("passenger", userInfo.id, driverId)
      } catch {
      }
    }

  }


  const handleCancel = async (v) => {

    const userId = userInfo?.id

    try {
      const response = await updateRequest(`${BASEURL}/routeCancelled`, JSON.stringify({ userId }))

      const response2 = await updateRequest(
        `${BASEURL}/cancelAllPotentialDrivers`,
        JSON.stringify({ driversIds: drivers })
      );

      setDrivers([])
      setRouteInfo([])
      setAmout()
      setTotalDistance()
      setTotalDuration()
      setStep1(v)
      setStep2(v)
      setStep3(v)
      setIsRideCompleted(false)
      setRouteInfo([])
      setSearchInput("")
      setSearchInputDest("")
      setDriverCoordinates(null)
      setSelectedPosition(null)
      setSelectedPositionDest(null)
      const map = mapRef.current;
      map.removeControl(routingControlRef.current);
    } catch (err) {
      console.log(err);
    }

    socket.emit("cancelled", userId)
  }

  const handleCancelRide = async (v) => {
    const userId = userInfo?.id
    try {
      const response = await updateRequest(`${BASEURL}/routeCancelled`, JSON.stringify({ userId, yourDriver }))
      handleCancel(v)
      setDrivers([])
      setStep3(v)
      setStep2(v)
      localStorage.setItem('isDriverHasArrive', false);
      socket.emit("cancelledRide", userId, yourDriver),
        console.log("ABout to cancelled:", userId, "and", yourDriver);
    } catch (error) {
    }


    setIsRideCompleted(false)
    setRouteInfo([])
    setSearchInput("")
    setSearchInputDest("")
    setIsDriverHasArrive(false)
    setSelectedPosition(null)
    setSelectedPositionDest(null)
    setAmout()
    setTotalDistance()
    setTotalDuration()
    const map = mapRef.current;
    map.removeControl(routingControlRef.current);





  }

  const [dId, setId] = useState();
  const fetchYourDriver = async () => {
    const userId = userInfo?.id
    try {
      const response = await postRequest(`${BASEURL}/getDriver`, JSON.stringify({ userId }))
      console.log("YOUR DRIVER", response[0].driverId);
      if (response.length > 0) {
        setId(response[0].driverId)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchYourDriver()
  }, [userInfo])

  const handleChats = async (driverId) => {
    await fetchYourDriver()
    const user1_Id = userInfo?.id;
    const user2_Id = driverId;
    try {
      const response = await postRequest(`${BASEURL}/createChat`, JSON.stringify({ user1_Id, user2_Id }))
      console.log("handle chat response", response);
      navigate('/passenger/messageContents');
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <FindRouteContext.Provider
      value={{
        userInfo,
        mapRef,
        routingControlRef,
        searchInput,
        setSearchInput,
        suggestions,
        handleSearchInput,
        handleSelectSuggestion,
        searchInputDest,
        setSearchInputDest,
        suggestionsDest,
        handleSearchInputDest,
        handleSelectSuggestionDest,
        selectedPosition,
        selectedPositionDest,
        setSelectedPosition,
        setSelectedPositionDest,
        handleRouteDirection,
        handleChats,
        customIcon,
        amount,
        totalDistance,
        totalDuration,
        setStep1,
        setStep2,
        setStep3,
        step1,
        step2,
        step3,
        handleProceed,
        handleCancel,
        drivers,
        handelSelectDriver,
        handleCancelRide,
        setYourDriver,
        isDriverComming,
        isDriverHasArrive,
        setIsDriverHasArrive,
        driverCoordinates,
        setDriverCoordinates,
        isRidesCompleted,
        setIsRideCompleted,
        setRouteInfo,
        setAmout,
        setTotalDistance,
        setTotalDuration,
        setDrivers,
        setWarning,
        warning,
      }}
    >
      {children}
    </FindRouteContext.Provider>
  )
}