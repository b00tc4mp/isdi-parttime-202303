import { Component } from 'react'
import Posts from "../components/Posts.jsx"
import AddPostModal from '../components/AddPostModal.jsx'
import Profile from '../components/Profile.jsx'
import { context } from '../ui.js'
import EditPostModal from '../components/EditPostModal.jsx'
import retrieveUser from '../logic/retrieveUser'


export default class Home extends Component {
    constructor(props) {
        super(props)

        try {
            const user = retrieveUser(context.userId)

            this.state = { 
                view: 'posts', 
                modal: null, 
                postId: null, 
                lastPostsUpdate: Date.now(),
                user
            }
        } catch (error) {
            alert(error.message)
        }

    }

    handleOpenAddPostModal = () => this.setState({ modal: 'add-post' })
    
    handleOpenEditPostModal = (postId) => this.setState({ modal: 'edit-post' , postId})

    handleCloseModal = () => this.setState({ modal: null })

    handleGoToProfile = (event) => {
        event.preventDefault()
        
        this.setState({ view: 'profile'})
    }

    handleGoToPosts = (event) => {
        event.preventDefault()
        
        this.setState({ view: 'posts'})
    }

    handlePostCreated = () => this.setState({ modal: null, lastPostsUpdate: Date.now()})
    

    handleLogOut = () => {
        delete (context.userId)
        
        this.props.onLoggedOut()
    }

    handleUserAvatarUpdated = () => {
        try {
            const user = retrieveUser(context.userId)

            this.setState({user})
        } catch (error) {
            alert(error.message)
        }
    }

    render() {
    console.log('Home->render') 

    return <div className="home">
        <header className="home-header">

        <h3 className="home-header-title" onClick={this.handleGoToPosts}>HOME</h3>
        <div className="home-menu" >
                <img className="home-header-avatar" src={this.state.user.avatar} alt="" />

                <button className="home-menu-myprofile-button"><a href="" className="myProfile" onClick={this.handleGoToProfile}>{this.state.user.name}</a></button>
            </div>
    
        <h3 className="home-header-logout logout" name="logout"><a href="" className="logout" onClick={this.handleLogOut}>Logout</a></h3>

        </header>
    
        <main>
            {this.state.view === 'posts' && < Posts onEditPost={this.handleOpenEditPostModal} lastPostsUpdate={this.state.lastPostsUpdate}/>}

            {this.state.view === 'profile' && < Profile onUserAvatarUpdated={this.handleUserAvatarUpdated}/>}


            {this.state.modal === 'add-post' && <AddPostModal 
                onCancel={this.handleCloseModal}
                onPostCreated={this.handlePostCreated}
            />}
               {this.state.modal === 'edit-post' && <EditPostModal 
                onCancel={this.handleCloseModal}
                onPostUpdated={this.handlePostCreated}
                postId={this.state.postId}
            />}

        </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPostModal}>+</button>

            </footer>
    </div>
    }
}