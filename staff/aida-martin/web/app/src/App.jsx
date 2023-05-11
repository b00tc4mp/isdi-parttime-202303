import { useState } from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import { context } from './ui'

export default function App () {
  const [view, setView] = useState(context.userId ? 'home' : 'login')

  const handleGoToRegister = () => {
    setView('register')
  }

  const handleGoToLogin = () => {
    setView('login')
  }

  const handleGoToHome = () => {
    setView('home')
  }

  switch (view) {
    case 'login':
      return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />
    case 'register':
      return <Register onLoginClick={handleGoToLogin} onUserRegisteredIn={handleGoToLogin} />
    case 'home':
      return <Home onLogOut={handleGoToLogin} />
  }
}
