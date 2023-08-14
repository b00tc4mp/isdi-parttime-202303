import Login from './src/pages/Login'
import Register from './src/pages/Register'
import Admin from './src/pages/Admin'
import Home from './src/pages/Home'
import CharacterCreator from './src/components/CharacterCreator'
import { useState } from 'react'

export default function App() {
  // obtenir token del user registrat. https://react-native-async-storage.github.io/async-storage/docs/usage/

  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)
  const [home, setHome] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [newCharacter, setNewCharacter] = useState(false)

  const handleGoToRegister = event => {
    setLogin(false)
    setRegister(true)
  }

  const handleGoToLogin = event => {
    setLogin(true)
    setRegister(false)
  }

  const handleGoToAdminMain = event => {
    setLogin(false)
    setAdmin(true)
  }

  const handleGoToHome = event => {
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

  const handleGoToCharacterCreation = () => {
    setHome(false)
    setNewCharacter(true)
  }

  if (login) return (<Login
    onRegisterClick={handleGoToRegister}
    onUserLogedIn={handleGoToHome}
    onAdminLogedIn={handleGoToAdminMain} /
  >)
  if (register) return (<Register
    onLoginClick={handleGoToLogin}
    onUserRegistered={handleGoToLogin}
  />)
  if (admin) return (<Admin
    onLogoutSession={handleLogoutSession}
  />)
  if (home) return (<Home
    onContinueToNewCharacter={handleGoToCharacterCreation}
    onLogoutSession={handleLogoutSession}
  />)
  if (newCharacter) return (<CharacterCreator />)
}
