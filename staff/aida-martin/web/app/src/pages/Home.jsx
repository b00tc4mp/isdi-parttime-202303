import { Component } from 'react'
import { context, openModal, hideModal } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import { DEFAULT_AVATAR_URL } from '../constants'
import Posts from '../components/Posts'
import AddPostModal from '../components/Modals/AddPostModal'
import EditPostModal from '../components/Modals/EditPostModal'
import Profile from '../components/Profile'

export default class Home extends Component {
  constructor (props) {
    super(props)

    try {
      const currentUser = retrieveUser(context.userId)

      this.state = { view: 'posts', modal: null, modalPost: null, currentUser, theme: 'light' }
    } catch (error) {
      console.log(error.message)
    }

    // Lo que yo había hecho antes de this.props.onLogOut():
    // const { onLogOut } = props
    // this.onLogOut = onLogOut
  }

  handleLogOut = () => {
    context.removeItem('userId')

    this.props.onLogOut()
  }

  handleOpenAddPost = () => {
    this.setState({ modal: 'add-post' })

    openModal()
  }

  handleOpenEditPost = (post) => {
    this.setState({ modal: 'edit-post', modalPost: post })

    openModal()
  }

  handleCloseAddOrEditPost = () => {
    this.setState({ modal: null })

    hideModal()
  }

  handleGoToProfile = event => {
    event.preventDefault()

    this.setState({ view: 'profile' })
  }

  handleGoToPosts = () => {
    try {
      const currentUser = retrieveUser(context.userId)
      this.setState({ view: 'posts', currentUser })
    } catch (error) {
      console.log(error.message)
    }
  }

  handleGoToSavedPosts = () => {
    this.setState({ view: 'saved-posts' })
  }

  handleSwitchMode = () => {
    const root = document.querySelector(':root')

    root.classList.toggle('dark')

    if (root.classList.contains('dark')) {
      this.setState({ theme: 'dark' })
    } else {
      this.setState({ theme: 'light' })
    }
  }

  render () {
    return (
      <section className='home'>
        <header className='home-header'>
          <h1 className='home-title title' onClick={this.handleGoToPosts}>HOME</h1>

          <div className='home-header-nav'>
            <img
              className='avatar home-header-avatar' src={this.state.currentUser.avatar
                ? this.state.currentUser.avatar
                : DEFAULT_AVATAR_URL} alt=''
            />
            <a href='' className='profile-link' onClick={this.handleGoToProfile}>{this.state.currentUser.name}</a>

            <button className='button profile-logout-button' onClick={this.handleLogOut}>LOG OUT</button>
          </div>
        </header>

        {
          this.state.view !== 'profile' &&
            <div className='button-new-post-container'>
              <button className='button toggle-theme-button' onClick={this.handleSwitchMode}>
                {this.state.theme === 'dark' &&
                  <span className='material-symbols-outlined theme'>
                    sunny
                  </span>}
                {this.state.theme === 'light' &&
                  <span className='material-symbols-outlined theme'>
                    dark_mode
                  </span>}
              </button>
              <button className='button new-post-button' onClick={this.handleOpenAddPost}>NEW POST</button>
            </div>
        }

        <main className='main-container'>
          {this.state.view === 'posts' && <Posts currentUser={this.state.currentUser} onEditPost={this.handleOpenEditPost} onLiked={this.handleGoToPosts} onSaved={this.handleGoToPosts} onDeletePost={this.handleGoToPosts} />}

          {this.state.view === 'profile' && <Profile onUpdateUserAvatar={this.handleGoToPosts} onUpdateUserPassword={this.handleGoToPosts} onSavedPosts={this.handleGoToSavedPosts} />}

          {this.state.view === 'saved-posts' && <Posts currentUser={this.state.currentUser} mySavedPosts onEditPost={this.handleOpenEditPost} onLiked={this.handleGoToSavedPosts} onSaved={this.handleGoToSavedPosts} />}

          {this.state.modal === 'add-post' && <AddPostModal onPostCreated={this.handleCloseAddOrEditPost} onCancel={this.handleCloseAddOrEditPost} />}

          {this.state.modal === 'edit-post' && <EditPostModal onPostEdited={this.handleCloseAddOrEditPost} onCancel={this.handleCloseAddOrEditPost} post={this.state.modalPost} />}
        </main>
      </section>
    )
  }
}
