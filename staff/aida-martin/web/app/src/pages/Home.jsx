import { useState, useEffect } from 'react'
import './Home.css'
import { context, openModal, hideModal, setTheme, getTheme } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import { DEFAULT_AVATAR_URL } from '../constants'
import Posts from '../components/Posts'
import AddPostModal from '../components/modals/AddPostModal'
import EditPostModal from '../components/modals/EditPostModal'
import Profile from '../components/Profile'

export default function Home ({ onLogOut }) {
  const [view, setView] = useState('posts')
  const [modal, setModal] = useState(null)
  const [modalPost, setModalPost] = useState(null)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
  const [dark, setDark] = useState(getTheme() === 'dark')
  const [user, setUser] = useState()

  useEffect(() => handleRefreshCurrentUser(), [])

  const handleLogOut = () => {
    context.removeItem('userId')

    onLogOut()
  }

  const handleOpenAddPost = () => {
    setModal('add-post')

    openModal()
  }

  const handleOpenEditPost = (post) => {
    setModal('edit-post')
    setModalPost(post)

    openModal()
  }

  const handleCloseAddOrEditPost = () => {
    setModal(null)

    hideModal()
  }

  const handleGoToProfile = (event) => {
    event.preventDefault()

    setView('profile')
  }

  const handleGoToPosts = () => {
    try {
      setView('posts')

      handleRefreshCurrentUser()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleGoToSavedPosts = () => {
    try {
      setView('saved-posts')

      handleRefreshCurrentUser()
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSwitchMode = () => {
    const dark = getTheme() === 'light'

    const theme = dark ? 'dark' : 'light'

    setTheme(theme)
    setDark(dark)
  }

  const handlePostUpdated = () => {
    setModal(null)
    setLastPostsUpdate(Date.now())
  }

  const handleRefreshCurrentUser = () => {
    try {
      retrieveUser(context.userId, (error, user) => {
        if (error) {
          console.log(error.message)

          return
        }
        setUser(user)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='home'>
      <header className='home-header'>
        <h1 className='home-title' onClick={handleGoToPosts}>
          HOME
        </h1>

        <nav className='home-header-nav'>
          {user &&
            <>
              <img
                className='avatar home-header-avatar'
                src={user.avatar ? user.avatar : DEFAULT_AVATAR_URL}
                alt=''
              />
              <a href='' className='profile-link' onClick={handleGoToProfile}>
                {user.name}
              </a>

              <button className='button logout-button' onClick={handleLogOut}>
                LOG OUT
              </button>
            </>}
        </nav>
      </header>

      {view !== 'profile' && (
        <div className='button-new-post-container'>
          <button
            className='button reverse-color icon-button toggle-theme-button'
            onClick={handleSwitchMode}
          >
            {dark
              ? (
                <span className='material-symbols-outlined theme'>dark_mode</span>
                )
              : (
                <span className='material-symbols-outlined theme'>sunny</span>
                )}
          </button>
          <button
            className='button reverse-color icon-button saved-posts-button'
            onClick={handleGoToSavedPosts}
          >
            <span className='material-symbols-outlined favs'>pages</span>
          </button>
          <button
            className='button reverse-color new-post-button'
            onClick={handleOpenAddPost}
          >
            NEW POST
          </button>
        </div>
      )}

      <main className='main-container'>
        {view === 'posts' && user && (
          <Posts
            currentUser={user}
            onEditPost={handleOpenEditPost}
            lastPostsUpdate={lastPostsUpdate}
            onRefreshUser={handleRefreshCurrentUser}
          />
        )}

        {view === 'profile' && (
          <Profile
            onUpdateUserAvatar={handleGoToPosts}
            onUpdateUserPassword={handleGoToPosts}
          />
        )}

        {view === 'saved-posts' && user && (
          <Posts
            currentUser={user}
            mySavedPosts
            onEditPost={handleOpenEditPost}
            lastPostsUpdate={lastPostsUpdate}
            onRefreshUser={handleRefreshCurrentUser}
          />
        )}

        {modal === 'add-post' && (
          <AddPostModal
            onPostCreated={handlePostUpdated}
            onCancel={handleCloseAddOrEditPost}
          />
        )}

        {modal === 'edit-post' && (
          <EditPostModal
            onPostEdited={handlePostUpdated}
            onCancel={handleCloseAddOrEditPost}
            post={modalPost}
          />
        )}
      </main>
    </section>
  )
}
