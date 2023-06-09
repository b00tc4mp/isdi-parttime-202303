
import { useEffect, useState } from "react"
import { context } from "../ui.js"
import UserImage from "./UserImage.jsx"
import './Header.css'
import UpdateUserInfo from "./UpdateUserInfo.jsx"

export default function Header({ onUserProfile, onHomeClick, onLoggedOut, selected, onSetThemeClick, onLikedPostsClick,
    onSavedPostsClick }) {
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
            if (userId) {
                setloggedIn(true)
            }

        } catch (error) {
            console.log(error.message)
        }
    }



    if (loggedIn) {
        return <>
            <header onLoad={renderUser} className="fixed t-0 w-full bg-dark z10">
                <div className="header-wrapper flex flex-col bg-overlay-black-solid px-5 py-7 w-full md:w-72 h-full fixed left-0 box-border">
                    <div className="logo flex pl-0 cursor-pointer pl-2.5">
                        <img src="/logo.svg" alt="Ikea Hacks" className="w-36" />
                    </div>
                    <nav className="hidden md:flex menu pr-5 h-full mt-4">
                        <ul className="flex flex-col list-none m-0 pl-0 h-full">
                            <li className="homepage" onClick={handleHome}><span class="material-symbols-outlined"> home</span>Homepage</li>
                            <li className="homepage" onClick={handleLikedPosts}><span className="material-symbols-outlined like">favorite</span>My liked posts</li>
                            <li className="homepage" onClick={handleSavedPosts}><span className="material-symbols-outlined save">bookmark</span>My favorite posts</li>
                            <li className="user-account">
                                <UserImage userId={userId} />
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
            <header onLoad={renderUser} className="fixed t-0 w-full bg-dark z10">
                <div className="header-wrapper flex flex-col bg-overlay-black-solid p-1 w-full h-16 md:px-5 md:py-7  md:w-72 md:h-full fixed left-0 box-border">
                    <div className="logo flex pl-0 cursor-pointer pl-2.5">
                        <img src="/logo.svg" alt="Ikea Hacks" className="w-36" />
                    </div>
                    <nav className="hidden md:flex menu pr-5 h-full mt-4">
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
