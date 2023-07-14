import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { initTheme } from './components/helpers/getTheme.js'
import { BrowserRouter as Router } from 'react-router-dom'

initTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <Router>
        <App />
    </Router>
    //  </React.StrictMode> 
)
