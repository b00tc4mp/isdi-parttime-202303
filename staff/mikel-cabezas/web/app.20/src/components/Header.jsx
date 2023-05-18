import { context } from "../ui.js"
import './Header.css'

export default function Header(props) {
    const handleHome = () => {
        try {
            props.onHomeClick()
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogout = () => {
        try {
            delete context.userId
            props.onLoggedOut()
            // document.body.classList.remove('logged-in')
        } catch (error) {
            console.log(error.stack)
        }
    }
    const handleUserProfile = () => {
        try {
            // document.querySelector('li.user-settings').classList.add('current')
            props.onUserProfile()
        } catch (error) {
            console.log(error.message)
        }
    }
    const renderUser = () => {
        try {
            const userId = context.userId
            if(userId) {
                // document.body.classList.add('logged-in')
              }
            // if(userId && document.body.classList.contains('logged-in'))
            //     pushUserDataToHeader(userId)
        } catch (error) {
            console.log(error.message)
        }
    }
    return <>
        <header onLoad={renderUser}>
            <div className="header-wrapper">
                <div className="logo">
                    <img src="/logo.svg" alt="Ikea Hacks" />
                </div>
                <nav className="menu">
                    <ul>
                        <li className="login has-submenu">Login
                            <ul className="submenu">
                                <li className="submenu-element register">Register</li>
                                <li className="submenu-element login">Login</li>
                            </ul>
                        </li>
                        <li className="homepage" onClick={handleHome}>Homepage</li>
                        <li className="user-account">
                            <div className="avatar">
                                <div className="letter"></div>
                                <img className="image-profile hidden" src="" alt="" />
                            </div>
                            <div className="user-name">User name</div>
                        </li>
                        <li><span className="material-symbols-outlined">web_stories</span>
                        Feed</li>
                        <li className="user-settings" onClick={handleUserProfile}><span className="material-symbols-outlined filled">settings</span>
                            User settings</li>
                        <li className="logout" onClick={handleLogout}><span className="material-symbols-outlined"> logout </span>Logout</li>
                    </ul>
                </nav>
            </div>
        </header>
    </>
}
