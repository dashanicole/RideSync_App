 import React, { useState, useEffect, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import CreateRides from "./CreateRides";
import MapView from "./Map";
import DriverList from "./DriverList";
import { FindRouteContext } from "../../../../context/PassengerContext/FindRoute/FindRouteContext";
import SelectedDriver from "./SelectedDriver";
import { BASEURL, postRequest } from "../../../../utils/Service";
import { WarningModal } from "../../../atoms/WarningModal";

const Components = () => {
  const { userInfo, step1, setStep1, step2, setStep2, setStep3, step3, setWarning, warning } = useContext(FindRouteContext);
  const [isMobile, setIsMobile] = useState(false); // To track if screen is mobile
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Check if the screen width is mobile (less than 768px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust based on your breakpoints
    };

    handleResize(); // Run on mount to set initial state
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the listener
    };
  }, []);

  const fetchRequestRide = async () => {
    if (userInfo && userInfo.id) {
      const userId = userInfo.id;
      const routeRequest = await postRequest(`${BASEURL}/getRouteRequest`, JSON.stringify({ userId }));
      const potentialDriversInfo1 = JSON.stringify({ userId, status: "waiting" });
      const potentialDrivers1 = await postRequest(`${BASEURL}/getPotentialRide`, potentialDriversInfo1);
      const potentialDriversInfo2 = JSON.stringify({ userId, status: "matched" });
      const potentialDrivers2 = await postRequest(`${BASEURL}/getPotentialRide`, potentialDriversInfo2);

      if (routeRequest.error) {
        console.error("Error fetching route:", routeRequest.message);
        return;
      }

      if (routeRequest.length > 0) {
        setStep1(true);
        setStep2(false);
        setStep3(true);
      }

      if (potentialDrivers1.length > 0) {
        setStep1(true);
        setStep2(false);
        setStep3(true);
      }

      if (potentialDrivers2.length > 0) {
        setStep1(true);
        setStep2(true);
        setStep3(false);
      }
    }
  };

  useEffect(() => {
    fetchRequestRide();
  }, []);

  const togglePanel = () => {
    setIsPanelOpen((prev) => !prev);
  };

  return (
    <div className="md:pl-3 animate-fadeIn">
      {isMobile ? (
        // For mobile screens
        <div className="md:hidden">
          {/* Mobile view */}
          <div className="p-2 overflow-y-auto h-full">
            {!step1 ? (
              <CreateRides />
            ) : !step2 ? (
              <DriverList />
            ) : !step3 ? (
              <SelectedDriver />
            ) : null}
          </div>

          {/* MapView */}
          <div className="z-0">
            <MapView />
          </div>
        </div>
      ) : (
        // For larger screens
        <div className="hidden md:block relative w-full h-[80vh]">
          {/* MapView */}
          <div className="z-0">
            <MapView />
          </div>

          {/* Sliding Panel */}
          <div
            className={`absolute top-2 h-[86vh] bg-gradient-to-b backdrop-blur-xl rounded-lg shadow-xl transform ${
              isPanelOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out w-[470px] pointer-events-auto`}
          >
            {/* Close/Open Button */}
            <button
              onClick={togglePanel}
              className="absolute top-[300px] right-[-40px] bg-gray-200 rounded-full shadow-md p-2 focus:outline-none"
            >
              {isPanelOpen ? (
                <FaChevronLeft className="text-xl text-gray-600" />
              ) : (
                <FaChevronRight className="text-xl text-gray-600" />
              )}
            </button>

            {/* Content */}
            <div className="p-2 overflow-y-auto h-full">
              {!step1 ? (
                <CreateRides />
              ) : !step2 ? (
                <DriverList />
              ) : !step3 ? (
                <SelectedDriver />
              ) : null}
            </div>
          </div>
        </div>
      )}

      {warning && (
        <WarningModal
          message="Please Enter Pickup Location And Destination to continue!"
          setWarning={setWarning}
        />
      )}
    </div>
  );
};

export default Components;
