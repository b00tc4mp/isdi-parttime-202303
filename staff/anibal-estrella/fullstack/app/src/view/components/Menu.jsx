import { context, logOutUser } from "../../logic"
import { useNavigate, Link } from 'react-router-dom'

import { XCircleIcon } from '@heroicons/react/24/solid'

export default function Menu(props) {
    console.debug('/// MENU  -> Render')

    const navigate = useNavigate()

    function handleClose(event) {
        event.preventDefault()
        props.onCloseMenu()
    }

    function handleOpenProfile(event) {
        props.openProfile()
        props.onCloseMenu()
    }

    function handleCreatePost(event) {
        props.createPost()
        props.onCloseMenu()
    }

    function handleLogOut() {
        logOutUser()
        props.onCloseMenu()
        navigate('/login')
    }

    function handleShowPosts() {
        props.onOpenShowPosts()
        props.onCloseMenu()
    }

    function handleOpenSavedPosts() {
        props.onOpenSavedPosts()
        props.onCloseMenu()
    }

    function handleOpenLikedPosts() {
        props.onOpenLikedPosts()
        props.onCloseMenu()
    }


    function handleTheme() {
        props.onHandleTheme()
    }
    // return <nav className="home-menu center-container bg-gray-400/80 ">
    return <nav className="flex bg-gray-400/80 z-40 fixed top-0 left-0 w-full h-full backdrop-blur-lg uppercase font-bold">
        <ul className="px-4 self-center text-3xl">
            <li id="menu-close" className=" absolute text-base top-0 right-0 m-4 p-0 h-10">
                <a href="#" className="w-80 h-80 text-[0]  p-none m-none" onClick={handleClose} >Close Menu<XCircleIcon className='XCircleIcon icon' /></a>
            </li>
            <li id="menu-profile" ><a href="#" onClick={handleOpenProfile}>Edit your profile</a></li>
            <li id="menu-show-posts" ><a href="#" onClick={handleShowPosts}>Show Posts</a></li>
            <li id="menu-create-post" > <a href="#" onClick={handleCreatePost}>Create Post</a></li>
            <li id="menu-saved" ><a href="#" onClick={handleOpenSavedPosts}>Saved Posts</a></li>
            <li id="menu-liked" className="" ><a href="#" onClick={handleOpenLikedPosts}>Liked Posts</a></li>
            <li id="menu-logout" className="pb-4" ><a href="#" onClick={handleLogOut}>Logout</a></li>
            <li className='text-lg text-gray-200 flex items-center pt-1 pr-1'>dark <input type="checkbox" className='toggle-theme' onClick={handleTheme} /> light</li>
        </ul>
    </nav >

}
