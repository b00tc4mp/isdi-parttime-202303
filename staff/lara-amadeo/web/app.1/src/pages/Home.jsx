import Posts from '../components/posts/Posts'
import Settings from "./Settings.jsx"
import CreatePostModal from "../components/posts/CreatePostModal.jsx"
import EditPostModal from "../components/posts/EditPostModal.jsx"
import VisibilityModal from '../components/posts/VisibilityPostModal'
import SidebarMenu from "../components/SidebarMenu.jsx"
import SidebarMobile from '../components/SidebarMobile'
import TopbarMenu from '../components/TopbarMenu'
import Profile from "./Profile.jsx"
import DeletionPostModal from "../components/posts/DeletionPostModal.jsx"
import { useState } from 'react'
import './Home.css'


export default function Home({ onLogOutLink }) {

    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostUpdate, setLastPostUpdate] = useState(null)
    const [lastUserRenderUpdate, setLastUserRenderUpdate] = useState(Date.now())
    const [mobileSidebar, setMobileSidebar] = useState(null)


    const handleGoToSettings = () => {
        setView('settings')
    }

    const openPostCreationModal = () => {
        setModal('createPost')
    }

    const confirmPostCreationModal = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const closePostCreationModal = () => {
        setModal(null)
    }

    const openEditPostModal = (id) => {
        setModal('editPost')
        setPostId(id)
    }

    const confirmEditPostModal = () => {
        setModal(null)
        setLastPostUpdate(Date.now())

    }

    const closeEditPostModal = () => {
        setModal(null)
    }

    const openDeletePostModal = (id) => {
        setModal('deletionConfirmation')
        setPostId(id)
    }

    const confirmDeletePostModal = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const closeDeletePostModal = () => {
        setModal(null)
    }

    const confirmChangeVisibility = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }
    
    const closeVisibilityModal = () => {
        setModal(null)
    }
   
    const updateSidebarRender = () => {
        setLastUserRenderUpdate(Date.now())
    }

    const handleGoToHome = () => {
        setView('posts')
        setMobileSidebar(null)
    }

    const handleGoToProfile = () => {
        setView('profile')
    }

    const handleLogOut = () => {
        onLogOutLink()
    }

    const handleOpenSidebar = () => {
        setMobileSidebar('open')

    }

    const handleCloseSidebar = () => {
            setMobileSidebar(null)
    }

    const openVisibilityPostModal = (id) => {
        setModal('visibilityModal')
        setPostId(id)
    }

    return <div className="homepage">
        {<TopbarMenu
        lastUserRenderUpdate={lastUserRenderUpdate}
        onSettingsButton={handleGoToSettings}
        onProfileAvatarButton={handleGoToProfile}
        onBurguerButton={handleOpenSidebar}/>}
        <div className="content-container">
            {mobileSidebar === 'open' && <SidebarMobile onCloseSidebarButton={handleCloseSidebar} onHomeMobileSidebarRow={handleGoToHome} sidebarToggle={mobileSidebar}/>}
        <div className="left-container">
           {<SidebarMenu lastUserRenderUpdate={lastUserRenderUpdate} onSettingsRow={handleGoToSettings} onHomeRow={handleGoToHome} onProfileComponent={handleGoToProfile} />}
        </div>
        <div className="main-container">
                <div className="middle-section">
                    {view === 'posts' &&
                    <Posts
                    onCreateButton={openPostCreationModal}
                    onEditPostButtonClick={openEditPostModal}
                    onDeletePostButtonClick={openDeletePostModal}
                    onVisibilityButton={openVisibilityPostModal}
                    lastPostUpdate={lastPostUpdate}
                    />}
                    {view === 'settings' && <Settings onSidebarUpdates={updateSidebarRender} onLogOutLink={handleLogOut}/>}
                    {view === 'profile' && <Profile />}
                </div>
                <div className="right-section"></div>
        </div>
            
            {modal === 'createPost' && <CreatePostModal
            onCreatePostClick={confirmPostCreationModal}
            onCancelCreatePostButton={closePostCreationModal}
            />}

            {modal === 'editPost' && <EditPostModal
            postId={postId}
            onConfirmEditPost={confirmEditPostModal}
            onCancelEditPost={closeEditPostModal}
            />}

            {modal === 'deletionConfirmation' && <DeletionPostModal
            postId={postId}
            onCancelDeletePost={closeDeletePostModal}
            onConfirmDeletePost={confirmDeletePostModal}
            />}

            {modal === 'visibilityModal' && <VisibilityModal
            postId={postId}
            onConfirmChangeVisiblity={confirmChangeVisibility}
            onCancelChangeVisibility={closeVisibilityModal}
            />}
        </div>
    </div>
    }




/*
handleDeleteThings = () => {
    _users.forEach(_user => _user.likedPosts = [])
    _users.forEach(_user => _user.savedPosts = [])
     saveUsersInStorage(_users)
    }

<button onClick={handleDeleteThings} name='delete'>Delete</button>
*/