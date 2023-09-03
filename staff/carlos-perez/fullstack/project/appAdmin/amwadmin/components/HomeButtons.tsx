"use client";

import { useRouter } from 'next/navigation'

const HomeButtons = () => {

    const router = useRouter();
    

    return (
        <div className="max-w-[1440px] w-full update-home-container flex flex-col">
            
            <div className='w-full flex flex-col justify-center justify-items-center'>
                <button className='home-button' onClick={() => router.push('/updates/new')}>New Update</button>
                <button className='home-button' onClick={() => router.push('/events')}>New Event</button>
                <button className='home-button' onClick={() => router.push('/music')}>New Song</button>
                <button className='home-button' onClick={() => router.push('/messages')}>Read Messages</button>
            </div>

            
        </div>
    )
}

export default HomeButtons;