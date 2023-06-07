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
import SellPostModal from '../components/posts/SellPostModal'
import BuyPostModal from '../components/posts/BuyPostModal'


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

    const openEditPostModal = (id) => {
        setModal('editPost')
        setPostId(id)
    }

    const confirmEditPostModal = () => {
        setModal(null)
        setLastPostUpdate(Date.now())

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

    const openSellPostModal = id => {
        setModal('sellPostModal')
        setPostId(id)
    }

    const confirmSellPost = () => {
        setModal(null)
        setLastPostUpdate(Date.now())
    }

    const openBuyPostModal = id => {
        setModal('buyPostModal')
        setPostId(id)
    }

    const closeAnyPostModal = () => {
        setModal(null)
    }

    return <div className="m-0 w-full relative">
        {<TopbarMenu
        lastUserRenderUpdate={lastUserRenderUpdate}
        onSettingsButton={handleGoToSettings}
        onProfileAvatarButton={handleGoToProfile}
        onBurguerButton={handleOpenSidebar}/>}
        <div className="m-0 w-full flex flex-row items-center relative">
            {mobileSidebar === 'open' && <SidebarMobile onCloseSidebarButton={handleCloseSidebar} onHomeMobileSidebarRow={handleGoToHome} sidebarToggle={mobileSidebar}/>}
        <div className="h-screen w-[230px] flex items-end fixed top-0 max-md:hidden">
           {<SidebarMenu lastUserRenderUpdate={lastUserRenderUpdate} onSettingsRow={handleGoToSettings} onHomeRow={handleGoToHome} onProfileComponent={handleGoToProfile} />}
        </div>
        <div className="w-[calc(100%-230px)] max-md:w-full flex flex-row m-0 relative left-[230px] max-md:left-0">
                <div className="w-[60%] max-xl:w-full border-r border-[--grey-100] max-lg:border-0">
                    {view === 'posts' &&
                    <Posts
                    onCreateButton={openPostCreationModal}
                    onEditPostButtonClick={openEditPostModal}
                    onDeletePostButtonClick={openDeletePostModal}
                    onVisibilityButton={openVisibilityPostModal}
                    onSellPostButton={openSellPostModal}
                    onBuyPostButton={openBuyPostModal}
                    lastPostUpdate={lastPostUpdate}
                    />}
                    {view === 'settings' && <Settings onSidebarUpdates={updateSidebarRender} onLogOutLink={handleLogOut}/>}
                    {view === 'profile' && <Profile />}
                </div>
                <div className="min-w-[300px] h-screen max-lg:hidden"></div>
        </div>
            
            {modal === 'createPost' && <CreatePostModal
            onCreatePostClick={confirmPostCreationModal}
            onCancelCreatePostButton={closeAnyPostModal}
            />}

            {modal === 'editPost' && <EditPostModal
            postId={postId}
            onConfirmEditPost={confirmEditPostModal}
            onCancelEditPost={closeAnyPostModal}
            />}

            {modal === 'deletionConfirmation' && <DeletionPostModal
            postId={postId}
            onCancelDeletePost={closeAnyPostModal}
            onConfirmDeletePost={confirmDeletePostModal}
            />}

            {modal === 'visibilityModal' && <VisibilityModal
            postId={postId}
            onConfirmChangeVisiblity={confirmChangeVisibility}
            onCancelChangeVisibility={closeAnyPostModal}
            />}

            {modal === 'sellPostModal' && <SellPostModal
            postId={postId}
            onConfirmSellPost={confirmSellPost}
            onCancelSellPost={closeAnyPostModal}
            />}

            {modal === 'buyPostModal' && <BuyPostModal
            postId={postId}
            onCancelBuyPost={closeAnyPostModal}
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