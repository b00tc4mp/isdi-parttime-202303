import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import inLogger from './inLogger';
inLogger.on = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
