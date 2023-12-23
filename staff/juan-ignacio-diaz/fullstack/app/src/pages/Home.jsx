import { useState, useEffect } from 'react'

import { useAppContext } from '../hooks'

import { Container, Button } from '../library'

import { Profile, Posts, EditPostModal, AddPriceToPostModal, AddPostModal } from '../components'

import { logoutUser, retrieveUser } from '../logic'

import './Home.css'

export const DEFAULT_AVATAR_URL = "https://img.icons8.com/color/512/avatar.png"

export default function Home() {
    console.log('Home -> render')
 
    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const [user, setUser] = useState()
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [postId, setPostId] = useState(null)
    const [typePosts, setTypePosts] = useState('all')
    const [lastPostsUpdate, setLastPostsUpdate] = useState(null)

    function changeMode(mode){
        if (mode) {
            if (mode === 'dark') document.querySelector(':root').classList.add('dark')
            else document.querySelector(':root').classList.remove('dark')
        }
        else document.querySelector(':root').classList.remove('dark')
    }

    useEffect(() => {
        ;(async () => {
            try{     
                freeze()     
                const user = await retrieveUser()

                setUser(user)
                changeMode(user.mode)
                unfreeze()
            } 
            catch (error) {
                alert(error.message)
            }
        })()
    }, [])

    const handleLogout = () => {
        logoutUser()

        navigate('/login')
    }

    const handleGoToProfile = (event) => {
        event.preventDefault()

        setView(view === 'posts' ? 'profile' : 'posts')
    }

    const handledEditedProfile = async () => {
        try{
            freeze()
            const user = retrieveUser()

            setUser(user)

            changeMode(user.mode)
            unfreeze()
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
                <Button name = "logout" onClick={handleLogout}>Logout</Button>   
            </header>

            <Container tag="main">
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
            </Container>

            <footer className="home-footer">
                <Button className="add-post-button" onClick={handleOpenAddPost}>+</Button>
                <Container tag="section">
                    <label className="name" htmlFor="typePosts">Choose a type posts:</label>
                    <select id="typePosts" onChange={handleTypePost}>
                        <option value="all" >All</option>
                        <option value="user" >My Post</option>
                        <option value="save">Saved</option>
                        <option value="onSale">On sale</option>
                    </select>
                </Container>
            </footer>
        </div>
    </>

}