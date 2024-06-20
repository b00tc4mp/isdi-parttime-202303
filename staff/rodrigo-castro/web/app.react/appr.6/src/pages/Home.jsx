import Posts from '../components/Posts'
import { retrieveUser } from '../logic/retrieveUser'
import { context } from '../ui'
import { useState, useEffect } from 'react'
import AddPostModal from '../components/AddPostModal'
import ChangeEmail from '../components/ChangeEmail'
import ChangePassword from '../components/ChagePassword'
import ChangeAvatar from '../components/ChangeAvatar'
import EditPost from '../components/EditPost'
import Profile from '../components/Profile'
import './Home.css'
import PropTypes from 'prop-types'

export default function Home(props) {
    Home.propTypes = {
        onLogout: PropTypes.func
    }

    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(Date.now())
    const [postsToShow, setPostsToShow] = useState('all')
    const [user, setUser] = useState()

    useEffect(() => {
        try{
            retrieveUser(context.userId, (error, user) => {
                if(error){
                    alert(error.message)
    
                    return
                }

                setUser(user)
            })
        } catch(error){
            alert(error.message)
        }
    }, [])


    const handleCloseModal = () => setModal(null)
    
    const handleOpenAddPost = () => setModal('add-post')

    const handlePostsModified = () => {
        setModal(null)

        setLastPostsUpdate(Date.now)
    }

    const handleOpenProfile = () => setPostsToShow('mine')
    
    const handleFilterSavedPosts = () => {
        setPostsToShow('saved')
        
        setModal(null)
    }
    
    const handleFilterAllPosts = () => setPostsToShow('all')
    
    const handleFilterMyPosts = () => setPostsToShow('mine')
    
    const handleFilterLikedPosts = () => setPostsToShow('liked')
    
    const handleOpenSettings = () => setModal('profile')

    const handleOpenChangeEmail = () => setModal('change-email')

    const handleOpenChangePassword = () => setModal('change-password')

    const handleOpenChangeAvatar = () => setModal('change-avatar')

    const handleAvatarChanged = () => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if(error){
                    alert(error.message)
                }
                
                setModal(null)
    
                setUser(user)
    
                setLastPostsUpdate(Date.now())
            })

        } catch(error){
            alert(error.message)
        }
    }

    const handleEditClicked = (id) => {
        setModal('edit-post')

        setPostId(id)
    }

    const handleLogout = (event) => {
        event.preventDefault()

        delete context.userId
        
        props.onLogout()
    }
    
    return <div className="home-page">
        <header>
            <nav>
                <ul className="horizontal-menu">
                    <li>
                        <div name="my-app" className='logo'><a href="#"><span className="material-symbols-rounded">emoticon</span><span></span></a></div>
                    </li>
                    <li name="home" onClick={handleFilterAllPosts}>
                        <a href="#">
                            <span className={`menu-buttons material-symbols-rounded ${postsToShow === 'all' && modal === null ? 'filled' : ''}`}>home</span>
                            <span className="menu-text">{postsToShow === 'all' && modal === null ? <b>Home</b> : 'Home'}</span>
                        </a>
                    </li>
                    <li name="new-post" onClick={handleOpenAddPost}>
                        <a href="#">
                            <span className={`menu-buttons material-symbols-rounded ${modal === 'add-post' ? 'filled' : ''}`}>add_a_photo</span>
                            <span className="menu-text">{modal === 'add-post' ? <b>Post</b> : 'Post'}</span>
                        </a>
                    </li>
                    {user && <>
                    <li name="my-profile" onClick={handleOpenProfile}>
                        <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className={`user-avatar ${modal === 'profile' || postsToShow !== 'all' ? 'selected' : ''}`}/>
                        <a href="#" className="menu-buttons"><span className="menu-text" name="authenticated-user-name">{modal === 'profile' || postsToShow !== 'all' ? <b>Profile</b> : 'Profile'}</span></a>
                    </li>
                    </>}
                    
                    <li className="logout" name="logout" onClick={handleLogout}><a href="#"><span className="menu-buttons material-symbols-rounded">logout</span><span className="menu-text">Logout</span></a></li>
                </ul>
            </nav>
        </header>
        <main className="main-content">
            <Posts onEditClicked={handleEditClicked} lastPostsUpdate={lastPostsUpdate} postsToShow={postsToShow} user={user}/>

            {modal === 'add-post' && <AddPostModal 
                onCancel={handleCloseModal}
                onPostCreated={handlePostsModified}
            />}

            {modal === 'profile' && <Profile 
                onCancel={handleCloseModal}
                onChangeEmail={handleOpenChangeEmail}
                onChangePassword={handleOpenChangePassword}
                onChangeAvatar={handleOpenChangeAvatar}
            />}

            {modal === 'change-email' && <ChangeEmail
                onCancel={handleCloseModal}
                onEmailChanged={handleCloseModal}
            />}

            {modal === 'change-password' && <ChangePassword
                onCancel={handleCloseModal}
                onPasswordChanged={handleCloseModal}
            />}

            {modal === 'change-avatar' && <ChangeAvatar
                onCancel={handleCloseModal}
                onAvatarChanged={handleAvatarChanged}
            />}

            {modal === 'edit-post' && <EditPost
                onCancel={handleCloseModal}
                onPostEdited={handlePostsModified}
                onPostDeleted={handlePostsModified}
                postId={postId}
            />}
        </main>
        { postsToShow !== 'all' && 
        <footer>
            <ul className='profile-filters'>
                <li onClick={handleFilterMyPosts}><span className={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'mine' ? 'filled' : ''}`}>photo_library</span></li>
                <li onClick={handleFilterSavedPosts}><span className={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'saved' ? 'filled' : '' }`}>bookmark</span></li>
                <li onClick={handleFilterLikedPosts}><span className={`menu-buttons material-symbols-rounded ${!modal && postsToShow === 'liked' ? 'filled' : ''}`}>favorite</span></li>
                <li onClick={handleOpenSettings}><span className={`menu-buttons material-symbols-rounded ${modal === 'profile' ? 'filled' : ''}`}>settings</span></li>
            </ul>
        </footer>}
    </div>
}