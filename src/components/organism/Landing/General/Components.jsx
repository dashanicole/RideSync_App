import { Button } from '../../../atoms/Button';
import RideSyncImage from '../../../../assets/RideSync.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Components = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/passenger/*");
    };

    const handleSignUp = () => {
        navigate("/passenger/register");
    };

    return (
        <section className="py-5 flex-col items-center md:flex-row flex lg:h-lvh lg:justify-center lg:items-center flex-wrap">
            <div className="md:w-3/5 flex justify-center">
                <div>
                    <h1 className="pb-5 text-5xl text-start lg:text-6xl font-bold lg:text-center lg:px-40 animate-slideInFromLeft overflow-hidden">
                        Seamlessly Connect for Every Journey
                    </h1>
                    <div className="flex justify-center py-8 gap-5">
                        <Button
                            name="Login"
                            variant="contained"
                            size="large"
                            onClick={handleLogin}
                        />
                        <Button
                            name="Sign Up"
                            variant="contained"
                            size="large"
                            bgColor="white"
                            fontColor="black"
                            onClick={handleSignUp}
                        />
                    </div>
                </div>
            </div>

            {/* Right Section with Slide-In-From-Right Animation */}
            <div className="md:w-2/5 animate-slideInFromRight">
                <div className="w-full">
                    <img
                        src={RideSyncImage}
                        alt="Picture of a car"
                        className="w-64 md:w-full aspect-square"
                    />
                </div>
            </div>
        </section>
    );
};

export default Components;
