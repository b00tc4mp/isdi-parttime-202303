// import { useState } from 'react'
import Login from './pages/Login'
import HomeUser from './pages/HomeUser'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import AppContext from './AppContext.js'
import isLoggedIn from './logic/isLoggedIn.js'




export default function App() {
    const navigate = useNavigate()



    return <AppContext.Provider value={{ navigate }}>
        <Routes>
            {/* {(() => console.log('Router => render App'))()} */}
            <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
            <Route path="/" element={isLoggedIn() ? <HomeUser /> : <Navigate to="/login" />} />
        </Routes>
    </AppContext.Provider>

}