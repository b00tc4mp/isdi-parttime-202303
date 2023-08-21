import { useState } from 'react'
import AppContext from './AppContext'
import { isUserLoggedIn } from './logic'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

import AlertModal from './components/AlertModal'
import Loader from './library/Loader'

const { Provider } = AppContext


export default function App() {
    console.log('App -> render')

    const [messageAlert, setMessageAlert] = useState(null)
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()

    const alert = (message, level = 'info') => setMessageAlert({ message, level })

    const hanleCloseAlert = () => setMessageAlert(null)

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    return <Provider value={{ alert, freeze, unfreeze, navigate }}>
        <Routes>
            {(() => console.log('Routes -> render'))()}
            <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
            <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        </Routes>
        {messageAlert && <AlertModal onAccept={hanleCloseAlert} message={messageAlert.message} level={messageAlert.level} />}
        {loader && <Loader />}
      </Provider>

}