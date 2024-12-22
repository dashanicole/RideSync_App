import React, { useContext, useState } from 'react'

import RideSyncImage from '../../../../../assets/RideSync.png';
import { TextInput } from '../../../../atoms/TextInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Card } from '../../../../molecules/Card'
import { DemoStat, SelectCountries } from '../../../../atoms/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Checkbox } from '../../../../atoms/Checkbox';
import { Button } from '../../../../atoms/Button';
import { RegisterContext } from '../../../../../context/DriverContext/Auth/RegisterContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import { SelectTrip as TypeOfRide } from '../../../../atoms/Select';


const AdditionalDetails = () => {

    const navigate = useNavigate();
    const handleSignin = () => {
        navigate('/driver/login');
    };
    const handelGoBack =()=>{
        setAdditionalDetails(false)
    }
    const {

        handleRegister,
        setAdditionalDetails,
        carType,
        manufacturerName,
        modelName, 
        modelYear, 
        vehiclePlateNum, 
        vehicleNumSets, 
        vehicleColor,
        typeRide,

        handlCarType,
        handlManufacturerNamee,
        handlModelName,
        handlModelYear,
        handlVehiclePlateNum,
        handlVehicleNumSets,
        handlVehicleColor,
        handlTypeRide,
        
    } = useContext(RegisterContext);

    
    const handleRegisterDriver = () => {
        handleRegister()
      //  nav('/driver/requestContents')
    }

  return (
    
            <Card className="mt-3 md:p-8 flex flex-col md:flex-row w-full max-w-[95%] md:max-w-[70%] rounded overflow-hidden animate-fadeIn">
                <div className='w-full md:w-[60%] p-5'> 
                    <Button name="Go back"  size="small" onClick={handelGoBack} />
                    {/* <h1 className='text-lg md:text-2xl font-bold'>Become Driver Now</h1> */}
                    <h2 className='text-textPI font-semibold p-3 text-sm md:text-lg'>Vehicle Information</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                        <TextInput
                            label="Type*"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            value={carType}
                            onChange={handlCarType}
                             
                        />
                        <TextInput
                            label="Manufacturer Name*"
                            variant="outlined"
                            size="small"
                            value={manufacturerName}
                            onChange={handlManufacturerNamee}
                            
                        />   <TextInput
                            label="Model Name*"
                            variant="outlined"
                            size="small"
                            value={modelName}
                            onChange={handlModelName}
                           
                        />
                        <TextInput
                            label="Model Year*"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={modelYear}
                            onChange={handlModelYear}
                            
                        />
                           <TextInput
                            label="Vehicle Plate No.*"
                            variant="outlined"
                            size="small"
                            value={vehiclePlateNum}
                            onChange={handlVehiclePlateNum}
                        />
                          <TextInput
                            label="Vehicle No. Sets*"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={vehicleNumSets}
                            onChange={handlVehicleNumSets}
                             
                        />

                         <TextInput
                            label="Vehicle Color*"
                            variant="outlined"
                            size="small"
                            value={vehicleColor}
                            onChange={handlVehicleColor}
                            
                        />
                           <TypeOfRide
                            label="Type Ride"
                            value={typeRide}
                            onChange={handlTypeRide}
                            options={[
                                { value: 'rideSharing', label: 'Ride Sharing' },
                                { value: 'carpool', label: 'Carpool' },
                            ]}
                            sx={{ minWidth: 120, backgroundColor: 'white' }}
                        />
                         

              
                

                    </div>
                    {/* <div className='m-3'>
                        <div className='flex items-center text-termsText text-[10px] md:text-[14px]'>
                            <Checkbox />
                            <span>I have read, understand, and agree to the</span>
                            <span className='text-colorBlue ml-1 cursor-pointer'>Agreement.</span>
                        </div>
                        <div className='flex items-center text-termsText text-[10px] md:text-[12px]'>
                            <Checkbox />
                            <span>I have read, understand, and agree to the</span>
                            <span className='text-colorBlue cursor-pointer'>Privacy Policy</span> and the
                            <span className='text-colorBlue cursor-pointer'>Terms of Service</span>.
                        </div>
                    </div> */}

                    <div className='pl-3'>
                        <Button name="Create Account" variant="contained" size="large"  onClick={handleRegisterDriver}/>
                    </div>
                    <div className='pl-3 mt-5'>
                        <p className='text-termsText text-xs md:text-sm'>Already have an account? <span className='text-colorBlue ml-1 cursor-pointer underline' onClick={handleSignin}>Login</span></p>
                    </div>
                </div>

                <div className='w-full md:w-[40%] flex items-center justify-center p-'>
                    <img src={RideSyncImage} alt="RideSync Logo" className="w-full max-w-[200px] md:max-w-[400px] h-auto object-contain" />
                </div>
            </Card>
  
  )
}

export default AdditionalDetails