import Posts from '../components/Posts'
import { Component } from 'react'
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'
import EditPostModal from '../components/EditPostModal'
import { context } from '../ui'
import retrieveUser from '../logic/retrieveUser'

export default class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        try {
            const user = retrieveUser(context.userId)

            this.state = {
                view: 'posts',
                modal: null,
                postId: null,
                lastPostsUpdate: Date.now(),
                user
            }
        } catch (error) {
            alert(error.message)
        }
    }

    handleOpenAddPostModal = () => this.setState({ modal: 'add-post' })

    handleOpenEditPostModal = postId => this.setState({ modal: 'edit-post', postId })

    handleCloseModal = () => this.setState({ modal: null })

    handleGoToProfile = event => {
        event.preventDefault()

        this.setState({ view: 'profile' })
    }

    handleGoToPosts = () => this.setState({ view: 'posts' })

    handleSwitchMode = () => document.querySelector(':root').classList.toggle('dark')

    handlePostUpdated = () => this.setState({ modal: null, lastPostsUpdate: Date.now() })

    componentWillMount() {
        console.log('Home -> componentWillMount')
    }

    componentDidMount() {
        console.log('Home -> componentDidMount')
    }

    componentWillUnmount() {
        console.log('Home -> componentWillUnmount')
    }

    handleLogout = () => {
        delete context.userId

        this.props.onLoggedOut()
    }

    handleUserAvatarUpdated = () => {
        try {
            const user = retrieveUser(context.userId)

            this.setState({ user })
        } catch (error) {
            alert(error.message)
        }
    }

    render() {
        console.log('Home -> render')

        return <div className="home container">
            <header className="home-header">
                <h1 className="title" onClick={this.handleGoToPosts}>Home</h1>

                <nav className="home-header-nav">
                    <img className="home-header-avatar" src={this.state.user.avatar} alt="" />
                    <a href="" onClick={this.handleGoToProfile}>{this.state.user.name}</a>
                </nav>

                <button onClick={this.handleSwitchMode} className='button'>Switch Mode</button>
                <button onClick={this.handleLogout} className="home-header-logout button">Logout</button>
            </header>

            <main className='container'>
                {this.state.view === 'posts' && <Posts onEditPost={this.handleOpenEditPostModal} lastPostsUpdate={this.state.lastPostsUpdate} />}
                {this.state.view === 'profile' && <Profile onUserAvatarUpdated={this.handleUserAvatarUpdated} />}

                {this.state.modal === 'add-post' && <AddPostModal
                    onCancel={this.handleCloseModal}
                    onPostCreated={this.handlePostUpdated}
                />}

                {this.state.modal === 'edit-post' && <EditPostModal
                    onCancel={this.handleCloseModal}
                    onPostUpdated={this.handlePostUpdated}
                    postId={this.state.postId}
                />}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPostModal}>+</button>
            </footer>
        </div>
    }
}
