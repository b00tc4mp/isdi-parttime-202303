import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Menu } from './components';
import { Home, Profile, Register } from './pages';


function App() {


    return (
        <Router>
            <Menu />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App;
