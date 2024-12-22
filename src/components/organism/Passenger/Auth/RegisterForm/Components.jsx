import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../../../../molecules/Card';
import { TextInput } from '../../../../atoms/TextInput';
import { Checkbox } from '../../../../atoms/Checkbox';
import { Button } from '../../../../atoms/Button';
import RideSyncImage from '../../../../../assets/RideSync.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { RegisterContext } from '../../../../../context/PassengerContext/Auth/RegisterContext';
import { DemoStat, SelectCountries } from '../../../../atoms/Select';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Components = () => {
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
  } = useContext(RegisterContext);

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/passenger/login');
  };




  return (
    <div className='flex justify-center mt-[50px]'>
      <Card className="flex md:p-5 flex-col md:flex-row w-full max-w-[95%] md:max-w-[70%] rounded overflow-hidden animate-fadeIn">
        {/* Form Section */}
        <div className='w-full md:w-[60%] p-5'>
          <h1 className='p-5 text-lg md:text-2xl font-bold'>Sign Up Now</h1>
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
            />
            <TextInput
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
            {/* <FormControl>
                <DemoStat demographStat={demographStat} handleDemoStat={handleDemoStat} />
              {!!errors.demographStat && <FormHelperText style={{ color: '#DB2F2F' }}>{errors.demographStat}</FormHelperText>} 
            </FormControl>  */}

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
            <Button name="Sign in" variant="contained" size="large" onClick={handleRegister} />
          </div>
          <div className='pl-3 mb-10 mt-5'>
            <p className='text-termsText text-xs md:text-sm'>Already have an account? <span className='text-colorBlue ml-1 cursor-pointer underline' onClick={handleSignin}>Login</span></p>
          </div>
        </div>
        {/* Image Section */}
        <div className='w-full md:w-[40%] flex items-center justify-center p-'>
          <img src={RideSyncImage} alt="RideSync Logo" className="w-full max-w-[200px] md:max-w-[400px] h-auto object-contain" />
        </div>
      </Card>
    </div>
  );
};

export default Components;
