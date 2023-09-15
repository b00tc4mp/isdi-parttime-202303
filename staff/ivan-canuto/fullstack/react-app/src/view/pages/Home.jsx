import { useEffect, useState } from "react"
import retrieveUser from "../../logic/retrieveUser"
import { useAppContext } from "../hooks"
import { Button } from "../library"
import { Profile, AddPost, Posts, SideBarMenu, EditPost, Header, VisibilityPost, ToggleOnSalePost, DeletePost, BuyPost } from '../components'
import logoutUser from '../../logic/logoutUser'

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

  const handleOpenAddPost = () => {
    document.body.classList.add("fixed-scroll")
    setModal("addPost")
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
  
  const handleToggleOnSalePost = () => {
    document.body.classList.toggle("fixed-scroll")
    setModal("toggleOnSale")
    setLastPostsUpdate(Date.now())
  }

  const handleOpenBuyPost = () => {
    document.body.classList.toggle("fixed-scroll")
    setModal("buyPost")
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

  console.debug("Home -> render")

  return (
    <section className="bg-home h-full min-h-screen pt-20">
      <div className="loader"></div>
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
          handleOpenBuyPost={handleOpenBuyPost}
          handleOpenEditPost={handleOpenEditPost}
          handleOpenDeletePost={handleOpenDeletePost}
          handleToggleVisibility={handleToggleVisibility}
          handleToggleOnSalePost={handleToggleOnSalePost}
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
          />
        )}

        {modal === "addPost" && (
          <AddPost
            onCreatedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}

        {modal === "editPost" && (
          <EditPost
            onUpdatedPost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}

        {modal === 'toggleOnSale' && (
          <ToggleOnSalePost
            onToggledOnSalePost={handleLastPostsUpdate}
            onCancel={handleCloseModal}
          />
        )}
        
        {modal === 'buyPost' && (
          <BuyPost
            onBoughtPost={handleLastPostsUpdate}
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
        <Button onClick={handleOpenAddPost}>
          Add post
        </Button>
      </footer>
    </section>
  )
}
