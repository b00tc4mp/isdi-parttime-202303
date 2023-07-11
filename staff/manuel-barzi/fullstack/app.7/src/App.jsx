import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { context } from './ui'
import Alert from './components/Alert'
import AppContext from './AppContext'
import { Loader } from './library'
import { utils } from 'com'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

const { Provider } = AppContext
const { isTokenValid, isTokenAlive } = utils

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
            <Route path="/login" element={isTokenValid(context.token) && isTokenAlive(context.token) ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isTokenValid(context.token) && isTokenAlive(context.token) ? <Navigate to="/" /> : <Register />} />
            <Route path="/" element={isTokenValid(context.token) && isTokenAlive(context.token) ? <Home /> : <Navigate to="/login" />} />
        </Routes>

        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
    </Provider>
}