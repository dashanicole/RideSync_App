import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Register } from '../../components/pages/Passenger/Auth/Register';
import { Login } from '../../components/pages/Passenger/Auth/Login';
import { Home } from '../../components/pages/Passenger/Home';
import { ViewRide } from '../../components/pages/Passenger/ViewRide';
import { BookRide } from '../../components/pages/Passenger/BookRide';
import { Message } from '../../components/pages/Passenger/Message';
import { Profile } from '../../components/pages/Passenger/Profile';
import { useLocation } from 'react-router-dom';

import { LoginContext, LoginContextProvider } from '../../context/PassengerContext/Auth/LoginContext';
import { LandingPage } from '../../components/pages/LandingPage';
import { PBookCarpool } from '../../components/pages/Carpool/PBookCarpool';
import { Loading } from '../../components/templates/Carpool/Loading';
import { DummyLoading } from '../../components/molecules/Passenger/DummyLoading';

const routes = [
 // { path: '/', element: <LandingPage />, isProtected: false },
  { path: '/register', element: <Register />, isProtected: false },
  { path: '/login', element: <Login />, isProtected: false },
  { path: '/homeContents', element: <Home />, isProtected: false },
  { path: '/viewRideContents', element: <ViewRide />, isProtected: false },
  { path: '/bookRideContents', element: <BookRide />, isProtected: false },
  { path: '/messageContents', element: <Message />, isProtected: false },
  { path: '/profileContents', element: <Profile />, isProtected: false },
  { path: '/bookCarpoolContents', element: <PBookCarpool />, isProtected: false },
  { path: '/bookCarpoolConfirmation', element: <Loading />, isProtected: false },
  { path: '/loading', element: <DummyLoading />, isProtected: false },

]


const RootNavigators = () => {
  return (
    <LoginContextProvider>
      <Routes>
        {routes.map(({ path, element, isProtected }) => (
          <Route
            key={path}
            path={path}
            element={isProtected ? <PrivateRoute>{element}</PrivateRoute> : element}
          />
        ))}
        <Route path="*" element={<Navigate to="/passenger/login" />} />
      </Routes>
    </LoginContextProvider>
  )
};

const PrivateRoute = ({ children }) => {
  const storedUserInfo = localStorage.getItem('User');
  const parsedUserInfo = JSON.parse(storedUserInfo);
  console.log("not login", parsedUserInfo?.userType);
  return storedUserInfo && parsedUserInfo?.userType == 'P' ? children : <Navigate to="/passenger/login" />;
};

export default RootNavigators;
