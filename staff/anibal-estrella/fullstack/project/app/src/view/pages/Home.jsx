import React, { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'
import isUserLoggedIn from '../../logic/users/isUserLoggedIn'
import { Button } from '../library'
import { EventCard, SearchArtist, SearchPlace, DraggableSlider, HeaderWelcome } from '../components'

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
        <div className=' text-xs'>
            {city && <p>Your City: {city} </p>}
            {city && <p>Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
        </div >

        < HeaderWelcome />

        {isUserLoggedIn() ? (
            <div>
                <h2>logged!</h2>
            </div>
        ) :
            (
                <div>
                    <h3>not logged!</h3>
                </div>

            )}

        <section id="home" className=" px-3">

            <section id=''>
                <SearchArtist />
            </section>
            <section id=''>
                <SearchPlace />
            </section>

            <section id='events-featured'>
                <h3>Upcoming Events</h3>
                <DraggableSlider>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <EventCard key={index} />
                    ))}
                </DraggableSlider>
            </section>
            <section>
                <h3>Featured Review</h3>
                <DraggableSlider>
                    {Array.from({ length: 1 }).map((_, index) => (
                        <EventCard key={index} />
                    ))}
                </DraggableSlider>
            </section>
            <section id='Events'>
                <h3>Events in <span>your area</span></h3>
                <DraggableSlider>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <EventCard key={index} />
                    ))}
                </DraggableSlider>

            </section>
        </section>

    </>
}