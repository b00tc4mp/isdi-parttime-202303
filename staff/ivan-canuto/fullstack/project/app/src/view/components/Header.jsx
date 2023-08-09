import { getTheme, setTheme } from "../../ui"
import { useState, useEffect } from "react"
import { retrieveUser } from "../../logic"
import { useAppContext, useHandleErrors } from "../hooks"

export default function Header({ handleToggleMenu, handleOpenProfile, handleLogout, setPage }) {
  const { navigate } = useAppContext()
  const handleErrors = useHandleErrors()

  const [newTheme, setnewTheme] = useState(getTheme())
  const [user, setUser] = useState(null)

  // const switchAppTheme = () => {
  //   const theme = newTheme === 'light' ? 'dark' : 'light'
  //   setTheme(theme)
  //   setnewTheme(theme)
  // }

  const theme = getTheme()

  const handleReturnToHome = () => {
    setPage('Home')
    
    navigate('/')
  }

  useEffect(() => {
    handleErrors(async () => {
      const user = await retrieveUser()

      setUser(user)
    })
  }, [])

  return <>
  <header className="fixed h-24 top-0 w-full z-20 bg-slate-100 ">
    <div className="h-full flex justify-between items-center px-4">
      {/* {page === 'home'
        ? <span className="material-symbols-outlined mx-2" onClick={handleToggleMenu}>menu</span>
        : <span class="material-symbols-outlined" onClick={handleReturnToHome}>arrow_back</span>
      } */}
      <span className="material-symbols-outlined mx-2" onClick={handleToggleMenu}>menu</span>
      <img className="cursor-pointer h-14 rounded-lg" onClick={handleReturnToHome} src="src/images/logo-home.jpg" />
      {user && <img className="h-10 w-10 object-cover rounded-full" src={user.avatar} alt="avatar image"  onClick={handleOpenProfile} />}
      {/* <span className="material-symbols-outlined dark-mode hover:bg-gray-400 p-2 rounded-full cursor-pointer" onClick={switchAppTheme}>{theme === 'light' ? 'light_mode' : 'dark_mode'}</span> */}
      {/* <Button onClick={handleLogout}>Logout</Button> */}
    </div>
  </header>
  </>
}