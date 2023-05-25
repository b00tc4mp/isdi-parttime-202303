import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { context } from './ui'
import Alert from './components/Alert'
import Context from './Context'
import Loader from './library/Loader'

export default function App() {
    const [view, setView] = useState(context.userId ? 'home' : 'login')
    const [feedback, setFeedback] = useState(null)
    const [loader, setLoader] = useState(false)

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleAcceptAlert = () => setFeedback(null)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    const freeze = () => setLoader(true)

    const unfreeze = () => setLoader(false)

    console.debug('App -> render')

    return <Context.Provider value={{ alert, freeze, unfreeze }}>
        {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
        {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
        {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {loader && <Loader />}
    </Context.Provider>
}