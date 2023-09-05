import { useState, useEffect } from 'react'
import { context, setTheme, getTheme } from './ui'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { utils } from 'com'
import Alert from './components/Alert'
import AppContext from './AppContext'

const { Provider } = AppContext

const { isTokenAlive, isTokenValid } = utils

export default function App() {
  const { token } = context
  const [view, setView] = useState(isTokenValid(token) && isTokenAlive(token) ? 'home' : 'login')
  const [feedback, setFeedback] = useState(null)

  useEffect(() => setTheme(getTheme()), [])

  const handleGoToRegister = () => setView('register')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  const handleAcceptAlert = () => setFeedback(null)

  const alert = (message, level = 'info') => setFeedback({ message, level })

  console.log('App -> render')

  return <Provider value={{ alert }}>
    {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
    
    {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
    {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}

  </Provider>
}