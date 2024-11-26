import { useState } from "react"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import { context } from "./ui.js"

export default function App( {UpdateUserInfo, handleSavelUpdateProfile} ) {
  // use ref em lugar de query selector
  localStorage.theme === 'dark' ? document.querySelector(':root').classList.add('dark') : ''
  
    const [view, setView] = useState( context.userId ? 'home' : 'login' )
    
    const handleGoToRegister = () => setView('register')
    const handleGoToLogin = () => {
      setView('login')
    }
    const handleGoToHome = () => setView('home')
  
    console.log('App -> render')
  
        switch (view) {
          case 'login':
            return [<Header handleSavelUpdateProfile />, <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />]
          case 'register':
            return [<Header handleSavelUpdateProfile onLoggedOut={handleGoToLogin} />, <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />]
          case 'home':
            return [<Home onLogoutClick={handleGoToLogin} />]
        }
  }