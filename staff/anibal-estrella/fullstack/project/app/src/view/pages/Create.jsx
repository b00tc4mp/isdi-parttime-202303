import React, { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'


import { SearchArtistList as SearchArtist, SearchPlace } from '../components'
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Create = ({ city, ipGeoLocation, openDrawer, isDrawerOpen }) => {
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    return (<>

        <div className=' px-3'>
            {city && <p>Your City: {city} </p>}
            {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
        </div >
        <div className='px-3'>

            {error && <p className=" bg-lime-200">{error}</p>}

            <h1>Create Event Review</h1>

        </div>
        <section id="home" className=" px-3">

            <section id=''>
                <SearchArtist />
            </section>
            <section id=''>
                <SearchPlace />
            </section>
        </section>

    </>
    );
};

export default Create;
