import { Component } from 'react'
import AddPostModal from '../components/AddPostModal.jsx'
import EditPostModal from '../components/EditPostModal.jsx'
import Posts from '../components/Posts.jsx'
import retrieveUser from '../logic/retrieveUser.js'
import { context } from '../ui.js'


class Home extends Component {
  constructor(props) {
    super(props)
    
    try{
      const loggedUser = retrieveUser(context.userId)

      this.name = loggedUser.name
      this.avatar = loggedUser.avatar
    
    }catch (error){
      alert(error.message)
    }
    
    this.state = { view: 'posts', modal: null }
    
    }

    hadleLogOutButton = () =>  {
      this.props.onLoggedOut()

      delete context.userId
    }

    handleOpenAddPost = () => this.setState({ modal: 'add-post' })
 
    handleOpenEditPost = postId => {
      this.setState({ modal: 'edit-post', editPostId: postId });
    };

    handleCloseModals = () => this.setState({ modal: null })

    handleGoToProfile = event => {
        event.preventDefault()

        this.props.onProfileClick()
    }

    handleGoToPosts = () => this.setState({ view: 'posts' })

    handleTogledLike = () => {
      this.forceUpdate()
    }

    handleToggleFavourite = () => {
      this.forceUpdate()
    }

    render() { 
      return <div className="home">
              <header className="home-header">
                <h1 className="title" onClick={this.handleGoToPosts}>Home</h1>
      
                <nav className="home-header-nav">
                  <img className="home-header-avatar" src={this.avatar} alt="" />
                  <a href="" onClick={this.handleGoToProfile}>{this.name}</a>
                </nav>
      
                <button className="home-header-logout" onClick={this.hadleLogOutButton}>Logout</button>
              </header>
      
              <main>
                {this.state.view === 'posts' && (
                  <Posts 
                    onLikePostClick={this.handleTogledLike}
                    onEditPostClick={this.handleOpenEditPost}
                    onFavouriteClick={this.handleToggleFavourite}
                  />
                )}
                {this.state.modal === 'add-post' && (
                  <AddPostModal 
                    onCancel={this.handleCloseModals} 
                    onPostCreate={this.handleCloseModals}
                  />
                )}
                {this.state.modal === 'edit-post' && (
                  <EditPostModal
                    onCancel={this.handleCloseModals}
                    onPostUpdated={this.handleCloseModals}
                    postId={this.state.editPostId} 
                  />
                )}
              </main>
      
              <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
              </footer>
            </div>
    }
  }

export default Home
