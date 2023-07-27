import { useEffect, useState } from "react"
import { useAppContext } from "../hooks"
import { Button, Container } from "../library"
import { Profile, Posts, SideBarMenu, Header, VisibilityPost, DeletePost } from '../components'
import { retrieveUser, logoutUser } from '../../logic'

export default function Home() {
  const [view, setView] = useState("posts")
  const [modal, setModal] = useState(null)
  const [menu, setMenu] = useState(false)
  const [openedMenu, setOpenedMenu] = useState(false)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
  const [user, setUser] = useState()
  const { alert, navigate } = useAppContext()

  useEffect(() => {
    try {
      retrieveUser()
        .then(setUser)
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }, [])

  const handleReturnToHome = () => {
    setView("posts")
    setLastPostsUpdate(Date.now())
  }

  const handleOpenProfile = () => {
    document.body.classList.add("fixed-scroll")
    setModal("profile")
  }

  const handleLogout = () => {
    logoutUser()

    navigate('/login')
  }

  const handleToggleMenu = () => {
    if(!menu) {
      setMenu(!menu)
      setOpenedMenu(!openedMenu)
    } else {
      setTimeout(() => {
        setMenu(!menu)
      }, 400);
      setOpenedMenu(!openedMenu)
    }
  }

  const showOwnPosts = () => {
    setView("userPosts")
    setLastPostsUpdate(Date.now())
  }

  const showSavedPosts = () => {
    setView("savedPosts")
    setLastPostsUpdate(Date.now())
  }

  const handleOpenEditPost = () => {
    document.body.classList.toggle("fixed-scroll")
    setModal("editPost")
    setLastPostsUpdate(Date.now())
  }

  const handleLastPostsUpdate = () => {
    document.body.classList.remove("fixed-scroll")
    setLastPostsUpdate(Date.now())
    setModal(null)
  }
  
  const handleCloseModal = () => {
    document.body.classList.remove("fixed-scroll")
    setModal(null)
  }

  const handleUpdatedAvatar = () => {
    try {
      retrieveUser()
        .then(user => {
          setUser(user)
          setLastPostsUpdate(Date.now())
        })
        .catch(error => {
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }
  
  const handleOpenDeletePost = () => {
    document.body.classList.toggle("fixed-scroll")
    setModal("deletePost")
    setLastPostsUpdate(Date.now())
  }
  
  const handleToggleVisibility = () => {
    document.body.classList.toggle("fixed-scroll")
    setModal("toggleVisibility")
    setLastPostsUpdate(Date.now())
  }

  const handleOpenChatbotWindow = () => {
    navigate('/chatbot')
  }

  console.debug("Home -> render")

  return (
    <Container className="bg-home h-full min-h-screen pt-20">
      <div className="loader"></div>
      <Button className='absolute top-[105px] right-2 bg-slate-200' onClick={handleOpenChatbotWindow}>Chat wit me</Button>

      <Header
        user={user}
        handleToggleMenu={handleToggleMenu}
        handleReturnToHome={handleReturnToHome}
        handleOpenProfile={handleOpenProfile}
        handleLogout={handleLogout}
      />

      <main>
        <Posts
          lastPostsUpdate={lastPostsUpdate}
          view={view}
          handleOpenEditPost={handleOpenEditPost}
          handleOpenDeletePost={handleOpenDeletePost}
          handleToggleVisibility={handleToggleVisibility}
        />

        {modal === "profile" && (
          <Profile
            onUpdatedAvatar={handleUpdatedAvatar}
            onCancel={handleCloseModal}
          />
        )}

        {menu && (
          <SideBarMenu
            showHomePage={handleReturnToHome}
            showOwnPosts={showOwnPosts}
            showSavedPosts={showSavedPosts}
            openedMenu={openedMenu}
            handleToggleMenu={handleToggleMenu}
          />
        )}

        {modal === "editPost" && (
          <EditPost
            onUpdatedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}

        {modal === 'toggleVisibility' && (
          <VisibilityPost
            onChangedVisibility={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}
        
        {modal === 'deletePost' && (
          <DeletePost
            onDeletedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}
      </main>

      <footer className="h-20 w-screen fixed bottom-0 flex justify-center items-center bg-footer">

      </footer>
    </Container>
  )
}
