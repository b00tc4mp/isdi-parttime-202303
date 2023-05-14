// vamos a hacer que pueda tener estados

import { Component } from 'react'
import Posts from "../components/Posts.jsx"
import AddPostModal from '../components/AddPostModal.jsx'
import Profile from '../components/Profile.jsx'
import {EditPostModal} from '../components/EditPostModal.jsx'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'posts', modal: null, postId: null}
    }

    handleOpenAddPostModal = () => this.setState({ modal: 'add-post' })

    handleOpenEditPostModal = (postId) => this.setState({ modal: 'edit-post', postId })

    
    handleCloseModal = () => this.setState({ modal: null })

    handleGoToProfile = (event) => {
        event.preventDefault()
        
        this.setState({ view: 'profile'})
    }

    handleGoToPosts = (event) => {
        event.preventDefault()
        
        this.setState({ view: 'posts'})
    }

    render() {
    console.log('Home->render') 

    return <div className="home">
        <header className="home-header">

        <h3 className="home-header-title" onClick={this.handleGoToPosts}>HOME</h3>
        <div className="home-menu" >
                <img className="home-header-avatar" src="" alt="" />

                <button className="home-menu-myprofile-button"><a href="" className="myProfile" onClick={this.handleGoToProfile}>My Profile</a></button>
            </div>
    
        <h3 className="home-header-logout logout" name="logout"><a href="" className="logout">Logout</a></h3>

        </header>
    
        <main>
            {this.state.view === 'posts' && < Posts onEditPost={this.handleOpenEditPostModal}/>}
            {this.state.view === 'profile' && < Profile />}


            {this.state.modal === 'add-post' && <AddPostModal 
                onCancel={this.handleCloseModal}
                onPostCreated={this.handleCloseModal}
            />}
             {this.state.modal === 'edit-post' && <EditPostModal 
                onCancel={this.handleCloseModal}
                onPostUpdated={this.handleCloseModal}
                postId={this.state.postId}
            />}

        </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPostModal}>+</button>

            </footer>
    </div>
    }
}