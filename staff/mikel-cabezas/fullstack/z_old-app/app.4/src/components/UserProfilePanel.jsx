import UpdateUserInfo from "./UpdateUserInfo"
import UpdateUserPassword from "./UpdateUserPassword"
import Sidebar from "./SidebarProfilePanel"
import Header from "./Header"
import './UserProfilePanel.css'

export default function Profile( {goBack, goBackClick, onSavelUpdateProfile, onUserProfile, savelUpdateProfile, setSavelUpdateProfile, selected, onSetThemeClick, onThemeSet} ) {
    let animationClass

    const startAnimation = (ms) => {
        setTimeout(() => {
            animationClass =  'start-animation'
            return animationClass
        }, ms)
    }

    return <> 
    <Sidebar goBackClick={goBackClick} goBack={goBack} selected={selected} onThemeSet={onThemeSet} onSetThemeClick={onSetThemeClick} />
    <div className={`section user-account ${selected === 'user-profile' ? startAnimation(300) : ''}`}>
        <UpdateUserInfo onSavelUpdateProfile={onSavelUpdateProfile} savelUpdateProfile={savelUpdateProfile} setSavelUpdateProfile={setSavelUpdateProfile} />
        <UpdateUserPassword />

        <div className="delete-account" id="delete-account">
            <button className="error">Delete account</button>
        </div>
    </div>
</>
}