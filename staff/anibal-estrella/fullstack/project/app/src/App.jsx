import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import retrieveUserGeolocation from './logic/users/retrieveUserGeolocation'
import { Home, Profile, Login } from './view/pages';
import { Menu } from './view/components';
import AppContext from './AppContext'

const { Provider } = AppContext



function App() {
    // const navigate = useNavigate()
    const [city, setCity] = useState('');
    const [geolocation, setGeolocation] = useState('');


    useEffect(() => {
        async function fetchGeolocation() {
            const geolocationData = await retrieveUserGeolocation();

            const closestCity = geolocationData.closestCity;
            const originalLocation = geolocationData.originalLocation;
            setCity(closestCity)
            setGeolocation(originalLocation)
            debugger
        }
        fetchGeolocation();
    }, []);
    return <Provider value={{}}>
        {/* return <Provider value={{ alert, freeze, unfreeze, navigate }}> */}

        <Menu />
        <Routes>
            {(() => console.log("ROUTES = render"))()}

            <Route path="/" element={<Home city={city} geolocation={geolocation} />} />
            <Route path="/login" element={<Login city={city} geolocation={geolocation} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Home />} />
            <Route path="/reviews" element={<Home />} />
            <Route path="/artists" element={<Home />} />
        </Routes>
    </Provider>
}

export default App;
