import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { context } from './ui'

export default function app() {

    // const viewState = useState(context.userID ? 'home' : 'login)
    // const view = viewState[0]
    // const setView = viewState[1]

    const [view, setView] = useState(context.userId ? 'home' : 'login')

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    console.log('App -> render')

    switch (view) {

        case 'login':
            return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />

            case 'register':
                return <Register onLoginClick={handleGoToLogin} />

            case 'home':
                return <Home onLoggedOut={handleGoToLogin} />


    }



}