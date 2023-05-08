import { Component } from 'react'
import { context, openModal, hideModal } from '../ui'
import retrieveUser from '../logic/retrieveUser'
import { DEFAULT_AVATAR_URL } from '../constants'
import Posts from '../components/Posts'
import AddPostPanel from '../components/AddPostPanel'
import EditPostPanel from '../components/EditPostPanel'
import Profile from '../components/Profile'

export default class Home extends Component {
  constructor (props) {
    super(props)

    // Lo que yo había hecho antes de this.props.onLogOut():
    // const { onLogOut } = props
    // this.onLogOut = onLogOut
    this.state = { view: 'posts', modal: null, modalPost: null }
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
    this.setState({ view: 'posts' })
  }

  render () {
    const currentUser = retrieveUser(context.userId)

    return (
      <section className='home'>
        <header className='home-header'>
          <h1 className='home-title title' onClick={this.handleGoToPosts}>HOME</h1>

          <div className='home-header-nav'>
            <img
              className='avatar home-header-avatar' src={currentUser.avatar
                ? currentUser.avatar
                : DEFAULT_AVATAR_URL} alt=''
            />
            <a href='' className='profile-link' onClick={this.handleGoToProfile}>{currentUser.name}</a>

            <button className='button profile-logout-button' onClick={this.handleLogOut}>LOG OUT</button>
          </div>
        </header>

        {
          this.state.view !== 'profile' &&
            <div className='button-new-post-container'>
              <button className='button new-post-button' onClick={this.handleOpenAddPost}>NEW POST</button>
            </div>
        }

        <main className='main-container'>
          {this.state.view === 'posts' && <Posts currentUser={currentUser} onEditPost={this.handleOpenEditPost} onLiked={this.handleGoToPosts} onSaved={this.handleGoToPosts} />}

          {this.state.view === 'profile' && <Profile onUpdateUserAvatar={this.handleGoToPosts} onUpdateUserPassword={this.handleGoToPosts} />}

          {this.state.modal === 'add-post' && <AddPostPanel onPostCreated={this.handleCloseAddOrEditPost} onCancel={this.handleCloseAddOrEditPost} />}

          {this.state.modal === 'edit-post' && <EditPostPanel onPostEdited={this.handleCloseAddOrEditPost} onCancel={this.handleCloseAddOrEditPost} post={this.state.modalPost} />}
        </main>
      </section>
    )
  }
}
