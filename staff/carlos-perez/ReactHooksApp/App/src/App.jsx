import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from '../src/main.js'

export default function App() {
  const [view, setView] = useState(context.userId ? 'home' : 'login')

  const handleGoToRegister = () => setView('register')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  switch (view) {
    case 'login': return <Login onRegisterClick={handleGoToRegister} onAuthClick={handleGoToHome} />;
    case 'register': return <Register onLoginClick={handleGoToLogin}/>;
    case 'home': return <Home onLoggedOut={handleGoToLogin} />
  }

}