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

    switch(view){
        case 'login':
            return <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome}/>
        case 'register':
            return <Register onLoginClick={handleGoToLogin}/>
        case 'home':
            return <Home onLogout={handleLogout}/>
    }  
}