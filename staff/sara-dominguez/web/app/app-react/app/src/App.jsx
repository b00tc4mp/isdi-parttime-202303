import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from './ui.js'
import Alert from './components/Alert.jsx'
import Context from './components/Context.js'

export default function App() {
  const [view, setView] = useState(context.userId ? 'home' : 'login')
  const [feedback, setFeedback] = useState(null)

  const handleGoToRegister = () => setView('register')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  const handleAcceptAlert = () => setFeedback(null)

  const habdleShowAlert = (message, level = 'info') => setFeedback({message, level})

  console.debug('App ->render')

  return <Context.Provider value={{alert: habdleShowAlert}}>
    {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
    {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    {view === 'home' && <Home onLoggedOutClick={handleGoToLogin} />}
    {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}

  </Context.Provider>
} 
