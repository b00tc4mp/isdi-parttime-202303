import { useState } from 'react'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import { context } from './ui'

export default function App() {
    const [view, setView] = useState(context.userId === undefined? 'login' : 'home')

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleLogout = () => setView('login')

    if(!localStorage.mode)
        localStorage.mode = 'light'

    if(localStorage.mode === 'dark'){
        if(!document.querySelector('html').classList.contains('dark'))
            document.querySelector('html').classList.add('dark')
    } else {
        if(document.querySelector('html').classList.contains('dark'))   
            document.querySelector('html').classList.remove('dark')
    }

    switch(view){
        case 'login':
            return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome}/>
        case 'register':
            return <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin}/>
        case 'home':
            return <Home onLogout={handleLogout}/>
    }
}