import { useState, useEffect } from 'react'
import Posts from "../components/Posts.jsx"
import AddPostModal from '../components/AddPostModal.jsx'
import Profile from '../components/Profile.jsx'
import { context } from '../ui.js'
import EditPostModal from '../components/EditPostModal.jsx'
import retrieveUser from '../logic/retrieveUser'
import { useContext } from 'react'
import Context from '../components/Context.js'
import { Container, Button }  from '../library'


export default function Home({ onLoggedOut }) {
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)
    const [user, setUser] = useState()
    
    const { alert } = useContext(Context)
    
    //solo quiero que lo ejecute una vez, por eso utilizo useEffect. Para que cambie estado a usuario la primera vez.
    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
            })

        } catch (error) {
            alert(error.message)
        }
    }, [])


    const handleOpenAddPostModal = () => setModal('add-post')

    const handleOpenEditPostModal = (postId) => {
        setPostId(postId)
        setModal('edit-post')
    }

    const handleCloseModal = () => setModal(null)

    const handleGoToProfile = (event) => {
        event.preventDefault()

        setView('profile')
    }

    const handleGoToPosts = () => setView('posts')

    const handlePostCreated = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

    const handleLogOut = () => {
        delete (context.userId)

        onLoggedOut()
    }

    const handleRefreshUser = () => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)
            })
            
        } catch (error) {
            alert(error.message)
        }
    }


    console.debug('Home->render')

    return <div className="home">
        <header className="home-header">
            
            <h3  className="text-yellow-600 text-2xl cursor-pointer" onClick={handleGoToPosts}>HOME</h3>
            <div className="home-menu" >
                {user && <>
                {<img className="home-header-avatar" src={user.avatar} alt="" />}

                {<button className="home-menu-myprofile-button"><a href="" className="myProfile" onClick={handleGoToProfile}>{user.name}</a></button>}
                </>}
            </div>

            <h3 className="home-header-logout logout" name="logout"><a href="" className="logout" onClick={handleLogOut}>Logout</a></h3>

        </header>

        <Container tag="main">
            {view === 'posts' && < Posts 
            onEditPost={handleOpenEditPostModal} 
            lastPostsUpdate={lastPostsUpdate} 
           
            />}

            {view === 'profile' && < Profile onUserAvatarUpdated={handleRefreshUser} />}


            {modal === 'add-post' && <AddPostModal
                onCancel={handleCloseModal}
                onPostCreated={handlePostCreated}
            />}
            {modal === 'edit-post' && <EditPostModal
                onCancel={handleCloseModal}
                onPostUpdated={handlePostCreated}
                postId={postId}
            />}

        </Container>

        <footer className="home-footer">
            <Button className="add-post-button" onClick={handleOpenAddPostModal}>+</Button>

        </footer>
    </div>
}
