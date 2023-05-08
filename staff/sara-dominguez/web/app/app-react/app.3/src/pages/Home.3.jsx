// vamos a hacer que pueda tener estados

import { Component } from 'react'
import Posts from "../components/Posts.jsx"
import AddPostModal from '../components/AddPostModal.jsx'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: null }
    }

    handleAddPost = () => this.setState({ view: 'add-post' })
    
    handleCancelAddPost = () => this.setState({ view: null })
    
    render() {
    console.log('Home->render') 


    return <div className="home">
        <header className="home-header">

        <div className="home-menu">
                <img className="home-header-avatar" src="" alt="" />

                <button className="home-menu-myprofile-button"><a href="" className="myProfile">My Profile</a></button>
            </div>
        
        <h3 className="home-header-logout logout" name="logout"><a href="" className="logout">Logout</a></h3>

        </header>
    
        <main>
            <Posts />

            {this.state.view === 'add-post' && <AddPostModal onCancel={this.handleCancelAddPost}/>}

        </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleAddPost}>+</button>

            </footer>
    </div>
    }
}