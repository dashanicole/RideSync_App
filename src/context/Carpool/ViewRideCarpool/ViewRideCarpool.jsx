import { createContext, useState ,useEffect} from "react";
import { BASEURL, BASEURLDrivers, postRequest } from "../../../utils/Service";

export const ViewRideCarpoolContext = createContext()
export const ViewRideCarpoolContextProvider = ({children})=>{

    const [driverInfo, setDriverInfo] = useState(null);
    const [completedCarpools,setCompletedCarpools]= useState()
    const [users,setUsers]= useState()
    const [carpoolPassengers,setCarpoolPassenger] = useState()
    const [passengersByCarpool,setPassengersByCarpool]= useState()
    const hostname = window.location.hostname;


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

    const fetchCompletedCarpools = async()=>{
        try {
            if(driverInfo && driverInfo?.id){
                const userId = driverInfo?.id
                const response = await postRequest(`${BASEURLDrivers}/fetchCompletedCarpools`,JSON.stringify({userId}))
                setCompletedCarpools(response)
                console.log(response);
            }
        }catch (error) {
                console.log("Error fetching completedCarpools");
        }
    }
    
    useEffect(()=>{
        const fetchPassengers = async () => {
        try {
            const response = await fetch(BASEURL)
            const data = await response.json()
            console.log("drivers",data);
            setUsers(data)
        } catch (error) {
            console.error("Error fetching request data:", error);
        }
    }
    const getCarpoolPassengers = async()=>{
        const response = await fetch(`${BASEURLDrivers}/getCarpoolPassengers`)
        const data = await response.json()
        console.log("Carpool passengers",data);
        setCarpoolPassenger(data)
        
    }
        fetchPassengers()
        getCarpoolPassengers()
    },[driverInfo])

    useEffect(()=>{
        fetchCompletedCarpools()
    },[driverInfo])



const getPassengerByCarpool = (routeId) => {
   const filteredPassengers = carpoolPassengers.filter(u => u.carpoolRouteId === routeId);
   console.log("Filtered passengers for routeId:", routeId, filteredPassengers);

   const passengers = users.map(u => {
       const passenger = filteredPassengers.find(f => f.passengerId === u.userId);
       return passenger ? {...u, numPassengersBooked: passenger.numPassengersBooked} : null;
   }).filter(u => u !== null);  

   console.log("Final passengers list:", passengers);
   setPassengersByCarpool(passengers);
}





    return(
        <ViewRideCarpoolContext.Provider
        value={{
            carpoolPassengers,users,
            completedCarpools,
            getPassengerByCarpool,
            passengersByCarpool
        }}
        >
            {children}
        </ViewRideCarpoolContext.Provider>
    )
} 