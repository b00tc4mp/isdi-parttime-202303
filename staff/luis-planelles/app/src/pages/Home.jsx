import { useState } from 'react'
import AddPostModal from '../components/AddPostModal.jsx'
import EditPostModal from '../components/EditPostModal.jsx'
import Posts from '../components/Posts.jsx'
import Profile from '../components/Profile.jsx'
import retrieveUser from '../logic/retrieveUser.js'
import { context } from '../ui.js'
import './Home.css'

const Home = ({onLoggedOut}) => {

  const [view, setView] = useState('posts'),
  [modal, setModal] = useState(null),
  [postId, setPostId] = useState(null),
  [lastUpdate, setLastUpdate] = useState(null);

  let loggedUser
    
    try{
      loggedUser = retrieveUser(context.userId)
      
    }catch (error){
      alert(error.message)
    }

  const hadleLogOutButton = () =>  {
    delete context.userId
    onLoggedOut()
  },
    
  handleOpenAddPost = () => setModal('add-post'),
    
  handleOpenEditPost = postId => {
    setModal('edit-post')
    setPostId(postId);
  },

  handleCloseModals = () => setModal(null),
    
  handleGoToProfile = (postId) => { 
    setView('profile')
    setPostId(postId)
  },
  
  handleGoToPosts = () => setView('posts'),

  handlePostUpdated = () => {
    setModal(null)
    setLastUpdate(Date.now()) 
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
              <Profile/>
            )}
            {modal === 'edit-post' && (
              <EditPostModal
                onCancel={handleCloseModals}
                onPostUpdated={handlePostUpdated}
                postId={postId} 
              />
            )}
          </main>
  
          <footer className='home-footer'>
            <button className='add-post-button' onClick={handleOpenAddPost}>+</button>
          </footer>
        </div>
    }

export default Home
