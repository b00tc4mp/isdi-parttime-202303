import { Component } from "react"
import Posts from '../components/Posts.jsx'
import Settings from "./Settings.jsx"
import CreatePostModal from "../components/CreatePostModal.jsx"
import EditPostModal from "../components/EditPostModal.jsx"
import SidebarMenu from "../components/sidebar.jsx"
import { users } from "../data.js"
import { saveUsersInStorage } from "../data.js"

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = { view: 'posts', modal: null , postId: undefined}
        let postId
    }

    handleGoToSettings = () => {
        this.setState({ view: 'settings' })
    }

    handleToggleLike = () => {
        this.forceUpdate()
    }

    handleToggleSave = () => {
        this.forceUpdate()
    }

    openPostCreationModal = () => {
        this.setState({ modal: 'createPost' })
    }

    closePostCreationModal = () => {
        this.setState({ modal: null })
        this.forceUpdate()
    }

    openEditPostModal = (id) => {
        this.setState({ modal: 'editPost', postId: id })
        console.log(id)
    }

    
    closeEditCreationModal = () => {
        this.setState({ modal: null })
        this.forceUpdate()
    }

    updateSidebarRender = () => {
        this.forceUpdate()
    }

    handleGoToHome = () => {
        this.setState({ view: 'posts' })
    }

    render(){

       return <div className="homepage">

        <div className="topbar-container">
            <div className="topbar-left-side">
                <div className="avatar-icon-m-container"><span className="material-symbols-rounded icon-s topbar">menu</span></div>
            </div>
            <div className="topbar-right-side">
                <div className="avatar-icon-m-container"><span className="material-symbols-rounded icon-s topbar">settings</span></div>
    
                <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" className="topbar-avatar"></img>
            </div>
        </div>
        <div className="content-container">
        <div className="left-container">
           {<SidebarMenu onSettingsRow={this.handleGoToSettings} onHomeRow={this.handleGoToHome}/>}
        </div>
        <div className="main-container">
                <div className="middle-section">
                    {this.state.view === 'posts' &&
                    <Posts
                    onLikePost={this.handleToggleLike}
                    onSavePost={this.handleToggleSave}
                    onCreateButton={this.openPostCreationModal}
                    onEditPostButtonClick={(id)=> this.openEditPostModal(id)}
                    />}
                    {this.state.view === 'settings' && <Settings onSidebarUpdates={this.updateSidebarRender}/>}
                </div>
                <div className="right-section"></div>
        </div>
            
            {this.state.modal === 'createPost' && <CreatePostModal onCreatePostClick={this.closePostCreationModal} onCancelCreatePostButton={this.closePostCreationModal}/>}
            {this.state.modal === 'editPost' && <EditPostModal postId={this.state.postId} onConfirmEditPost={this.closeEditCreationModal} onCancelEditPost={this.closeEditCreationModal}/>}
        </div>
    </div>
    }
}




/*
handleDeleteThings = () => {
    const _users = users()
    _users.forEach(_user => _user.likedPosts = [])
    _users.forEach(_user => _user.savedPosts = [])
     saveUsersInStorage(_users)
    }

<button onClick={this.handleDeleteThings} name='delete'>Delete</button>
*/