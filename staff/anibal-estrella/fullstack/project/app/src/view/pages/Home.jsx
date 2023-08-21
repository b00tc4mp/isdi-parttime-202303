import React, { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'

import { EventCard, SearchArtist, SearchPlace } from '../components'

export default ({ city, ipGeoLocation }) => {
    console.debug('// Home  -> Render')

    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [selectedNavItem, setSelectedNavItem] = useState('artist');
    const [showMenuLayer, setShowMenuLayer] = useState(false);



    const handleBurguerMenuClick = () => {
        setShowMenuLayer(prevState => !prevState);
    }




    return <>
        <div className='m-2'>
            {city && <p>Your City: {city} </p>}
            {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
        </div >
        <section id="home" className="pt-8 px-2">

            <section id=''>
                <SearchArtist />
            </section>
            <section id=''>
                <SearchPlace />
            </section>

            <section id='events-featured'>
                <h2>Featured Events</h2>
            </section>
            <section>
                <h2>Featured Reviews</h2>
            </section>
            <section id='Events'>
                <h2>Events in <span>your area</span></h2>
            </section>
        </section>

    </>
}