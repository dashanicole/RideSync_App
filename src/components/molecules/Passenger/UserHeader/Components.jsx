 import React, { useEffect, useState } from "react";
import DefaultProfile from "../../../../assets/DefaultProfile.png";
import Location from "../../../../assets/HLocationIcon.png";
import HTime from "../../../../assets/HTime.png";
import clock from "../../../../assets/clock.png";
import locationIconHeader from "../../../../assets/locationIconHeader.png";
import { useNavigate } from "react-router-dom";

const Components = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(DefaultProfile);
  const [time, setTime] = useState("");
  const navigate = useNavigate()
  const handelNavigateProfile=(route)=>{
    navigate('/passenger/profileContents')
    console.log("navigate");
    
  }

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

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZoneName: "short",
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch user profile image using "User" from localStorage
  useEffect(() => {
    if (userInfo && userInfo?.id) {
      const timeout = setTimeout(async() => {
        const cloudinaryUrl = `https://res.cloudinary.com/drvtezcke/image/upload/v1/${userInfo?.id}?${new Date().getTime()}`;
        const respnonse  = await fetch(cloudinaryUrl)
        if(respnonse.ok)
        setUserProfileImage(cloudinaryUrl);
        else
        setUserProfileImage(DefaultProfile)
        console.log("Updated img:", cloudinaryUrl);
      }, 1); // 3000ms = 3 seconds

      // Cleanup the timeout when the component is unmounted or userInfo changes
      return () => clearTimeout(timeout);
    }
  }, [userInfo]);

  return (
    <div className="flex justify-between items-center h-[70px] bg-gradient-to-r bg-colorBlue mt-5 mr-5 ml-[60px] lg:ml-[20px] rounded-3xl px-3 md:px-5 shadow-lg">
      <div className="flex items-center"></div>
      <div className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-2">
          <img
            src={clock}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
            alt="Time Icon"
          />
          <h1 className="text-gray-200 text-sm md:text-base font-medium">{time}</h1>
        </div>

        <div className="hidden sm:flex items-center space-x-2">
          <img
            src={locationIconHeader}
            className="w-5 h-5 md:w-6 md:h-6 rounded-full object-cover"
            alt="Location Icon"
          />
          <h1 className="text-gray-200 text-sm md:text-base font-medium">Cebu City</h1>
        </div>

        {/* Render the user's profile image or the default image */}
        {userProfileImage === DefaultProfile ? (
         <div  onClick={handelNavigateProfile}>
            <img
            src={DefaultProfile}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 hover:border-white cursor-pointer shadow-md"
            alt="Profile"
          />
         </div>
        ) : (
      <div  onClick={handelNavigateProfile}>
         <img
            src={userProfileImage}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 hover:border-white cursor-pointer shadow-md"
            alt="Profile"
          
          />
      </div>
        )}
      </div>
    </div>
  );
};

export default Components;
