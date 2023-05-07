import { Component } from "react"
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal"
import { EditPostModal } from "../components/EditPostModal"
import Profile from "../components/UserProfilePanel"
import Header from "../components/header"

export default class Home extends Component {
    constructor(props) {
        super(props)
        console.log('Home -> render')
        this.state = { view: 'posts', modal: null }
    }

    handleAddPost = () => this.setState({ modal: 'add-post' })
    handleModalOff = () => this.setState({ modal: null })
    handleGoToUserProfile = () => this.setState({ view: 'user-profile' })
    handleToggleLikesSaves = () => this.forceUpdate()
    handleEditPost = (id) => this.setState({ modal: 'edit-post', postId: id })
    handleLogOut = () => this.props.onLogoutClick()
    render() {
        return <>
        <Header onUserProfile={this.handleGoToUserProfile} onLoggedOut={() => this.handleLogOut()}  />
        <main>
            <section className="section home">               
                {this.state.view === 'posts' && <Posts onAddPostClick={this.handleAddPost} onToggleLike={this.handleToggleLikesSaves} onToggleSave={this.handleToggleLikesSaves} onEditPost={(id) => this.handleEditPost(id)}/> }
                {this.state.view === 'user-profile' && <Profile   />}

            </section>
            
            {this.state.modal === 'add-post' && <AddPostModal onCancel={this.handleModalOff} onCreateNewPost={this.handleModalOff} />}
            {this.state.modal === 'edit-post' && <EditPostModal postId={this.state.postId} onUpdate={this.handleModalOff} onCancel={this.handleModalOff}/>}
        </main>
        </>
    }
}