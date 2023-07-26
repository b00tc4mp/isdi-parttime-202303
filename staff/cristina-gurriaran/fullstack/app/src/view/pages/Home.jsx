import Posts from '../components/Posts'
import { useEffect, useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'
import EditPostModal from '../components/EditPostModal'
import retrieveUser from '../../logic/retrieveUser'
import './Home.css'
import { LOGO_URL } from "../../data.js"
import { useAppContext , useHandleErrors } from '../hooks'
import logoutUser from '../../logic/logoutUser'


export default function Home() {
    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    const [user, setUser] = useState()

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveUser()
            setUser(user)
        })
    }, [])
    

    const handleOpenAddPostModal = () => setModal('add-post')

    const handleOpenEditPostModal = (postId) => {
        setModal('edit-post')
        setPostId(postId)
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToPosts = () => setView('posts')

    const handlePostUpdated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

   
    const handleLogout = () => {
        logoutUser()

        navigate ('/login')
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
                <img className='home logo' src={LOGO_URL} onClick={handleGoToPosts}></img>
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
                {view === 'posts' && <Posts onEditPost={handleOpenEditPostModal} lastPostsUpdate={lastPostsUpdate} />}
                {view === 'profile' && <Profile 
                    onUserAvatarUpdated={handleUserAvatarUpdated} 
                    onUpdatedUserPassword={handleUserPasswordUpdated}
                    />}

                {modal === 'add-post' && <AddPostModal
                    onCancel={handleCloseModal}
                    onPostCreated={handlePostUpdated}
                />}

                {modal === 'edit-post' && <EditPostModal
                    onCancel={handleCloseModal}
                    onPostUpdated={handlePostUpdated}
                    postId={postId}
                />}
            </main>

            <footer className="home-footer">
                <button className='add-post-button' onClick={handleOpenAddPostModal}>+</button>
            </footer>
        </div>
    
}
