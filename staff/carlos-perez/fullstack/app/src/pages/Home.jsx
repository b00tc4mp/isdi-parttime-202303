import Posts from '../components/Posts'
import { useState, useEffect } from 'react';
import Profile from '../components/Profile'
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import getInitials from '../logic/getInitials.js'
import retrieveUser from '../logic/retrieveUser'
import { context } from '../main.js'

export default function Home({ onLoggedOut }) {

    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(context.token)
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])



    const handleOpenAddPostModal = () => setModal('add-post');

    const handleOpenEditPostModal = postId => {
        setPostId(postId)
        setModal('edit-post')
    }

    const handleCloseModal = () => setModal(null);

    const handleGoToProfile = event => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToPosts = () => setView('posts')

    const handlePostUpdated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

    const handleLogout = () => {
        delete context.token

        onLoggedOut()
    }
    
    const initials =user? getInitials(user.name):'';


    return <div className="home contenedor">
        <div className="profile-column">
            <h1 className="title" onClick={handleGoToPosts}>App</h1>
            <div className="profile-image">
                <div className="profile-image-picture">
                    <p className="profile-image-picture-name">{initials}</p>
                </div>
            </div>
            <div className='dropdown'>
                <button className='dropbtn boton boton--primario'>Menu</button>
                <div className="dropdown-content">
                    <button className="boton boton--primario button-post" onClick={handleOpenAddPostModal}>Publicar</button>
                    <button className="boton boton--primario button-profile" onClick={handleGoToProfile}>Perfil</button>
                    <button className="boton boton--primario button-exit" onClick={handleLogout}>Salir</button>
                </div>
            </div>
        </div>
        <div className="saludo">
            <h3 className="centrar-texto">Home</h3>
            <main className='post-list'>
                {view === 'posts' && <Posts onEditPost={handleOpenEditPostModal} lastPostsUpdate={lastPostsUpdate} />}
                {view === 'profile' && <Profile />}
                {modal === 'add-post' && <AddPostModal
                    onCancel={handleCloseModal}
                    onPostCreated={handlePostUpdated}
                />}

                {modal === 'edit-post' && <EditPostModal
                    onCancel={handleCloseModal}
                    onPostUpdated={handlePostUpdated}
                    postId={postId}
                />}
            </main>
        </div>
    </div>


}