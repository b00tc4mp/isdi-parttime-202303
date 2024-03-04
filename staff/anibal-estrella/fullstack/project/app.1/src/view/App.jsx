import React, { useState, useEffect } from 'react'
import { SearchArtist, SearchPlace, Menu, MenuLayer } from './components'
import { Home, Register } from './pages'
// import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import retrieveUserGeolocation from '../logic/users/retrieveUserGeolocation'

function App() {
    const [selectedNavItem, setSelectedNavItem] = useState('artist');
    const [showMenuLayer, setShowMenuLayer] = useState(false);


    const handleNavItemClick = (navItem) => {
        console.log(">>> " + navItem);
        setSelectedNavItem(navItem);
    };

    const handleBurguerMenuClick = () => {
        setShowMenuLayer(prevState => !prevState);
    }

    const [city, setCity] = useState('');

    useEffect(() => {
        async function fetchGeolocation() {
            const userCity = await retrieveUserGeolocation();
            setCity(userCity);
        }
        fetchGeolocation();
    }, []);

    return (

        <div className='m-2'>
            {showMenuLayer && <MenuLayer onClose={handleBurguerMenuClick} handleNavItemClick={handleNavItemClick} />}
            <Menu handleNavItemClick={handleNavItemClick} onBurguerMenuClick={handleBurguerMenuClick} />
            <div>
                <h2>Your City: {city}</h2>
            </div>
            <h1>Search {selectedNavItem === 'artist' ? 'artist' : selectedNavItem === 'register' ? 'register' : 'place'}</h1>
            {
                selectedNavItem === 'artist' ? (
                    <SearchArtist />
                ) : selectedNavItem === 'register' ? (
                    <Register />
                ) : (
                    <SearchPlace />
                )
            }
            <Home />
        </div >
    );
}

export default App;
