import React, { useEffect, useState } from 'react';

import { HomeHeader } from '../../../../molecules/HomeHeader'
import { Login } from '../../../../organism/Driver/Auth/LoginForm'
import { Loading } from '../../../../molecules/Loading';

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
            {loading ? <Loading /> : <Login />}

        </>
    )
}

export default Components
