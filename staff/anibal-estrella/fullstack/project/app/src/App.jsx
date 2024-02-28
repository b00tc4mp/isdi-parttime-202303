import React, { useState, useEffect } from 'react'
import retrieveUserGeolocation from './logic/users/retrieveUserGeolocation'
import AppContext from './AppContext'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, retrieveUser } from './logic/users/'
import { Home, Profile, Login, Create } from './view/pages'
import { MenuTop, MenuBottom, Alert, Footer } from './view/components'
import { Loader } from './view/library'

const { Provider } = AppContext

function App() {
    console.log('>>> App');

    const [isVisible, setIsVisible] = useState(false);
    const [city, setCity] = useState('');
    const [feedback, setFeedback] = useState(null)
    const [user, setUser] = useState()

    const [loader, setLoader] = useState(false)

    const [loaderPercentage, setLoaderPercentage] = useState(0);

    let interval;

    const freeze = () => {
        let fastIncrement = true;

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
                return prev + 0.5;
            });
        }, 50);

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

    const handleCloseAlert = () => {
        setFeedback(null)
    }

    const [ipGeoLocation, setGeolocation] = useState('');

    useEffect(() => {
        try {
            if (isUserLoggedIn()) {
                retrieveUser()
                    .then(user => {
                        setUser(user);
                        console.log(`################## ${user.name} LOGGED ##################`);
                    })
                    .catch(error => alert(error.message))
            }
        } catch (error) {
            alert(error.message)
        }

        async function fetchGeolocation() {
            const geolocationData = await retrieveUserGeolocation();
            const closestCity = geolocationData.closestCity;
            const originalLocation = geolocationData.originalLocation;
            setCity(closestCity)
            setGeolocation(originalLocation)
        }
        fetchGeolocation();
    }, []);

    return <Provider value={{ alert, freeze, unfreeze }} >

        <MenuTop
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isUserLoggedIn={isUserLoggedIn}
        />


        <Routes>
            {(() => console.log("ROUTES = render"))()}

            <Route path="/" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} retrieveUser={retrieveUser} />} />
            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" city={city} ipGeoLocation={ipGeoLocation} user={user} /> : <Login city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/profile" element={<Profile city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/events" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/reviews" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/artists" element={<Home city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
            <Route path="/Create" element={<Create city={city} ipGeoLocation={ipGeoLocation} user={user} />} />
        </Routes>

        {feedback && <Alert message={feedback.message} level={feedback.level} onOk={handleCloseAlert}
            onPanelClick={handlePanelClick}
        />}
        {loaderPercentage > 0 && <Loader percentage={loaderPercentage} />}

        <Footer isUserLoggedIn={isUserLoggedIn} city={city} ipGeoLocation={ipGeoLocation} user={user} />
        <MenuBottom />
    </Provider >
}

export default App;
