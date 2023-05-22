import { context } from '../../ui'
import './SettingsMenu.css'

export default function SettingsMenu(props){

    function handleEmailRow(){
        props.onEmailRowClick()
    }

    function handlePasswordRow(){
        props.onPasswordRowClick()
    }

    function handleAvatarRow(){
        props.onAvatarRowClick()
    }

    function handleLogOut(){
        delete context.userId

        props.onLogOutButton()
    }

    return <div className="profile-navigation-container">
        <div className="navigation-row" onClick={handleEmailRow}>
            <a>Update email</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>                       
        </div>

        <div className="navigation-row" onClick={handlePasswordRow}>
            <a>Update password</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>
        </div>

        <div className="navigation-row" onClick={handleAvatarRow}>
            <a>Update avatar</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>                      
        </div>
        <a className="link" id="logout" onClick={handleLogOut}>Log out</a>
    </div>
}