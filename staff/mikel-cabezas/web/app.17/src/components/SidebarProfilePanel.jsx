import { userToggleTheme } from "./helpers/getTheme"

export default function Sidebar() {
    // TODO PREGUNTAR PORQUE NO VA EN EL TRY

    function handleToggleTheme(event) {
        event.preventDefault
        const userAccount = document.querySelector('.menu-sidebar')
        userToggleTheme(userAccount)
    }

    return <> 
        <div className="sidebar">
            <div className="go-back">
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
                    <a href="#theme" className="user-theme" onClick={handleToggleTheme}>
                        Dark theme
                        <div className="theme material-symbols-outlined">{document.documentElement.getAttribute('data-theme') === 'light' ? 'toggle_off' : 'toggle_on'}</div>
                    </a>
                </li>
            </ul>
        </div>
    </>
}