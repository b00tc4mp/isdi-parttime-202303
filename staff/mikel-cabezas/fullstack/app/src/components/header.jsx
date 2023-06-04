
import { useEffect, useState } from "react"
import { context } from "../ui.js"
import UserImage from "./UserImage.jsx"
import './Header.css'
import UpdateUserInfo from "./UpdateUserInfo.jsx"

export default function Header( {onUserProfile, onHomeClick, onLoggedOut, selected, onSetThemeClick, onLikedPostsClick,
    onSavedPostsClick} ) {
    const [current, setCurrent] = useState(null)
    const [loggedIn, setloggedIn] = useState(false)
    const [savelUpdateProfile, setSavelUpdateProfile] = useState(null)
    const [selectedItem, setselectedItem] = useState(null)

    const userId = context.userId
    const handleHome = () => {
        try {
            onHomeClick()
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleLikedPosts = () => {
        try {
            onLikedPostsClick()
        } catch (error) {
            alert(error.message)
        }
    }
    const handleSavedPosts = () => {
        try {
            onSavedPostsClick()
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleLogout = () => {
        try {
            delete context.userId
            onLoggedOut()
        } catch (error) {
            console.log(error.stack)
        }
    }
    const handleUserProfile = () => {
        try {
            setCurrent(Date.now())
            onUserProfile()
        } catch (error) {
            console.log(error.message)
        }
    }
    const renderUser = () => {
        try {
            if(userId) {
                setloggedIn(true)
              }

        } catch (error) {
            console.log(error.message)
        }
    }

    

    if (loggedIn) {
        return <>
            <header onLoad={renderUser}>
                <div className="header-wrapper">
                    <div className="logo">
                        <img src="/logo.svg" alt="Ikea Hacks" />
                    </div>
                    <nav className="menu">
                        <ul>
                            <li className="homepage" onClick={handleHome}>Homepage</li>
                            <li className="homepage" onClick={handleLikedPosts}>My liked posts</li>
                            <li className="homepage" onClick={handleSavedPosts}>My favorite posts</li>
                            <li className="user-account">
                                <UserImage userId={userId}/>
                            </li>
                            <li><span className="material-symbols-outlined">web_stories</span>
                            Feed</li>
                            <li className={`user-settings ${selected === 'user-profile' ? 'current' : ''}`} onClick={handleUserProfile}><span className="material-symbols-outlined filled">settings</span>
                                User settings</li>
                            <li className="logout" onClick={handleLogout}><span className="material-symbols-outlined"> logout </span>Logout</li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    } else {
        return <>
            <header onLoad={renderUser}>
                <div className="header-wrapper">
                    <div className="logo">
                        <img src="/logo.svg" alt="Ikea Hacks" />
                    </div>
                    <nav className="menu">
                        <ul>
                            <li className="submenu-element register">Register</li>
                            <li className="submenu-element login">Login</li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    }

}
