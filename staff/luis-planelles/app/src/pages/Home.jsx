import { useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Posts from '../components/Posts'
import Profile from '../components/Profile'
import ProfileUpdateModal from '../components/ProfileUpdateModal'
import retrieveUser from '../logic/retrieveUser'
import { context } from '../ui'
import './Home.css'

const Home = ({onLoggedOut}) => {

  const [view, setView] = useState('posts'),
    [modal, setModal] = useState(null),
    [postId, setPostId] = useState(null),
    [lastUpdate, setLastUpdate] = useState(null);
    
  let loggedUser
    
  try{
    loggedUser = retrieveUser(context.userId)
      
  } catch (error){
      alert(error.message)
  }
    
  const [user, setUser] = useState(loggedUser);

  const hadleLogOutButton = () =>  {
    delete context.userId
    onLoggedOut()
  },
    
  handleGoToProfile = (postId) => { 
    setView('profile')
    setPostId(postId)
  },

  handleOpenEditProfile = () => setModal('edit-profile'),
  
  handleGoToPosts = () => setView('posts'),
  
  handleOpenAddPost = () => setModal('add-post'),
    
  handleOpenEditPost = postId => {
    setModal('edit-post')
    setPostId(postId);
  },

  handleCloseModals = () => setModal(null),

  handlePostUpdated = () => {
    setModal(null)
    setLastUpdate(Date.now()) 
  },

  handleProfileUpdated = () => {
    setModal(null)
  },

  handleUserAvatarUpdated = () => {
    try {
        const user = retrieveUser(context.userId)

        setUser(user)
    } catch (error) {
        alert(error.message)
    }
  };

  return <div className='home page container'>
          <header className='home-header'>
            <h1 className='title' onClick={handleGoToPosts}>Home</h1>
            <nav className='home-header-nav'>
              <img className='home-header-avatar' src={loggedUser.avatar} alt=''/>
              <a className='home-header-user' onClick={handleGoToProfile}>{loggedUser.name}</a>
            </nav>
            <button className='home-header-logout' onClick={hadleLogOutButton}>logout</button>
          </header>
  
          <main>
            {view === 'posts' && (
              <Posts
              lastPostUpdate={lastUpdate}
              onEditPost={handleOpenEditPost}
              />
            )}
            {modal === 'add-post' && (
              <AddPostModal 
                onCancel={handleCloseModals} 
                onPostCreate={handlePostUpdated}
              />
            )}
            {view === 'profile' && (
              <Profile onOpenEditProfile={handleOpenEditProfile} />
            )}
            {modal === 'edit-post' && (
              <EditPostModal
                onCancel={handleCloseModals}
                onPostUpdated={handlePostUpdated}
                postId={postId} 
              />
            )}
            {modal === 'edit-profile' && (
              <ProfileUpdateModal
              onCancel={handleCloseModals}
              onProfileUpdated={handleProfileUpdated}
              onUserAvatarUpdated={handleUserAvatarUpdated}
              />
            )}
          </main>
  
          <footer className='home-footer'>
            <button className='add-post-button' onClick={handleOpenAddPost}>+</button>
          </footer>
        </div>
    }

export default Home
