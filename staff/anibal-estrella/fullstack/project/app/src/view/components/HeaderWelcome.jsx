import React, { useState } from 'react';
import { Button } from '../library'
import { Link } from 'react-router-dom';


function HeaderWelcome({ handleClick }) {

    return (
        <div className="grid p-4 grid-cols-2 gap-x-20 h-[calc(100vh_-_6rem)]">
            {/* <div className="grid p-4 grid-cols-2 gap-x-20 h-screen"> */}
            <div className='flex flex-col justify-end '>

                <h2 className='  '>
                    Review events and keep them forever
                </h2>
                <p>
                    Step into a dynamic hub pulsating with the energy of live concerts and events, where every beat is a thread connecting individuals from all walks of life. Here, vibrant communities converge to share their passion for music and create unforgettable memories. Join us in this lively space, where the thrill of live entertainment ignites a sense of belonging and camaraderie like no other.
                </p>
                <Link to="/create">
                    <Button className={'max-w-fit'} >let's go</Button>
                </Link>

            </div>
            <div className='overflow-hidden rounded-lg w-full h-full'>
                <img src="https://picsum.photos/1500?random=2" alt="" className='object-cover h-full w-full' />
            </div>
        </div>
    );
}

export default HeaderWelcome;
