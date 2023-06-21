import { getTheme, setTheme } from "../ui"
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
  <header className="fixed h-32 bg-header top-0 w-full z-50">
    <div className="h-full flex justify-evenly items-center">
      <span className="material-symbols-outlined cursor-pointer text-4xl" onClick={handleToggleMenu}>menu</span>
      <h1 className="text-4xl cursor-pointer" onClick={handleReturnToHome}>Home</h1>
      {user && <>
        <div className="cursor-pointer" onClick={handleOpenProfile}>  
            <img className="h-10 rounded-full" src={user.avatar} alt="avatar image" />
            <a>{user.name}</a>
        </div>
      </>}
      <span className="material-symbols-outlined dark-mode hover:bg-gray-400 p-2 rounded-full cursor-pointer" onClick={switchAppTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</span>
      <Button onClick={handleReturnToLogin}>Logout</Button>
    </div>
  </header>
  </>
}