import { useEffect, useState } from 'react'
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Favourites from '../components/Favourites'
import OnSalePostModal from '../components/OnSalePostModal'
import PostsUser from '../components/PostUser'
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
    [lastUpdate, setLastUpdate] = useState(null),
    [user, setUser] = useState(null);
    
  useEffect(() => {
    try{
    retrieveUser(context.userId, (error, retrievedUser) => {
      if(error) {
        alert(error.message)
        
        return 
      }
      setUser(retrievedUser)
    })
      } catch (error){
        alert(error.message)
      }
    }, [])
  
  const hadleLogOutButton = () =>  {
    delete context.userId
    onLoggedOut()
  },
    
  handleGoToProfile = (event, postId) => {
    event.preventDefault() 

    setModal(null)
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

  handleOpenSellPost = postId => {
    setModal('sale-post'),
    setPostId(postId);
  },
  
  handleOpenFavourites = () => {
    setModal(null)
    setView('favourites')
  },

  handleCloseModals = () => setModal(null),
  
  handlePostUpdated = () => {
    setModal(null)
    setLastUpdate(Date.now()) 
  },

  handleProfileUpdated = () => setModal(null),
  
  handleOpenUserPosts = () => setView('user-posts'),

  handleAvatarUpdated = () => {
    try {
        retrieveUser(context.userId, (error, user) => {
            if (error) {
                alert(error.message)

                return
            }

            setUser(user)
        })
    } catch (error) {
        alert(error.message)
    }
  };
  
  return <div className='home page container'>
          <header className='home-header'>
            <i className='fas fa-home' onClick={handleGoToPosts}/>
            <nav className="home-header-nav">
            {user && <>
                <img className="home-header-avatar" src={user.avatar} alt="" />
                <a href="" onClick={handleGoToProfile}>{user.name}</a>
            </>}
            </nav>
            <button className='home-header-logout' onClick={hadleLogOutButton}>logout</button>
          </header>
  
          <main>
            {view === 'posts' && (
              <Posts
              onEditPost={handleOpenEditPost}
              onSellPost={handleOpenSellPost}
              lastPostUpdate={lastUpdate}
              />
            )}
            {modal === 'add-post' && (
              <AddPostModal 
                onCancel={handleCloseModals} 
                onPostCreate={handlePostUpdated}
              />
            )}
            {modal === 'edit-post' && (
              <EditPostModal
                onCancel={handleCloseModals}
                onPostUpdated={handlePostUpdated}
                postId={postId} 
              />
            )}
            {modal === 'sale-post' && (
              <OnSalePostModal
                onCancel={handleCloseModals}
                onPostUpdated={handlePostUpdated}
                postId={postId} 
              />
            )}
            {view === 'profile' && (
              <Profile 
              onOpenEditProfile={handleOpenEditProfile} 
              onOpenFavourites={handleOpenFavourites}
              onProfileImageClick={handleOpenUserPosts}
              />
            )}
            {view === 'favourites' && (
              <Favourites/>
            )}
            {view === 'user-posts' && (
              <PostsUser 
              onEditPost={handleOpenEditPost}
              lastPostUpdate={lastUpdate}
              />
            )}
            {modal === 'edit-profile' && (
              <ProfileUpdateModal
              onCancel={handleCloseModals}
              onProfileUpdated={handleProfileUpdated}
              onUserAvatarUpdated={handleAvatarUpdated}
              />
            )}

          </main>
  
          <footer className='home-footer'>
            <button className='add-post-button' onClick={handleOpenAddPost}>+</button>
          </footer>
        </div>
    }

export default Home
