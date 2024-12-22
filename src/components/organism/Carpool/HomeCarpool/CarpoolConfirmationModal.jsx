import React from "react";

const CarpoolConfirmationModal = ({ isOpen, onClose, onConfirm, rideDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md">
        {/* Modal Header */}
        <div className="text-center border-b pb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">Ride Confirmation</h2>
          <p className="text-sm text-gray-500 mt-1">Double-check your ride details before confirming.</p>
        </div>

        {/* Receipt Body */}
        <div className="mt-6 space-y-5 text-gray-700">
          {[
            { label: "Pickup Location", value: rideDetails.pickupLocation },
            { label: "Dropoff Location", value: rideDetails.dropoffLocation },
            { label: "Travel Date", value: rideDetails.travelDate },
            { label: "Seats Reserved", value: rideDetails.numSeats },
            { label: "Price per Person", value: `₱${rideDetails.pricePerPerson.toLocaleString()}` },
            { label: "Vehicle", value: rideDetails.vehicle },
            { label: "Payment Method", value: rideDetails.paymentMethod },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b last:border-none pb-3 last:pb-0"
            >
              <span className="font-medium">{item.label}</span>
              <span className="font-light">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Divider Line */}
        <hr className="my-6 border-gray-200" />

        {/* Total Section */}
        <div className="flex justify-between items-center font-bold text-gray-800 text-lg">
          <span>Total</span>
          <span>
            ₱
            {(rideDetails.numSeats * rideDetails.pricePerPerson).toLocaleString()}
          </span>
        </div>

        {/* Disclaimer */}
     

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarpoolConfirmationModal;
