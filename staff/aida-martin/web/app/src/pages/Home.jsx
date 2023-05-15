import { useState, useEffect } from 'react'
import { context, openModal, hideModal } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import toggleTheme from '../logic/toggleTheme'
import retrieveTheme from '../logic/retrieveTheme'
import { DEFAULT_AVATAR_URL } from '../constants'
import Posts from '../components/Posts'
import AddPostModal from '../components/Modals/AddPostModal'
import EditPostModal from '../components/Modals/EditPostModal'
import Profile from '../components/Profile'

export default function Home ({ onLogOut }) {
  const [view, setView] = useState('posts')
  const [modal, setModal] = useState(null)
  const [modalPost, setModalPost] = useState(null)
  const [lastPostsUpdate, setLastPostsUpdate] = useState(null)

  let _currentUser

  try {
    _currentUser = retrieveUser(context.userId)
  } catch (error) {
    console.log(error.message)
  }

  const [currentUser, setCurrentUser] = useState(_currentUser)

  let _theme

  try {
    _theme = retrieveTheme()
    console.log(_theme)
  } catch (error) {
    console.log(error.message)
  }

  const [theme, setTheme] = useState(_theme)

  useEffect(() => {
    const root = document.querySelector(':root')
    if (theme === 'dark') {
      root.classList.add('dark')
      return
    }

    root.classList.remove('dark')
  }, [theme])

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

  const handleGoToProfile = event => {
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
    try {
      setTheme(toggleTheme())
    } catch (error) {
      console.log(error.message)
    }
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
        <h1 className='home-title title' onClick={handleGoToPosts}>HOME</h1>

        <div className='home-header-nav'>
          <img
            className='avatar home-header-avatar' src={currentUser.avatar
              ? currentUser.avatar
              : DEFAULT_AVATAR_URL} alt=''
          />
          <a href='' className='profile-link' onClick={handleGoToProfile}>{currentUser.name}</a>

          <button className='button profile-logout-button' onClick={handleLogOut}>LOG OUT</button>
        </div>
      </header>

      {
          view !== 'profile' &&
            <div className='button-new-post-container'>
              <button className='button toggle-theme-button' onClick={handleSwitchMode}>
                {theme === 'dark' &&
                  <span className='material-symbols-outlined theme'>
                    dark_mode
                  </span>}
                {theme === 'light' &&
                  <span className='material-symbols-outlined theme'>
                    sunny
                  </span>}
              </button>
              <button className='button saved-posts-button' onClick={handleGoToSavedPosts}>
                <span className='material-symbols-outlined favs'>
                  pages
                </span>
              </button>
              <button className='button new-post-button' onClick={handleOpenAddPost}>NEW POST</button>
            </div>
        }

      <main className='main-container'>
        {view === 'posts' && <Posts currentUser={currentUser} onEditPost={handleOpenEditPost} lastPostsUpdate={lastPostsUpdate} onRefreshUser={handleRefreshCurrentUser} />}

        {view === 'profile' && <Profile onUpdateUserAvatar={handleGoToPosts} onUpdateUserPassword={handleGoToPosts} />}

        {view === 'saved-posts' && <Posts currentUser={currentUser} mySavedPosts onEditPost={handleOpenEditPost} lastPostsUpdate={lastPostsUpdate} onRefreshUser={handleRefreshCurrentUser} />}

        {modal === 'add-post' && <AddPostModal onPostCreated={handlePostUpdated} onCancel={handleCloseAddOrEditPost} />}

        {modal === 'edit-post' && <EditPostModal onPostEdited={handlePostUpdated} onCancel={handleCloseAddOrEditPost} post={modalPost} />}
      </main>
    </section>
  )
}
