import { useState } from "react"
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal"
import { EditPostModal } from "../components/EditPostModal"
import Profile from "../components/UserProfilePanel"
import Header from "../components/header"
import './Home.css'

export default function Home(props) {
        const [view, setView] = useState('posts')
        const [modal, setModal] = useState(null)
        const [postId, setPostId] = useState(null)

            const handleAddPost = () => setModal('add-post')
            const handleModalOff = () => setModal(null)
            // const handleToggleLikesSaves = () => forceUpdate()
            const handleEditPost = (id) => {
                setModal('edit-post')
                setPostId(id)
            }
            const handleLogOut = () => props.onLogoutClick()
            const handleQuitUser = () => setModal('null')
        
            const handleGoToUserProfile = () => {
                setModal('user-profile')
                setTimeout(() => {
                    document.querySelector('.sidebar').classList.remove('start-animation')
                    document.querySelector('.section.user-account').classList.remove('start-animation')
                }, 5)
            }
            const handleGoBackClick = () => {
                document.querySelector('.section.user-account').classList.add('start-animation')
                document.querySelector('li.user-settings').classList.remove('current')
                setTimeout(() => {
                    document.querySelector('.sidebar').classList.add('start-animation')
                }, 300)
                setTimeout(() => {
                    setModal('null')
                    document.querySelector('.sidebar').classList.remove('start-animation')
                    document.querySelector('.section.user-account').classList.remove('start-animation')
                }, 900)
            }
        return <>
        <Header onUserProfile={handleGoToUserProfile} onLoggedOut={() => handleLogOut} onHomeClick={handleQuitUser} />
        <main>
            <section className="section home">               
                {view === 'posts' && <Posts onAddPostClick={handleAddPost}  onEditPost={(id) => handleEditPost(id)}/> }
                {modal === 'user-profile' && <Profile goBackClick={handleGoBackClick}  />}
            </section>
            {modal === 'add-post' && <AddPostModal onCancel={handleModalOff} onCreateNewPost={handleModalOff} />}
            {modal === 'edit-post' && <EditPostModal postId={postId} onUpdate={handleModalOff} onCancel={handleModalOff}/>}
        </main>
        </>
}