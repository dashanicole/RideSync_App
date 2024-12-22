import React, { useContext } from 'react'
import { Card } from '../../../molecules/Card'
import Profile from './Profile'
import Password from './Password'
import Address from './Address'
import { ProfileContext } from '../../../../context/PassengerContext/Profile/ProfileContext'

const Components = () => {

    const { openProfileSettings, handleAccountSettings } = useContext(ProfileContext)


    return (
        <div className="flex space-x-6 p-6">
            {/* Left Sidebar */}
            <Card className="w-1/4 h-[200px] bg-white shadow-lg rounded-lg">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:shadow-md relative transition-colors cursor-pointer p-2 rounded-md group"
                            onClick={() => handleAccountSettings('profileSettings')}
                        >
                            <span className="material-icons text-lg mr-2">Profile Settings</span>
                            <div className="absolute top-0 right-0 h-full w-[5px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                        </li>
                        <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:shadow-md relative transition-colors cursor-pointer p-2 rounded-md group"
                            onClick={() => handleAccountSettings('password')}

                        >
                            <span className="material-icons text-lg mr-2">Password</span>
                            <div className="absolute top-0 right-0 h-full w-[5px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                        </li>
                        {/* <li className="flex items-center text-gray-600 hover:bg-gray-100 hover:shadow-md relative transition-colors cursor-pointer p-2 rounded-md group"
                            onClick={() => handleAccountSettings('address')}

                        >
                            <span className="material-icons text-lg mr-2">Address</span>
                            <div className="absolute top-0 right-0 h-full w-[5px] bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                        </li> */}
                    </ul>
                </div>
            </Card>


            {/* Profile Form */}
            <Card className="flex-1  w-full h-screen  rounded-lg p-6">
                {
                    (openProfileSettings == 'profileSettings') ?
                        <Profile /> :
                        (openProfileSettings == 'password') ?
                            <Password /> :
                            <Address />
                }

            </Card>
        </div>


    )
}

export default Components