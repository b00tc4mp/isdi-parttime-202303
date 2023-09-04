import { useState, useEffect } from "react"
import { retrieveUser } from "../../logic"
import { useAppContext, useHandleErrors } from "../hooks"

export default function Header({ handleToggleMenu, handleOpenProfile, setPage, handleCloseModal, openedProfile, setOpenedProfile, setView }) {
    const { navigate, freeze, unfreeze } = useAppContext()
    const handleErrors = useHandleErrors()

    const [user, setUser] = useState(null)

    const handleReturnToHome = () => {
        setPage('Home')
        setView('posts')

        handleCloseModal()

        navigate('/')

        if (openedProfile) setOpenedProfile(false)
    }

    useEffect(() => {
        handleErrors(async () => {
            freeze()

            const user = await retrieveUser()

            setUser(user)

            unfreeze()
        })
    }, [])

    return <header className={`fixed h-24 top-0 w-full z-20 bg-slate-100`}>
        <div className="h-full flex justify-between items-center px-4">
            <span className="material-symbols-outlined mx-2" onClick={handleToggleMenu}>menu</span>
            <img className="cursor-pointer h-14 rounded-lg" onClick={handleReturnToHome} src="src/images/logo-home.jpg" />
            {user && <img className="h-10 w-10 object-cover rounded-full" src={user.avatar} alt="avatar image" onClick={handleOpenProfile} />}
        </div>
    </header>
}