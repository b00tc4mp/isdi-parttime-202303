import { useState } from 'react'
import Login from './view/pages/Login'
import Register from './view/pages/Register'
import Home from './view/pages/Home'
import Alert from './view/components/Alert'
import AppContext from './AppContext'
import { Loader } from './view/library'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import isUserLoggedIn from './logic/isUserLoggedIn'

const { Provider } = AppContext

export default function App() {
    console.debug('App -> render')

    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleAcceptAlert = () => setFeedback(null)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    return <Provider value={{ alert, freeze, unfreeze, navigate }}>
        <Routes>
            {(() => console.log('Routes -> render'))()}
            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
            <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        </Routes>

        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
    </Provider>
}