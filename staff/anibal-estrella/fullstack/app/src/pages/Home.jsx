import { retrieveUser, retrieveRandomMotivationalQuote } from "../logic"
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

    const { alert, freeze, unfreeze, navigate } = useAppContext()
    const [view, setView] = useState('posts')
    const [modal, setModal] = useState(null)
    const [menu, setMenu] = useState(null)
    const [postId, setPostId] = useState(null)
    const [lastPostsUpdate, setLastPostsUpdate] = useState(Date.now())
    const [user, setUser] = useState()
    const [quote, setQuote] = useState(null)



    useEffect(() => {
        try {
            freeze()

            retrieveRandomMotivationalQuote((error, quote) => {
                unfreeze()

                if (error) {
                    alert(error.message)

                    return
                }

                setQuote(quote)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

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


    return <div className=" pt-20 px-2">
        <section>
            <header className="h-5 w-full fixed top-0 left-0 max-w-full z-10">
                <div className="flex flex-row items-center content-end bg-gradient-to-l to-blue_dark from-lime-100">
                    <h1> <a href="#" className="header-title-link" onClick={handleOpenShowPosts} >
                        Logo
                    </a></h1>

                    <a href="#" className="aspect-square" onClick={handleGoToProfile}>

                        {user && <>
                            <img className="w-12 h-12 rounded-full aspect-square border-2 border-red " src={user.avatar} alt="" />
                        </>}
                    </a>

                    <button className="w-10 h-full bg-gradient-to-r from-blue_dark to-red p-2" onClick={handleOpenMenu}><Bars3BottomRightIcon className='Bars3BottomRightIcon text-white' /></button>
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

            <div id="hello-user" className="flex flex-col mb-4">
                <div className="flex flex-row">
                    <div className="flex flex-row">

                        <a href="#" className="w-20 h-20 aspect-square flex-shrink-0 mr-2" onClick={handleGoToProfile}>
                            {user && <><img className="rounded-full  border-2 border-red transition ease-in-out hover:border-lime-100 duration-500" src={user.avatar} alt="" /> </>}
                        </a>
                        <div className="flex flex-col">

                            {user && <>
                                <h2 className="hello-user-headline">
                                    <span className=" text-1xl font-bold">Hi {user.name}.</span>
                                </h2>
                            </>}
                            <h3>
                                {randomSalutation()}
                            </h3>
                            {quote && <p><q>{quote}</q></p>}
                        </div>
                    </div>
                </div>
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