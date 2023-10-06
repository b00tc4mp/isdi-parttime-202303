import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Context from './Context'
import Alert from './components/Alert'
import { Loader } from './library'
import isUserLoggedIn from './logic/isUserLoggedIn'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleAcceptAlert = () => setFeedback(null)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    return <Context.Provider value={{ alert, freeze, unfreeze, navigate}}>
        <Routes>
            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
            <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        </Routes>
        
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
    </Context.Provider>
}

export default App