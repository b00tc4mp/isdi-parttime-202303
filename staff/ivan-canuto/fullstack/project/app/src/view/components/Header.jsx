import { getTheme, setTheme } from "../../ui"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { retrieveUser } from "../../logic"

export default function Header({ handleToggleMenu, handleOpenProfile }) {
  const navigate = useNavigate()

  const [newTheme, setnewTheme] = useState(getTheme())
  const [user, setUser] = useState(null)

  const switchAppTheme = () => {
    const theme = newTheme === 'light' ? 'dark' : 'light'
    setTheme(theme)
    setnewTheme(theme)
  }

  const theme = getTheme()

  const handleReturnToHome = () => navigate('/')

  useEffect(() => {
    try {
      retrieveUser()
        .then(setUser)
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }, [])

  return <>
  <header className="fixed h-24 top-0 w-full z-20 bg-slate-100 ">
    <div className="h-full flex justify-between items-center px-4">
      <span className="material-symbols-outlined mx-2" onClick={handleToggleMenu}>menu</span>
      <img className="cursor-pointer h-14 rounded-lg" onClick={handleReturnToHome} src="src/images/logo-home.jpg" />
      {user && <img className="h-10 w-10 object-cover rounded-full" src={user.avatar} alt="avatar image"  onClick={handleOpenProfile} />}
      {/* <span className="material-symbols-outlined dark-mode hover:bg-gray-400 p-2 rounded-full cursor-pointer" onClick={switchAppTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</span> */}
      {/* <Button onClick={handleLogout}>Logout</Button> */}
    </div>
  </header>
  </>
}