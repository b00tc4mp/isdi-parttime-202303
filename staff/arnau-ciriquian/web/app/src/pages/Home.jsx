import { Component } from "react"
import { getLoggedUser } from "../logic/getLoggedUser.js"
import { context } from "../ui.js"
import Posts from "../components/Posts.jsx"
import AddPost from "../components/AddPost.jsx"
import Profile from "../components/Profile.jsx"

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

    handleClosePostModal = () => this.setState({ modal: null })

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
                { this.state.modal === 'addPost' && <AddPost onAddPostClick={this.handleClosePostModal} onCancelPostClick={this.handleClosePostModal}/> }
                { this.state.modal === 'profile' && <Profile />}
            </main>
            <footer>
                <p className="add-post-anchor"><button className="home__anchor--new-post" href="" onClick={this.handleAddPostModal}>Add new post</button></p>
            </footer>
        </div> 
    }
}