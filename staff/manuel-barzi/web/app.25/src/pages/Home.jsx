import Posts from '../components/Posts.jsx'
import { Component } from 'react'
import AddPostModal from '../components/AddPostModal.jsx'
import Profile from '../components/Profile.jsx'

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

    handleGoToPosts = () => this.setState({ view: 'posts' })

    render() {
        console.log('Home -> render')

        return <div className="home">
            <header className="home-header">
                <h1 className="title" onClick={this.handleGoToPosts}>Home</h1>

                <nav className="home-header-nav">
                    <img className="home-header-avatar" src="" alt="" />
                    <a href="" onClick={this.handleGoToProfile}>Profile</a>
                </nav>

                <button className="home-header-logout">Logout</button>
            </header>

            <main>
                {this.state.view === 'posts' && <Posts />}
                {this.state.view === 'profile' && <Profile />}

                {this.state.modal === 'add-post' && <AddPostModal onCancel={this.handleCloseAddPost} />}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPost}>+</button>
            </footer>
        </div>
    }
}