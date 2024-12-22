import { useState } from "react";

const BookingConfirmedModal = ({setIsBooking,title,message,handleEvent}) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => {
        setIsBooking(false)
        setIsOpen(false)
        handleEvent()
    };
  
    return (
      <div>
        {/* Booking Confirmation Modal */}
        <div className="flex items-center justify-center">
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600  bg-opacity-50">
              <div
                className="relative bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out animate-dropIn"
              >
                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
  
                {/* Title and Message */}
                <h2 className="text-lg font-semibold text-green-600 text-center mb-4">
                  {title}
                </h2>
                <p className="text-gray-700 text-center">
                    {message}
                </p>
  
                {/* Action Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

 export default   BookingConfirmedModal;