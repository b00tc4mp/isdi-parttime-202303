import React from "react"
import Profile from "../components/ProfileModal"
import AddPost from "../components/AddPostModal"
import Posts from "../components/Posts"
import Menu from "../components/menu"
import OwnPosts from "../components/OwnPosts"
import SavedPosts from "../components/SavedPosts"
import { context } from "../ui"
import { findUserById } from "../logic/helpers/dataManager"

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = { view: 'posts', modal: null, menu: false }
  }

  handleReturnToPosts = () => {
    this.setState({ view: 'posts' })
  }

  handleOpenAddPost = () => {
    document.body.classList.add('fixed-scroll')
    this.setState({ modal: 'addPost' })
  }
  handleCloseAddPost = () => {
    document.body.classList.remove('fixed-scroll')
    this.setState({ modal: null })
  }
  
  handleOpenProfile = () => {
    document.body.classList.add('fixed-scroll')
    this.setState({ modal: 'profile' })
  }

  handleCloseProfile = () => {
    document.body.classList.remove('fixed-scroll')
    this.setState({ modal: null })
  }

  handleReturnToLogin = () => {
    this.props.onLoggedOut()
    delete context.userId
  }

  handleToggleMenu = () => {
    this.setState({ menu: !this.state.menu })
  }

  showOwnPosts = () => {
    this.setState({ view: 'ownPosts' })
  }

  showSavedPosts = () => {
    this.setState({ view: 'savedPosts' })
  }

  render() {
    const user = findUserById(context.userId)

      return <div className="home page">
    <header className="header">
        <span className="material-symbols-outlined menu-icon" onClick={() => {
          this.handleToggleMenu()
          this.forceUpdate()
        }}>menu</span>
        <h1 className="title" onClick={this.handleReturnToPosts}>Home</h1>
        <div className="name-avatar-profile" onClick={this.handleOpenProfile}>  
            <img className="avatar-image" src={user.avatar} alt="avatar image" />
            <a>{user.name}</a>
        </div>
        <button className="logout-button" onClick={this.handleReturnToLogin}>Logout</button>
    </header>

    <main>
      {this.state.modal === 'profile' && <Profile
        onClose={this.handleCloseProfile}
      />}
      {this.state.view === 'posts' && <Posts
        handleRender={() => this.forceUpdate()}
        menuState={this.state.menu}
      />}
      {this.state.menu && <Menu
        onHomePage={this.handleReturnToPosts}
        showOwnPosts={this.showOwnPosts}
        showSavedPosts={this.showSavedPosts}
      />}
      {this.state.modal === 'addPost' && <AddPost
        onCancel={this.handleCloseAddPost}
      />}
      {/* {this.state.modal === 'editPost' && <EditPost
        onCloseModal={this.handleCloseEditPost}
        renderPosts={this.handleRender}
      />} */}
      {this.state.view === 'ownPosts' && <OwnPosts
        handleRender={() => this.forceUpdate()}
        menuState={this.state.menu}
      />}
      {this.state.view === 'savedPosts' && <SavedPosts
        handleRender={() => this.forceUpdate()}
        menuState={this.state.menu}
      />}
    </main> 

    <footer className="home-footer">
        <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
    </footer>
  </div>
  }
}