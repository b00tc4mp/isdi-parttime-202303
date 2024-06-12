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

    return <div className="profile-navigation-container">
        <div className="navigation-row nav-row-email" onClick={handleEmailRow}>
            <a>Update email</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>                       
        </div>

        <div className="navigation-row nav-row-password" onClick={handlePasswordRow}>
            <a>Update password</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>
        </div>

        <div className="navigation-row nav-row-avatar" onClick={handleAvatarRow}>
            <a>Update avatar</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>                      
        </div>
        <a className="link logout-link" id="logout">Log out</a>
    </div>
}