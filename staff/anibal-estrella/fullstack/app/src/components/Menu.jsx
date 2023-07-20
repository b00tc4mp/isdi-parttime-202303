import { context, logOutUser } from "../logic"
import { useNavigate } from 'react-router-dom'

import { XCircleIcon } from '@heroicons/react/24/solid'
import "./Menu.css"

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
    return <nav className="flex bg-gray-400/80 block z-40 fixed top-0 left-0 w-full h-full backdrop-blur-lg uppercase font-bold">
        <ul className="px-4 self-center text-3xl">
            <li className="menu-close">
                <a href="#" className="close-menu" onClick={handleClose} >Close Menu<XCircleIcon className='XCircleIcon icon' /></a>
            </li>
            <li className="menu-profile" ><a href="#" onClick={handleOpenProfile}>Edit your profile</a></li>
            <li className="menu-show-posts" ><a href="#" onClick={handleShowPosts}>Show Posts</a></li>
            <li className="menu-create-post" > <a href="#" onClick={handleCreatePost}>Create Post</a></li>
            <li className="menu-saved" ><a href="#" onClick={handleOpenSavedPosts}>Saved Posts</a></li>
            <li className="menu-liked" ><a href="#" onClick={handleOpenLikedPosts}>Liked Posts</a></li>
            <li className="menu-logout" ><a href="#" onClick={handleLogOut}>Logout</a></li>
            <li className='theme'>dark <input type="checkbox" className='toggle-theme' onClick={handleTheme} /> light</li>
        </ul>
    </nav >

}
// .home-menu {
//     position: fixed;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     text-align: center;
//     background-color: var(--c-gray_light--80);
//     backdrop-filter: blur(10px);
//     -webkit-backdrop-filter: blur(10px);
// }

// .home-menu ul li a {
//     display: block;
//     font-size: 4rem;
//     padding: 0.5rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     text-decoration: none;
//     transition: padding-left 500ms ease;
// }

// display: flex;
// justify-content: center;
// align-items: center;
// flex-direction: column;
// margin: auto;
// height: 100%;
