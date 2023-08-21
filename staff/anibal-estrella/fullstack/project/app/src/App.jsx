import React, { useState, useEffect } from 'react'
import AppContext from './AppContext'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import retrieveUserGeolocation from './logic/users/retrieveUserGeolocation'

import { Home, Profile, Login } from './view/pages';
import { Menu, Alert } from './view/components';
import { Loader } from './view/library'

const { Provider } = AppContext



function App() {
    // const navigate = useNavigate()
    const [city, setCity] = useState('');
    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)

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
        {loader && <Loader />}

    </Provider>
}

export default App;
