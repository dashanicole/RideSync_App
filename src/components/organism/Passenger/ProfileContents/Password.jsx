 import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../../context/PassengerContext/Profile/ProfileContext";
import { BASEURL, postRequest } from "../../../../utils/Service";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { WarningModal } from "../../../atoms/WarningModal";
import { BookingConfirmedModal as ConfirmUpdteModal } from "../../../atoms/ConfirmedModal";


const Password = () => {
    const { userData, userInfo } = useContext(ProfileContext);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false); // Toggle for current password visibility
    const [showNewPassword, setShowNewPassword] = useState(false); // Toggle for new password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

    const [warning,setWarning] = useState(false)
    const [warningMessage,setWarningMessage] = useState("")
    const [confirmModal,setConfirmModal] = useState(false)

 

    const handleUpdatePassword = async () => {
        if ( !newPassword || !confirmPassword) {
            setWarning(true)
            setConfirmModal(false)
            setWarningMessage("Please fill in all required fields!")
            return;
        }
        if (newPassword !== confirmPassword) {
            setWarning(true)
            setConfirmModal(false)
            setWarningMessage("New password and confirm password do not match!")
            return;
        }
        try {
            const response = await postRequest(`${BASEURL}/updatePasword`, 
                JSON.stringify({ userId: userInfo?.id, currentPassword, newPassword, hashedPassword: userData?.userPassword }));

            console.log("Response:", response.status);
            if (response.status) {
                setWarning(false)
                setWarningMessage(response.message)
                setConfirmModal(true)
                setCurrentPassword("")
                setNewPassword("")
                setConfirmPassword("")

            } else {
                setWarningMessage(response.message)
                setWarning(true)
                setConfirmModal(false)
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <div className={`p-6 rounded-xl max-w-lg mx-auto mt-6 animate-fadeIn`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

            {/* Current Password */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                <div className="relative">
                    <input
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        type={showCurrentPassword ? "text" : "password"} // Toggle between text and password
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your current password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)} // Toggle visibility
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        {showCurrentPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                    </button>
                </div>
            </div>

            {/* New Password */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                <div className="relative">
                    <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type={showNewPassword ? "text" : "password"} // Toggle between text and password
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)} // Toggle visibility
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                <div className="relative">
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Re-enter your new password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
                    </button>
                </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    onClick={handleUpdatePassword}
                >
                    Update Password
                </button>
            </div>
        
            {
                warning && <WarningModal setWarning={setWarning} message={warningMessage}/>
            }
            {
                confirmModal && 
                <ConfirmUpdteModal 
                 setIsBooking={setConfirmModal} 
                 title="Password Update Successful"
                 message="Your password has been updated successfully."
                 />
            }

        </div>
    );
};

export default Password;
