import Posts from '../components/Posts'
import { Component } from 'react';
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import { getInitials } from '../logic/retrieveUserInfo.js'
import retrieveUser from '../logic/retrieveUser'
import { context } from '../main.js'

export default class Home extends Component {

    constructor(props) {
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

    initials(name) {
        console.log('iniciales');
        const result = getInitials(name);
        console.log(result);
        return result;
    }

    render() {
        return <div className="home contenedor">
            <div className="profile-column">
                <h1 className="title" onClick={this.handleGoToPosts}>App</h1>
                <div className="profile-image">
                    <div className="profile-image-picture">
                        <p className="profile-image-picture-name">{this.initials(context.userName)}</p>
                    </div>
                </div>
                <div className='dropdown'>
                    <button className='dropbtn boton boton--primario'>Menu</button>
                    <div className="dropdown-content">
                        <button className="boton boton--primario button-post" onClick={this.handleOpenAddPostModal}>Publicar</button>
                        <button className="boton boton--primario button-profile" onClick={this.handleGoToProfile}>Perfil</button>
                        <button className="boton boton--primario button-exit" onClick={this.handleLogout}>Salir</button>
                    </div>
                </div>
            </div>
            <div className="saludo">
                <h3 className="centrar-texto">Home</h3>
                <main className='post-list'>
                    {this.state.view === 'posts' && <Posts onEditPost={this.handleOpenEditPostModal} lastPostsUpdate={this.state.lastPostsUpdate} />}

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
            </div>
        </div>

    }
}