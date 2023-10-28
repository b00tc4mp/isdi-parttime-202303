"use client";

import { useRouter } from 'next/navigation'

const HomeButtons = () => {

    const router = useRouter();
    

    return (
        <div className="max-w-[1440px] w-full update-home-container flex flex-col">
            <div className=''>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 justify-center justify-items-center p-9'>
                <button className='home-button' onClick={() => router.push('/updates/new')}>New Update</button>
                <button className='home-button' onClick={() => router.push('/events/new')}>New Event</button>
                <button className='home-button' onClick={() => router.push('/music/new')}>New Song</button>
                <button className='home-button' onClick={() => router.push('/contact')}>Read Messages</button>
            </div>
            </div>
            
        </div>
    )
}

export default HomeButtons;