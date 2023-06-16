import { getTheme, setTheme } from "../ui"
import './components-styles/Header.css'
import { useState } from "react"
import Button from "../library/Button";

export default function Header({ handleToggleMenu, handleReturnToHome, handleOpenProfile, handleReturnToLogin, user }) {

  const [newTheme, setnewTheme] = useState(getTheme())

  const switchAppTheme = () => {
    const theme = newTheme === 'light' ? 'dark' : 'light'
    setTheme(theme)
    setnewTheme(theme)
  }

  const theme = getTheme()

  return <>
  <header className="header">
    <div>
      <span className="material-symbols-outlined menu-icon" onClick={handleToggleMenu}>menu</span>
      <h1 className="title" onClick={handleReturnToHome}>Home</h1>
      {user && <>
        <div className="name-avatar-profile" onClick={handleOpenProfile}>  
            <img className="avatar-image" src={user.avatar} alt="avatar image" />
            <a>{user.name}</a>
        </div>
      </>}
      <span className="material-symbols-outlined dark-mode hover:bg-gray-400 p-2 rounded-full" onClick={switchAppTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</span>
      <Button className="logout-button" onClick={handleReturnToLogin}>Logout</Button>
    </div>
  </header>
  </>
}