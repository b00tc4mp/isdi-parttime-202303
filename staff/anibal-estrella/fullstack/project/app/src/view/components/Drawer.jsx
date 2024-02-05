import React, { useState } from 'react';

import { Link, Navigate, useLocation } from 'react-router-dom';
import { SearchArtistList as SearchArtist, SearchPlace } from './'
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';

function Drawer({ openDrawer, isDrawerOpen }) {
    const location = useLocation();
    const [reloadKey, setReloadKey] = useState(0)


    const handleClose = () => {
        openDrawer()
        setReloadKey((prevKey) => prevKey + 1)

    }

    return (
        <div className={`fixed  bottom-0 w-full bg-gray-300 z-40 rounded-t-xl duration-300 transition-all ease-in-out ${isDrawerOpen ? "h-1/2" : " h-0"} `}>
            <div className="p-4 grid grid-cols-2  h-full ">
                <h2 className=" font-bold mb-4 text-xs text-gray-200 ">Bottom Drawer Content</h2>
                <button className=" text-gray-200 text-xs self-start place-self-end" onClick={handleClose}>Close</button>
                <div className='w-full overflow-auto col-span-2   text-center'>

                    <div className=' mx-auto w-3/4 '>
                        {location.pathname === '/create' ?
                            <>
                                <SearchPlace key={`${reloadKey}-place`} />
                                <SearchArtist key={`${reloadKey}-artist`} />
                            </>
                            : ''}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Drawer;
