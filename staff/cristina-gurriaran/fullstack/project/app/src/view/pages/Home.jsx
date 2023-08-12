import Workspots from '../components/Workspots'
import { useEffect, useState } from 'react'
import Profile from '../components/Profile'
import retrieveUser from '../../logic/retrieveUser'
import './Home.css'
import { LOGO_URL } from "../../data.js"
import { useAppContext, useHandleErrors } from '../hooks'
import logoutUser from '../../logic/logoutUser'


export default function Home() {
    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const [view, setView] = useState('workspots')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
 
    const [user, setUser] = useState()

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }, [])


    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToWorkSpots = () => setView('workspots')


    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    const handleUserAvatarUpdated = () => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }

    const handleUserPasswordUpdated = () => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }

    console.log('Home -> render')

    return <div className="home page">

        <header className="home-header">
            <div className='home-logo-container'>
                <img className='home logo' src={LOGO_URL} onClick={handleGoToWorkSpots}></img>
            </div>

            <nav className="home-header-nav">
                {user && <>
                    <div className='home-header-profile'>
                        <img className="home-header-avatar" src={user.avatar} alt="" />
                        <a href="" onClick={handleGoToProfile}>{user.name}</a>
                    </div>
                </>}
            </nav>

            <button onClick={handleLogout} className='home-button'>Logout</button>
        </header>

        <main className='main-container'>
            {view === 'workspots' && <Workspots />}
         
            {view === 'profile' && <Profile
                onUserAvatarUpdated={handleUserAvatarUpdated}
                onUpdatedUserPassword={handleUserPasswordUpdated}
            />}

        </main>

        <footer className="home-footer">
            <button className='add-post-button'>+</button>
        </footer>
    </div>

}
