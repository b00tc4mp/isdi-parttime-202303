import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import inLogger from './inLogger';
inLogger.on = false;

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Router>
    {(() => console.log(`%c[Ballopolis] On`, 'color: silver; font-weight: bold'))()}
    <App />
  </Router>
  //</React.StrictMode>
)




