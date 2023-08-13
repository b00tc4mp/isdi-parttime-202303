import React, { useState, useEffect } from 'react'
import { SearchArtist, SearchPlace, Menu } from './components'
import { Home } from './pages'
import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import retrieveUserGeolocation from '../logic/retrieveUserGeolocation'

function App() {
    const [selectedNavItem, setSelectedNavItem] = useState('artist');

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const [city, setCity] = useState('');

    useEffect(() => {
        async function fetchGeolocation() {
            const userCity = await retrieveUserGeolocation();
            setCity(userCity);
        }
        fetchGeolocation();
    }, []);

    return (

        <div>
            <Menu />
            <div>
                <h2>Your City: {city}</h2>
            </div>
            <h1>Search {selectedNavItem === 'artist' ? 'artist' : 'place'}</h1>
            {selectedNavItem === 'artist' ? <SearchArtist /> : <SearchPlace />}
            <Home />
        </div >
    );
}

export default App;
