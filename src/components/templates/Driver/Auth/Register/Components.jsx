import React, { useEffect, useState } from 'react';
import { DriverRegisterForm } from '../../../../organism/Driver/Auth/RegisterForm';
import { Loading } from '../../../../molecules/Loading';
import { HomeHeader } from '../../../../molecules/HomeHeader';
const Components = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <>
            <HomeHeader isDriver={true} />
            {loading ? <Loading /> : <DriverRegisterForm />}

        </>
    )
}

export default Components
