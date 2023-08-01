import Login from './src/pages/Login'
import Register from './src/pages/Register'
import { useState } from 'react'

export default function App() {
  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)

  const handleGoToRegister = event => {
    setLogin(false)
    setRegister(true)
  }

  const handleGoToLogin = event => {
    setLogin(true)
    setRegister(false)
  }

  if (login) return (<Login onRegisterClick={handleGoToRegister}/>)
  if (register) return (<Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin}/>)
}
