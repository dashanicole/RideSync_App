import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../../molecules/Passenger/SIdebar'
import { UserHeader } from '../../../molecules/Carpool/UserHeader'
import { Loading } from '../../../molecules/Loading';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
 

const Components = ({route}) => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            navigate('/passenger/bookCarpoolContents'); // Navigate after loading is false
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);


    return (
        <div className='flex h-full'>
            <div className='max-h-screen  sticky top-0 z-50'>
                <Sidebar active="home" />
            </div>
            <div className='w-full '>
                <UserHeader />
                <div>
                {loading && <Loading />}
                </div>

            </div>
        </div>
    )
}

export default Components
