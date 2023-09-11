import { useAppContext } from "../hooks"
import { RandomAvatar } from "react-random-avatars"

export default function Header({ handleToggleMenu, handleOpenProfile, setPage, handleCloseModal, openedProfile, setOpenedProfile, setView, user }) {
    const { navigate } = useAppContext()


    const handleReturnToHome = () => {
        setPage('Home')
        setView('posts')

        handleCloseModal()

        navigate('/')

        if (openedProfile) setOpenedProfile(false)
    }

    return <header className={`fixed h-24 top-0 w-full z-20 bg-slate-100`}>
        <div className="h-full flex justify-between items-center px-4">
            <span className="material-symbols-outlined mx-2" onClick={handleToggleMenu}>menu</span>
            <img className="cursor-pointer h-14 rounded-lg" onClick={handleReturnToHome} src="src/images/logo-home.jpg" />
            {(user && user.avatar)
            ?
            <img className="h-10 w-10 object-cover rounded-full" src={user.avatar} alt="avatar image" onClick={handleOpenProfile} />
            :
            user && <div onClick={handleOpenProfile}><RandomAvatar name={user.name} size={40} /></div>}
        </div>
    </header>
}