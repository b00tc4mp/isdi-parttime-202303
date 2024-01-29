import React, { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'

import { EventCard, SearchArtist, SearchPlace, DraggableSlider } from '../components'

export default ({ city, ipGeoLocation }) => {
    console.debug('// Home  -> Render')
    const items = Array(10).fill(0).map((_, index) => index + 1);//temporary for the cards slider

    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [selectedNavItem, setSelectedNavItem] = useState('artist');
    const [showMenuLayer, setShowMenuLayer] = useState(false);



    const handleBurguerMenuClick = () => {
        setShowMenuLayer(prevState => !prevState);
    }

    return <>
        <div className=' px-3'>
            {city && <p>Your City: {city} </p>}
            {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
        </div >
        <section id="home" className=" px-3">

            <section id=''>
                <SearchArtist />
            </section>
            <section id=''>
                <SearchPlace />
            </section>

            <section id='events-featured'>
                <h2>Upcoming Events</h2>
                <DraggableSlider>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <EventCard key={index} />
                    ))}
                </DraggableSlider>
            </section>
            <section>
                <h2>Featured Review</h2>
                <DraggableSlider>
                    {Array.from({ length: 1 }).map((_, index) => (
                        <EventCard key={index} />
                    ))}
                </DraggableSlider>
            </section>
            <section id='Events'>
                <h2>Events in <span>your area</span></h2>
                <DraggableSlider>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <EventCard key={index} />
                    ))}
                </DraggableSlider>

            </section>
        </section>

    </>
}