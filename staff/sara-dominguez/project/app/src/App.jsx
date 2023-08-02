import { useState } from 'react'
import Login from './pages/Login'
import HomeUser from './pages/HomeUser'
import Alert from './components/Alert.jsx'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AppContext from './AppContext.js'
import isLoggedIn from './logic/isLoggedIn.js'


export default function App() {
    const [feedback, setFeedback] = useState('null')
    const navigate = useNavigate()

    const alert = (message, level = 'info') => setFeedback({ message, level })

    const handleAcceptAlert = () => setFeedback(null)


    return <AppContext.Provider value={{ alert, navigate }}>
        <Routes>
            {/* {(() => console.log('Router => render App'))()} */}
            <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={isLoggedIn() ? <HomeUser /> : <Navigate to="/login" />} />
        </Routes>
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
    </AppContext.Provider>

}