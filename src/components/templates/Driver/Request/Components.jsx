import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../../molecules/Driver/Sidebar'
import { UserHeader } from '../../../molecules/Driver/UserHeader'
import { Loading } from '../../../molecules/Loading';
import { RequestContents } from '../../../organism/Driver/RequestContents'


const Components = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className='flex h-full'>
            <div className='max-h-screen sticky top-0 z-50'>
                <Sidebar active="request" />
            </div>
            <div className='w-full '>
                <UserHeader />
                <div>
                    {loading ? <Loading /> : <RequestContents />}
                </div>

            </div>
        </div>
    )
}

export default Components
