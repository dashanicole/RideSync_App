import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../../molecules/Driver/Sidebar'
import { UserHeader } from '../../../molecules/Driver/UserHeader'
import { Loading } from '../../../molecules/Loading';
import { MessageContent } from '../../../organism/Driver/MessageContents';


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
            <div className='max-h-screen '>
                <Sidebar active="message" />
            </div>
            <div className='w-full '>
                <UserHeader />
                <div>
                    {loading ? <Loading /> : <MessageContent />}
                </div>

            </div>
        </div>
    )
}

export default Components
