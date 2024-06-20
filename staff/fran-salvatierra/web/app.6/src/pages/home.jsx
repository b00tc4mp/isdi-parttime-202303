import Posts from '../components/posts'
import { useState } from 'react'
import AddPostModal from '../components/add-post-modal'
import EditPostModal from '../components/edit-post-modal'
import Profile from '../components/profile'
import './Home.css'
import { context } from '../ui'
import retrieveUser from '../logic/retrieve-user'

export default function Home({ onLoggedOut }) {
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
        setPostId(postId)
        setModal('edit-post')
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = e => {
        e.preventDefault()

        setView('profile')
    }

    const handleGoToPosts = () => setView('posts')

    const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')

    const handlePostUpdated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

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

    return <div className='home'>
        <header className='home-header'>
            <h1 className='home-header-title' onClick={handleGoToPosts}>Home</h1>

            <nav className='home-header-nav'>
                <img className='home-header-avatar' src={user.avatar} />
                <a href='' onClick={handleGoToProfile}>{user.name}</a>
            </nav>

            <button onClick={handleSwitchMode}>Switch Mode</button>
            <button onClick={handleLogout}>Logout</button>
        </header>

        <main>
            {view === 'posts' && <Posts onEditPost={handleOpenEditPostModal} lastPostsUpdate={lastPostsUpdate}/>}
            {view === 'profile' && <Profile onUserAvatarUJpdated={handleUserAvatarUpdated} />}

            {modal === 'add-post' && <AddPostModal
                onCancel={handleCloseModal}
                onPostCreated={handlePostUpdated}    
            />}
            {modal === 'edit-post' && <EditPostModal
                onCalcel={handleCloseModal}
                onPostUpdated={handlePostUpdated}
                postId={postId}
            />}
        </main>

        <footer className='home-footer'>
            <button className='add-post-button' onClick={handleOpenAddPostModal}>+</button>
        </footer>
    </div>
}