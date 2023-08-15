import React, { useState, useEffect } from 'react'
import retrieveUserGeolocation from '../../logic/users/retrieveUserGeolocation'
import { EventCard, SearchArtist, SearchPlace } from '../components'

export default function Home({ onPanelClick }) {
    console.debug('// Home  -> Render')
    const [city, setCity] = useState('');
    const [selectedNavItem, setSelectedNavItem] = useState('artist');
    const [showMenuLayer, setShowMenuLayer] = useState(false);


    const handleBurguerMenuClick = () => {
        setShowMenuLayer(prevState => !prevState);
    }

    useEffect(() => {
        async function fetchGeolocation() {
            const userCity = await retrieveUserGeolocation();
            setCity(userCity);
        }
        fetchGeolocation();
    }, []);

    return <>
        <div className='m-2'>
            <h2>Your City: {city}</h2>
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