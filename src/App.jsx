import './App.css'
import { PassengerRoutes } from './navigators/PassengerRoutes'
import { DriverRoutes } from './navigators/DriverRoutes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing } from './components/templates/Landing';
import { RideSharing } from './components/templates/Our-services/Ride-sharing';
import {CarPooling} from './components/templates/Our-services/Car-pooling';
import {AboutUs} from './components/templates/About-us'




function App() {


  return (

    <BrowserRouter>
  
      <Routes>

        <Route path='/' element={<Landing /> } />
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/our-services/ride-sharing' element={<RideSharing/>} />
        <Route path='/our-services/car-pooling' element={<CarPooling/>}/>
        
        {/* Define Passenger Routes */}
        <Route path="/passenger/*" element={<PassengerRoutes />} />

        {/* Define Driver Routes */}
        <Route path="/driver/*" element={<DriverRoutes />} />

        {/* Catch-all for Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>


    </BrowserRouter>

  )
}

export default App