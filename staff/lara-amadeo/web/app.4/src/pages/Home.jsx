import { Component } from "react/index.js"
import Posts from '../components/Posts.jsx'
import Settings from "./Settings.jsx"
import CreatePostModal from "../components/CreatePostModal.jsx"
import EditPostModal from "../components/EditPostModal.jsx"
import SidebarMenu from "../components/SidebarMenu.jsx"
import Profile from "./Profile.jsx"
import DeletionPostModal from "../components/DeletionPostModal.jsx"


export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = { view: 'posts', modal: null , postId: undefined, lastPostUpdate: Date.now()}
    }

    handleGoToSettings = () => {
        this.setState({ view: 'settings' })
    }

    openPostCreationModal = () => {
        this.setState({ modal: 'createPost' })
    }

    confirmPostCreationModal = () => {
        this.setState({ modal: null, lastPostUpdate: Date.now() })
    }

    closePostCreationModal = () => {
        this.setState({ modal: null })
    }

    openEditPostModal = (id) => {
        this.setState({ modal: 'editPost', postId: id })
    }

    confirmEditPostModal = () => {
        this.setState({ modal: null, lastPostUpdate: Date.now()})
    }

    closeEditPostModal = () => {
        this.setState({ modal: null })
    }

    openDeletePostModal = (id) => {
        this.setState({ modal: 'deletionConfirmation', postId: id })
    }

    confirmDeletePostModal = () => {
        this.setState({ modal: null , lastPostUpdate: Date.now() })
    }

    closeDeletePostModal = () => {
        this.setState({ modal: null })
    }
   
    updateSidebarRender = () => {
        this.forceUpdate()
    }

    handleGoToHome = () => {
        this.setState({ view: 'posts' })
    }

    handleGoToProfile = () => {
        this.setState({ view: 'profile' })
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
           {<SidebarMenu onSettingsRow={this.handleGoToSettings} onHomeRow={this.handleGoToHome} onProfileComponent={this.handleGoToProfile} />}
        </div>
        <div className="main-container">
                <div className="middle-section">
                    {this.state.view === 'posts' &&
                    <Posts
                    onCreateButton={this.openPostCreationModal}
                    onEditPostButtonClick={this.openEditPostModal}
                    onDeletePostButtonClick={this.openDeletePostModal}
                    lastPostUpdate={this.state.lastPostUpdate}
                    />}
                    {this.state.view === 'settings' && <Settings onSidebarUpdates={this.updateSidebarRender}/>}
                    {this.state.view === 'profile' && <Profile />}
                </div>
                <div className="right-section"></div>
        </div>
            
            {this.state.modal === 'createPost' && <CreatePostModal onCreatePostClick={this.confirmPostCreationModal} onCancelCreatePostButton={this.closePostCreationModal}/>}
            {this.state.modal === 'editPost' && <EditPostModal postId={this.state.postId} onConfirmEditPost={this.confirmEditPostModal} onCancelEditPost={this.closeEditPostModal}/>}
            {this.state.modal === 'deletionConfirmation' && <DeletionPostModal postId={this.state.postId} onCancelDeletePost={this.closeDeletePostModal} onConfirmDeletePost={this.confirmDeletePostModal}/>}
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