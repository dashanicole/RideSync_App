import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Request } from '../../components/pages/Driver/Request';
import { Register } from '../../components/pages/Driver/Auth/Register';
import { NotFound } from '../../components/molecules/NotFound';
import { Login } from '../../components/pages/Driver/Auth/Login';
import { LoginDriverContextProvider } from '../../context/DriverContext/Auth/LoginContext';
import { ViewRides } from '../../components/pages/Driver/ViewRides';
import { Message } from '../../components/pages/Driver/Message';
import { HomeCarpool } from '../../components/pages/Carpool/HomeCarpool';
import { CreateRides } from '../../components/pages/Carpool/CreateRides';
import { ViewRideCarpool } from '../../components/pages/Carpool/ViewRideCarpool';
import { Profile } from '../../components/pages/Driver/Profile';
import { Message as CarpoolMessage } from '../../components/pages/Carpool/Message';
import { DummyLoading } from '../../components/molecules/Driver/DummyLoading';
import { CarpoolLoading } from '../../components/molecules/Carpool/DummyLoading';
import { Profile as CarpoolProfile } from '../../components/pages/Carpool/Profile';




const RootNavigators = () => {
    return (

        <LoginDriverContextProvider>
            <Routes>
                <Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/requestContents" element={<Request />} />
                    <Route path="/viewRidesContents" element={<ViewRides />} />
                    <Route path="/messageContents" element={<Message />} />
                     <Route path="/profileContents" element={<Profile />} />

                    {/* carpool */}
                    <Route path="/homeCarpool" element={<HomeCarpool />} />
                    <Route path="/createRide" element={<CreateRides />} />
                    <Route path="/carpoolViewRides" element={<ViewRideCarpool />} />
                    <Route path="/CarpoolMessage" element={<CarpoolMessage />} />
                    <Route path="/CarpoolProfile" element={<CarpoolProfile />} />

                    <Route path="/loading" element={<DummyLoading />} />
                    <Route path="/Carpoollooading" element={<CarpoolLoading />} />

                    

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </LoginDriverContextProvider>

    )
}
export default RootNavigators
