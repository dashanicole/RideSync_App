import { useState } from "react";

const WarningModal = ({setWarning,message}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isClosing, setIsClosing] = useState(false);
  
    const handleOpen = () => {
      setIsOpen(true);
      setIsClosing(false);
    };
  
    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);  
        setWarning(false)
      }, 200); 
    };
  
    return (
        <div className="flex items-center justify-center">
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600  bg-opacity-50">
            <div
              className={`relative bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-xl border-t-4 border-red-500 transform transition-transform 
                duration-300 ease-in-out ${
                  isClosing ? "animate-dropOut" : "animate-dropIn"
                }`}
            >
              {/* Vehicle Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 13.5V11a4 4 0 014-4h10a4 4 0 014 4v2.5M16 16.5h.01M8 16.5h.01M4 16.5h16m-9 3v-1m2 0v1"
                    />
                  </svg>
                </div>
              </div>
      
              {/* Title and Message */}
              <h2 className="text-xl font-extrabold text-red-600 text-center mb-4">
                 Warning
              </h2>
              <p className="text-gray-700 text-center">
                {message ||
                  "Are you sure you want to join this carpool? You will be charged for this trip."}
              </p>
      
              {/* Action Buttons */}
              <div className="mt-6 flex justify-center">
               
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    );
  };

 export default WarningModal 