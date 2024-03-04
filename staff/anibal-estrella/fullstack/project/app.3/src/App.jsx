import React, { useState, useEffect } from 'react'
import retrieveUserGeolocation from './logic/users/retrieveUserGeolocation'
import AppContext from './AppContext'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import { Home, Profile, Login } from './view/pages';
import { Menu, Alert } from './view/components';
import { Loader } from './view/library'

const { Provider } = AppContext



function App() {

    const [city, setCity] = useState('');
    const [feedback, setFeedback] = useState(null)

    const [loader, setLoader] = useState(false)
    // const freeze = () => setLoader(true)
    // const unfreeze = () => setLoader(false)
    const navigate = () => useNavigate(); // Using useNavigate hook here


    const [loaderPercentage, setLoaderPercentage] = useState(0);

    let interval;

    const freeze = () => {
        let fastIncrement = true;

        // Initially start with a fast increment
        setLoaderPercentage(10);
        interval = setInterval(() => {
            setLoaderPercentage(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                if (fastIncrement) {
                    return prev + 2;
                }
                return prev + 0.5;  // Slow increment
            });
        }, 50);

        // Slow down the increment after 1 second (or when you start the fetch)
        setTimeout(() => {
            fastIncrement = false;
        }, 1000);
    }

    const unfreeze = () => {
        clearInterval(interval);
        setLoaderPercentage(100);
        setTimeout(() => setLoaderPercentage(0), 500);  // Reset after a half-second delay
    }

    const alert = (message, level = 'info') => setFeedback({ message, level })
    function handlePanelClick(event) {
        event.stopPropagation();
    }
    const handleAcceptAlert = () => setFeedback(null)


    const [ipGeoLocation, setGeolocation] = useState('');

    useEffect(() => {
        async function fetchGeolocation() {
            const geolocationData = await retrieveUserGeolocation();

            const closestCity = geolocationData.closestCity;
            const originalLocation = geolocationData.originalLocation;
            setCity(closestCity)
            setGeolocation(originalLocation)
        }
        fetchGeolocation();
    }, []);

    return <Provider value={{ alert, freeze, unfreeze }}>

        <Menu />
        <Routes>
            {(() => console.log("ROUTES = render"))()}

            <Route path="/" element={<Home city={city} ipGeoLocation={ipGeoLocation} />} />
            <Route path="/login" element={<Login city={city} ipGeoLocation={ipGeoLocation} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Home />} />
            <Route path="/reviews" element={<Home />} />
            <Route path="/artists" element={<Home />} />
        </Routes>

        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert}
            onPanelClick={handlePanelClick}
        />}
        {/* {loader && <Loader />} */}
        {loaderPercentage > 0 && <Loader percentage={loaderPercentage} />}

    </Provider>
}

export default App;
