import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Home, Profile, Login } from './view/pages';
import { Menu } from './view/components';
import AppContext from './AppContext'

const { Provider } = AppContext


function App() {
    // const navigate = useNavigate()

    return <Provider value={{}}>
        {/* return <Provider value={{ alert, freeze, unfreeze, navigate }}> */}

        <Menu />
        <Routes>
            {(() => console.log("ROUTES = render"))()}

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Home />} />
            <Route path="/reviews" element={<Home />} />
            <Route path="/artists" element={<Home />} />
        </Routes>
    </Provider>
}

export default App;
