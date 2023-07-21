import { getTheme, setTheme } from "../../ui"
import { useState } from "react"
import Button from "../library/Button";

export default function Header({ handleToggleMenu, handleReturnToHome, handleOpenProfile, handleLogout, user }) {

  const [newTheme, setnewTheme] = useState(getTheme())

  const switchAppTheme = () => {
    const theme = newTheme === 'light' ? 'dark' : 'light'
    setTheme(theme)
    setnewTheme(theme)
  }

  const theme = getTheme()

  return <>
  <header className="fixed h-32 bg-header top-0 w-full z-50">
    <div className="h-full flex justify-evenly items-center">
      <span className="material-symbols-outlined cursor-pointer text-4xl" onClick={handleToggleMenu}>menu</span>
      <h1 className="text-4xl cursor-pointer" onClick={handleReturnToHome}>Home</h1>
      {user && <>
        <div className="cursor-pointer flex items-center gap-2" onClick={handleOpenProfile}>  
            <img className="h-10 w-10 object-cover rounded-full" src={user.avatar} alt="avatar image" />
            <a>{user.name}</a>
        </div>
      </>}
      <span className="material-symbols-outlined dark-mode hover:bg-gray-400 p-2 rounded-full cursor-pointer" onClick={switchAppTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</span>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  </header>
  </>
}