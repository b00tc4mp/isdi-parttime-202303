import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { BrowserRouter as Router } from 'react-router-dom'


// import inLogger from './inLogger';
// inLogger.on = true

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Router>
    {(() => console.log('Router -> render'))()}
    <App />
  </Router>
  //</React.StrictMode>,
)
