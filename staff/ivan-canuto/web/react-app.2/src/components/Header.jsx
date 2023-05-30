import { getTheme, setTheme } from "../ui"
import './components-styles/Header.css'


export default function Header({ handleToggleMenu, handleReturnToHome, handleOpenProfile, handleReturnToLogin, user }) {

  const switchAppTheme = () => {
    const theme = getTheme() === 'light' ? 'dark' : 'light'
    setTheme(theme)
  }

  return <>
  <header className="header">
    <div>
      <span className="material-symbols-outlined menu-icon" onClick={handleToggleMenu}>menu</span>
      <h1 className="title" onClick={handleReturnToHome}>Home</h1>
      <div className="name-avatar-profile" onClick={handleOpenProfile}>  
          <img className="avatar-image" src={user.avatar} alt="avatar image" />
          <a>{user.name}</a>
      </div>
      <button className="switch-mode-button" onClick={switchAppTheme}>Switch mode</button>
      <button className="logout-button" onClick={handleReturnToLogin}>Logout</button>
    </div>
  </header>
  </>
}