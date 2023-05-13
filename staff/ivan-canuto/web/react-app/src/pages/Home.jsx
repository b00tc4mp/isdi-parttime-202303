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
  
   const handleReturnToPosts = () => {
    setView('posts')
  }

   const handleOpenAddPost = () => {
    document.body.classList.add('fixed-scroll')
    setModal('addPost')
  }
   const handleCloseAddPost = () => {
    document.body.classList.remove('fixed-scroll')
    setModal(null)
  }
  
   const handleOpenProfile = () => {
    document.body.classList.add('fixed-scroll')
    setModal('profile')
  }

   const handleCloseProfile = () => {
    document.body.classList.remove('fixed-scroll')
    setModal(null)
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

  const handleCloseEditPost = () => {
    document.body.classList.remove('fixed-scroll')
    setModal(null)
  }

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
    />

    <main>
      {modal === 'profile' && <Profile
        onClose={handleCloseProfile}
      />}

      {view === 'posts' && <Posts
        handleOpenEditPost={handleOpenEditPost}
      />}

      {menu && <Menu
        onHomePage={handleReturnToPosts}
        showOwnPosts={showOwnPosts}
        showSavedPosts={showSavedPosts}
      />}

      {modal === 'addPost' && <AddPost
        onCancel={handleCloseAddPost}
      />}

      {modal === 'editPost' && <EditPost
        onCloseModal={handleCloseEditPost}
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