import { useEffect, useState } from "react"
import Profile from "../components/ProfileModal"
import AddPost from "../components/AddPostModal"
import Posts from "../components/Posts"
import SideBarMenu from "../components/SideBarMenu"
import { context } from "../ui"
import retrieveUser from "../logic/retrieveUser"
import EditPost from "../components/EditPostModal"
import Header from "../components/Header"
import "./pages-styles/Home.css"
import Context from "../AppContext"
import { useContext } from "react"
import VisibilityPost from "../components/VisibilityPostModal"
import ToggleOnSalePost from "../components/ToggleOnSalePostModal"
import DeletePost from "../components/DeletePostModal"
import BuyPost from "../components/BuyPostModal"
import Button from "../library/Button"


export default function Home(props) {
  const [view, setView] = useState(context.view || "posts")
  const [modal, setModal] = useState(null)
  const [menu, setMenu] = useState(false)
  const [openedMenu, setOpenedMenu] = useState(false)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
  const [user, setUser] = useState()
  const { alert, freeze, unfreeze } = useContext(Context)

  useEffect(() => {
    try {
      freeze()

      retrieveUser(context.token, (error, _user) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')
          console.debug(error.stack)
          return
        }

        setUser(_user)
        
      })
    } catch (error) {
      unfreeze()
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

  const handleReturnToLogin = () => {
    props.onLoggedOut()
    delete context.userId
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
      freeze()

      retrieveUser(context.userId, (error, user) => {
        unfreeze()
        
        if (error) {
          alert(error.message, 'error')
          console.debug(error.stack)
          return
        }

        setUser(user)
        setLastPostsUpdate(Date.now())
      })
    } catch (error) {
      unfreeze()
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
        handleReturnToLogin={handleReturnToLogin}
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
            onHomePage={handleReturnToHome}
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
