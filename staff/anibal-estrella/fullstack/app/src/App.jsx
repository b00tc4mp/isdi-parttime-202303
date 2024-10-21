import { Home, Login, Register, } from './view/pages/'
import { Alert, Profile } from './view/components/'
import { Loader } from './view/library'
import AppContext from './AppContext'
import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../src/logic'

const { Provider } = AppContext

export default function App() {
    console.debug('/ APP  -> Render');

    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)

    const handleAcceptAlert = () => setFeedback(null)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    function handlePanelClick(event) {
        event.stopPropagation();
    }

    return <Provider value={{ alert, freeze, unfreeze, navigate }}>

        <Routes>
            {(() => console.log('Routes -> Render'))()}
            <Route path="/" element={isUserLoggedIn() ? <Home
                onPanelClick={handlePanelClick}
            /> : <Navigate to="/login" />}>
                <Route
                    path="profile"
                    element={<Profile />}
                />
            </Route>

            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
        </Routes>

        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert}
            onPanelClick={handlePanelClick}
        />}
        {loader && <Loader />}
    </Provider>

}



