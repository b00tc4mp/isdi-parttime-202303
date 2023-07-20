import { retrieveUser } from "../logic"
import { useState, useEffect } from 'react'
import { hideScroll, showScroll } from "../../ui"
import randomSalutation from "../logic/randomSalutation"

import Posts from "../components/Posts"
import AddPostModal from '../components/AddPostModal'
import EditPostModal from '../components/EditPostModal'
import Profile from '../components/Profile'
import Menu from '../components/Menu'

import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'

import './Home.css'
import { useAppContext } from '../hooks'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    console.debug('// Home  -> Render')

    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [menu, setMenu] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(Date.now())
    const [user, setUser] = useState()
    const { alert, navigate } = useAppContext()

    useEffect(() => {
        try {
            retrieveUser()
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const closeModal = () => {
        setModal(null)
        showScroll()
    }

    const handleOpenMenu = event => {
        event.preventDefault()
        setMenu('menu')
        hideScroll()
    }

    const handleCloseMenu = () => {
        setMenu(null)
        showScroll()
    }

    const handleGoToProfile = event => {
        setView('profile')
        navigate('/profile')
    }

    const handleOpenAddPostModal = () => setModal('add-post')

    const handleOpenEditPostModal = postId => {
        setModal('edit-post')
        setPostId(postId)
        setView('posts')
        hideScroll()
    }

    const handlePostCreated = () => {
        setLastPostsUpdate(Date.now())
        closeModal()
    }

    const handleAvatarUpdated = () => {
        try {
            retrieveUser()
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleOpenShowPosts = () => {
        setView('posts')
        console.debug('// OPEN => ALL POSTS');
    }


    const handleOpenSavedPosts = () => {
        setView('saved-posts')
        // console.debug('// OPEN => SAVED POSTS');
    }


    const toggleTheme = () => {
        console.debug('// TODO: DARK THEME');
        document.querySelector(':root').classList.toggle('dark-theme')
    }


    return <div className="home">
        <section>
            <header className="h-5 w-full fixed top-0 left-0 max-w-full">
                <div className="flex flex-row items-center content-end bg-gradient-to-l to-blue_dark from-lime-100">
                    <h1> <a href="#" className="header-title-link" onClick={handleOpenShowPosts} >
                        Logo
                    </a></h1>

                    <a href="#" className="aspect-square" onClick={handleGoToProfile}>

                        {user && <>
                            <img className="w-12 h-12 rounded-full aspect-square border-2 border-red " src={user.avatar} alt="" />
                        </>}
                    </a>

                    <button className="button menu-open" onClick={handleOpenMenu}><Bars3BottomRightIcon className='Bars3BottomRightIcon icon' /></button>
                </div>

                {menu === 'menu' && <Menu
                    openProfile={handleGoToProfile}
                    onCloseMenu={handleCloseMenu}
                    createPost={handleOpenAddPostModal}
                    onHandleTheme={toggleTheme}
                    onOpenShowPosts={handleOpenShowPosts}
                    onOpenSavedPosts={handleOpenSavedPosts}
                />}

            </header>

            <div className="hello-user border-top-gradient">
                <a href="#" className="home-profile-avatar-link" onClick={handleGoToProfile}>

                    {user && <>
                        <img className="user-avatar home-profile-avatar" src={user.avatar} alt="" />
                    </>}

                </a>
                {user && <>
                    <h2 className="hello-user-headline">
                        <span className="hello-user-name">Hi {user.name}.</span>
                        <br />{randomSalutation()}</h2>
                </>}
            </div>

            {view === 'posts' && <Posts
                onOpenShowPosts={handleOpenShowPosts}
                onEditPost={handleOpenEditPostModal}
                lastPostsUpdate={lastPostsUpdate}
            /> || view === 'saved-posts' && <Posts onOpenSavedPosts={view} />}


            {view === 'profile' && <Profile onAvatarUpdated={handleAvatarUpdated}
                user={user}
            />}

            {modal === 'add-post' && <AddPostModal
                onCancel={closeModal}
                onPostCreated={handlePostCreated}
            />}

            {modal === 'edit-post' && <EditPostModal
                onCancel={closeModal}
                onPostEdited={handlePostCreated}
                postId={postId}
                onDeletedPost={handlePostCreated}
            />}

            <footer className="home-footer">
                <div className="footer-items-wrapper">
                    <button className="button add-post-button icon" onClick={handleOpenAddPostModal}> <PencilSquareIcon className="add icon" />Add Post</button>
                </div>
            </footer>
        </section>
    </div>

}