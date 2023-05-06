import { Component } from "react"
import Posts from '../components/Posts.jsx'
import Settings from "./Settings.jsx"
import CreatePostModal from "../components/CreatePostModal.jsx"
import EditPostModal from "../components/EditPostModal.jsx"
import UpdatePassword from "../components/settings/UpdatePassword.jsx"

export default class Home extends Component{
    constructor(props){
        super(props)

        this.state = { view: 'posts', modal: null}
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
    }

    openEditPostModal = () => {
        this.setState({ modal: 'editPost' })
    }

    closeEditCreationModal = () => {
        this.setState({ modal: null })
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
                <div className="sidebar">
                    <div className="sidebar-logo-and-actions">
                        <div className="logo-and-hello">
                        <img src="../public/logo.png" className="home-logo"></img>
                        <p className="sidebar-logo-text">Helio</p>
                        </div>
    
                        <div className="sidebar-actions">
    
                            <div className="sidebar-actions-row sidebar-home">
                                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">home</span></div><div className="body-text-bold">Home</div>
                            </div>
    
                            <div className="sidebar-actions-row">
                                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">search</span></div><div className="body-text-bold">Search</div>
                            </div>
    
                            <div className="sidebar-actions-row">
                                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">notifications</span></div><div className="body-text-bold">Notifications</div>
                            </div>
    
                            <div className="sidebar-actions-row">
                                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">mail</span></div><div className="body-text-bold">Messages</div>
                            </div>
    
                            <div className="sidebar-actions-row sidebar-settings" onClick={this.handleGoToSettings}>
                                <div className="icon-m-container"><span className="material-symbols-rounded icon-m">settings</span></div><div className="body-text-bold">Settings</div>
                            </div>
    
                        </div>
                    </div>
    
                    <div className="sidebar-profile">
                        <div className="sidebar-profile-user-and-avatar">
                            <img className="sidebar-avatar" src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" alt=""/>
                            <div className="sidebar-profile-user-data">
                                <p className="body-text-bold sidebar-profile-username">username</p>
                                <p className="small-text sidebar-profile-email">email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="main-container">
                <div className="middle-section">
                    {this.state.view === 'posts' &&
                    <Posts
                    onLikePost={this.handleToggleLike}
                    onSavePost={this.handleToggleSave}
                    onCreateButton={this.openPostCreationModal}
                    onEditPostButtonClick={this.openEditPostModal}
                    />}
                    {this.state.view === 'settings' && <Settings />}
                </div>
                <div className="right-section"></div>
            </div>
        </div>
        {this.state.modal === 'createPost' && <CreatePostModal onCreatePostClick={this.closePostCreationModal} onCancelCreatePostButton={this.closePostCreationModal}/>}
        {this.state.modal === 'editPost' && <EditPostModal onEditPostClick={this.closeEditCreationModal} onCancelEditPostButton={this.closeEditCreationModal}/>}
    </div>
    }
}