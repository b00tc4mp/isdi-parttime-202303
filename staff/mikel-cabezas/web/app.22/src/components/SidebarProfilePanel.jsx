import { userToggleTheme } from "./helpers/getTheme"
import { useState } from "react"

export default function Sidebar( {goBackClick, selected, onSetThemeClick, onThemeSet} ) {

    const [ goBack, setGoBack ] = useState(false)
    
    const handleBackClick = () => {
        setGoBack(Date.now())
        goBackClick(event)
    }
    
    const handleToggleTheme = () => {
        onSetThemeClick()
        if(localStorage.theme !== 'dark') {
            localStorage.theme = 'dark'
            userToggleTheme()
        } else if(localStorage.theme === 'dark') {
            localStorage.theme = 'light'
            userToggleTheme()
        }
    }

    const startAnimation = (ms) => {
        setTimeout(() => {
            return 'start-animation'
        }, ms)
    }


    return <> 
        <div className={`sidebar _start-animation ${selected === 'user-profile' ? startAnimation(300) : ''}`}>
            <div className="go-back" onClick={handleBackClick}>
                <div className="material-symbols-outlined">
                    arrow_back
                </div> 
                Go back
            </div>
            <div className="title">
                <h1>Account settings</h1>
            </div>
            <ul className="menu-sidebar">
                <li><a href="#update-profile" className="update-info__profile">Update profile</a></li>
                <li><a href="#update-password" className="update-info__password">Update password</a></li>
                <li><a href="#delete-account" className="delete-account">Delete account</a></li>
                <li>
                    {/* user toggle theme pending to solve the conversion form js to react */}
                    <a href="#theme" className="user-theme" onClick={handleToggleTheme}>
                        Dark theme
                        <div className="theme material-symbols-outlined">{document.documentElement.getAttribute('data-theme') === 'light' ? 'toggle_off' : 'toggle_on'}</div>
                    </a>
                </li>
            </ul>
        </div>
    </>
}