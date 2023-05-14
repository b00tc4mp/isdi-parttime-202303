
import { useEffect, useState } from "react"
import { context } from "../ui.js"
import { findUserById } from "../logic/helpers/dataManagers.js"
import UserImage from "./UserImage"
import './Header.css'
import UpdateUserInfo from "./UpdateUserInfo.jsx"

export default function Header( {onUserProfile, onHomeClick, onLoggedOut, goBack, goBackClick} ) {
    const [current, setCurrent] = useState(false)
    const [loggedIn, setloggedIn] = useState(false)
    const [savelUpdateProfile, setSavelUpdateProfile] = useState(null)

    const userId = context.userId

    const controlCurrentItem = () => {
        debugger
        if (current) {
            return 'current'
        } else if (!current) {
            return ''
        }
    }
    const handleHome = () => {
        try {
            onHomeClick()
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleLogout = () => {
        try {
            delete context.userId
            onLoggedOut()
            // document.body.classList.remove('logged-in')
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
                // document.body.classList.add('logged-in')
              }
            // if(userId && document.body.classList.contains('logged-in'))
            //     pushUserDataToHeader(userId)
        } catch (error) {
            console.log(error.message)
        }
    }

    // useEffect(() => {
    //     alert('meh')
    // }, [])

    useEffect(() => {
        console.log(current)
        if(current) {
            alert(current)
            setCurrent(true)
            console.log(`current state of current = ${current}`)
        }
    }, [current])

    // useEffect(() => {
    //     console.log(goBack)
    //     console.log(`current state of goBack = ${goBack}`)
    //     if(goBack) {
    //         alert('go back')
    //         console.log(`current state of goBack = ${goBack}`)
    //         setCurrent(false)
    //     }
    // }, [goBack])

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
                            <li className="user-account">
                                <UserImage userId={userId}/>
                            </li>
                            <li><span className="material-symbols-outlined">web_stories</span>
                            Feed</li>
                            {console.log(current) }
                            <li className={`user-settings ${controlCurrentItem()}`} onClick={handleUserProfile}><span className="material-symbols-outlined filled">settings</span>
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
