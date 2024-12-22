 import React, { useContext, useState } from "react";
import DefaultProfile from "../../../../assets/DefaultProfile.png";
import { Button } from "../../../atoms/Button";
import { AiOutlineCar, AiOutlineStar, AiOutlineMail } from "react-icons/ai";
import { MdVerified, MdPhone, MdLocationOn } from "react-icons/md";
import { Ratings } from "../../../atoms/Ratings";
import { ProfileContext } from "../../../../context/Carpool/Profile/ProfileContext";
import { Skeleton } from "../../../atoms/Skeleton";


const Profile = () => {
   const { userData ,profileImage} = useContext(ProfileContext);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EditProfile userData={userData} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-6 bg-gradient-to-r from-blue-200 to-purple-200 p-6 rounded-lg shadow-md relative">
            {/* Decorative Background Shape */}
           
            <div className="relative">
              {
                profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-lg"
                  />
                ) : (
                  
                  <Skeleton  variant="Circle"  width="80px" height="80px" animation="pulse" raduis="50%" />
                )
              }
              <button
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1"
                onClick={() => setIsEditing(true)}
              >
                <MdVerified className="text-lg" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {userData?.userFn} {userData?.userLn}
              </h2>
              <p className="text-gray-600 text-sm">
                {userData?.userType === "D" ? "🚘 Driver" : "🚶 Passenger"}
              </p>
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-gray-700">
                    <Ratings value={userData?.userRating}/> 
                    {userData?.userRating}/5
                </span>
              </div>
            </div>
            <Button
              name="Edit Profile"
              size="small"
              variant="contained"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
            {/* Decorative Field */}
            <div className="border-l-4 border-blue-500 pl-4 relative">
              <label className="block text-gray-700 mb-1 text-sm">Firstname</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                placeholder={userData?.userLn}
                readOnly
              />
              <div className="absolute -left-6 top-1 text-blue-500">
                {/* <MdVerified /> */}
              </div>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 relative">
              <label className="block text-gray-700 mb-1 text-sm">Lastname</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                placeholder={userData?.userFn}
                readOnly
              />
              <div className="absolute -left-6 top-1 text-purple-500">
                {/* <MdVerified /> */}
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-4 relative">
              <label className="block text-gray-700 mb-1 text-sm">Email</label>
              <div className="flex items-center">
                <AiOutlineMail className="text-gray-600 mr-2" />
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  placeholder={userData?.userEmail}
                  readOnly
                />
              </div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 relative">
              <label className="block text-gray-700 mb-1 text-sm">Mobile Number</label>
              <div className="flex items-center">
                <MdPhone className="text-gray-600 mr-2" />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                  placeholder={userData?.userPhone}
                  readOnly
                />
              </div>
            </div>
            <div className="border-l-4 border-red-500 pl-4 relative">
              <label className="block text-gray-700 mb-1 text-sm">Location</label>
              <div className="flex items-center space-x-2">
                <MdLocationOn className="text-red-500" />
                <span>{userData?.Country || "Philippines"}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};


const EditProfile = ({onClose}) => {
  
  const {
    firstname,
    lastname,
    email,
    phonNum,
    setFirstname,
    setLastname,
    setEmail,
    setPhoneNum,
    handleSumitNewProfileInfo,
    handleFileUpload,
  } = useContext(ProfileContext)


  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-xl relative">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6">
        Edit Profile
      </h2>
      <div>
        <input 
          type='file'  
          onChange={handleFileUpload}
          ></input>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Firstname</label>
          <input
            type="text"
            value={firstname}
            onChange={(e)=>setFirstname(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your first name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Lastname</label>
          <input
            type="text"
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your last name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email address"
          />
        </div>
         <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            value={phonNum}
            onChange={(e)=>setPhoneNum(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email address"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
          <button
           
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
           onClick={handleSumitNewProfileInfo}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

 


export default Profile;
