import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { context } from './ui'
import Alert from './components/Alert'
import AppContext from './AppContext'
import { Loader } from './library'
import { utils } from 'com'

const { Provider } = AppContext
const { isTokenValid, isTokenAlive } = utils

export default function App() {
    const { token } = context
    const [view, setView] = useState(isTokenValid(token) && isTokenAlive(token) ? 'home' : 'login')
    //CONTEXT/ALERTS/04// setFeedback is called from the context and will set an Alert message
    const [feedback, setFeedback] = useState(null)

    const [loader, setLoader] = useState(false)

    const freeze = () => setLoader(true)
    const unfreeze = () => setLoader(false)

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')
    //CONTEXT/ALERTS/04// setFeedback is set as null to close/reset component
    const handleAcceptAlert = () => setFeedback(null)

    const alert = (message, level = 'info') => setFeedback({ message, level })

    console.debug('// App -> RENDER');

    //CONTEXT/ALERTS/04// setFeedback is called from the context 
    return <Provider value={{ alert, freeze, unfreeze }}>
        {/* // as soon as we change the state value of loader we render it */}
        {loader && <Loader />}

        {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}

        {/* //CONTEXT/ALERTS/END// setFeedback is called with the shared message from the alert error */}
        {feedback && <Alert message={feedback.message} level={feedback.level} onAccept={handleAcceptAlert} />}
        {view === 'login' && <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}
        {view === 'register' && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    </Provider>

}



