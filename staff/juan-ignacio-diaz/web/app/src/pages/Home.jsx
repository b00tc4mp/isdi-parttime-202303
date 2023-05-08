import { Component } from 'react';
import { context } from '../ui'
export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import Profile from '../components/Profile'
import Posts from '../components/Posts'
import EditPostModal from '../components/EditPostModal'
import AddPostModal from '../components/AddPostModal';

import retrieveUser from '../logic/retrieveUser';


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'posts', modal: null }

        try{
            this.user = retrieveUser(context.userId) 
        } 
        catch (error) {
            props.onMenssageAlert(error.message)
        }
    }

    handleLogout = () => {
        delete context.userId
        this.props.onLogout()
    }

    handleGoToProfile = event => {
        event.preventDefault()

        this.setState({ view: this.state.view==='posts' ? 'profile' : 'posts' })
    }

    handledEditedProfile =() => {
        try{
            this.user = retrieveUser(context.userId) 
        } 
        catch (error) {
            props.onMenssageAlert(error.message)
        }

        this.setState({ view: 'profile' })
    }

    handleOpenEditPost = (id) => {
        this.postId=id
        this.setState({ modal: 'edit-post' })
    }

    handleOpenAddPost = () => this.setState({ modal: 'add-post' })

    handleCloseModalPost = () => this.setState({ modal: null })

    handleGoToPosts = () => this.setState({ view: 'posts' }) 

    handleOpenAlert = (message) => {
        this.props.onMenssageAlert(message)
      }

    render() {
        console.log('Home -> render')
        
        return <div className="home">
        <header className="home-header">
            <h1 className="title" onClick={this.handleGoToPosts}>Home</h1>

            <nav className="home-header-nav"> 
                <img className="home-header-avatar" src={this.user.avatar? this.user.avatar : DEFAULT_AVATAR_URL} alt=""/>
                <a className = "name" href="" onClick={this.handleGoToProfile}>{this.user.name}</a>
            </nav>
            <button className = "button" name = "logout" onClick={this.handleLogout}>Logout</button>   
        </header>

        <main>
            {this.state.view === 'posts' && <Posts 
                onModifyedPost={this.handleGoToPosts}
                onEditedPost={this.handleOpenEditPost}
                onMenssageAlert={this.handleOpenAlert}
            />}

            {this.state.view === 'profile' && <Profile 
                onEditProfile={this.handledEditedProfile}
                onMenssageAlert={this.handleOpenAlert} 
            />}
           
            {this.state.modal === 'edit-post' && <EditPostModal 
                onCancel={this.handleCloseModalPost}
                onEditedPost={this.handleCloseModalPost}
                postId={this.postId}
                onMenssageAlert={this.handleOpenAlert}
            />}

            {this.state.modal === 'add-post' &&<AddPostModal 
                onCancel={this.handleCloseModalPost}
                onCreatedPost={this.handleCloseModalPost}
                onMenssageAlert={this.handleOpenAlert}
            />}

        </main>

        <footer className="home-footer">
            <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
        </footer>
    </div>
 }
}