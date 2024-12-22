import React, { useEffect, useState } from 'react'
import { UserHeader } from '../../../molecules/Passenger/UserHeader'
import { BookRideContents } from '../../../organism/Passenger/BookRideContents'
import { Sidebar } from '../../../molecules/Passenger/SIdebar'
import { Loading } from '../../../molecules/Loading'


const Components = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='flex h-full '>
            <div className='h-screen sticky top-0 z-50'>
                <Sidebar active="bookRide" />
            </div>
            <div className='w-full '>
                {/* <UserHeader /> */}
                <div>
                    {loading ? <Loading /> : <BookRideContents />}

                </div>
            </div>
        </div>
    )
}

export default Components