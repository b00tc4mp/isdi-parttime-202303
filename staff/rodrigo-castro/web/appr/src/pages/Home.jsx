import Posts from '../components/Posts.jsx'
import { findUserById } from '../logic/helpers/dataManagers.js'
import { context } from '../ui.js'
import { Component } from 'react'
import AddPostModal from '../components/addPostModal.jsx'
import Profile from '../components/Profile.jsx'
import PropTypes from 'prop-types'

export default class Home extends Component {
    constructor(props){
        super(props)
        
        Home.propTypes = {
            onLogout: PropTypes.func
        }

        this.state = { modal: null }
    }

    handleAddPost = () => this.setState({ modal: 'add-post'})

    handleCancelAddPost = () => this.setState({ modal: null })

    handleProfile = () => this.setState({ modal: 'profile'})

    handleCancelProfile = () => this.setState({ modal: null })

    handleLogout = (event) => {
        event.preventDefault()

        delete context.userId

        this.props.onLogout()
    }
    
    render() {
    const user = findUserById(context.userId)
    
    return <div className="home-page">
        <header>
            <div name="my-app"><a href="#"><i className="uil uil-scenery"></i><span></span></a></div>
            <nav>
                <ul className="horizontal-menu">
                    <li name="home"><a href="#" className="menu-buttons"><i className="uil uil-home"></i><span className="menu-text">Home</span></a></li>
                    <li name="new-post" onClick={this.handleAddPost}><a href="#" className="menu-buttons"><i className="uil uil-camera-plus"></i><span className="menu-text">Post</span></a></li>
                    <li name="my-profile" onClick={this.handleProfile}>
                        <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar"/>
                        <a href="#" className="menu-buttons"><span className="menu-text" name="authenticated-user-name">Profile</span></a>
                    </li>
                    <li className="logout" name="logout" onClick={this.handleLogout}><a href="#" className="menu-buttons"><i className="uil uil-signout"></i><span className="menu-text">Logout</span></a></li>
                </ul>
            </nav>
        </header>
        <main className="post-list">
            <Posts />

            {this.state.modal === 'add-post' && <AddPostModal onCancel={this.handleCancelAddPost}/>}

            {this.state.modal === 'profile' && <Profile onCancel={this.handleCancelProfile}/>}
        </main>
    </div>
    }
}