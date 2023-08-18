import Workspots from '../components/Workspots'
import AddWorkspotModal from '../components/AddWorkspotModal'
import { Container, Form, Input, Button } from '../library'
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

    const handleOpenAddWorkspotModal = () => setModal('add-workspot')
    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToWorkSpots = () => setView('workspots')

    const handleWorkspotUpdated = () => {
        setModal(null)        
    }


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
                <img className="w-40 h-40 mt-32 rounded-xl" src={LOGO_URL} onClick={handleGoToWorkSpots}></img>
            </div>

            <nav className="home-header-nav">
                {user && <>
                    <div className='home-header-profile'>
                        <img className="home-header-avatar" src={user.avatar} alt="" />
                        <a href="" onClick={handleGoToProfile}>{user.name}</a>
                    </div>
                </>}
            </nav>

            <Button onClick={handleLogout} className='home-button'>Logout</Button>
        </header>

        <main className='main-container'>
            {view === 'workspots' && <Workspots />}
         
            {view === 'profile' && <Profile
                onUserAvatarUpdated={handleUserAvatarUpdated}
                onUpdatedUserPassword={handleUserPasswordUpdated}
            />}

            {modal === 'add-workspot' && 
                <AddWorkspotModal
                    onCancel={handleCloseModal}
                    onWorkspotCreated={handleWorkspotUpdated}
                />}

        </main>

        <footer className="home-footer">
            <Button onClick={handleOpenAddWorkspotModal}>+</Button>
        </footer>
    </div>

}
