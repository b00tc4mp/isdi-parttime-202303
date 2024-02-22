import Posts from '../components/Posts'
import { Component } from 'react'
import AddPostModal from '../components/AddPostModal'
import Profile from '../components/Profile'
import EditPostModal from '../components/EditPostModal'

export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'posts', modal: null, postId: null }
    }

    handleOpenAddPostModal = () => this.setState({ modal: 'add-post' })

    handleOpenEditPostModal = postId => this.setState({ modal: 'edit-post', postId })

    handleCloseModal = () => this.setState({ modal: null })

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
                {this.state.view === 'posts' && <Posts onEditPost={this.handleOpenEditPostModal} />}
                {this.state.view === 'profile' && <Profile />}

                {this.state.modal === 'add-post' && <AddPostModal
                    onCancel={this.handleCloseModal}
                    onPostCreated={this.handleCloseModal}
                />}

                {this.state.modal === 'edit-post' && <EditPostModal
                    onCancel={this.handleCloseModal}
                    onPostUpdated={this.handleCloseModal}
                    postId={this.state.postId}
                />}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={this.handleOpenAddPostModal}>+</button>
            </footer>
        </div>
    }
}