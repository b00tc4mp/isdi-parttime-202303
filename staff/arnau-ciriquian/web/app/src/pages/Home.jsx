import { useState } from "react"
import { getLoggedUser } from "../logic/getLoggedUser"
import { context } from "../ui"
import Posts from "../components/Posts"
import AddPost from "../components/AddPost"
import Profile from "../components/Profile"
import UpdateAvatar from "../components/UpdateAvatar"
import EditPost from "../components/EditPost"

export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    let _user

    try {
        _user = getLoggedUser(context.userId)
    }catch (error) {
        alert(error.message)
    }
    
    const [user, setUser] = useState(_user)

    const handleLogOut = () => {
        delete context.userId
        onLoggedOut()
    }

    const handleAddPostModal = () => setModal('addPost')
    const handleCloseModal = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }
    const handlePostCreated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }
    const handleGoToAvatarModal = () => setModal('updateAvatar')
    const handleGoBackToProfile = () => {
        setModal('profile')
        try {
            const _user = getLoggedUser(context.userId)
            setUser(_user)
        }catch(error) {
            alert(error.message)
        }
    }
    const handleGoToProfile = event => {
        event.preventDefault()
        setModal('profile')
    }
    const handleOpenPostEditor = postId => {
        setModal('edit-post')
        setPostId(postId)
    }
    
    return <div className="home">
            <header className="home__navigation">
                <nav className="home__navigation--profile">
                    <img className="avatar" src={user.avatar} />
                    <p className="text"><a className="home__anchor--profile" href="" onClick={handleGoToProfile}>{user.name}</a></p>
                </nav>
                <div>
                    <button className="navigation__anchor--logout" href="" onClick={handleLogOut}><img className="anchor__logout--icon" src="images/rocket-launch.svg" /></button>
                </div>
            </header>
            <main>
                { view === 'posts' && <Posts
                    onEditClicked={handleOpenPostEditor}
                    lastPostsUpdate={lastPostsUpdate}
                /> }
                { modal === 'addPost' && <AddPost
                    onAddPostClick={handlePostCreated}
                    onCancelPostClick={handleCloseModal}
                /> }
                {modal === 'edit-post' && <EditPost
                    onPostUpdated={handleCloseModal}
                    onCancel={handleCloseModal}
                    postId={postId}
                />}
                { modal === 'profile' && <Profile
                    onExitProfileClick={handleCloseModal}
                    onGoToUpdateAvatarClick={handleGoToAvatarModal}
                />}
                { modal === 'updateAvatar' && <UpdateAvatar
                    onCancelProfileUpdate={handleGoBackToProfile}
                    onUpdateUserAvatarClick={handleGoBackToProfile}
                />}
            </main>
            <footer>
                <p className="add-post-anchor"><button className="home__anchor--new-post" href="" onClick={handleAddPostModal}>Add new post</button></p>
            </footer>
        </div> 
}
