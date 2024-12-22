import React, { useContext, useState } from 'react'
import { Card } from '../../../../molecules/Card'
import Driver from '../../../../../assets/driver3.jpg';
import { TextInput } from '../../../../atoms/TextInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import AdditionalDetails from './AdditionalDetails';


const Components = () => {

    const navigate = useNavigate();
    const handleSignin = () => {
        navigate('/driver/login');
    };
    const {
        firstname,
        lastname,
        email,
        phone,
        age,
        gender,
        demographStat,
        password,
        confirmPassword,
        showPassword,
        showConfirmPassword,
        errors,
        handleFirstname,
        handleLastname,
        handleEmail,
        handlePhone,
        handleAge,
        handleGender,
        handleCountry,
        handleDemoStat,
        handlePassword,
        handleConfirmPassword,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        handleMouseDownConfPassword,
        handleMouseUpConfPassword,
        handleRegister,
        setAdditionalDetails,
        additionalDetails
    } = useContext(RegisterContext);

  
   
    const handleNextAdditionalDetails = ()=>{
        setAdditionalDetails(true)
    }



    return (
        <div className='flex justify-center mt-16'>
            {
                !additionalDetails ? 
                <Card className="flex flex-col md:flex-row w-full max-w-[95%] md:max-w-[70%] rounded overflow-hidden animate-fadeIn">
                <div className='w-full md:w-[60%] p-5'>
                    <h1 className='p-3 text-lg md:text-2xl font-bold'>Become Driver Now</h1>
                    <h2 className='text-textPI font-semibold p-3 text-sm md:text-lg'>Personal Information</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
                        <TextInput
                            label="Firstname*"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            value={firstname}
                            onChange={handleFirstname}
                            isError={!!errors.firstname}
                            errorText={errors.firstname}
                        />
                        <TextInput
                            label="Lastname*"
                            variant="outlined"
                            size="small"
                            value={lastname}
                            onChange={handleLastname}
                            isError={!!errors.lastname}
                            errorText={errors.lastname}
                        />   <TextInput
                            label="Email*"
                            variant="outlined"
                            size="small"
                            value={email}
                            onChange={handleEmail}
                            isError={!!errors.email}
                            errorText={errors.email}
                        />
                        <TextInput
                            label="Phone Number*"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={phone}
                            onChange={handlePhone}
                            isError={!!errors.phone}
                            errorText={errors.phone}
                        />
                        <TextInput
                            label="Age"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={age}
                            onChange={handleAge}
                            isError={!!errors.age}
                            errorText={errors.age}
                        />

                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={gender}
                                onChange={handleGender}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                            {!!errors.gender && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.gender}</FormHelperText>}
                        </FormControl>

                        {/* <FormControl>
                            <SelectCountries handleCountry={handleCountry} />
                            {!!errors.country && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.country}</FormHelperText>}
                        </FormControl> */}

                        <FormControl size='small' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={password}
                                onChange={handlePassword}
                            />
                            {!!errors.password && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.password}</FormHelperText>}
                        </FormControl>


                        <FormControl size='small' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password*</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showConfirmPassword ? 'hide the password' : 'display the password'}
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfPassword}
                                            onMouseUp={handleMouseUpConfPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                            />
                            {!!errors.confirmPassword && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.confirmPassword}</FormHelperText>}
                        </FormControl>
                    </div>
              

                    <div className='pl-3'>
                        <Button name="Next" variant="contained" size="large" onClick={handleNextAdditionalDetails} />
                    </div>
                    <div className='pl-3 mt-3 mb-12'>
                        <p className='text-termsText text-xs md:text-sm'>Already have an account? <span className='text-colorBlue ml-1 cursor-pointer underline' onClick={handleSignin}>Login</span></p>
                    </div>
                </div>

                <div className='w-full md:w-[40%] flex items-center justify-center p-'>
                    <img src={Driver} alt="RideSync Logo" className="w-full max-w-[200px] md:max-w-[400px] h-auto object-contain" />
                </div>

            </Card>
            :
            <AdditionalDetails/>
            }
           
        </div>
    )
}

export default Components