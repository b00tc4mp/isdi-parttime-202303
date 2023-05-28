import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from './ui.js'
import Alert from './components/Alert.jsx'
import Context from './components/Context.js'
import Loader from './library/Loader.jsx'

export default function App() {
  const [view, setView] = useState(context.userId ? 'home' : 'login')
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)

  const handleGoToRegister = () => setView('register')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  const handleAcceptAlert = () => setFeedback(null)

  const alert = (message, level = 'info') => setFeedback({message, level})

  const freeze = () => setLoader(true)

  const unfreeze = () => setLoader(false)

  console.debug('App ->render')

  return <Context.Provider value={{alert, freeze, unfreeze}}>
    {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
    {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    {view === 'home' && <Home onLoggedOutClick={handleGoToLogin} />}
    {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
    {loader && <Loader/>}

  </Context.Provider>
} 
