import React, { useContext, useState } from 'react';
import { Card } from '../../../../molecules/Card';
import RideSyncImage from '../../../../../assets/RideSync.png';
import { TextInput } from '../../../../atoms/TextInput';
import { Button } from '../../../../atoms/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Alert from '@mui/material/Alert';
import { Loading } from '../../../../molecules/Loading'; // Import loading component
import { LoginDriverContext } from '../../../../../context/DriverContext/Auth/LoginContext';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Components = () => {
    const navigate = useNavigate();
    const handleSignUp = () => {
        navigate('/driver/register');
    };

    const { loginUser, loginInfo, setLogInInfo, isError, errorMsg, loading } = useContext(LoginDriverContext);
    const [showPassword, setShowPassword] = useState(false);
    


    return (
        <div className='flex justify-center mt-5 pt-10 '>
            <Card className="flex flex-col md:flex-row w-full max-w-[95%] md:max-w-[900px] h-[auto] md:h-[600px] pt-[50px] rounded overflow-hidden animate-fadeIn">
                <div className='p-3 w-full md:w-[70%] md:ml-5'>
                    {isError &&
                        <Alert variant="filled" severity="error">
                            {errorMsg}
                        </Alert>
                    }
                    <div>
                        <h1 className='font-bold text-[30px] mt-5'>Login</h1>
                    </div>
                    <div>
                        <h1 className='pt-5 pb-5'>Welcome to RideSync! Please login to your account!</h1>
                    </div>
                    <div className='flex flex-col gap-9 mt-[20px] '>
                        <TextInput
                            label="Email*"
                            variant="outlined"
                            size="small"
                            value={loginInfo.userEmail}
                            onChange={(e) => setLogInInfo({ ...loginInfo, userEmail: e.target.value })}
                        />
                        <div className='relative'>
                        <TextInput
                            label="Password*"
                            variant="outlined"
                            size="small"
                            type={showPassword ? "text" : "password"}
                            value={loginInfo.userPassword}
                            onChange={(e) => setLogInInfo({ ...loginInfo, userPassword: e.target.value })}
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                            <AiOutlineEye size={20} className="text-gray-500" />
                            ) : (
                            <AiOutlineEyeInvisible size={20} className="text-gray-500" />
                            )}
                        </div>
                        </div>
                    </div>
                    <div className='pt-5 w-full'>
                        {loading ? ( // Show loading spinner while logging in
                            <Loading />
                        ) : (
                            <Button name="Sign in" variant="contained" size="large" onClick={loginUser} />
                        )}
                    </div>
                    <div className='mt-[20px]'>
                        <p>Don't have an account? <span className='underline text-colorBlue cursor-pointer' onClick={handleSignUp}>Sign Up</span></p>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='w-full flex items-center justify-center'>
                        <img src={RideSyncImage} alt="RideSync Logo" className="w-full max-w-[200px] md:max-w-[400px] h-auto object-contain" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Components;
