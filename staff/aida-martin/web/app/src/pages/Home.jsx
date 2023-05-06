// import Posts from "../components/posts.js";
import { Component } from 'react'
import { context, openModal, hideModal } from '../ui.js'
import retrieveUser from '../logic/retrieveUser.js'
import { DEFAULT_AVATAR_URL } from '../constans.js'
import Posts from '../components/Posts.jsx'
import AddPostPanel from '../components/AddPostPanel.jsx'

export default class Home extends Component {
  constructor (props) {
    super(props)

    const { onLogOut } = props
    this.onLogOut = onLogOut
    this.state = { view: 'posts', modal: null }
  }

  handleLogOut = () => {
    context.removeItem('userId')

    this.onLogOut()
  }

  handleOpenAddPost = () => {
    this.setState({ modal: 'add-post' })

    openModal()
  }

  handleCloseAddPost = () => {
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
          {this.state.view === 'posts' && <Posts currentUser={currentUser} />}

          {this.state.modal === 'add-post' && <AddPostPanel onPostCreated={this.handleCloseAddPost} onCancel={this.handleCloseAddPost} />}
        </main>
      </section>
    )
  }
}
