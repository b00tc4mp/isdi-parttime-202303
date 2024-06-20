import { useState } from 'react'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import {context} from './ui'


export default function App() {
  const [view, setView] = useState(context.userId ? 'home' : 'login')

  const handleGoToRegister = () => setView('register')
  const handleGoToLogin = () => setView('login')
  const handleGoToHome = () => setView('home')

  console.log('App -> render')


  switch (view) {
    case 'login': return <Login onSignUpClick={handleGoToRegister} onLoginClick={handleGoToHome} />
    case 'register': return <Register onLogInClick={handleGoToLogin} />
    case 'home': return <Home onLoggedOut={handleGoToLogin} />

  }
}
