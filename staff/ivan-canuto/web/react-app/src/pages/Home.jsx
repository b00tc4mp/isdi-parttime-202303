import { useState } from "react"
import Profile from "../components/ProfileModal"
import AddPost from "../components/AddPostModal"
import Posts from "../components/Posts"
import Menu from "../components/menu"
import OwnPosts from "../components/OwnPosts"
import SavedPosts from "../components/SavedPosts"
import { context } from "../ui"
import retrieveUser from "../logic/retrieveUser"
import EditPost from "../components/EditPostModal"
import Header from "../components/Header"

export default function Home(props) {
  
  const [view, setView] = useState('posts')
  const [modal, setModal] = useState(null)
  const [menu, setMenu] = useState(false)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
  
   const handleReturnToPosts = () => {
    setView('posts')
  }

   const handleOpenAddPost = () => {
    document.body.classList.add('fixed-scroll')
    setModal('addPost')
  }

   const handleOpenProfile = () => {
    document.body.classList.add('fixed-scroll')
    setModal('profile')
  }

   const handleReturnToLogin = () => {
    props.onLoggedOut()
    delete context.userId
  }

  const handleToggleMenu = () => {
    setMenu(!menu)
  }

  const showOwnPosts = () => {
    setView('ownPosts')
  }

  const showSavedPosts = () => {
    setView('savedPosts')
  }

  const handleOpenEditPost = () => {
    document.body.classList.add('fixed-scroll')
    setModal('editPost')
  }

  const handleLastPostsUpdate = () => {
    document.body.classList.remove('fixed-scroll')
    setLastPostsUpdate(Date.now())
    setModal(null)
  }
  
  const handleCloseModal = () => {
    document.body.classList.remove('fixed-scroll')
    setModal(null)
  }

  const handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')

  let user;
  try {
    user = retrieveUser(context.userId)
    
  } catch (error) {
    alert(error)
    console.log(error);
  }

      return <div className="home page">
    <Header
      user={user}
      handleToggleMenu={handleToggleMenu}
      handleReturnToPosts={handleReturnToPosts}
      handleOpenProfile={handleOpenProfile}
      handleReturnToLogin={handleReturnToLogin}
      handleSwitchMode={handleSwitchMode}
    />

    <main>
      {modal === 'profile' && <Profile
        onUpdatedAvatar={handleLastPostsUpdate}
        onCancel={handleCloseModal}
        />}

      {view === 'posts' && <Posts
        handleOpenEditPost={handleOpenEditPost}
        lastPostsUpdate={lastPostsUpdate}
      />}

      {menu && <Menu
        onHomePage={handleReturnToPosts}
        showOwnPosts={showOwnPosts}
        showSavedPosts={showSavedPosts}
      />}

      {modal === 'addPost' && <AddPost
        onCreatedPost={handleLastPostsUpdate}
        onCancel={handleCloseModal}
        />}

      {modal === 'editPost' && <EditPost
        onUpdatedPost={handleLastPostsUpdate}
        onCancel={handleCloseModal}
      />}

      {view === 'ownPosts' && <OwnPosts
        menuState={menu}
        handleToggleMenu={handleToggleMenu}
      />}

      {view === 'savedPosts' && <SavedPosts
        menuState={menu}
        handleToggleMenu={handleToggleMenu}
      />}
    </main> 

    <footer className="home-footer">
        <button className="add-post-button" onClick={handleOpenAddPost}>+</button>
    </footer>
  </div>
}