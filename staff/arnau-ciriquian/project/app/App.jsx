import Login from './src/pages/Login'
import Register from './src/pages/Register'
import Admin from './src/pages/Admin'
import Home from './src/pages/Home'
import { useState } from 'react'
import Game from './src/pages/Game'

export default function App() {
  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)
  const [home, setHome] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [game, setGame] = useState(false)

  const handleGoToRegister = () => {
    setLogin(false)
    setRegister(true)
  }

  const handleGoToLogin = () => {
    setLogin(true)
    setRegister(false)
  }

  const handleGoToAdminMain = () => {
    setLogin(false)
    setAdmin(true)
  }

  const handleGoToHome = () => {
    setLogin(false)
    setHome(true)
  }

  const handleLogoutSession = () => {
    if (admin) {
      setAdmin(false)
      setLogin(true)
    } else if (home) {
      setHome(false)
      setLogin(true)
    }
  }

  const handleStartGame = () => {
    setHome(false)
    setGame(true)
  }

  const handleFinishGame = () => {
    setHome(true)
    setGame(false)
  }

  return <>
    {login && <Login
      onRegisterClick={handleGoToRegister}
      onUserLogedIn={handleGoToHome}
      onAdminLogedIn={handleGoToAdminMain}
    />}
    {register && <Register
      onLoginClick={handleGoToLogin}
      onUserRegistered={handleGoToLogin}
    />}
    {admin && <Admin
      onLogoutSession={handleLogoutSession}
    />}
    {home && <Home
      onLogoutSession={handleLogoutSession}
      onStartGame={handleStartGame}
    />}
    {game && <Game
      onFinishGame={handleFinishGame}
      zombiesToKill={5}
    />}
  </>
}
