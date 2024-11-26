import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

// import inLogger from './inLogger';
// inLogger.on = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
