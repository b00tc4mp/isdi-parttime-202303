import Posts from "../components/Posts.jsx"
import { Component } from "react"
import AddPostModal from "../components/AddPostModal.jsx"
import Profile from "../components/Profile.jsx"
import { context } from "../ui.js"


export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'posts', modal: null }
    }

    handleOpenAddPost = () => this.setState({ modal: 'add-post' })

    handleCloseAddPost = () => this.setState({ modal: null })

    handleGoToProfile = event => {
        event.preventDefault()
        this.setState({ view: 'profile' })
    }

    handleGoToPosts = () => this.setState({ view: 'posts'})

    handleLogOut = () => {
    
        delete context.UserId
        this.props.onLoggedOut()
    }



    render() {
        console.log('Home -> render')

        return <div className="home container">
            <header className="home-header">
                <h1 className="title" onClick={this.handleGoToPosts}>Home</h1>

                <nav className="home-header-nav">
                    <img className="home-header-avatar" src="" alt="" />
                    <a href="" onClick={this.handleGoToProfile}>Profile</a>
                </nav>

                <button className="home-header-logout" onClick={this.handleLogOut}>Logout</button>
            </header>

            <main className="container">
                {this.state.view === 'posts' && <Posts />}
                {this.state.view === 'profile' && <Profile />}

                {this.state.modal === 'add-post' && <AddPostModal onCancel={this.handleCloseAddPost} 
                onPostAdded={this.handleGoToPosts}
                />}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
            </footer>
        </div>
    }
}