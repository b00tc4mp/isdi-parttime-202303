
import { Component } from "react"
import retrieveUser from "../logic/retrieveUser.js"
import { context } from "../ui.js"
import Posts from "../components/Posts.jsx"
import AddPostModal from "../components/AddPostModal.jsx"
import Profile from "../components/Profile.jsx"
import { DEFAULT_AVATAR_URL } from "../data.js"



export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'posts', modal: null }


    }


    handleGoToProfile = event => {
        event.preventDefault()
        this.setState({ view: 'profile' })
    }

    handleLogOut = () => {
        delete context.UserId
        this.props.onLoggedOut()
    }


    handleOpenAddPost = () => this.setState({ modal: 'add-post' })

    handleCloseAddPost = () => this.setState({ modal: null })

    handleGoToPosts = () => this.setState({ view: 'posts'})

    handleToggledLike = () => this.forceUpdate()



    render() {
        console.log('Home -> render')

       const user = retrieveUser(context.userId)


        return <div className="home container">

            <header className="home-header">
                <h1 className="title" onClick={this.handleGoToPosts}>Home</h1>

                <nav className="home-header-nav">
                    <img className="home-header-avatar" src= {user.avatar ? user.avatar : DEFAULT_AVATAR_URL} alt="" />
                    <a href="" onClick={this.handleGoToProfile}>{user.name}</a>
                </nav>

                <button className="home-header-logout button" onClick={this.handleLogOut}>Logout</button>
            </header>

            <main className="container">
                {this.state.view === 'posts' && <Posts 
                onToggleLike={this.handleToggledLike}/>}
                
                {this.state.view === 'profile' && <Profile
                onUpdatedUserAvatar={this.handleGoToPosts}
                onUpdatedUserPassword={this.handleGoToPosts} 
                />}

                {this.state.modal === 'add-post' && <AddPostModal 
                onCancel={this.handleCloseAddPost} 
                onPostAdded={this.handleCloseAddPost}
                onLikedPost={this.handleGoToPosts}

                />}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
            </footer>
        </div>
    }
}

