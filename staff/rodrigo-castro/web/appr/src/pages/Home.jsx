import Posts from '../components/Posts'
import { retrieveUser } from '../logic/retrieveUser'
import { context } from '../ui'
import { Component } from 'react'
import AddPostModal from '../components/AddPostModal'
import ChangeEmail from '../components/ChangeEmail'
import ChangePassword from '../components/ChagePassword'
import ChangeAvatar from '../components/ChangeAvatar'
import EditPost from '../components/EditPost'
import Profile from '../components/Profile'
import PropTypes from 'prop-types'

export default class Home extends Component {
    constructor(props){
        super(props)

        Home.propTypes = {
            onLogout: PropTypes.func
        }

        this.state = { modal: null, postId: null }
    }

    handleCloseModal = () => this.setState({ modal: null })
    
    handleOpenAddPost = () => this.setState({ modal: 'add-post'})

    handleOpenProfile = () => this.setState({ modal: 'profile'})

    handleOpenChangeEmail = () => this.setState({ modal: 'change-email'})

    handleOpenChangePassword = () => this.setState({ modal: 'change-password'})

    handleOpenChangeAvatar = () => this.setState({ modal: 'change-avatar'})

    handleLikeToggled = () => this.setState({modal: null})

    handleEditClicked = (id) => this.setState({modal: 'edit-post', postId:id})

    handleLogout = (event) => {
        event.preventDefault()

        delete context.userId
        
        this.props.onLogout()
    }
    
    render() {
    const user = retrieveUser(context.userId) // Modificar, meter en el constructor!!!!
    
    return <div className="home-page">
        <header>
            <div name="my-app"><a href="#"><i className="uil uil-scenery"></i><span></span></a></div>
            <nav>
                <ul className="horizontal-menu">
                    <li name="home"><a href="#" className="menu-buttons"><i className="uil uil-home"></i><span className="menu-text">Home</span></a></li>
                    <li name="new-post" onClick={this.handleOpenAddPost}><a href="#" className="menu-buttons"><i className="uil uil-camera-plus"></i><span className="menu-text">Post</span></a></li>
                    <li name="my-profile" onClick={this.handleOpenProfile}>
                        <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar"/>
                        <a href="#" className="menu-buttons"><span className="menu-text" name="authenticated-user-name">Profile</span></a>
                    </li>
                    <li className="logout" name="logout" onClick={this.handleLogout}><a href="#" className="menu-buttons"><i className="uil uil-signout"></i><span className="menu-text">Logout</span></a></li>
                </ul>
            </nav>
        </header>
        <main className="main-content">
            <Posts onLikeToggled={this.handleLikeToggled} onEditClicked={(id) => this.handleEditClicked(id)}/>

            {this.state.modal === 'add-post' && <AddPostModal 
                onCancel={this.handleCloseModal} 
                onPostCreated={this.handleCloseModal}
            />}

            {this.state.modal === 'profile' && <Profile 
                onCancel={this.handleCloseModal}
                onChangeEmail={this.handleOpenChangeEmail}
                onChangePassword={this.handleOpenChangePassword}
                onChangeAvatar={this.handleOpenChangeAvatar}
            />}

            {this.state.modal === 'change-email' && <ChangeEmail
                onCancel={this.handleCloseModal}
                onEmailChanged={this.handleCloseModal}
            />}

            {this.state.modal === 'change-password' && <ChangePassword
                onCancel={this.handleCloseModal}
                onPasswordChanged={this.handleCloseModal}
            />}

            {this.state.modal === 'change-avatar' && <ChangeAvatar
                onCancel={this.handleCloseModal}
                onAvatarChanged={this.handleCloseModal}
            />}

            {this.state.modal === 'edit-post' && <EditPost
                onCancel={this.handleCloseModal}
                onPostEdited={this.handleCloseModal}
                onPostDeleted={this.handleCloseModal}
                postId={this.state.postId}
            />}
        </main>
    </div>
    }
}