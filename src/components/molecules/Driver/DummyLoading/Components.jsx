import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../../molecules/Driver/Sidebar'
import { UserHeader } from '../../../molecules/Driver/UserHeader'
import { Loading } from '../../../molecules/Loading';
import { useNavigate, useLocation } from 'react-router-dom';

const Components = () => {

    const location = useLocation();
    const navigate = useNavigate();
        // Extract query parameters
        const searchParams = new URLSearchParams(location.search);
        const route = searchParams.get('route');
        const active = searchParams.get('active');
    
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
                navigate(route); // Navigate after loading is false
            }, 3000);
    
            return () => clearTimeout(timer);
        }, [navigate, route]);

    return (
        <div className='flex h-full'>
            <div className='max-h-screen  sticky top-0 z-50'>
                <Sidebar active={active}/>
            </div>
            <div className='w-full '>
                {/* <UserHeader /> */}
                <div>
                {loading && <Loading />}
                </div>

            </div>
        </div>
    )
}

export default Components
