import { useState, useEffect } from "react"
import { getLoggedUser } from "../logic/getLoggedUser"
import { context } from "../ui"
import Posts from "../components/Posts"
import AddPost from "../components/AddPost"
import Profile from "../components/Profile"
import UpdateAvatar from "../components/UpdateAvatar"
import UpdateEmail from "../components/UpdateEmail"
import EditPost from "../components/EditPost"
import UpdateUsername from "../components/UpdateUsername"
import UpdatePassword from "../components/UpdatePassword"

export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            getLoggedUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setUser(user)
            })
        }catch (error) {
            alert(error.message)
        }
    }, [])

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
    const handleGoToEmailModal = () => setModal('updateEmail')
    const handleGoToUsernameModal = () => setModal('updateUsername')
    const handleGoToPasswordModal = () => setModal('updatePassword')
    const handleGoBackToProfile = () => {
        setModal('profile')
        try {
            getLoggedUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setUser(user)
            })
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

    console.log('Home -> Render')
    
    return <div className="home">
            <header className="home__navigation">
                <nav className="home__navigation--profile">
                    {user && <>
                        <img className="avatar" src={user.avatar} />
                        <p className="text"><a className="home__anchor--profile" href="" onClick={handleGoToProfile}>{user.name}</a></p>
                    </>}
                </nav>
                <div>
                    <button className="navigation__anchor--logout" href="" onClick={handleLogOut}><img className="anchor__logout--icon" src="../../images/logout.png" /></button>
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
                    onGoToUpdateEmailClick={handleGoToEmailModal}
                    onGoToUpdateUsernameClick={handleGoToUsernameModal}
                    onGoToUpdatePasswordClick={handleGoToPasswordModal}
                />}
                { modal === 'updateAvatar' && <UpdateAvatar
                    onCancelProfileUpdate={handleGoBackToProfile}
                    onUpdateUserAvatarClick={handleGoBackToProfile}
                />}
                { modal === 'updateEmail' && <UpdateEmail
                    onCancelProfileUpdate={handleGoBackToProfile}
                    onUpdateUserEmailClick={handleGoBackToProfile}
                />}
                { modal === 'updateUsername' && <UpdateUsername
                    onCancelProfileUpdate={handleGoBackToProfile}
                    onUpdateUsernameClick={handleGoBackToProfile}
                />}
                { modal === 'updatePassword' && <UpdatePassword
                    onCancelProfileUpdate={handleGoBackToProfile}
                    onUpdatePasswordClick={handleGoBackToProfile}
                />}
            </main>
            <footer>
                <p className="add-post-anchor"><button className="home__anchor--new-post" href="" onClick={handleAddPostModal}>Add new post</button></p>
            </footer>
        </div> 
}
