import { Component } from "react"
import { getLoggedUser } from "../logic/getLoggedUser.js"
import { context } from "../ui.js"
import Posts from "../components/Posts.jsx"
import AddPost from "../components/AddPost.jsx"
import Profile from "../components/Profile.jsx"
import UpdateAvatar from "../components/UpdateAvatar.jsx"

let user

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: 'posts',
            modal: null,
        }
        
        user = getLoggedUser(context.userId)    
    }

    handleLogOut = () => {
        delete context.userId
        this.props.onLoggedOut()
    }
    
    handleToggledLike = () => this.forceUpdate()

    handleAddPostModal = () => this.setState({ modal: 'addPost' })

    handleCloseModal = () => this.setState({ modal: null })

    handleGoToAvatarModal = () => this.setState({ modal: 'updateAvatar' })

    handleGoBackToProfile = () => {
        user = getLoggedUser(context.userId)
        
        this.setState({ modal: 'profile' })
    }

    handleGoToProfile = (event) => {
        event.preventDefault()

        this.setState({ modal: 'profile' })
    }

    
    render() {
        return <div className="home">
            <header className="home__navigation">
                <nav className="home__navigation--profile">
                    <img className="avatar" src={user.avatar} />
                    <p className="text"><a className="home__anchor--profile" href="" onClick={this.handleGoToProfile}>{user.name}</a></p>
                </nav>
                <div>
                    <button className="navigation__anchor--logout" href="" onClick={this.handleLogOut}><img className="anchor__logout--icon" src="images/rocket-launch.svg" /></button>
                </div>
            </header>
            <main>
                { this.state.view === 'posts' && <Posts onToggleLike={this.handleToggledLike}/> }
                { this.state.modal === 'addPost' && <AddPost onAddPostClick={this.handleCloseModal} onCancelPostClick={this.handleCloseModal}/> }
                { this.state.modal === 'profile' && <Profile onExitProfileClick={this.handleCloseModal} onGoToUpdateAvatarClick={this.handleGoToAvatarModal}/>}
                { this.state.modal === 'updateAvatar' && <UpdateAvatar onCancelProfileUpdate={this.handleGoBackToProfile} onUpdateUserAvatarClick={this.handleGoBackToProfile}/>}
            </main>
            <footer>
                <p className="add-post-anchor"><button className="home__anchor--new-post" href="" onClick={this.handleAddPostModal}>Add new post</button></p>
            </footer>
        </div> 
    }
}