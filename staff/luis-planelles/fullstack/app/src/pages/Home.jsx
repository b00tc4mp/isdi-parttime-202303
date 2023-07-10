import { useEffect, useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Posts from '../components/Posts'
import Profile from '../components/Profile'
import ProfileUpdateModal from '../components/ProfileUpdateModal'
import { useAppContext } from '../hooks'
import retrieveUser from '../logic/retrieveUser'
import { context } from '../ui'
import './Home.css'

const Home = ({onLoggedOut}) => {
  const { alert } = useAppContext()
  
  const [view, setView] = useState('posts'),
    [modal, setModal] = useState(null),
    [postId, setPostId] = useState(null),
    [lastUpdate, setLastUpdate] = useState(null),
    [user, setUser] = useState(null);
    
  useEffect(() => {
    
    try {
      retrieveUser(context.token)
      .then(setUser)
      .catch(error => alert(error.message))
    } catch (error){
      alert(error.message)
      }
    }, [])

  const handleProfileUpdated = () => {
      try {
          retrieveUser(context.token)
          .then((updatedUser) => {
            setUser(updatedUser)
            setModal(null)
            
          }).catch(error => alert(error.message))
          } catch (error) {
            alert(error.message)
    }
  },
  
  hadleLogOutButton = () =>  {
    delete context.token
    onLoggedOut()
  },

  handleGoToPosts = () => setView('posts'),
  
  handleOpenEditProfile = () => setModal('edit-profile'),
  handleOpenAddPost = () => setModal('add-post'),
  
  handleCloseModal = () => setModal(null),

  handleGoToProfile = (event, postId) => {
    event.preventDefault() 

    setModal(null)
    setView('profile')
    setPostId(postId)
  },
  
  handleOpenEditPost = postId => {
    setModal('edit-post')
    setPostId(postId);
  },

  handlePostUpdated = () => {
    setModal(null)
    setLastUpdate(Date.now()) 
  };
  
  return <div className='home page container'>
          <header className='home-header'>
            <i className='fas fa-home' onClick={handleGoToPosts}/>
            {user && (
            <nav className="home-header-nav">
              <img className="home-header-avatar" src={user.avatar}/>
              <a href="" onClick={handleGoToProfile}>{user.name}</a>
            </nav>
            )}
            <button className='home-header-logout' onClick={hadleLogOutButton}>logout</button>
          </header>
  
          <main>
            {view === 'posts' && (
              <Posts
                onEditPost={handleOpenEditPost}
                lastPostUpdate={lastUpdate}
              />
            )}
            {modal === 'add-post' && (
              <AddPostModal 
                onCancel={handleCloseModal} 
                onPostCreate={handlePostUpdated}
              />
            )}
            {modal === 'edit-post' && (
              <EditPostModal
                onCancel={handleCloseModal}
                onPostUpdated={handlePostUpdated}
                postId={postId} 
              />
            )}
            {view === 'profile' && (
              <Profile 
                onOpenEditProfile={handleOpenEditProfile}
              />
            )}
            {modal === 'edit-profile' && (
              <ProfileUpdateModal
                onCancel={handleCloseModal}
                onProfileUpdated={handleCloseModal}
                onUserAvatarUpdated={handleProfileUpdated}
                onUserPasswordUpdated={handleProfileUpdated}
              />
            )}
          </main>
  
          <footer className='home-footer'>
            <button className='add-post-button' onClick={handleOpenAddPost}>+</button>
          </footer>
        </div>
    }

export default Home
