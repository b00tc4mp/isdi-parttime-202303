// import Posts from "../components/posts.js";
import { Component } from 'react'
import { context, openModal, hideModal } from '../ui.js'
import retrieveUser from '../logic/retrieveUser.js'
import { DEFAULT_AVATAR_URL } from '../constans.js'
import Posts from '../components/Posts.jsx'
import AddPostPanel from '../components/AddPostPanel.jsx'
import EditPostPanel from '../components/EditPostPanel.jsx'

export default class Home extends Component {
  constructor (props) {
    super(props)

    const { onLogOut } = props
    this.onLogOut = onLogOut
    this.state = { view: 'posts', modal: null, modalPost: null }
  }

  handleLogOut = () => {
    context.removeItem('userId')

    this.onLogOut()
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

  render () {
    const currentUser = retrieveUser(context.userId)

    return (
      <section className='home'>
        <header className='home-header'>
          <h1 className='home-title title'>HOME</h1>

          <div className='home-header-nav'>
            <img
              className='avatar home-header-avatar' src={currentUser.avatar
                ? currentUser.avatar
                : DEFAULT_AVATAR_URL} alt=''
            />
            <a href='' className='profile-link'>{currentUser.name}</a>

            <button className='button profile-logout-button' onClick={this.handleLogOut}>LOG OUT</button>
          </div>
        </header>

        <div className='button-new-post-container'>
          <button className='button new-post-button' onClick={this.handleOpenAddPost}>NEW POST</button>
        </div>

        <main className='main-container'>
          {this.state.view === 'posts' && <Posts currentUser={currentUser} onEditPost={this.handleOpenEditPost} />}

          {this.state.modal === 'add-post' && <AddPostPanel onPostCreated={this.handleCloseAddOrEditPost} onCancel={this.handleCloseAddOrEditPost} />}

          {this.state.modal === 'edit-post' && <EditPostPanel onPostEdited={this.handleCloseAddOrEditPost} onCancel={this.handleCloseAddOrEditPost} post={this.state.modalPost} />}
        </main>
      </section>
    )
  }
}
