const Address = () => {

    return (
        //
        <div className={` p-6 bg-white rounded-xl max-w-lg mx-auto  animate-fadeIn`}>
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Address</h2>


            {/* Street Address */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your street address"
                />
            </div>

            {/* City */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your city"
                />
            </div>

            {/* State */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your state"
                />
            </div>

            {/* Postal Code */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code
                </label>
                <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your postal code"
                />
            </div>

            {/* Country */}
            <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                </label>
                <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Select your country</option>
                    <option value="Philippines">Philippines</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                </select>
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    Update Address
                </button>
            </div>

        </div>

    )
}

export default Address