import { useState } from 'react'
import AppContext from './AppContext'
import { isUserLoggedIn, isOpenList } from './logic'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Login from './view/pages/Login'
import Register from './view/pages/Register'
import HomeUser from './view/pages/HomeUser'
import HomeList from './view/pages/HomeList'

import AlertModal from './view/components/AlertModal'
import Loader from './view/library/Loader'

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
            <Route path="/" element={isUserLoggedIn() && !isOpenList() ? <HomeUser /> : <Navigate to="/login" />} />
            <Route path="/list" element={isUserLoggedIn() && isOpenList()? <HomeList /> : <Navigate to="/login" />} />
        </Routes>
        {messageAlert && <AlertModal onAccept={hanleCloseAlert} message={messageAlert.message} level={messageAlert.level} />}
        {loader && <Loader />}
      </Provider>

}