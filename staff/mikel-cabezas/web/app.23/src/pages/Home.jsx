import { useEffect, useState } from "react"
import Posts from "../components/Posts"
import AddPostModal from "../components/AddPostModal"
import { EditPostModal } from "../components/EditPostModal"
import Profile from "../components/UserProfilePanel"
import Header from "../components/Header"
import './Home.css'

export default function Home( {onLogoutClick, onUserProfile, onSetThemeClick} ) {
        const [view, setView] = useState('posts')
        const [modal, setModal] = useState(null)
        const [theme, setTheme] = useState('')
        const [postId, setPostId] = useState(null)
        const [lastPostsUpdate, setLastPostsUpdate] = useState(null)

            const handleAddPost = () => setModal('add-post')
            const handleModalOff = () => setModal(null)
            const handlePostCreated = () => {
                setModal(null)
                setLastPostsUpdate(Date.now())
            }
            const handlePostUpdated = () => {
                setModal(null)
                setLastPostsUpdate(Date.now())
            }
            const onToggleLikePostClick = () => {
                setLastPostsUpdate(Date.now())
            }
            const onToggleSavePostClick = () => {
                setLastPostsUpdate(Date.now())
            }
            // const handleToggleLikesSaves = () => forceUpdate()
            const handleEditPost = (id) => {
                setModal('edit-post')
                setPostId(id)
            }
            const handleLogOut = () => {
                setView('')
                onLogoutClick()
            }
            const handleQuitUser = () => setModal('null')
        
            const handleGoToUserProfile = () => {
                setModal('user-profile')

                if(onSetThemeClick === 'light') {
                alert('light')
            }
                if(onSetThemeClick === 'dark') {
                    alert('dark')
                }

                onUserProfile()
   
            }
            const handleGoBackClick = (event) => {

                event.target.parentElement.classList.add('start-animation')
                event.target.parentElement.parentElement.querySelector('.user-account').classList.add('start-animation')
                setTimeout(() => {
                    setModal(null)
                }, 1000
                )

            }
            const handleSetThemeClick = (event) => {
                setModal('user-profile')
                if(localStorage.theme !== 'dark') {
                    setTheme('dark')
                    localStorage.theme = 'dark'
                } else if(localStorage.theme === 'dark') {
                    setTheme('light')
                    localStorage.theme = 'light'
                }

            }

  
        return <>
            <Header onUserProfile={handleGoToUserProfile} onLoggedOut={handleLogOut} onHomeClick={handleQuitUser} selected={modal}  />
            <main>
                <section className="section home">               
                    {view === 'posts' && <Posts onAddPostClick={handleAddPost}  onEditPost={(id) => handleEditPost(id)} lastPostsUpdate={lastPostsUpdate} onToggleLikePostClick={onToggleLikePostClick} onToggleSavePostClick={onToggleSavePostClick} /> }
                    {modal === 'user-profile' && <Profile goBackClick={handleGoBackClick} selected={modal} onUserProfile={onUserProfile} onThemeSet={theme} themeState={setTheme} onSetThemeClick={handleSetThemeClick} />}
                </section>
                {modal === 'add-post' && <AddPostModal onCancel={handleModalOff} onCreateNewPost={handlePostCreated} />}
                {modal === 'edit-post' && <EditPostModal postId={postId} onPostUpdated={handlePostUpdated} onCancel={handleModalOff}/>}
            </main>
        </>
}