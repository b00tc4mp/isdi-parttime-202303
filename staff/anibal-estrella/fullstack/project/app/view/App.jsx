import React, { useState } from 'react'
import { ArtistDetails, SearchPlace } from './components/'

function App() {
    const [selectedNavItem, setSelectedNavItem] = useState('artist');

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <a href="#" onClick={() => handleNavItemClick('artist')}>
                            search artist
                        </a>
                    </li>
                    <li>
                        <a href="#" onClick={() => handleNavItemClick('place')}>
                            search place
                        </a>
                    </li>
                </ul>
            </nav>
            <h1>Add a {selectedNavItem === 'artist' ? 'artist' : 'place'}</h1>
            {/* Conditionally render the component based on the selectedNavItem */}
            {selectedNavItem === 'artist' ? <ArtistDetails /> : <SearchPlace />}
        </div>
    );
}

export default App;
