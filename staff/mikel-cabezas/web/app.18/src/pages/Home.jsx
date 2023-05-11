import { Component } from "react"
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal"
import { EditPostModal } from "../components/EditPostModal"
import Profile from "../components/UserProfilePanel"
import Header from "../components/header"
import './Home.css'

export default class Home extends Component {
    constructor(props) {
        super(props)
        console.log('Home -> render')
        this.state = { view: 'posts', modal: null }
    }

    handleAddPost = () => this.setState({ modal: 'add-post' })
    handleModalOff = () => this.setState({ modal: null })
    handleToggleLikesSaves = () => this.forceUpdate()
    handleEditPost = (id) => this.setState({ modal: 'edit-post', postId: id })
    handleLogOut = () => this.props.onLogoutClick()
    handleQuitUser = () => this.setState({ modal: 'null' })

    handleGoToUserProfile = () => {
    this.setState({ modal: 'user-profile' })        
        setTimeout(() => {
            document.querySelector('.sidebar').classList.remove('start-animation')
            document.querySelector('.section.user-account').classList.remove('start-animation')
        }, 5)
    }
    handleGoBackClick = () => {
        document.querySelector('.section.user-account').classList.add('start-animation')
        document.querySelector('li.user-settings').classList.remove('current')
        setTimeout(() => {
            document.querySelector('.sidebar').classList.add('start-animation')
        }, 300)
        setTimeout(() => {
            this.setState({ modal: 'null' })        
        }, 900)
        setTimeout(() => {
            document.querySelector('.sidebar').classList.remove('start-animation')
            document.querySelector('.section.user-account').classList.remove('start-animation')
        }, 1050)
    }
    render() {
        return <>
        <Header onUserProfile={this.handleGoToUserProfile} onLoggedOut={() => this.handleLogOut()} onHomeClick={this.handleQuitUser} />
        <main>
            <section className="section home">               
                {this.state.view === 'posts' && <Posts onAddPostClick={this.handleAddPost} onToggleLike={this.handleToggleLikesSaves} onToggleSave={this.handleToggleLikesSaves} onEditPost={(id) => this.handleEditPost(id)}/> }
                {this.state.modal === 'user-profile' && <Profile goBackClick={this.handleGoBackClick}  />}
            </section>
            {this.state.modal === 'add-post' && <AddPostModal onCancel={this.handleModalOff} onCreateNewPost={this.handleModalOff} />}
            {this.state.modal === 'edit-post' && <EditPostModal postId={this.state.postId} onUpdate={this.handleModalOff} onCancel={this.handleModalOff}/>}
        </main>
        </>
    }
}