import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import { useAppContext } from '../hooks'
import { isUserLoggedIn } from '../../logic/users/'
import { EventCard, DraggableSlider, HeaderWelcome } from '../components'

export default ({ city, ipGeoLocation }) => {
    const location = useLocation();
    const { user } = location.state || {};
    console.debug('// Home  -> Render ', user);


    const items = Array(10).fill(0).map((_, index) => index + 1) //temporary for the cards slider

    const { alert, freeze, unfreeze, navigate } = useAppContext(); // Access the context using your custom hook
    const [selectedNavItem, setSelectedNavItem] = useState('artist');
    const [showMenuLayer, setShowMenuLayer] = useState(false);

    const handleBurguerMenuClick = () => {
        setShowMenuLayer(prevState => !prevState);
    }

    useEffect(() => {
        // Update context when user data changes
        if (user) {
            navigate('/', { state: { user } });
        }
    }, [user, navigate]);


    return <section id="home" className="px-3">
        <div>

            {isUserLoggedIn() &&
                <div className='pt-2 px-3'>
                    <h1>
                        Hi {user && user.name}!
                    </h1>
                    <h3>Welcome,
                        {user && <> {user.name} from {user.city}</>}!
                    </h3>
                    <div className=' text-xs px-4'>
                        {city && <p>Your City: {city} Your geolocaltion: {ipGeoLocation[0]},{ipGeoLocation[1]} </p>}
                    </div >
                </div>
            }
        </div>

        < HeaderWelcome />




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


}