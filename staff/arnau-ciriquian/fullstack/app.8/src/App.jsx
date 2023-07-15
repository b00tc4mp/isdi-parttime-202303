import { useState, useEffect } from 'react'
import { context, setTheme, getTheme } from './ui'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { utils } from 'com'

const { isTokenAlive, isTokenValid } = utils

export default function App() {
  const { token } = context
  const [view, setView] = useState(isTokenValid(token) && isTokenAlive(token) ? 'home' : 'login')

  useEffect(() => setTheme(getTheme()), [])

  const handleGoToRegister = () => setView('register')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  console.log('App -> render')

  switch (view) {
    case 'login':
      return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />
      
    case 'register':
      return <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin}/>

    case 'home':
      return <Home onLoggedOut={handleGoToLogin}/>
  }
}