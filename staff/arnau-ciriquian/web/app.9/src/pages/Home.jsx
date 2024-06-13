import { Component } from "react"
import { getLoggedUser } from "../logic/getLoggedUser"
import { context } from "../ui"
import Posts from "../components/Posts"
import AddPost from "../components/AddPost"
import Profile from "../components/Profile"
import UpdateAvatar from "../components/UpdateAvatar"
import EditPost from "../components/EditPost"

export default class Home extends Component {
    constructor(props) {
        super(props)

        try {
            const user = getLoggedUser(context.userId)

            this.state = {
                view: 'posts',
                modal: null,
                postId: null,
                lastPostUpdate: Date.now(),
                user
            }
        }catch (error) {
            alert(error.message)
        }
            
    }

    handleLogOut = () => {
        delete context.userId
        this.props.onLoggedOut()
    }

    handleAddPostModal = () => this.setState({ modal: 'addPost' })

    handleCloseModal = () => this.setState({ modal: null, lastPostsUpdate: Date.now() })

    handlePostCreated = () => this.setState({ modal: null, lastPostsUpdate: Date.now() })

    handleGoToAvatarModal = () => this.setState({ modal: 'updateAvatar' })

    handleGoBackToProfile = () => {
        try {
            const user = getLoggedUser(context.userId)
            
            this.setState({ modal: 'profile', user })
        }catch(error) {
            alert(error.message)
        }
        
    }

    handleGoToProfile = (event) => {
        event.preventDefault()

        this.setState({ modal: 'profile' })
    }

    handleOpenPostEditor = postId => this.setState({ modal: 'edit-post', postId })

    
    render() {
        return <div className="home">
            <header className="home__navigation">
                <nav className="home__navigation--profile">
                    <img className="avatar" src={this.state.user.avatar} />
                    <p className="text"><a className="home__anchor--profile" href="" onClick={this.handleGoToProfile}>{this.state.user.name}</a></p>
                </nav>
                <div>
                    <button className="navigation__anchor--logout" href="" onClick={this.handleLogOut}><img className="anchor__logout--icon" src="images/rocket-launch.svg" /></button>
                </div>
            </header>
            <main>
                { this.state.view === 'posts' && <Posts
                    onEditClicked={this.handleOpenPostEditor}
                    lastPostsUpdate={this.state.lastPostsUpdate}
                /> }
                { this.state.modal === 'addPost' && <AddPost
                    onAddPostClick={this.handlePostCreated}
                    onCancelPostClick={this.handleCloseModal}
                /> }
                {this.state.modal === 'edit-post' && <EditPost
                    onPostUpdated={this.handleCloseModal}
                    onCancel={this.handleCloseModal}
                    postId={this.state.postId}
                />}
                { this.state.modal === 'profile' && <Profile
                    onExitProfileClick={this.handleCloseModal}
                    onGoToUpdateAvatarClick={this.handleGoToAvatarModal}
                />}
                { this.state.modal === 'updateAvatar' && <UpdateAvatar
                    onCancelProfileUpdate={this.handleGoBackToProfile}
                    onUpdateUserAvatarClick={this.handleGoBackToProfile}
                />}
            </main>
            <footer>
                <p className="add-post-anchor"><button className="home__anchor--new-post" href="" onClick={this.handleAddPostModal}>Add new post</button></p>
            </footer>
        </div> 
    }
}