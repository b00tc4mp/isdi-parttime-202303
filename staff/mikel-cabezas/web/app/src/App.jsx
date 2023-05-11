import { useState } from "react"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from './pages/Home.jsx'
import Header from './components/header.jsx'
import { context } from "./ui.js"

export default function App() {

  localStorage.theme === 'dark' ? document.querySelector(':root').classList.add('dark') : ''
  
    const [view, setView] = useState( context.userId ? 'home' : 'login' )
    
    const handleGoToRegister = () => setView('register')
    const handleGoToLogin = () => setView('login')
    const handleGoToHome = () => setView('home')
    // const handleLoginOnLogout = () => setView('login')
  
    console.log('App -> render')
  
        switch (view) {
          case 'login':
            return [<Header />, <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />]
            // return [<Header  pushUserDataToHeader={renderUser} />, <Login onRegisterClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />]
          case 'register':
            return [<Header onLoggedOut={handleGoToLogin} />, <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />]
          case 'home':
            return [<Home onLogoutClick={() => handleGoToLogin} />]
        }
  }