import React, { useContext, useState } from 'react';
import { RequestContext } from '../../../../context/DriverContext/Request/Request';

const Payment = ({ setPaymentModal, handlePayment,routeRequest }) => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);



    const handleConfirmPayment = () => {
        handlePayment()
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setIsConfirmModalOpen(false);
        setPaymentModal(false)
        window.location.reload()
    };

    return (
        <>
            <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-8 rounded-xl shadow-2xl max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Payment Details
                </h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Confirm your payment for the ride and enjoy your journey!
                </p>

                {/* Ride Summary */}
                <div className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Ride Summary</h3>
                    <ul className="text-sm text-gray-700 space-y-3">
                        <li className="flex justify-between">
                            <span className="font-medium">Pickup:</span> <span>{routeRequest[0]?.startLocation.slice(0, 40)}...</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Destination:</span> <span>{routeRequest[0]?.endLocation.slice(0, 40)}...</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Distance:</span> <span>{routeRequest[0]?.distance} km</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">ETA:</span> <span>{routeRequest[0]?.estimatedDuration} mins</span>
                        </li>
                    </ul>
                </div>

                {/* Payment Summary */}
                <div className="mb-6 border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Payment Summary</h3>
                    <ul className="text-sm text-gray-700 space-y-3">
                        <li className="flex justify-between">
                            <span className="font-medium">Fare:</span> <span>₱{routeRequest[0]?.totalAmount}</span>
                        </li>
                        {/* <li className="flex justify-between">
                            <span className="font-medium">Distance :</span> <span>₱12</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="font-medium">Flagdown:</span> <span>₱5.00</span>
                        </li> */}
                        <li className="flex justify-between text-lg font-bold text-gray-900">
                            <span>Total:</span> <span className="text-green-500">₱{routeRequest[0]?.totalAmount}</span>
                        </li>
                    </ul>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Payment Method</h3>
                    <div className="flex items-center gap-3">
                        <button
                            className={`flex-1 py-2 px-4 rounded-lg shadow-md transition duration-300 
                ${selectedPayment === 'credit' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-600'}`}
                            onClick={() => setSelectedPayment('credit')}
                        >
                            Credit Card
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 rounded-lg shadow-md transition duration-300 
                ${selectedPayment === 'paypal' ? 'bg-gray-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => setSelectedPayment('paypal')}
                        >
                            PayPal
                        </button>
                        <button
                            className={`flex-1 py-2 px-4 rounded-lg shadow-md transition duration-300 
                ${selectedPayment === 'cash' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            onClick={() => setSelectedPayment('cash')}
                        >
                            Cash
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="text-gray-500 hover:text-gray-700 underline"
                        onClick={() => setPaymentModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition duration-300"
                        onClick={handleConfirmPayment}
                        disabled={!selectedPayment}
                    >
                        Confirm Payment
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Payment Confirmed!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for your payment via{' '}
                            <span className="font-semibold text-blue-500">
                                {selectedPayment.charAt(0).toUpperCase() + selectedPayment.slice(1)}
                            </span>.

                        </p>
                        <button
                            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
                            onClick={closeConfirmModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Payment;
