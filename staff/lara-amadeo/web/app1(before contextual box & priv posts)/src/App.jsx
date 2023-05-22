import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import { useState } from 'react'
import { context } from './ui.js'

export default function App() {
 
  const [view, setView] = useState(context.userId ? 'home' : 'login')
  

  const handleGoToRegister = () => { setView('register') }

  const handleGoToLogin = () => { setView('login') }

  const handleGoToHome = () => { setView('home') }

    switch(view){
      case 'login': return <Login onSignUpLink={handleGoToRegister} onLoginButton={handleGoToHome}/>
      case 'register': return <Register onLogInLink={handleGoToLogin} onSignUpButton={handleGoToLogin}/>
      case 'home':  return <Home onLogOutLink={handleGoToLogin} />
    }
}
