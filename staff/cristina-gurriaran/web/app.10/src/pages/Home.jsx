import Posts from '../components/Posts'
import { useEffect, useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'
import EditPostModal from '../components/EditPostModal'
import { context } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import './Home.css'

export default function Home({onLoggedOut}) {
    
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)

    let _user

    try {
        _user = retrieveUser(context.userId)

    } catch (error) {
        alert(error.message)
    }
    
    const [user, setUser] = useState(_user)

    const handleOpenAddPostModal = () => setModal('add-post')

    const handleOpenEditPostModal = postId => {
        setModal('edit-post')
        setPostId(postId)
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToPosts = () => setView('posts')

    const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')

    const handlePostUpdated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

    // componentWillMount() {
    //     console.log('Home -> componentWillMount')
    // }

    // componentDidMount() {
    //     console.log('Home -> componentDidMount')
    // }

    // componentWillUnmount() {
    //     console.log('Home -> componentWillUnmount')
    // }
    

    const handleLogout = () => {
        delete context.userId

        onLoggedOut()
    }

    const handleUserAvatarUpdated = () => {
        try {
            const user = retrieveUser(context.userId)

            setUser(user)
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Home -> render')

        return <div className="home page">
            <header className="home-header">
                <h1 className="title" onClick={handleGoToPosts}>Home</h1>

                <nav className="home-header-nav">
                    <img className="home-header-avatar" src={user.avatar} alt="" />
                    <a href="" onClick={handleGoToProfile}>{user.name}</a>
                </nav>

                <button onClick={handleSwitchMode} className='button'>Switch Mode</button>
                <button onClick={handleLogout} className="home-header-logout button">Logout</button>
            </header>

            <main className='container'>
                {view === 'posts' && <Posts onEditPost={handleOpenEditPostModal} lastPostsUpdate={lastPostsUpdate} />}
                {view === 'profile' && <Profile onUserAvatarUpdated={handleUserAvatarUpdated} />}

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
                <button className="add-post-button" onClick={handleOpenAddPostModal}>+</button>
            </footer>
        </div>
    
}
