import { Posts, AddPostModal, EditPostModal, Profile, Menu } from '../components/'

import { retrieveUser, retrieveRandomMotivationalQuote } from "../../logic"
import { useState, useEffect } from 'react'
import { useAppContext } from '../hooks'
import { hideScroll, showScroll } from "../../../ui"
import randomSalutation from "../../logic/randomSalutation"
import { useNavigate, Outlet } from 'react-router-dom'


import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Bars3BottomRightIcon } from '@heroicons/react/24/solid'

import './Home.css'

export default function Home({ onPanelClick }) {
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
        // event.preventDefault()
        // event.stopPropagation()
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


    return <div id="home" className="pt-20 px-2">
        <section>
            <header className="h-10 w-full fixed top-0 left-0 max-w-full z-10 bg-gradient-to-l to-blue_dark from-lime-100 md:">
                <div className="flex flex-row items-center content-end">
                    <h1 className=" text-lg font-bold"> <a href="#" className="header-title-link" onClick={handleOpenShowPosts} >
                        Logo
                    </a></h1>

                    <a href="#" className="aspect-square ml-auto mr-4" onClick={handleGoToProfile}>

                        {user && <>
                            <img className=" w-8 h-8 rounded-full aspect-square border-2 border-red bg-gray-200" src={user.avatar} alt="" />
                        </>}
                    </a>

                    <button className="w-10  h-full bg-gradient-to-r from-blue_dark to-red p-2" onClick={handleOpenMenu}><Bars3BottomRightIcon className='Bars3BottomRightIcon text-white' /></button>
                </div>

                {menu === 'menu' && <Menu
                    openProfile={handleGoToProfile}
                    onCloseMenu={handleCloseMenu}
                    createPost={handleOpenAddPostModal}
                    onHandleTheme={toggleTheme}
                    onOpenShowPosts={handleOpenShowPosts}
                    onOpenSavedPosts={handleOpenSavedPosts}
                    onPanelClick={onPanelClick}
                />}

            </header>

            <div id="hello-user" className="flex flex-col mb-4">
                <div className="flex flex-row">
                    <div className="flex flex-row">

                        <a href="#" className="flex-shrink-0 mr-2" onClick={handleGoToProfile}>
                            {user && <><img className="w-20 h-20 aspect-square rounded-full  border-2 border-red transition ease-in-out hover:border-lime-100 duration-500 bg-gray-200" src={user.avatar} alt="" /> </>}
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
            <Outlet />

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
                onPanelClick={onPanelClick}

            />}

            {modal === 'edit-post' && <EditPostModal
                onCancel={closeModal}
                onPostEdited={handlePostCreated}
                postId={postId}
                onDeletedPost={handlePostCreated}
                onPanelClick={onPanelClick}
            />}

            <footer className="fixed bottom-0 left-0 w-screen  ">

                <div className="flex flex-row items-center justify-center h-8 md:my-4 md:mx-8 md:h-10 md:rounded-full  bg-gradient-to-l to-blue_dark from-lime-100">

                    <button className="flex rounded-lg h-12 w-12 bg-gradient-to-r from-blue_dark to-red text-[0px] text-white hover:text-erd justify-center items-center mb-6 drop-shadow-sm hover:drop-shadow-lg active:drop-shadow-none active:bg-red" onClick={handleOpenAddPostModal}> <PencilSquareIcon className="h-6 w-6 self-center " />Add Post</button>
                </div>
            </footer>
        </section>
    </div>

}