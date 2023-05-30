import { useState } from 'react'
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

  let _currentUser

  try {
    _currentUser = retrieveUser(context.userId)
  } catch (error) {
    console.log(error.message)
  }

  const [currentUser, setCurrentUser] = useState(_currentUser)

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
      setCurrentUser(retrieveUser(context.userId))
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

        <div className='home-header-nav'>
          <img
            className='avatar home-header-avatar'
            src={currentUser.avatar ? currentUser.avatar : DEFAULT_AVATAR_URL}
            alt=''
          />
          <a href='' className='profile-link' onClick={handleGoToProfile}>
            {currentUser.name}
          </a>

          <button className='button logout-button' onClick={handleLogOut}>
            LOG OUT
          </button>
        </div>
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
        {view === 'posts' && (
          <Posts
            currentUser={currentUser}
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

        {view === 'saved-posts' && (
          <Posts
            currentUser={currentUser}
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
