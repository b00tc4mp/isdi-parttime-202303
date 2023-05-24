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
import ProfileBar from '../components/ProfileBar'
import NavigationBar from '../components/NavigationBar'

export default function Home(props) {
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
    
    const handleFilterSavedPosts = () => setPostsToShow('saved')
    
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
        <NavigationBar 
            user={user} 
            postsToShow={postsToShow} 
            handleFilterAllPosts={handleFilterAllPosts} 
            handleOpenAddPost={handleOpenAddPost} 
            handleOpenProfile={handleOpenProfile} 
            handleLogout={handleLogout} 
            modal={modal}
        />

        <main className="main-content">
            <Posts 
                onEditClicked={handleEditClicked} 
                lastPostsUpdate={lastPostsUpdate} 
                postsToShow={postsToShow} 
                user={user}
                onPostDeleted={handlePostsModified}
            />

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
                postId={postId}
            />}
        </main>

        <ProfileBar 
            postsToShow={postsToShow} 
            handleFilterMyPosts={handleFilterMyPosts} 
            handleFilterSavedPosts={handleFilterSavedPosts} 
            handleFilterLikedPosts={handleFilterLikedPosts} 
            handleOpenSettings={handleOpenSettings}
            modal={modal}
        />
    </div>
}