import { Card } from '@mui/material';
import React, { useContext, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RequestRide from '../../../../assets/RequestRide.png';
import ViewRides from '../../../../assets/ViewRides.png';
import BookRide from '../../../../assets/BookRide.png';
import Message from '../../../../assets/Message.png';
import Profile from '../../../../assets/Profile.png';
import Logout from '../../../../assets/Logout.png';
import { useNavigate } from 'react-router-dom';
import { LoginDriverContext } from '../../../../context/DriverContext/Auth/LoginContext';

const Components = ({ active }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const handleOutsideClick = () => setIsSidebarOpen(false);

    const { logoutUser } = useContext(LoginDriverContext)

    const navigate = useNavigate();
    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div className="relative h-screen">
            {/* Sidebar Toggle Icon */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 rounded-full text-white"
            >
                <MenuIcon />
            </button>

            {/* Backdrop overlay for closing sidebar on outside click */}
            {isSidebarOpen && (
                <div
                    onClick={handleOutsideClick}
                    className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" // Backdrop behind sidebar
                ></div>
            )}

            {/* Sidebar */}
            <Card
                className={`w-[240px] pl-2 pr-2 flex flex-col fixed lg:static bg-white lg:translate-x-0 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                    } z-50 h-screen`} // Sidebar with high z-index

            >
                {/* Close Button inside Sidebar */}
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden absolute top-4 right-4 text-black"
                >
                    <CloseIcon />
                </button>

                <div>
                    <h1 className="p-3 flex justify-center text-colorBlue font-bold text-[30px] rounded-2xl">RideSync</h1>
                </div>

                <div className="flex-grow flex flex-col overflow-y-auto">
                    <div className="flex justify-center mt-[100px] mb-[20px]">
                        <h1 className="text-sidebarTxtOff font-bold">MAIN MENU</h1>
                    </div>

                    {[{ name: 'Request', icon: RequestRide, key: 'request', route: '/driver/requestContents' },
                    { name: 'View Rides', icon: BookRide, key: 'viewrides', route: '/driver/viewRidesContents' },
                    { name: 'Message', icon: Message, key: 'message', route: '/driver/messageContents' },
                    { name: 'Profile', icon: Profile, key: 'profile', route: '/driver/profileContents' }
                    ].map(({ name, icon, key, route }) => (
                        <div
                            key={key}
                            onClick={() => handleNavigation(route)}
                             className={`flex gap-5 p-3 mb-2 rounded-xl cursor-pointer w-[95%]  
                ${active === key ? 'bg-[#00a6ce] border shadow-2xl font-bold' : 'hover:bg-sidebarBg hover:shadow-2xl'} 
                transition-all duration-300 transform hover:scale-105`}


                        >
                            <img
                                src={icon}
                                className="w-[25px] h-[25px] transition-transform duration-300"
                                alt={`${name} icon`}
                            />
                            <h1 className={`text-sidebarTxtOff ${active === key ? 'text-white' : 'group-hover:text-white'} font-semibold hover:font-bold hover:text-black`}>
                                {name}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className={`flex gap-5 p-3 mb-2 rounded-xl cursor-pointer 
            ${active === 'logout' ? 'bg-sidebarBg shadow-2xl font-bold' : 'hover:bg-sidebarBg hover:shadow-2xl'} 
            transition-all duration-300 transform hover:scale-105 mt-auto`}
                    onClick={logoutUser}
                >
                    <img src={Logout} className="w-[25px] h-[25px]" alt="Logout icon" />
                    <h1 className={`text-sidebarTxtOff hover:font-bold hover:text-black ${active === 'logout' ? 'text-black' : 'group-hover:text-black'} font-semibold`}>
                        Logout
                    </h1>
                </div>
            </Card>
        </div>
    );
};

export default Components;