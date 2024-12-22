import React, { useContext, useEffect, useState } from 'react'
import RequestRides from './RequestRides'
import PassengerApproval from './PassengerApproval'
import { RequestContext } from '../../../../context/DriverContext/Request/Request'
import { BASEURL, BASEURLDrivers, postRequest } from '../../../../utils/Service'

const Components = () => {
    const { setIsOfferingRide, setOpenInfoModal, driverInfo, step1, step2, setStep1, request } = useContext(RequestContext);
    const [ride, setRide] = useState(null);
 
    const fetchRequest = async () => {
        if (driverInfo && driverInfo.id) {
            console.log("idDriver", driverInfo?.id);
            try {
                const driverId = driverInfo.id;
                const body = JSON.stringify({ driverId: Number(driverId), status: 'onGoing' });
                const routeRequest = await postRequest(`${BASEURLDrivers}/getRides`, body);
                const isDriverOfferingARide = await postRequest(`${BASEURLDrivers}/fetchIfDriverOfferingRide`, JSON.stringify({ driverId }))
                console.log(isDriverOfferingARide);
                // Set the fetched data to state
                if (routeRequest && routeRequest[0]?.length > 0) {
                    setStep1(true)
                    setRide(routeRequest);
                    console.log("THERE IS VALUE");
                }

                if (isDriverOfferingARide && isDriverOfferingARide.length > 0) {
                    setIsOfferingRide(true)
                    setOpenInfoModal(true)
                    // console.log("opening modal ");
                }
                console.log("Fetched Ride Info:", routeRequest);
            } catch (error) {
                console.error("Error fetching ride info:", error);
            }
        }
    };
    useEffect(() => {
        fetchRequest();
        if (request) {

            console.log("THERE IS VALUE1");
        } else {
            console.log("THERE IS NO VALUE YET");
        }
    }, [driverInfo]); // Trigger fetchRequest when driverInfo changes
    


    return (
        <div >
         
           
                    {
                        !step1 ? <RequestRides /> : !step2 ? <PassengerApproval /> : <RequestRides />
                    }
                
      
         
        </div>
    )
}

export default Components