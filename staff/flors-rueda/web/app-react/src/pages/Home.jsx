import Posts from '../components/Posts'
import { useState } from 'react'
import NewPost from '../components/PostModals/NewPost'
import EditPost from '../components/PostModals/EditPost'
import { context }from '../context'
import { svg } from '../../assets/svg-paths'
import Navbar from '../components/Navbar/Navbar'
import './Home.css'
import Profile from '../components/Profile'

export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts');
    const [modal, setModal] = useState(null);
    const [postId, setPostId] = useState(null);

    const handleOpenNewPostModal = () => setModal('new-post');
    const handleOpenEditPostModal = (postId) => {
        setPostId(postId)
        setModal('edit-post')
    }
    const handleCloseModal = () => setModal(null)


    
    const handleGoToProfile = event => {
        event.preventDefault()
        setView('profile')
    }

    const handleGoToPosts = () => setView('posts')

    const handleLogout = () => {
        delete context.userAuth
        onLoggedOut()
    }

    console.log('Home -> render')

    return <div className="home">
      <Navbar onLogoutClick={handleLogout} onProfileClick={handleGoToProfile} onHomeClick={handleGoToPosts} />
      <main className="home-page__main">
          {view === 'posts' && <Posts onEditPost={handleOpenEditPostModal}/>}
          {view === 'profile' && <Profile/>}
          {modal === 'new-post' && <NewPost onCancel={handleCloseModal} onPostCreated={handleCloseModal}/>}
          {modal === 'edit-post' && <EditPost onCancel={handleCloseModal} postId={postId} onPostUpdated={handleCloseModal} />}
        </main>
        <div className="home-page__new-post">
            <button className="home-page__new-post--button">
                <svg className="home-page__new-post--svg" onClick={handleOpenNewPostModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.plus}/></svg>
            </button>
        </div>
    </div>
    }


