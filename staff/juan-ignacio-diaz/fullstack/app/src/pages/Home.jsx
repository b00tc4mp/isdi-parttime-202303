import { useState, useEffect, useContext } from 'react'

import { context } from '../ui'
import Context from '../Context'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

import Profile from '../components/Profile'
import Posts from '../components/Posts'
import EditPostModal from '../components/EditPostModal'
import AddPriceToPostModal from '../components/AddPriceToPostModal';
import AddPostModal from '../components/AddPostModal';

import retrieveUser from '../logic/retrieveUser';

import './Home.css'

export default function Home({ onLogout }) {
    const { alert, freeze, unfreeze } = useContext(Context)

    const [user, setUser] = useState()
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [typePosts, setTypePosts] = useState('all')
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)

    function changeMode (mode){
        if (mode) {
            if (mode === 'dark') document.querySelector(':root').classList.add('dark')
            else document.querySelector(':root').classList.remove('dark')
        }
        else document.querySelector(':root').classList.remove('dark')
    }

    useEffect(() => {
        try{     
            freeze()     
            retrieveUser(context.userId, (error, user) => {
                unfreeze()
                if (error) {
                    alert(error.message)

                    return
                }
                setUser(user)

                changeMode(user.mode)
            }) 
        } 
        catch (error) {
            alert(error.message)
        }
    }, [])

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
            freeze()
            retrieveUser(context.userId, (error, user) => {
                unfreeze()
                if (error) {
                    alert(error.message)
    
                    return
                }
                setUser(user)

                changeMode(user.mode)
            })
        } 
        catch (error) {
            alert(error.message)
        }
        setView('profile')
    }

    const handleOpenEditPost = (id) => {
        setPostId(id)
        setModal('edit-post')
    }

    const handleOpenAddPriceToPost = (id) => {
        setPostId(id)
        setModal('addPrice-post')
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
        
    return <>
        <div className="home">
            <header className="home-header">
                <h1 className="title" onClick={handleGoToPosts}>Home</h1>

                <nav className="home-header-nav"> 
                    {user && <>
                        <img className="home-header-avatar" src={user.avatar? user.avatar : DEFAULT_AVATAR_URL} alt=""/>
                        <a className = "name" href="" onClick={handleGoToProfile}>{user.name}</a>
                    </>}
                </nav>
                <button className = "button" name = "logout" onClick={handleLogout}>Logout</button>   
            </header>

            <main>
                {view === 'posts' && <Posts 
                    onModifyedPost={handleGoToPosts}
                    onEditedPost={handleOpenEditPost}
                    onAddedPriceToPost={handleOpenAddPriceToPost}
                    typePosts={typePosts}
                    lastPostsUpdate={lastPostsUpdate}
                />}

                {view === 'profile' && <Profile 
                    onEditedProfile={handledEditedProfile}
                    user={user}
                />}
                
                {modal === 'edit-post' && <EditPostModal 
                    onCancel={handleCloseModalPost}
                    onEditedPost={handleCloseModalPost}
                    postId={postId}
                />}

                {modal === 'addPrice-post' && <AddPriceToPostModal 
                    onCancel={handleCloseModalPost}
                    onAddedPriceToPost={handleCloseModalPost}
                    postId={postId}
                />}                

                {modal === 'add-post' && <AddPostModal 
                    onCancel={handleCloseModalPost}
                    onCreatedPost={handleCloseModalPost}
                />}
            </main>

            <footer className="home-footer">
                <button className="add-post-button" onClick={handleOpenAddPost}>+</button>
                <section>
                    <label className="name" htmlFor="typePosts">Choose a type posts:</label>
                    <select id="typePosts" onChange={handleTypePost}>
                        <option value="all" >All</option>
                        <option value="user" >User</option>
                        <option value="save">Save</option>
                        <option value="onSale">On sale</option>
                    </select>
                </section>
            </footer>
        </div>
    </>

}