import { useEffect, useState } from "react"
import Profile from "../components/ProfileModal"
import AddPost from "../components/AddPostModal"
import Posts from "../components/Posts"
import Menu from "../components/menu"
import { context } from "../ui"
import retrieveUser from "../logic/retrieveUser"
import EditPost from "../components/EditPostModal"
import Header from "../components/Header"
import './pages-styles/Home.css'


export default function Home(props) {
  
  const [view, setView] = useState(context.view || 'posts')
  const [modal, setModal] = useState(null)
  const [menu, setMenu] = useState(false)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
  const [user, setUser] = useState()
  
  useEffect(() => {
    
    try {
     retrieveUser(context.userId, (error, _user) => {
  
      if(error) {
        alert(error)
        console.log(error.stack)
  
        return
      }
  
      setUser(_user)
     })
      
    } catch (error) {
      alert(error)
      console.log(error);
    }
  
  }, [])


   const handleReturnToHome = () => {
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
    setView('userPosts')
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
  
  const handleUpdatedAvatar = () => {
    try {
      retrieveUser(context.userId, (error, user) => {
        if (error) {
          alert(error.message)
          console.log(error.stack)

          return
        }
        
        setUser(user)
      })
      
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }
  
  console.log('Home -> render')

  return <div className="home page">
    <Header
      user={user}
      handleToggleMenu={handleToggleMenu}
      handleReturnToHome={handleReturnToHome}
      handleOpenProfile={handleOpenProfile}
      handleReturnToLogin={handleReturnToLogin}
    />

    <main>
      <Posts
        view={view}
        handleOpenEditPost={handleOpenEditPost}
        lastPostsUpdate={lastPostsUpdate}
      />

      {modal === 'profile' && <Profile
        onUpdatedAvatar={handleUpdatedAvatar}
        onCancel={handleCloseModal}
        />}

      {menu && <Menu
        onHomePage={handleReturnToHome}
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

    </main> 

    <footer className="home-footer">
        <button className="add-post-button" onClick={handleOpenAddPost}>+</button>
    </footer>
  </div>
}