import { useState } from 'react'
import { context } from '../ui'
export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import Profile from '../components/Profile'
import Posts from '../components/Posts'
import EditPostModal from '../components/EditPostModal'
import AddPostModal from '../components/AddPostModal';

import retrieveUser from '../logic/retrieveUser';

import './Home.css'


export default function Home({ onLogout, onMenssageAlert }) {
    let tmpUser

    try{
        tmpUser = retrieveUser(context.userId) 
    } 
    catch (error) {
        onMenssageAlert(error.message)
    }

    if (tmpUser.mode)
        if (tmpUser.mode === 'dark') 
            document.querySelector(':root').classList.remove('dark')
        else
            document.querySelector(':root').classList.add('dark')

    const [user, setUser] = useState(tmpUser)
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [typePosts, setTypePosts] = useState('all')
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)

    const handleLogout = () => {
        delete context.userId
        onLogout()
    }

    const handleGoToProfile = (event) => {
        event.preventDefault()

        setView(view === 'posts' ? 'profile' : 'posts')
    }

    const handledEditedProfile =() => {
        try{
            setUser(retrieveUser(context.userId))
        } 
        catch (error) {
            onMenssageAlert(error.message)
        }

        setView('profile')
    }

    const handleOpenEditPost = (id) => {
        setPostId(id)
        setModal('edit-post')
    }

    const handleOpenAddPost = () => setModal('add-post')
    
    const handleCloseModalPost = () => {
        setModal(null)
        setLastPostsUpdate(Date.now())
    }

    const handleGoToPosts = () => setView('posts') 

    const handleTypePost = (event) => {
        setTypePosts(event.target.value)
        setLastPostsUpdate(Date.now())
    }

    console.log('Home -> render')
        
    return <div className="home">
    <header className="home-header">
        <h1 className="title" onClick={handleGoToPosts}>Home</h1>

        <nav className="home-header-nav"> 
            <img className="home-header-avatar" src={user.avatar? user.avatar : DEFAULT_AVATAR_URL} alt=""/>
            <a className = "name" href="" onClick={handleGoToProfile}>{user.name}</a>
        </nav>
        <button className = "button" name = "logout" onClick={handleLogout}>Logout</button>   
    </header>

    <main>
        {view === 'posts' && <Posts 
            onModifyedPost={handleGoToPosts}
            onEditedPost={handleOpenEditPost}
            onMenssageAlert={onMenssageAlert}
            typePosts={typePosts}
            lastPostsUpdate={lastPostsUpdate}
        />}

        {view === 'profile' && <Profile 
            onEditedProfile={handledEditedProfile}
            onMenssageAlert={onMenssageAlert} 
            user={user}
        />}
        
        {modal === 'edit-post' && <EditPostModal 
            onCancel={handleCloseModalPost}
            onEditedPost={handleCloseModalPost}
            postId={postId}
            onMenssageAlert={onMenssageAlert}
        />}

        {modal === 'add-post' &&<AddPostModal 
            onCancel={handleCloseModalPost}
            onCreatedPost={handleCloseModalPost}
            onMenssageAlert={onMenssageAlert}
        />}

    </main>

    <footer className="home-footer">
        <button className="add-post-button" onClick={handleOpenAddPost}>+</button>
        <section>
            <label htmlFor="typePosts">Choose a type posts:</label>
            <select id="typePosts" onChange={handleTypePost}>
                <option value="all" >All</option>
                <option value="user" >User</option>
                <option value="save">Save</option>
            </select>
        </section>
    </footer>
</div>

}